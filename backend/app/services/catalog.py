from datetime import datetime, timezone
import uuid
import random
import string

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from app.models.catalog import Category, Product, ProductImage, ProductVariant, ProductStatus
from app.schemas.catalog import (
    CategoryCreate,
    CategoryUpdate,
    BulkProductUpdateItem,
    ProductCreate,
    ProductImageCreate,
    ProductUpdate,
    ProductVariantCreate,
)
from app.services.storage import delete_file


async def get_category_by_slug(session: AsyncSession, slug: str) -> Category | None:
    result = await session.execute(select(Category).where(Category.slug == slug))
    return result.scalar_one_or_none()


async def get_product_by_slug(
    session: AsyncSession, slug: str, options: list | None = None
) -> Product | None:
    query = select(Product)
    if options:
        for opt in options:
            query = query.options(opt)
    result = await session.execute(query.where(Product.slug == slug))
    return result.scalar_one_or_none()


async def _get_product_by_sku(session: AsyncSession, sku: str) -> Product | None:
    result = await session.execute(select(Product).where(Product.sku == sku))
    return result.scalar_one_or_none()


async def _ensure_slug_unique(session: AsyncSession, slug: str, exclude_id: uuid.UUID | None = None) -> None:
    query = select(Product).where(Product.slug == slug)
    if exclude_id:
        query = query.where(Product.id != exclude_id)
    exists = await session.execute(query)
    if exists.scalar_one_or_none():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Product slug already exists")


async def _ensure_sku_unique(session: AsyncSession, sku: str, exclude_id: uuid.UUID | None = None) -> None:
    query = select(Product).where(Product.sku == sku)
    if exclude_id:
        query = query.where(Product.id != exclude_id)
    exists = await session.execute(query)
    if exists.scalar_one_or_none():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Product SKU already exists")


async def _generate_unique_sku(session: AsyncSession, base: str) -> str:
    slug_part = base.replace("-", "").upper()[:8]
    while True:
        suffix = "".join(random.choices(string.digits, k=4))
        candidate = f"{slug_part}-{suffix}"
        if not await _get_product_by_sku(session, candidate):
            return candidate


def _set_publish_timestamp(product: Product, status_value: ProductStatus | str | None) -> None:
    if not status_value:
        return
    status_enum = ProductStatus(status_value)
    if status_enum == ProductStatus.published and product.publish_at is None:
        product.publish_at = datetime.now(timezone.utc)


async def create_category(session: AsyncSession, payload: CategoryCreate) -> Category:
    existing = await get_category_by_slug(session, payload.slug)
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Category slug already exists")
    category = Category(**payload.model_dump())
    session.add(category)
    await session.commit()
    await session.refresh(category)
    return category


async def update_category(session: AsyncSession, category: Category, payload: CategoryUpdate) -> Category:
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(category, field, value)
    session.add(category)
    await session.commit()
    await session.refresh(category)
    return category


async def create_product(session: AsyncSession, payload: ProductCreate) -> Product:
    await _ensure_slug_unique(session, payload.slug)

    sku = payload.sku or await _generate_unique_sku(session, payload.slug)
    await _ensure_sku_unique(session, sku)

    images_payload = payload.images or []
    variants_payload: list[ProductVariantCreate] = getattr(payload, "variants", []) or []
    product_data = payload.model_dump(exclude={"images", "variants"})
    product_data["sku"] = sku
    product = Product(**product_data)
    _set_publish_timestamp(product, payload.status)
    product.images = [ProductImage(**img.model_dump()) for img in images_payload]
    product.variants = [ProductVariant(**variant.model_dump()) for variant in variants_payload]
    session.add(product)
    await session.commit()
    await session.refresh(product)
    return product


async def update_product(session: AsyncSession, product: Product, payload: ProductUpdate) -> Product:
    data = payload.model_dump(exclude_unset=True)
    if "slug" in data:
        await _ensure_slug_unique(session, data["slug"], exclude_id=product.id)
    if "sku" in data and data["sku"]:
        await _ensure_sku_unique(session, data["sku"], exclude_id=product.id)
    for field, value in data.items():
        setattr(product, field, value)
    _set_publish_timestamp(product, data.get("status"))
    session.add(product)
    await session.commit()
    await session.refresh(product)
    return product


async def add_product_image(session: AsyncSession, product: Product, payload: ProductImageCreate) -> ProductImage:
    image = ProductImage(product=product, **payload.model_dump())
    session.add(image)
    await session.commit()
    await session.refresh(image)
    return image


async def add_product_image_from_path(
    session: AsyncSession, product: Product, url: str, alt_text: str | None, sort_order: int
) -> ProductImage:
    image = ProductImage(product=product, url=url, alt_text=alt_text, sort_order=sort_order)
    session.add(image)
    await session.commit()
    await session.refresh(image)
    return image


async def delete_product_image(session: AsyncSession, product: Product, image_id: str) -> None:
    image = next((img for img in product.images if str(img.id) == str(image_id)), None)
    if not image:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Image not found")
    delete_file(image.url)
    await session.delete(image)
    await session.commit()


async def soft_delete_product(session: AsyncSession, product: Product) -> None:
    product.is_deleted = True
    session.add(product)
    await session.commit()


async def bulk_update_products(session: AsyncSession, updates: list[BulkProductUpdateItem]) -> list[Product]:
    product_ids = [item.product_id for item in updates]
    result = await session.execute(select(Product).where(Product.id.in_(product_ids)))
    products = {p.id: p for p in result.scalars()}

    updated: list[Product] = []
    for item in updates:
        product = products.get(item.product_id)
        if not product:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Product {item.product_id} not found")
        data = item.model_dump(exclude_unset=True)
        if "status" in data and data["status"]:
            _set_publish_timestamp(product, data["status"])
        for field in ("base_price", "stock_quantity", "status"):
            if field in data and data[field] is not None:
                setattr(product, field, data[field])
        session.add(product)
        updated.append(product)
    await session.commit()
    for product in updated:
        await session.refresh(product)
    return updated

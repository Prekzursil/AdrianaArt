import argparse
import asyncio
import json
from pathlib import Path
from typing import Any, Dict

from sqlalchemy import select

from app.db.session import SessionLocal
from app.models.user import User, UserRole
from app.models.address import Address
from app.models.catalog import Category, Product, ProductImage, ProductOption, ProductVariant, Tag
from app.models.order import Order, OrderItem, ShippingMethod


async def export_data(output: Path) -> None:
    data: Dict[str, Any] = {}
    async with SessionLocal() as session:
        users = (await session.execute(select(User))).scalars().all()
        data["users"] = [
            {
                "id": str(u.id),
                "email": u.email,
                "name": u.name,
                "avatar_url": u.avatar_url,
                "preferred_language": u.preferred_language,
                "email_verified": u.email_verified,
                "role": u.role.value,
                "created_at": u.created_at.isoformat(),
            }
            for u in users
        ]
        categories = (await session.execute(select(Category))).scalars().all()
        data["categories"] = [
            {
                "id": str(c.id),
                "slug": c.slug,
                "name": c.name,
                "description": c.description,
                "sort_order": c.sort_order,
                "created_at": c.created_at.isoformat(),
            }
            for c in categories
        ]
        products = (await session.execute(select(Product))).scalars().all()
        data["products"] = []
        for p in products:
            data["products"].append(
                {
                    "id": str(p.id),
                    "category_id": str(p.category_id),
                    "sku": p.sku,
                    "slug": p.slug,
                    "name": p.name,
                    "short_description": p.short_description,
                    "long_description": p.long_description,
                    "base_price": float(p.base_price),
                    "currency": p.currency,
                    "is_featured": p.is_featured,
                    "stock_quantity": p.stock_quantity,
                    "status": p.status.value,
                    "publish_at": p.publish_at.isoformat() if p.publish_at else None,
                    "meta_title": p.meta_title,
                    "meta_description": p.meta_description,
                    "tags": [t.slug for t in p.tags],
                    "images": [
                        {"id": str(img.id), "url": img.url, "alt_text": img.alt_text, "sort_order": img.sort_order}
                        for img in p.images
                    ],
                    "options": [
                        {
                            "id": str(opt.id),
                            "name": opt.name,
                            "values": opt.values,
                        }
                        for opt in p.options
                    ],
                    "variants": [
                        {
                            "id": str(v.id),
                            "sku": v.sku,
                            "price": float(v.price),
                            "stock_quantity": v.stock_quantity,
                            "options": v.options,
                        }
                        for v in p.variants
                    ],
                }
            )
        addresses = (await session.execute(select(Address))).scalars().all()
        data["addresses"] = [
            {
                "id": str(a.id),
                "user_id": str(a.user_id) if a.user_id else None,
                "line1": a.line1,
                "line2": a.line2,
                "city": a.city,
                "state": a.state,
                "postal_code": a.postal_code,
                "country": a.country,
            }
            for a in addresses
        ]
        orders = (await session.execute(select(Order))).scalars().all()
        data["orders"] = []
        for o in orders:
            data["orders"].append(
                {
                    "id": str(o.id),
                    "user_id": str(o.user_id) if o.user_id else None,
                    "status": o.status.value,
                    "total_amount": float(o.total_amount),
                    "currency": o.currency,
                    "reference_code": o.reference_code,
                    "shipping_address_id": str(o.shipping_address_id) if o.shipping_address_id else None,
                    "billing_address_id": str(o.billing_address_id) if o.billing_address_id else None,
                    "items": [
                        {
                            "id": str(oi.id),
                            "product_id": str(oi.product_id) if oi.product_id else None,
                            "quantity": oi.quantity,
                            "unit_price": float(oi.unit_price),
                            "subtotal": float(oi.subtotal),
                        }
                        for oi in o.items
                    ],
                }
            )
    output.write_text(json.dumps(data, indent=2), encoding="utf-8")
    print(f"Exported data to {output}")


async def import_data(input_path: Path) -> None:
    payload = json.loads(input_path.read_text(encoding="utf-8"))
    async with SessionLocal() as session:
        # users
        for u in payload.get("users", []):
            obj = await session.get(User, u["id"])
            if not obj:
                obj = User(id=u["id"], email=u["email"], hashed_password="placeholder", role=UserRole.customer)
            obj.name = u.get("name")
            obj.avatar_url = u.get("avatar_url")
            obj.preferred_language = u.get("preferred_language")
            obj.email_verified = u.get("email_verified", False)
            role = u.get("role")
            if role and role in UserRole._value2member_map_:
                obj.role = UserRole(role)
            session.add(obj)
        # categories
        for c in payload.get("categories", []):
            obj = await session.get(Category, c["id"])
            if not obj:
                obj = Category(id=c["id"], slug=c["slug"], name=c["name"])
            obj.slug = c["slug"]
            obj.name = c["name"]
            obj.description = c.get("description")
            obj.sort_order = c.get("sort_order", 0)
            session.add(obj)
        # tags
        tag_cache: Dict[str, Tag] = {}
        for p in payload.get("products", []):
            for slug in p.get("tags", []) or []:
                if slug in tag_cache:
                    continue
                existing = (await session.execute(select(Tag).where(Tag.slug == slug))).scalar_one_or_none()
                if existing:
                    tag_cache[slug] = existing
                else:
                    tag = Tag(slug=slug, name=slug.capitalize())
                    session.add(tag)
                    tag_cache[slug] = tag
        await session.flush()
        # products
        for p in payload.get("products", []):
            obj = await session.get(Product, p["id"])
            if not obj:
                obj = Product(id=p["id"], category_id=p["category_id"], sku=p["sku"], slug=p["slug"], name=p["name"])
            obj.category_id = p["category_id"]
            obj.sku = p["sku"]
            obj.slug = p["slug"]
            obj.name = p["name"]
            obj.short_description = p.get("short_description")
            obj.long_description = p.get("long_description")
            obj.base_price = p.get("base_price", 0)
            obj.currency = p.get("currency", "USD")
            obj.is_featured = p.get("is_featured", False)
            obj.stock_quantity = p.get("stock_quantity", 0)
            obj.status = p.get("status", obj.status)
            obj.publish_at = p.get("publish_at")
            obj.meta_title = p.get("meta_title")
            obj.meta_description = p.get("meta_description")
            obj.tags = [tag_cache[slug] for slug in p.get("tags", []) or []]
            session.add(obj)
            # images
            if p.get("images"):
                obj.images.clear()
                for img in p["images"]:
                    obj.images.append(
                        ProductImage(
                            id=img.get("id"),
                            url=img.get("url"),
                            alt_text=img.get("alt_text"),
                            sort_order=img.get("sort_order") or 0,
                        )
                    )
            # options
            if p.get("options"):
                obj.options.clear()
                for opt in p["options"]:
                    obj.options.append(ProductOption(id=opt.get("id"), name=opt.get("name"), values=opt.get("values", [])))
            # variants
            if p.get("variants"):
                obj.variants.clear()
                for v in p["variants"]:
                    obj.variants.append(
                        ProductVariant(
                            id=v.get("id"),
                            sku=v.get("sku"),
                            price=v.get("price"),
                            stock_quantity=v.get("stock_quantity", 0),
                            options=v.get("options", {}),
                        )
                    )
        # addresses
        for a in payload.get("addresses", []):
            obj = await session.get(Address, a["id"])
            if not obj:
                obj = Address(id=a["id"], user_id=a.get("user_id"))
            obj.user_id = a.get("user_id")
            obj.line1 = a.get("line1")
            obj.line2 = a.get("line2")
            obj.city = a.get("city")
            obj.state = a.get("state")
            obj.postal_code = a.get("postal_code")
            obj.country = a.get("country")
            session.add(obj)
        # shipping methods
        sm_lookup: Dict[str, ShippingMethod] = {}
        for o in payload.get("orders", []):
            sid = o.get("shipping_method_id")
            if sid and sid not in sm_lookup:
                existing = await session.get(ShippingMethod, sid)
                if existing:
                    sm_lookup[sid] = existing
                else:
                    sm = ShippingMethod(id=sid, name="Imported", rate_flat=0, rate_per_kg=0)
                    session.add(sm)
                    sm_lookup[sid] = sm
        await session.flush()
        # orders
        for o in payload.get("orders", []):
            obj = await session.get(Order, o["id"])
            if not obj:
                obj = Order(id=o["id"], user_id=o.get("user_id"), status=o.get("status"))
            obj.user_id = o.get("user_id")
            obj.status = o.get("status", obj.status)
            obj.total_amount = o.get("total_amount", 0)
            obj.currency = o.get("currency", "USD")
            obj.reference_code = o.get("reference_code")
            obj.shipping_address_id = o.get("shipping_address_id")
            obj.billing_address_id = o.get("billing_address_id")
            if o.get("shipping_method_id"):
                obj.shipping_method_id = o.get("shipping_method_id")
            obj.items.clear()
            for item in o.get("items", []):
                obj.items.append(
                    OrderItem(
                        id=item.get("id"),
                        product_id=item.get("product_id"),
                        quantity=item.get("quantity", 1),
                        unit_price=item.get("unit_price", 0),
                        subtotal=item.get("subtotal", 0),
                    )
                )
            session.add(obj)
        await session.commit()
    print("Import completed")


def main():
    parser = argparse.ArgumentParser(description="Data portability utilities")
    sub = parser.add_subparsers(dest="command")
    exp = sub.add_parser("export-data", help="Export data to JSON")
    exp.add_argument("--output", default="export.json", help="Output JSON path")
    imp = sub.add_parser("import-data", help="Import data from JSON")
    imp.add_argument("--input", required=True, help="Input JSON path")
    args = parser.parse_args()

    if args.command == "export-data":
        asyncio.run(export_data(Path(args.output)))
    elif args.command == "import-data":
        asyncio.run(import_data(Path(args.input)))
    else:
        parser.print_help()


if __name__ == "__main__":
    main()

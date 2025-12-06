import argparse
import asyncio
from pathlib import Path
from typing import set as SetType

from sqlalchemy import select

from app.db.session import SessionLocal
from app.models.catalog import ProductImage
from app.models.content import ContentImage
from app.core.config import settings
from app.services.storage import delete_file


async def collect_references() -> set[str]:
    paths: set[str] = set()
    async with SessionLocal() as session:
        product_imgs = (await session.execute(select(ProductImage.url))).scalars().all()
        content_imgs = (await session.execute(select(ContentImage.url))).scalars().all()
        for url in list(product_imgs) + list(content_imgs):
            if url:
                paths.add(url)
    return paths


def walk_media() -> set[str]:
    root = Path(settings.media_root)
    existing: set[str] = set()
    if not root.exists():
        return existing
    for path in root.rglob("*"):
        if path.is_file():
            rel_url = f"/media/{path.relative_to(root).as_posix()}"
            existing.add(rel_url)
    return existing


async def main(delete: bool) -> None:
    referenced = await collect_references()
    existing = walk_media()
    orphans = existing - referenced
    if not orphans:
        print("No orphaned files found.")
        return
    print(f"Found {len(orphans)} orphaned files:")
    for o in sorted(orphans):
        print(f" - {o}")
        if delete:
            delete_file(o)
    if delete:
        print("Deleted orphaned files.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Scan for orphaned media files")
    parser.add_argument("--delete", action="store_true", help="Delete orphaned files after listing")
    args = parser.parse_args()
    asyncio.run(main(args.delete))

import imghdr
import uuid
from pathlib import Path
from typing import Tuple

from fastapi import HTTPException, UploadFile, status

from app.core.config import settings


def ensure_media_root(root: str | Path | None = None) -> Path:
    path = Path(root or settings.media_root)
    path.mkdir(parents=True, exist_ok=True)
    return path


def save_upload(
    file: UploadFile,
    root: str | Path | None = None,
    filename: str | None = None,
    allowed_content_types: tuple[str, ...] | None = ("image/png", "image/jpeg", "image/webp", "image/gif"),
    max_bytes: int | None = 5 * 1024 * 1024,
) -> Tuple[str, str]:
    # Decide base directory (inside MEDIA_ROOT by default)
    base_root = Path(settings.media_root).resolve()
    dest_root = Path(root or base_root).resolve()
    dest_root.mkdir(parents=True, exist_ok=True)
    if not dest_root.is_relative_to(base_root):
        # Prevent writing outside media root
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid upload destination")

    # Read (bounded) content
    content = file.file.read(max_bytes + 1 if max_bytes else None)
    if max_bytes and len(content) > max_bytes:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="File too large")

    # Validate MIME and sniff basic type
    if allowed_content_types:
        if not file.content_type or file.content_type not in allowed_content_types:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid file type")
        sniff = imghdr.what(None, h=content)
        if sniff:
            sniff_mime = f"image/{'jpeg' if sniff == 'jpg' else sniff}"
            if sniff_mime not in allowed_content_types:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid file type")

    # Build unique, safe filename
    original_suffix = Path(file.filename or "").suffix.lower()
    safe_name = Path(filename or "").name if filename else ""
    if not safe_name:
        safe_name = f"{uuid.uuid4().hex}{original_suffix or '.bin'}"
    destination = dest_root / safe_name
    destination.write_bytes(content)

    # Web-accessible relative URL under /media
    try:
        rel_path = destination.relative_to(base_root).as_posix()
    except ValueError:
        rel_path = destination.name
    url_path = f"/media/{rel_path}"
    return url_path, destination.name


def delete_file(filepath: str) -> None:
    path_str = filepath
    if filepath.startswith("/media/"):
        rel = filepath.removeprefix("/media/")
        path_str = Path(settings.media_root) / rel
    path = Path(path_str)
    if path.exists():
        path.unlink()

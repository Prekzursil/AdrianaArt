from pathlib import Path
from typing import Tuple

from fastapi import UploadFile, HTTPException, status

from app.core.config import settings


def ensure_media_root(root: str | Path | None = None) -> Path:
    path = Path(root or settings.media_root)
    path.mkdir(parents=True, exist_ok=True)
    return path


def save_upload(
    file: UploadFile,
    root: str | Path | None = None,
    allowed_content_types: list[str] | None = None,
    max_bytes: int | None = None,
) -> Tuple[str, str]:
    media_root = ensure_media_root(root)
    destination = media_root / file.filename
    content = file.file.read()
    if allowed_content_types and file.content_type not in allowed_content_types:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid file type")
    if max_bytes and len(content) > max_bytes:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="File too large")
    destination.write_bytes(content)
    return str(destination), destination.name


def delete_file(filepath: str) -> None:
    path = Path(filepath)
    if path.exists():
        path.unlink()

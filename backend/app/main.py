from fastapi import FastAPI

from app.api.v1 import api_router
from app.core.config import settings


def get_application() -> FastAPI:
    app = FastAPI(title=settings.app_name, version=settings.app_version)
    app.include_router(api_router, prefix="/api/v1")
    return app


app = get_application()

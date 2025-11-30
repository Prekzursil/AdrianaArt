import asyncio
from typing import Awaitable, Callable

from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware

from app.core.config import settings


class BackpressureMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, max_concurrent: int | None = None):
        super().__init__(app)
        self.max_concurrent = max_concurrent or settings.max_concurrent_requests
        self.semaphore = asyncio.Semaphore(self.max_concurrent) if self.max_concurrent > 0 else None

    async def dispatch(self, request: Request, call_next: Callable[[Request], Awaitable]):
        if request.url.path.startswith("/api/v1/health"):
            return await call_next(request)
        if not self.semaphore:
            return JSONResponse(status_code=429, content={"detail": "Too many requests"})
        if self.semaphore._value <= 0:  # type: ignore[attr-defined]
            return JSONResponse(status_code=429, content={"detail": "Too many requests"})

        await self.semaphore.acquire()
        try:
            return await call_next(request)
        finally:
            self.semaphore.release()


class MaintenanceModeMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, bypass_token: str | None = None):
        super().__init__(app)
        self.bypass_token = bypass_token or settings.maintenance_bypass_token

    async def dispatch(self, request: Request, call_next: Callable[[Request], Awaitable]):
        if settings.maintenance_mode and not _is_exempt(request, self.bypass_token):
            return JSONResponse(
                status_code=503,
                content={"detail": "Maintenance mode"},
                headers={"Retry-After": "120"},
            )
        return await call_next(request)


def _is_exempt(request: Request, bypass_token: str | None) -> bool:
    if request.url.path.startswith("/api/v1/health"):
        return True
    if bypass_token and request.headers.get("X-Maintenance-Bypass") == bypass_token:
        return True
    return False

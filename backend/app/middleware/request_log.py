import logging
import time
import uuid

from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

logger = logging.getLogger("app.request")


class RequestLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        request_id = str(uuid.uuid4())
        start = time.time()
        request.state.request_id = request_id
        response = await call_next(request)
        duration = time.time() - start
        response.headers["X-Request-ID"] = request_id
        logger.info(
            "",
            extra={
                "request_id": request_id,
                "path": request.url.path,
                "method": request.method,
                "status_code": response.status_code,
                "duration_ms": int(duration * 1000),
            },
        )
        return response

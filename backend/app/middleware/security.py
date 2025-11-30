from __future__ import annotations

import json
import logging
import time
from typing import Any, Awaitable, Callable

from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware

from app.core.config import settings
from app.core.logging_config import request_id_ctx_var
from app.core.security import decode_token

audit_logger = logging.getLogger("app.audit")

SENSITIVE_KEYS = {"password", "new_password", "token", "refresh_token", "email"}


def _redact_payload(payload: Any) -> Any:
    if isinstance(payload, dict):
        return {k: ("***" if k.lower() in SENSITIVE_KEYS else _redact_payload(v)) for k, v in payload.items()}
    if isinstance(payload, list):
        return [_redact_payload(item) for item in payload]
    return payload


class AuditMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: Callable[[Request], Awaitable[Response]]) -> Response:
        body_text: str | None = None
        try:
            raw_body = await request.body()
            request._body = raw_body  # type: ignore[attr-defined]
            if raw_body and len(raw_body) < 4096:
                body_text = raw_body.decode("utf-8", errors="replace")
        except Exception:
            body_text = None

        user_id: str | None = None
        auth_header = request.headers.get("authorization")
        if auth_header and auth_header.lower().startswith("bearer "):
            token = auth_header.split(" ", 1)[1]
            decoded = decode_token(token)
            if decoded and decoded.get("sub"):
                user_id = str(decoded["sub"])

        start = time.time()
        response = await call_next(request)
        duration_ms = int((time.time() - start) * 1000)

        request_payload = None
        if body_text and "application/json" in request.headers.get("content-type", ""):
            try:
                request_payload = _redact_payload(json.loads(body_text))
            except Exception:
                request_payload = None

        audit_logger.info(
            "audit",
            extra={
                "request_id": request_id_ctx_var.get() or "-",
                "path": request.url.path,
                "method": request.method,
                "status_code": response.status_code,
                "user_id": user_id or "-",
                "client_ip": request.client.host if request.client else "-",
                "duration_ms": duration_ms,
                "request_payload": request_payload,
            },
        )
        return response


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: Callable[[Request], Awaitable[Response]]) -> Response:
        response = await call_next(request)
        if settings.csp_enabled:
            response.headers.setdefault("Content-Security-Policy", settings.csp_policy)
        if settings.secure_cookies:
            response.headers.setdefault("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload")
        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        response.headers.setdefault("Referrer-Policy", "no-referrer")
        return response

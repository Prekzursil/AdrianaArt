from __future__ import annotations

import json
import logging
from contextvars import ContextVar
from typing import Any

request_id_ctx_var: ContextVar[str | None] = ContextVar("request_id", default=None)


class RequestIdFilter(logging.Filter):
    """Attach request_id from contextvars to every log record."""

    def filter(self, record: logging.LogRecord) -> bool:  # pragma: no cover - trivial
        record.request_id = request_id_ctx_var.get() or "-"
        return True


class JsonFormatter(logging.Formatter):
    """Minimal JSON formatter for structured logs."""

    def format(self, record: logging.LogRecord) -> str:  # pragma: no cover - simple serialization
        base: dict[str, Any] = {
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
            "request_id": getattr(record, "request_id", "-"),
        }
        for field in ("path", "method", "status_code", "duration_ms"):
            value = getattr(record, field, None)
            if value is not None:
                base[field] = value
        return json.dumps(base, ensure_ascii=False)


def configure_logging(json_logs: bool = False) -> None:
    """Configure root logger with request-id aware formatter."""
    handler = logging.StreamHandler()
    handler.addFilter(RequestIdFilter())
    if json_logs:
        handler.setFormatter(JsonFormatter())
    else:
        handler.setFormatter(
            logging.Formatter("%(asctime)s [%(levelname)s] %(name)s [%(request_id)s] %(message)s")
        )

    logging.basicConfig(level=logging.INFO, handlers=[handler], force=True)

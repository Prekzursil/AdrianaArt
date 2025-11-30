import asyncio

from fastapi.testclient import TestClient

from app.core.config import settings
from app.main import get_application


def test_maintenance_mode_returns_503(monkeypatch):
    monkeypatch.setattr(settings, "maintenance_mode", True)
    app = get_application()
    client = TestClient(app)
    res = client.get("/api/v1/catalog/products")
    assert res.status_code == 503
    monkeypatch.setattr(settings, "maintenance_mode", False)


def test_backpressure_zero_concurrency(monkeypatch):
    monkeypatch.setattr(settings, "max_concurrent_requests", 0)
    app = get_application()
    client = TestClient(app)
    res = client.get("/api/v1/catalog/products")
    assert res.status_code == 429
    monkeypatch.setattr(settings, "max_concurrent_requests", 100)

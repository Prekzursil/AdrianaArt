from fastapi.testclient import TestClient

from app.main import app
from app.core.config import settings


client = TestClient(app)


def test_csp_header_present() -> None:
    res = client.get("/api/v1/health")
    assert res.headers.get("Content-Security-Policy") == settings.csp_policy


def test_hsts_toggle() -> None:
    settings.secure_cookies = True
    res = client.get("/api/v1/health")
    assert "Strict-Transport-Security" in res.headers
    settings.secure_cookies = False

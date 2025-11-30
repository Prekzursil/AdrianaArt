import time
from collections import defaultdict, deque
from typing import Deque, Callable, Optional

from fastapi import HTTPException, Request, status

# simple in-memory sliding window rate limiter
_buckets: dict[str, Deque[float]] = defaultdict(deque)


def limiter(key: str, limit: int, window_seconds: int = 60) -> Callable:
    def dependency(request: Request) -> None:
        now = time.time()
        bucket = _buckets[key]
        while bucket and now - bucket[0] > window_seconds:
            bucket.popleft()
        if len(bucket) >= limit:
            raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS, detail="Too many requests")
        bucket.append(now)

    return dependency


def per_identifier_limiter(
    identifier_getter: Callable[[Request], str], limit: int, window_seconds: int = 60
) -> Callable:
    def dependency(request: Request) -> None:
        identifier = identifier_getter(request)
        key = f"{identifier}:{request.url.path}"
        now = time.time()
        bucket = _buckets[key]
        while bucket and now - bucket[0] > window_seconds:
            bucket.popleft()
        if len(bucket) >= limit:
            raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS, detail="Too many requests")
        bucket.append(now)

    return dependency

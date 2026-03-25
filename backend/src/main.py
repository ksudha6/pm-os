from contextlib import asynccontextmanager

from fastapi import FastAPI

from backend.src.db import init_schema


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_schema()
    yield


app = FastAPI(lifespan=lifespan)


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}

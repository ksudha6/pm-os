from contextlib import asynccontextmanager

from fastapi import FastAPI

from backend.src.db import init_schema
from backend.src.routes.attempts import router as attempts_router
from backend.src.routes.cases import router as cases_router
from backend.src.routes.progress import router as progress_router
from backend.src.seed import seed_cases


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_schema()
    await seed_cases()
    yield


app = FastAPI(lifespan=lifespan)
app.include_router(cases_router)
app.include_router(attempts_router)
app.include_router(progress_router)


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}

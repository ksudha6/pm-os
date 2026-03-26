from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.src.db import init_schema
from backend.src.routes.attempts import router as attempts_router
from backend.src.routes.cases import router as cases_router
from backend.src.routes.evaluate import router as evaluate_router
from backend.src.routes.progress import router as progress_router
from backend.src.seed import seed_cases, seed_default_user


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_schema()
    await seed_cases()
    await seed_default_user()
    yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cases_router)
app.include_router(attempts_router)
app.include_router(evaluate_router)
app.include_router(progress_router)


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}

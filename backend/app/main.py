from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine, SessionLocal
from .config import settings
from . import models
from .utils import unique_slug
from .routers import auth_router, users_router, categories_router, posts_router, misc_router

Base.metadata.create_all(bind=engine)


def seed_categories():
    """Adds a starter set of categories if none exist yet, so the UI isn't empty on first run."""
    db = SessionLocal()
    try:
        if db.query(models.Category).count() > 0:
            return
        defaults = ["Technology", "Lifestyle", "Travel", "Health", "Business", "Personal"]
        for name in defaults:
            db.add(models.Category(name=name, slug=unique_slug(db, models.Category, name)))
        db.commit()
    finally:
        db.close()


seed_categories()

app = FastAPI(title="Thoughtify API", version="1.0.0")

origins = [settings.FRONTEND_ORIGIN, "http://localhost:5173", "http://127.0.0.1:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)
app.include_router(users_router.router)
app.include_router(categories_router.router)
app.include_router(posts_router.router)
app.include_router(misc_router.router)


@app.get("/")
def root():
    return {"status": "ok", "message": "Thoughtify API is running"}


@app.get("/api/health")
def health():
    return {"status": "healthy"}
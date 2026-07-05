from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from .config import settings


def _normalize_url(url: str) -> str:
    """Ensure SQLAlchemy uses the psycopg3 driver for Postgres URLs.
    Supabase gives plain 'postgresql://...' or 'postgres://...' strings;
    psycopg3 needs the 'postgresql+psycopg://' scheme. SQLite URLs (used
    for local testing) are passed through unchanged."""
    if url.startswith("postgres://"):
        url = "postgresql://" + url[len("postgres://"):]
    if url.startswith("postgresql://"):
        url = "postgresql+psycopg://" + url[len("postgresql://"):]
    return url


# Supabase Postgres needs sslmode=require in most setups; pooler URLs already handle this.
engine = create_engine(_normalize_url(settings.DATABASE_URL), pool_pre_ping=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

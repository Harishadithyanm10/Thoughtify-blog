from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.pool import NullPool

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


_url = _normalize_url(settings.DATABASE_URL)
_is_sqlite = _url.startswith("sqlite")

# Supabase's pooler (esp. transaction mode on port 6543) plays better with NullPool
# than SQLAlchemy's default connection pool, since the pooler manages pooling itself.
engine = create_engine(
    _url,
    pool_pre_ping=True,
    poolclass=NullPool if not _is_sqlite else None,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

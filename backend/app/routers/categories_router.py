from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import models, schemas, auth
from ..database import get_db
from ..utils import unique_slug

router = APIRouter(prefix="/api/categories", tags=["categories"])


@router.get("", response_model=list[schemas.CategoryOut])
def list_categories(db: Session = Depends(get_db)):
    return db.query(models.Category).order_by(models.Category.name).all()


@router.post("", response_model=schemas.CategoryOut, status_code=201)
def create_category(
    payload: schemas.CategoryCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    if db.query(models.Category).filter(models.Category.name == payload.name).first():
        raise HTTPException(400, "Category already exists")
    slug = unique_slug(db, models.Category, payload.name)
    category = models.Category(name=payload.name, slug=slug)
    db.add(category)
    db.commit()
    db.refresh(category)
    return category


@router.get("/{slug}/posts", response_model=list[schemas.PostListOut])
def posts_by_category(slug: str, db: Session = Depends(get_db)):
    category = db.query(models.Category).filter(models.Category.slug == slug).first()
    if not category:
        raise HTTPException(404, "Category not found")
    return (
        db.query(models.Post)
        .filter(models.Post.category_id == category.id)
        .order_by(models.Post.date.desc())
        .limit(4)
        .all()
    )

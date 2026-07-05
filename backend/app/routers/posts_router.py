from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import models, schemas, auth
from ..database import get_db
from ..utils import unique_slug

router = APIRouter(prefix="/api", tags=["posts"])


@router.get("/home", response_model=schemas.HomeOut)
def home(db: Session = Depends(get_db)):
    posts = db.query(models.Post).order_by(models.Post.id.desc()).all()
    main_post = (
        db.query(models.Post).filter(models.Post.main_post == True)  # noqa: E712
        .order_by(models.Post.id.desc()).limit(1).all()
    )
    recent = (
        db.query(models.Post).filter(models.Post.section == models.SectionEnum.recent)
        .order_by(models.Post.id.desc()).limit(5).all()
    )
    pop = (
        db.query(models.Post).filter(models.Post.section == models.SectionEnum.popular)
        .order_by(models.Post.id.desc()).limit(5).all()
    )
    trending = (
        db.query(models.Post).filter(models.Post.section == models.SectionEnum.trending)
        .order_by(models.Post.id.desc()).limit(5).all()
    )
    categories = db.query(models.Category).order_by(models.Category.name).all()

    return {
        "posts": posts,
        "main_post": main_post,
        "recent": recent,
        "pop": pop,
        "trending": trending,
        "categories": categories,
    }


@router.get("/posts/mine", response_model=list[schemas.PostListOut])
def my_posts(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    return (
        db.query(models.Post)
        .filter(models.Post.author_id == current_user.id)
        .order_by(models.Post.date.desc())
        .all()
    )


@router.get("/posts/{blog_slug}", response_model=schemas.PostOut)
def get_post(blog_slug: str, db: Session = Depends(get_db)):
    post = db.query(models.Post).filter(models.Post.blog_slug == blog_slug).first()
    if not post:
        raise HTTPException(404, "Post not found")
    return post


@router.post("/posts", response_model=schemas.PostOut, status_code=201)
def create_post(
    payload: schemas.PostCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    category = db.query(models.Category).filter(models.Category.id == payload.category_id).first()
    if not category:
        raise HTTPException(404, "Category not found")
    if db.query(models.Post).filter(models.Post.title == payload.title).first():
        raise HTTPException(400, "A post with this title already exists")

    slug = unique_slug(db, models.Post, payload.title)
    post = models.Post(
        title=payload.title,
        content=payload.content,
        image=payload.image,
        category_id=payload.category_id,
        blog_slug=slug,
        status=payload.status,
        section=payload.section,
        main_post=payload.main_post,
        author_id=current_user.id,
    )
    db.add(post)
    db.commit()
    db.refresh(post)
    return post


@router.put("/posts/{post_id}", response_model=schemas.PostOut)
def update_post(
    post_id: int,
    payload: schemas.PostUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    post = db.query(models.Post).filter(
        models.Post.id == post_id, models.Post.author_id == current_user.id
    ).first()
    if not post:
        raise HTTPException(404, "Post not found")

    data = payload.model_dump(exclude_unset=True)
    if "title" in data and data["title"] != post.title:
        post.blog_slug = unique_slug(db, models.Post, data["title"], instance_id=post.id)
    for field, value in data.items():
        setattr(post, field, value)

    db.commit()
    db.refresh(post)
    return post


@router.delete("/posts/{post_id}", status_code=204)
def delete_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    post = db.query(models.Post).filter(
        models.Post.id == post_id, models.Post.author_id == current_user.id
    ).first()
    if not post:
        raise HTTPException(404, "Post not found")
    db.delete(post)
    db.commit()


# ---------- Comments ----------

@router.get("/posts/{post_id}/comments", response_model=list[schemas.CommentOut])
def list_comments(post_id: int, db: Session = Depends(get_db)):
    return (
        db.query(models.Comment)
        .filter(models.Comment.post_id == post_id, models.Comment.parent_id.is_(None))
        .order_by(models.Comment.date.desc())
        .all()
    )


@router.post("/posts/{post_id}/comments", response_model=schemas.CommentOut, status_code=201)
def add_comment(
    post_id: int,
    payload: schemas.CommentCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(404, "Post not found")
    comment = models.Comment(
        post_id=post_id,
        author_id=current_user.id,
        content=payload.content,
        parent_id=payload.parent_id,
    )
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment

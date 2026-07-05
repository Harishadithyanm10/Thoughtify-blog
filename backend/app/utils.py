from slugify import slugify
from sqlalchemy.orm import Session


def unique_slug(db: Session, model, value: str, instance_id: int | None = None) -> str:
    """Generate a unique slug for `model.slug` (or blog_slug), appending -2, -3... on clash."""
    slug_field = "blog_slug" if hasattr(model, "blog_slug") else "slug"
    base = slugify(value)
    slug = base
    counter = 2
    while True:
        query = db.query(model).filter(getattr(model, slug_field) == slug)
        if instance_id:
            query = query.filter(model.id != instance_id)
        if not query.first():
            return slug
        slug = f"{base}-{counter}"
        counter += 1

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
import cloudinary
import cloudinary.uploader

from .. import models, schemas, auth
from ..email_utils import send_email
from ..config import settings

router = APIRouter(prefix="/api", tags=["misc"])

_cloudinary_configured = False


def _ensure_cloudinary():
    global _cloudinary_configured
    if _cloudinary_configured:
        return
    if not (settings.CLOUDINARY_CLOUD_NAME and settings.CLOUDINARY_API_KEY and settings.CLOUDINARY_API_SECRET):
        raise HTTPException(500, "Cloudinary is not configured on the server")
    cloudinary.config(
        cloud_name=settings.CLOUDINARY_CLOUD_NAME,
        api_key=settings.CLOUDINARY_API_KEY,
        api_secret=settings.CLOUDINARY_API_SECRET,
        secure=True,
    )
    _cloudinary_configured = True


@router.post("/contact")
def contact(payload: schemas.ContactIn):
    try:
        if settings.CONTACT_RECEIVER_EMAIL:
            send_email(
                subject=f"Contact Form Submission from {payload.name}",
                body=payload.message,
                to=[settings.CONTACT_RECEIVER_EMAIL],
                reply_to=payload.email,
            )
        send_email(
            subject=f"Contact Form Submission from {payload.name}",
            body=f"Your message has been received successfully. Your message: {payload.message}",
            to=[payload.email],
        )
        return {"success": True, "message": "Your message has been sent successfully!"}
    except Exception as e:
        raise HTTPException(500, f"Failed to send your message. Error: {e}")


@router.post("/upload")
def upload_image(
    file: UploadFile = File(...),
    current_user: models.User = Depends(auth.get_current_user),
):
    """Uploads an image to Cloudinary and returns its public secure URL."""
    _ensure_cloudinary()

    try:
        result = cloudinary.uploader.upload(
            file.file,
            folder=settings.CLOUDINARY_UPLOAD_FOLDER,
            resource_type="image",
        )
    except Exception as e:
        raise HTTPException(500, f"Image upload failed: {e}")

    return {"url": result["secure_url"]}
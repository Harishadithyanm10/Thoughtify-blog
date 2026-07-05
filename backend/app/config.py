from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

# backend/app/config.py -> backend/.env (absolute path, independent of CWD)
ENV_PATH = Path(__file__).resolve().parent.parent / ".env"


class Settings(BaseSettings):
    DATABASE_URL: str

    # --- Cloudinary (image uploads) ---
    CLOUDINARY_CLOUD_NAME: str = ""
    CLOUDINARY_API_KEY: str = ""
    CLOUDINARY_API_SECRET: str = ""
    CLOUDINARY_UPLOAD_FOLDER: str = "thoughtify"

    SECRET_KEY: str = "insecure-dev-secret"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440

    FRONTEND_ORIGIN: str = "http://localhost:5173"

    SMTP_HOST: str = ""
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    DEFAULT_FROM_EMAIL: str = "noreply@thoughtify.com"
    CONTACT_RECEIVER_EMAIL: str = ""

    model_config = SettingsConfigDict(env_file=ENV_PATH, extra="ignore")


try:
    settings = Settings()
except Exception as e:
    raise RuntimeError(
        f"Failed to load settings. Make sure '{ENV_PATH}' exists and has DATABASE_URL set "
        f"(copy .env.example to .env in the backend folder). Original error: {e}"
    ) from e
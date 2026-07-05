import smtplib
from email.mime.text import MIMEText

from .config import settings


def send_email(subject: str, body: str, to: list[str], reply_to: str | None = None) -> None:
    """Best-effort email sender. Silently no-ops if SMTP isn't configured,
    so registration/contact flows don't break in dev without email creds."""
    if not settings.SMTP_HOST or not settings.SMTP_USER:
        print(f"[email skipped - SMTP not configured] To: {to} | Subject: {subject}")
        return

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = settings.DEFAULT_FROM_EMAIL
    msg["To"] = ", ".join(to)
    if reply_to:
        msg["Reply-To"] = reply_to

    with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
        server.starttls()
        server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
        server.sendmail(settings.DEFAULT_FROM_EMAIL, to, msg.as_string())

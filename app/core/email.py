import httpx
from app.core.config import settings


def send_email(to: str, subject: str, html: str) -> None:
    if not settings.RESEND_API_KEY:
        print(f"[email] Skipping — RESEND_API_KEY not set.")
        return

    from_address = (
        f"Hummelk LLC <no-reply@{settings.FROM_DOMAIN}>"
        if settings.FROM_DOMAIN
        else "Hummelk LLC <onboarding@resend.dev>"
    )

    try:
        response = httpx.post(
            "https://api.resend.com/emails",
            headers={
                "Authorization": f"Bearer {settings.RESEND_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "from": from_address,
                "to": [to],
                "subject": subject,
                "html": html,
            },
            timeout=10,
        )
        response.raise_for_status()
        print(f"[email] Sent to {to} — id: {response.json().get('id')}")
    except httpx.HTTPStatusError as e:
        print(f"[email] Failed ({e.response.status_code}): {e.response.text}")
    except Exception as e:
        print(f"[email] Error sending to {to}: {e}")

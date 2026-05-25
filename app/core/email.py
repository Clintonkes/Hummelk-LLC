import resend
from app.core.config import settings

def send_email(to: str, subject: str, html: str):
    if not settings.RESEND_API_KEY:
        print(f"Skipping email to {to}: RESEND_API_KEY not set.")
        return
        
    resend.api_key = settings.RESEND_API_KEY
    
    try:
        # Default sender from Resend testing domain or a verified domain
        # If the user sets up a custom domain on Resend, they should change this.
        r = resend.Emails.send({
            "from": "Hummelk LLC <onboarding@resend.dev>",
            "to": [to],
            "subject": subject,
            "html": html
        })
        print(f"Email sent successfully: {r}")
    except Exception as e:
        print(f"Failed to send email to {to}: {e}")

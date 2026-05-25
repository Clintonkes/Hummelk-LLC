from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./hummelk.db"
    SECRET_KEY: str = "change-me-in-production-32-char-min"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 480
    ADMIN_EMAIL: str = "admin@hummelkllc.com"
    ADMIN_PASSWORD: str = "Admin@123!"
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:3000"
    RESEND_API_KEY: str = ""
    FROM_DOMAIN: str = ""  # e.g. hummelkllc.com — set after verifying domain in Resend

    @property
    def cors_origins_list(self) -> List[str]:
        return [o.strip() for o in self.CORS_ORIGINS.split(",")]

    class Config:
        env_file = ".env"

settings = Settings()

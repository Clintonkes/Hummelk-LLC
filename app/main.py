import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.core.config import settings
from app.api.routes import auth, bookings, messages, testimonials, services
from app.api.routes import settings as settings_router

app = FastAPI(
    title="Hummelk LLC API",
    description="Backend API for Hummelk LLC Cleaning Services",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API routes
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(bookings.router, prefix="/api/bookings", tags=["Bookings"])
app.include_router(messages.router, prefix="/api/messages", tags=["Messages"])
app.include_router(testimonials.router, prefix="/api/testimonials", tags=["Testimonials"])
app.include_router(services.router, prefix="/api/services", tags=["Services"])
app.include_router(settings_router.router, prefix="/api/settings", tags=["Settings"])

@app.get("/health")
def health():
    return {"status": "healthy"}

# Serve React frontend in production
FRONTEND_DIST = Path(__file__).parent.parent / "dist"

if FRONTEND_DIST.exists():
    app.mount("/assets", StaticFiles(directory=str(FRONTEND_DIST / "assets")), name="assets")

    @app.get("/{full_path:path}", include_in_schema=False)
    def serve_spa(full_path: str):
        index = FRONTEND_DIST / "index.html"
        return FileResponse(str(index))
else:
    @app.get("/")
    def root():
        return {"message": "Hummelk LLC API is running", "docs": "/docs"}

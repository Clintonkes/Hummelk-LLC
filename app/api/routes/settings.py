from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.schemas import SettingUpdate, SettingResponse, DashboardStats
from app.models.models import SiteSettings, Booking, Message, Testimonial, Service
from app.core.deps import get_current_admin

router = APIRouter()

@router.get("/dashboard/stats", response_model=DashboardStats)
def get_dashboard_stats(db: Session = Depends(get_db), _=Depends(get_current_admin)):
    return DashboardStats(
        total_bookings=db.query(Booking).count(),
        pending_bookings=db.query(Booking).filter(Booking.status == "pending").count(),
        completed_bookings=db.query(Booking).filter(Booking.status == "completed").count(),
        total_messages=db.query(Message).count(),
        unread_messages=db.query(Message).filter(Message.status == "unread").count(),
        total_testimonials=db.query(Testimonial).count(),
        pending_testimonials=db.query(Testimonial).filter(Testimonial.status == "pending").count(),
        total_services=db.query(Service).count(),
    )

@router.get("/", response_model=List[SettingResponse])
def get_settings(db: Session = Depends(get_db), _=Depends(get_current_admin)):
    return db.query(SiteSettings).all()

@router.put("/{key}", response_model=SettingResponse)
def update_setting(key: str, update: SettingUpdate, db: Session = Depends(get_db), _=Depends(get_current_admin)):
    setting = db.query(SiteSettings).filter(SiteSettings.key == key).first()
    if not setting:
        setting = SiteSettings(key=key, value=update.value)
        db.add(setting)
    else:
        setting.value = update.value
    db.commit()
    db.refresh(setting)
    return setting

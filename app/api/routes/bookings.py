from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.schemas.schemas import BookingCreate, BookingUpdate, BookingResponse
from app.models.models import Booking
from app.core.deps import get_current_admin

router = APIRouter()

from app.core.email import send_email

@router.post("/", response_model=BookingResponse, status_code=201)
def create_booking(booking: BookingCreate, db: Session = Depends(get_db)):
    db_booking = Booking(**booking.model_dump())
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    
    send_email(
        to=db_booking.email,
        subject="Booking Request Received - Hummelk LLC",
        html=f"<h3>Hello {db_booking.full_name},</h3><p>Thank you for requesting a {db_booking.service_type} on {db_booking.preferred_date} at {db_booking.preferred_time}. We are reviewing your request and will confirm shortly.</p><p>Best regards,<br>The Hummelk Team</p>"
    )
    return db_booking

@router.get("/", response_model=PaginatedBookings)
def get_bookings(skip: int = 0, limit: int = 50, status: Optional[str] = None,
                 db: Session = Depends(get_db), _=Depends(get_current_admin)):
    query = db.query(Booking)
    if status:
        query = query.filter(Booking.status == status)
    total = query.count()
    items = query.order_by(Booking.created_at.desc()).offset(skip).limit(limit).all()
    return {"items": items, "total": total}

@router.get("/{booking_id}", response_model=BookingResponse)
def get_booking(booking_id: int, db: Session = Depends(get_db), _=Depends(get_current_admin)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking

@router.put("/{booking_id}", response_model=BookingResponse)
def update_booking(booking_id: int, update: BookingUpdate, db: Session = Depends(get_db), _=Depends(get_current_admin)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
        
    old_status = booking.status
        
    for field, value in update.model_dump(exclude_none=True).items():
        setattr(booking, field, value)
    db.commit()
    db.refresh(booking)
    
    if old_status != booking.status:
        if booking.status == "confirmed":
            send_email(
                to=booking.email,
                subject="Booking Confirmed - Hummelk LLC",
                html=f"<h3>Hello {booking.full_name},</h3><p>Your {booking.service_type} booking for {booking.preferred_date} at {booking.preferred_time} has been <strong>confirmed</strong>!</p><p>See you then!</p>"
            )
        elif booking.status == "completed":
            send_email(
                to=booking.email,
                subject="Booking Completed - Hummelk LLC",
                html=f"<h3>Hello {booking.full_name},</h3><p>Your {booking.service_type} has been completed! Thank you for choosing Hummelk LLC. We'd love if you left us a review!</p>"
            )
            
    return booking

@router.delete("/{booking_id}")
def delete_booking(booking_id: int, db: Session = Depends(get_db), _=Depends(get_current_admin)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    db.delete(booking)
    db.commit()
    return {"message": "Booking deleted"}

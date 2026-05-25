from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.schemas.schemas import TestimonialCreate, TestimonialUpdate, TestimonialResponse
from app.models.models import Testimonial
from app.core.deps import get_current_admin

router = APIRouter()

@router.post("/", response_model=TestimonialResponse, status_code=201)
def create_testimonial(testimonial: TestimonialCreate, db: Session = Depends(get_db)):
    db_t = Testimonial(**testimonial.model_dump())
    db.add(db_t)
    db.commit()
    db.refresh(db_t)
    return db_t

@router.get("/", response_model=PaginatedTestimonials)
def get_testimonials(status: Optional[str] = None, featured: Optional[bool] = None,
                     skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    query = db.query(Testimonial)
    if status:
        query = query.filter(Testimonial.status == status)
    if featured is not None:
        query = query.filter(Testimonial.is_featured == featured)
    total = query.count()
    items = query.order_by(Testimonial.created_at.desc()).offset(skip).limit(limit).all()
    return {"items": items, "total": total}

@router.get("/{testimonial_id}", response_model=TestimonialResponse)
def get_testimonial(testimonial_id: int, db: Session = Depends(get_db), _=Depends(get_current_admin)):
    t = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if not t:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return t

@router.put("/{testimonial_id}", response_model=TestimonialResponse)
def update_testimonial(testimonial_id: int, update: TestimonialUpdate, db: Session = Depends(get_db), _=Depends(get_current_admin)):
    t = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if not t:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    for field, value in update.model_dump(exclude_none=True).items():
        setattr(t, field, value)
    db.commit()
    db.refresh(t)
    return t

@router.delete("/{testimonial_id}")
def delete_testimonial(testimonial_id: int, db: Session = Depends(get_db), _=Depends(get_current_admin)):
    t = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if not t:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    db.delete(t)
    db.commit()
    return {"message": "Testimonial deleted"}

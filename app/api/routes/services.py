from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.schemas import ServiceCreate, ServiceUpdate, ServiceResponse
from app.models.models import Service
from app.core.deps import get_current_admin

router = APIRouter()

@router.get("/", response_model=List[ServiceResponse])
def get_services(db: Session = Depends(get_db)):
    return db.query(Service).filter(Service.is_active == True).order_by(Service.order).all()

@router.get("/admin/all", response_model=List[ServiceResponse])
def get_all_services(db: Session = Depends(get_db), _=Depends(get_current_admin)):
    return db.query(Service).order_by(Service.order).all()

@router.post("/", response_model=ServiceResponse, status_code=201)
def create_service(service: ServiceCreate, db: Session = Depends(get_db), _=Depends(get_current_admin)):
    db_s = Service(**service.model_dump())
    db.add(db_s)
    db.commit()
    db.refresh(db_s)
    return db_s

@router.put("/{service_id}", response_model=ServiceResponse)
def update_service(service_id: int, update: ServiceUpdate, db: Session = Depends(get_db), _=Depends(get_current_admin)):
    s = db.query(Service).filter(Service.id == service_id).first()
    if not s:
        raise HTTPException(status_code=404, detail="Service not found")
    for field, value in update.model_dump(exclude_none=True).items():
        setattr(s, field, value)
    db.commit()
    db.refresh(s)
    return s

@router.delete("/{service_id}")
def delete_service(service_id: int, db: Session = Depends(get_db), _=Depends(get_current_admin)):
    s = db.query(Service).filter(Service.id == service_id).first()
    if not s:
        raise HTTPException(status_code=404, detail="Service not found")
    db.delete(s)
    db.commit()
    return {"message": "Service deleted"}

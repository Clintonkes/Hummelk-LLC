from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.schemas.schemas import MessageCreate, MessageUpdate, MessageResponse, PaginatedMessages
from app.models.models import Message
from app.core.deps import get_current_admin

router = APIRouter()

from app.core.email import send_email

@router.post("/", response_model=MessageResponse, status_code=201)
def create_message(message: MessageCreate, db: Session = Depends(get_db)):
    db_message = Message(**message.model_dump())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    
    # Send email notification
    send_email(
        to=db_message.email,
        subject="We've received your message - Hummelk LLC",
        html=f"<h3>Hello {db_message.full_name},</h3><p>Thank you for contacting Hummelk LLC. We have received your message regarding '{db_message.subject}' and will get back to you within 24 hours.</p><p>Best regards,<br>The Hummelk Team</p>"
    )
    
    return db_message

@router.get("/", response_model=PaginatedMessages)
def get_messages(skip: int = 0, limit: int = 50, status: Optional[str] = None,
                 db: Session = Depends(get_db), _=Depends(get_current_admin)):
    query = db.query(Message)
    if status:
        query = query.filter(Message.status == status)
    total = query.count()
    items = query.order_by(Message.created_at.desc()).offset(skip).limit(limit).all()
    return {"items": items, "total": total}

@router.get("/{message_id}", response_model=MessageResponse)
def get_message(message_id: int, db: Session = Depends(get_db), _=Depends(get_current_admin)):
    msg = db.query(Message).filter(Message.id == message_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
    return msg

@router.put("/{message_id}", response_model=MessageResponse)
def update_message(message_id: int, update: MessageUpdate, db: Session = Depends(get_db), _=Depends(get_current_admin)):
    msg = db.query(Message).filter(Message.id == message_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
    for field, value in update.model_dump(exclude_none=True).items():
        setattr(msg, field, value)
    db.commit()
    db.refresh(msg)
    return msg

@router.delete("/{message_id}")
def delete_message(message_id: int, db: Session = Depends(get_db), _=Depends(get_current_admin)):
    msg = db.query(Message).filter(Message.id == message_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
    db.delete(msg)
    db.commit()
    return {"message": "Message deleted"}

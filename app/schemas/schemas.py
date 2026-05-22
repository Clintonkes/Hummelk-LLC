from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class Token(BaseModel):
    access_token: str
    token_type: str
    admin_name: str
    admin_email: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class AdminBase(BaseModel):
    email: EmailStr
    name: str

class AdminCreate(AdminBase):
    password: str

class AdminUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None

class AdminResponse(AdminBase):
    id: int
    is_active: bool
    role: str
    created_at: Optional[datetime] = None
    class Config:
        from_attributes = True

class BookingCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    service_type: str
    preferred_date: str
    preferred_time: str
    address: str
    notes: Optional[str] = None

class BookingUpdate(BaseModel):
    status: Optional[str] = None
    admin_notes: Optional[str] = None

class BookingResponse(BookingCreate):
    id: int
    status: str
    admin_notes: Optional[str] = None
    created_at: Optional[datetime] = None
    class Config:
        from_attributes = True

class MessageCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str

class MessageUpdate(BaseModel):
    status: Optional[str] = None
    reply: Optional[str] = None

class MessageResponse(MessageCreate):
    id: int
    status: str
    reply: Optional[str] = None
    created_at: Optional[datetime] = None
    class Config:
        from_attributes = True

class TestimonialCreate(BaseModel):
    client_name: str
    location: Optional[str] = None
    rating: int = 5
    review: str
    service_type: Optional[str] = None

class TestimonialUpdate(BaseModel):
    status: Optional[str] = None
    is_featured: Optional[bool] = None

class TestimonialResponse(TestimonialCreate):
    id: int
    status: str
    is_featured: bool
    created_at: Optional[datetime] = None
    class Config:
        from_attributes = True

class ServiceCreate(BaseModel):
    name: str
    description: str
    short_description: Optional[str] = None
    price_from: Optional[float] = None
    icon: Optional[str] = None
    is_active: bool = True
    is_featured: bool = False
    order: int = 0

class ServiceUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    short_description: Optional[str] = None
    price_from: Optional[float] = None
    icon: Optional[str] = None
    is_active: Optional[bool] = None
    is_featured: Optional[bool] = None
    order: Optional[int] = None

class ServiceResponse(ServiceCreate):
    id: int
    created_at: Optional[datetime] = None
    class Config:
        from_attributes = True

class SettingUpdate(BaseModel):
    value: str

class SettingResponse(BaseModel):
    key: str
    value: Optional[str] = None
    description: Optional[str] = None
    class Config:
        from_attributes = True

class DashboardStats(BaseModel):
    total_bookings: int
    pending_bookings: int
    completed_bookings: int
    total_messages: int
    unread_messages: int
    total_testimonials: int
    pending_testimonials: int
    total_services: int

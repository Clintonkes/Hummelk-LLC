from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.schemas import Token, LoginRequest, AdminUpdate, AdminResponse
from app.models.models import Admin
from app.core.security import verify_password, create_access_token, get_password_hash
from app.core.deps import get_current_admin

router = APIRouter()

@router.post("/login", response_model=Token)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    admin = db.query(Admin).filter(Admin.email == request.email).first()
    if not admin or not verify_password(request.password, admin.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
    if not admin.is_active:
        raise HTTPException(status_code=400, detail="Account is disabled")
    token = create_access_token(data={"sub": admin.email})
    return Token(access_token=token, token_type="bearer", admin_name=admin.name, admin_email=admin.email)

@router.post("/logout")
def logout(current_admin: Admin = Depends(get_current_admin)):
    return {"message": "Logged out successfully"}

@router.get("/me", response_model=AdminResponse)
def get_me(current_admin: Admin = Depends(get_current_admin)):
    return current_admin

@router.put("/me", response_model=AdminResponse)
def update_me(update: AdminUpdate, db: Session = Depends(get_db), current_admin: Admin = Depends(get_current_admin)):
    if update.name:
        current_admin.name = update.name
    if update.email:
        current_admin.email = update.email
    if update.password:
        current_admin.hashed_password = get_password_hash(update.password)
    db.commit()
    db.refresh(current_admin)
    return current_admin

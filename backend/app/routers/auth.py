# app/routers/auth.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import SessionLocal
from .. import models, auth
from pydantic import BaseModel

router = APIRouter(prefix="/auth", tags=["auth"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class RegisterIn(BaseModel):
    username: str
    password: str

@router.post("/register")
def register(data: RegisterIn, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == data.username).first()
    if user:
        raise HTTPException(status_code=400, detail="Username exists")
    new = models.User(username=data.username, password_hash=auth.get_password_hash(data.password))
    db.add(new)
    db.commit()
    db.refresh(new)
    token = auth.create_access_token(new.id)
    return {"access_token": token, "token_type": "bearer"}

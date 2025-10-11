# app/routers/posts.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from .. import models
from pydantic import BaseModel
from datetime import datetime
from ..tasks import publish_post_task

router = APIRouter(prefix="/posts", tags=["posts"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class PostIn(BaseModel):
    content: str
    scheduled_at: datetime | None = None

@router.post("/schedule")
def schedule_post(data: PostIn, db: Session = Depends(get_db)):
    post = models.Post(content=data.content, scheduled_at=data.scheduled_at, status="scheduled", user_id=1)
    db.add(post)
    db.commit()
    db.refresh(post)
    # enqueue Celery task to publish at scheduled_at
    if data.scheduled_at:
        # Celery ETA based call:
        publish_post_task.apply_async(args=[post.id], eta=data.scheduled_at)
    else:
        publish_post_task.delay(post.id)
    return {"id": post.id, "status": post.status}

@router.post("/publish")
def publish_now(data: PostIn, db: Session = Depends(get_db)):
    # create post and publish immediately via Celery
    post = models.Post(content=data.content, status="scheduled", user_id=1)
    db.add(post)
    db.commit()
    db.refresh(post)
    publish_post_task.delay(post.id)
    return {"id": post.id}

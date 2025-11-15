@router.get("/calendar")
def get_calendar_posts(db: Session = Depends(get_db)):
    posts = db.query(models.Post).filter(models.Post.scheduled_at != None).all()
    return [
        {
            "id": p.id,
            "content": p.content,
            "scheduled_at": p.scheduled_at
        }
        for p in posts
    ]
@router.put("/reschedule/{post_id}")
def reschedule(post_id: int, body: dict, db: Session = Depends(get_db)):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(404, "Post not found")

    post.scheduled_at = body["scheduled_at"]
    db.commit()
    return {"status": "success"}


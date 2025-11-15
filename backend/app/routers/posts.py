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

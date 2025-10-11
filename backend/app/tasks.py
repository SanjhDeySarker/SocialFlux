# app/tasks.py
from celery import Celery
import os
from dotenv import load_dotenv
load_dotenv()

CELERY_BROKER = os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0")
CELERY_BACKEND = os.getenv("CELERY_RESULT_BACKEND", CELERY_BROKER)

celery_app = Celery("socialflux", broker=CELERY_BROKER, backend=CELERY_BACKEND)
celery_app.conf.task_default_queue = "socialflux"

from .database import SessionLocal
from . import models
from .services.social_api import publish_to_providers
from prometheus_client import Counter

# Prometheus metric
PUBLISH_SUCCESS = Counter("socialflux_publish_success_total", "Number of successful publishes")
PUBLISH_FAIL = Counter("socialflux_publish_fail_total", "Number of failed publishes")

@celery_app.task
def publish_post_task(post_id: int):
    db = SessionLocal()
    try:
        post = db.query(models.Post).get(post_id)
        if not post:
            return {"error": "post not found"}
        # call social publish service (handles providers and tokens)
        resp = publish_to_providers(post)
        post.status = "published" if resp.get("ok") else "failed"
        db.commit()
        if resp.get("ok"):
            PUBLISH_SUCCESS.inc()
        else:
            PUBLISH_FAIL.inc()
        return resp
    except Exception as e:
        PUBLISH_FAIL.inc()
        raise
    finally:
        db.close()

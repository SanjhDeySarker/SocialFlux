from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from .routers import auth as auth_router, posts
from prometheus_client import generate_latest, CONTENT_TYPE_LATEST
from fastapi.responses import Response

Base.metadata.create_all(bind=engine)

app = FastAPI(title="SocialFlux API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)
app.include_router(posts.router)

@app.get("/metrics")
def metrics():
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)

@app.get("/")
def root():
    return {"message": "SocialFlux backend running!"}

# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from .database import engine, Base
from .routers import posts, auth as auth_router, ai as ai_router
from prometheus_client import generate_latest, CONTENT_TYPE_LATEST
from fastapi.responses import Response

# create tables on startup (dev)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="SocialFlux API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # restrict in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# include routers
app.include_router(auth_router.router)
app.include_router(posts.router)
app.include_router(ai_router.router)

@app.get("/metrics")
def metrics():
    data = generate_latest()
    return Response(content=data, media_type=CONTENT_TYPE_LATEST)

@app.get("/")
def root():
    return {"message": "SocialFlux API running"}

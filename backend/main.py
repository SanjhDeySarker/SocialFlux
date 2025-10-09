from fastapi import FastAPI
from app.routers import posts, users

app = FastAPI(title="SocialFlux API")

app.include_router(posts.router)
app.include_router(users.router)

@app.get("/")
def root():
    return {"message": "SocialFlux API is running!"}

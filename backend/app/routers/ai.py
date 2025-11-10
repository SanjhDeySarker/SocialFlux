from fastapi import APIRouter, HTTPException
import requests

router = APIRouter(prefix="/ai", tags=["AI"])

@router.post("/analyze")
def analyze(data: dict):
    key = data.get("gemini_key")
    query = data.get("query", "")
    if not key:
        raise HTTPException(status_code=400, detail="Gemini API key missing")

    try:
        # Replace with actual Gemini endpoint
        response = requests.post(
            "https://api.gemini.google.com/v1/chat",
            json={"prompt": query},
            headers={"Authorization": f"Bearer {key}"},
            timeout=20,
        )
        response.raise_for_status()
        return {"response": response.json().get("output", "No AI response")}
    except Exception as e:
        return {"response": f"Error contacting Gemini API: {str(e)}"}

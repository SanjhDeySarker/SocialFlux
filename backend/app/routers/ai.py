from fastapi import APIRouter, HTTPException
import requests

router = APIRouter(prefix="/ai", tags=["AI"])

@router.post("/analyze")
def analyze(data: dict):
    key = data.get("gemini_key")
    query = data.get("query", "")
    if not key:
        raise HTTPException(status_code=400, detail="Gemini API key missing")

    # Replace this with the actual Gemini endpoint
    url = "https://api.gemini.google.com/v1/chat"
    headers = {"Authorization": f"Bearer {key}"}
    try:
        r = requests.post(url, json={"prompt": query}, headers=headers, timeout=20)
        r.raise_for_status()
        return {"response": r.json().get("output", "No response")}
    except Exception as e:
        return {"response": f"Error contacting Gemini API: {str(e)}"}

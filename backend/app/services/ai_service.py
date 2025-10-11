# app/services/ai_service.py
import os
import requests

GEMINI_API_URL = "https://api.gemini.example/v1"  # replace with actual
# We expect user to provide own Gemini API key via frontend (saved encrypted in DB)

def analyze_account(gemini_key, account_data):
    headers = {"Authorization": f"Bearer {gemini_key}"}
    prompt = f"Analyze account data: {account_data}"
    # Replace this with actual Gemini API call; example using requests
    r = requests.post(f"{GEMINI_API_URL}/chat", json={"prompt": prompt}, headers=headers, timeout=20)
    r.raise_for_status()
    return r.json()

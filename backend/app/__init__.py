import os
from dotenv import load_dotenv
from pathlib import Path

# load .env in backend folder
env_path = Path(__file__).resolve().parents[1] / ".env"   # adjust if needed
load_dotenv(env_path)

# now read values
DATABASE_URL = os.getenv("DATABASE_URL")
FERNET_KEY = os.getenv("FERNET_KEY")
SECRET_KEY = os.getenv("SECRET_KEY")

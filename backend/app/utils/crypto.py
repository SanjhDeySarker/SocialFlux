from cryptography.fernet import Fernet
import os

FERNET_KEY = os.getenv("FERNET_KEY")

def generate_key() -> str:
    return Fernet.generate_key().decode()

def get_fernet():
    if not FERNET_KEY:
        raise RuntimeError("FERNET_KEY missing in env")
    return Fernet(FERNET_KEY.encode())

def encrypt(plaintext: str) -> str:
    return get_fernet().encrypt(plaintext.encode()).decode()

def decrypt(token: str) -> str:
    return get_fernet().decrypt(token.encode()).decode()

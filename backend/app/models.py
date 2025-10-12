from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(128), unique=True, index=True, nullable=False)
    password_hash = Column(String(256), nullable=False)

    social_accounts = relationship("SocialAccount", back_populates="user")
    posts = relationship("Post", back_populates="user")

class SocialAccount(Base):
    __tablename__ = "social_accounts"
    id = Column(Integer, primary_key=True, index=True)
    provider = Column(String(50))
    account_id = Column(String(256))
    access_token_encrypted = Column(Text)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="social_accounts")

class Post(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    scheduled_at = Column(DateTime, nullable=True)
    status = Column(String(32), default="draft")
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="posts")
    provider = Column(String(50), nullable=True)

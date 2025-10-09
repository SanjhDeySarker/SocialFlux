# 🌊 SocialFlux — Post Once, Publish Everywhere

> **SocialFlux** is a self-hosted, all-in-one social media automation platform built with **Python + FastAPI**.  
> Create, schedule, and publish posts across multiple platforms — including **Facebook, Instagram, X, LinkedIn** — all from one dashboard.  
> Powered by **Gemini AI analytics** and designed for **local, privacy-first deployment** in Docker.

---

## 🪩 Overview

SocialFlux helps creators, marketers, and businesses manage all their social media channels from a **single interface**.  
It’s privacy-first, AI-assisted, and completely local — no third-party servers required.

---

## ✨ Features

- 📝 **Unified Post Editor** – Write once, publish everywhere.
- 🗓️ **Smart Scheduler** – Queue posts, delay publishing, and automatically retry failed posts.
- 🤖 **AI Analyzer (Gemini)** – Generate captions, predict engagement, and get post insights.
- 💬 **AI Chat Assistant** – Talk to your AI about account performance and strategy.
- 🔒 **Privacy-First** – All credentials stored locally and encrypted; no cloud dependency.
- 📊 **Monitoring Dashboard** – SLA metrics with **Prometheus + Grafana**.
- ⚙️ **Extensible Architecture** – Easily add new social networks or AI modules.

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React + TailwindCSS |
| **Backend** | FastAPI (Python) |
| **Scheduler** | APScheduler / Celery |
| **Queue** | Redis |
| **Database** | SQLite / PostgreSQL |
| **AI** | Gemini API (user-supplied key) |
| **Monitoring** | Prometheus + Grafana |
| **Containerization** | Docker / Docker Compose |

---

## 🐳 Quick Start

Clone and launch SocialFlux using Docker Compose:

```bash
git clone https://github.com/yourname/socialflux.git
Then open your browser at 👉 http://localhost:8080

You now have your private social media automation dashboard running locally.
⚙️ Configuration

Create a .env file in the project root:

DATABASE_URL=sqlite:///./data/socialflux.db
REDIS_URL=redis://redis:6379
GEMINI_API_KEY=your_own_gemini_api_key
SECRET_KEY=change_me


🔐 All credentials and API keys are stored locally and never sent to the cloud.
🧩 System Architecture
Frontend (React) → FastAPI Backend → Redis Queue / DB
                      ↘ Gemini AI
                      ↘ Prometheus → Grafana Dashboard


Everything runs inside a single Docker environment for easy local deployment.

📊 Monitoring

SocialFlux exposes Prometheus metrics:

Metric	Description
socialflux_jobs_success_total	Number of successful posts
socialflux_jobs_failed_total	Number of failed posts
socialflux_latency_seconds	Average API latency
socialflux_uptime_seconds	Service uptime

Use Grafana to visualize performance, SLA, and engagement insights.
cd socialflux
docker-compose up -d

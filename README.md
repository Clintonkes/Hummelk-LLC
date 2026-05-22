# Hummelk LLC — Professional Cleaning Website

Full-stack website for **Hummelk LLC** cleaning services (Brunswick, OH).  
Built with **React + Vite + Tailwind CSS** (frontend) and **FastAPI + SQLAlchemy** (backend).

---

## Project Structure

```
Hummelk-LLC/
├── frontend/          # React app (Vite + Tailwind CSS)
├── backend/           # FastAPI app
│   ├── app/
│   │   ├── api/routes/    # auth, bookings, messages, testimonials, services, settings
│   │   ├── core/          # config, security, deps
│   │   ├── models/        # SQLAlchemy models
│   │   └── schemas/       # Pydantic schemas
│   └── init_db.py         # DB seeder
├── Dockerfile         # Production Docker image
├── docker-compose.yml # Local dev with Docker
└── docker-entrypoint.sh
```

---

## Local Development

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python init_db.py                  # Creates DB + seeds data
uvicorn app.main:app --reload --port 8000
```

API docs: http://localhost:8000/docs  
Health: http://localhost:8000/health

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Site: http://localhost:5173

> The Vite dev server proxies `/api/*` requests to `http://localhost:8000`.

---

## Environment Variables

Copy `backend/.env.example` → `backend/.env` and set:

| Variable | Description |
|---|---|
| `DATABASE_URL` | SQLite (default) or PostgreSQL URI |
| `SECRET_KEY` | JWT signing secret — **change in production** |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password |
| `CORS_ORIGINS` | Comma-separated allowed origins |

---

## Admin Credentials (default)

| Field | Value |
|---|---|
| Email | `admin@hummelkllc.com` |
| Password | `Admin@123!` |

Admin panel: http://localhost:5173/admin/login

---

## Docker / Railway Deployment

### Build & run locally

```bash
docker-compose up --build
```

App available at: http://localhost:8000

### Railway deployment

1. Push the project to a GitHub repo
2. Create a new Railway project → **Deploy from GitHub repo**
3. Set environment variables in Railway:
   - `SECRET_KEY` — random 32+ char string
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD`
   - `DATABASE_URL` — use Railway's PostgreSQL plugin if desired
   - `CORS_ORIGINS` — your Railway app URL
4. Railway auto-detects the `Dockerfile` and deploys

The `PORT` env var is handled automatically by Railway — the entrypoint uses it.

---

## Pages

| URL | Description |
|---|---|
| `/` | Home — hero, services, why choose us, testimonials, FAQ, CTA |
| `/about` | About Hummelk LLC |
| `/services` | Full service list |
| `/booking` | Book a cleaning / request quote |
| `/testimonials` | Client reviews + submit form |
| `/faq` | Frequently asked questions |
| `/contact` | Contact form + info |
| `/admin/login` | Admin login |
| `/admin` | Admin dashboard (protected) |

---

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, React Router, Axios, React Hook Form, Lucide Icons
- **Backend**: FastAPI, SQLAlchemy, Pydantic v2, python-jose (JWT), passlib (bcrypt)
- **Database**: SQLite (dev) / PostgreSQL (prod)
- **Deployment**: Docker, Railway

---

## Contact

**Hummelk LLC**  
4709 Center Rd, Brunswick, OH 44212  
Phone: 1(440) 554-2773

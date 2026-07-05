# Thoughtify Backend (FastAPI + Supabase Postgres)

## Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env            # then fill in your Supabase + secret values
```

## Supabase setup

1. Create a project at https://supabase.com
2. Project Settings → Database → Connection string → copy the **URI** (use the "Session pooler" one for serverless-friendly connections) into `DATABASE_URL`.
3. (Optional, for image uploads) Project Settings → API → copy `Project URL` into `SUPABASE_URL` and the `service_role` key into `SUPABASE_KEY`.
4. In Storage, create a public bucket named `post-images` (or change `SUPABASE_BUCKET` in `.env`).

Tables are auto-created on first run via SQLAlchemy (`Base.metadata.create_all`). For production, replace this with Alembic migrations.

## Run

```bash
uvicorn app.main:app --reload --port 8000
```

API docs: http://localhost:8000/docs

## Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET  /api/auth/me`
- `GET  /api/users/profile`
- `PUT  /api/users/profile`
- `GET  /api/categories`
- `POST /api/categories`
- `GET  /api/categories/{slug}/posts`
- `GET  /api/home` — homepage feed (main/recent/popular/trending + categories)
- `GET  /api/posts/mine`
- `GET  /api/posts/{blog_slug}`
- `POST /api/posts`
- `PUT  /api/posts/{id}`
- `DELETE /api/posts/{id}`
- `GET  /api/posts/{id}/comments`
- `POST /api/posts/{id}/comments`
- `POST /api/contact`
- `POST /api/upload` — uploads image to Supabase Storage, returns public URL

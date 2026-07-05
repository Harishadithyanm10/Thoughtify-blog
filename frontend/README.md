# Thoughtify Frontend (Vite + React + Tailwind)

## Setup

```bash
cd frontend
npm install
cp .env.example .env    # set VITE_API_URL to your FastAPI backend URL
npm run dev
```

App runs at http://localhost:5173 and expects the FastAPI backend at the URL set in `VITE_API_URL` (default `http://localhost:8000/api`).

## Structure

- `src/api/client.js` — axios instance, attaches JWT from localStorage
- `src/context/AuthContext.jsx` — login/register/logout state
- `src/components/` — Navbar, Footer, Layout, Carousel, PostCards, Sidebar, PostForm, ProtectedRoute
- `src/pages/` — Home, Login, Register, PostDetail, CategoryPage, MyPosts, CreatePost, EditPost, Profile, ProfileEdit, About, Contact

## Build

```bash
npm run build
```

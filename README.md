# Sereine De Femme

A full-stack e-commerce app: **Express + MongoDB (Mongoose)** backend and a **React + Vite + Tailwind** frontend, with Razorpay checkout and a Groq-powered FAQ chatbot.

```
sereine-de-femme/
├── backend/            Express API server
│   ├── config/          DB connection
│   ├── controllers/     Route handlers (business logic)
│   ├── middleware/      Auth (JWT) and request logging
│   ├── models/          Mongoose schemas
│   ├── routes/          Express routers, mounted in server.js
│   ├── uploads/         Product images served at /uploads
│   ├── .env             Secrets — NOT committed (see below)
│   └── server.js        App entry point
└── frontend/           React app (Vite)
    ├── public/           Static assets (favicon, logo, videos)
    └── src/
        ├── components/
        │   ├── admin/                Admin panel (Login, Dashboard, AddProduct, UpdateProduct, Brand)
        │   └── customer/
        │       ├── auth/            Login, Register
        │       ├── hero/            Landing hero video
        │       ├── landingPage/     Home-page sections (Showcase, ContactUs, ProductDetails)
        │       ├── pages/           Standalone routed pages (Cart, Shop, BuyNow, Payment, ...)
        │       └── profile/         Profile, EditProfile
        ├── config/       API base URL, landing video config
        └── data/         Static content
```

All component files use PascalCase to match their exported component name
(React convention), and backend folders use the plural `controllers/` /
`models/` (Node/Express convention).

## Prerequisites
- Node.js 18+
- A MongoDB connection string (Atlas or local)
- A Razorpay account (test keys are fine for development)
- A Groq API key (for the FAQ chatbot)

## Setup

**1. Backend**
```bash
cd backend
npm install
# .env already contains working values for local dev — see "Security" below
npm run dev      # nodemon, auto-restarts on changes
# or
npm start        # plain node
```
Runs on `http://localhost:5000`.

**2. Frontend**
```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:5173` (Vite default) and talks to the backend at
`http://localhost:5000` (see `frontend/src/config/api.js` — override with a
`VITE_API_URL` env var if you deploy the backend elsewhere).

## Deploying
See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for step-by-step Render (backend) +
Vercel (frontend) instructions — including an important warning about
product image uploads on Render's free tier.

## Security note
`backend/.env` in this project ships with **live** credentials (MongoDB
password, JWT secret, Razorpay keys, Groq key) so the app runs out of the box
locally. Before deploying this anywhere public, or pushing it to a public
repo, **rotate every one of those credentials** and keep `.env` out of
version control (a `backend/.gitignore` is already set up to do this).

## What was verified in this pass
- Backend: every file passes a Node syntax check, all routes resolve to real
  controller exports, and the server boots cleanly.
- Frontend: clean `npm install` + `npm run build` succeeds, and ESLint's
  real (non-cosmetic) errors were fixed — see `CHANGES.md`.

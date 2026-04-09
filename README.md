# Simple Notes App

Full-stack notes app with:

- `backend/`: Express + MongoDB API
- `frontend/`: React + Vite client

The app supports sign up, sign in, and note CRUD for the authenticated user.

## Repo Structure

```text
simple-notes-app/
├── backend/
│   ├── index.js
│   ├── db.js
│   ├── middleware.js
│   ├── schema.js
│   └── .env.example
├── frontend/
│   ├── src/
│   ├── .env.local
│   └── .env.production
└── README.md
```

## Tech Stack

- Backend: Node.js, Express, Mongoose, JWT, Cookies, Zod
- Frontend: React, Vite, Axios, React Router, Chakra UI
- Database: MongoDB

## Prerequisites

- Node.js 18+
- npm
- A running MongoDB database, local or hosted

## How To Run Locally

Run the backend and frontend in two separate terminals.

### 1. Install Dependencies

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd frontend
npm install
```

### 2. Configure Backend Environment

Create `backend/.env` from [backend/.env.example](/home/piyush/projects/simple-notes-app/backend/.env.example):

```env
PORT=8080
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
ENVIRONMENT=development
```

Notes:

- `MONGODB_URI` must point to a working MongoDB instance.
- `ENVIRONMENT=development` is important for local cookies and CORS.
- `FRONTEND_URL` is mainly used in production, but keeping it aligned helps avoid confusion.

### 3. Configure Frontend Environment

Create or update `frontend/.env.local`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

This must include `/api`, because the backend routes are mounted as `/api/v1/...`.

### 4. Start The Backend

From `backend/`:

```bash
node index.js
```

Expected result:

- the API starts on `http://localhost:8080`
- MongoDB connection succeeds

### 5. Start The Frontend

From `frontend/`:

```bash
npm run dev
```

Vite normally starts on:

```text
http://localhost:5173
```

### 6. Use The App

Open `http://localhost:5173` in the browser.

Basic flow:

1. Create an account on `/`
2. Sign in on `/signin`
3. After authentication, the app navigates to `/notes`
4. Create and delete notes from the main screen

## Environment Variables

### Backend

Used by [backend/index.js](/home/piyush/projects/simple-notes-app/backend/index.js) and [backend/db.js](/home/piyush/projects/simple-notes-app/backend/db.js):

- `PORT`: backend port, usually `8080`
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: secret used to sign auth cookies
- `FRONTEND_URL`: allowed frontend origin for production CORS
- `ENVIRONMENT`: use `development` locally, `production` on deploy

### Frontend

Used by [frontend/src/api/axios.js](/home/piyush/projects/simple-notes-app/frontend/src/api/axios.js):

- `VITE_API_BASE_URL`: backend base URL, for example `http://localhost:8080/api`

Important:

- Vite only exposes env vars prefixed with `VITE_`.
- Frontend env vars are public and shipped to the browser. Do not put secrets there.

## Local Development Checklist

If the app does not work locally, check these first:

1. Backend is running on `http://localhost:8080`
2. Frontend is running on `http://localhost:5173`
3. `frontend/.env.local` points to `http://localhost:8080/api`
4. `backend/.env` has a valid `MONGODB_URI`
5. `backend/.env` uses `ENVIRONMENT=development`
6. You restarted the Vite server after changing frontend env vars

## If Deploy Fails, Run Locally Instead

Deployments for this app can fail because of cross-origin auth and cookie rules between frontend and backend hosts. Local development avoids most of that because:

- frontend and backend use known localhost origins
- backend sets non-production cookie settings in development
- CORS is simpler with `http://localhost:5173`

Use these local values:

```env
# backend/.env
PORT=8080
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
ENVIRONMENT=development
```

```env
# frontend/.env.local
VITE_API_BASE_URL=http://localhost:8080/api
```

## Common Problems

### CORS Error On Deploy

Symptom:

```text
blocked by CORS policy
```

Cause:

- backend `FRONTEND_URL` does not match the actual deployed frontend origin

Fix:

- update `FRONTEND_URL` on the backend host
- redeploy backend

### Login Succeeds But Notes Fail With 401

Cause:

- auth cookie was not stored
- wrong environment or cookie settings
- frontend is calling the wrong backend URL

Check:

- backend uses `ENVIRONMENT=development` locally
- frontend points to `http://localhost:8080/api`

### Frontend Still Uses Old API URL

Cause:

- Vite env vars are loaded at startup

Fix:

- update `frontend/.env.local`
- stop and restart `npm run dev`

### MongoDB Connection Fails

Cause:

- invalid or missing `MONGODB_URI`

Fix:

- verify the connection string
- ensure your MongoDB instance is reachable

## API Summary

Base URL locally:

```text
http://localhost:8080/api
```

Routes:

- `POST /v1/signup`
- `POST /v1/signin`
- `GET /v1/notes`
- `POST /v1/notes`
- `PATCH /v1/notes/:id`
- `DELETE /v1/notes/:id`

## Notes

- The backend currently has no dedicated `npm start` script; run it with `node index.js`.
- The frontend can be built with `npm run build`.
- The frontend lint command exists, but current lint errors are unrelated to the local run flow.

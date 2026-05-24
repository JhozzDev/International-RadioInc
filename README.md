
# International Radio — Next.js + FastAPI

## Estructura

```
international-radio-next/   ← Frontend Next.js + Tailwind
python-api/
  main.py                   ← API Python (FastAPI) sin cambios de lógica
  requirements.txt
```

## Cómo correr

### 1. API Python (puerto 8000)
```bash
cd python-api
pip install -r requirements.txt
uvicorn main:app --reload
```

### 2. Frontend Next.js (puerto 3000)
```bash
npm install
npm run dev
```

La variable `NEXT_PUBLIC_API_URL` en `.env.local` apunta al API:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Páginas
- `/`       → Landing page
- `/radio`  → Reproductor de radio
- `/world`  → Free world

<img width="1616" height="876" alt="bandicam 2026-05-23 23-21-23-876" src="https://github.com/user-attachments/assets/d413c176-5bf9-40e0-a199-e7356b0bd1f8" />


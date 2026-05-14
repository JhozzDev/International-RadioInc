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
- `/map`    → Mapa Libre

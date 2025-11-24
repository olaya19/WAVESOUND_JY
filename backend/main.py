from fastapi import FastAPI
from app_wavesound.routes import usuarios, canciones, perfiles, reproducciones, favorito, albumes 
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI(
    title="WaveSound API",
    description="API para gestión de usuarios, canciones y derechos de autor.",
    version="1.0.0",
    debug=True
)
app.mount("/static", StaticFiles(directory="app_wavesound/static"), name="static")

# 🔓 Permitir acceso desde cualquier origen (solo en desarrollo)
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Montamos routers sin duplicar prefijos
app.include_router(usuarios.router)
app.include_router(albumes.router)
app.include_router(perfiles.router)
app.include_router(canciones.router)
app.include_router(reproducciones.router)
app.include_router(favorito.router)

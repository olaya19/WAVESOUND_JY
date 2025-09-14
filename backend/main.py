from fastapi import FastAPI
from app_wavesound.routes import usuarios,canciones  # importa tus routers
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="WaveSound API",
    description="API para gestión de usuarios, canciones y derechos de autor.",
    version="1.0.0",
    debug=True
)

origins = [
    "http://localhost:5173",  # frontend
    "http://127.0.0.1:5173",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # o ["*"] para permitir todos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# --------- Montar Routers ---------
app.include_router(usuarios.router)
app.include_router(canciones.router)

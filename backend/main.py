from fastapi import FastAPI
from app_wavesound.routes import usuarios  # importa tus routers

app = FastAPI(
    title="WaveSound API",
    description="API para gestión de usuarios, canciones y derechos de autor.",
    version="1.0.0",
    debug=True
)

# --------- Montar Routers ---------
app.include_router(usuarios.router)
 

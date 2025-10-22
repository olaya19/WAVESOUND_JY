import pytest
from fastapi.testclient import TestClient
from main import app
from app_wavesound.routes import canciones
import app_wavesound.controllers.canciones_services as canciones_services

client = TestClient(app)

cancion_data = {
    "titulo": "Canción de prueba",
    "descripcion": "Descripción",
    "duracion": 180,
    "archivo_url": "http://example.com/archivo.mp3",
    "portada_url": "http://example.com/portada.jpg",
    "id_genero": 1,
    "id_album": 1,
    "id_usuario": 1
}

# Fake del servicio
def fake_crear_cancion(db, cancion):
    return {**cancion.dict(), "id_cancion": 1, "fecha_creacion": "2025-09-24T17:00:00"}

# 🔹 Dependencia de usuario autenticado
app.dependency_overrides[canciones.get_current_user] = lambda: 1
# 🔹 Sobreescribimos el servicio
canciones_services.crear_cancion = fake_crear_cancion

def test_crear_cancion():
    response = client.post("/canciones/", json=cancion_data)
    assert response.status_code == 200
    data = response.json()
    assert data["titulo"] == cancion_data["titulo"]
    assert data["id_cancion"] == 1

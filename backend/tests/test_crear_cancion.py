import pytest
from fastapi.testclient import TestClient
from main import app

from app_wavesound.routes import canciones
import app_wavesound.controllers.canciones_services as canciones_services

client = TestClient(app)

# -------------------------
# Datos simulados para la creación
# -------------------------
cancion_data = {
    "titulo": "Bang Bang",
    "descripcion": "Canción de prueba automatizada",
    "duracion": 180,
    "archivo_url": "https://example.com/bangbang.mp3",
    "portada_url": "https://example.com/bangbang.jpg",
    "id_genero": 3,
    "id_album": 1,
    "id_usuario": 11  # Se sobreescribe con el usuario autenticado
}

# -------------------------
# Fake del servicio real
# -------------------------
def fake_crear_cancion(db, cancion):
    # Simula respuesta final desde el servicio
    return {
        "id_cancion": 3,
        "titulo": cancion.titulo,
        "descripcion": cancion.descripcion,
        "duracion": cancion.duracion,
        "archivo_url": cancion.archivo_url,
        "portada_url": cancion.portada_url,
        "id_genero": cancion.id_genero,
        "id_album": cancion.id_album,
        "id_usuario": cancion.id_usuario,
        "fecha_creacion": "2025-12-12T10:00:00"
    }

# -------------------------
# Fake de usuario autenticado (como objeto)
# -------------------------
class FakeUser:
    id_usuario = 11

app.dependency_overrides[canciones.get_current_user] = lambda: FakeUser()

# Sobreescribimos el servicio
canciones_services.crear_cancion = fake_crear_cancion


# -------------------------
# Prueba principal
# -------------------------
def test_crear_cancion():
    response = client.post("/canciones/", json=cancion_data)
    assert response.status_code == 200

    data = response.json()

    assert data["id_cancion"] == 3
    assert data["titulo"] == "Bang Bang"
    assert data["descripcion"] == "Canción de prueba automatizada"
    assert data["duracion"] == 180
    assert data["archivo_url"].startswith("https://")
    assert data["id_usuario"] == 11

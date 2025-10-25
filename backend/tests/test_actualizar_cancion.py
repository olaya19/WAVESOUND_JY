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
    "id_album": 1
}

# Fake del servicio
def fake_actualizar_cancion(db, id_cancion, datos):
    if id_cancion == 1:
        return {**datos.model_dump(), "id_cancion": 1, "fecha_creacion": "2025-09-24T17:00:00"}
    return None


# Overrides
app.dependency_overrides[canciones.get_current_user] = lambda: 1
canciones_services.actualizar_cancion = fake_actualizar_cancion

def test_actualizar_cancion():
    update_data = cancion_data.copy()
    update_data["titulo"] = "Título actualizado"

    response = client.put("/canciones/1", json=update_data)
    assert response.status_code == 200
    data = response.json()
    assert data["titulo"] == "Título actualizado"
    assert data["id_cancion"] == 1

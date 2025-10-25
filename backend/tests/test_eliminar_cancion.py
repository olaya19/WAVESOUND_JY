import pytest
from fastapi.testclient import TestClient
from main import app
from app_wavesound.routes import canciones
import app_wavesound.controllers.canciones_services as canciones_services

client = TestClient(app)

# Fake del servicio
def fake_eliminar_cancion(db, id_cancion):
    return id_cancion == 1

# Overrides
app.dependency_overrides[canciones.get_current_user] = lambda: 1
canciones_services.eliminar_cancion = fake_eliminar_cancion

def test_eliminar_cancion():
    response = client.delete("/canciones/1")
    assert response.status_code == 200
    data = response.json()
    assert "eliminada correctamente" in data["msg"]

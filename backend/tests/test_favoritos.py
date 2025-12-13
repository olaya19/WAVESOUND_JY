import pytest
from fastapi.testclient import TestClient
from types import SimpleNamespace
from datetime import datetime
from main import app
from app_wavesound.routes import favorito
import app_wavesound.controllers.favoritos_services as favoritos_services

client = TestClient(app)

# -------------------------------
# Datos de ejemplo para la prueba
# -------------------------------
favorito_data = {
    "id_cancion": 3
}

# Usuario autenticado simulado
fake_user = SimpleNamespace(id_usuario=14, nickname="dani123", id_rol=2)

# -------------------------------
# Fakes de servicios
# -------------------------------
def fake_agregar_favorito(db, id_usuario, favorito):
    # Devolver un objeto compatible con FavoritoOut
    return {
        "id_favorito": 1,
        "id_usuario": id_usuario,
        "id_cancion": favorito.id_cancion,
        "fecha_agregado": datetime.now()
    }

def fake_listar_favoritos(db, id_usuario):
    # Lista de favoritos simulada compatible con FavoritoOut
    return [
        {
            "id_favorito": 1,
            "id_usuario": id_usuario,
            "id_cancion": 3,
            "fecha_agregado": datetime.now()
        }
    ]

def fake_eliminar_favorito(db, id_usuario, id_cancion):
    return {"msg": "Favorito eliminado"}

# -------------------------------
# Overrides para pruebas
# -------------------------------
app.dependency_overrides[favorito.get_current_user] = lambda: fake_user
favoritos_services.agregar_favorito = fake_agregar_favorito
favoritos_services.listar_favoritos_usuario = fake_listar_favoritos
favoritos_services.eliminar_favorito = fake_eliminar_favorito

# -------------------------------
# TEST: Agregar a Favoritos
# -------------------------------
def test_agregar_favorito():
    response = client.post("/favoritos/", json=favorito_data)
    assert response.status_code == 200

    data = response.json()
    assert data["id_usuario"] == fake_user.id_usuario
    assert data["id_cancion"] == favorito_data["id_cancion"]
    assert "id_favorito" in data
    assert "fecha_agregado" in data

# -------------------------------
# TEST: Listar Favoritos del Usuario
# -------------------------------
def test_listar_favoritos_usuario():
    response = client.get("/favoritos/")
    assert response.status_code == 200

    data = response.json()
    assert len(data) == 1
    assert data[0]["id_usuario"] == fake_user.id_usuario
    assert data[0]["id_cancion"] == 3
    assert "id_favorito" in data[0]
    assert "fecha_agregado" in data[0]

# -------------------------------
# TEST: Eliminar Favorito
# -------------------------------
def test_eliminar_favorito():
    response = client.delete("/favoritos/3")
    assert response.status_code == 200

    data = response.json()
    assert data["msg"] == "Favorito eliminado"

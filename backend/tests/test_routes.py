import pytest
from fastapi.testclient import TestClient
from unittest.mock import MagicMock
import sys, os

# 👇 Esto agrega el directorio backend/ al path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Importa tu app principal
from main import app
from app_wavesound.routes import usuarios


client = TestClient(app)

# ----------------------------
# FIXTURES
# ----------------------------

@pytest.fixture
def mock_db():
    return MagicMock()

@pytest.fixture
def mock_user_id():
    return 1  # simulamos un usuario autenticado



# ----------------------------
# TEST USUARIOS
# ----------------------------
def test_register_usuario(monkeypatch, mock_db):
    mock_user = {
    "id_usuario": 1,
    "nombre_usuario": "test",
    "nickname": "tester",
    "email": "test@mail.com",
    "rol": {"id_rol": 2, "nombre": "Artista", "rol": "Artista"}
}

    monkeypatch.setattr(usuarios, "registrar_usuario", lambda db, user_data: mock_user)
    monkeypatch.setattr(usuarios, "get_db", lambda: mock_db)

    response = client.post("/usuarios/register", json={
        "nickname": "tester",
        "nombre_usuario": "test",
        "email": "test@mail.com",
        "contraseña": "1234",   # <-- usa el nombre correcto
        "id_rol": 2
    })

    assert response.status_code == 200
    assert response.json()["nombre_usuario"] == "test"


def test_listar_usuarios(monkeypatch, mock_db):
    mock_users = [{
    "id_usuario": 1,
    "nombre_usuario": "test",
    "nickname": "tester",
    "email": "test@mail.com",               
    "rol": {"id_rol": 2, "nombre": "Artista", "rol": "Artista"}
}]

    monkeypatch.setattr(usuarios, "obtener_usuarios", lambda db: mock_users)
    monkeypatch.setattr(usuarios, "get_db", lambda: mock_db)

    response = client.get("/usuarios/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert response.json()[0]["nickname"] == "tester"
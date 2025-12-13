import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi.testclient import TestClient
from main import app
from app_wavesound.db.database import SessionLocal
from app_wavesound.models.models import Usuarios

client = TestClient(app)

def verificar_usuario_manual(email):
    """Marca el usuario como verificado en la BD (solo uso interno de pruebas)."""
    db = SessionLocal()
    usuario = db.query(Usuarios).filter(Usuarios.email == email).first()
    if usuario:
        usuario.is_verified = True
        db.commit()
    db.close()


def test_login_usuario_existente():
    """
    Un usuario existente y verificado debe poder iniciar sesión.
    """

    data = {
        "nickname": "usuario_login_test",
        "nombre_usuario": "Usuario Login Test",
        "email": "usuario_login_test@correo.com",
        "contraseña": "1234",
        "id_rol": 1
    }

    # Crear usuario de prueba
    client.post("/usuarios/register", json=data)

    # Verificar manualmente en BD para permitir login
    verificar_usuario_manual(data["email"])

    # Hacer login
    response = client.post(
        "/usuarios/login",
        data={"username": "usuario_login_test", "password": "1234"}
    )

    assert response.status_code == 200, response.text
    json = response.json()

    assert "access_token" in json
    assert json["id_usuario"]
    assert json["nombre_usuario"] == data["nombre_usuario"]


def test_login_usuario_incorrecto():
    """
    Un usuario con credenciales inválidas debe ser rechazado con 401.
    """
    response = client.post(
        "/usuarios/login",
        data={"username": "usuario_inexistente", "password": "wrongpass"}
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Credenciales inválidas"

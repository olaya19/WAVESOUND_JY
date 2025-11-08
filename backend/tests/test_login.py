import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_login_usuario_existente():
    """
    Prueba que un usuario existente pueda iniciar sesión correctamente.
    """
    # Crear usuario de prueba
    data = {
        "nickname": "usuario_prueba",
        "nombre_usuario": "Usuario Prueba",
        "email": "usuario_prueba@correo.com",
        "contraseña": "1234",
        "id_rol": 1
    }
    client.post("/usuarios/register", json=data)

    # Intentar iniciar sesión con el nickname
    response = client.post(
        "/usuarios/login",
        data={"username": "usuario_prueba", "password": "1234"}
    )

    assert response.status_code == 200, response.text
    assert "access_token" in response.json()


def test_login_usuario_incorrecto():
    """
    Prueba que un usuario con credenciales incorrectas no pueda iniciar sesión.
    """
    response = client.post(
        "/usuarios/login",
        data={"username": "usuario_inexistente", "password": "wrongpass"}
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Credenciales inválidas"

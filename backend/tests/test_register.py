import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_registro_usuario_nuevo():
    """
    Prueba el registro de un nuevo usuario.
    """
    data = {
        "nickname": "nuevo_usuario",
        "nombre_usuario": "Nuevo Usuario",
        "email": "nuevo@correo.com",
        "contraseña": "1234",
        "id_rol": 1
    }
    response = client.post("/usuarios/register", json=data)

    assert response.status_code in [200, 201], response.text
    assert "id_usuario" in response.json()


def test_registro_usuario_existente():
    """
    Prueba que no se pueda registrar un usuario ya existente.
    """
    data = {
        "nickname": "usuario_prueba",
        "nombre_usuario": "Usuario Prueba",
        "email": "usuario_prueba@correo.com",
        "contraseña": "1234",
        "id_rol": 1
    }
    # Intentar registrarlo otra vez
    response = client.post("/usuarios/register", json=data)

    assert response.status_code in [400, 409], response.text

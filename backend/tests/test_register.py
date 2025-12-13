import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_registro_usuario_nuevo():
    """
    Verifica que el sistema permita registrar un usuario nuevo.
    El resultado esperado es un código 200/201 y un id_usuario generado.
    """
    data = {
        "nickname": "nuevo_usuario_test",
        "nombre_usuario": "Nuevo Usuario Test",
        "email": "nuevo_usuario_test@correo.com",
        "contraseña": "1234",
        "id_rol": 1
    }

    response = client.post("/usuarios/register", json=data)

    assert response.status_code in [200, 201], response.text
    json = response.json()
    assert "id_usuario" in json
    assert json["nombre_usuario"] == data["nombre_usuario"]


def test_registro_usuario_existente():
    """
    Verifica que el sistema bloquee el registro de un usuario repetido.
    Debe retornar un 400 o 409.
    """
    data = {
        "nickname": "usuario_prueba",
        "nombre_usuario": "Usuario Prueba",
        "email": "usuario_prueba@correo.com",
        "contraseña": "1234",
        "id_rol": 1
    }

    # Primera vez (por si el test se corre aislado)
    client.post("/usuarios/register", json=data)

    # Segunda vez debe fallar
    response = client.post("/usuarios/register", json=data)

    assert response.status_code in [400, 409], response.text

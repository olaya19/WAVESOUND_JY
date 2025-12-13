import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

# -------------------------------------------------------------
# 🚀 LOGIN PARA OBTENER TOKEN (OAuth2PasswordRequestForm)
# -------------------------------------------------------------
def login(email: str, password: str):
    """
    Hace login usando OAuth2PasswordRequestForm
    """
    response = client.post(
        "/usuarios/login",
        data={       # OBLIGATORIO: enviar como x-www-form-urlencoded
            "username": email,
            "password": password
        }
    )

    assert response.status_code == 200, f"Error al iniciar sesión: {response.text}"

    return response.json()["access_token"]


# -------------------------------------------------------------
# TEST 1: ACTUALIZAR PERFIL EXITOSO
# -------------------------------------------------------------
def test_actualizar_perfil_exitoso():

    # Login con tu usuario REAL
    token = login("yeral@gmail.com", "yeral123")

    headers = {"Authorization": f"Bearer {token}"}

    # Datos del perfil (form-data)
    payload = {
        "nombre_artista": "Yeraldin Actualizada",
        "biografia": "Nueva biografía automática de prueba.",
        "generos_ids": "[1,2]"  # debe ser un string porque es Form(...)
    }

    # PUT /perfiles/editar
    response = client.put(
        "/perfiles/editar",
        headers=headers,
        data=payload,   # form-data
        files={}        # requerido si no se envía foto
    )

    assert response.status_code == 200, response.text

    # Verificar cambios en /perfiles/me
    r_me = client.get("/perfiles/me", headers=headers)
    assert r_me.status_code == 200

    perfil = r_me.json()

    assert perfil["nombre_artista"] == payload["nombre_artista"]
    assert perfil["biografia"] == payload["biografia"]


# -------------------------------------------------------------
# TEST 2: NO PERMITE EDITAR SIN AUTENTICACIÓN
# -------------------------------------------------------------
def test_actualizar_perfil_sin_autenticacion():

    payload = {
        "nombre_artista": "Hackerman",
        "biografia": "Intento ilegal",
        "generos_ids": "[1]"
    }

    response = client.put(
        "/perfiles/editar",
        data=payload,
        files={}
    )

    assert response.status_code in [401, 403]


# -------------------------------------------------------------
# TEST 3: BLOQUEO DE PALABRAS OFENSIVAS
# -------------------------------------------------------------
def test_actualizar_perfil_lenguaje_ofensivo():

    token = login("yeral@gmail.com", "yeral123")
    headers = {"Authorization": f"Bearer {token}"}

    payload = {
        "nombre_artista": "Yeraldin",
        "biografia": "Soy una maldita basura",  # texto ofensivo para prueba
        "generos_ids": "[2]"
    }

    response = client.put(
        "/perfiles/editar",
        headers=headers,
        data=payload,
        files={}
    )

    assert response.status_code in [400, 422]

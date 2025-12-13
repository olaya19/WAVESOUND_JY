# tests/test_derechos_autor.py
import os
import pytest
from fastapi.testclient import TestClient
from main import app
from app_wavesound.routes import derechos_autor
from app_wavesound.controllers import derechos_autor_services
from datetime import datetime
from fastapi.responses import FileResponse

client = TestClient(app)

# -----------------------------
# Datos de prueba
# -----------------------------
registro_data = {
    "id_cancion": 10,
    "nombre_autor": "Yeraldin Olaya",
    "fecha_acuerdo": datetime.utcnow().strftime("%Y-%m-%d"),
    "documento_legal": "Certificado de prueba",
    "id_usuario_autor": 6
}

# Mock de usuario autenticado (Artista verificado)
mock_user = type("User", (), {"id_usuario": 6})()
app.dependency_overrides[derechos_autor.get_current_user] = lambda: mock_user

# -----------------------------
# Mock servicios
# -----------------------------
# Crear registro
def fake_crear_registro(db, datos):
    class Registro:
        id_registro = 1
        id_cancion = datos.id_cancion
        nombre_autor = datos.nombre_autor
        fecha_acuerdo = datos.fecha_acuerdo
        id_usuario_autor = datos.id_usuario_autor
        documento_legal = datos.documento_legal
    return Registro()

# Generar certificado PDF
def fake_generar_certificado(db, id_registro):
    pdf_path = f"archivos/derechos_autor/certificado_{id_registro}.pdf"
    os.makedirs(os.path.dirname(pdf_path), exist_ok=True)
    with open(pdf_path, "wb") as f:
        f.write(b"%PDF-1.4 certificado simulado")
    return {
        "id_registro": id_registro,
        "tipo_documento": "PDF",
        "id_documento": 1,
        "nombre_documento": f"certificado_{id_registro}.pdf",
        "ruta_archivo": pdf_path,
        "fecha_subida": datetime.utcnow().isoformat(),
        "vigente": True
    }

# Listar documentos
def fake_obtener_documentos(db, id_registro):
    return [fake_generar_certificado(db, id_registro)]

# Descargar documento
def fake_descargar_documento(db, id_documento):
    pdf_path = f"archivos/derechos_autor/certificado_{id_documento}.pdf"
    os.makedirs(os.path.dirname(pdf_path), exist_ok=True)
    with open(pdf_path, "wb") as f:
        f.write(b"%PDF-1.4 contenido simulado")
    return FileResponse(pdf_path, media_type="application/pdf", filename=f"certificado_{id_documento}.pdf")

# Sobrescribimos los servicios
derechos_autor_services.crear_registro = fake_crear_registro
derechos_autor_services.generar_certificado = fake_generar_certificado
derechos_autor_services.obtener_documentos = fake_obtener_documentos
derechos_autor_services.descargar_documento = fake_descargar_documento

# -----------------------------
# Tests
# -----------------------------
def test_flujo_completo_derechos_autor():
    # 1️⃣ Crear registro
    response = client.post("/derechos-autor/", json=registro_data)
    assert response.status_code == 200
    registro = response.json()
    id_registro = registro["id_registro"]
    assert registro["id_cancion"] == registro_data["id_cancion"]
    assert registro["id_usuario_autor"] == registro_data["id_usuario_autor"]

    # 2️⃣ Generar certificado PDF
    response_cert = client.post(f"/derechos-autor/generar-certificado/{id_registro}")
    assert response_cert.status_code == 200
    certificado = response_cert.json()
    assert certificado["id_registro"] == id_registro
    assert certificado["tipo_documento"] == "PDF"
    assert certificado["nombre_documento"] == f"certificado_{id_registro}.pdf"
    assert os.path.exists(certificado["ruta_archivo"])
    assert certificado["vigente"] is True

    # 3️⃣ Listar documentos del registro
    response_docs = client.get(f"/derechos-autor/documentos/{id_registro}")
    assert response_docs.status_code == 200
    docs = response_docs.json()
    assert len(docs) == 1
    assert docs[0]["nombre_documento"] == f"certificado_{id_registro}.pdf"

    # 4️⃣ Descargar documento
    response_download = client.get(f"/derechos-autor/documento/{docs[0]['id_documento']}/descargar")
    assert response_download.status_code == 200
    # Verificamos que el contenido simulado sea PDF
    assert response_download.content.startswith(b"%PDF")

def test_usuario_no_autorizado_derechos_autor():
    # Mock usuario diferente
    app.dependency_overrides[derechos_autor.get_current_user] = lambda: type("User", (), {"id_usuario": 99})()
    response = client.post("/derechos-autor/", json=registro_data)
    assert response.status_code == 403
    assert response.json()["detail"] == "No autorizado para crear este registro"

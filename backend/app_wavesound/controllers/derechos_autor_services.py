import os
from datetime import datetime
from fastapi import HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

from app_wavesound.models.models import Derechos_Autor, Documentos_Derechos_Autor

# Carpeta para certificados
CARPETA_CERTIFICADOS = "app_wavesound/static/certificados/"
os.makedirs(CARPETA_CERTIFICADOS, exist_ok=True)

# -----------------------------
# Crear registro de derechos
# -----------------------------
def crear_registro(db: Session, datos):
    registro = Derechos_Autor(
        id_cancion=datos.id_cancion,
        nombre_autor=datos.nombre_autor,
        fecha_acuerdo=datos.fecha_acuerdo,
        documento_legal=datos.documento_legal,
        id_usuario_autor=datos.id_usuario_autor
    )
    db.add(registro)
    db.commit()
    db.refresh(registro)
    return registro

# -----------------------------
# Subir documento PDF manual (opcional)
# -----------------------------
async def subir_documento(db: Session, id_registro: int, tipo_documento: str, archivo):
    nombre_fisico = f"{datetime.utcnow().timestamp()}_{archivo.filename}"
    ruta_fisica = os.path.join(CARPETA_CERTIFICADOS, nombre_fisico)

    contenido = await archivo.read()
    with open(ruta_fisica, "wb") as f:
        f.write(contenido)

    documento = Documentos_Derechos_Autor(
        id_registro=id_registro,
        tipo_documento=tipo_documento,
        nombre_documento=archivo.filename,
        ruta_archivo=f"/static/certificados/{nombre_fisico}",
        fecha_subida=datetime.utcnow(),
        vigente=True
    )
    db.add(documento)
    db.commit()
    db.refresh(documento)
    return documento

# -----------------------------
# Generar certificado PDF automático
# -----------------------------
async def generar_certificado(db: Session, id_registro: int, tipo_documento="Certificado"):
    nombre_fisico = f"{datetime.utcnow().timestamp()}_certificado.pdf"
    ruta_fisica = os.path.join(CARPETA_CERTIFICADOS, nombre_fisico)

    # Generar PDF con reportlab
    c = canvas.Canvas(ruta_fisica, pagesize=letter)
    c.setFont("Helvetica-Bold", 18)
    c.drawString(100, 700, "CERTIFICADO DE DERECHOS DE AUTOR")
    c.setFont("Helvetica", 12)
    c.drawString(100, 650, f"Registro ID: {id_registro}")
    c.drawString(100, 630, "Este certificado confirma que la canción registrada")
    c.drawString(100, 610, "cumple con los derechos de autor en la plataforma WaveSound.")
    c.drawString(100, 590, f"Fecha de emisión: {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')}")
    c.save()

    documento = Documentos_Derechos_Autor(
        id_registro=id_registro,
        tipo_documento=tipo_documento,
        nombre_documento="Certificado de Derechos de Autor.pdf",
        ruta_archivo=f"/static/certificados/{nombre_fisico}",
        fecha_subida=datetime.utcnow(),
        vigente=True
    )
    db.add(documento)
    db.commit()
    db.refresh(documento)
    return documento

# -----------------------------
# Obtener registros de un usuario
# -----------------------------
def obtener_registros_usuario(db: Session, id_usuario: int):
    return db.query(Derechos_Autor).filter(
        Derechos_Autor.id_usuario_autor == id_usuario
    ).all()

# -----------------------------
# Obtener documentos de un registro
# -----------------------------
def obtener_documentos(db: Session, id_registro: int):
    return db.query(Documentos_Derechos_Autor).filter(
        Documentos_Derechos_Autor.id_registro == id_registro
    ).all()

# -----------------------------
# Descargar PDF
# -----------------------------
def descargar_documento(db: Session, id_documento: int):
    doc = db.query(Documentos_Derechos_Autor).filter(
        Documentos_Derechos_Autor.id_documento == id_documento
    ).first()

    if not doc:
        raise HTTPException(status_code=404, detail="Documento no encontrado")

    ruta_fisica = "app_wavesound" + doc.ruta_archivo
    if not os.path.exists(ruta_fisica):
        raise HTTPException(status_code=404, detail="Archivo no existe")

    return FileResponse(
        path=ruta_fisica,
        filename=doc.nombre_documento,
        media_type="application/pdf"
    )

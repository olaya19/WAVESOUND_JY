from sqlalchemy.orm import Session
from fastapi import HTTPException, UploadFile
from fastapi.responses import FileResponse
from datetime import datetime
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image
from reportlab.lib.styles import getSampleStyleSheet
import os
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from datetime import datetime
import os

from app_wavesound.models.models import Derechos_Autor, Documentos_Derechos_Autor
from app_wavesound.schemas.Derechos_De_Autor import DerechoAutorCreate

# Carpeta para almacenar documentos y certificados
BASE_DIR = "archivos/derechos_autor/"
LOGO_PATH = "app_wavesound/static/logos/LOGOWV.jpeg"  # tu ruta real
os.makedirs(BASE_DIR, exist_ok=True)


# -----------------------------
# CREAR REGISTRO
# -----------------------------
def crear_registro(db: Session, datos: DerechoAutorCreate):
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
# SUBIR DOCUMENTO MANUAL
# -----------------------------
async def subir_documento(db: Session, id_registro: int, tipo_documento: str, archivo: UploadFile):
    registro = db.query(Derechos_Autor).filter(
        Derechos_Autor.id_registro == id_registro
    ).first()
    if not registro:
        raise HTTPException(status_code=404, detail="Registro no encontrado")

    save_path = os.path.join(BASE_DIR, f"{id_registro}_{archivo.filename}")
    contenido = await archivo.read()
    with open(save_path, "wb") as f:
        f.write(contenido)

    documento = Documentos_Derechos_Autor(
        id_registro=id_registro,
        tipo_documento=tipo_documento,
        nombre_documento=archivo.filename,
        ruta_archivo=save_path,
        fecha_subida=datetime.utcnow(),
        vigente=True
    )
    db.add(documento)
    db.commit()
    db.refresh(documento)
    return documento


# -----------------------------
# GENERAR CERTIFICADO AUTOMÁTICO
# -----------------------------
async def generar_certificado(db: Session, id_registro: int):
    registro = db.query(Derechos_Autor).filter(Derechos_Autor.id_registro == id_registro).first()
    if not registro:
        raise HTTPException(status_code=404, detail="Registro no encontrado")

    pdf_path = os.path.join(BASE_DIR, f"certificado_{id_registro}.pdf")
    c = canvas.Canvas(pdf_path, pagesize=letter)
    width, height = letter

    # Colores corporativos
    primary_color = HexColor("#1F4E79")
    secondary_color = HexColor("#D9E1F2")
    text_color = HexColor("#333333")

    # -------------------
    # Bordes exteriores
    # -------------------
    c.setStrokeColor(primary_color)
    c.setLineWidth(3)
    c.rect(30, 30, width - 60, height - 60, stroke=1, fill=0)

    # -------------------
    # Logo superior
    # -------------------
    if os.path.exists(LOGO_PATH):
        c.drawImage(LOGO_PATH, width/2 - 60, height - 140, width=120, height=120, preserveAspectRatio=True, mask='auto')
    else:
        print("⚠ Logo no encontrado en:", LOGO_PATH)

    # -------------------
    # Encabezado principal
    # -------------------
    c.setFont("Helvetica-Bold", 28)
    c.setFillColor(primary_color)
    c.drawCentredString(width/2, height - 180, "WaveSound™")
    c.setLineWidth(2)
    c.line(70, height - 190, width - 70, height - 190)

    # -------------------
    # Título del certificado
    # -------------------
    c.setFont("Times-Bold", 22)
    c.setFillColor(HexColor("#0A3D62"))
    c.drawCentredString(width/2, height - 230, "CERTIFICADO OFICIAL DE DERECHOS DE AUTOR")
    c.setFont("Helvetica", 12)
    c.setFillColor(text_color)
    c.drawCentredString(width/2, height - 250, "Este documento certifica la autoría y registro legal de la obra musical en WaveSound.")

    # -------------------
    # Marco de información
    # -------------------
    x0, y0 = 70, height - 350
    c.setFillColor(secondary_color)
    c.roundRect(x0, y0 - 130, width - 120, 110, radius=15, fill=1)
    c.setStrokeColor(primary_color)
    c.roundRect(x0, y0 - 130, width - 120, 110, radius=15, fill=0)
    c.setFillColor(primary_color)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(x0 + 15, y0 - 20, "INFORMACIÓN DEL REGISTRO:")

    c.setFont("Helvetica", 12)
    c.setFillColor(text_color)
    datos = [
        f"ID Registro: {registro.id_registro}",
        f"ID Canción: {registro.id_cancion}",
        f"Autor Registrado: {registro.nombre_autor}",
        f"Usuario Registrante (ID): {registro.id_usuario_autor}",
        f"Fecha de Acuerdo: {registro.fecha_acuerdo or 'Sin definir'}",
        f"Documento Legal: {registro.documento_legal or 'Sin descripción'}"
    ]
    y_text = y0 - 40
    for linea in datos:
        c.drawString(x0 + 20, y_text, linea)
        y_text -= 18

    # -------------------
    # Sello digital elegante
    # -------------------
    c.setStrokeColor(primary_color)
    c.setLineWidth(2)
    c.circle(width - 140, 150, 55)
    c.setFont("Helvetica-Bold", 12)
    c.drawCentredString(width - 140, 160, "WAVESOUND")
    c.drawCentredString(width - 140, 140, "CERTIFICADO")

    # -------------------
    # Pie de página profesional
    # -------------------
    c.setFont("Helvetica-Oblique", 10)
    c.setFillColor(HexColor("#555555"))
    c.drawCentredString(width/2, 60, f"Fecha de emisión: {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')}")
    c.drawCentredString(width/2, 45, "Documento generado automáticamente por WaveSound. Prohibida su modificación o reproducción no autorizada.")

    c.save()

    # -------------------
    # Guardar registro en BD
    # -------------------
    nuevo_doc = Documentos_Derechos_Autor(
        id_registro=id_registro,
        tipo_documento="certificado",
        nombre_documento=f"certificado_{id_registro}.pdf",
        ruta_archivo=pdf_path,
        fecha_subida=datetime.utcnow(),
        vigente=True
    )
    db.add(nuevo_doc)
    db.commit()
    db.refresh(nuevo_doc)
    return nuevo_doc


# -----------------------------
# OBTENER REGISTROS DE UN USUARIO
# -----------------------------
def obtener_registros_usuario(db: Session, id_usuario: int):
    return db.query(Derechos_Autor).filter(
        Derechos_Autor.id_usuario_autor == id_usuario
    ).all()


# -----------------------------
# OBTENER DOCUMENTOS DE UN REGISTRO
# -----------------------------
def obtener_documentos(db: Session, id_registro: int):
    return db.query(Documentos_Derechos_Autor).filter(
        Documentos_Derechos_Autor.id_registro == id_registro
    ).all()


# -----------------------------
# DESCARGAR DOCUMENTO
# -----------------------------
def descargar_documento(db: Session, id_documento: int):
    doc = db.query(Documentos_Derechos_Autor).filter(
        Documentos_Derechos_Autor.id_documento == id_documento
    ).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Documento no encontrado")
    if not os.path.exists(doc.ruta_archivo):
        raise HTTPException(status_code=404, detail="Archivo no existe en el servidor")
    return FileResponse(doc.ruta_archivo, filename=os.path.basename(doc.ruta_archivo))

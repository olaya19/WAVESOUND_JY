from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app_wavesound.db.database import get_db
from app_wavesound.models.models import Usuarios
import resend
from fastapi import HTTPException


SECRET_KEY = "secret_super_seguro"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60
SECRET_VERIFY = "clave-super-secreta-verificacion"
ALGORITHM = "HS256"

resend.api_key = "re_WY3VDq6S_6JjYWM1Vbsqf16SusEFAFuZ5"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="usuarios/login")
blacklist_tokens = set()

import secrets

def generar_token():
    return secrets.token_urlsafe(32)

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def enviar_email_verificacion(destinatario: str, token: str):
    try:
        link = f"https://tu-dominio.com/verificar?token={token}"

        response = resend.Emails.send({
            "from": "WaveSound <no-reply@wavesound.com>",
            "to": [destinatario],
            "subject": "Verifica tu cuenta en WaveSound",
            "html": f"""
                <h2>¡Bienvenido a WaveSound!</h2>
                <p>Haz clic en el siguiente enlace para verificar tu correo:</p>
                <a href="{link}">Verificar cuenta</a>
            """
        })
        return response

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="No se pudo enviar el correo")


def crear_token_verificacion(email: str):
    exp = datetime.utcnow() + timedelta(hours=24)

    data = {
        "sub": email,
        "exp": exp,
    }

    return jwt.encode(data,SECRET_VERIFY,algorithm=ALGORITHM)


def verificar_token_verificacion(token: str):
    try:
        payload = jwt.decode(token,SECRET_VERIFY,algorithms=[ALGORITHM])
        return payload.get("sub")
    except:
        return None

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    if token in blacklist_tokens:
        raise HTTPException(status_code=401, detail="Sesión expirada, inicie sesión de nuevo")

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Token inválido")
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido")

    usuario = db.query(Usuarios).filter(Usuarios.id_usuario == user_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    return usuario


# -------------------------
# Logout
# -------------------------
def logout(token: str = Depends(oauth2_scheme)):
    blacklist_tokens.add(token)
    return {"msg": "Sesión cerrada exitosamente"}

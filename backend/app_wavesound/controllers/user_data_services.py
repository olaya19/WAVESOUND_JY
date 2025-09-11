from sqlalchemy.orm import Session
from fastapi import HTTPException
from passlib.context import CryptContext # type: ignore
from app_wavesound.models.models import Usuarios 
from app_wavesound.schemas.Usuarios import UsuarioCreate, UsuarioOut

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_contraseña(contraseña: str) -> str:
    return pwd_context.hash(contraseña)

def registrar_usuario(db: Session, datos_usuario: UsuarioCreate) -> UsuarioOut:
    usuario_existente = db.query(Usuarios).filter_by(email=datos_usuario.email).first()
    if usuario_existente:
        raise HTTPException(status_code=400, detail="El email ya está registrado")

    nuevo_usuario = Usuarios(
        nombre_usuario=datos_usuario.nombre_usuario,
        email=datos_usuario.email,
        nickname=datos_usuario.nickname,
        contraseña=hash_contraseña(datos_usuario.contraseña),
        id_rol=datos_usuario.id_rol
    )
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return UsuarioOut.model_validate(nuevo_usuario)


def obtener_usuarios(db: Session) -> list[UsuarioOut]:
    """Devuelve la lista de todos los usuarios."""
    usuarios = db.query(Usuarios).all()
    # Convertir cada objeto a esquema
    return [UsuarioOut.model_validate(u) for u in usuarios]

def autenticar_usuario(db: Session, login: str, password: str):
    user = db.query(Usuarios).filter(
        (Usuarios.email == login) | (Usuarios.nickname == login)
    ).first()
    
    if not user:
        return None
    if not pwd_context.verify(password, user.contraseña):
        return None
    return user
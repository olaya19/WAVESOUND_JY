from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from datetime import datetime, timedelta
import asyncio
from app_wavesound.db.database import get_db
from app_wavesound.schemas.Usuarios import UsuarioCreate, UsuarioOut, PerfilUsuarioOut
from app_wavesound.controllers.perfil_service import obtener_perfil_completo
from app_wavesound.controllers.user_data_services import registrar_usuario, obtener_usuarios, autenticar_usuario
from app_wavesound.auth.auth import create_access_token, logout, get_current_user, SECRET_KEY, ALGORITHM, hash_password
import jwt
from app_wavesound.auth.auth_google import router as google_router
from app_wavesound.controllers.email_service import enviar_email_verificacion, enviar_email_reset_password
from app_wavesound.auth.auth import generar_token
from app_wavesound.models.models import Usuarios, VerificationToken


router = APIRouter(prefix="/usuarios", tags=["Usuarios"])


# ---------------------------------------------------------
# REGISTER (CREA USUARIO + ENVÍA CORREO)
# ---------------------------------------------------------
@router.post("/register", response_model=UsuarioOut)
async def register(user_data: UsuarioCreate, db: Session = Depends(get_db)):

    nuevo_usuario = registrar_usuario(db, user_data)

    token = generar_token()

    registro = VerificationToken(
        user_id=nuevo_usuario.id_usuario,
        token=token
    )
    db.add(registro)
    db.commit()

    # 👉 Llamada normal, NO async
    enviar_email_verificacion(nuevo_usuario.email, token)

    return nuevo_usuario


# ---------------------------------------------------------
# VERIFICAR EMAIL DESDE LINK
# ---------------------------------------------------------
@router.get("/verificar-email")
def verificar_email(token: str, db: Session = Depends(get_db)):
    registro = db.query(VerificationToken).filter(
        VerificationToken.token == token
    ).first()

    if not registro:
        raise HTTPException(status_code=400, detail="Token inválido")

    if registro.expires_at < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Token expirado")

    user = db.query(Usuarios).filter(
        Usuarios.id_usuario == registro.user_id
    ).first()

    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    user.is_verified = True

    # Borrar token para que no se pueda reutilizar
    db.delete(registro)
    db.commit()

    return {"message": "Correo verificado correctamente 🎉"}


# ---------------------------------------------------------
# REENVIAR VERIFICACIÓN
# ---------------------------------------------------------
@router.post("/reenviar-verificacion")
def reenviar_verificacion(usuario_id: int, db: Session = Depends(get_db)):
    user = db.query(Usuarios).filter(Usuarios.id_usuario == usuario_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    if user.is_verified:
        raise HTTPException(status_code=400, detail="El usuario ya está verificado")

    # Borrar tokens viejos
    db.query(VerificationToken).filter(
        VerificationToken.user_id == usuario_id
    ).delete()

    # Crear nuevo token
    token = generar_token()

    registro = VerificationToken(
        user_id=user.id_usuario,
        token=token
    )
    db.add(registro)
    db.commit()

    # Enviar correo
    enviar_email_verificacion(user.email, token)

    return {"message": "Correo reenviado ✔"}


# ---------------------------------------------------------
# FORGOT PASSWORD
# ---------------------------------------------------------
@router.post("/usuarios/forgot-password")
def forgot_password(email: str, db: Session = Depends(get_db)):
    user = db.query(Usuarios).filter(Usuarios.email == email).first()

    if not user:
        raise HTTPException(status_code=404, detail="Email no registrado")

    # Crear token de reseteo (similar al de verificación)
    token_data = {"sub": user.email, "purpose": "reset", "exp": datetime.utcnow() + timedelta(minutes=30)}

    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)

    enviar_email_reset_password(email, token)

    return {"message": "Correo enviado para restablecer contraseña"}


# ---------------------------------------------------------
# RESET PASSWORD
# ---------------------------------------------------------
@router.post("/usuarios/reset-password")
def reset_password(token: str, nueva_password: str, db: Session = Depends(get_db)):
    try:
        data = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if data.get("purpose") != "reset":
            raise HTTPException(status_code=400, detail="Token inválido")

        email = data.get("sub")

        user = db.query(Usuarios).filter(Usuarios.email == email).first()
        if not user:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")

        # cambiar contraseña
        user.password = hash_password(nueva_password)
        db.commit()

        return {"message": "Contraseña actualizada correctamente"}

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=400, detail="Token expirado")
    except Exception:
        raise HTTPException(status_code=400, detail="Token inválido")


# ---------------------------------------------------------
# LOGIN
# ---------------------------------------------------------
@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = autenticar_usuario(db, form_data.username, form_data.password)

    if not user:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    if not user.is_verified:
        raise HTTPException(status_code=403, detail="Debes verificar tu correo antes de iniciar sesión")

    token = create_access_token(data={"sub": str(user.id_usuario)})

    return {
        "access_token": token,
        "token_type": "bearer",
        "id_usuario": user.id_usuario,
        "nombre_usuario": user.nombre_usuario,
        "id_rol": user.id_rol
    }


# ---------------------------------------------------------
# LOGOUT
# ---------------------------------------------------------
@router.post("/logout")
def cerrar_sesion(response=Depends(logout)):
    return response


# ---------------------------------------------------------
# LISTAR USUARIOS
# ---------------------------------------------------------
@router.get("/", response_model=list[UsuarioOut])
def listar_usuarios(db: Session = Depends(get_db)):
    return obtener_usuarios(db)


# ---------------------------------------------------------
# LISTAR USUARIOS POR ROL
# ---------------------------------------------------------
@router.get("/rol/{rol_id}", response_model=list[UsuarioOut])
def listar_usuarios_por_rol(rol_id: int, db: Session = Depends(get_db)):
    usuarios = db.query(Usuarios).filter(Usuarios.id_rol == rol_id).all()
    if not usuarios:
        raise HTTPException(status_code=404, detail="No se encontraron usuarios con ese rol")
    return usuarios


# ---------------------------------------------------------
# LISTADO POR ROL CON PERFIL
# ---------------------------------------------------------
@router.get("/rol/{rol_id}/con-perfil")
def listar_usuarios_por_rol_con_perfil(rol_id: int, db: Session = Depends(get_db)):
    """
    Devuelve todos los usuarios de un rol específico
    junto con su foto de perfil si existe
    """
    usuarios = db.query(Usuarios).filter(Usuarios.id_rol == rol_id).all()
    if not usuarios:
        raise HTTPException(status_code=404, detail="No se encontraron usuarios con ese rol")

    resultado = []
    for u in usuarios:
        perfil = obtener_perfil_completo(db, u.id_usuario)
        resultado.append({
            "id_usuario": u.id_usuario,
            "nombre_usuario": u.nombre_usuario,
            "foto_perfil": perfil["foto_perfil"] if perfil else None
        })

    return resultado


# ---------------------------------------------------------
# PERFIL DEL USUARIO
# ---------------------------------------------------------
@router.get("/perfil", response_model=PerfilUsuarioOut)
def obtener_perfil(current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    perfil = obtener_perfil_completo(db, current_user)
    if not perfil:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return perfil


# ---------------------------------------------------------
# INTEGRACIÓN GOOGLE
# ---------------------------------------------------------
router.include_router(google_router)

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import HTTPException

# Cambia esto por el correo que SÍ tiene contraseña de aplicación
EMAIL_SENDER = "noreply.wavesound@gmail.com"
EMAIL_PASSWORD = "etxwgifqcorswnjb"  # ← muy importante


def enviar_email_verificacion(email_destino: str, token: str):
    try:
        link = f"http://localhost:8000/usuarios/verificar-email?token={token}"

        message = MIMEMultipart("alternative")
        message["Subject"] = "Verifica tu cuenta en WaveSound"
        message["From"] = EMAIL_SENDER
        message["To"] = email_destino

        html_body = f"""
            <h2>Bienvenido a WaveSound</h2>
            <p>Gracias por registrarte. Verifica tu cuenta aquí:</p>
            <a href="{link}">Hacer clic para verificar</a>
        """

        message.attach(MIMEText(html_body, "html"))

        # Conexión segura con Gmail (SMTP SSL)
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(EMAIL_SENDER, EMAIL_PASSWORD)
            server.sendmail(EMAIL_SENDER, email_destino, message.as_string())

        return {"message": "Correo enviado"}

    except Exception as e:
        print("ERROR enviando correo:", e)
        raise HTTPException(status_code=500, detail="Error enviando correo")
    
def enviar_email_reset_password(email_destino: str, token: str):
    try:
        link = f"http://localhost:8000/usuarios/reset-password?token={token}"

        message = MIMEMultipart("alternative")
        message["Subject"] = "Restablecer tu contraseña en WaveSound"
        message["From"] = EMAIL_SENDER
        message["To"] = email_destino

        html_body = f"""
            <h2>Restablecer contraseña</h2>
            <p>Haz clic en el siguiente enlace para cambiar tu contraseña:</p>
            <a href="{link}">Restablecer Contraseña</a>
            <p>Si no solicitaste esto, simplemente ignora este mensaje.</p>
        """

        message.attach(MIMEText(html_body, "html"))

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(EMAIL_SENDER, EMAIL_PASSWORD)
            server.sendmail(EMAIL_SENDER, email_destino, message.as_string())

        return {"message": "Correo enviado"}

    except Exception as e:
        print("ERROR enviando correo:", e)
        raise HTTPException(status_code=500, detail="Error enviando correo")    

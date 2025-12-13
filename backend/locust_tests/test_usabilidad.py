from locust import HttpUser, task, between

class UsabilidadUser(HttpUser):
    wait_time = between(2, 4)
    host = "http://127.0.0.1:8000"
    token = None

    def on_start(self):
        login_data = {
            "username": "yeral123",
            "password": "yeral123"
        }
        r = self.client.post("/usuarios/login", data=login_data)
        if r.status_code == 200:
            self.token = r.json()["access_token"]

    @task
    def flujo_usuario(self):
        self.client.get("/canciones/public")

        self.client.get("/canciones/", headers={
            "Authorization": f"Bearer {self.token}"
        })

        self.client.post("/canciones/", json={
            "titulo": "Flujo de Prueba",
            "descripcion": "Canción creada en flujo de usuario",
            "genero": "pop"
        }, headers={
            "Authorization": f"Bearer {self.token}"
        })

        self.client.get("/canciones/", headers={
            "Authorization": f"Bearer {self.token}"
        })


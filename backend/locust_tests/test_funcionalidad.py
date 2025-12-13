from locust import HttpUser, task, between

class FuncionalidadUser(HttpUser):
    wait_time = between(1, 3)
    host = "http://127.0.0.1:8000"
    token = None

    def on_start(self):
        # LOGIN
        login_data = {
            "username": "yeral123",
            "password": "yeral123"
        }
        r = self.client.post("/usuarios/login", data=login_data)
        if r.status_code == 200:
            self.token = r.json()["access_token"]

    @task
    def test_home(self):
        self.client.get("/canciones/public")

    @task
    def test_listar_items(self):
        self.client.get("/canciones/", headers={
            "Authorization": f"Bearer {self.token}"
        })

    @task
    def test_crear_item(self):
        payload = {
            "titulo": "Canción Prueba",
            "descripcion": "Subida desde Locust",
            "genero": "rock"
        }
        self.client.post("/canciones/", json=payload, headers={
            "Authorization": f"Bearer {self.token}"
        })

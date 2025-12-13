from locust import HttpUser, task, between

class RendimientoUser(HttpUser):
    wait_time = between(0.5, 1)
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
    def stress_items(self):
        self.client.get("/canciones/", headers={
            "Authorization": f"Bearer {self.token}"
        })


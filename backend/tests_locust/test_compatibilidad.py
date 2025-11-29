from locust import HttpUser, task, between

TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2IiwiZXhwIjoxNzYzOTQ3NzQyfQ.yJ_-pMWHM0PQ3v4xrOUt5jOewU3nEnC9rkz9KzixU-s"


class CompatibilidadUser(HttpUser):
    wait_time = between(1, 3)
    headers = {"Authorization": f"Bearer {TOKEN}"}
    host = "http://127.0.0.1:8000"

    @task
    def probar_navegadores(self):
        self.client.get("/", headers=self.headers)

    @task
    def probar_endpoints_basicos(self):
        self.client.get("/perfiles/listar", headers=self.headers)
        self.client.get("/roles/listar", headers=self.headers)


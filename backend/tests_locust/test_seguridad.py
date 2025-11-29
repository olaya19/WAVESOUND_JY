from locust import HttpUser, task, between

TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2IiwiZXhwIjoxNzYzOTQ3NzQyfQ.yJ_-pMWHM0PQ3v4xrOUt5jOewU3nEnC9rkz9KzixU-s"


class SeguridadUser(HttpUser):
    wait_time = between(1, 2)
    headers = {"Authorization": f"Bearer {TOKEN}"}
    host = "http://127.0.0.1:8000"

    @task
    def acceso_autorizado(self):
        self.client.get("/perfiles/listar", headers=self.headers)

    @task
    def intento_acceso_no_autorizado(self):
        # Endpoint ficticio sin permiso → debe dar 401 o 403 (normal)
        self.client.get("/admin/secret", headers=self.headers, name="Endpoint restringido")

from locust import HttpUser, task, between


class ApiUser(HttpUser):
    wait_time = between(1, 3)

    @task(2)
    def health(self):
        self.client.get("/api/v1/health")

    @task
    def catalog(self):
        self.client.get("/api/v1/catalog/products?limit=12&sort=newest")

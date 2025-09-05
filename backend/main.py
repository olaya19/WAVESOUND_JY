from flask import Flask

app = Flask(__name__)


@app.route("/")
def home():
    return {"message": "Servidor Flask funcionando WaveSound 🚀"}


if __name__ == "__main__":
    app.run(debug=True)

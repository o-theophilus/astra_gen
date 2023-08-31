from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import openai


def create_app():
    app = Flask(__name__)
    app.config.from_prefixed_env()
    CORS(app)

    @app.route("/")
    def index():
        return jsonify({
            "status": 200,
            "message": "Welcome to Orbeat"
        })

    @app.post("/variations")
    def gen():
        resp = openai.Image.create_variation(
            api_key=request.headers['Authorization'][7:],
            organization=request.headers['OpenAI-Organization'],
            image=requests.get(request.json["src"]).content,
            n=request.json["n"],
            size=request.json["size"]
        )
        return jsonify(resp)

    return app

from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import openai

import os
from thirdweb import ThirdwebSDK
from thirdweb.types import SDKOptions
from thirdweb.types.nft import NFTMetadataInput
from uuid import uuid4


def create_app():
    app = Flask(__name__)
    app.config.from_prefixed_env()
    CORS(app)

    @app.route("/")
    def index():
        return jsonify({
            "status": 200,
            "message": "Welcome to Astra-Gen"
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

    @app.get("/test")
    def test():
        sdk = ThirdwebSDK.from_private_key(
            # os.environ["TW_PRIVATE_KEY"],
            "949f4acc5879a61ed1b84ba04391a20710a07ec1448fc05e380c8958bf1f5964",
            # "mumbai",
            "devnet",
            options=SDKOptions(
                secret_key=os.environ["TW_SECRET_KEY"]
            )
        )

        # NFT_COLLECTION_ADDRESS = uuid4().hex
        NFT_COLLECTION_ADDRESS = "0x9f3e7EC935146753Dc87F0Dc8673844e4dD2F7CA"
        nft_collection = sdk.get_nft_collection(
            NFT_COLLECTION_ADDRESS
        )

        nft_collection.mint(
            NFTMetadataInput.from_json({
                "name": "Cool NFT",
                "description": "Minted with the Python SDK!"
            })
        )


        # rand_hex_str = hex("949f4acc5879a61ed1b84ba04391a20710a07ec1448fc05e380c8958bf1f5964")
        # print(rand_hex_str)

        print("=> ", sdk)
        return jsonify({
            "status": 200
        })

    return app

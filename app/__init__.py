import os
from flask import Flask
from app import config


def create_app():
    app = Flask(__name__)

    app.config["SECRET_KEY"]    = os.getenv("SECRET_KEY", "fallback-dev-key")
    app.config["SMTP_HOST"]     = config.SMTP_HOST
    app.config["SMTP_PORT"]     = config.SMTP_PORT
    app.config["SMTP_USER"]     = config.SMTP_USER
    app.config["SMTP_PASSWORD"] = config.SMTP_PASSWORD
    app.config["ADMIN_EMAIL"]   = config.ADMIN_EMAIL

    from app.routes import main
    app.register_blueprint(main)

    return app
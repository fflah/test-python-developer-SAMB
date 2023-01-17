from flask import Flask
from flask_restful import Api
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from config import Config

app = Flask(__name__, template_folder='views')
app.config.from_object(Config)
api = Api(app, prefix='/api')
web = Api(app) 
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app import routes
from app.models import *
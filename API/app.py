from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow  
from flask_restful import Api, Resource
from datetime import datetime
from flask_cors import CORS
from flask_cors import cross_origin

from flask import Flask, session, redirect, url_for, request, jsonify
from flask_login import LoginManager,login_user,login_required,logout_user,current_user
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import Table, Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

app = Flask(__name__)
cors = CORS(app, resources={r"/events/*": {"origins": "*"},r"/register":{"origins":"*"},r"/sign_in": {"origins": "*"}})

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

db = SQLAlchemy(app)
ma = Marshmallow(app)
api = Api(app)

login_manager = LoginManager()
login_manager.init_app(app)

class Usuario(db.Model):
    __tablename__ = 'Usuario'
    username = db.Column( db.String(50) , primary_key = True)

    password = db.Column( db.String(100) )

    eventos = db.relationship('Evento', backref='usuario', lazy=True)

    authenticated = db.Column(db.Boolean, default=False)

    def is_active(self):
        """True, as all users are active."""
        return True

    def get_id(self):
        """Return the email address to satisfy Flask-Login's requirements."""
        return self.username

    def is_authenticated(self):
        """Return True if the user is authenticated."""
        return self.authenticated

    def is_anonymous(self):
        """False, as anonymous users aren't supported."""
        return False

class Usuario_Schema(ma.Schema):

    class Meta:
        fields = ( "username", "password")

user_schema = Usuario_Schema()

users_schema = Usuario_Schema(many = True)

class Evento(db.Model):

    id = db.Column(db.Integer, primary_key = True)

    event_name = db.Column( db.String(50) )

    event_category = db.Column( db.String(50) )

    event_place = db.Column( db.String(50) )

    event_address = db.Column( db.String(50) )

    event_start_date = db.Column( db.DateTime, default=datetime.utcnow)

    event_end_date = db.Column( db.DateTime, default=datetime.utcnow )

    event_type = db.Column( db.String(50) )

    event_owner = db.Column(db.String(50), db.ForeignKey('Usuario.username'))

   
class Evento_Schema(ma.Schema):

    class Meta:

        fields = ("id", "event_name", "event_category", "event_place", "event_address", "event_start_date", "event_end_date", "event_type")

post_schema = Evento_Schema()

posts_schema = Evento_Schema(many = True)

@login_manager.user_loader
def user_loader(user_id):
    """Given user_id, return the associated User object.

    :param unicode user_id: user_id (email) user to retrieve

    """
    return Usuario.query.get(user_id)

class RecursoListarEventos(Resource):
    @app.route("/")
    def get(self):
        print(current_user.username)
        print(Evento.event_owner)
        if current_user.is_authenticated :
            eventos = Evento.query.filter(Evento.event_owner == current_user.username).order_by(Evento.id).all()
            return posts_schema.dump(eventos)
        else:
            return jsonify([])

   
    @app.route('/')
    @cross_origin()
    @login_required
    def post(self):
            date_time_obj_start = datetime.strptime(request.json['event_start_date'], '%Y-%m-%d %H:%M:%S.%f')
            date_time_obj_end = datetime.strptime(request.json['event_end_date'], '%Y-%m-%d %H:%M:%S.%f')

            nuevo_evento = Evento(
                event_owner = current_user.username,
                event_name = request.json['event_name'],
                event_category =request.json['event_category'],
                event_place =request.json['event_place'],
                event_address =request.json['event_address'],
                event_start_date =date_time_obj_start,
                event_end_date =date_time_obj_end,
                event_type =request.json['event_type']

            )

            db.session.add(nuevo_evento)

            db.session.commit()

            return post_schema.dump(nuevo_evento), 201

class RecursoUnEvento(Resource):
    @login_required
    def get(self, id_evento):
        evento = Evento.query.get_or_404(id_evento)
        return post_schema.dump(evento)

    def put(self, id_evento):
        evento = Evento.query.get_or_404(id_evento)

        if 'event_name' in request.json:
            evento.event_name = request.json['event_name']
        if 'event_category' in request.json:
            evento.event_category = request.json['event_category']
        if 'event_place' in request.json:
            evento.event_place = request.json['event_place']
        if 'event_address' in request.json:
            evento.event_address = request.json['event_address']
        if 'event_start_date' in request.json:
            evento.event_start_date = datetime.strptime(request.json['event_start_date'], '%Y-%m-%d %H:%M:%S.%f')
        if 'event_end_date' in request.json:
            evento.event_end_date = datetime.strptime(request.json['event_end_date'], '%Y-%m-%d %H:%M:%S.%f')
        if 'event_type' in request.json:
            evento.event_type = request.json['event_type']

        db.session.commit()
        return post_schema.dump(evento)

    @app.route('/')
    @cross_origin()
    @login_required
    def delete(self,id_evento):
        evento = Evento.query.get_or_404(id_evento)
        db.session.delete(evento)
        db.session.commit()

        return '', 204

class Sesiones(Resource):
    @app.route('/register', methods=["POST"])
    @cross_origin()
    def register():
        username = request.json['username']
        password = request.json['password']
        password_hash = generate_password_hash(password)
        nuevoUsuario= Usuario(
            username = username,
            password = password_hash )
        db.session.add(nuevoUsuario)
        db.session.commit()
        return jsonify({'user_added': True})

    @app.route('/sign_in', methods=["POST"])
    @cross_origin()
    def sign_in():
        username_entered = request.json['username']
        password_entered = request.json['password']
        user = Usuario.query.filter(Usuario.username==username_entered).first()
        if user is not None and check_password_hash(user.password, password_entered):
            user.authenticated = True
            db.session.add(user)
            db.session.commit()
            login_user(user, remember=True)
            return jsonify({'signed_in': True})
        return jsonify({'signed_in': False})
        
    @app.route("/logout", methods=["GET"])
    @login_required
    def logout():
        user = current_user
        user.authenticated = False
        db.session.add(user)
        db.session.commit()
        logout_user()
        return "sesion cerrada exitosamente"

    @app.route("/home", methods=["GET"])
    @login_required
    def home():
        current_user.username
        return "the current user is "+ current_user.username
        
api.add_resource(RecursoListarEventos, '/events')
api.add_resource(RecursoUnEvento,'/events/<int:id_evento>')



if __name__ == '__main__':

    app.run(debug=True)
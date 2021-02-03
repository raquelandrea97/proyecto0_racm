from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow  
from flask_restful import Api, Resource
from datetime import datetime
from flask_cors import CORS
from flask_cors import cross_origin

app = Flask(__name__)
cors = CORS(app, origins=['http://localhost:3000'])

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'

db = SQLAlchemy(app)
ma = Marshmallow(app)
api = Api(app)

class Evento(db.Model):

    id = db.Column(db.Integer, primary_key = True)

    event_name = db.Column( db.String(50) )

    event_category = db.Column( db.String(50) )

    event_place = db.Column( db.String(50) )

    event_address = db.Column( db.String(50) )

    event_start_date = db.Column( db.DateTime, default=datetime.utcnow)

    event_end_date = db.Column( db.DateTime, default=datetime.utcnow )

    event_type = db.Column( db.String(50) )

   
class Evento_Schema(ma.Schema):

    class Meta:

        fields = ("id", "event_name", "event_category", "event_place", "event_address", "event_start_date", "event_end_date", "event_type")

post_schema = Evento_Schema()

posts_schema = Evento_Schema(many = True)

class RecursoListarEventos(Resource):
    @app.route("/")
    def get(self):
        eventos = Evento.query.filter().order_by(Evento.id).all()
        return posts_schema.dump(eventos)

   
    @app.route("/")
    @cross_origin(cross_origin)
    def post(self):
            date_time_obj_start = datetime.strptime(request.json['event_start_date'], '%Y-%m-%d %H:%M:%S.%f')
            date_time_obj_end = datetime.strptime(request.json['event_end_date'], '%Y-%m-%d %H:%M:%S.%f')

            nuevo_evento = Evento(

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

            return post_schema.dump(nuevo_evento), 201, {"Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Methods": "POST",
                                "Access-Control-Allow-Headers": "Content-Type"}

class RecursoUnEvento(Resource):
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

    def delete(self, id_evento):
        evento = Evento.query.get_or_404(id_evento)
        db.session.delete(evento)
        db.session.commit()
        return '', 204

api.add_resource(RecursoListarEventos, '/events')
api.add_resource(RecursoUnEvento,'/events/<int:id_evento>')



if __name__ == '__main__':

    app.run(debug=True)
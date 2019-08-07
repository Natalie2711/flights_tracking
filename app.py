import datetime
import json

from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

app = Flask(__name__)
engine = create_engine('postgresql://localhost:5432/postgres')
db = scoped_session(sessionmaker(bind=engine))
socketio = SocketIO(app)


@app.route('/')
def index():
    flights = db.execute("SELECT * FROM passengers").fetchall()
    return render_template("index.html", flights=flights)


@socketio.on('get update')
def update_table():
    flight_infos = ['passenger_id', 'passenger_name',
                    'flight_code', 'Origin', 'Destination',
                    'time_landing', 'Status']

    updated_flights = [dict(zip(flight_infos, flight)) for flight in db.execute("SELECT * FROM passengers").fetchall()]
    emit('update table', updated_flights, broadcast=True)


if __name__ == '__main__':
    app.run(debug=True)

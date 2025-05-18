import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

from DB_MODELLLLLLLSSS import init_db

#-----------------------------------------------------
###############################----------------------
################### BLUEPRINTS ######################
##############################----------------------
#---------------------------------------------------
from BALLER_ROUTES.theaters import theaters_bp
from BALLER_ROUTES.operations import operations_bp
from BALLER_ROUTES.staff import staff_bp
from BALLER_ROUTES.ride_cycles import cycles_bp
from BALLER_ROUTES.incidents import incidents_bp
from BALLER_ROUTES.maintenance import maintenance_bp
from BALLER_ROUTES.anal import anal_bp
from services.wait_time_predictor import WaitTimePredictor
############################################################

app = Flask(__name__)

CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://postgres:postgres@localhost:5432/soarops')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = init_db(app)

wait_time_predictor = WaitTimePredictor()

#----------------------------------
app.register_blueprint(theaters_bp)
app.register_blueprint(operations_bp)
app.register_blueprint(staff_bp)
app.register_blueprint(cycles_bp)
app.register_blueprint(incidents_bp)
app.register_blueprint(maintenance_bp)
app.register_blueprint(anal_bp)
#-------------------------------------

###########################################################
##########################################################
# ██████╗    ██████╗  ██╗   ██╗ ████████╗ ███████╗ ███████╗
# ██╔══██╗  ██╔═══██╗ ██║   ██║ ╚══██╔══╝ ██╔════╝ ██╔════╝
# ██████╔╝  ██║   ██║ ██║   ██║    ██║    ███████╗ ███████╗
# ██╔══██╗  ██║   ██║ ██║   ██║    ██║    ██╔════╝ ╚════██║
# ██║  ██║  ╚██████╔╝ ╚██████╔╝    ██║    ███████║ ███████║
# ╚═╝  ╚═╝   ╚═════╝   ╚═════╝     ╚═╝    ╚══════╝ ╚══════╝
###########################################################
###########################################################

@app.route('/api/')
def home():
    return jsonify({
        "message": "Welcome to the SoarOps API",
        "version": "4.20.69"
    })

 #  COOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOrs
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response

# not needed, dockerfile does this
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

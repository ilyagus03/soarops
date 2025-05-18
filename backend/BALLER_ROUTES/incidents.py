from flask import Blueprint, jsonify, request
from DB_MODELLLLLLLSSS.all_models import Incident, RideCycle, db
import uuid
from datetime import datetime

incidents_bp = Blueprint('incidents', __name__, url_prefix='/api/incidents')

@incidents_bp.route('/', methods=['GET'])
def get_incidents():
    operation_day_id = request.args.get('operation_day_id')
    theater_id = request.args.get('theater_id')
    status = request.args.get('status')
    
    query = Incident.query
    
    if operation_day_id:
        query = query.join(RideCycle).filter(RideCycle.operation_day_id == operation_day_id)
    if theater_id:
        query = query.filter(Incident.theater_id == theater_id)
    if status:
        query = query.filter(Incident.incident_status == status)
        
    incidents = query.order_by(Incident.incident_time.desc()).all()
    
    result = []
    for incident in incidents:
        result.append({
            "id": incident.id,
            "ride_cycle_id": incident.ride_cycle_id,
            "incident_time": incident.incident_time.isoformat(),
            "incident_type": incident.incident_type,
            "severity": incident.severity,
            "theater_id": incident.theater_id,
            "theater_number": incident.theater.theater_number,
            "reported_by": incident.reported_by,
            "reporter_name": f"{incident.reporter.first_name} {incident.reporter.last_name}" if incident.reporter else None,
            "description": incident.description,
            "resolution": incident.resolution,
            "downtime_minutes": incident.downtime_minutes,
            "guests_evacuated": incident.guests_evacuated,
            "incident_status": incident.incident_status
        })
    
    return jsonify(result)

@incidents_bp.route('/<incident_id>', methods=['GET'])
def get_incident(incident_id):
    incident = Incident.query.get_or_404(incident_id)
    
    return jsonify({
        "id": incident.id,
        "ride_cycle_id": incident.ride_cycle_id,
        "incident_time": incident.incident_time.isoformat(),
        "incident_type": incident.incident_type,
        "severity": incident.severity,
        "theater_id": incident.theater_id,
        "theater_number": incident.theater.theater_number,
        "reported_by": incident.reported_by,
        "reporter_name": f"{incident.reporter.first_name} {incident.reporter.last_name}" if incident.reporter else None,
        "description": incident.description,
        "resolution": incident.resolution,
        "downtime_minutes": incident.downtime_minutes,
        "guests_evacuated": incident.guests_evacuated,
        "incident_status": incident.incident_status
    })

@incidents_bp.route('/', methods=['POST'])
def create_incident():
    data = request.get_json()
    
    required_fields = ['ride_cycle_id', 'incident_time', 'incident_type', 'severity', 'theater_id', 'reported_by', 'description']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Field '{field}' is required"}), 400
    
    new_incident = Incident(
        id=str(uuid.uuid4()),
        ride_cycle_id=data['ride_cycle_id'],
        incident_time=datetime.fromisoformat(data['incident_time']),
        incident_type=data['incident_type'],
        severity=data['severity'],
        theater_id=data['theater_id'],
        reported_by=data['reported_by'],
        description=data['description'],
        resolution=data.get('resolution'),
        downtime_minutes=data.get('downtime_minutes'),
        guests_evacuated=data.get('guests_evacuated', 0),
        incident_status=data.get('incident_status', 'OPEN')
    )
    
    db.session.add(new_incident)
    db.session.commit()
    
    ride_cycle = RideCycle.query.get(data['ride_cycle_id'])
    if ride_cycle:
        ride_cycle.incident_occurred = True
        db.session.commit()
    
    return jsonify({
        "id": new_incident.id,
        "ride_cycle_id": new_incident.ride_cycle_id,
        "incident_time": new_incident.incident_time.isoformat(),
        "incident_type": new_incident.incident_type,
        "severity": new_incident.severity,
        "theater_id": new_incident.theater_id,
        "description": new_incident.description,
        "incident_status": new_incident.incident_status
    }), 201

@incidents_bp.route('/<incident_id>', methods=['PUT'])
def update_incident(incident_id):
    incident = Incident.query.get_or_404(incident_id)
    data = request.get_json()
    
    if 'resolution' in data:
        incident.resolution = data['resolution']
    if 'downtime_minutes' in data:
        incident.downtime_minutes = data['downtime_minutes']
    if 'guests_evacuated' in data:
        incident.guests_evacuated = data['guests_evacuated']
    if 'incident_status' in data:
        incident.incident_status = data['incident_status']
    
    db.session.commit()
    
    return jsonify({
        "id": incident.id,
        "ride_cycle_id": incident.ride_cycle_id,
        "incident_time": incident.incident_time.isoformat(),
        "incident_type": incident.incident_type,
        "severity": incident.severity,
        "theater_id": incident.theater_id,
        "reported_by": incident.reported_by,
        "description": incident.description,
        "resolution": incident.resolution,
        "downtime_minutes": incident.downtime_minutes,
        "guests_evacuated": incident.guests_evacuated,
        "incident_status": incident.incident_status
    })

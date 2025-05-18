from flask import Blueprint, jsonify, request
from DB_MODELLLLLLLSSS.all_models import Theater, db
import uuid

theaters_bp = Blueprint('theaters', __name__, url_prefix='/api/theaters')

@theaters_bp.route('/', methods=['GET'])
def get_theaters():
    theaters = Theater.query.all()
    result = []
    for theater in theaters:
        result.append({
            "id": theater.id,
            "theater_number": theater.theater_number,
            "capacity": theater.capacity,
            "status": theater.status,
            "last_maintenance_date": theater.last_maintenance_date.isoformat() if theater.last_maintenance_date else None
        })
    return jsonify(result)

@theaters_bp.route('/<theater_id>', methods=['GET'])
def get_theater(theater_id):
    theater = Theater.query.get_or_404(theater_id)
    return jsonify({
        "id": theater.id,
        "theater_number": theater.theater_number,
        "capacity": theater.capacity,
        "status": theater.status,
        "last_maintenance_date": theater.last_maintenance_date.isoformat() if theater.last_maintenance_date else None
    })

@theaters_bp.route('/<theater_id>/status', methods=['PUT'])
def update_theater_status(theater_id):
    theater = Theater.query.get_or_404(theater_id)
    data = request.get_json()
    
    if 'status' not in data:
        return jsonify({"error": "Status is required"}), 400
        
    theater.status = data['status']
    db.session.commit()
    
    return jsonify({
        "id": theater.id,
        "theater_number": theater.theater_number,
        "status": theater.status
    })

@theaters_bp.route('/', methods=['POST'])
def create_theater():
    data = request.get_json()
    
    required_fields = ['theater_number', 'capacity', 'status']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Field '{field}' is required"}), 400
    
    existing_theater = Theater.query.filter_by(theater_number=data['theater_number']).first()
    if existing_theater:
        return jsonify({"error": f"Theater with number {data['theater_number']} already exists"}), 400
    
    new_theater = Theater(
        id=str(uuid.uuid4()),
        theater_number=data['theater_number'],
        capacity=data['capacity'],
        status=data['status'],
        last_maintenance_date=None
    )
    
    db.session.add(new_theater)
    db.session.commit()
    
    return jsonify({
        "id": new_theater.id,
        "theater_number": new_theater.theater_number,
        "capacity": new_theater.capacity,
        "status": new_theater.status,
        "last_maintenance_date": None
    }), 201

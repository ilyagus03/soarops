from flask import Blueprint, jsonify, request
from DB_MODELLLLLLLSSS.all_models import MaintenanceLog, db
import uuid
from datetime import datetime

maintenance_bp = Blueprint('maintenance', __name__, url_prefix='/api/maintenance-logs')

@maintenance_bp.route('/', methods=['GET'])
def get_maintenance_logs():
    theater_id = request.args.get('theater_id')
    maintenance_type = request.args.get('maintenance_type')
    
    query = MaintenanceLog.query
    
    if theater_id:
        query = query.filter(MaintenanceLog.theater_id == theater_id)
    if maintenance_type:
        query = query.filter(MaintenanceLog.maintenance_type == maintenance_type)
        
    logs = query.order_by(MaintenanceLog.start_time.desc()).all()
    
    result = []
    for log in logs:
        result.append({
            "id": log.id,
            "theater_id": log.theater_id,
            "theater_number": log.theater.theater_number,
            "maintenance_type": log.maintenance_type,
            "technician_name": log.technician_name,
            "start_time": log.start_time.isoformat(),
            "end_time": log.end_time.isoformat() if log.end_time else None,
            "description": log.description,
            "parts_replaced": log.parts_replaced,
            "maintenance_result": log.maintenance_result,
            "next_maintenance_due": log.next_maintenance_due.isoformat() if log.next_maintenance_due else None,
            "notes": log.notes
        })
    
    return jsonify(result)

@maintenance_bp.route('/<log_id>', methods=['GET'])
def get_maintenance_log(log_id):
    log = MaintenanceLog.query.get_or_404(log_id)
    
    return jsonify({
        "id": log.id,
        "theater_id": log.theater_id,
        "theater_number": log.theater.theater_number,
        "maintenance_type": log.maintenance_type,
        "technician_name": log.technician_name,
        "start_time": log.start_time.isoformat(),
        "end_time": log.end_time.isoformat() if log.end_time else None,
        "description": log.description,
        "parts_replaced": log.parts_replaced,
        "maintenance_result": log.maintenance_result,
        "next_maintenance_due": log.next_maintenance_due.isoformat() if log.next_maintenance_due else None,
        "notes": log.notes
    })

@maintenance_bp.route('/', methods=['POST'])
def create_maintenance_log():
    data = request.get_json()
    
    required_fields = ['theater_id', 'maintenance_type', 'technician_name', 'start_time', 'description', 'maintenance_result']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Field '{field}' is required"}), 400
    
    new_log = MaintenanceLog(
        id=str(uuid.uuid4()),
        theater_id=data['theater_id'],
        maintenance_type=data['maintenance_type'],
        technician_name=data['technician_name'],
        start_time=datetime.fromisoformat(data['start_time']),
        end_time=datetime.fromisoformat(data['end_time']) if 'end_time' in data and data['end_time'] else None,
        description=data['description'],
        parts_replaced=data.get('parts_replaced'),
        maintenance_result=data['maintenance_result'],
        next_maintenance_due=datetime.fromisoformat(data['next_maintenance_due']).date() if 'next_maintenance_due' in data and data['next_maintenance_due'] else None,
        notes=data.get('notes')
    )
    
    db.session.add(new_log)
    db.session.commit()
    
    from models.all_models import Theater
    theater = Theater.query.get(data['theater_id'])
    if theater:
        theater.last_maintenance_date = new_log.start_time
        db.session.commit()
    
    return jsonify({
        "id": new_log.id,
        "theater_id": new_log.theater_id,
        "maintenance_type": new_log.maintenance_type,
        "technician_name": new_log.technician_name,
        "start_time": new_log.start_time.isoformat(),
        "end_time": new_log.end_time.isoformat() if new_log.end_time else None,
        "description": new_log.description,
        "maintenance_result": new_log.maintenance_result
    }), 201

@maintenance_bp.route('/<log_id>', methods=['PUT'])
def update_maintenance_log(log_id):
    log = MaintenanceLog.query.get_or_404(log_id)
    data = request.get_json()
    
    if 'end_time' in data:
        log.end_time = datetime.fromisoformat(data['end_time']) if data['end_time'] else None
    if 'description' in data:
        log.description = data['description']
    if 'parts_replaced' in data:
        log.parts_replaced = data['parts_replaced']
    if 'maintenance_result' in data:
        log.maintenance_result = data['maintenance_result']
    if 'next_maintenance_due' in data:
        log.next_maintenance_due = datetime.fromisoformat(data['next_maintenance_due']).date() if data['next_maintenance_due'] else None
    if 'notes' in data:
        log.notes = data['notes']
    
    db.session.commit()
    
    return jsonify({
        "id": log.id,
        "theater_id": log.theater_id,
        "theater_number": log.theater.theater_number,
        "maintenance_type": log.maintenance_type,
        "technician_name": log.technician_name,
        "start_time": log.start_time.isoformat(),
        "end_time": log.end_time.isoformat() if log.end_time else None,
        "description": log.description,
        "parts_replaced": log.parts_replaced,
        "maintenance_result": log.maintenance_result,
        "next_maintenance_due": log.next_maintenance_due.isoformat() if log.next_maintenance_due else None,
        "notes": log.notes
    })

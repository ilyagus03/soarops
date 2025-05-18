from flask import Blueprint, jsonify, request
from DB_MODELLLLLLLSSS.all_models import RideCycle, db
import uuid
from datetime import datetime

cycles_bp = Blueprint('cycles', __name__, url_prefix='/api/ride-cycles')

@cycles_bp.route('/', methods=['GET'])
def get_ride_cycles():
    operation_day_id = request.args.get('operation_day_id')
    theater_id = request.args.get('theater_id')
    
    query = RideCycle.query
    
    if operation_day_id:
        query = query.filter(RideCycle.operation_day_id == operation_day_id)
    if theater_id:
        query = query.filter(RideCycle.theater_id == theater_id)
        
    ride_cycles = query.order_by(RideCycle.cycle_start_time).all()
    
    result = []
    for cycle in ride_cycles:
        result.append({
            "id": cycle.id,
            "theater_id": cycle.theater_id,
            "theater_number": cycle.theater.theater_number,
            "operation_day_id": cycle.operation_day_id,
            "cycle_start_time": cycle.cycle_start_time.isoformat(),
            "cycle_end_time": cycle.cycle_end_time.isoformat(),
            "guest_count": cycle.guest_count,
            "wheelchair_count": cycle.wheelchair_count,
            "ecv_count": cycle.ecv_count,
            "load_time": cycle.load_time,
            "unload_time": cycle.unload_time,
            "cycle_status": cycle.cycle_status,
            "wait_time_posted": cycle.wait_time_posted,
            "wait_time_actual": cycle.wait_time_actual,
            "incident_occurred": cycle.incident_occurred,
            "notes": cycle.notes
        })
    
    return jsonify(result)

@cycles_bp.route('/<cycle_id>', methods=['GET'])
def get_ride_cycle(cycle_id):
    cycle = RideCycle.query.get_or_404(cycle_id)
    
    return jsonify({
        "id": cycle.id,
        "theater_id": cycle.theater_id,
        "theater_number": cycle.theater.theater_number,
        "operation_day_id": cycle.operation_day_id,
        "cycle_start_time": cycle.cycle_start_time.isoformat(),
        "cycle_end_time": cycle.cycle_end_time.isoformat(),
        "guest_count": cycle.guest_count,
        "wheelchair_count": cycle.wheelchair_count,
        "ecv_count": cycle.ecv_count,
        "load_time": cycle.load_time,
        "unload_time": cycle.unload_time,
        "cycle_status": cycle.cycle_status,
        "wait_time_posted": cycle.wait_time_posted,
        "wait_time_actual": cycle.wait_time_actual,
        "incident_occurred": cycle.incident_occurred,
        "notes": cycle.notes
    })

@cycles_bp.route('/', methods=['POST'])
def create_ride_cycle():
    data = request.get_json()
    
    required_fields = ['theater_id', 'operation_day_id', 'cycle_start_time', 
                      'cycle_end_time', 'guest_count', 'load_time', 'unload_time']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Field '{field}' is required"}), 400
    
    new_cycle = RideCycle(
        id=str(uuid.uuid4()),
        theater_id=data['theater_id'],
        operation_day_id=data['operation_day_id'],
        cycle_start_time=datetime.fromisoformat(data['cycle_start_time']),
        cycle_end_time=datetime.fromisoformat(data['cycle_end_time']),
        guest_count=data['guest_count'],
        wheelchair_count=data.get('wheelchair_count', 0),
        ecv_count=data.get('ecv_count', 0),
        load_time=data['load_time'],
        unload_time=data['unload_time'],
        cycle_status=data.get('cycle_status', 'COMPLETED'),
        wait_time_posted=data.get('wait_time_posted'),
        wait_time_actual=data.get('wait_time_actual'),
        incident_occurred=data.get('incident_occurred', False),
        notes=data.get('notes')
    )
    
    db.session.add(new_cycle)
    db.session.commit()
    
    return jsonify({
        "id": new_cycle.id,
        "theater_id": new_cycle.theater_id,
        "operation_day_id": new_cycle.operation_day_id,
        "cycle_start_time": new_cycle.cycle_start_time.isoformat(),
        "cycle_end_time": new_cycle.cycle_end_time.isoformat(),
        "guest_count": new_cycle.guest_count,
        "cycle_status": new_cycle.cycle_status
    }), 201

@cycles_bp.route('/<cycle_id>', methods=['PUT'])
def update_ride_cycle(cycle_id):
    cycle = RideCycle.query.get_or_404(cycle_id)
    data = request.get_json()
    
    if 'cycle_end_time' in data:
        cycle.cycle_end_time = datetime.fromisoformat(data['cycle_end_time'])
    if 'guest_count' in data:
        cycle.guest_count = data['guest_count']
    if 'wheelchair_count' in data:
        cycle.wheelchair_count = data['wheelchair_count']
    if 'ecv_count' in data:
        cycle.ecv_count = data['ecv_count']
    if 'load_time' in data:
        cycle.load_time = data['load_time']
    if 'unload_time' in data:
        cycle.unload_time = data['unload_time']
    if 'cycle_status' in data:
        cycle.cycle_status = data['cycle_status']
    if 'wait_time_posted' in data:
        cycle.wait_time_posted = data['wait_time_posted']
    if 'wait_time_actual' in data:
        cycle.wait_time_actual = data['wait_time_actual']
    if 'incident_occurred' in data:
        cycle.incident_occurred = data['incident_occurred']
    if 'notes' in data:
        cycle.notes = data['notes']
    
    db.session.commit()
    
    return jsonify({
        "id": cycle.id,
        "theater_id": cycle.theater_id,
        "theater_number": cycle.theater.theater_number,
        "operation_day_id": cycle.operation_day_id,
        "cycle_start_time": cycle.cycle_start_time.isoformat(),
        "cycle_end_time": cycle.cycle_end_time.isoformat(),
        "guest_count": cycle.guest_count,
        "cycle_status": cycle.cycle_status
    })

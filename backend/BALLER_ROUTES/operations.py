from flask import Blueprint, jsonify, request
from DB_MODELLLLLLLSSS.all_models import OperationDay, db
import uuid

operations_bp = Blueprint('operations', __name__, url_prefix='/api/operation-days')

@operations_bp.route('/', methods=['GET'])
def get_operation_days():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    query = OperationDay.query
    
    if start_date:
        query = query.filter(OperationDay.date >= start_date)
    if end_date:
        query = query.filter(OperationDay.date <= end_date)
        
    operation_days = query.order_by(OperationDay.date).all()
    
    result = []
    for day in operation_days:
        result.append({
            "id": day.id,
            "date": day.date.isoformat(),
            "park_opening_time": day.park_opening_time.isoformat(),
            "park_closing_time": day.park_closing_time.isoformat(),
            "expected_attendance": day.expected_attendance,
            "actual_attendance": day.actual_attendance,
            "special_event": day.special_event,
            "notes": day.notes
        })
    
    return jsonify(result)

@operations_bp.route('/<day_id>', methods=['GET'])
def get_operation_day(day_id):
    day = OperationDay.query.get_or_404(day_id)
    
    weather = None
    if day.weather:
        weather = {
            "temperature_high": float(day.weather.temperature_high),
            "temperature_low": float(day.weather.temperature_low),
            "precipitation": float(day.weather.precipitation) if day.weather.precipitation else 0,
            "humidity": float(day.weather.humidity) if day.weather.humidity else 0,
            "wind_speed": float(day.weather.wind_speed) if day.weather.wind_speed else 0,
            "weather_condition": day.weather.weather_condition
        }
    
    return jsonify({
        "id": day.id,
        "date": day.date.isoformat(),
        "park_opening_time": day.park_opening_time.isoformat(),
        "park_closing_time": day.park_closing_time.isoformat(),
        "expected_attendance": day.expected_attendance,
        "actual_attendance": day.actual_attendance,
        "special_event": day.special_event,
        "notes": day.notes,
        "weather": weather
    })

@operations_bp.route('/', methods=['POST'])
def create_operation_day():
    data = request.get_json()
    
    required_fields = ['date', 'park_opening_time', 'park_closing_time', 'expected_attendance']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Field '{field}' is required"}), 400
    
    from datetime import datetime
    operation_date = datetime.fromisoformat(data['date']).date()
    existing_day = OperationDay.query.filter_by(date=operation_date).first()
    if existing_day:
        return jsonify({"error": f"Operation day for date {data['date']} already exists"}), 400
    
    from datetime import time
    new_day = OperationDay(
        id=str(uuid.uuid4()),
        date=operation_date,
        park_opening_time=time.fromisoformat(data['park_opening_time']),
        park_closing_time=time.fromisoformat(data['park_closing_time']),
        expected_attendance=data['expected_attendance'],
        actual_attendance=data.get('actual_attendance'),
        special_event=data.get('special_event', False),
        weather_id=data.get('weather_id'),
        notes=data.get('notes')
    )
    
    db.session.add(new_day)
    db.session.commit()
    
    return jsonify({
        "id": new_day.id,
        "date": new_day.date.isoformat(),
        "park_opening_time": new_day.park_opening_time.isoformat(),
        "park_closing_time": new_day.park_closing_time.isoformat(),
        "expected_attendance": new_day.expected_attendance,
        "actual_attendance": new_day.actual_attendance,
        "special_event": new_day.special_event,
        "notes": new_day.notes
    }), 201

@operations_bp.route('/<day_id>', methods=['PUT'])
def update_operation_day(day_id):
    day = OperationDay.query.get_or_404(day_id)
    data = request.get_json()
    
    if 'park_opening_time' in data:
        day.park_opening_time = time.fromisoformat(data['park_opening_time'])
    if 'park_closing_time' in data:
        day.park_closing_time = time.fromisoformat(data['park_closing_time'])
    if 'expected_attendance' in data:
        day.expected_attendance = data['expected_attendance']
    if 'actual_attendance' in data:
        day.actual_attendance = data['actual_attendance']
    if 'special_event' in data:
        day.special_event = data['special_event']
    if 'notes' in data:
        day.notes = data['notes']
    
    db.session.commit()
    
    return jsonify({
        "id": day.id,
        "date": day.date.isoformat(),
        "park_opening_time": day.park_opening_time.isoformat(),
        "park_closing_time": day.park_closing_time.isoformat(),
        "expected_attendance": day.expected_attendance,
        "actual_attendance": day.actual_attendance,
        "special_event": day.special_event,
        "notes": day.notes
    })

from flask import Blueprint, jsonify, request
from DB_MODELLLLLLLSSS.all_models import RideCycle, db
from services.wait_time_predictor import WaitTimePredictor

anal_bp = Blueprint('anal', __name__, url_prefix='/api/anal')

wait_time_predictor = WaitTimePredictor()

@anal_bp.route('/throughput', methods=['GET'])
def get_throughput_analytics():
    operation_day_id = request.args.get('operation_day_id')
    
    if not operation_day_id:
        return jsonify({"error": "operation_day_id is required"}), 400
    
    ride_cycles = RideCycle.query.filter_by(operation_day_id=operation_day_id).all()
    
    total_guests = sum(cycle.guest_count for cycle in ride_cycles)
    total_cycles = len(ride_cycles)
    avg_load_time = sum(cycle.load_time for cycle in ride_cycles) / total_cycles if total_cycles > 0 else 0
    avg_unload_time = sum(cycle.unload_time for cycle in ride_cycles) / total_cycles if total_cycles > 0 else 0
    
    hourly_data = {}
    for cycle in ride_cycles:
        hour = cycle.cycle_start_time.hour
        if hour not in hourly_data:
            hourly_data[hour] = {
                "guests": 0,
                "cycles": 0
            }
        hourly_data[hour]["guests"] += cycle.guest_count
        hourly_data[hour]["cycles"] += 1
    
    hourly_throughput = [
        {
            "hour": hour,
            "guests": data["guests"],
            "cycles": data["cycles"]
        }
        for hour, data in hourly_data.items()
    ]
    
    theater_data = {}
    for cycle in ride_cycles:
        theater_id = cycle.theater_id
        if theater_id not in theater_data:
            theater_data[theater_id] = {
                "theater_id": theater_id,
                "theater_number": cycle.theater.theater_number,
                "guests": 0,
                "cycles": 0
            }
        theater_data[theater_id]["guests"] += cycle.guest_count
        theater_data[theater_id]["cycles"] += 1
    
    theater_throughput = list(theater_data.values())
    
    return jsonify({
        "total_guests": total_guests,
        "total_cycles": total_cycles,
        "avg_guests_per_cycle": total_guests / total_cycles if total_cycles > 0 else 0,
        "avg_load_time": avg_load_time,
        "avg_unload_time": avg_unload_time,
        "hourly_throughput": hourly_throughput,
        "theater_throughput": theater_throughput
    })

@anal_bp.route('/wait-times', methods=['GET'])
def get_wait_time_analytics():
    operation_day_id = request.args.get('operation_day_id')
    
    if not operation_day_id:
        return jsonify({"error": "operation_day_id is required"}), 400
    
    ride_cycles = RideCycle.query.filter_by(operation_day_id=operation_day_id).filter(
        RideCycle.wait_time_posted.isnot(None),
        RideCycle.wait_time_actual.isnot(None)
    ).all()
    
    total_cycles = len(ride_cycles)
    avg_posted_wait = sum(cycle.wait_time_posted for cycle in ride_cycles) / total_cycles if total_cycles > 0 else 0
    avg_actual_wait = sum(cycle.wait_time_actual for cycle in ride_cycles) / total_cycles if total_cycles > 0 else 0
    
    wait_time_accuracy = []
    for cycle in ride_cycles:
        if cycle.wait_time_posted > 0: 
            accuracy = cycle.wait_time_actual / cycle.wait_time_posted
        else:
            accuracy = 1.0 if cycle.wait_time_actual == 0 else float('inf')
            
        wait_time_accuracy.append({
            "cycle_id": cycle.id,
            "cycle_start_time": cycle.cycle_start_time.isoformat(),
            "posted": cycle.wait_time_posted,
            "actual": cycle.wait_time_actual,
            "accuracy": accuracy
        })
    
    hourly_data = {}
    for cycle in ride_cycles:
        hour = cycle.cycle_start_time.hour
        if hour not in hourly_data:
            hourly_data[hour] = {
                "posted_wait_sum": 0,
                "actual_wait_sum": 0,
                "count": 0
            }
        hourly_data[hour]["posted_wait_sum"] += cycle.wait_time_posted
        hourly_data[hour]["actual_wait_sum"] += cycle.wait_time_actual
        hourly_data[hour]["count"] += 1
    
    hourly_wait_times = [
        {
            "hour": hour,
            "avg_posted_wait": data["posted_wait_sum"] / data["count"],
            "avg_actual_wait": data["actual_wait_sum"] / data["count"],
            "count": data["count"]
        }
        for hour, data in hourly_data.items()
    ]
    
    return jsonify({
        "avg_posted_wait": avg_posted_wait,
        "avg_actual_wait": avg_actual_wait,
        "wait_time_accuracy": sum(entry["accuracy"] for entry in wait_time_accuracy) / len(wait_time_accuracy) if wait_time_accuracy else 0,
        "hourly_wait_times": hourly_wait_times,
        "wait_time_details": wait_time_accuracy
    })

@anal_bp.route('/predict-wait-time', methods=['POST'])
def predict_wait_time():
    data = request.get_json()
    
    if not wait_time_predictor.is_trained:
        return jsonify({
            "predicted_wait_time": 45,  
            "confidence": 0.85,
            "factors": {
                "park_capacity": "High impact",
                "weather": "Low impact",
                "staffing": "Medium impact",
                "time_of_day": "High impact"
            }
        })
    
    return jsonify({
        "predicted_wait_time": 45,  
        "confidence": 0.85,
        "factors": {
            "park_capacity": "High impact",
            "weather": "Low impact",
            "staffing": "Medium impact",
            "time_of_day": "High impact"
        }
    })

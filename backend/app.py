import os
from datetime import datetime, timedelta
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
import json

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://postgres:postgres@localhost:5432/soarops')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Import models (these would typically be in separate files)
class Theater(db.Model):
    __tablename__ = 'theaters'
    
    id = db.Column(db.String(36), primary_key=True)
    theater_number = db.Column(db.Integer, nullable=False, unique=True)
    capacity = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(20), nullable=False, default='OPERATIONAL')
    last_maintenance_date = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class OperationDay(db.Model):
    __tablename__ = 'operation_days'
    
    id = db.Column(db.String(36), primary_key=True)
    date = db.Column(db.Date, nullable=False, unique=True)
    park_opening_time = db.Column(db.Time, nullable=False)
    park_closing_time = db.Column(db.Time, nullable=False)
    expected_attendance = db.Column(db.Integer, nullable=False)
    actual_attendance = db.Column(db.Integer)
    special_event = db.Column(db.Boolean, default=False)
    weather_id = db.Column(db.String(36), db.ForeignKey('weather_conditions.id'))
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship
    weather = db.relationship('WeatherCondition', backref='operation_days')

class WeatherCondition(db.Model):
    __tablename__ = 'weather_conditions'
    
    id = db.Column(db.String(36), primary_key=True)
    date = db.Column(db.Date, nullable=False, unique=True)
    temperature_high = db.Column(db.Numeric(4, 1), nullable=False)
    temperature_low = db.Column(db.Numeric(4, 1), nullable=False)
    precipitation = db.Column(db.Numeric(4, 2))
    humidity = db.Column(db.Numeric(5, 2))
    wind_speed = db.Column(db.Numeric(4, 1))
    weather_condition = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class RideCycle(db.Model):
    __tablename__ = 'ride_cycles'
    
    id = db.Column(db.String(36), primary_key=True)
    theater_id = db.Column(db.String(36), db.ForeignKey('theaters.id'))
    operation_day_id = db.Column(db.String(36), db.ForeignKey('operation_days.id'))
    cycle_start_time = db.Column(db.DateTime, nullable=False)
    cycle_end_time = db.Column(db.DateTime, nullable=False)
    guest_count = db.Column(db.Integer, nullable=False)
    wheelchair_count = db.Column(db.Integer, default=0)
    ecv_count = db.Column(db.Integer, default=0)
    load_time = db.Column(db.Integer, nullable=False)
    unload_time = db.Column(db.Integer, nullable=False)
    cycle_status = db.Column(db.String(20), nullable=False, default='COMPLETED')
    wait_time_posted = db.Column(db.Integer)
    wait_time_actual = db.Column(db.Integer)
    incident_occurred = db.Column(db.Boolean, default=False)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    theater = db.relationship('Theater', backref='ride_cycles')
    operation_day = db.relationship('OperationDay', backref='ride_cycles')

class StaffMember(db.Model):
    __tablename__ = 'staff_members'
    
    id = db.Column(db.String(36), primary_key=True)
    employee_id = db.Column(db.String(20), nullable=False, unique=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    position = db.Column(db.String(50), nullable=False)
    hire_date = db.Column(db.Date, nullable=False)
    certification_level = db.Column(db.Integer, nullable=False)
    is_trainer = db.Column(db.Boolean, default=False)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class StaffAssignment(db.Model):
    __tablename__ = 'staff_assignments'
    
    id = db.Column(db.String(36), primary_key=True)
    operation_day_id = db.Column(db.String(36), db.ForeignKey('operation_days.id'))
    staff_id = db.Column(db.String(36), db.ForeignKey('staff_members.id'))
    position = db.Column(db.String(50), nullable=False)
    theater_id = db.Column(db.String(36), db.ForeignKey('theaters.id'))
    shift_start_time = db.Column(db.Time, nullable=False)
    shift_end_time = db.Column(db.Time, nullable=False)
    break_start_time = db.Column(db.Time)
    break_end_time = db.Column(db.Time)
    rotation_group = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    operation_day = db.relationship('OperationDay', backref='staff_assignments')
    staff_member = db.relationship('StaffMember', backref='assignments')
    theater = db.relationship('Theater', backref='staff_assignments')
    
    # Unique constraint
    __table_args__ = (
        db.UniqueConstraint('operation_day_id', 'staff_id', 'shift_start_time'),
    )

class Incident(db.Model):
    __tablename__ = 'incidents'
    
    id = db.Column(db.String(36), primary_key=True)
    ride_cycle_id = db.Column(db.String(36), db.ForeignKey('ride_cycles.id'))
    incident_time = db.Column(db.DateTime, nullable=False)
    incident_type = db.Column(db.String(50), nullable=False)
    severity = db.Column(db.Integer, nullable=False)
    theater_id = db.Column(db.String(36), db.ForeignKey('theaters.id'))
    reported_by = db.Column(db.String(36), db.ForeignKey('staff_members.id'))
    description = db.Column(db.Text, nullable=False)
    resolution = db.Column(db.Text)
    downtime_minutes = db.Column(db.Integer)
    guests_evacuated = db.Column(db.Integer, default=0)
    incident_status = db.Column(db.String(20), default='OPEN')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    ride_cycle = db.relationship('RideCycle', backref='incidents')
    theater = db.relationship('Theater', backref='incidents')
    reporter = db.relationship('StaffMember', backref='reported_incidents')

class MaintenanceLog(db.Model):
    __tablename__ = 'maintenance_logs'
    
    id = db.Column(db.String(36), primary_key=True)
    theater_id = db.Column(db.String(36), db.ForeignKey('theaters.id'))
    maintenance_type = db.Column(db.String(50), nullable=False)
    technician_name = db.Column(db.String(100), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime)
    description = db.Column(db.Text, nullable=False)
    parts_replaced = db.Column(db.Text)
    maintenance_result = db.Column(db.String(50), nullable=False)
    next_maintenance_due = db.Column(db.Date)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    theater = db.relationship('Theater', backref='maintenance_logs')

# Wait time prediction class
class WaitTimePredictor:
    def __init__(self):
        self.model = LinearRegression()
        self.scaler = StandardScaler()
        self.is_trained = False
        
    def train(self, historical_data):
        """Train the wait time prediction model using historical operational data."""
        # Extract features: time of day, day of week, season, weather, staffing level
        X = self._extract_features(historical_data)
        # Target: actual wait times
        y = historical_data['wait_time_minutes']
        
        # Normalize features
        X_scaled = self.scaler.fit_transform(X)
        
        # Train model
        self.model.fit(X_scaled, y)
        self.is_trained = True
        
        # Calculate and return model accuracy
        return self.model.score(X_scaled, y)
    
    def predict(self, current_conditions):
        """Predict wait time based on current park conditions."""
        if not self.is_trained:
            raise Exception("Model must be trained before making predictions")
        
        X = self._extract_features(current_conditions)
        X_scaled = self.scaler.transform(X)
        
        return self.model.predict(X_scaled)[0]
    
    def _extract_features(self, data):
        """Extract and prepare features for the prediction model."""
        features = pd.DataFrame()
        
        # Time-based features
        features['hour'] = data['timestamp'].dt.hour
        features['is_weekend'] = data['timestamp'].dt.dayofweek >= 5
        features['is_holiday'] = data['is_holiday']
        
        # Park condition features
        features['park_capacity_pct'] = data['current_park_capacity'] / data['max_park_capacity']
        features['nearby_attraction_wait'] = data['avg_nearby_attraction_wait']
        features['staff_experience_level'] = data['avg_staff_experience_months']
        features['theater_efficiency'] = data['guests_per_hour'] / data['theoretical_max_guests_per_hour']
        
        # External factors
        features['temperature'] = data['temperature']
        features['is_raining'] = data['is_raining']
        
        return features

# Initialize the wait time predictor
wait_time_predictor = WaitTimePredictor()

# API Routes
@app.route('/')
def home():
    return jsonify({
        "message": "Welcome to the SoarOps API",
        "version": "1.0.0"
    })

# Theater endpoints
@app.route('/api/theaters', methods=['GET'])
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

@app.route('/api/theaters/<theater_id>', methods=['GET'])
def get_theater(theater_id):
    theater = Theater.query.get_or_404(theater_id)
    return jsonify({
        "id": theater.id,
        "theater_number": theater.theater_number,
        "capacity": theater.capacity,
        "status": theater.status,
        "last_maintenance_date": theater.last_maintenance_date.isoformat() if theater.last_maintenance_date else None
    })

@app.route('/api/theaters/<theater_id>/status', methods=['PUT'])
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

# Operation day endpoints
@app.route('/api/operation-days', methods=['GET'])
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

@app.route('/api/operation-days/<day_id>', methods=['GET'])
def get_operation_day(day_id):
    day = OperationDay.query.get_or_404(day_id)
    
    # Get weather data
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

# Ride cycle endpoints
@app.route('/api/ride-cycles', methods=['GET'])
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

@app.route('/api/ride-cycles', methods=['POST'])
def create_ride_cycle():
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['theater_id', 'operation_day_id', 'cycle_start_time', 
                       'cycle_end_time', 'guest_count', 'load_time', 'unload_time']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Field '{field}' is required"}), 400
    
    # Create new ride cycle
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

# Staff endpoints
@app.route('/api/staff', methods=['GET'])
def get_staff():
    is_active = request.args.get('is_active')
    position = request.args.get('position')
    
    query = StaffMember.query
    
    if is_active is not None:
        is_active_bool = is_active.lower() == 'true'
        query = query.filter(StaffMember.is_active == is_active_bool)
    if position:
        query = query.filter(StaffMember.position == position)
        
    staff = query.order_by(StaffMember.last_name, StaffMember.first_name).all()
    
    result = []
    for member in staff:
        result.append({
            "id": member.id,
            "employee_id": member.employee_id,
            "name": f"{member.first_name} {member.last_name}",
            "position": member.position,
            "hire_date": member.hire_date.isoformat(),
            "certification_level": member.certification_level,
            "is_trainer": member.is_trainer,
            "is_active": member.is_active
        })
    
    return jsonify(result)

# Staff assignments
@app.route('/api/staff-assignments', methods=['GET'])
def get_staff_assignments():
    operation_day_id = request.args.get('operation_day_id')
    
    if not operation_day_id:
        return jsonify({"error": "operation_day_id is required"}), 400
        
    assignments = StaffAssignment.query.filter_by(operation_day_id=operation_day_id).all()
    
    result = []
    for assignment in assignments:
        result.append({
            "id": assignment.id,
            "staff_id": assignment.staff_id,
            "staff_name": f"{assignment.staff_member.first_name} {assignment.staff_member.last_name}",
            "position": assignment.position,
            "theater_id": assignment.theater_id,
            "theater_number": assignment.theater.theater_number if assignment.theater else None,
            "shift_start_time": assignment.shift_start_time.isoformat(),
            "shift_end_time": assignment.shift_end_time.isoformat(),
            "break_start_time": assignment.break_start_time.isoformat() if assignment.break_start_time else None,
            "break_end_time": assignment.break_end_time.isoformat() if assignment.break_end_time else None,
            "rotation_group": assignment.rotation_group
        })
    
    return jsonify(result)

# Incidents
@app.route('/api/incidents', methods=['GET'])
def get_incidents():
    operation_day_id = request.args.get('operation_day_id')
    theater_id = request.args.get('theater_id')
    status = request.args.get('status')
    
    # Join with ride_cycles to filter by operation_day_id
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

# Maintenance logs
@app.route('/api/maintenance-logs', methods=['GET'])
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

# Analytics endpoints
@app.route('/api/analytics/throughput', methods=['GET'])
def get_throughput_analytics():
    operation_day_id = request.args.get('operation_day_id')
    
    if not operation_day_id:
        return jsonify({"error": "operation_day_id is required"}), 400
    
    # Get all ride cycles for the day
    ride_cycles = RideCycle.query.filter_by(operation_day_id=operation_day_id).all()
    
    # Calculate metrics
    total_guests = sum(cycle.guest_count for cycle in ride_cycles)
    total_cycles = len(ride_cycles)
    avg_load_time = sum(cycle.load_time for cycle in ride_cycles) / total_cycles if total_cycles > 0 else 0
    avg_unload_time = sum(cycle.unload_time for cycle in ride_cycles) / total_cycles if total_cycles > 0 else 0
    
    # Group by hour for hourly throughput
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
    
    # Group by theater
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

@app.route('/api/analytics/wait-times', methods=['GET'])
def get_wait_time_analytics():
    operation_day_id = request.args.get('operation_day_id')
    
    if not operation_day_id:
        return jsonify({"error": "operation_day_id is required"}), 400
    
    # Get all ride cycles for the day with wait time data
    ride_cycles = RideCycle.query.filter_by(operation_day_id=operation_day_id).filter(
        RideCycle.wait_time_posted.isnot(None),
        RideCycle.wait_time_actual.isnot(None)
    ).all()
    
    # Calculate metrics
    total_cycles = len(ride_cycles)
    avg_posted_wait = sum(cycle.wait_time_posted for cycle in ride_cycles) / total_cycles if total_cycles > 0 else 0
    avg_actual_wait = sum(cycle.wait_time_actual for cycle in ride_cycles) / total_cycles if total_cycles > 0 else 0
    
    # Calculate accuracy
    wait_time_accuracy = []
    for cycle in ride_cycles:
        if cycle.wait_time_posted > 0:  # Avoid division by zero
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
    
    # Group by hour for hourly wait times
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

@app.route('/api/analytics/predict-wait-time', methods=['POST'])
def predict_wait_time():
    data = request.get_json()
    
    # Check if predictor is trained
    if not wait_time_predictor.is_trained:
        # Train model with historical data (in a real app, this would happen at startup)
        # For this demo, we'll just return a mock response
        return jsonify({
            "predicted_wait_time": 45,  # Mock value
            "confidence": 0.85,
            "factors": {
                "park_capacity": "High impact",
                "weather": "Low impact",
                "staffing": "Medium impact",
                "time_of_day": "High impact"
            }
        })
    
    # In a real app, we would use the actual predictor
    # predicted_wait = wait_time_predictor.predict(data)
    
    # For this demo, we'll return a mock response
    return jsonify({
        "predicted_wait_time": 45,  # Mock value
        "confidence": 0.85,
        "factors": {
            "park_capacity": "High impact",
            "weather": "Low impact",
            "staffing": "Medium impact",
            "time_of_day": "High impact"
        }
    })

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
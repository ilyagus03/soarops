from datetime import datetime
from DB_MODELLLLLLLSSS import db

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
    weather = db.relationship('WeatherCondition', backref='operation_days')

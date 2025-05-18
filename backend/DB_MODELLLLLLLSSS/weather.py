from datetime import datetime
from DB_MODELLLLLLLSSS import db

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

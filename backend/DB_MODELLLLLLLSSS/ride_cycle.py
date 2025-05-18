from datetime import datetime
from DB_MODELLLLLLLSSS import db

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
    theater = db.relationship('Theater', backref='ride_cycles')
    operation_day = db.relationship('OperationDay', backref='ride_cycles')

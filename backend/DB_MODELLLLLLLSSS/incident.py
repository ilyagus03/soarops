from datetime import datetime
from DB_MODELLLLLLLSSS import db

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

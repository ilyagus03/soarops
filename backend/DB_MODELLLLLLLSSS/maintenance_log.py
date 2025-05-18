from datetime import datetime
from DB_MODELLLLLLLSSS import db

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
    theater = db.relationship('Theater', backref='maintenance_logs')

from datetime import datetime
from DB_MODELLLLLLLSSS import db

class Theater(db.Model):
    __tablename__ = 'theaters'
    
    id = db.Column(db.String(36), primary_key=True)
    theater_number = db.Column(db.Integer, nullable=False, unique=True)
    capacity = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(20), nullable=False, default='OPERATIONAL')
    last_maintenance_date = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

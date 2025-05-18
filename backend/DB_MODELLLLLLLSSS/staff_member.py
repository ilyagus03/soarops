from datetime import datetime
from DB_MODELLLLLLLSSS import db

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

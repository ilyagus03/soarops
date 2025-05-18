from datetime import datetime
from DB_MODELLLLLLLSSS import db

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
    operation_day = db.relationship('OperationDay', backref='staff_assignments')
    staff_member = db.relationship('StaffMember', backref='assignments')
    theater = db.relationship('Theater', backref='staff_assignments')
    
    __table_args__ = (
        db.UniqueConstraint('operation_day_id', 'staff_id', 'shift_start_time'),
    )

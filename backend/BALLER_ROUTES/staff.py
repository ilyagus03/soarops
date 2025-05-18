from flask import Blueprint, jsonify, request
from DB_MODELLLLLLLSSS.all_models import StaffMember, StaffAssignment, db
import uuid
from datetime import datetime

staff_bp = Blueprint('staff', __name__, url_prefix='/api')

@staff_bp.route('/staff', methods=['GET'])
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

@staff_bp.route('/staff/<staff_id>', methods=['GET'])
def get_staff_member(staff_id):
    member = StaffMember.query.get_or_404(staff_id)
    
    return jsonify({
        "id": member.id,
        "employee_id": member.employee_id,
        "first_name": member.first_name,
        "last_name": member.last_name,
        "name": f"{member.first_name} {member.last_name}",
        "position": member.position,
        "hire_date": member.hire_date.isoformat(),
        "certification_level": member.certification_level,
        "is_trainer": member.is_trainer,
        "is_active": member.is_active
    })

@staff_bp.route('/staff', methods=['POST'])
def create_staff_member():
    data = request.get_json()
    
    required_fields = ['employee_id', 'first_name', 'last_name', 'position', 'hire_date', 'certification_level']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Field '{field}' is required"}), 400
    
    existing_staff = StaffMember.query.filter_by(employee_id=data['employee_id']).first()
    if existing_staff:
        return jsonify({"error": f"Staff member with employee ID {data['employee_id']} already exists"}), 400
    
    new_staff = StaffMember(
        id=str(uuid.uuid4()),
        employee_id=data['employee_id'],
        first_name=data['first_name'],
        last_name=data['last_name'],
        position=data['position'],
        hire_date=datetime.fromisoformat(data['hire_date']).date(),
        certification_level=data['certification_level'],
        is_trainer=data.get('is_trainer', False),
        is_active=data.get('is_active', True)
    )
    
    db.session.add(new_staff)
    db.session.commit()
    
    return jsonify({
        "id": new_staff.id,
        "employee_id": new_staff.employee_id,
        "name": f"{new_staff.first_name} {new_staff.last_name}",
        "position": new_staff.position,
        "hire_date": new_staff.hire_date.isoformat(),
        "certification_level": new_staff.certification_level,
        "is_trainer": new_staff.is_trainer,
        "is_active": new_staff.is_active
    }), 201

@staff_bp.route('/staff/<staff_id>', methods=['PUT'])
def update_staff_member(staff_id):
    member = StaffMember.query.get_or_404(staff_id)
    data = request.get_json()
    
    if 'first_name' in data:
        member.first_name = data['first_name']
    if 'last_name' in data:
        member.last_name = data['last_name']
    if 'position' in data:
        member.position = data['position']
    if 'certification_level' in data:
        member.certification_level = data['certification_level']
    if 'is_trainer' in data:
        member.is_trainer = data['is_trainer']
    if 'is_active' in data:
        member.is_active = data['is_active']
    
    db.session.commit()
    
    return jsonify({
        "id": member.id,
        "employee_id": member.employee_id,
        "name": f"{member.first_name} {member.last_name}",
        "position": member.position,
        "hire_date": member.hire_date.isoformat(),
        "certification_level": member.certification_level,
        "is_trainer": member.is_trainer,
        "is_active": member.is_active
    })

@staff_bp.route('/staff-assignments', methods=['GET'])
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

@staff_bp.route('/staff-assignments', methods=['POST'])
def create_staff_assignment():
    data = request.get_json()
    
    required_fields = ['operation_day_id', 'staff_id', 'position', 'shift_start_time', 'shift_end_time']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Field '{field}' is required"}), 400
    
    new_assignment = StaffAssignment(
        id=str(uuid.uuid4()),
        operation_day_id=data['operation_day_id'],
        staff_id=data['staff_id'],
        position=data['position'],
        theater_id=data.get('theater_id'),
        shift_start_time=datetime.fromisoformat(data['shift_start_time']).time(),
        shift_end_time=datetime.fromisoformat(data['shift_end_time']).time(),
        break_start_time=datetime.fromisoformat(data['break_start_time']).time() if 'break_start_time' in data else None,
        break_end_time=datetime.fromisoformat(data['break_end_time']).time() if 'break_end_time' in data else None,
        rotation_group=data.get('rotation_group')
    )
    
    db.session.add(new_assignment)
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Failed to create assignment: {str(e)}"}), 400
    
    staff_member = StaffMember.query.get(data['staff_id'])
    
    return jsonify({
        "id": new_assignment.id,
        "staff_id": new_assignment.staff_id,
        "staff_name": f"{staff_member.first_name} {staff_member.last_name}",
        "position": new_assignment.position,
        "theater_id": new_assignment.theater_id,
        "shift_start_time": new_assignment.shift_start_time.isoformat(),
        "shift_end_time": new_assignment.shift_end_time.isoformat(),
        "break_start_time": new_assignment.break_start_time.isoformat() if new_assignment.break_start_time else None,
        "break_end_time": new_assignment.break_end_time.isoformat() if new_assignment.break_end_time else None,
        "rotation_group": new_assignment.rotation_group
    }), 201

from flask import Blueprint, request, jsonify
import sys
import os
# Add parent directory to path for imports
parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)
from models import db, Faculty

faculty_bp = Blueprint('faculty', __name__, url_prefix='/api/faculty')

@faculty_bp.route('', methods=['GET'])
def get_faculty():
    """Get all faculty (filtered by tenant if provided)"""
    tenant_id = request.args.get('tenant_id')
    query = Faculty.query
    
    if tenant_id:
        query = query.filter_by(tenant_id=tenant_id)
    
    faculty_list = query.all()
    return jsonify({
        'success': True,
        'data': [faculty.to_dict() for faculty in faculty_list]
    })

@faculty_bp.route('', methods=['POST'])
def create_faculty():
    """Create a new faculty member"""
    try:
        data = request.get_json()
        from datetime import datetime as dt
        employment_start_date = None
        if data.get('employment_start_date'):
            employment_start_date = dt.strptime(data.get('employment_start_date'), '%Y-%m-%d').date()
        
        faculty = Faculty(
            employee_number=data.get('employee_number'),
            first_name=data.get('first_name'),
            last_name=data.get('last_name'),
            middle_name=data.get('middle_name'),
            email=data.get('email'),
            contact_number=data.get('contact_number'),
            department=data.get('department'),
            position=data.get('position'),
            employment_start_date=employment_start_date,
            employment_status=data.get('employment_status', 'Full-time'),
            tenant_id=data.get('tenant_id')
        )
        db.session.add(faculty)
        db.session.commit()
        return jsonify({
            'success': True,
            'message': 'Faculty created successfully',
            'data': faculty.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': f'Failed to create faculty: {str(e)}'
        }), 500

@faculty_bp.route('/<int:faculty_id>', methods=['GET'])
def get_faculty_member(faculty_id):
    """Get a specific faculty member"""
    faculty = Faculty.query.get_or_404(faculty_id)
    return jsonify({
        'success': True,
        'data': faculty.to_dict()
    })

@faculty_bp.route('/<int:faculty_id>', methods=['PUT'])
def update_faculty(faculty_id):
    """Update a faculty member"""
    faculty = Faculty.query.get_or_404(faculty_id)
    data = request.get_json()
    
    faculty.first_name = data.get('first_name', faculty.first_name)
    faculty.last_name = data.get('last_name', faculty.last_name)
    faculty.email = data.get('email', faculty.email)
    faculty.department = data.get('department', faculty.department)
    faculty.position = data.get('position', faculty.position)
    
    db.session.commit()
    return jsonify({
        'success': True,
        'message': 'Faculty updated successfully',
        'data': faculty.to_dict()
    })

@faculty_bp.route('/<int:faculty_id>', methods=['DELETE'])
def delete_faculty(faculty_id):
    """Delete a faculty member"""
    faculty = Faculty.query.get_or_404(faculty_id)
    db.session.delete(faculty)
    db.session.commit()
    return jsonify({
        'success': True,
        'message': 'Faculty deleted successfully'
    })


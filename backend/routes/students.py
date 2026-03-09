from flask import Blueprint, request, jsonify
import sys
import os
# Add parent directory to path for imports
parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)
from models import db, Student

students_bp = Blueprint('students', __name__, url_prefix='/api/students')

@students_bp.route('', methods=['GET'])
def get_students():
    """Get all students (filtered by tenant if provided)"""
    tenant_id = request.args.get('tenant_id')
    query = Student.query
    
    if tenant_id:
        query = query.filter_by(tenant_id=tenant_id)
    
    students = query.all()
    return jsonify({
        'success': True,
        'data': [student.to_dict() for student in students]
    })

@students_bp.route('', methods=['POST'])
def create_student():
    """Create a new student"""
    try:
        data = request.get_json()
        student = Student(
            student_id=data.get('student_id'),
            first_name=data.get('first_name'),
            last_name=data.get('last_name'),
            middle_name=data.get('middle_name'),
            email=data.get('email'),
            contact_number=data.get('contact_number'),
            course=data.get('course'),
            year_level=data.get('year_level'),
            enrollment_status=data.get('enrollment_status', 'Enrolled'),
            tenant_id=data.get('tenant_id')
        )
        db.session.add(student)
        db.session.commit()
        return jsonify({
            'success': True,
            'message': 'Student created successfully',
            'data': student.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': f'Failed to create student: {str(e)}'
        }), 500

@students_bp.route('/<int:student_id>', methods=['GET'])
def get_student(student_id):
    """Get a specific student"""
    student = Student.query.get_or_404(student_id)
    return jsonify({
        'success': True,
        'data': student.to_dict()
    })

@students_bp.route('/<int:student_id>', methods=['PUT'])
def update_student(student_id):
    """Update a student"""
    student = Student.query.get_or_404(student_id)
    data = request.get_json()
    
    student.first_name = data.get('first_name', student.first_name)
    student.last_name = data.get('last_name', student.last_name)
    student.email = data.get('email', student.email)
    student.course = data.get('course', student.course)
    student.year_level = data.get('year_level', student.year_level)
    
    db.session.commit()
    return jsonify({
        'success': True,
        'message': 'Student updated successfully',
        'data': student.to_dict()
    })

@students_bp.route('/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    """Delete a student"""
    student = Student.query.get_or_404(student_id)
    db.session.delete(student)
    db.session.commit()
    return jsonify({
        'success': True,
        'message': 'Student deleted successfully'
    })


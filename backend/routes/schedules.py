from flask import Blueprint, request, jsonify
from models import db, Schedule
from datetime import datetime

schedules_bp = Blueprint('schedules', __name__, url_prefix='/api/schedules')

@schedules_bp.route('', methods=['GET'])
def get_schedules():
    """Get all schedules with optional filtering"""
    try:
        tenant_id = request.args.get('tenant_id')
        course = request.args.get('course')
        day = request.args.get('day')
        
        query = Schedule.query
        
        if tenant_id:
            query = query.filter(Schedule.tenant_id == tenant_id)
        if course and course != 'All Courses':
            query = query.filter(Schedule.course == course)
        if day and day != 'All Days':
            query = query.filter(Schedule.day == day)
        
        schedules = query.order_by(Schedule.day, Schedule.start_time).all()
        
        return jsonify({
            'success': True,
            'data': [schedule.to_dict() for schedule in schedules]
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@schedules_bp.route('', methods=['POST'])
def create_schedule():
    """Create a new schedule"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['course', 'subject', 'instructor', 'room', 'day', 'start_time', 'end_time']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({
                    'success': False,
                    'message': f'{field} is required'
                }), 400
        
        # Create new schedule
        schedule = Schedule(
            course=data['course'],
            subject=data['subject'],
            instructor=data['instructor'],
            room=data['room'],
            day=data['day'],
            start_time=data['start_time'],
            end_time=data['end_time'],
            students=data.get('students', 0),
            year_level=data.get('year_level'),
            section=data.get('section'),
            tenant_id=data.get('tenant_id')
        )
        
        db.session.add(schedule)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Schedule created successfully',
            'data': schedule.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@schedules_bp.route('/<int:schedule_id>', methods=['GET'])
def get_schedule(schedule_id):
    """Get a specific schedule by ID"""
    try:
        schedule = Schedule.query.get(schedule_id)
        if not schedule:
            return jsonify({
                'success': False,
                'message': 'Schedule not found'
            }), 404
        
        return jsonify({
            'success': True,
            'data': schedule.to_dict()
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@schedules_bp.route('/<int:schedule_id>', methods=['PUT'])
def update_schedule(schedule_id):
    """Update a schedule"""
    try:
        schedule = Schedule.query.get(schedule_id)
        if not schedule:
            return jsonify({
                'success': False,
                'message': 'Schedule not found'
            }), 404
        
        data = request.get_json()
        
        # Update fields
        if 'course' in data:
            schedule.course = data['course']
        if 'subject' in data:
            schedule.subject = data['subject']
        if 'instructor' in data:
            schedule.instructor = data['instructor']
        if 'room' in data:
            schedule.room = data['room']
        if 'day' in data:
            schedule.day = data['day']
        if 'start_time' in data:
            schedule.start_time = data['start_time']
        if 'end_time' in data:
            schedule.end_time = data['end_time']
        if 'students' in data:
            schedule.students = data['students']
        if 'year_level' in data:
            schedule.year_level = data['year_level']
        if 'section' in data:
            schedule.section = data['section']
        
        schedule.updated_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Schedule updated successfully',
            'data': schedule.to_dict()
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@schedules_bp.route('/<int:schedule_id>', methods=['DELETE'])
def delete_schedule(schedule_id):
    """Delete a schedule"""
    try:
        schedule = Schedule.query.get(schedule_id)
        if not schedule:
            return jsonify({
                'success': False,
                'message': 'Schedule not found'
            }), 404
        
        db.session.delete(schedule)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Schedule deleted successfully'
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500


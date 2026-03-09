from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime
from config import config
from models import db
from routes import auth, students, faculty, schedules, audit_logs, research, reports, organizations, syllabus, curriculum, lessons

app = Flask(__name__)

# Load configuration
app.config.from_object(config['default'])

# Initialize extensions
db.init_app(app)
CORS(app)  # Enable CORS for frontend communication

# Register blueprints
app.register_blueprint(auth.auth_bp)
app.register_blueprint(students.students_bp)
app.register_blueprint(faculty.faculty_bp)
app.register_blueprint(schedules.schedules_bp)
app.register_blueprint(audit_logs.audit_logs_bp)
app.register_blueprint(research.research_bp)
app.register_blueprint(reports.reports_bp)
app.register_blueprint(organizations.organizations_bp)
app.register_blueprint(syllabus.syllabus_bp)
app.register_blueprint(curriculum.curriculum_bp)
app.register_blueprint(lessons.lessons_bp)

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat()
    })



if __name__ == '__main__':
    port = app.config['PORT']
    app.run(host='0.0.0.0', port=port, debug=app.config['DEBUG'])


# Backend API

Python Flask backend for ITEW6 Project.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Initialize the database:
```bash
python init_db.py
```

4. Run the server:
```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /api/health` - Check API health

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Create a new student
- `GET /api/students/<id>` - Get a specific student
- `PUT /api/students/<id>` - Update a student
- `DELETE /api/students/<id>` - Delete a student

### Faculty
- `GET /api/faculty` - Get all faculty
- `POST /api/faculty` - Create a new faculty member
- `GET /api/faculty/<id>` - Get a specific faculty member
- `PUT /api/faculty/<id>` - Update a faculty member
- `DELETE /api/faculty/<id>` - Delete a faculty member

## Project Structure

```
backend/
├── app.py              # Main application file
├── config.py           # Configuration settings
├── models.py           # Database models
├── requirements.txt    # Python dependencies
├── .env.example       # Environment variables template
├── routes/            # API routes
│   ├── __init__.py
│   ├── auth.py        # Authentication routes
│   ├── students.py    # Student routes
│   └── faculty.py     # Faculty routes
└── README.md          # This file
```


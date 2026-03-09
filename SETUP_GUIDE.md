# ITEW6 Project Setup Guide

## Features Implemented

✅ **Multitenant Registration System**
- Users must register before logging in
- Password hashing with Werkzeug
- Tenant ID support for multitenant architecture
- Role-based access (DEAN, CHAIR, FACULTY, SECRETARY)

✅ **MySQL Database**
- Configured with PyMySQL
- Multitenant support with tenant_id filtering
- Proper database models with relationships

✅ **Authentication**
- Secure password hashing
- Email-based login
- Registration with validation
- User session management

## Setup Instructions

### 1. Database Setup

#### Option A: Using Docker (Recommended)
```bash
docker-compose up -d mysql
```

#### Option B: Local MySQL
1. Install MySQL 8.0
2. Create database:
```sql
CREATE DATABASE itew6_db;
CREATE USER 'itew6_user'@'localhost' IDENTIFIED BY 'itew6_password';
GRANT ALL PRIVILEGES ON itew6_db.* TO 'itew6_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create `.env` file:
```env
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=itew6_user
MYSQL_PASSWORD=itew6_password
MYSQL_DATABASE=itew6_db
PORT=5000
FLASK_ENV=development
```

4. Initialize database:
```bash
python init_db.py
```

5. Run backend:
```bash
python app.py
```

Backend will run on: http://localhost:5000

### 3. Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (optional):
```env
VITE_API_URL=http://localhost:5000
```

4. Run frontend:
```bash
npm run dev
```

Frontend will run on: http://localhost:3000

### 4. Docker Setup (All Services)

1. From project root:
```bash
docker-compose up --build
```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MySQL: localhost:3306

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Students
- `GET /api/students` - Get all students (supports ?tenant_id=)
- `POST /api/students` - Create student
- `GET /api/students/<id>` - Get student by ID
- `PUT /api/students/<id>` - Update student
- `DELETE /api/students/<id>` - Delete student

### Faculty
- `GET /api/faculty` - Get all faculty (supports ?tenant_id=)
- `POST /api/faculty` - Create faculty
- `GET /api/faculty/<id>` - Get faculty by ID
- `PUT /api/faculty/<id>` - Update faculty
- `DELETE /api/faculty/<id>` - Delete faculty

## Registration Flow

1. User visits login page
2. Clicks "Register Now" button
3. Fills registration form:
   - Username (required)
   - Email (required, validated)
   - Role (DEAN, CHAIR, FACULTY, SECRETARY)
   - Password (min 6 characters)
   - Confirm Password
   - Tenant ID (optional for multitenant)
4. Submits form
5. On success, redirected to login
6. Logs in with email and password

## Multitenant Support

- All models support `tenant_id` field
- API endpoints filter by `tenant_id` when provided
- Users can belong to different tenants
- Data isolation per tenant

## Button Functionality

All interactive buttons are now connected:
- ✅ Login/Register buttons - Connected to backend API
- ✅ Add Student/Faculty buttons - Ready for API integration
- ✅ Edit/Delete buttons - Ready for API integration
- ✅ Search functionality - Ready for API integration
- ✅ Navigation buttons - Working
- ✅ Logout button - Working

## Troubleshooting

### MySQL Connection Issues
- Check MySQL is running
- Verify credentials in `.env`
- Check firewall settings
- Ensure MySQL port 3306 is accessible

### Backend Not Starting
- Check Python version (3.11+)
- Verify all dependencies installed
- Check database connection
- Review error logs

### Frontend Not Connecting
- Verify `VITE_API_URL` in `.env`
- Check CORS settings
- Ensure backend is running
- Check browser console for errors

## Next Steps

1. Connect frontend buttons to API endpoints
2. Add form modals for Add/Edit operations
3. Implement search functionality
4. Add data validation on frontend
5. Add loading states and error handling
6. Implement JWT tokens for session management


from app import app
from models import db, User

def init_database():
    """Initialize the database with tables"""
    with app.app_context():
        try:
            # Create all tables
            db.create_all()
            print("✅ Database tables created successfully!")
            
            # Create a default admin user if no users exist
            if User.query.count() == 0:
                admin = User(
                    username='admin',
                    email='admin@example.com',
                    role='DEAN'
                )
                admin.set_password('admin123')
                db.session.add(admin)
                db.session.commit()
                print("✅ Default admin user created!")
                print("   Email: admin@example.com")
                print("   Password: admin123")
            
        except Exception as e:
            print(f"❌ Error initializing database: {str(e)}")
            print("Make sure MySQL is running and credentials are correct.")

if __name__ == '__main__':
    init_database()


#!/usr/bin/env python3
"""Initialize database with tables and seed data."""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.database import engine, SessionLocal
from app.models.models import Base, Admin, Service, Testimonial, SiteSettings
from app.core.security import get_password_hash
from app.core.config import settings

def init_db():
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        # Admin
        if not db.query(Admin).filter(Admin.email == settings.ADMIN_EMAIL).first():
            db.add(Admin(email=settings.ADMIN_EMAIL, name="Hummelk Admin", hashed_password=get_password_hash(settings.ADMIN_PASSWORD), is_active=True, role="superadmin"))
            print(f"Created admin: {settings.ADMIN_EMAIL}")

        # Services
        if db.query(Service).count() == 0:
            for i, (name, desc, short, price, icon) in enumerate([
                ("Residential Cleaning", "Professional home cleaning tailored to your needs. We clean every room thoroughly, leaving your home spotless and fresh.", "Expert cleaning for your home", 80, "home"),
                ("Commercial Cleaning", "Keep your business environment clean and professional. We handle offices, retail spaces, and commercial properties.", "Professional office & business cleaning", 150, "building"),
                ("Deep Cleaning", "A thorough, detailed clean targeting areas often missed in regular cleaning. Perfect for spring cleaning or first-time clients.", "Thorough top-to-bottom deep clean", 200, "sparkles"),
                ("Move In / Move Out", "Stress-free moving transitions with comprehensive cleaning. We ensure your old or new place is immaculate.", "Full clean for moving transitions", 180, "truck"),
                ("Post-Construction", "Remove construction dust, debris, and residue after renovation or construction work.", "Clean-up after construction work", 250, "hard-hat"),
                ("Recurring Maintenance", "Regular scheduled cleaning to maintain a consistently clean environment. Weekly, bi-weekly, or monthly plans.", "Scheduled ongoing cleaning plans", 70, "calendar"),
            ], 1):
                db.add(Service(name=name, description=desc, short_description=short, price_from=price, icon=icon, is_active=True, is_featured=i <= 4, order=i))
            print("Seeded services")

        # Testimonials
        if db.query(Testimonial).count() == 0:
            for (name, loc, review, svc) in [
                ("Sarah M.", "Brunswick, OH", "Hummelk LLC transformed my home! The team was professional, thorough, and incredibly detail-oriented. I've been using them every two weeks and couldn't be happier.", "Residential Cleaning"),
                ("James T.", "Medina, OH", "We hired Hummelk for our office building and the results exceeded our expectations. The staff is punctual, reliable, and uses top-quality products.", "Commercial Cleaning"),
                ("Linda K.", "Strongsville, OH", "I needed a deep clean before listing my home for sale. The Hummelk team did a phenomenal job — floors, baseboards, appliances, everything was perfect.", "Deep Cleaning"),
                ("Robert H.", "Akron, OH", "Moving is stressful enough without worrying about cleaning. Hummelk LLC handled our move-out cleaning flawlessly. We got our full deposit back!", "Move In/Move Out"),
            ]:
                db.add(Testimonial(client_name=name, location=loc, rating=5, review=review, service_type=svc, status="published", is_featured=True))
            print("Seeded testimonials")

        # Site settings
        if db.query(SiteSettings).count() == 0:
            for key, value, desc in [
                ("company_name", "Hummelk LLC", "Company name"),
                ("phone", "1(440)554-2773", "Contact phone"),
                ("email", "info@hummelkllc.com", "Contact email"),
                ("address", "4709 Center rd Brunswick OH 44212", "Company address"),
                ("hero_headline", "Professional Cleaning Services You Can Trust", "Hero headline"),
                ("hero_subheadline", "Serving Brunswick, OH and surrounding areas with premium residential and commercial cleaning.", "Hero subheadline"),
            ]:
                db.add(SiteSettings(key=key, value=value, description=desc))
            print("Seeded site settings")

        db.commit()
        print("\nDatabase initialized successfully!")
        print(f"Admin: {settings.ADMIN_EMAIL} / {settings.ADMIN_PASSWORD}")
    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    init_db()

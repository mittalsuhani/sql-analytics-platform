from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


def test_connection():
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT version();"))
            print("✅ Connected to PostgreSQL!")
            print(result.fetchone()[0])
    except Exception as e:
        print("❌ Connection Failed")
        print(e)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
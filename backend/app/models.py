from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.database import Base


class Dataset(Base):
    __tablename__ = "datasets"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    file_name = Column(String(255), nullable=False)
    description = Column(String(500), nullable=True)
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
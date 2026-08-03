from datetime import datetime
from xml.dom.minidom import Text
from sqlalchemy import Column, Integer, String, DateTime, Text, Float
from sqlalchemy.sql import func
from app.database import Base
from sqlalchemy import Float

class Dataset(Base):
    __tablename__ = "datasets"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    file_name = Column(String(255), nullable=False)
    description = Column(String(500), nullable=True)
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())

class QueryHistory(Base):
    __tablename__ = "query_history"

    id = Column(Integer, primary_key=True, index=True)

    query = Column(Text, nullable=False)

    execution_time_ms = Column(Float)

    executed_at = Column(DateTime, default=datetime.utcnow)
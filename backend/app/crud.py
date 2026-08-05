from sqlalchemy.orm import Session
from app import models, schemas
from sqlalchemy import func

def create_dataset(db: Session, dataset: schemas.DatasetCreate):
    db_dataset = models.Dataset(
        name=dataset.name,
        file_name=dataset.file_name,
        description=dataset.description
    )

    db.add(db_dataset)
    db.commit()
    db.refresh(db_dataset)

    return db_dataset

from app import models


def create_query_history(db, query, execution_time):

    history = models.QueryHistory(
        query=query,
        execution_time_ms=execution_time
    )

    db.add(history)
    db.commit()
    db.refresh(history)

    return history

def get_query_history(db, skip=0, limit=10):
    return (
        db.query(models.QueryHistory)
        .order_by(models.QueryHistory.executed_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )

from sqlalchemy import or_

def search_query_history(db, search: str):
    return (
        db.query(models.QueryHistory)
        .filter(
            models.QueryHistory.query.ilike(f"%{search}%")
        )
        .order_by(models.QueryHistory.executed_at.desc())
        .all()
    )

def get_dashboard_stats(db):

    stats = (
        db.query(
            func.count(models.QueryHistory.id).label("total_queries"),
            func.avg(models.QueryHistory.execution_time_ms).label("average_execution_time_ms"),
            func.min(models.QueryHistory.execution_time_ms).label("fastest_query_ms"),
            func.max(models.QueryHistory.execution_time_ms).label("slowest_query_ms"),
        )
        .first()
    )

    return {
        "total_queries": stats.total_queries,
        "average_execution_time_ms": round(stats.average_execution_time_ms or 0, 2),
        "fastest_query_ms": stats.fastest_query_ms,
        "slowest_query_ms": stats.slowest_query_ms,
    }

def get_top_queries(db, limit=5):
    return (
        db.query(
            models.QueryHistory.query,
            func.count(models.QueryHistory.id).label("count")
        )
        .group_by(models.QueryHistory.query)
        .order_by(func.count(models.QueryHistory.id).desc())
        .limit(limit)
        .all()
    )
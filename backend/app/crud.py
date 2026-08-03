from sqlalchemy.orm import Session
from app import models, schemas


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
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from app.database import Base, engine, get_db
from app import models, schemas, crud

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SQL Analytics Platform",
    version="1.0"
)


@app.get("/")
def root():
    return {"message": "Welcome 🚀"}


@app.post("/datasets", response_model=schemas.DatasetResponse)
def create_dataset(
    dataset: schemas.DatasetCreate,
    db: Session = Depends(get_db)
):
    return crud.create_dataset(db, dataset)
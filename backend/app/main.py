from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session


from app.database import Base, engine, get_db
from app import models, schemas, crud

from fastapi import UploadFile, File
import os
import shutil
from app.services.query_service import execute_query
from app.services.csv_service import analyze_csv

from fastapi import HTTPException
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

@app.post("/analyze")
def analyze_uploaded_csv(file: UploadFile = File(...)):
    upload_folder = "uploads"

    os.makedirs(upload_folder, exist_ok=True)

    file_path = os.path.join(upload_folder, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    analysis = analyze_csv(file_path)

    return {
        "filename": file.filename,
        "analysis": analysis
    }

@app.post("/query")
def run_query(request: schemas.SQLQuery):

    try:
        return execute_query(request.query)

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred."
        )
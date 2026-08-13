from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine, get_db
from app import models, schemas, crud

from fastapi import UploadFile, File
import os
import shutil
from app.services.query_service import execute_query
from app.services.csv_service import analyze_csv
from sqlalchemy.orm import Session
import app.crud as crud
from app.services.export_service import export_to_csv
from fastapi import HTTPException
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SQL Analytics Platform",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://sql-analytics-frontend.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
def run_query(
    request: schemas.SQLQuery,
    db: Session = Depends(get_db)
):
    try:
        result, execution_time = execute_query(request.query)

        crud.create_query_history(
            db=db,
            query=request.query,
            execution_time=execution_time
        )

        return result

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@app.post("/query/export")
def export_query(
    request: schemas.SQLQuery,
    db: Session = Depends(get_db)
):
    try:
        result, execution_time = execute_query(request.query)

        crud.create_query_history(
            db=db,
            query=request.query,
            execution_time=execution_time
        )

        filepath = export_to_csv(result)

        return FileResponse(
            path=filepath,
            filename="query_results.csv",
            media_type="text/csv"
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    
@app.get("/history")
def get_history(
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db)
):

    skip = (page - 1) * limit

    return crud.get_query_history(
        db=db,
        skip=skip,
        limit=limit
    )

@app.get("/history/search")
def search_history(
    search: str,
    db: Session = Depends(get_db)
):
    return crud.search_query_history(
        db=db,
        search=search
    )

@app.get("/dashboard/stats")
def dashboard_stats(
    db: Session = Depends(get_db)
):
    return crud.get_dashboard_stats(db)

@app.get("/dashboard/top-queries")
def top_queries(
    limit: int = 5,
    db: Session = Depends(get_db)
):
    results = crud.get_top_queries(db, limit)

    return [
        {
            "query": row.query,
            "count": row.count
        }
        for row in results
    ]
#.\venv\Scripts\Activate
#python -m uvicorn app.main:app --reload
#http://127.0.0.1:8000/docs

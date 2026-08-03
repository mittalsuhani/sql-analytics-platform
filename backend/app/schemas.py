from pydantic import BaseModel


class DatasetCreate(BaseModel):
    name: str
    file_name: str
    description: str | None = None


class DatasetResponse(DatasetCreate):
    id: int

    class Config:
        from_attributes = True

class SQLQuery(BaseModel):
    query: str
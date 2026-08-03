from sqlalchemy import text

from app.database import engine


def execute_query(query: str):

    query = query.strip()

    if not query.lower().startswith("select"):
        raise ValueError("Only SELECT queries are allowed.")

    with engine.connect() as connection:

        result = connection.execute(text(query))

        rows = result.fetchall()

        columns = result.keys()

        return {
            "columns": list(columns),
            "rows": [list(row) for row in rows]
        }
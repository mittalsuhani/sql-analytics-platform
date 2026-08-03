import time

from sqlalchemy import text

from app.database import engine


def execute_query(query: str):

    query = query.strip()

    if not query.lower().startswith("select"):
        raise ValueError("Only SELECT queries are allowed.")

    start_time = time.perf_counter()

    with engine.connect() as connection:

        result = connection.execute(text(query))

        rows = result.fetchall()

        columns = result.keys()

    execution_time = (
        time.perf_counter() - start_time
    ) * 1000

    response = {
        "columns": list(columns),
        "rows": [list(row) for row in rows]
    }

    return response, execution_time
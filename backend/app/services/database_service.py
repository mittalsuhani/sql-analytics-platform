import pandas as pd

from app.database import engine


def save_dataframe_to_db(df, table_name):

    df.to_sql(
        name=table_name,
        con=engine,
        if_exists="replace",
        index=False
    )
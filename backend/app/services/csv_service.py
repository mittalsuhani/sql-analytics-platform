import os
import pandas as pd

from app.services.database_service import save_dataframe_to_db


def analyze_csv(file_path: str):

    df = pd.read_csv(file_path)

    table_name = os.path.splitext(
        os.path.basename(file_path)
    )[0]

    save_dataframe_to_db(df, table_name)

    analysis = {
        "rows": len(df),
        "columns": len(df.columns),
        "column_names": df.columns.tolist(),
        "data_types": {
            col: str(dtype)
            for col, dtype in df.dtypes.items()
        },
        "missing_values": int(df.isnull().sum().sum()),
        "memory_usage_bytes": int(df.memory_usage(deep=True).sum()),
        "duplicate_rows": int(df.duplicated().sum())
    }

    numeric_cols = df.select_dtypes(include="number")

    if not numeric_cols.empty:
        analysis["summary_statistics"] = numeric_cols.describe().to_dict()

    if "price" in df.columns and "quantity" in df.columns:
        analysis["total_revenue"] = float((df["price"] * df["quantity"]).sum())
        analysis["average_price"] = float(df["price"].mean())
        analysis["total_quantity"] = int(df["quantity"].sum())

    return analysis
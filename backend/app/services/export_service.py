import os
import uuid
import pandas as pd


def export_to_csv(result):
    df = pd.DataFrame(
        result["rows"],
        columns=result["columns"]
    )

    exports_dir = "exports"
    os.makedirs(exports_dir, exist_ok=True)

    filename = f"query_results_{uuid.uuid4().hex}.csv"
    filepath = os.path.join(exports_dir, filename)

    df.to_csv(filepath, index=False)

    return filepath
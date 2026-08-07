import { useState } from "react";
import api from "../api/api";
import "../styles/Upload.css";

function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/analyze", formData);

      console.log("Backend Response:", response.data);

      setMessage("Upload successful!");
      setAnalysis(response.data.analysis);
    } catch (err: any) {
      console.error(err);

      if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Data:", err.response.data);
        setMessage(JSON.stringify(err.response.data));
      } else {
        setMessage(err.message);
      }
    }
  };

  return (
    <div className="upload-page">
      <h1>Upload Dataset</h1>

      <div className="upload-card">
        <input
          type="file"
          accept=".csv"
          onChange={(e) =>
            setFile(e.target.files ? e.target.files[0] : null)
          }
        />

        <button onClick={handleUpload}>
          Upload CSV
        </button>

        <p>{message}</p>
        {analysis && (
          <div style={{ marginTop: "20px", textAlign: "left" }}>
            <h3>Analysis</h3>
            <pre>{JSON.stringify(analysis, null, 2)}</pre>
          </div>
        )}

      </div>
    </div>
  );
}

export default Upload;
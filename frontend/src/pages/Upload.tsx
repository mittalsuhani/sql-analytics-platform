import { useState } from "react";
import api from "../api/api";
import "../styles/Upload.css";

interface AnalysisResult {
  [key: string]: any;
}

function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a CSV file.");
      return;
    }

    setLoading(true);
    setMessage("");
    setAnalysis(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/analyze", formData);

      console.log("Analysis response:", response.data);

      setMessage("Upload successful!");
      setAnalysis(response.data.analysis);
    } catch (err: any) {
      console.error("Upload error:", err);

      if (err.response) {
        setMessage(
          err.response.data?.detail ||
            "Upload failed."
        );
      } else {
        setMessage("Unable to connect to the server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">
      <h1>Upload Dataset</h1>

      <div className="upload-card">
        <input
          type="file"
          accept=".csv"
          onChange={(e) => {
            setFile(
              e.target.files
                ? e.target.files[0]
                : null
            );
            setMessage("");
            setAnalysis(null);
          }}
        />

        {file && (
          <p>
            Selected file: <strong>{file.name}</strong>
          </p>
        )}

        <button
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Upload CSV"}
        </button>

        {message && (
          <p>{message}</p>
        )}
      </div>

      {analysis && (
        <div className="analysis-card">
          <h2>Dataset Analysis</h2>

          <pre>
            {JSON.stringify(
              analysis,
              null,
              2
            )}
          </pre>
        </div>
      )}
    </div>
  );
}

export default Upload;
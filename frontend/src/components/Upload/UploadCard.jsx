import { useState } from "react";
import api from "../../api/api";

function UploadCard() {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState("");

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
        } catch (error: any) {
            console.error("Upload Error:", error);

            if (error.response) {
                console.log("Backend Error:", error.response.data);
                setMessage(
                    error.response.data.detail || "Upload failed."
                );
            } else {
                setMessage(error.message);
            }
        }
    };

    return (
        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                maxWidth: "500px",
                margin: "20px auto",
            }}
        >
            <h2>Upload CSV</h2>

            <input
                type="file"
                accept=".csv"
                onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                        setFile(e.target.files[0]);
                    }
                }}
            />

            <br />
            <br />

            <button onClick={handleUpload}>
                Upload CSV
            </button>

            <p>{message}</p>
        </div>
    );
}

export default UploadCard;
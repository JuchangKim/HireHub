// src/components/UploadResume.js
import React, { useState } from "react";
import axios from "axios";

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("resume", file);

    axios
      .post("/api/upload", formData)
      .then((response) => setMessage(response.data.message))
      .catch((error) => setMessage(error.response.data.message));
  };

  return (
    <div>
      <h2>Upload Resume</h2>
      <input type="file" accept=".pdf" onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload!</button>
      <p>{message}</p>
    </div>
  );
};

export default UploadResume;

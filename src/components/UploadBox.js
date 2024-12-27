import React, { useState } from 'react';
import './UploadBox.css';

function UploadBox() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [uploadedPath, setUploadedPath] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  // Handle text input
  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  // Upload file or text to the server
  const handleSubmit = async () => {
    if (!file && !text) {
      alert('Please upload a file or paste text.');
      return;
    }

    const formData = new FormData();
    if (file) formData.append('file', file);
    if (text) formData.append('text', text);

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setUploadedPath(result.path);
        alert('Upload successful!');
      } else {
        alert('Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Error during upload.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="shadow-lg p-5 rounded bg-white text-center upload-box">
        <h5 className="mb-4">Upload your file or paste text below</h5>

        {/* File Upload Button */}
        <input
          type="file"
          className="form-control mb-3"
          onChange={handleFileChange}
        />

        <p className="mt-3 mb-2 text-muted">or Paste Text</p>

        {/* Text Area for Pasting */}
        <textarea
          className="form-control"
          rows="5"
          placeholder="Paste your text here..."
          value={text}
          onChange={handleTextChange}
        ></textarea>

        {/* Upload/Submit Button */}
        <button
          className="btn btn-primary mt-4 px-5"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Submit'}
        </button>

        {/* Show uploaded path */}
        {uploadedPath && (
          <div className="mt-4">
            <h6>File Uploaded at:</h6>
            <a href={uploadedPath} target="_blank" rel="noopener noreferrer">
              {uploadedPath}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadBox;

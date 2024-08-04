import React, { useState } from 'react';


function Upload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }
    
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // Handle success (e.g., display a message, update the UI)
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error (e.g., display an error message)
      });
  };

  return (
    <div className="upload-container">
      <h1>Upload your data</h1>
      <p>Upload Excel or CSV files to start your data journey.</p>
      <div className="upload-box">
        <input 
          type="file" 
          accept=".csv, .xlsx" 
          onChange={handleFileChange} 
          style={{ display: 'none' }} 
          id="file-input" 
        />
        <label htmlFor="file-input" className="btn-upload">
          Upload File
        </label>
        <span>or drop a file,</span>
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
}

export default Upload;

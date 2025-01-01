import React, { useState } from 'react';
import axios from 'axios';
import './UploadBox.css';
import SummaryDisplay from './SummaryDisplay'; // Import the Summary Display Component
import TextareaAutosize from 'react-textarea-autosize';

function UploadBox() {
  const [file, setFile] = useState(null);
  const [pastedContent, setPastedContent] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setPastedContent(''); // Clear pasted content when a file is selected
  };

  // Handle pasted content change
  const handlePastedContentChange = (event) => {
    setPastedContent(event.target.value);
    setFile(null); // Clear file when content is pasted
  };

  // Handle file upload and summarization request
  const handleSubmit = async () => {
    if (!file && !pastedContent) {
      alert('Please upload a PDF file or paste content.');
      return;
    }

    try {
      setLoading(true);

      let summaryText = '';

      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        // Send PDF file to Node.js backend (Node will forward it to Flask)
        const response = await axios.post('http://localhost:5001/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Extract summary from the response
        summaryText = response.data.summary;
      } else if (pastedContent) {
        // Send pasted content to Node.js backend (Node will forward it to Flask)
        const response = await axios.post('http://localhost:5001/upload', { text: pastedContent });

        // Extract summary from the response
        summaryText = response.data.summary;
      }

      setSummary(summaryText);
      alert('Content summarized successfully!');

    } catch (error) {
      console.error('Error during upload:', error);
      alert('Failed to upload or summarize content.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="shadow-lg p-5 rounded bg-white text-center upload-box">
        <h5 className="mb-4">Upload your PDF file or paste content for Summarization</h5>

        {/* File Upload Input */}
        <input
          type="file"
          className="form-control mb-3"
          onChange={handleFileChange}
          accept="application/pdf"
          disabled={!!pastedContent}
        />

        <div className="mb-3">OR</div>

        {/* Textarea for Pasting Content */}
        <TextareaAutosize
          className="form-control mb-3"
          minRows={3}
          placeholder="Paste your content here..."
          value={pastedContent}
          onChange={handlePastedContentChange}
          disabled={!!file}
        />

        {/* Upload Button */}
        <button
          className="btn btn-primary mt-4 px-5"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Submit'}
        </button>

        {/* Display Summary */}
        {summary && <SummaryDisplay summary={summary} />}
      </div>
    </div>
  );
}

export default UploadBox;

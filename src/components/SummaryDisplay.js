import React from 'react';
import './UploadBox.css'; // Reuse styles if needed

function SummaryDisplay({ summary }) {
  return (
    <div className="summary-container">
      <h4>Summarized Text</h4>
      <p>{summary || 'No summary available yet.'}</p>
    </div>
  );
}

export default SummaryDisplay;

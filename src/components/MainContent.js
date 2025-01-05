import React from 'react';
import UploadBox from './UploadBox';

function MainContent() {
  return (
    <div className="flex-grow-1 p-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 className="fw-bold">Generate Abstracts and Interact with Your Research.</h1>
          <p>Upload your article or paste text, and let AI summarize and chat with your data in seconds.</p>
        </div>
      </div>
      <UploadBox />
    </div>
  );
}

export default MainContent;

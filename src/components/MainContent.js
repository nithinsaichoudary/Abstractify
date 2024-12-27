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
        <div className="d-flex align-items-center">
          <img src="profile.jpg" alt="profile" className="rounded-circle me-2" width="40" />
          <span>Nithin Sai</span>
        </div>
      </div>
      <UploadBox />
    </div>
  );
}

export default MainContent;

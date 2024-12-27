import React from 'react';
import './Sidebar.css';  // Custom Sidebar CSS

function Sidebar() {
  return (
    <div className="bg-light border-end sidebar p-3">
      <div className="d-flex align-items-center mb-4">
        <h4 className="fw-bold m-0">Abstractify</h4>
      </div>
      <ul className="nav flex-column">
        <li className="nav-item py-2">
          <i className="bi bi-house-door me-2"></i> Home
        </li>
        <li className="nav-item py-2">
          <i className="bi bi-info-circle me-2"></i> About
        </li>
        <li className="nav-item py-2">
          <i className="bi bi-clock-history me-2"></i> History
        </li>
        <li className="nav-item py-2">
          <i className="bi bi-gear me-2"></i> Settings
        </li>
        <li className="nav-item py-2">
          <i className="bi bi-box-arrow-left me-2"></i> Sign Out
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

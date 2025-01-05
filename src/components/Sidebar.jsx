import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="bg-light border-end sidebar p-3">
      <div className="d-flex align-items-center mb-4">
        <h4 className="fw-bold m-0">Abstractify</h4>
      </div>
      <ul className="nav flex-column">
        <li className="nav-item py-2">
          <Link to="/" className="text-decoration-none text-dark">
            <i className="bi bi-house-door me-2"></i> Home
          </Link>
        </li>
        <li className="nav-item py-2">
          <Link to="/chat" className="text-decoration-none text-dark">
            <i className="bi bi-chat-left me-2"></i> Chat with data
          </Link>
        </li>
        <li className="nav-item py-2">
          <Link to="/settings" className="text-decoration-none text-dark">
            <i className="bi bi-gear me-2"></i> Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

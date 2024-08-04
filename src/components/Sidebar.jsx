import React from 'react';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src="/logo.png" alt="DataGriffin Logo" />
      </div>
      <ul className="menu">
        <li className="active"><a href="#">Home</a></li>
        <li><a href="#">Upload</a></li>
        <li><a href="#">Chat With Data</a></li>
        <li><a href="#">Data Cleaning</a></li>
        <li><a href="#">Visualization</a></li>
        <li><a href="#">Scraper</a></li>
        <li><a href="#">Settings</a></li>
        <li><a href="#">Sign Out</a></li>
      </ul>
    </div>
  );
}

export default Sidebar;

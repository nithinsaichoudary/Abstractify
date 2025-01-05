import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MainChat from './components/MainChat';


function App() {
  return (
    <Router>
      <div className="d-flex vh-100">
        <Sidebar />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/chat" element={<MainChat />} />
            <Route path="/settings" element={<h1 className="p-5">Settings</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

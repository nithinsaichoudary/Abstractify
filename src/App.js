import React from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="d-flex vh-100">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default App;

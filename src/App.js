import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/auth/AuthPage';
import BasicInformation from './pages/profile/BasicInformation';
import HomePage from './pages/home/HomePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
          <Route path="/profile/basic-info" element={<BasicInformation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

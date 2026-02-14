import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/auth/AuthPage';
import ProfilePage from './pages/profile/ProfilePage';
import ProfileReview from './pages/profile/ProfileReview';
import UserDashboard from './pages/profile/UserDashboard';
import MatchesPage from './pages/matches/MatchesPage';
import ProfileDetailView from './pages/matches/ProfileDetailView';
import ShortlistedPage from './pages/matches/ShortlistedPage';
import LikesPage from './pages/matches/LikesPage';
import InterestsPage from './pages/matches/InterestsPage';
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
          <Route path="/profile/basic-info" element={<ProfilePage />} />
          <Route path="/profile/religious-info" element={<ProfilePage />} />
          <Route path="/profile/educational-info" element={<ProfilePage />} />
          <Route path="/profile/family-info" element={<ProfilePage />} />
          <Route path="/profile/lifestyle-habits" element={<ProfilePage />} />
          <Route path="/profile/review" element={<ProfileReview />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route path="/matches/:id" element={<ProfileDetailView />} />
          <Route path="/matches/shortlisted" element={<ShortlistedPage />} />
          <Route path="/matches/likes" element={<LikesPage />} />
          <Route path="/matches/interests" element={<InterestsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

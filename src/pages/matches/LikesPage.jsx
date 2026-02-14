import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './matches.css';
import '../profile/profile.css';
import backgroundImage from '../../assets/auth/vivah2.jpg';
import MatchCard from '../../components/MatchCard';
import { DUMMY_MATCHES } from './MatchesPage';

const LikesPage = () => {
    const navigate = useNavigate();
    const [likedMatches, setLikedMatches] = useState([]);

    useEffect(() => {
        const likedIds = JSON.parse(localStorage.getItem('liked_ids') || '[]');
        const filtered = DUMMY_MATCHES.filter(profile => likedIds.includes(profile.id));
        setLikedMatches(filtered);
    }, []);

    return (
        <div className="profile-page-wrapper">
            <div className="profile-background" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <div className="profile-background-overlay"></div>

            <div className="matches-page-container">
                <button className="edit-link-btn back-btn" onClick={() => navigate('/dashboard')}>
                    ← Back to Dashboard
                </button>

                <div className="dashboard-header">
                    <h1>Profiles You Liked</h1>
                    <p>Matches that caught your eye</p>
                </div>

                <div className="matches-grid full-width">
                    {likedMatches.length > 0 ? (
                        likedMatches.map(profile => (
                            <MatchCard key={profile.id} profile={profile} />
                        ))
                    ) : (
                        <div className="empty-matches">
                            <h3>No likes yet.</h3>
                            <p>Browse profiles and show some love!</p>
                            <button className="save-pill-button" onClick={() => navigate('/matches')} style={{ marginTop: '15px' }}>
                                Find Matches
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LikesPage;

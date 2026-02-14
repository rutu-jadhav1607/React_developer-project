import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './matches.css';
import '../profile/profile.css';
import backgroundImage from '../../assets/auth/vivah2.jpg';
import MatchCard from '../../components/MatchCard';
import { DUMMY_MATCHES } from './MatchesPage';

const ShortlistedPage = () => {
    const navigate = useNavigate();
    const [shortlistedMatches, setShortlistedMatches] = useState([]);

    useEffect(() => {
        const shortlistedIds = JSON.parse(localStorage.getItem('shortlisted_ids') || '[]');
        const filtered = DUMMY_MATCHES.filter(profile => shortlistedIds.includes(profile.id));
        setShortlistedMatches(filtered);
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
                    <h1>Shortlisted Profiles</h1>
                    <p>Profiles you've bookmarked for later</p>
                </div>

                <div className="matches-grid full-width">
                    {shortlistedMatches.length > 0 ? (
                        shortlistedMatches.map(profile => (
                            <MatchCard key={profile.id} profile={profile} />
                        ))
                    ) : (
                        <div className="empty-matches">
                            <h3>No shortlisted profiles yet.</h3>
                            <p>Explore matches and star the ones you like!</p>
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

export default ShortlistedPage;

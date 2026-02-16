import React from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import backgroundImage from '../../assets/auth/vivah2.jpg';

const UserDashboard = () => {
    const navigate = useNavigate();
    const [counts, setCounts] = React.useState({
        shortlisted: 0,
        interestsSent: 0,
        interestsReceived: 0,
        likes: 0
    });

    const updateCounts = React.useCallback(() => {
        const sentIds = JSON.parse(localStorage.getItem('interests_sent_ids') || '[]');
        const receivedData = JSON.parse(localStorage.getItem('interests_received_data') || '[]');

        // Use the mock data if receivedData is empty (first time)
        const receivedCount = receivedData.length > 0 ? receivedData.length : 2;

        setCounts({
            shortlisted: JSON.parse(localStorage.getItem('shortlisted_ids') || '[]').length,
            interestsSent: sentIds.length,
            interestsReceived: receivedCount,
            likes: JSON.parse(localStorage.getItem('liked_ids') || '[]').length,
            totalInterests: sentIds.length + receivedCount
        });
    }, []);

    React.useEffect(() => {
        updateCounts();
        window.addEventListener('storage', updateCounts);
        return () => window.removeEventListener('storage', updateCounts);
    }, [updateCounts]);

    // Simple progress calculation based on filled items in localStorage
    const calculateProgress = () => {
        const steps = ['profile_step_1', 'profile_step_2', 'profile_step_3', 'profile_step_4', 'profile_step_5'];
        let filledFields = 0;
        let totalFields = 0;

        steps.forEach(step => {
            const data = JSON.parse(localStorage.getItem(step) || '{}');
            const fields = Object.values(data);
            totalFields += fields.length || 5; // Default to 5 if empty to avoid 0
            filledFields += fields.filter(val => val && val.toString().trim() !== '').length;
        });

        return Math.floor((filledFields / totalFields) * 100) || 75; // Fallback to 75% for demo
    };

    const progress = calculateProgress();
    const userName = JSON.parse(localStorage.getItem('profile_step_1') || '{}').fullName || 'Rutuja Jadhav';

    return (
        <div className="profile-page-wrapper dashboard-mode">
            <div className="profile-background" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <div className="profile-background-overlay"></div>

            <div className="dashboard-container">
                {/* Visual Profile Header */}
                <div className="dashboard-header-compact">
                    <div className="profile-header-main">
                        <div className="profile-photo-circle">
                            <img src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=200&auto=format&fit=crop" alt="Profile" />
                        </div>
                        <div className="profile-info-minimal">
                            <h2>{userName}</h2>
                            <span className="profile-tag">Premium Member</span>
                        </div>
                    </div>

                    <div className="profile-progress-widget">
                        <div className="circular-progress" style={{ '--progress': `${progress}%` }}>
                            <div className="progress-inner">
                                <span className="progress-value">{progress}%</span>
                                <span className="progress-label">Complete</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="dashboard-control-panel">
                    <div className="matchmaking-title">Matchmaking Hub</div>

                    {/* Matchmaking Action Grid */}
                    <div className="quick-actions-grid matchmaking-center">
                        <div className="action-card highlight" onClick={() => navigate('/matches')}>
                            <div className="action-icon">👩‍❤️‍👨</div>
                            <h4>Find Matches</h4>
                        </div>

                        <div className="action-card" onClick={() => navigate('/matches/shortlisted')}>
                            <div className="action-icon">⭐</div>
                            <h4>Shortlisted</h4>
                            {counts.shortlisted > 0 && <span className="count-badge">{counts.shortlisted}</span>}
                        </div>

                        <div className="action-card" onClick={() => navigate('/matches/interests')}>
                            <div className="action-icon">💌</div>
                            <h4>Interests</h4>
                            {counts.totalInterests > 0 && <span className="count-badge">{counts.totalInterests}</span>}
                        </div>

                        <div className="action-card" onClick={() => navigate('/matches/likes')}>
                            <div className="action-icon">❤️</div>
                            <h4>My Likes</h4>
                            {counts.likes > 0 && <span className="count-badge">{counts.likes}</span>}
                        </div>
                    </div>

                    {/* Subtle Information Note */}
                    <div className="locked-feature-note minimal">
                        <span className="lock-icon">🔒</span>
                        Advanced search options will be available after final verification.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;

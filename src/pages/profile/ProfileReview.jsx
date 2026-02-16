import React from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import backgroundImage from '../../assets/auth/vivah2.jpg';

const ProfileReview = () => {
    const navigate = useNavigate();

    const step1Data = JSON.parse(localStorage.getItem('profile_step_1') || '{}');
    const step2Data = JSON.parse(localStorage.getItem('profile_step_2') || '{}');
    const step3Data = JSON.parse(localStorage.getItem('profile_step_3') || '{}');
    const step4Data = JSON.parse(localStorage.getItem('profile_step_4') || '{}');
    const step5Data = JSON.parse(localStorage.getItem('profile_step_5') || '{}');

    const handleGoLive = () => {
        // In a real app, this would be an API call
        localStorage.setItem('profile_status', 'Under Review');
        navigate('/dashboard');
    };

    const renderSection = (title, data, editPath) => (
        <div className="review-section">
            <div className="review-section-header">
                <h4>{title}</h4>
                <button className="edit-link-btn" onClick={() => navigate(editPath)}>Edit</button>
            </div>
            <div className="review-grid">
                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="review-item">
                        <span className="review-label">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                        <span className="review-value">{value || 'Not Provided'}</span>
                    </div>
                ))}
            </div>
        </div>
    );



    return (
        <div className="profile-page-wrapper">
            <div className="profile-background" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <div className="profile-background-overlay"></div>

            <div className="profile-card">
                <div className="profile-header-section review-header">
                    <div className="status-badge-container">
                        <div className="completion-badge">100% Completed</div>
                        <div className="live-status-badge pending">Pending Verification</div>
                    </div>
                    <div className="header-text-info">
                        <h2>Review Your Profile</h2>
                        <p>Please double-check your information before going live.</p>
                    </div>
                </div>

                <div className="profile-form-container review-container">
                    {renderSection('Basic Information', step1Data, '/profile/basic-info')}
                    {renderSection('Religious Information', step2Data, '/profile/religious-info')}
                    {renderSection('Educational & Career', step3Data, '/profile/educational-info')}
                    {renderSection('Family Information', step4Data, '/profile/family-info')}
                    {renderSection('Lifestyle Habits', step5Data, '/profile/lifestyle-habits')}
                </div>

                <div className="form-sticky-footer review-footer">
                    <button className="save-pill-button" onClick={handleGoLive}>Submit Profile</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileReview;

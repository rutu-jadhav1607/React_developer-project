import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const INDIAN_MALE_PORTRAITS = [
    'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=400&auto=format&fit=crop', // Indian man close-up
    'https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=400&auto=format&fit=crop', // Professional Indian man
    'https://images.unsplash.com/photo-1615813967515-e1838c1c5116?q=80&w=400&auto=format&fit=crop', // Young Indian man
    'https://images.unsplash.com/photo-1596075780750-81249df16d19?q=80&w=400&auto=format&fit=crop', // Smiling Indian
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop', // Neutral portrait
    'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop', // Corporate
    'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=400&auto=format&fit=crop', // Intense look
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop'  // Professional suit
];

const MatchCard = ({ profile }) => {
    const navigate = useNavigate();
    const portraitUrl = INDIAN_MALE_PORTRAITS[(profile.id - 1) % INDIAN_MALE_PORTRAITS.length];

    // Initialize state from localStorage
    const [shortlisted, setShortlisted] = useState(() => {
        const ids = JSON.parse(localStorage.getItem('shortlisted_ids') || '[]');
        return ids.includes(profile.id);
    });

    const [liked, setLiked] = useState(() => {
        const ids = JSON.parse(localStorage.getItem('liked_ids') || '[]');
        return ids.includes(profile.id);
    });

    const [interestSent, setInterestSent] = useState(() => {
        const ids = JSON.parse(localStorage.getItem('interests_sent_ids') || '[]');
        return ids.includes(profile.id);
    });

    const toggleAction = (key, state, setState) => {
        const currentIds = JSON.parse(localStorage.getItem(key) || '[]');
        let newIds;
        if (state) {
            newIds = currentIds.filter(id => id !== profile.id);
        } else {
            newIds = [...currentIds, profile.id];
        }
        localStorage.setItem(key, JSON.stringify(newIds));
        setState(!state);

        // Trigger a storage event to update other components (like Dashboard)
        window.dispatchEvent(new Event('storage'));
    };

    const handleSendInterest = () => {
        if (!interestSent) {
            const currentIds = JSON.parse(localStorage.getItem('interests_sent_ids') || '[]');
            if (!currentIds.includes(profile.id)) {
                localStorage.setItem('interests_sent_ids', JSON.stringify([...currentIds, profile.id]));
                setInterestSent(true);
                window.dispatchEvent(new Event('storage'));
            }
        }
    };

    return (
        <div className="match-card">
            <div className="match-card-image">
                <img src={portraitUrl} alt={profile.name} />
                <div className="match-percentage-badge">{profile.matchPct}% Match</div>
            </div>

            <div className="match-card-info">
                <h3>{profile.name}</h3>

                <div className="match-stats">
                    <div className="stat-item">
                        <span className="stat-label">Age / Height</span>
                        <span className="stat-value">{profile.age} yrs • {profile.height}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Religion</span>
                        <span className="stat-value">{profile.religion}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Location</span>
                        <span className="stat-value">{profile.location}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Education</span>
                        <span className="stat-value">{profile.education}</span>
                    </div>
                </div>

                <div className="match-card-actions-wrapper">
                    <div className="main-actions-row">
                        <div className="quick-actions">
                            <button
                                className={`icon-btn shortlist ${shortlisted ? 'active' : ''}`}
                                onClick={(e) => { e.stopPropagation(); toggleAction('shortlisted_ids', shortlisted, setShortlisted); }}
                                title={shortlisted ? "Remove from Shortlist" : "Add to Shortlist"}
                            >
                                {shortlisted ? '★' : '☆'}
                            </button>
                            <button
                                className={`icon-btn like ${liked ? 'active' : ''}`}
                                onClick={(e) => { e.stopPropagation(); toggleAction('liked_ids', liked, setLiked); }}
                                title={liked ? "Unlike" : "Like"}
                            >
                                {liked ? '❤️' : '♡'}
                            </button>
                        </div>

                        <button
                            className={`btn-send-interest ${interestSent ? 'sent' : ''}`}
                            onClick={(e) => { e.stopPropagation(); handleSendInterest(); }}
                            disabled={interestSent}
                        >
                            {interestSent ? 'Interest Sent' : 'Send Interest'}
                        </button>
                    </div>

                    <button
                        className="action-btn view"
                        onClick={() => navigate(`/matches/${profile.id}`)}
                    >
                        View Full Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MatchCard;

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './matches.css';
import '../profile/profile.css';
import backgroundImage from '../../assets/auth/vivah2.jpg';

const DUMMY_DATA = [
    {
        id: 1,
        name: 'Riya Sharma',
        age: 24,
        height: "5'4\"",
        religion: 'Hindu',
        caste: 'Brahmin',
        community: 'Marathi',
        education: 'B.Tech Computer Science',
        occupation: 'Software Developer',
        income: '₹12 - 15 Lakh',
        location: 'Mumbai, MH',
        eating: 'Vegetarian',
        smoking: 'No',
        drinking: 'No',
        about: 'I am a career-oriented individual with a blend of traditional and modern values. I love traveling and exploring new cuisines.'
    },

    {
        id: 2,
        name: 'Sneha Patil',
        age: 26,
        height: "5'2\"",
        religion: 'Hindu',
        caste: 'Maratha',
        community: 'Marathi',
        education: 'MBA Marketing',
        occupation: 'Business Analyst',
        income: '₹8 - 10 Lakh',
        location: 'Pune, MH',
        eating: 'Non-Vegetarian',
        smoking: 'No',
        drinking: 'Occasionally',
        about: 'Independent and family-loving person. Looking for someone who understands my career goals and shares similar interests.'
    }
];

const ProfileDetailView = () => {
    const { id } = useParams();
    const navigate = useNavigate();


    const profile = DUMMY_DATA.find(p => p.id === parseInt(id)) || DUMMY_DATA[0];

    const renderDetailSection = (title, items) => (
        <div className="vertical-detail-section">
            <h3 className="section-title">{title}</h3>
            <div className="detail-list">
                {items.map(item => (
                    <div key={item.label} className="detail-list-item">
                        <span className="item-label">{item.label}</span>
                        <span className="item-value">{item.value || 'Not Disclosed'}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="profile-page-wrapper">
            <div className="profile-background" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <div className="profile-background-overlay"></div>

            <div className="profile-detail-container">
                <button className="edit-link-btn back-btn" onClick={() => navigate(-1)}>
                    ← Back to Matches
                </button>

                <div className="profile-detail-card centered-layout">
                    {/* Centered Circular Photo */}
                    <div className="circular-photo-container">
                        <img src={`https://i.pravatar.cc/500?u=${profile.id}`} alt={profile.name} className="round-profile-img" />
                    </div>

                    {/* Primary Info */}
                    <div className="profile-intro-header">
                        <h1>{profile.name}</h1>
                        <div className="intro-badges">
                            <span className="badge">{profile.age} Years, {profile.height}</span>
                            <span className="badge">{profile.location}</span>
                            <span className="match-pct-badge-big">92% Match</span>
                        </div>
                    </div>

                    {/* Action Buttons below main info */}
                    <div className="detail-actions-row">
                        <button className="save-pill-button interest-btn">Send Interest</button>
                        <button className="action-btn view shortlist-btn">Shortlist Profile</button>
                    </div>

                    <div className="profile-divider"></div>

                    <div className="vertical-sections-container">
                        <div className="about-me-section">
                            <h3 className="section-title">About Me</h3>
                            <p className="about-text">{profile.about}</p>
                        </div>

                        {renderDetailSection('Basic Information', [
                            { label: 'Full Name', value: profile.name },
                            { label: 'Date of Birth', value: '15 Aug 1998' },
                            { label: 'Height', value: profile.height },
                            { label: 'Weight', value: '55 kg' },
                            { label: 'Marital Status', value: 'Never Married' },
                            { label: 'Mother Tongue', value: 'Marathi' }
                        ])}

                        {renderDetailSection('Religious Information', [
                            { label: 'Religion', value: profile.religion },
                            { label: 'Caste', value: profile.caste },
                            { label: 'Community', value: profile.community },
                            { label: 'Gothra', value: 'Kashyap' },
                            { label: 'Manglik', value: 'No' }
                        ])}

                        {renderDetailSection('Educational & Career', [
                            { label: 'Education', value: profile.education },
                            { label: 'College', value: 'IIT Bombay' },
                            { label: 'Occupation', value: profile.occupation },
                            { label: 'Annual Income', value: profile.income }
                        ])}

                        {renderDetailSection('Family Information', [
                            { label: 'Father Status', value: 'Retired' },
                            { label: 'Mother Status', value: 'Homemaker' },
                            { label: 'Brothers', value: '1' },
                            { label: 'Sisters', value: 'None' },
                            { label: 'Family Value', value: 'Traditional' },
                            { label: 'Family Type', value: 'Joint' }
                        ])}

                        {renderDetailSection('Lifestyle Habits', [
                            { label: 'Eating Habits', value: profile.eating },
                            { label: 'Drinking', value: profile.drinking },
                            { label: 'Smoking', value: profile.smoking }
                        ])}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetailView;

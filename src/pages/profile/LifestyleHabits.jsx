import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import backgroundImage from '../../assets/auth/vivah2.jpg';

const LifestyleHabits = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem('profile_step_5');
        return saved ? JSON.parse(saved) : {
            eatingHabits: '',
            dietPreference: '',
            drinking: '',
            smoking: ''
        };
    });

    const [progress, setProgress] = useState(80);

    useEffect(() => {
        localStorage.setItem('profile_step_5', JSON.stringify(formData));

        const fields = Object.keys(formData);
        const filled = fields.filter(key => formData[key] && formData[key].trim() !== '');

        // Calculate progress within this step (final 20% to reach 100%)
        const stepProgress = Math.round((filled.length / fields.length) * 20);
        setProgress(80 + stepProgress);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Lifestyle Habits Saved:', formData);
        navigate('/profile/review');
    };

    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    const renderRadioGroup = (label, name, options) => (
        <div className="form-field-group">
            <label>{label}</label>
            <div style={{ display: 'flex', gap: '20px', marginTop: '10px', flexWrap: 'wrap' }}>
                {options.map(opt => (
                    <label key={opt} className="radio-label">
                        <input
                            type="radio"
                            name={name}
                            value={opt}
                            checked={formData[name] === opt}
                            onChange={handleChange}
                            required
                        /> {opt}
                    </label>
                ))}
            </div>
        </div>
    );

    return (
        <div className="profile-page-wrapper">
            <div
                className="profile-background"
                style={{
                    backgroundImage: `url(${backgroundImage})`
                }}
            ></div>
            <div className="profile-background-overlay"></div>
            <div className="profile-card">
                {/* Header Progress Section */}
                <div className="profile-header-section">
                    <div className="circular-progress-wrapper">
                        <svg>
                            <circle className="bg-circle" cx="40" cy="40" r={radius} />
                            <circle
                                className="progress-circle"
                                cx="40" cy="40" r={radius}
                                style={{ strokeDasharray: circumference, strokeDashoffset }}
                            />
                        </svg>
                        <div className="progress-pct-text">{progress}%</div>
                    </div>
                    <div className="header-text-info">
                        <h2>Complete Your Profile</h2>
                        <p>Step 5: Lifestyle Habits</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="profile-form-container">
                        <div className="section-title-header">
                            <h3>Lifestyle Habits</h3>
                        </div>

                        <div className="form-grid" style={{ gridTemplateColumns: '1fr' }}>
                            {renderRadioGroup('Eating Habits', 'eatingHabits', ['Vegetarian', 'Eggetarian', 'Non-Vegetarian'])}
                            {renderRadioGroup('Diet Preference', 'dietPreference', ['Vegan', 'Jain', 'No Specific Preference'])}
                            {renderRadioGroup('Drinking', 'drinking', ['No', 'Occasionally', 'Yes'])}
                            {renderRadioGroup('Smoking', 'smoking', ['No', 'Yes'])}
                        </div>
                    </div>

                    {/* Sticky Footer */}
                    <div className="form-sticky-footer">
                        <button type="submit" className="save-pill-button">Complete Profile</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LifestyleHabits;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import backgroundImage from '../../assets/auth/vivah2.jpg';

const OCCUPATION_OPTIONS = [
    'Farmer',
    'Business Owner',
    'Private Job',
    'Government Job',
    'Retired',
    'Not Employed',

];

const MOTHER_OCCUPATION_OPTIONS = [
    'Housewife',
    'Private Job',
    'Government Job',
    'Business Owner',
    'Retired',


];

const FAMILY_TYPE_OPTIONS = [
    'Nuclear Family',
    'Joint Family',
    'Extended Family'
];

const FAMILY_STATUS_OPTIONS = [
    'Upper Class',
    'Middle Class',
    'Lower Class'
];

const FamilyInformation = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem('profile_step_4');
        return saved ? JSON.parse(saved) : {
            fatherOccupation: '',
            motherOccupation: '',
            brothers: 0,
            sisters: 0,
            familyType: '',
            familyStatus: ''
        };
    });

    const [progress, setProgress] = useState(60);

    useEffect(() => {
        localStorage.setItem('profile_step_4', JSON.stringify(formData));

        const fields = Object.keys(formData);
        const filled = fields.filter(key => {
            if (key === 'brothers' || key === 'sisters') return true; // Numeric defaults
            return formData[key] && formData[key].toString().trim() !== '';
        });

        // Calculate progress within this step (another 20% to reach 80%)
        const stepProgress = Math.round((filled.length / fields.length) * 20);
        setProgress(60 + stepProgress);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        let finalValue = value;

        if (type === 'number') {
            finalValue = Math.max(0, Math.min(5, parseInt(value) || 0));
        }

        setFormData(prev => ({ ...prev, [name]: finalValue }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Family Information Saved:', formData);
        navigate('/profile/lifestyle-habits');
    };

    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

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
                        <p>Step 4: Family Information</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="profile-form-container">
                        <div className="section-title-header">
                            <h3>Family Information</h3>
                        </div>

                        <div className="form-grid">
                            {/* Father's Occupation */}
                            <div className="form-field-group">
                                <label>Father's Occupation</label>
                                <select name="fatherOccupation" className={`profile-select-field ${formData.fatherOccupation ? 'has-selection' : ''}`} value={formData.fatherOccupation} onChange={handleChange} required>
                                    <option value="">Select Occupation</option>
                                    {OCCUPATION_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>

                            {/* Mother's Occupation */}
                            <div className="form-field-group">
                                <label>Mother's Occupation</label>
                                <select name="motherOccupation" className={`profile-select-field ${formData.motherOccupation ? 'has-selection' : ''}`} value={formData.motherOccupation} onChange={handleChange} required>
                                    <option value="">Select Occupation</option>
                                    {MOTHER_OCCUPATION_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>

                            {/* Brothers */}
                            <div className="form-field-group">
                                <label>Brothers (0-5)</label>
                                <input
                                    type="number"
                                    name="brothers"
                                    className={`profile-input-field ${formData.brothers !== '' && formData.brothers !== undefined ? 'has-selection' : ''}`}
                                    min="0"
                                    max="5"
                                    value={formData.brothers}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Sisters */}
                            <div className="form-field-group">
                                <label>Sisters (0-5)</label>
                                <input
                                    type="number"
                                    name="sisters"
                                    className={`profile-input-field ${formData.sisters !== '' && formData.sisters !== undefined ? 'has-selection' : ''}`}
                                    min="0"
                                    max="5"
                                    value={formData.sisters}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Family Type */}
                            <div className="form-field-group">
                                <label>Family Type</label>
                                <select name="familyType" className={`profile-select-field ${formData.familyType ? 'has-selection' : ''}`} value={formData.familyType} onChange={handleChange} required>
                                    <option value="">Select Family Type</option>
                                    {FAMILY_TYPE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>

                            {/* Family Status */}
                            <div className="form-field-group">
                                <label>Family Status</label>
                                <select name="familyStatus" className={`profile-select-field ${formData.familyStatus ? 'has-selection' : ''}`} value={formData.familyStatus} onChange={handleChange} required>
                                    <option value="">Select Family Status</option>
                                    {FAMILY_STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Sticky Footer */}
                    <div className="form-sticky-footer">
                        <button type="submit" className="save-pill-button">Save & Continue</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FamilyInformation;

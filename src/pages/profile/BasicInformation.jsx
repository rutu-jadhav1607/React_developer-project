import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import backgroundImage from '../../assets/auth/vivah2.jpg';

const GENDERS = ['Male', 'Female'];

const BasicInformation = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem('profile_step_1');
        const data = saved ? JSON.parse(saved) : {
            fullName: '',
            email: '',
            phone: '+91',
            gender: '',
            dob: '',
            height: '',
            weight: '',
            residence: ''
        };
        // Ensure Date of Birth is always blank on initial load as requested
        return { ...data, dob: '' };
    });

    const [progress, setProgress] = useState(0);
    const [errors, setErrors] = useState({});

    // Dynamic Progress Tracking and localStorage saving
    useEffect(() => {
        localStorage.setItem('profile_step_1', JSON.stringify(formData));

        const fields = Object.keys(formData);
        const filled = fields.filter(key => {
            if (key === 'phone') return formData[key] !== '+91' && formData[key] && formData[key].length > 3;
            return formData[key] && formData[key].toString().trim() !== '';
        });

        const pct = Math.round((filled.length / fields.length) * 20);
        setProgress(pct);
    }, [formData]);

    const validate = (name, value) => {
        let error = '';
        if (!value) value = ''; // Safety check

        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                error = 'Please enter a valid email address.';
            }
        }
        if (name === 'phone') {
            const phoneDigits = value.toString().replace('+91', '');
            if (value && (phoneDigits.length !== 10 || !/^\d+$/.test(phoneDigits))) {
                error = 'Please enter a valid 10-digit mobile number.';
            }
        }
        setErrors(prev => ({ ...prev, [name]: error }));
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            if (!value.startsWith('+91')) return;
            if (value.length > 13) return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
        validate(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const emailError = validate('email', formData.email || '');
        const phoneError = validate('phone', formData.phone || '');

        if (emailError || phoneError) {
            alert('Please fix the errors before continuing.');
            return;
        }

        console.log('Profile Data Saved (Step 1):', formData);
        navigate('/profile/religious-info');
    };

    // Range helpers
    const range = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => start + i);
    const heightOptions = range(140, 220);
    const weightOptions = range(40, 150);

    // Circular Progress Params
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
                        <p>Profiles with more details get better matches</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="profile-form-container">
                        {/* Section 1: Basic Info */}
                        <div className="section-title-header">
                            <h3>Basic Information</h3>
                        </div>

                        <div className="form-grid">
                            <div className="form-field-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    className={`profile-input-field ${formData.fullName ? 'has-selection' : ''}`}
                                    placeholder="Enter your full name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-field-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    className={`profile-input-field ${errors.email ? 'field-error' : ''} ${formData.email ? 'has-selection' : ''}`}
                                    placeholder="email@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.email && <span className="error-text">{errors.email}</span>}
                            </div>
                            <div className="form-field-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className={`profile-input-field ${errors.phone ? 'field-error' : ''} ${formData.phone !== '+91' ? 'has-selection' : ''}`}
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.phone && <span className="error-text">{errors.phone}</span>}
                            </div>
                            <div className="form-field-group">
                                <label>Gender</label>
                                <select name="gender" className={`profile-select-field ${formData.gender ? 'has-selection' : ''}`} value={formData.gender} onChange={handleChange} required>
                                    <option value="">Select Gender</option>
                                    {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
                                </select>
                            </div>
                            <div className="form-field-group">
                                <label>Date of Birth</label>
                                <input
                                    type="date"
                                    name="dob"
                                    className={`profile-input-field ${formData.dob ? 'has-selection' : ''}`}
                                    value={formData.dob}
                                    onChange={handleChange}
                                    required
                                    autoComplete="off"
                                />
                            </div>
                            <div className="form-field-group">
                                <label>Height (cm)</label>
                                <select
                                    name="height"
                                    className={`profile-select-field ${formData.height ? 'has-selection' : ''}`}
                                    value={formData.height}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Height</option>
                                    {heightOptions.map(h => <option key={h} value={h}>{h} cm</option>)}
                                </select>
                            </div>
                            <div className="form-field-group">
                                <label>Weight (kg)</label>
                                <select
                                    name="weight"
                                    className={`profile-select-field ${formData.weight ? 'has-selection' : ''}`}
                                    value={formData.weight}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Weight</option>
                                    {weightOptions.map(w => <option key={w} value={w}>{w} kg</option>)}
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

export default BasicInformation;

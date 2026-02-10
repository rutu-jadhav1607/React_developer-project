import React, { useState, useEffect } from 'react';
import './profile.css';

const CASTE_OPTIONS = {
    'Open / General': ['Maratha', 'Brahmin', 'Lingayat', 'Agri'],
    'OBC': ['Mali', 'Kunbi', 'Teli', 'Vanjari', 'Dhangar'],
    'SC': ['Mahar', 'Chambhar'],
    'ST': ['ST-related Caste 1', 'ST-related Caste 2'],
    'NT': ['NT-related Caste 1', 'NT-related Caste 2'],
    'VJ / DT': ['VJ/DT-related Caste 1', 'VJ/DT-related Caste 2'],
    'SBC': ['SBC-related Caste 1', 'SBC-related Caste 2']
};

const RELIGIONS = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Jain', 'Buddhist', 'Parsi'];
const GENDERS = ['Male', 'Female'];
const COMMUNITIES = ['Open / General', 'OBC', 'SC', 'ST', 'NT', 'VJ / DT', 'SBC'];

const BasicInformation = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '+91',
        gender: '',
        dob: '',
        height: '',
        weight: '',
        religion: '',
        community: '',
        caste: '',
        subCaste: ''
    });

    const [progress, setProgress] = useState(0);

    // Dynamic Progress Tracking
    useEffect(() => {
        const fields = Object.keys(formData);
        const filled = fields.filter(key => {
            if (key === 'phone') return formData[key] !== '+91' && formData[key].length > 3;
            if (key === 'subCaste') return true; // Treating subCaste as optional or always valid for pct
            return formData[key].trim() !== '';
        });

        const pct = Math.round((filled.length / fields.length) * 100);
        setProgress(pct);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            if (!value.startsWith('+91')) return;
            if (value.length > 13) return;
        }

        setFormData(prev => {
            const updated = { ...prev, [name]: value };
            if (name === 'community') updated.caste = '';
            return updated;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Profile Data Saved:', formData);
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
                                    className="profile-input-field"
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
                                    className="profile-input-field"
                                    placeholder="email@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-field-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="profile-input-field"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-field-group">
                                <label>Gender</label>
                                <select name="gender" className="profile-select-field" value={formData.gender} onChange={handleChange} required>
                                    <option value="">Select Gender</option>
                                    {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
                                </select>
                            </div>
                            <div className="form-field-group">
                                <label>Date of Birth</label>
                                <input
                                    type="date"
                                    name="dob"
                                    className="profile-input-field"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-field-group">
                                <label>Height (cm)</label>
                                <select name="height" className="profile-select-field" value={formData.height} onChange={handleChange} required>
                                    <option value="">Select Height</option>
                                    {heightOptions.map(h => <option key={h} value={h}>{h} cm</option>)}
                                </select>
                            </div>
                            <div className="form-field-group">
                                <label>Weight (kg)</label>
                                <select name="weight" className="profile-select-field" value={formData.weight} onChange={handleChange} required>
                                    <option value="">Select Weight</option>
                                    {weightOptions.map(w => <option key={w} value={w}>{w} kg</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Section 2: Religious Info */}
                        <div className="section-title-header">
                            <h3>Religious & Social Background</h3>
                        </div>

                        <div className="form-grid" style={{ marginBottom: '20px' }}>
                            <div className="form-field-group">
                                <label>Religion</label>
                                <select name="religion" className="profile-select-field" value={formData.religion} onChange={handleChange} required>
                                    <option value="">Select Religion</option>
                                    {RELIGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                            </div>
                            <div className="form-field-group">
                                <label>Community</label>
                                <select name="community" className="profile-select-field" value={formData.community} onChange={handleChange} required>
                                    <option value="">Select Community</option>
                                    {COMMUNITIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="form-field-group">
                                <label>Caste</label>
                                <select
                                    name="caste"
                                    className="profile-select-field"
                                    value={formData.caste}
                                    onChange={handleChange}
                                    required
                                    disabled={!formData.community}
                                >
                                    <option value="">{formData.community ? 'Select Caste' : 'Select Community first'}</option>
                                    {formData.community && CASTE_OPTIONS[formData.community]?.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-field-group">
                                <label>Sub Caste</label>
                                <input
                                    type="text"
                                    name="subCaste"
                                    className="profile-input-field"
                                    placeholder="Enter sub caste"
                                    value={formData.subCaste}
                                    onChange={handleChange}
                                />
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

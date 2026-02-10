import React, { useState } from 'react';
import './profile.css';

const CASTE_OPTIONS = {
    'Open / General': ['Maratha', 'Brahmin', 'Lingayat', 'Agri'],
    'OBC': ['Mali', 'Kunbi', 'Teli', 'Vanjari', 'Dhangar'],
    'SC': ['Mahar', 'Chambhar'],
    'ST': ['ST-related Caste 1', 'ST-related Caste 2'], // Placeholders as requested
    'NT': ['NT-related Caste 1', 'NT-related Caste 2'],
    'VJ / DT': ['VJ/DT-related Caste 1', 'VJ/DT-related Caste 2'],
    'SBC': ['SBC-related Caste 1', 'SBC-related Caste 2']
};

const BasicInformation = () => {
    const [formData, setFormData] = useState({
        // Basic Information
        fullName: '',
        email: '',
        phone: '+91',
        gender: '',
        dob: '',
        height: '',
        weight: '',
        // Religious Information
        community: '',
        religion: '',
        caste: '',
        subCaste: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Custom logic for phone number validation
        if (name === 'phone') {
            if (!value.startsWith('+91')) {
                return;
            }
            if (value.length > 13) {
                return;
            }
        }

        setFormData(prevState => {
            const newState = {
                ...prevState,
                [name]: value
            };

            // Reset caste when community changes
            if (name === 'community') {
                newState.caste = '';
            }

            return newState;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
    };

    // Helper to generate range
    const range = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => start + i);

    // Height options (existing logic)
    const heightOptions = range(140, 220);
    // Weight options (existing logic)
    const weightOptions = range(40, 150);

    return (
        <div className="profile-container">
            <div className="section-header">Basic Information</div>
            <form className="profile-form" onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="form-row">
                    <label className="profile-label">Full Name</label>
                    <div className="input-group">
                        <input
                            type="text"
                            name="fullName"
                            className="profile-input"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="form-row">
                    <label className="profile-label">Email</label>
                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            className="profile-input"
                            placeholder="email@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            title="Please enter a valid email address"
                            required
                        />
                    </div>
                </div>

                {/* Phone Number */}
                <div className="form-row">
                    <label className="profile-label">Phone Number</label>
                    <div className="input-group">
                        <input
                            type="tel"
                            name="phone"
                            className="profile-input"
                            placeholder="+91 0000000000"
                            value={formData.phone}
                            onChange={handleChange}
                            pattern="^\+91[0-9]{10}$"
                            title="Phone number must start with +91 followed by exactly 10 digits"
                            required
                        />
                    </div>
                </div>

                {/* Gender */}
                <div className="form-row">
                    <label className="profile-label">Gender</label>
                    <div className="input-group">
                        <select name="gender" className="profile-select" value={formData.gender} onChange={handleChange} required>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>

                {/* DOB */}
                <div className="form-row">
                    <label className="profile-label">Date of birth</label>
                    <div className="input-group">
                        <input
                            type="date"
                            name="dob"
                            className="profile-input"
                            value={formData.dob}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Height */}
                <div className="form-row">
                    <label className="profile-label">Height</label>
                    <div className="input-group">
                        <select name="height" className="profile-select" value={formData.height} onChange={handleChange} required>
                            <option value="">Select Height</option>
                            {heightOptions.map(h => (
                                <option key={h} value={h}>{h} cm</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Weight */}
                <div className="form-row">
                    <label className="profile-label">Weight</label>
                    <div className="input-group">
                        <select name="weight" className="profile-select" value={formData.weight} onChange={handleChange} required>
                            <option value="">Select Weight</option>
                            {weightOptions.map(w => (
                                <option key={w} value={w}>{w} kg</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="section-header">Religious Information</div>

                {/* Religion */}
                <div className="form-row">
                    <label className="profile-label">Religion</label>
                    <div className="input-group">
                        <select name="religion" className="profile-select" value={formData.religion} onChange={handleChange} required>
                            <option value="">Select Religion</option>
                            <option value="Hindu">Hindu</option>
                            <option value="Muslim">Muslim</option>
                            <option value="Christian">Christian</option>
                            <option value="Sikh">Sikh</option>
                        </select>
                    </div>
                </div>

                {/* Community */}
                <div className="form-row">
                    <label className="profile-label">Community</label>
                    <div className="input-group">
                        <select name="community" className="profile-select" value={formData.community} onChange={handleChange} required>
                            <option value="">Select Community</option>
                            <option value="Open / General">Open / General</option>
                            <option value="OBC">OBC</option>
                            <option value="SC">SC</option>
                            <option value="ST">ST</option>
                            <option value="NT">NT</option>
                            <option value="VJ / DT">VJ / DT</option>
                            <option value="SBC">SBC</option>
                        </select>
                    </div>
                </div>

                {/* Caste */}
                <div className="form-row">
                    <label className="profile-label">Caste</label>
                    <div className="input-group">
                        <select
                            name="caste"
                            className="profile-select"
                            value={formData.caste}
                            onChange={handleChange}
                            required
                            disabled={!formData.community}
                        >
                            <option value="">
                                {formData.community ? 'Select Caste' : 'Select Community first'}
                            </option>
                            {formData.community && CASTE_OPTIONS[formData.community]?.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Sub caste */}
                <div className="form-row">
                    <label className="profile-label">Sub caste</label>
                    <div className="input-group">
                        <input
                            type="text"
                            name="subCaste"
                            className="profile-input"
                            placeholder="Enter sub caste"
                            value={formData.subCaste}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <button type="submit" className="profile-button">Save & Continue</button>
                </div>
            </form>
        </div>
    );
};

export default BasicInformation;

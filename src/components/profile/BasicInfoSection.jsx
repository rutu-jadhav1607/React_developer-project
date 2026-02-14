import React, { useState, useEffect } from 'react';
import '../../pages/profile/profile.css';

const GENDERS = ['Male', 'Female'];

const BasicInfoSection = ({ onComplete, isLastSection }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '+91',
        gender: '',
        dob: '',
        height: '',
        weight: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        localStorage.setItem('profile_step_1', JSON.stringify(formData));
    }, [formData]);

    const validate = (name, value) => {
        let error = '';
        if (!value) value = '';

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

    const isSectionValid = () => {
        const fields = Object.keys(formData);
        const filled = fields.every(key => {
            if (key === 'phone') return formData[key] !== '+91' && formData[key] && formData[key].length > 3;
            return formData[key] && formData[key].toString().trim() !== '';
        });

        const emailError = validate('email', formData.email || '');
        const phoneError = validate('phone', formData.phone || '');

        return filled && !emailError && !phoneError;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSectionValid()) {
            onComplete();
        } else {
            alert('Please fill all required fields correctly.');
        }
    };

    const range = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => start + i);
    const heightOptions = range(140, 220);
    const weightOptions = range(40, 150);

    return (
        <form onSubmit={handleSubmit} className="section-form-inner">
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
            <div className="section-footer">
                <button type="submit" className="save-pill-button">
                    {isLastSection ? 'Complete Profile' : 'Save & Continue'}
                </button>
            </div>
        </form>
    );
};

export default BasicInfoSection;

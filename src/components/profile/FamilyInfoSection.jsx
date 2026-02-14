import React, { useState, useEffect } from 'react';
import '../../pages/profile/profile.css';

const OCCUPATION_OPTIONS = ['Farmer', 'Business Owner', 'Private Job', 'Government Job', 'Retired', 'Not Employed', 'Deceased'];
const MOTHER_OCCUPATION_OPTIONS = ['Homemaker', 'Private Job', 'Government Job', 'Business Owner', 'Retired', 'Not Employed', 'Deceased'];
const FAMILY_TYPE_OPTIONS = ['Nuclear Family', 'Joint Family', 'Extended Family'];
const FAMILY_STATUS_OPTIONS = ['Middle Class', 'Upper Middle Class', 'Affluent'];

const FamilyInfoSection = ({ onComplete, isLastSection }) => {
    const [formData, setFormData] = useState({
        fatherOccupation: '',
        motherOccupation: '',
        brothers: '', // As requested: "For number inputs -> ''"
        sisters: '',
        familyType: '',
        familyStatus: ''
    });

    useEffect(() => {
        localStorage.setItem('profile_step_4', JSON.stringify(formData));
    }, [formData]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        let finalValue = value;
        if (type === 'number') {
            finalValue = Math.max(0, Math.min(5, parseInt(value) || 0));
        }
        setFormData(prev => ({ ...prev, [name]: finalValue }));
    };

    const isSectionValid = () => {
        const fields = Object.keys(formData);
        return fields.every(key => {
            if (key === 'brothers' || key === 'sisters') return true;
            return formData[key] && formData[key].toString().trim() !== '';
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSectionValid()) {
            onComplete();
        } else {
            alert('Please fill all required fields.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="section-form-inner">
            <div className="form-grid">
                <div className="form-field-group">
                    <label>Father's Occupation</label>
                    <select name="fatherOccupation" className={`profile-select-field ${formData.fatherOccupation ? 'has-selection' : ''}`} value={formData.fatherOccupation} onChange={handleChange} required>
                        <option value="">Select Occupation</option>
                        {OCCUPATION_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
                <div className="form-field-group">
                    <label>Mother's Occupation</label>
                    <select name="motherOccupation" className={`profile-select-field ${formData.motherOccupation ? 'has-selection' : ''}`} value={formData.motherOccupation} onChange={handleChange} required>
                        <option value="">Select Occupation</option>
                        {MOTHER_OCCUPATION_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
                <div className="form-field-group">
                    <label>Brothers (0-5)</label>
                    <input type="number" name="brothers" className={`profile-input-field ${formData.brothers !== '' && formData.brothers !== undefined ? 'has-selection' : ''}`} min="0" max="5" value={formData.brothers} onChange={handleChange} required />
                </div>
                <div className="form-field-group">
                    <label>Sisters (0-5)</label>
                    <input type="number" name="sisters" className={`profile-input-field ${formData.sisters !== '' && formData.sisters !== undefined ? 'has-selection' : ''}`} min="0" max="5" value={formData.sisters} onChange={handleChange} required />
                </div>
                <div className="form-field-group">
                    <label>Family Type</label>
                    <select name="familyType" className={`profile-select-field ${formData.familyType ? 'has-selection' : ''}`} value={formData.familyType} onChange={handleChange} required>
                        <option value="">Select Family Type</option>
                        {FAMILY_TYPE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
                <div className="form-field-group">
                    <label>Family Status</label>
                    <select name="familyStatus" className={`profile-select-field ${formData.familyStatus ? 'has-selection' : ''}`} value={formData.familyStatus} onChange={handleChange} required>
                        <option value="">Select Family Status</option>
                        {FAMILY_STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
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

export default FamilyInfoSection;

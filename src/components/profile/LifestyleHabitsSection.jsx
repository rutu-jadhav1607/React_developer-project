import React, { useState, useEffect } from 'react';
import '../../pages/profile/profile.css';

const LifestyleHabitsSection = ({ onComplete, isLastSection }) => {
    const [formData, setFormData] = useState({
        eatingHabits: '',
        dietPreference: '',
        drinking: '',
        smoking: ''
    });

    useEffect(() => {
        localStorage.setItem('profile_step_5', JSON.stringify(formData));
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const isSectionValid = () => {
        const fields = Object.keys(formData);
        return fields.every(key => formData[key] && formData[key].toString().trim() !== '');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSectionValid()) {
            onComplete();
            // Redirect to review page after all sections are complete
            window.location.href = '/profile/review';
        } else {
            alert('Please fill all required fields.');
        }
    };

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
        <form onSubmit={handleSubmit} className="section-form-inner">
            <div className="form-grid" style={{ gridTemplateColumns: '1fr' }}>
                {renderRadioGroup('Eating Habits', 'eatingHabits', ['Vegetarian', 'Eggetarian', 'Non-Vegetarian'])}
                {renderRadioGroup('Diet Preference', 'dietPreference', ['Vegan', 'Jain', 'No Specific Preference'])}
                {renderRadioGroup('Drinking', 'drinking', ['No', 'Occasionally', 'Yes'])}
                {renderRadioGroup('Smoking', 'smoking', ['No', 'Yes'])}
            </div>
            <div className="section-footer">
                <button type="submit" className="save-pill-button">
                    {isLastSection ? 'Complete Profile' : 'Save & Continue'}
                </button>
            </div>
        </form>
    );
};

export default LifestyleHabitsSection;

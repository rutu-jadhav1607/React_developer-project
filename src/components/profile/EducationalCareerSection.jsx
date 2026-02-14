import React, { useState, useEffect } from 'react';
import '../../pages/profile/profile.css';

const EDUCATION_OPTIONS = ['High School', 'Higher Secondary', 'Diploma', 'ITI', 'Undergraduate (BA, BCom, BSc, BTech, BE)', 'Postgraduate (MA, MCom, MSc, MTech, ME, MBA)', 'Doctorate (PhD)', 'Other'];
const WORK_DETAILS_OPTIONS = ['Private Sector', 'Government / PSU', 'Business / Self Employed', 'Startup', 'Professional Practice', 'Not Working'];
const EMPLOYMENT_TYPE_OPTIONS = ['Full Time', 'Part Time', 'Contract', 'Temporary', 'Freelancer', 'Not Applicable'];
const OCCUPATION_OPTIONS = ['Software Engineer', 'IT Professional', 'Engineer (Non-IT)', 'Doctor', 'Teacher / Professor', 'Accountant / CA', 'Business Owner', 'Government Employee', 'Banking Professional', 'Marketing / Sales', 'Designer', 'Student', 'Homemaker', 'Other'];
const INCOME_OPTIONS = ['No Income', 'Below ₹1 Lakh', '₹1 – 3 Lakh', '₹3 – 5 Lakh', '₹5 – 10 Lakh', '₹10 – 15 Lakh', '₹15 – 25 Lakh', 'Above ₹25 Lakh'];

const EducationalCareerSection = ({ onComplete, isLastSection }) => {
    const [formData, setFormData] = useState({
        education: '',
        workDetails: '',
        employmentType: '',
        occupation: '',
        annualIncome: ''
    });

    useEffect(() => {
        localStorage.setItem('profile_step_3', JSON.stringify(formData));
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
        } else {
            alert('Please fill all required fields.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="section-form-inner">
            <div className="form-grid">
                <div className="form-field-group">
                    <label>Education</label>
                    <select name="education" className={`profile-select-field ${formData.education ? 'has-selection' : ''}`} value={formData.education} onChange={handleChange} required>
                        <option value="">Select Education</option>
                        {EDUCATION_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
                <div className="form-field-group">
                    <label>Work Details</label>
                    <select name="workDetails" className={`profile-select-field ${formData.workDetails ? 'has-selection' : ''}`} value={formData.workDetails} onChange={handleChange} required>
                        <option value="">Select Work Details</option>
                        {WORK_DETAILS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
                <div className="form-field-group">
                    <label>Employment Type</label>
                    <select name="employmentType" className={`profile-select-field ${formData.employmentType ? 'has-selection' : ''}`} value={formData.employmentType} onChange={handleChange} required>
                        <option value="">Select Employment Type</option>
                        {EMPLOYMENT_TYPE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
                <div className="form-field-group">
                    <label>Occupation</label>
                    <select name="occupation" className={`profile-select-field ${formData.occupation ? 'has-selection' : ''}`} value={formData.occupation} onChange={handleChange} required>
                        <option value="">Select Occupation</option>
                        {OCCUPATION_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
                <div className="form-field-group">
                    <label>Annual Income</label>
                    <select name="annualIncome" className={`profile-select-field ${formData.annualIncome ? 'has-selection' : ''}`} value={formData.annualIncome} onChange={handleChange} required>
                        <option value="">Select Annual Income</option>
                        {INCOME_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
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

export default EducationalCareerSection;

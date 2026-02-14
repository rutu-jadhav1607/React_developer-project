import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import backgroundImage from '../../assets/auth/vivah2.jpg';

const EDUCATION_OPTIONS = [
    'High School',
    'Higher Secondary',
    'Diploma',
    'ITI',
    'Undergraduate (BA, BCom, BSc, BTech, BE)',
    'Postgraduate (MA, MCom, MSc, MTech, ME, MBA)',
    'Doctorate (PhD)',
    'Other'
];

const WORK_DETAILS_OPTIONS = [
    'Private Sector',
    'Government',
    'Business',
    'Not Working'
];

const EMPLOYMENT_TYPE_OPTIONS = [
    'Full Time',
    'Part Time',
    'Contract',
    'Freelancer',

];

const OCCUPATION_OPTIONS = [
    'Software Engineer',
    'IT Professional',
    'Doctor',
    'Teacher',
    'CA',
    'Business Owner',
    'Government Employee',
    'Banking Professional',
    'Marketing',
    'Designer',
    'Student',
    'Homemaker',
    'Other'
];

const INCOME_OPTIONS = [

    'Below ₹1 Lakh',
    '₹1 – 3 Lakh',
    '₹3 – 5 Lakh',
    '₹5 – 10 Lakh',
    '₹10 – 15 Lakh',
    '₹15 – 25 Lakh',
    'Above ₹25 Lakh'
];

const EducationalCareer = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem('profile_step_3');
        return saved ? JSON.parse(saved) : {
            education: '',
            workDetails: '',
            employmentType: '',
            occupation: '',
            annualIncome: ''
        };
    });

    const [progress, setProgress] = useState(40);

    useEffect(() => {
        localStorage.setItem('profile_step_3', JSON.stringify(formData));

        const fields = Object.keys(formData);
        const filled = fields.filter(key => formData[key] && formData[key].trim() !== '');

        // Calculate progress within this step (another 20% to reach 60%)
        const stepProgress = Math.round((filled.length / fields.length) * 20);
        setProgress(40 + stepProgress);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Educational & Career Information Saved:', formData);
        navigate('/profile/family-info');
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
                        <p>Step 3: Educational & Career Information</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="profile-form-container">
                        <div className="section-title-header">
                            <h3>Educational & Career Information</h3>
                        </div>

                        <div className="form-grid">
                            {/* Education */}
                            <div className="form-field-group">
                                <label>Education</label>
                                <select name="education" className={`profile-select-field ${formData.education ? 'has-selection' : ''}`} value={formData.education} onChange={handleChange} required>
                                    <option value="">Select Education</option>
                                    {EDUCATION_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>

                            {/* Work Details */}
                            <div className="form-field-group">
                                <label>Work Details</label>
                                <select name="workDetails" className={`profile-select-field ${formData.workDetails ? 'has-selection' : ''}`} value={formData.workDetails} onChange={handleChange} required>
                                    <option value="">Select Work Details</option>
                                    {WORK_DETAILS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>

                            {/* Employment Type */}
                            <div className="form-field-group">
                                <label>Employment Type</label>
                                <select name="employmentType" className={`profile-select-field ${formData.employmentType ? 'has-selection' : ''}`} value={formData.employmentType} onChange={handleChange} required>
                                    <option value="">Select Employment Type</option>
                                    {EMPLOYMENT_TYPE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>

                            {/* Occupation */}
                            <div className="form-field-group">
                                <label>Occupation</label>
                                <select name="occupation" className={`profile-select-field ${formData.occupation ? 'has-selection' : ''}`} value={formData.occupation} onChange={handleChange} required>
                                    <option value="">Select Occupation</option>
                                    {OCCUPATION_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>

                            {/* Annual Income */}
                            <div className="form-field-group">
                                <label>Annual Income</label>
                                <select name="annualIncome" className={`profile-select-field ${formData.annualIncome ? 'has-selection' : ''}`} value={formData.annualIncome} onChange={handleChange} required>
                                    <option value="">Select Annual Income</option>
                                    {INCOME_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
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

export default EducationalCareer;

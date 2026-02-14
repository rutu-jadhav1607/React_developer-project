import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import backgroundImage from '../../assets/auth/vivah2.jpg';

const CASTE_OPTIONS = {
    'Open / General': ['Maratha', 'Brahmin', 'Kshatriya', 'Vaishya', 'Rajput', 'Kayastha'],
    'OBC': ['Mali', 'Kunbi', 'Teli', 'Dhangar', 'Sutar', 'Lohar', 'Bhoi', 'Gurav'],
    'SC': ['Mahar', 'Mang', 'Chambhar', 'Bhangi'],
    'ST': ['Gond', 'Bhil', 'Warli', 'Katkari', 'Kolam'],
    'NT': ['Banjara', 'Ramoshi', 'Wadar', 'Kaikadi'],
    'VJNT': ['Vanjari', 'Pardhi', 'Bhantu'],
    'Maratha': ['Maratha'],
    'Brahmin': ['Deshastha', 'Kokanastha', 'Saraswat', 'Karhade'],
    'Kshatriya': ['Kshatriya'],
    'Vaishya': ['Vaishya'],
    'Other Hindu Communities': [] // Allow free-text or generic list if needed, based on requirements
};

const COMMUNITIES = [
    'Open / General',
    'OBC',
    'SC',
    'ST',
    'NT',
    'VJNT',
    'Maratha',
    'Brahmin',
    'Kshatriya',
    'Vaishya',
    'Other Hindu Communities'
];

const GOTHRA_OPTIONS = ['Kashyap', 'Bharadwaj', 'Vashistha', 'Vishvamitra', 'Gautam', 'Jamadagni', 'Atri', 'Agastya', 'Other'];
const NAKSHATRA_OPTIONS = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravan', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'];
const RASHI_OPTIONS = ['Mesh (Aries)', 'Vrishabha (Taurus)', 'Mithuna (Gemini)', 'Karka (Cancer)', 'Simha (Leo)', 'Kanya (Virgo)', 'Tula (Libra)', 'Vrishchika (Scorpio)', 'Dhanu (Sagittarius)', 'Makara (Capricorn)', 'Kumbha (Aquarius)', 'Meena (Pisces)'];

const ReligiousInformation = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem('profile_step_2');
        return saved ? JSON.parse(saved) : {
            religion: 'Hindu',
            community: '',
            caste: '',
            manglik: '',
            gothra: '',
            nakshatra: '',
            rashi: ''
        };
    });

    const [progress, setProgress] = useState(20); // Starting from 20% as this is Step 2

    useEffect(() => {
        localStorage.setItem('profile_step_2', JSON.stringify(formData));

        const fields = Object.keys(formData);
        const filled = fields.filter(key => {
            if (key === 'religion') return true; // Defaulted
            return formData[key] && formData[key].trim() !== '';
        });

        // Calculate progress within this step (another 20%)
        const stepProgress = Math.round((filled.length / fields.length) * 20);
        setProgress(20 + stepProgress);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const updated = { ...prev, [name]: value };
            if (name === 'community') updated.caste = ''; // Reset caste when community changes
            return updated;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Religious Information Saved:', formData);
        navigate('/profile/educational-info');
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
                        <p>Step 2: Religious Information</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="profile-form-container">
                        <div className="section-title-header">
                            <h3>Religious Information</h3>
                        </div>

                        <div className="form-grid">
                            {/* Religion */}
                            <div className="form-field-group">
                                <label>Religion</label>
                                <select name="religion" className={`profile-select-field ${formData.religion ? 'has-selection' : ''}`} value={formData.religion} onChange={handleChange} required>
                                    <option value="Hindu">Hindu</option>
                                </select>
                            </div>

                            {/* Community */}
                            <div className="form-field-group">
                                <label>Community</label>
                                <select
                                    name="community"
                                    className={`profile-select-field ${formData.community ? 'has-selection' : ''}`}
                                    value={formData.community}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Community</option>
                                    {COMMUNITIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>

                            {/* Caste */}
                            <div className="form-field-group">
                                <label>Caste</label>
                                {formData.community === 'Other Hindu Communities' ? (
                                    <input
                                        type="text"
                                        name="caste"
                                        className={`profile-input-field ${formData.caste ? 'has-selection' : ''}`}
                                        placeholder="Enter your caste"
                                        value={formData.caste}
                                        onChange={handleChange}
                                        required
                                    />
                                ) : (
                                    <select
                                        name="caste"
                                        className={`profile-select-field ${formData.caste ? 'has-selection' : ''}`}
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
                                )}
                            </div>

                            {/* Manglik Status */}
                            <div className="form-field-group">
                                <label>Manglik Status</label>
                                <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="manglik"
                                            value="Yes"
                                            checked={formData.manglik === 'Yes'}
                                            onChange={handleChange}
                                            required
                                        /> Yes
                                    </label>
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="manglik"
                                            value="No"
                                            checked={formData.manglik === 'No'}
                                            onChange={handleChange}
                                            required
                                        /> No
                                    </label>
                                </div>
                            </div>

                            {/* Gothra */}
                            <div className="form-field-group">
                                <label>Gothra</label>
                                <select name="gothra" className={`profile-select-field ${formData.gothra ? 'has-selection' : ''}`} value={formData.gothra} onChange={handleChange} required>
                                    <option value="">Select Gothra</option>
                                    {GOTHRA_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
                                </select>
                            </div>

                            {/* Nakshatra */}
                            <div className="form-field-group">
                                <label>Nakshatra</label>
                                <select name="nakshatra" className={`profile-select-field ${formData.nakshatra ? 'has-selection' : ''}`} value={formData.nakshatra} onChange={handleChange} required>
                                    <option value="">Select Nakshatra</option>
                                    {NAKSHATRA_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                            </div>

                            {/* Rashi */}
                            <div className="form-field-group">
                                <label>Rashi (Moon Sign)</label>
                                <select name="rashi" className={`profile-select-field ${formData.rashi ? 'has-selection' : ''}`} value={formData.rashi} onChange={handleChange} required>
                                    <option value="">Select Rashi</option>
                                    {RASHI_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
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

export default ReligiousInformation;

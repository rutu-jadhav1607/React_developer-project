import React, { useState, useEffect } from 'react';
import '../../pages/profile/profile.css';

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
    'Other Hindu Communities': []
};

const COMMUNITIES = [
    'Open / General', 'OBC', 'SC', 'ST', 'NT', 'VJNT', 'Maratha', 'Brahmin', 'Kshatriya', 'Vaishya', 'Other Hindu Communities'
];

const GOTHRA_OPTIONS = ['Kashyap', 'Bharadwaj', 'Vashistha', 'Vishvamitra', 'Gautam', 'Jamadagni', 'Atri', 'Agastya', 'Other'];
const NAKSHATRA_OPTIONS = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravan', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'];
const RASHI_OPTIONS = ['Mesh (Aries)', 'Vrishabha (Taurus)', 'Mithuna (Gemini)', 'Karka (Cancer)', 'Simha (Leo)', 'Kanya (Virgo)', 'Tula (Libra)', 'Vrishchika (Scorpio)', 'Dhanu (Sagittarius)', 'Makara (Capricorn)', 'Kumbha (Aquarius)', 'Meena (Pisces)'];

const ReligiousInfoSection = ({ onComplete, isLastSection }) => {
    const [formData, setFormData] = useState({
        religion: '', // Start empty as requested
        community: '',
        caste: '',
        manglik: '',
        gothra: '',
        nakshatra: '',
        rashi: ''
    });

    useEffect(() => {
        localStorage.setItem('profile_step_2', JSON.stringify(formData));
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const updated = { ...prev, [name]: value };
            if (name === 'community') updated.caste = '';
            return updated;
        });
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
                    <label>Religion</label>
                    <select name="religion" className={`profile-select-field ${formData.religion ? 'has-selection' : ''}`} value={formData.religion} onChange={handleChange} required>
                        <option value="">Select Religion</option>
                        <option value="Hindu">Hindu</option>
                    </select>
                </div>
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
                <div className="form-field-group">
                    <label>Manglik Status</label>
                    <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                        <label className="radio-label">
                            <input type="radio" name="manglik" value="Yes" checked={formData.manglik === 'Yes'} onChange={handleChange} required /> Yes
                        </label>
                        <label className="radio-label">
                            <input type="radio" name="manglik" value="No" checked={formData.manglik === 'No'} onChange={handleChange} required /> No
                        </label>
                    </div>
                </div>
                <div className="form-field-group">
                    <label>Gothra</label>
                    <select name="gothra" className={`profile-select-field ${formData.gothra ? 'has-selection' : ''}`} value={formData.gothra} onChange={handleChange} required>
                        <option value="">Select Gothra</option>
                        {GOTHRA_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                </div>
                <div className="form-field-group">
                    <label>Nakshatra</label>
                    <select name="nakshatra" className={`profile-select-field ${formData.nakshatra ? 'has-selection' : ''}`} value={formData.nakshatra} onChange={handleChange} required>
                        <option value="">Select Nakshatra</option>
                        {NAKSHATRA_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                </div>
                <div className="form-field-group">
                    <label>Rashi (Moon Sign)</label>
                    <select name="rashi" className={`profile-select-field ${formData.rashi ? 'has-selection' : ''}`} value={formData.rashi} onChange={handleChange} required>
                        <option value="">Select Rashi</option>
                        {RASHI_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
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

export default ReligiousInfoSection;

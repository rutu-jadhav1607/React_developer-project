import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../profile/profile.css';
import backgroundImage from '../../assets/auth/vivah2.jpg';

const faqs = [
    {
        question: 'How do I create my profile?',
        answer: 'After registering, you will be guided through a multi-step profile creation process. Fill in your personal, religious, educational, family, and lifestyle details to get the best matches.'
    },
    {
        question: 'How does the matching system work?',
        answer: 'Our smart algorithm suggests matches based on your preferences, location, community, education, and lifestyle choices. The more complete your profile, the better the matches!'
    },
    {
        question: 'Is my personal information safe?',
        answer: 'Yes! We follow strict data privacy policies. Your contact details are hidden from other users until you mutually accept each other\'s interest. All profiles are manually verified.'
    },
    {
        question: 'How do I send interest to someone?',
        answer: 'Visit a profile you like and click the "Send Interest" button. The other person will be notified and can accept or decline. Once accepted, you can start chatting.'
    },
    {
        question: 'Can I shortlist profiles?',
        answer: 'Yes! Click the ⭐ Shortlist button on any profile to save them. You can view all shortlisted profiles from the Shortlist section in your sidebar.'
    },
    {
        question: 'How do I contact customer support?',
        answer: 'You can reach us at support@shubhvivah.com or call us at +91-9876543210. Our support team is available Monday–Saturday, 10 AM to 6 PM.'
    },
    {
        question: 'How can I delete my account?',
        answer: 'To delete your account, go to Privacy & Security settings and select "Delete Account". Please note this action is irreversible and all your data will be permanently removed.'
    }
];

const HelpPage = () => {
    const navigate = useNavigate();
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="profile-page-wrapper services-mode">
            <div className="profile-background" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <div className="profile-background-overlay"></div>

            <div className="services-container-main">
                {/* Header */}
                <div className="services-header-glass">
                    <div className="back-button-circle" onClick={() => navigate(-1)}>←</div>
                    <div className="services-header-title">
                        <h2>Help & Support <span className="title-icon">❓</span></h2>
                        <p>We're here to help you every step of the way.</p>
                    </div>
                    <div style={{ width: '45px' }}></div>
                </div>

                {/* Quick Contact Cards */}
                <div className="help-contact-grid">
                    <div className="help-contact-card">
                        <div className="help-contact-icon">📧</div>
                        <h4>Email Support</h4>
                        <p>support@shubhvivah.com</p>
                        <span className="help-response-time">Response in 24 hrs</span>
                    </div>
                    <div className="help-contact-card">
                        <div className="help-contact-icon">📞</div>
                        <h4>Phone Support</h4>
                        <p>+91-9876543210</p>
                        <span className="help-response-time">Mon–Sat, 10AM–6PM</span>
                    </div>
                    <div className="help-contact-card">
                        <div className="help-contact-icon">💬</div>
                        <h4>Live Chat</h4>
                        <p>Chat with our team</p>
                        <span className="help-response-time">Available now</span>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="help-faq-section">
                    <h3 className="help-section-title">Frequently Asked Questions</h3>
                    <div className="help-faq-list">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`help-faq-item ${openIndex === index ? 'open' : ''}`}
                                onClick={() => toggleFaq(index)}
                            >
                                <div className="help-faq-question">
                                    <span>{faq.question}</span>
                                    <span className="help-faq-arrow">{openIndex === index ? '▲' : '▼'}</span>
                                </div>
                                {openIndex === index && (
                                    <div className="help-faq-answer">
                                        <p>{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Safety Tips */}
                <div className="help-safety-card">
                    <div className="help-safety-icon">🛡️</div>
                    <div>
                        <h4>Stay Safe Online</h4>
                        <p>Never share your personal financial information with anyone on the platform. Report suspicious profiles using the "Report" button.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpPage;

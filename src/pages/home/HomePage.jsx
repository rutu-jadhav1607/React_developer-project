import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../assets/auth/vivah2.jpg';
import logo from '../../assets/common/logo.png';
import './home.css';

const HomePage = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // Retrieve the user's name from localStorage if they have registered
        const step1Data = JSON.parse(localStorage.getItem('profile_step_1') || '{}');
        if (step1Data.fullName) {
            setUserName(step1Data.fullName);
        }
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = () => {
        // Optional: clear specific user data on logout, or just navigate to login
        setIsSidebarOpen(false);
        navigate('/login');
    };

    return (
        <div className="home-container">
            <div
                className="home-background"
                style={{
                    backgroundImage: `url(${backgroundImage})`
                }}
            ></div>

            {/* Sidebar Overlay */}
            <div 
                className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} 
                onClick={toggleSidebar}
            ></div>

            {/* Profile Sidebar */}
            <div className={`profile-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="sidebar-user-info">
                        <div className="sidebar-avatar-large">
                            {userName ? userName.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="sidebar-user-details">
                            <h3>{userName || 'User'}</h3>
                            <span className="premium-badge-sidebar">Premium</span>
                        </div>
                    </div>
                    <button className="close-sidebar-btn" onClick={toggleSidebar}>✕</button>
                </div>

                <nav className="sidebar-nav-links">
                    <button onClick={() => navigate('/dashboard')} className="sidebar-link">
                        <span className="link-icon">👤</span> My Profile
                    </button>
                    <button onClick={() => navigate('/matches/shortlisted')} className="sidebar-link">
                        <span className="link-icon">⭐</span> Shortlist
                    </button>
                    <button onClick={() => navigate('/matches/interests')} className="sidebar-link">
                        <span className="link-icon">❤️</span> Interest
                    </button>
                    <button onClick={() => navigate('/matches/likes')} className="sidebar-link">
                        <span className="link-icon">👍</span> Likes
                    </button>
                    <button onClick={() => navigate('/messages')} className="sidebar-link">
                        <span className="link-icon">💬</span> Chats
                    </button>
                    
                    <div className="sidebar-divider"></div>
                    
                    <button onClick={() => { setIsSidebarOpen(false); navigate('/help'); }} className="sidebar-link">
                        <span className="link-icon">❓</span> Help
                    </button>
                    <button onClick={() => { setIsSidebarOpen(false); navigate('/privacy'); }} className="sidebar-link">
                        <span className="link-icon">🛡️</span> Privacy & Security
                    </button>
                    <button onClick={handleLogout} className="sidebar-link logout-link">
                        <span className="link-icon">🚪</span> Logout
                    </button>
                </nav>
            </div>

            {/* Hero Section */}
            <section className="hero-viewport">

                <header className="home-header">
                    {userName ? (
                        <div className="home-header-actions">
                            <div className="home-notification-btn" onClick={() => navigate('/dashboard')}>
                                <span className="notification-icon">🔔</span>
                                <span className="notification-badge">3</span>
                            </div>
                            <div className="home-profile-indicator" onClick={toggleSidebar}>
                                <div className="home-profile-avatar">
                                    {userName.charAt(0).toUpperCase()}
                                </div>
                                <span className="home-profile-name">Hi, {userName.split(' ')[0]}</span>
                            </div>
                        </div>
                    ) : (
                        <button
                            className="registration-btn"
                            onClick={() => navigate('/register')}
                        >
                            Free Registration
                        </button>
                    )}
                </header>

                <main className="hero-section">
                    <h1>Shubhvivah</h1>
                    <p>Begin Your Journey to Eternity. Find Your Perfect Soulmate.</p>
                </main>

                <div className="scroll-indicator">
                    <span>Scroll to explore</span>
                    <div className="arrow"></div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2 className="section-title">Why Choose Shubhvivah?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="icon">🔒</div>
                        <h3>Verified Profiles</h3>
                        <p>We ensure every profile is manually verified for a safe and secure experience.</p>
                    </div>
                    <div className="feature-card">
                        <div className="icon">🎯</div>
                        <h3>Smart Matching</h3>
                        <p>Our intelligent system suggests the best matches based on your preferences.</p>
                    </div>
                    <div className="feature-card">
                        <div className="icon">💬</div>
                        <h3>Direct Connection</h3>
                        <p>Express interest and connect with potential life partners instantly.</p>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="steps-section">
                <h2 className="section-title">How It Works</h2>
                <div className="steps-container">
                    <div className="step">
                        <div className="step-number">1</div>
                        <h3>Create Profile</h3>
                        <p>Register for free and build your detailed profile to get started.</p>
                    </div>
                    <div className="step-connector"></div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <h3>Search & Connect</h3>
                        <p>Explore profiles and send interest to those who match your criteria.</p>
                    </div>
                    <div className="step-connector"></div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <h3>Start a Journey</h3>
                        <p>Begin your beautiful journey to a happy married life.</p>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section">
                <div className="about-content">
                    <h2 className="section-title">About Shubhvivah</h2>
                    <p>Shubhvivah is more than just a matrimony site; it's a platform dedicated to helping you find your soulmate within the community. We combine traditional values with modern technology to provide a seamless search experience.</p>
                    <button className="secondary-btn" onClick={() => navigate('/register')}>Join Us Today</button>
                </div>
            </section>

            {/* Footer */}
            <footer className="home-footer">
                <div className="footer-content">
                    <div className="footer-logo">
                        <img src={logo} alt="Shubhvivah Logo" />
                        <span>Shubhvivah</span>
                    </div>
                    <div className="footer-links">
                        <a href="#hero">Home</a>
                        <a href="#features">Features</a>
                        <a href="#about">About Us</a>
                        <a href="/login">Login</a>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2026 Shubhvivah Matrimony. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;

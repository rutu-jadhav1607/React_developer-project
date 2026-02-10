import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../assets/auth/vivah2.jpg';
import logo from '../../assets/common/logo.png';
import './home.css';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div
                className="home-background"
                style={{
                    backgroundImage: `url(${backgroundImage})`
                }}
            ></div>

            {/* Hero Section */}
            <section className="hero-viewport">

                <header className="home-header">
                    <button
                        className="registration-btn"
                        onClick={() => navigate('/register')}
                    >
                        Free Registration
                    </button>
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

import React, { useState } from 'react';
import './auth.css';
import logo from '../../assets/common/logo.png';
import facebookIcon from '../../components/facebook.png';
import googleIcon from '../../components/google.png';


const AuthPage = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');

    const togglePanel = () => {
        setIsRightPanelActive(!isRightPanelActive);
        setShowOTP(false);
    };

    const handleSignup = (e) => {
        e.preventDefault();
        setShowOTP(true);
    };

    const handleVerifyOTP = (e) => {
        e.preventDefault();
        console.log("Verified OTP:", otp);
        setIsRightPanelActive(false);
        setShowOTP(false);
    };

    return (
        <div className="auth-container">
            <div className={`auth-box ${isRightPanelActive ? 'right-panel-active' : ''}`} id="main">

                {/* Sign Up Container */}
                <div className="form-container sign-up-container">
                    <form className="auth-form" onSubmit={showOTP ? handleVerifyOTP : handleSignup}>
                        <h1 className="auth-title">Create Account</h1>
                        <div className="social-container">
                            <a href="#" className="social">
                                <img src={googleIcon} alt="Google" className="social-icon" />
                            </a>
                            <a href="#" className="social">
                                <img src={facebookIcon} alt="Facebook" className="social-icon" />
                            </a>
                        </div>
                        <p style={{ marginBottom: '10px' }}>Use your email for registration</p>

                        {!showOTP ? (
                            <>
                                <input
                                    type="email"
                                    className="auth-input"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    className="auth-input"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button type="submit" className="auth-button">GET OTP</button>
                            </>
                        ) : (
                            <div className="otp-section">
                                <p style={{ fontSize: '0.8rem', color: '#666' }}>Sent to {email}</p>
                                <input
                                    type="text"
                                    className="auth-input"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                                <button type="submit" className="auth-button">REGISTER</button>
                                <p className="auth-link" style={{ marginTop: '10px', cursor: 'pointer', fontSize: '0.9rem', color: '#800000', fontWeight: 'bold' }} onClick={() => setShowOTP(false)}>Change Details</p>
                            </div>
                        )}
                    </form>
                </div>

                {/* Sign In Container */}
                <div className="form-container sign-in-container">
                    <form className="auth-form" action="#">
                        <h1 className="auth-title">Sign In</h1>
                        <div className="social-container">
                            <a href="#" className="social">
                                <img src={googleIcon} alt="Google" className="social-icon" />
                            </a>
                            <a href="#" className="social">
                                <img src={facebookIcon} alt="Facebook" className="social-icon" />
                            </a>
                        </div>
                        <p style={{ marginBottom: '10px' }}>Sign in with Email & Password</p>
                        <input type="email" placeholder="Email" className="auth-input" />
                        <input type="password" placeholder="Password" className="auth-input" />
                        <a href="#" style={{ fontSize: '0.9rem', color: '#333', textDecoration: 'none', marginTop: '10px' }}>Forgot your password?</a>
                        <button className="auth-button">SIGN IN</button>
                    </form>
                </div>

                {/* Overlay Container */}
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <img src={logo} alt="Logo" className="auth-logo-small" />


                            <button className="ghost" id="signIn" onClick={togglePanel}>SIGN IN</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <img src={logo} alt="Logo" className="auth-logo-small" />


                            <button className="ghost" id="signUp" onClick={togglePanel}>SIGN UP</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;

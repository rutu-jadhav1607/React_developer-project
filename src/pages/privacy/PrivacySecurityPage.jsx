import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../profile/profile.css';
import backgroundImage from '../../assets/auth/vivah2.jpg';

const PrivacySecurityPage = () => {
    const navigate = useNavigate();

    const [settings, setSettings] = useState({
        profileVisible: true,
        showPhoto: true,
        showContact: false,
        showLocation: true,
        emailNotifications: true,
        smsNotifications: false,
        matchAlerts: true,
        messageAlerts: true,
        twoFactor: false,
        activityStatus: true,
    });

    const toggle = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const ToggleSwitch = ({ settingKey }) => (
        <div
            className={`privacy-toggle ${settings[settingKey] ? 'on' : 'off'}`}
            onClick={() => toggle(settingKey)}
        >
            <div className="privacy-toggle-knob"></div>
        </div>
    );

    return (
        <div className="profile-page-wrapper services-mode">
            <div className="profile-background" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <div className="profile-background-overlay"></div>

            <div className="services-container-main">
                {/* Header */}
                <div className="services-header-glass">
                    <div className="back-button-circle" onClick={() => navigate(-1)}>←</div>
                    <div className="services-header-title">
                        <h2>Privacy & Security <span className="title-icon">🛡️</span></h2>
                        <p>Control your data, visibility, and account security.</p>
                    </div>
                    <div style={{ width: '45px' }}></div>
                </div>

                {/* Profile Visibility */}
                <div className="privacy-card">
                    <div className="privacy-card-header">
                        <span className="privacy-section-icon">👁️</span>
                        <h3>Profile Visibility</h3>
                    </div>
                    <div className="privacy-settings-list">
                        <div className="privacy-setting-row">
                            <div className="privacy-setting-info">
                                <strong>Show My Profile</strong>
                                <span>Allow other members to find and view your profile</span>
                            </div>
                            <ToggleSwitch settingKey="profileVisible" />
                        </div>
                        <div className="privacy-setting-row">
                            <div className="privacy-setting-info">
                                <strong>Show Profile Photo</strong>
                                <span>Display your photos to all members</span>
                            </div>
                            <ToggleSwitch settingKey="showPhoto" />
                        </div>
                        <div className="privacy-setting-row">
                            <div className="privacy-setting-info">
                                <strong>Show Contact Details</strong>
                                <span>Share your phone/email after mutual interest</span>
                            </div>
                            <ToggleSwitch settingKey="showContact" />
                        </div>
                        <div className="privacy-setting-row">
                            <div className="privacy-setting-info">
                                <strong>Show Location</strong>
                                <span>Let others see your city on your profile</span>
                            </div>
                            <ToggleSwitch settingKey="showLocation" />
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="privacy-card">
                    <div className="privacy-card-header">
                        <span className="privacy-section-icon">🔔</span>
                        <h3>Notifications</h3>
                    </div>
                    <div className="privacy-settings-list">
                        <div className="privacy-setting-row">
                            <div className="privacy-setting-info">
                                <strong>Email Notifications</strong>
                                <span>Receive updates and alerts via email</span>
                            </div>
                            <ToggleSwitch settingKey="emailNotifications" />
                        </div>
                        <div className="privacy-setting-row">
                            <div className="privacy-setting-info">
                                <strong>SMS Notifications</strong>
                                <span>Receive updates via SMS on your phone</span>
                            </div>
                            <ToggleSwitch settingKey="smsNotifications" />
                        </div>
                        <div className="privacy-setting-row">
                            <div className="privacy-setting-info">
                                <strong>New Match Alerts</strong>
                                <span>Notify me when a new match is found</span>
                            </div>
                            <ToggleSwitch settingKey="matchAlerts" />
                        </div>
                        <div className="privacy-setting-row">
                            <div className="privacy-setting-info">
                                <strong>Message Alerts</strong>
                                <span>Notify me when I receive a new message</span>
                            </div>
                            <ToggleSwitch settingKey="messageAlerts" />
                        </div>
                    </div>
                </div>

                {/* Account Security */}
                <div className="privacy-card">
                    <div className="privacy-card-header">
                        <span className="privacy-section-icon">🔐</span>
                        <h3>Account Security</h3>
                    </div>
                    <div className="privacy-settings-list">
                        <div className="privacy-setting-row">
                            <div className="privacy-setting-info">
                                <strong>Two-Factor Authentication</strong>
                                <span>Add an extra layer of security to your account</span>
                            </div>
                            <ToggleSwitch settingKey="twoFactor" />
                        </div>
                        <div className="privacy-setting-row">
                            <div className="privacy-setting-info">
                                <strong>Show Online Status</strong>
                                <span>Let others see when you are active</span>
                            </div>
                            <ToggleSwitch settingKey="activityStatus" />
                        </div>
                        <div className="privacy-setting-row">
                            <div className="privacy-setting-info">
                                <strong>Change Password</strong>
                                <span>Update your account password</span>
                            </div>
                            <button className="privacy-action-btn">Change →</button>
                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="privacy-card danger-zone-card">
                    <div className="privacy-card-header">
                        <span className="privacy-section-icon">⚠️</span>
                        <h3>Danger Zone</h3>
                    </div>
                    <div className="privacy-settings-list">
                        <div className="privacy-setting-row">
                            <div className="privacy-setting-info">
                                <strong>Deactivate Account</strong>
                                <span>Temporarily hide your profile from all members</span>
                            </div>
                            <button className="privacy-action-btn warning-btn">Deactivate</button>
                        </div>
                        <div className="privacy-setting-row">
                            <div className="privacy-setting-info">
                                <strong>Delete Account</strong>
                                <span>Permanently delete all your data. This cannot be undone.</span>
                            </div>
                            <button className="privacy-action-btn danger-btn">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacySecurityPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './matches.css';
import '../profile/profile.css';
import backgroundImage from '../../assets/auth/vivah2.jpg';
import MatchCard from '../../components/MatchCard';
import { DUMMY_MATCHES } from './MatchesPage';

const RECEIVED_MOCK = [
    {
        id: 101,
        name: 'Sunita Mehra',
        age: 26,
        location: 'Mumbai, MH',
        status: 'pending',
        photo: 'https://i.pravatar.cc/150?u=Sunita'
    },
    {
        id: 102,
        name: 'Ananya Verma',
        age: 24,
        location: 'Delhi, DL',
        status: 'pending',
        photo: 'https://i.pravatar.cc/150?u=Ananya'
    }
];

const InterestsPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('received');
    const [sentInterests, setSentInterests] = useState([]);
    const [receivedInterests, setReceivedInterests] = useState([]);

    useEffect(() => {
        // Load sent interests from localStorage
        const sentIds = JSON.parse(localStorage.getItem('interests_sent_ids') || '[]');
        const filteredSent = DUMMY_MATCHES.filter(profile => sentIds.includes(profile.id));
        setSentInterests(filteredSent.map(p => ({ ...p, status: 'sent' })));

        // Initial load of received interests (mocking some that are not in localStorage yet)
        const savedReceived = JSON.parse(localStorage.getItem('interests_received_data') || 'null');
        setReceivedInterests(savedReceived || RECEIVED_MOCK);
    }, []);

    const saveReceived = (data) => {
        setReceivedInterests(data);
        localStorage.setItem('interests_received_data', JSON.stringify(data));
        window.dispatchEvent(new Event('storage'));
    };

    const handleAccept = (id) => {
        const newData = receivedInterests.map(item =>
            item.id === id ? { ...item, status: 'accepted' } : item
        );
        saveReceived(newData);
    };

    const handleReject = (id) => {
        const newData = receivedInterests.map(item =>
            item.id === id ? { ...item, status: 'rejected' } : item
        );
        saveReceived(newData);
    };

    const handleWithdraw = (id) => {
        const sentIds = JSON.parse(localStorage.getItem('interests_sent_ids') || '[]');
        const newIds = sentIds.filter(sid => sid !== id);
        localStorage.setItem('interests_sent_ids', JSON.stringify(newIds));
        setSentInterests(sentInterests.filter(p => p.id !== id));
        window.dispatchEvent(new Event('storage'));
    };

    const renderInterests = () => {
        const list = activeTab === 'received' ? receivedInterests : sentInterests;

        if (list.length === 0) {
            return (
                <div className="empty-matches">
                    <h3>No {activeTab} interests yet.</h3>
                    <p>{activeTab === 'received' ? "Your profile is being seen by matches. Sit tight!" : "Browse profiles and express your interest to start a conversation."}</p>
                    {activeTab === 'sent' && (
                        <button className="save-pill-button" onClick={() => navigate('/matches')} style={{ marginTop: '15px' }}>
                            Find Matches
                        </button>
                    )}
                </div>
            );
        }

        return (
            <div className="matches-grid full-width">
                {list.map(profile => (
                    <div className="match-card interest-card" key={profile.id}>
                        <div className="interest-header">
                            <div className="interest-photo">
                                <img src={profile.photo || `https://i.pravatar.cc/150?u=${profile.id}`} alt={profile.name} />
                            </div>
                            <div className="interest-basic-info">
                                <h4>{profile.name}</h4>
                                <span>{profile.age} yrs • {profile.location}</span>
                            </div>
                            <div className={`status-pill ${profile.status}`}>
                                {profile.status}
                            </div>
                        </div>

                        <div className="interest-actions">
                            {activeTab === 'received' && profile.status === 'pending' && (
                                <>
                                    <button className="interest-btn accept" onClick={() => handleAccept(profile.id)}>Accept</button>
                                    <button className="interest-btn reject" onClick={() => handleReject(profile.id)}>Reject</button>
                                </>
                            )}
                            {activeTab === 'sent' && (
                                <button className="interest-btn withdraw" onClick={() => handleWithdraw(profile.id)}>Withdraw</button>
                            )}
                            <button className="interest-btn view" onClick={() => navigate(`/matches/${profile.id}`)}>View Profile</button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="profile-page-wrapper">
            <div className="profile-background" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <div className="profile-background-overlay"></div>

            <div className="matches-page-container">
                <button className="edit-link-btn back-btn" onClick={() => navigate('/dashboard')}>
                    ← Back to Dashboard
                </button>

                <div className="dashboard-header center">
                    <h1>Manage Interests</h1>
                    <div className="tab-navigation">
                        <button
                            className={`tab-btn ${activeTab === 'received' ? 'active' : ''}`}
                            onClick={() => setActiveTab('received')}
                        >
                            Received ({receivedInterests.length})
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'sent' ? 'active' : ''}`}
                            onClick={() => setActiveTab('sent')}
                        >
                            Sent ({sentInterests.length})
                        </button>
                    </div>
                </div>

                <div className="interests-content">
                    {renderInterests()}
                </div>
            </div>
        </div>
    );
};

export default InterestsPage;

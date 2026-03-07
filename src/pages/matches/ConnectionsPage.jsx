import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../profile/profile.css';
import backgroundImage from '../../assets/auth/vivah2.jpg';

const mockConnections = [
    {
        id: 1,
        name: 'Priya Sharma',
        age: 26,
        city: 'Mumbai',
        profession: 'Software Engineer',
        img: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=200',
        status: 'online',
        connectedOn: 'Feb 28, 2026'
    },
    {
        id: 2,
        name: 'Anjali Reddy',
        age: 25,
        city: 'Hyderabad',
        profession: 'Doctor',
        img: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=200',
        status: 'offline',
        connectedOn: 'Mar 2, 2026'
    },
    {
        id: 3,
        name: 'Meera Kulkarni',
        age: 27,
        city: 'Pune',
        profession: 'Chartered Accountant',
        img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200',
        status: 'online',
        connectedOn: 'Mar 5, 2026'
    },
    {
        id: 4,
        name: 'Sneha Patil',
        age: 24,
        city: 'Nashik',
        profession: 'Teacher',
        img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
        status: 'offline',
        connectedOn: 'Mar 6, 2026'
    },
];

const ConnectionsPage = () => {
    const navigate = useNavigate();

    return (
        <div className="profile-page-wrapper services-mode">
            <div className="profile-background" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <div className="profile-background-overlay"></div>

            <div className="services-container-main">
                {/* Header */}
                <div className="services-header-glass">
                    <div className="back-button-circle" onClick={() => navigate('/dashboard')}>←</div>
                    <div className="services-header-title">
                        <h2>My Connections <span className="title-icon">🤝</span></h2>
                        <p>People who mutually accepted your interest.</p>
                    </div>
                    <div style={{ width: '45px' }}></div>
                </div>

                {/* Count Banner */}
                <div className="connections-banner">
                    <span className="connections-banner-count">{mockConnections.length}</span>
                    <span className="connections-banner-label">Total Connections</span>
                </div>

                {/* Connection Cards Grid */}
                <div className="connections-page-grid">
                    {mockConnections.map(person => (
                        <div key={person.id} className="connection-person-card">
                            <div className="cp-avatar-wrap">
                                <img src={person.img} alt={person.name} />
                                <span className={`cp-status-dot ${person.status}`}></span>
                            </div>
                            <div className="cp-info">
                                <h4>{person.name}</h4>
                                <p>{person.age} yrs • {person.city}</p>
                                <p className="cp-profession">{person.profession}</p>
                                <span className="cp-connected-date">Connected: {person.connectedOn}</span>
                            </div>
                            <div className="cp-actions">
                                <button className="cp-btn-chat" onClick={() => navigate('/messages')}>💬 Chat</button>
                                <button className="cp-btn-view" onClick={() => navigate('/matches')}>View</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ConnectionsPage;

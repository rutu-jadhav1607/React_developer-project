import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../profile/profile.css';
import backgroundImage from '../../assets/auth/vivah2.jpg';

const MapsPage = () => {
    const navigate = useNavigate();

    // Mock data for nearby matches
    const nearbyMatches = [
        {
            id: 1,
            name: "Snehal Patil",
            distance: "1.2 km away",
            age: 26,
            profession: "Software Engineer",
            img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
            top: "25%",
            left: "30%"
        },
        {
            id: 2,
            name: "Rahul Desai",
            distance: "3.5 km away",
            age: 28,
            profession: "Data Analyst",
            img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200",
            top: "60%",
            left: "65%"
        },
        {
            id: 3,
            name: "Priya Sharma",
            distance: "4.8 km away",
            age: 25,
            profession: "Doctor",
            img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
            top: "40%",
            left: "75%"
        }
    ];

    return (
        <div className="profile-page-wrapper maps-mode">
            <div className="profile-background" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <div className="profile-background-overlay"></div>

            <div className="maps-container-main">
                {/* Header Section */}
                <div className="maps-header-glass">
                    <div className="back-button-circle" onClick={() => navigate('/dashboard')}>←</div>
                    <div className="maps-header-title">
                        <h2>Nearby Matches <span className="location-pin">📍</span></h2>
                        <p>Discover potential matches currently in your area.</p>
                    </div>
                    <div style={{ width: '45px' }}></div> {/* Spacer for symmetry */}
                </div>

                {/* Map Interface Area */}
                <div className="map-view-area">
                    {/* Simulated Map Background */}
                    <div className="simulated-map-bg">
                        {/* Map Grid Lines for effect */}
                        <div className="map-grid-vertical"></div>
                        <div className="map-grid-horizontal"></div>
                        
                        {/* Simulated Current User Location */}
                        <div className="current-user-pulse">
                            <div className="pulse-ring"></div>
                            <div className="pulse-dot"></div>
                        </div>

                        {/* Floating Profile Cards */}
                        {nearbyMatches.map(match => (
                            <div 
                                key={match.id} 
                                className="map-profile-pin" 
                                style={{ top: match.top, left: match.left }}
                                onClick={() => navigate(`/matches/${match.id}`)}
                            >
                                <div className="pin-avatar">
                                    <img src={match.img} alt={match.name} />
                                </div>
                                <div className="pin-info-card">
                                    <h4>{match.name}, {match.age}</h4>
                                    <span className="pin-profession">{match.profession}</span>
                                    <span className="pin-distance">🚶 {match.distance}</span>
                                </div>
                                <div className="pin-pointer"></div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Floating Control Panel */}
                    <div className="map-controls-glass">
                        <div className="control-btn active">Live</div>
                        <div className="control-btn">Radius: 5km</div>
                        <div className="control-btn filter">Filters <span>⚙️</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapsPage;

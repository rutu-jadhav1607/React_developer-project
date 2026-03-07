import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../profile/profile.css';
import backgroundImage from '../../assets/auth/vivah2.jpg';

const MessagesPage = () => {
    const navigate = useNavigate();

    const chats = [
        { id: 1, name: "Snehal Patil", msg: "Hi, I liked your profile...", time: "2m ago", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150" },
        { id: 2, name: "Priya Sharma", msg: "Are you interested in...", time: "1h ago", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150" },
        { id: 3, name: "Anjali Deshmukh", msg: "Thank you for the interest!", time: "Yesterday", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150" }
    ];

    return (
        <div className="profile-page-wrapper">
            <div className="profile-background" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <div className="profile-background-overlay"></div>

            <div className="dashboard-container" style={{ marginTop: '40px', padding: '0 20px' }}>
                <div className="section-header-flex" style={{ marginBottom: '30px' }}>
                    <div className="back-button-circle" onClick={() => navigate('/dashboard')} style={{ 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '50%', 
                        background: 'white', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        cursor: 'pointer',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        color: '#800000',
                        fontSize: '1.2rem'
                    }}>←</div>
                    <div className="matchmaking-title" style={{ margin: 0, fontSize: '1.5rem' }}>Messages</div>
                    <div style={{ width: '40px' }}></div> {/* Spacer for symmetry */}
                </div>

                <div className="recent-chats-list">
                    {chats.map(chat => (
                        <div key={chat.id} className="chat-item-card" onClick={() => navigate(`/messages/${chat.id}`)}>
                            <div className="chat-avatar">
                                <img src={chat.img} alt={chat.name} />
                                <span className="online-status"></span>
                            </div>
                            <div className="chat-details">
                                <div className="chat-name-time">
                                    <span className="chat-name">{chat.name}</span>
                                    <span className="chat-time">{chat.time}</span>
                                </div>
                                <p className="chat-msg-snippet">{chat.msg}</p>
                            </div>
                        </div>
                    ))}
                </div>
                
                {chats.length === 0 && (
                    <div className="empty-state" style={{ textAlign: 'center', marginTop: '60px', color: '#888' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>💬</div>
                        <h3>No messages yet</h3>
                        <p>When you start chatting with matches, they'll appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessagesPage;

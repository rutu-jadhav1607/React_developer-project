import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../profile/profile.css';
import backgroundImage from '../../assets/auth/vivah2.jpg';

const MessagesPage = () => {
    const navigate = useNavigate();
    const [activeChatId, setActiveChatId] = useState(1);
    const [newMessage, setNewMessage] = useState('');

    const chats = [
        { 
            id: 1, 
            name: "Snehal Patil", 
            status: "Online",
            msg: "Hi, I liked your profile...", 
            time: "2m ago", 
            img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150",
            messages: [
                { id: 1, text: "Hello! I saw your profile on Shubh Vivah.", sender: 'them', time: "10:00 AM" },
                { id: 2, text: "Hi Snehal! Thank you for reaching out.", sender: 'me', time: "10:05 AM" },
                { id: 3, text: "I really liked your interests. Would love to know more.", sender: 'them', time: "10:07 AM" },
                { id: 4, text: "Sure, I'd love to chat more too!", sender: 'me', time: "10:10 AM" },
                { id: 5, text: "Hi, I liked your profile...", sender: 'them', time: "10:12 AM" }
            ]
        },
        { 
            id: 2, 
            name: "Priya Sharma", 
            status: "Last seen 1h ago",
            msg: "Are you interested in...", 
            time: "1h ago", 
            img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150",
            messages: [
                { id: 1, text: "Hi there!", sender: 'them', time: "Yesterday" },
                { id: 2, text: "Are you interested in a quick call sometime?", sender: 'them', time: "Yesterday" }
            ]
        },
        { 
            id: 3, 
            name: "Anjali Deshmukh", 
            status: "Online",
            msg: "Thank you for the interest!", 
            time: "Yesterday", 
            img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150",
            messages: [
                { id: 1, text: "Thank you for the interest!", sender: 'them', time: "Yesterday" }
            ]
        }
    ];

    const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            // In a real app, we'd update state/backend here
            setNewMessage('');
        }
    };

    return (
        <div className="profile-page-wrapper chat-page-mode">
            <div className="profile-background" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <div className="profile-background-overlay"></div>

            <div className="whatsapp-chat-container">
                {/* Sidebar */}
                <div className="chat-sidebar">
                    <div className="sidebar-header">
                        <div className="back-btn-chat" onClick={() => navigate('/dashboard')}>←</div>
                        <h3>Messages</h3>
                    </div>
                    
                    <div className="chat-search-wrap">
                        <input type="text" placeholder="Search matches..." className="chat-search-input" />
                    </div>

                    <div className="sidebar-chat-list">
                        {chats.map(chat => (
                            <div 
                                key={chat.id} 
                                className={`sidebar-chat-item ${activeChatId === chat.id ? 'active' : ''}`}
                                onClick={() => setActiveChatId(chat.id)}
                            >
                                <div className="chat-avatar-small">
                                    <img src={chat.img} alt={chat.name} />
                                    {chat.status === 'Online' && <span className="status-dot"></span>}
                                </div>
                                <div className="chat-item-info">
                                    <div className="item-name-time">
                                        <span className="item-name">{chat.name}</span>
                                        <span className="item-time">{chat.time}</span>
                                    </div>
                                    <p className="item-msg-peek">{chat.msg}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Chat Window */}
                <div className="chat-main-window">
                    {activeChat ? (
                        <>
                            <div className="chat-window-header">
                                <div className="header-user-info">
                                    <img src={activeChat.img} alt={activeChat.name} className="header-avatar" />
                                    <div className="header-text">
                                        <h4>{activeChat.name}</h4>
                                        <span className="user-status">{activeChat.status}</span>
                                    </div>
                                </div>
                                <div className="header-actions">
                                    <span className="action-btn">📞</span>
                                    <span className="action-btn">📹</span>
                                    <span className="action-btn">⋮</span>
                                </div>
                            </div>

                            <div className="chat-messages-area">
                                {activeChat.messages.map(m => (
                                    <div key={m.id} className={`message-bubble-row ${m.sender}`}>
                                        <div className="message-bubble">
                                            <p>{m.text}</p>
                                            <span className="msg-time">{m.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="chat-input-footer">
                                <form className="chat-input-form" onSubmit={handleSendMessage}>
                                    <button type="button" className="attach-btn">+</button>
                                    <input 
                                        type="text" 
                                        placeholder="Type a message..." 
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        className="message-input-field"
                                    />
                                    <button type="submit" className="send-msg-btn">➤</button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="no-chat-selected">
                            <div className="empty-chat-icon">💬</div>
                            <h3>Select a match to start chatting</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessagesPage;

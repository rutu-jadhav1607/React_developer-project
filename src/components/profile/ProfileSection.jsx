import React from 'react';

const ChevronDown = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
);

const ChevronUp = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
);

const CheckCircle = ({ size = 20, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
);

const Lock = ({ size = 20, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
);

const Hourglass = ({ size = 20, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 22h14" /><path d="M5 2h14" /><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" /><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 1 17 6.172V2" /></svg>
);

const ProfileSection = ({
    title,
    status, // 'completed', 'in-progress', 'locked'
    isOpen,
    onToggle,
    children,
    progress
}) => {
    const isLocked = status === 'locked';
    const isCompleted = status === 'completed';

    return (
        <div className={`profile-section-card ${isLocked ? 'section-locked' : ''} ${isOpen ? 'section-active' : ''} ${isCompleted ? 'section-completed' : ''}`}>
            <div
                className="section-header"
                onClick={() => !isLocked && onToggle()}
                style={{ cursor: isLocked ? 'not-allowed' : 'pointer' }}
            >
                <div className="section-header-left">
                    <div className="status-icon">
                        {status === 'completed' && <CheckCircle size={20} color="#28a745" />}
                        {status === 'in-progress' && <Hourglass size={20} color="#ffc107" />}
                        {status === 'locked' && <Lock size={20} color="#6c757d" />}
                    </div>
                    <div className="section-title-wrapper">
                        <span className="section-name">{title}</span>
                        {progress !== undefined && <span className="section-progress-text">{progress}%</span>}
                    </div>
                </div>
                <div className="section-header-right">
                    <div className="status-text">
                        {status === 'completed' && <span className="status-completed">✔ Completed</span>}
                        {status === 'in-progress' && <span className="status-progress">⏳ In Progress</span>}
                        {status === 'locked' && <span className="status-locked">🔒 Locked</span>}
                    </div>
                    {!isLocked && (isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />)}
                </div>
            </div>
            {isOpen && !isLocked && (
                <div className="section-content">
                    {children}
                </div>
            )}
        </div>
    );
};

export default ProfileSection;

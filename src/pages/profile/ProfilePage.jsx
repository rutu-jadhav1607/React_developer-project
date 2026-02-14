import React, { useState, useEffect, useRef } from 'react';
import './profile.css';
import backgroundImage from '../../assets/auth/vivah2.jpg';
import ProfileSection from '../../components/profile/ProfileSection';
import BasicInfoSection from '../../components/profile/BasicInfoSection';
import ReligiousInfoSection from '../../components/profile/ReligiousInfoSection';
import EducationalCareerSection from '../../components/profile/EducationalCareerSection';
import FamilyInfoSection from '../../components/profile/FamilyInfoSection';
import LifestyleHabitsSection from '../../components/profile/LifestyleHabitsSection';

const ProfilePage = () => {
    const [activeSection, setActiveSection] = useState(1);
    const [totalProgress, setTotalProgress] = useState(0);
    const formRef = useRef(null);

    const [sectionsStatus, setSectionsStatus] = useState({
        1: 'in-progress',
        2: 'locked',
        3: 'locked',
        4: 'locked',
        5: 'locked'
    });

    const handleSectionComplete = (step) => {
        setSectionsStatus(prev => {
            const updated = { ...prev };
            updated[step] = 'completed';

            const nextStep = step + 1;
            if (nextStep <= 5 && updated[nextStep] === 'locked') {
                updated[nextStep] = 'in-progress';
                setActiveSection(nextStep);
            }

            // Recalculate total progress
            const completedCount = Object.values(updated).filter(s => s === 'completed').length;
            setTotalProgress(completedCount * 20);

            return updated;
        });
    };

    const toggleSection = (step) => {
        if (sectionsStatus[step] === 'locked') return;
        setActiveSection(activeSection === step ? null : step);
    };

    const handleGlobalSubmit = () => {
        // Find the active form and trigger its submit button
        if (formRef.current) {
            const activeForm = formRef.current.querySelector('.section-form-inner');
            if (activeForm) {
                activeForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
            }
        }
    };

    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (totalProgress / 100) * circumference;

    return (
        <div className="profile-page-wrapper">
            <div className="profile-background" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <div className="profile-background-overlay"></div>

            <div className="profile-card">
                {/* Header Progress Section */}
                <div className="profile-header-section">
                    <div className="circular-progress-wrapper">
                        <svg>
                            <circle className="bg-circle" cx="50" cy="50" r={radius} />
                            <circle
                                className="progress-circle"
                                cx="50" cy="50" r={radius}
                                style={{ strokeDasharray: circumference, strokeDashoffset }}
                            />
                        </svg>
                        <div className="progress-pct-text">{totalProgress}%</div>
                    </div>
                    <div className="header-text-info">
                        <h2>Complete Your Profile</h2>
                        <p>Profiles with more details get better matches</p>
                    </div>
                </div>

                <div className="profile-form-container" ref={formRef}>
                    <div className="profile-accordion-container">
                        <ProfileSection
                            title="Basic Information"
                            status={sectionsStatus[1]}
                            isOpen={activeSection === 1}
                            onToggle={() => toggleSection(1)}
                        >
                            <BasicInfoSection onComplete={() => handleSectionComplete(1)} />
                        </ProfileSection>

                        <ProfileSection
                            title="Religious Information"
                            status={sectionsStatus[2]}
                            isOpen={activeSection === 2}
                            onToggle={() => toggleSection(2)}
                        >
                            <ReligiousInfoSection onComplete={() => handleSectionComplete(2)} />
                        </ProfileSection>

                        <ProfileSection
                            title="Educational & Career Information"
                            status={sectionsStatus[3]}
                            isOpen={activeSection === 3}
                            onToggle={() => toggleSection(3)}
                        >
                            <EducationalCareerSection onComplete={() => handleSectionComplete(3)} />
                        </ProfileSection>

                        <ProfileSection
                            title="Family Details"
                            status={sectionsStatus[4]}
                            isOpen={activeSection === 4}
                            onToggle={() => toggleSection(4)}
                        >
                            <FamilyInfoSection onComplete={() => handleSectionComplete(4)} />
                        </ProfileSection>

                        <ProfileSection
                            title="Lifestyle Habits"
                            status={sectionsStatus[5]}
                            isOpen={activeSection === 5}
                            onToggle={() => toggleSection(5)}
                        >
                            <LifestyleHabitsSection onComplete={() => handleSectionComplete(5)} isLastSection={true} />
                        </ProfileSection>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

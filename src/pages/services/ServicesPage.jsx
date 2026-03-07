import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../profile/profile.css';

// Import all required assets
import backgroundImage from '../../assets/auth/vivah2.jpg';
import cateringImg from '../../assets/auth/wedding-food.jpeg';
import mehendiImg from '../../assets/auth/wedding-mehndi.jpeg';
import jewelleryImg from '../../assets/auth/wedding-jewellery.jpeg';
import photographyImg from '../../assets/auth/wedding-couple.jpeg';
import venueImg from '../../assets/auth/wedding-venue.jpeg';

const ServicesPage = () => {
    const navigate = useNavigate();

    const services = [
        {
            id: 'catering',
            title: 'Catering Services',
            description: 'Exquisite culinary experiences for your special day.',
            image: cateringImg,
            icon: '🍽️'
        },
        {
            id: 'mehendi',
            title: 'Mehendi & Makeup',
            description: 'Professional artists to make you shine.',
            image: mehendiImg,
            icon: '🎨'
        },
        {
            id: 'jewellery',
            title: 'Bridal Jewellery',
            description: 'Stunning collections for the perfect matrimonial look.',
            image: jewelleryImg,
            icon: '💎'
        },
        {
            id: 'photography',
            title: 'Photography',
            description: 'Capture your timeless memories perfectly.',
            image: photographyImg,
            icon: '📸'
        },
        {
            id: 'venue',
            title: 'Wedding Venues',
            description: 'Beautiful locations for your dream wedding.',
            image: venueImg,
            icon: '🏰'
        }
    ];

    return (
        <div className="profile-page-wrapper services-mode">
            <div className="profile-background" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <div className="profile-background-overlay"></div>

            <div className="services-container-main">
                <div className="services-header-glass">
                    <div className="back-button-circle" onClick={() => navigate('/dashboard')}>←</div>
                    <div className="services-header-title">
                        <h2>Wedding Services <span className="title-icon">✨</span></h2>
                        <p>Discover premium vendors for your special day.</p>
                    </div>
                    <div style={{ width: '45px' }}></div> {/* Spacer for symmetry */}
                </div>

                <div className="services-grid-wrapper">
                    <div className="services-masonry-grid">
                        {services.map((service, index) => (
                            <div key={service.id} className={`service-display-card item-${index}`}>
                                <div className="service-img-overlay"></div>
                                <img src={service.image} alt={service.title} className="service-bg-img" />
                                
                                <div className="service-card-content">
                                    <div className="service-icon-badge">{service.icon}</div>
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                    <button className="explore-service-btn">Explore Vendors</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;

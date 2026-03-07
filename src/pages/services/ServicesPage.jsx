import React, { useState } from 'react';
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
            icon: '🍽️',
            baseFollowers: 1240,
            badge: 'Top Rated'
        },
        {
            id: 'mehendi',
            title: 'Mehendi & Makeup',
            description: 'Professional artists to make you shine.',
            image: mehendiImg,
            icon: '🎨',
            baseFollowers: 875,
            badge: 'Trending'
        },
        {
            id: 'jewellery',
            title: 'Bridal Jewellery',
            description: 'Stunning collections for the perfect matrimonial look.',
            image: jewelleryImg,
            icon: '💎',
            baseFollowers: 2100,
            badge: 'Premium'
        },
        {
            id: 'photography',
            title: 'Photography',
            description: 'Capture your timeless memories perfectly.',
            image: photographyImg,
            icon: '📸',
            baseFollowers: 1560,
            badge: 'Popular'
        },
        {
            id: 'venue',
            title: 'Wedding Venues',
            description: 'Beautiful locations for your dream wedding.',
            image: venueImg,
            icon: '🏰',
            baseFollowers: 930,
            badge: 'New'
        }
    ];

    const [followed, setFollowed] = useState({});

    const toggleFollow = (e, serviceId) => {
        e.stopPropagation(); // prevent card click/navigate
        setFollowed(prev => ({ ...prev, [serviceId]: !prev[serviceId] }));
    };

    const getFollowerCount = (service) => {
        const count = service.baseFollowers + (followed[service.id] ? 1 : 0);
        return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count;
    };

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
                    <div style={{ width: '45px' }}></div>
                </div>

                <div className="services-grid-wrapper">
                    <div className="services-masonry-grid">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className={`service-display-card item-${index}`}
                                onClick={() => navigate(`/services/${service.id}`)}
                            >
                                <div className="service-img-overlay"></div>
                                <img src={service.image} alt={service.title} className="service-bg-img" />

                                {/* Badge top-left */}
                                <div className="service-category-badge">{service.badge}</div>

                                {/* Follow button top-right */}
                                <button
                                    className={`service-follow-btn ${followed[service.id] ? 'followed' : ''}`}
                                    onClick={(e) => toggleFollow(e, service.id)}
                                >
                                    {followed[service.id] ? '✔ Following' : '+ Follow'}
                                </button>

                                <div className="service-card-content">
                                    <div className="service-icon-badge">{service.icon}</div>
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>

                                    {/* Follower count */}
                                    <div className="service-followers-row">
                                        <span className="service-followers-icon">👥</span>
                                        <span className="service-followers-count">{getFollowerCount(service)} followers</span>
                                    </div>

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


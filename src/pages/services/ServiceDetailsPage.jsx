import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../profile/profile.css';

// Reuse local assets for core images and add safe unsplash mocks for galleries
import cateringImg from '../../assets/auth/wedding-food.jpeg';
import mehendiImg from '../../assets/auth/wedding-mehndi.jpeg';
import jewelleryImg from '../../assets/auth/wedding-jewellery.jpeg';
import photographyImg from '../../assets/auth/wedding-couple.jpeg';
import venueImg from '../../assets/auth/wedding-venue.jpeg';

const serviceDataStore = {
    catering: {
        title: 'Premium Catering Services',
        coverImage: cateringImg,
        rating: 4.9,
        reviews: 128,
        experience: '15+ Years',
        priceRange: '₹500 - ₹2,500 per plate',
        description: 'We offer an exquisite culinary journey for your special day. From traditional authentic thalis to modern fusion cuisine, our master chefs curate menus that leave a lasting impression on your guests.',
        features: ['Customizable Menus', 'Live Counters', 'Premium Waitstaff', 'Tasting Sessions'],
        gallery: [
            cateringImg,
            'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=400',
            'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=400',
            'https://images.unsplash.com/photo-1547496502-affa22d38842?q=80&w=400'
        ],
        testimonials: [
            { id: 1, name: 'Aditi M.', text: 'The food was the highlight of our wedding! Everyone loved the live chaat counter.', rating: 5 },
            { id: 2, name: 'Rohan K.', text: 'Professional service and incredible taste. Highly recommended.', rating: 5 }
        ]
    },
    mehendi: {
        title: 'Bridal Mehendi & Makeup Artistry',
        coverImage: mehendiImg,
        rating: 4.8,
        reviews: 94,
        experience: '8 Years',
        priceRange: '₹15,000 - ₹50,000 Package',
        description: 'Specializing in intricate traditional and contemporary Mehendi designs. Our HD and Airbrush makeup artists ensure you look flawless and radiant from morning rituals to the evening reception.',
        features: ['Organic Heena', 'Airbrush Makeup', 'Pre-wedding Trials', 'Bridal Party Packages'],
        gallery: [
            mehendiImg,
            'https://images.unsplash.com/photo-1595963592864-884d4ae822ba?q=80&w=400',
            'https://images.unsplash.com/photo-1589786411266-9deff6e077c5?q=80&w=400',
            'https://images.unsplash.com/photo-1621217646142-b8ec11abccf5?q=80&w=400'
        ],
        testimonials: [
            { id: 1, name: 'Pooja V.', text: 'The intricate details of my bridal mehendi were stunning. It stained so dark!', rating: 5 },
            { id: 2, name: 'Shruti S.', text: 'Makeup stayed intact all night despite the tears. Thank you!', rating: 4 }
        ]
    },
    jewellery: {
        title: 'Heritage Bridal Jewellery',
        coverImage: jewelleryImg,
        rating: 4.9,
        reviews: 215,
        experience: 'Est. 1985',
        priceRange: 'Custom Pricing',
        description: 'Explore our breathtaking collection of handcrafted Polki, Kundan, and Antique Gold jewellery. We offer both bespoke purchasing and premium rental options for your big day.',
        features: ['Lifetime Polish Guarantee', 'Custom Designs', 'Rental Options Available', 'Certified Gemstones'],
        gallery: [
            jewelleryImg,
            'https://images.unsplash.com/photo-1515562141207-7a8efdb2ce04?q=80&w=400',
            'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=400',
            'https://images.unsplash.com/photo-1629813583685-2e6f21223292?q=80&w=400'
        ],
        testimonials: [
            { id: 1, name: 'Neha R.', text: 'The Kundan set I rented was in pristine condition. Looked like a million bucks.', rating: 5 }
        ]
    },
    photography: {
        title: 'Timeless Photography & Cinematography',
        coverImage: photographyImg,
        rating: 4.7,
        reviews: 156,
        experience: '12 Years',
        priceRange: '₹80,000 - ₹3,00,000',
        description: 'We do not just take photos; we capture emotions. Our candid photography and cinematic wedding films ensure your memories are preserved beautifully for generations.',
        features: ['Candid Photography', 'Cinematic Teasers', 'Drone Shoots', 'Premium Photobooks'],
        gallery: [
            photographyImg,
            'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=400',
            'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400',
            'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=400'
        ],
        testimonials: [
            { id: 1, name: 'Rahul & Sneha', text: 'They made us feel so comfortable. The candid shots are just magical.', rating: 5 }
        ]
    },
    venue: {
        title: 'Royal Heritage Venues',
        coverImage: venueImg,
        rating: 4.6,
        reviews: 89,
        experience: 'Premium Properties',
        priceRange: '₹5L - ₹20L per day',
        description: 'From sprawling green lawns and poolside areas to grand crystal ballrooms, our venues offer the perfect luxurious backdrop for your intimate ceremonies and grand receptions.',
        features: ['In-house Decor', 'Valet Parking', 'Bridal Suites', 'Power Backup'],
        gallery: [
            venueImg,
            'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=400',
            'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400',
            'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=400'
        ],
        testimonials: [
            { id: 1, name: 'Mr. Sharma', text: 'The banquet hall was spacious and the decor team brought our vision to life.', rating: 4 }
        ]
    }
};

const ServiceDetailsPage = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();
    const service = serviceDataStore[serviceId];

    // Added state to hold the 'uploaded' dummy photo
    const [userPhotos, setUserPhotos] = useState([]);
    
    // Simulate photo upload
    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // For mock purposes, just add a dummy unsplash image
            const newPhotoUrl = URL.createObjectURL(file);
            setUserPhotos([...userPhotos, newPhotoUrl]);
        }
    };

    if (!service) {
        return (
            <div className="profile-page-wrapper">
                <div className="no-chat-selected">
                    <h2>Service Not Found</h2>
                    <button className="back-btn-chat" onClick={() => navigate('/services')}>Go Back</button>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page-wrapper service-details-mode">
            <div className="sd-container">
                {/* Hero Section */}
                <div className="sd-hero">
                    <img src={service.coverImage} alt={service.title} className="sd-hero-image" />
                    <div className="sd-hero-overlay"></div>
                    <div className="sd-back-btn" onClick={() => navigate('/services')}>
                        ← Back to Services
                    </div>
                    <div className="sd-hero-content">
                        <h1>{service.title}</h1>
                    </div>
                </div>

                {/* Quick Stats Bar */}
                <div className="sd-stats-bar">
                    <div className="sd-stat-item">
                        <span className="sd-stat-icon">⭐</span>
                        <div className="sd-stat-text">
                            <strong>{service.rating} / 5</strong>
                            <span>{service.reviews} Reviews</span>
                        </div>
                    </div>
                    <div className="sd-stat-item">
                        <span className="sd-stat-icon">🏆</span>
                        <div className="sd-stat-text">
                            <strong>Experience</strong>
                            <span>{service.experience}</span>
                        </div>
                    </div>
                    <div className="sd-stat-item">
                        <span className="sd-stat-icon">💳</span>
                        <div className="sd-stat-text">
                            <strong>Pricing</strong>
                            <span>{service.priceRange}</span>
                        </div>
                    </div>
                </div>

                <div className="sd-content-grid">
                    {/* Left Column: Details */}
                    <div className="sd-main-details">
                        <div className="sd-section card-glass">
                            <h3>About the Service</h3>
                            <p>{service.description}</p>
                            
                            <h4>What's Included</h4>
                            <ul className="sd-features-list">
                                {service.features.map((feature, idx) => (
                                    <li key={idx}>✅ {feature}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="sd-section card-glass">
                            <div className="sd-section-header">
                                <h3>Photo Gallery</h3>
                                <label className="upload-photo-btn">
                                    📸 Upload Photo
                                    <input type="file" accept="image/*" onChange={handlePhotoUpload} hidden />
                                </label>
                            </div>
                            <div className="sd-gallery-grid">
                                {service.gallery.map((imgUrl, idx) => (
                                    <div key={idx} className="sd-gallery-item">
                                        <img src={imgUrl} alt="Gallery item" />
                                    </div>
                                ))}
                                {/* Render uploaded photos */}
                                {userPhotos.map((imgUrl, idx) => (
                                    <div key={`user-${idx}`} className="sd-gallery-item user-uploaded">
                                        <img src={imgUrl} alt="User Uploaded" />
                                        <span className="uploaded-badge">Yours</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="sd-section card-glass">
                            <h3>Client Reviews</h3>
                            <div className="sd-reviews-list">
                                {service.testimonials.map(review => (
                                    <div key={review.id} className="sd-review-card">
                                        <div className="review-header">
                                            <div className="reviewer-avatar">{review.name.charAt(0)}</div>
                                            <div className="reviewer-info">
                                                <h5>{review.name}</h5>
                                                <div className="review-stars">
                                                    {'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}
                                                </div>
                                            </div>
                                        </div>
                                        <p>"{review.text}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sticky Action Box */}
                    <div className="sd-sidebar">
                        <div className="sd-action-box card-glass">
                            <h3>Ready to book?</h3>
                            <p>Contact this premium vendor to check availability and get a precise quote for your date.</p>
                            <button className="sd-primary-btn">Contact Vendor</button>
                            <button className="sd-secondary-btn">Save to Shortlist</button>
                            
                            <hr className="sd-divider" />
                            <div className="sd-guarantee">
                                <span className="guarantee-icon">🛡️</span>
                                <div>
                                    <strong>Shubh Vivah Verified</strong>
                                    <span>Background checked and approved premium vendor.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailsPage;

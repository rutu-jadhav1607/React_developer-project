import React, { useState } from 'react';
import './matches.css';
import '../profile/profile.css';
import backgroundImage from '../../assets/auth/vivah2.jpg';
import MatchCard from '../../components/MatchCard';

export const DUMMY_MATCHES = [
    {
        id: 1,
        name: 'Rohan Malhotra',
        age: 28,
        height: "5'11\"",
        religion: 'Hindu, Punjabi',
        education: 'MBA Finance',
        location: 'Mumbai, MH',
        matchPct: 88
    },
    {
        id: 2,
        name: 'Amit Patel',
        age: 30,
        height: "5'9\"",
        religion: 'Hindu, Gujarati',
        education: 'Software Architect',
        location: 'Ahmedabad, GJ',
        matchPct: 92
    },
    {
        id: 3,
        name: 'Sahil Deshmukh',
        age: 29,
        height: "5'10\"",
        religion: 'Hindu, Maratha',
        education: 'IAS Officer',
        location: 'Pune, MH',
        matchPct: 75
    },
    {
        id: 4,
        name: 'Vikram Singh',
        age: 27,
        height: "6'0\"",
        religion: 'Hindu, Rajput',
        education: 'Pilot',
        location: 'Delhi, NCR',
        matchPct: 82
    },
    {
        id: 5,
        name: 'Arjun Nair',
        age: 31,
        height: "5'11\"",
        religion: 'Hindu, Nair',
        education: 'Product Manager',
        location: 'Bangalore, KA',
        matchPct: 68
    },
    {
        id: 6,
        name: 'Karan Kulkarni',
        age: 28,
        height: "5'8\"",
        religion: 'Hindu, Brahmin',
        education: 'Chartered Accountant',
        location: 'Nashik, MH',
        matchPct: 90
    },
    {
        id: 7,
        name: 'Siddharth Verma',
        age: 29,
        height: "5'10\"",
        religion: 'Hindu, Kayastha',
        education: 'Software Engineer',
        location: 'Hyderabad, TG',
        matchPct: 85
    },
    {
        id: 8,
        name: 'Aditya Rao',
        age: 30,
        height: "5'11\"",
        religion: 'Hindu, Brahmin',
        education: 'Doctor (MD)',
        location: 'Chennai, TN',
        matchPct: 78
    }
];

const MatchesPage = () => {
    const [matches] = useState(DUMMY_MATCHES);

    return (
        <div className="profile-page-wrapper">
            <div className="profile-background" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <div className="profile-background-overlay"></div>

            <div className="matches-page-container">
                <div className="dashboard-header">
                    <h1>Your Potential Matches</h1>
                    <p>Profiles selected based on your preferences</p>
                </div>

                <div className="matches-layout">
                    {/* Filters Sidebar - Sticky/Full Height */}
                    <aside className="filters-sidebar">
                        <h3>Refine Search</h3>

                        <div className="filter-group">
                            <label>Age Range</label>
                            <select className="filter-select">
                                <option>21 - 25</option>
                                <option>26 - 30</option>
                                <option>31 - 35</option>
                                <option>36 - 40</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Religion</label>
                            <select className="filter-select" defaultValue="Hindu">
                                <option value="Hindu">Hindu</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Location</label>
                            <input type="text" className="filter-input" placeholder="e.g. Mumbai, Pune" />
                        </div>

                        <div className="filter-group">
                            <label>Education</label>
                            <select className="filter-select">
                                <option>All Degrees</option>
                                <option>Bachelors</option>
                                <option>Masters</option>
                                <option>Doctorate</option>
                            </select>
                        </div>

                        <button className="save-pill-button" style={{ width: '100%', padding: '12px', marginTop: '10px' }}>Apply Filters</button>
                    </aside>

                    {/* Matches Grid - Responsive Content */}
                    <main className="matches-grid">
                        {matches.length > 0 ? (
                            matches.map(profile => (
                                <MatchCard key={profile.id} profile={profile} />
                            ))
                        ) : (
                            <div className="empty-matches">
                                <h3>No matches found.</h3>
                                <p>Try adjusting your filters to see more profiles.</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default MatchesPage;

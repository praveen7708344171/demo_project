import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, GraduationCap, IndianRupee, AlertTriangle, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import MobileNav from '../components/MobileNav';
import StatCard from '../components/StatCard';
import ScholarshipCard from '../components/ScholarshipCard';
import ProgressBar from '../components/ProgressBar';
import './Dashboard.css';

const scholarships = [
    { id: 1, name: 'Central Sector Scholarship Scheme', provider: 'Ministry of Education, Govt. of India', amount: 'Rs. 25,000', category: 'govt', daysLeft: 3, match: '6/6', saved: false },
    { id: 2, name: 'Tata Trust Education Grant', provider: 'Tata Trusts', amount: 'Rs. 50,000', category: 'private', daysLeft: 12, match: '5/6', saved: true },
    { id: 3, name: 'PM Scholarship for SC/ST Students', provider: 'Ministry of Social Justice', amount: 'Rs. 36,000', category: 'govt', daysLeft: 5, match: '6/6', saved: false },
    { id: 4, name: 'Pratibha Kiran Scholarship', provider: 'MP State Government', amount: 'Rs. 40,000', category: 'govt', daysLeft: 23, match: '6/6', saved: false },
    { id: 5, name: 'Azim Premji Foundation Grant', provider: 'Azim Premji Foundation', amount: 'Rs. 1,00,000', category: 'ngo', daysLeft: 45, match: '5/6', saved: false },
    { id: 6, name: 'College Merit Scholarship', provider: 'Anna University', amount: 'Rs. 15,000', category: 'college', daysLeft: 18, match: '4/6', saved: false },
];

const filters = ['All', 'Government', 'Private', 'NGO', 'College'];

export default function Dashboard() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const urgentScholarships = scholarships.filter(s => s.daysLeft <= 7);
    const filtered = scholarships.filter(s => {
        if (activeFilter !== 'All') {
            const cat = activeFilter.toLowerCase();
            if (cat === 'government' && s.category !== 'govt') return false;
            if (cat !== 'government' && s.category !== cat) return false;
        }
        if (searchQuery) return s.name.toLowerCase().includes(searchQuery.toLowerCase());
        return true;
    });

    return (
        <div className="dashboard-page">
            <Navbar variant="dashboard" />

            <div className="container" style={{ paddingTop: 24, paddingBottom: 100 }}>
                {/* Welcome Banner */}
                <div className="welcome-banner">
                    <div className="welcome-banner__left">
                        <h2 className="welcome-banner__greeting">Good evening, Ravi</h2>
                        <p className="welcome-banner__sub">You qualify for scholarships worth</p>
                        <p className="welcome-banner__amount text-number">Rs. 1,40,000</p>
                        <p className="welcome-banner__meta">across 18 matched scholarships</p>
                    </div>
                    <div className="welcome-banner__right hide-mobile">
                        <div className="profile-ring">
                            <svg viewBox="0 0 120 120" width="120" height="120">
                                <circle cx="60" cy="60" r="52" fill="none" stroke="#2A2A40" strokeWidth="8" />
                                <circle cx="60" cy="60" r="52" fill="none" stroke="#FF6B35" strokeWidth="8"
                                    strokeDasharray={`${85 * 3.27} ${100 * 3.27}`}
                                    strokeLinecap="round" transform="rotate(-90 60 60)" />
                            </svg>
                            <span className="profile-ring__text">85%<br /><small>Profile</small></span>
                        </div>
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="grid-4 stat-grid">
                    <StatCard icon={<GraduationCap size={22} />} number="18" label="Scholarships Found" color="var(--color-primary)" />
                    <StatCard icon={<IndianRupee size={22} />} number="Rs. 1,40,000" label="Potential Value" color="var(--color-secondary)" />
                    <StatCard icon={<AlertTriangle size={22} />} number="3" label="Due This Week" color="var(--color-danger)" />
                    <StatCard icon={<CheckCircle size={22} />} number="Rs. 35,000" label="Amount Received" color="var(--color-success)" />
                </div>

                {/* Urgent */}
                {urgentScholarships.length > 0 && (
                    <div className="urgent-section">
                        <div className="urgent-header">
                            <span className="urgent-badge">URGENT</span>
                            <h3>Apply before it's too late</h3>
                        </div>
                        <div className="urgent-cards">
                            {urgentScholarships.map(s => (
                                <ScholarshipCard key={s.id} scholarship={s} compact />
                            ))}
                        </div>
                    </div>
                )}

                {/* Filter Bar */}
                <div className="filter-bar">
                    <div className="filter-bar__search">
                        <Search size={18} className="filter-bar__search-icon" />
                        <input
                            className="filter-bar__input"
                            placeholder="Search scholarships..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="filter-pills">
                        {filters.map(f => (
                            <button
                                key={f}
                                className={`filter-pill ${activeFilter === f ? 'filter-pill--active' : ''}`}
                                onClick={() => setActiveFilter(f)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Scholarship Grid */}
                <div className="scholarship-grid">
                    {filtered.map((s, i) => (
                        <div key={s.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
                            <ScholarshipCard scholarship={s} />
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="empty-state">
                            <div className="empty-state__icon">🔍</div>
                            <h3>No scholarships match this filter</h3>
                            <p className="text-small">Try a different category or update your profile</p>
                            <button className="btn btn-ghost" onClick={() => setActiveFilter('All')}>Clear Filters</button>
                        </div>
                    )}
                </div>
            </div>

            <MobileNav />
        </div>
    );
}

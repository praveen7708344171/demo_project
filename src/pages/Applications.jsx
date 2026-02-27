import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, LayoutGrid } from 'lucide-react';
import Navbar from '../components/Navbar';
import MobileNav from '../components/MobileNav';
import { StatusBadge, CategoryBadge } from '../components/Badge';
import Button from '../components/Button';
import './Applications.css';

const apps = [
    { id: 1, name: 'Central Sector Scholarship', provider: 'Ministry of Education', amount: 'Rs. 25,000', category: 'govt', status: 'applied', date: 'Feb 15, 2025' },
    { id: 2, name: 'Tata Trust Education Grant', provider: 'Tata Trusts', amount: 'Rs. 50,000', category: 'private', status: 'pending', date: 'Feb 10, 2025' },
    { id: 3, name: 'PM Scholarship SC/ST', provider: 'Ministry of Social Justice', amount: 'Rs. 36,000', category: 'govt', status: 'received', date: 'Jan 28, 2025' },
    { id: 4, name: 'Pratibha Kiran Scholarship', provider: 'MP State Government', amount: 'Rs. 40,000', category: 'govt', status: 'applied', date: 'Feb 5, 2025' },
    { id: 5, name: 'Azim Premji Foundation Grant', provider: 'Azim Premji Foundation', amount: 'Rs. 1,00,000', category: 'ngo', status: 'saved', date: '—' },
    { id: 6, name: 'HDFC Badhte Kadam', provider: 'HDFC Bank', amount: 'Rs. 30,000', category: 'private', status: 'received', date: 'Dec 20, 2024' },
    { id: 7, name: 'College Merit Award', provider: 'Anna University', amount: 'Rs. 15,000', category: 'college', status: 'applied', date: 'Feb 18, 2025' },
    { id: 8, name: 'NTSE Scholarship', provider: 'NCERT', amount: 'Rs. 12,000', category: 'govt', status: 'saved', date: '—' },
    { id: 9, name: 'Vidyasaarathi Scholarship', provider: 'NSDL', amount: 'Rs. 10,000', category: 'private', status: 'pending', date: 'Feb 1, 2025' },
];

const statusFilters = ['All', 'Saved', 'Applied', 'Pending', 'Received', 'Rejected'];
const accents = { govt: '#4CAF50', private: '#9B59B6', ngo: '#2EC4B6', college: '#3498DB' };

export default function Applications() {
    const [filter, setFilter] = useState('All');
    const [view, setView] = useState('list');
    const navigate = useNavigate();

    const filtered = filter === 'All' ? apps : apps.filter(a => a.status === filter.toLowerCase());
    const counts = {};
    statusFilters.forEach(s => {
        counts[s] = s === 'All' ? apps.length : apps.filter(a => a.status === s.toLowerCase()).length;
    });

    const totalApplied = apps.filter(a => ['applied', 'pending', 'received'].includes(a.status)).length;
    const totalReceived = apps.filter(a => a.status === 'received').length;

    return (
        <div className="applications-page">
            <Navbar variant="dashboard" />
            <div className="container" style={{ paddingTop: 24, paddingBottom: 100 }}>
                <h2 style={{ marginBottom: 20 }}>My Applications</h2>

                {/* Summary */}
                <div className="app-summary">
                    <div className="app-summary-pill"><strong>{totalApplied}</strong> Applied</div>
                    <div className="app-summary-pill"><strong>{totalReceived}</strong> Received</div>
                    <div className="app-summary-pill"><strong>Rs. 35,000</strong> Received</div>
                    <div className="app-summary-pill"><strong>{totalReceived > 0 ? Math.round((totalReceived / totalApplied) * 100) : 0}%</strong> Success Rate</div>
                </div>

                {/* Status tabs + view toggle */}
                <div className="app-controls">
                    <div className="status-tabs">
                        {statusFilters.map(s => (
                            <button key={s} className={`status-tab ${filter === s ? 'status-tab--active' : ''}`}
                                onClick={() => setFilter(s)}>
                                {s} <span className="status-tab__count">{counts[s]}</span>
                            </button>
                        ))}
                    </div>
                    <div className="view-toggle">
                        <button className={`view-btn ${view === 'list' ? 'view-btn--active' : ''}`} onClick={() => setView('list')}><List size={18} /></button>
                        <button className={`view-btn ${view === 'board' ? 'view-btn--active' : ''}`} onClick={() => setView('board')}><LayoutGrid size={18} /></button>
                    </div>
                </div>

                {/* List View */}
                {view === 'list' && (
                    <div className="app-list">
                        {filtered.map((a, i) => (
                            <div key={a.id} className="app-row animate-fade-in" style={{ animationDelay: `${i * 40}ms`, borderLeftColor: accents[a.category] }}>
                                <div className="app-row__main">
                                    <h4 className="app-row__name">{a.name}</h4>
                                    <span className="text-small">{a.provider}</span>
                                </div>
                                <span className="app-row__amount text-number">{a.amount}</span>
                                <StatusBadge status={a.status} />
                                <span className="app-row__date text-small">{a.date}</span>
                                <Button variant="ghost" size="small" onClick={() => navigate(`/scholarship/${a.id}`)}>View</Button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Board View */}
                {view === 'board' && (
                    <div className="kanban-board">
                        {['Saved', 'Applied', 'Pending', 'Received', 'Rejected'].map(col => {
                            const items = apps.filter(a => a.status === col.toLowerCase());
                            return (
                                <div key={col} className="kanban-col">
                                    <div className="kanban-col__header">
                                        <span>{col}</span>
                                        <span className="kanban-count">{items.length}</span>
                                    </div>
                                    {items.map(a => (
                                        <div key={a.id} className="kanban-card" style={{ borderLeftColor: accents[a.category] }}>
                                            <h4 className="kanban-card__name">{a.name}</h4>
                                            <span className="text-small">{a.provider}</span>
                                            <span className="kanban-card__amount text-number">{a.amount}</span>
                                        </div>
                                    ))}
                                    {items.length === 0 && <div className="kanban-empty">No items</div>}
                                </div>
                            );
                        })}
                    </div>
                )}

                {filtered.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-state__icon">📋</div>
                        <h3>You haven't applied to anything yet</h3>
                        <p className="text-small">You have 18 scholarships waiting for you</p>
                        <Button onClick={() => navigate('/dashboard')}>Browse Scholarships</Button>
                    </div>
                )}
            </div>
            <MobileNav />
        </div>
    );
}

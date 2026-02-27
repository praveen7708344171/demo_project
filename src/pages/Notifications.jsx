import { useState } from 'react';
import { Clock, Bell, Gift, AlertTriangle, Settings } from 'lucide-react';
import Navbar from '../components/Navbar';
import MobileNav from '../components/MobileNav';
import NotificationCard from '../components/NotificationCard';
import Button from '../components/Button';
import './Notifications.css';

const notifs = [
    { type: 'deadline', title: 'Deadline in 3 days!', body: 'Central Sector Scholarship closes on March 31. Apply now to not miss out.', time: '2h ago', unread: true, icon: <Clock size={16} />, date: 'Today' },
    { type: 'match', title: 'New scholarship matched!', body: 'Tata Trust Education Grant — Rs. 50,000. You match 5/6 criteria.', time: '4h ago', unread: true, icon: <Bell size={16} />, date: 'Today' },
    { type: 'received', title: 'Congratulations! 🎉', body: 'You received Rs. 36,000 from PM Scholarship for SC/ST Students.', time: '1d ago', unread: true, icon: <Gift size={16} />, date: 'Yesterday' },
    { type: 'reminder', title: 'Document reminder', body: 'Upload your income certificate for Pratibha Kiran Scholarship.', time: '1d ago', unread: false, icon: <AlertTriangle size={16} />, date: 'Yesterday' },
    { type: 'deadline', title: 'Only 5 days left', body: 'PM Scholarship SC/ST — deadline approaching fast. Complete your application.', time: '2d ago', unread: false, icon: <Clock size={16} />, date: 'This Week' },
    { type: 'system', title: 'Profile update needed', body: 'Adding your 12th marks will unlock 4 more scholarships for you.', time: '3d ago', unread: false, icon: <Settings size={16} />, date: 'This Week' },
    { type: 'match', title: '3 new scholarships!', body: 'We found 3 new scholarships based on your updated profile.', time: '4d ago', unread: false, icon: <Bell size={16} />, date: 'This Week' },
    { type: 'reminder', title: 'Weekly scholarship digest', body: 'You have 18 matched scholarships, 3 due this week. Review them now.', time: '5d ago', unread: false, icon: <AlertTriangle size={16} />, date: 'This Week' },
];

const filters = ['All', 'Unread', 'Deadlines', 'New Matches', 'Updates'];

export default function Notifications() {
    const [filter, setFilter] = useState('All');

    const filtered = notifs.filter(n => {
        if (filter === 'All') return true;
        if (filter === 'Unread') return n.unread;
        if (filter === 'Deadlines') return n.type === 'deadline';
        if (filter === 'New Matches') return n.type === 'match';
        if (filter === 'Updates') return n.type === 'system' || n.type === 'reminder';
        return true;
    });

    const grouped = {};
    filtered.forEach(n => {
        if (!grouped[n.date]) grouped[n.date] = [];
        grouped[n.date].push(n);
    });

    return (
        <div className="notifications-page">
            <Navbar variant="dashboard" />
            <div className="container" style={{ paddingTop: 24, paddingBottom: 100 }}>
                <div className="notif-header">
                    <h2>Notifications</h2>
                    <Button variant="ghost" size="small">Mark all read</Button>
                </div>

                <div className="notif-filters">
                    {filters.map(f => (
                        <button key={f} className={`filter-pill ${filter === f ? 'filter-pill--active' : ''}`}
                            onClick={() => setFilter(f)}>
                            {f}
                        </button>
                    ))}
                </div>

                <div className="notif-list">
                    {Object.entries(grouped).map(([date, items]) => (
                        <div key={date} className="notif-group">
                            <span className="text-label">{date}</span>
                            <div className="notif-group__items">
                                {items.map((n, i) => (
                                    <NotificationCard key={i} {...n} />
                                ))}
                            </div>
                        </div>
                    ))}

                    {filtered.length === 0 && (
                        <div className="empty-state">
                            <div className="empty-state__icon">🔔</div>
                            <h3>You're all caught up</h3>
                            <p className="text-small">We'll notify you before every deadline</p>
                        </div>
                    )}
                </div>
            </div>
            <MobileNav />
        </div>
    );
}

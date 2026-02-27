import { Home, FileText, Bell as BellIcon, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './MobileNav.css';

const navItems = [
    { to: '/dashboard', icon: Home, label: 'Home' },
    { to: '/applications', icon: FileText, label: 'Applications' },
    { to: '/notifications', icon: BellIcon, label: 'Notifications' },
    { to: '/profile', icon: User, label: 'Profile' },
];

export default function MobileNav() {
    return (
        <div className="mobile-nav hide-desktop">
            {navItems.map(item => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) => `mobile-nav__item ${isActive ? 'mobile-nav__item--active' : ''}`}
                >
                    <item.icon size={22} />
                    <span>{item.label}</span>
                </NavLink>
            ))}
        </div>
    );
}

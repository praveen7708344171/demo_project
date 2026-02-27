import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Bell } from 'lucide-react';
import Avatar from './Avatar';
import Button from './Button';
import './Navbar.css';

export default function Navbar({ variant = 'landing' }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isLanding = variant === 'landing';
    const isAdmin = variant === 'admin';

    const dashLinks = [
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/applications', label: 'Applications' },
        { to: '/notifications', label: 'Notifications' },
    ];

    const adminLinks = [
        { to: '/admin', label: 'Dashboard' },
        { to: '/admin/scholarships', label: 'Scholarships' },
        { to: '/admin/students', label: 'Students' },
    ];

    const landingLinks = [
        { to: '/', label: 'Home' },
        { to: '#how-it-works', label: 'How it Works' },
        { to: '#features', label: 'Features' },
        { to: '#about', label: 'About' },
    ];

    const links = isAdmin ? adminLinks : isLanding ? landingLinks : dashLinks;

    return (
        <nav className="navbar">
            <div className="navbar__inner container">
                <Link to={isAdmin ? '/admin' : isLanding ? '/' : '/dashboard'} className="navbar__logo">
                    <span className="logo-scholar">Scholar</span>
                    <span className="logo-match">Match</span>
                    {isAdmin && <span className="admin-badge">ADMIN</span>}
                </Link>

                <div className={`navbar__links hide-mobile`}>
                    {links.map(link => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`navbar__link ${location.pathname === link.to ? 'navbar__link--active' : ''}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="navbar__right">
                    {isLanding ? (
                        <>
                            <Button variant="ghost" className="hide-mobile" onClick={() => navigate('/login')}>Login</Button>
                            <Button variant="primary" size="small" onClick={() => navigate('/register')}>Get Started</Button>
                        </>
                    ) : (
                        <>
                            <button className="navbar__bell hide-mobile" onClick={() => navigate('/notifications')}>
                                <Bell size={20} />
                                <span className="navbar__bell-badge">3</span>
                            </button>
                            <div className="navbar__avatar hide-mobile" onClick={() => navigate('/profile')}>
                                <Avatar name={isAdmin ? 'Admin' : 'Ravi'} size={36} />
                            </div>
                        </>
                    )}
                    <button className="navbar__hamburger hide-desktop" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="navbar__mobile-menu">
                    {links.map(link => (
                        <Link key={link.to} to={link.to} className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                            {link.label}
                        </Link>
                    ))}
                    {isLanding && (
                        <>
                            <Link to="/login" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>Login</Link>
                            <Link to="/register" className="navbar__mobile-link navbar__mobile-link--cta" onClick={() => setMenuOpen(false)}>Get Started</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}

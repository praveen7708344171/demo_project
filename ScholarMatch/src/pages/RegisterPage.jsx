import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import Button from '../components/Button';
import InputField from '../components/InputField';
import './AuthPage.css';

export default function RegisterPage() {
    const navigate = useNavigate();
    const [role, setRole] = useState('student');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate('/profile');
        }, 1500);
    };

    return (
        <div className="auth-page">
            <div className="auth-left hide-mobile">
                <div className="auth-left__content">
                    <Link to="/" className="auth-logo">
                        <span style={{ color: '#FFFFFF' }}>Scholar</span>
                        <span style={{ color: '#FF6B35' }}>Match</span>
                    </Link>
                    <h1 className="auth-left__headline">
                        The scholarship guide<br />nobody gave us.
                    </h1>
                    <p className="auth-left__sub">
                        Built for first-generation students who deserve
                        every opportunity — without needing a guide.
                    </p>
                    <div className="auth-benefits">
                        <div className="auth-benefit"><Check size={18} color="#06D6A0" /> Find all scholarships in 2 minutes</div>
                        <div className="auth-benefit"><Check size={18} color="#06D6A0" /> Never miss a deadline again</div>
                        <div className="auth-benefit"><Check size={18} color="#06D6A0" /> Guidance in your language</div>
                    </div>
                    <div className="auth-testimonial">
                        <div className="auth-testimonial__quote">
                            "ScholarMatch found me Rs. 50,000 in scholarships I didn't know existed."
                        </div>
                        <div className="auth-testimonial__author">— Priya Sharma, Bihar</div>
                    </div>
                </div>
            </div>

            <div className="auth-right">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-form__header">
                        <h2>Create your account</h2>
                        <p className="text-small">Takes less than a minute</p>
                    </div>

                    <div className="auth-form__fields">
                        <InputField label="Full Name" placeholder="Enter your full name" name="name" />
                        <InputField label="College Email" type="email" placeholder="you@college.edu" name="email" />
                        <InputField label="Mobile Number" placeholder="+91 98765 43210" name="phone" />
                        <InputField label="Password" type="password" placeholder="Create a strong password" name="password" />
                        <InputField label="Confirm Password" type="password" placeholder="Re-enter password" name="confirmPassword" />

                        <div className="role-selector">
                            <button type="button" className={`role-pill ${role === 'student' ? 'role-pill--active' : ''}`}
                                onClick={() => setRole('student')}>Student</button>
                            <button type="button" className={`role-pill ${role === 'admin' ? 'role-pill--active' : ''}`}
                                onClick={() => setRole('admin')}>Admin</button>
                        </div>
                    </div>

                    <Button variant="primary" fullWidth loading={loading} type="submit">
                        Create Account
                    </Button>

                    <div className="auth-divider">
                        <span>or</span>
                    </div>

                    <button type="button" className="google-btn" onClick={() => navigate('/profile')}>
                        <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                        Continue with Google
                    </button>

                    <p className="auth-switch">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

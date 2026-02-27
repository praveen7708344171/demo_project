import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Footer from '../components/Footer';
import {
    Search, X as XIcon, Map, HelpCircle, UserX,
    Sparkles, MessageCircle, Clock, FileCheck, Languages, Heart,
    Star, ArrowRight, Eye, BookOpen, Moon, Globe, Check
} from 'lucide-react';
import Avatar from '../components/Avatar';
import './LandingPage.css';

const problems = [
    { icon: <Search size={24} />, title: "You don't know it exists", body: "Scholarships are scattered across 100+ websites. Nobody tells you which ones are for you." },
    { icon: <Map size={24} />, title: "Nobody shows you the way", body: "Government jargon. Missing document lists. Deadlines nobody reminds you about." },
    { icon: <UserX size={24} />, title: "The system wasn't built for you", body: "English only. No regional languages. No screen readers. No 2G support. Built for the privileged." },
];

const steps = [
    { num: 1, title: 'Fill Your Profile', sub: '60 seconds', body: 'Answer a few simple questions about yourself — your state, caste, income, field of study. That\'s it.' },
    { num: 2, title: 'Get Matched Instantly', sub: 'automatic', body: 'Our system checks 3,000+ scholarships and finds every single one you qualify for. Zero guesswork.' },
    { num: 3, title: 'Apply & Track', sub: 'guided', body: 'Step-by-step instructions, document checklists, and deadline reminders. We hold your hand through it.' },
];

const features = [
    { icon: <Sparkles size={22} />, title: 'Smart Matching', desc: 'AI finds every scholarship you qualify for based on your profile', color: '#FF6B35' },
    { icon: <MessageCircle size={22} />, title: 'AI Chatbot Sakhi', desc: 'Ask anything about scholarships in your own language', color: '#2EC4B6' },
    { icon: <Clock size={22} />, title: 'Deadline Alerts', desc: 'Never miss a deadline with smart reminders', color: '#EF476F' },
    { icon: <FileCheck size={22} />, title: 'Document Checklist', desc: 'Know exactly which documents to prepare', color: '#06D6A0' },
    { icon: <Languages size={22} />, title: '10 Languages', desc: 'Use ScholarMatch in your mother tongue', color: '#9B59B6' },
    { icon: <Heart size={22} />, title: 'Completely Free', desc: 'No ads. No paid listings. Free forever.', color: '#FFD166' },
];

const testimonials = [
    { name: 'Priya Sharma', course: 'B.Tech, CSE — Bihar', quote: 'I found 12 scholarships I never knew existed. ScholarMatch literally changed my life. I got Rs. 50,000 for my first year.', avatar: 'Priya' },
    { name: 'Arjun Patel', course: 'BA Economics — Gujarat', quote: 'The chatbot helped me fill my application in Gujarati. For the first time, I didn\'t need anyone\'s help to apply.', avatar: 'Arjun' },
    { name: 'Kavitha R.', course: 'BSc Nursing — Tamil Nadu', quote: 'The deadline alerts saved me. I almost missed a Rs. 25,000 scholarship. Now I have reminders for everything.', avatar: 'Kavitha' },
];

const a11yModes = [
    { icon: <Eye size={24} />, label: 'Visual Mode' },
    { icon: <BookOpen size={24} />, label: 'Dyslexia Mode' },
    { icon: <Moon size={24} />, label: 'Dark Mode' },
    { icon: <Globe size={24} />, label: 'Language Mode' },
];

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            <Navbar variant="landing" />

            {/* Hero */}
            <section className="hero section-alt">
                <div className="container-narrow text-center">
                    <div className="hero__pill">
                        <span className="hero__pill-dot" />
                        Trusted by 50,000+ students
                    </div>
                    <h1 className="text-display hero__headline">
                        Find Every Scholarship<br />You Deserve.
                    </h1>
                    <p className="hero__subtext">
                        One profile. Instant match. Zero confusion.<br />
                        Stop missing out on scholarships that were
                        always meant for you.
                    </p>
                    <div className="hero__buttons">
                        <Button onClick={() => navigate('/register')}>Find My Scholarships</Button>
                        <Button variant="secondary" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
                            See How It Works
                        </Button>
                    </div>
                    <div className="hero__stats">
                        <div className="hero__stat">
                            <span className="hero__stat-number text-number">Rs. 5,000 Cr+</span>
                            <span className="hero__stat-label">Available</span>
                        </div>
                        <div className="hero__stat-divider" />
                        <div className="hero__stat">
                            <span className="hero__stat-number text-number">3,000+</span>
                            <span className="hero__stat-label">Scholarships</span>
                        </div>
                        <div className="hero__stat-divider" />
                        <div className="hero__stat">
                            <span className="hero__stat-number text-number">2 Minutes</span>
                            <span className="hero__stat-label">to Match</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem */}
            <section className="section">
                <div className="container">
                    <span className="section-label">THE PROBLEM</span>
                    <h2 className="text-h1" style={{ maxWidth: 560, marginBottom: 40 }}>
                        Rs. 5,000 crore goes unclaimed every year. Here is why.
                    </h2>
                    <div className="grid-3">
                        {problems.map((p, i) => (
                            <div key={i} className="problem-card animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                                <div className="problem-card__icon">{p.icon}</div>
                                <h4 className="problem-card__title">{p.title}</h4>
                                <p className="problem-card__body">{p.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="section section-alt" id="how-it-works">
                <div className="container">
                    <span className="section-label">HOW IT WORKS</span>
                    <h2 className="text-h1" style={{ marginBottom: 48 }}>Three steps. That's it.</h2>
                    <div className="steps">
                        {steps.map((s, i) => (
                            <div key={i} className="step animate-fade-in-up" style={{ animationDelay: `${i * 120}ms` }}>
                                <div className="step__number">{s.num}</div>
                                <div className="step__content">
                                    <div className="step__header">
                                        <h3 className="text-h3">{s.title}</h3>
                                        <span className="step__sub">{s.sub}</span>
                                    </div>
                                    <p className="text-small">{s.body}</p>
                                </div>
                                {i < steps.length - 1 && <div className="step__connector" />}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="section" id="features">
                <div className="container">
                    <span className="section-label">FEATURES</span>
                    <h2 className="text-h1" style={{ marginBottom: 48 }}>
                        Everything you need.<br />Nothing you don't.
                    </h2>
                    <div className="grid-2 features-grid">
                        {features.map((f, i) => (
                            <div key={i} className="feature-card animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                                <div className="feature-card__icon" style={{ background: `${f.color}15`, color: f.color }}>
                                    {f.icon}
                                </div>
                                <div>
                                    <h4 className="text-h4">{f.title}</h4>
                                    <p className="text-small">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Accessibility Strip */}
            <section className="a11y-strip">
                <div className="container">
                    <div className="a11y-strip__inner">
                        <div className="a11y-strip__text">
                            <span className="text-label" style={{ color: '#7A7A9A' }}>BUILT FOR EVERYONE</span>
                            <h2 style={{ color: '#FFFFFF', marginTop: 8 }}>
                                The only scholarship platform<br />designed for every student.
                            </h2>
                            <p style={{ color: '#7A7A9A', marginTop: 12, maxWidth: 420 }}>
                                Screen readers, dyslexia fonts, 10 languages, and high contrast modes.
                                Because education is for everyone.
                            </p>
                        </div>
                        <div className="a11y-strip__modes">
                            {a11yModes.map((m, i) => (
                                <div key={i} className="a11y-mode">
                                    {m.icon}
                                    <span>{m.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section section-alt">
                <div className="container">
                    <span className="section-label">TESTIMONIALS</span>
                    <h2 className="text-h1" style={{ marginBottom: 40 }}>Students love ScholarMatch.</h2>
                    <div className="grid-3">
                        {testimonials.map((t, i) => (
                            <div key={i} className="testimonial-card animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                                <div className="testimonial-stars">
                                    {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="#FF6B35" stroke="#FF6B35" />)}
                                </div>
                                <p className="testimonial-quote">"{t.quote}"</p>
                                <div className="testimonial-author">
                                    <Avatar name={t.avatar} size={40} />
                                    <div>
                                        <span className="testimonial-name">{t.name}</span>
                                        <span className="testimonial-course">{t.course}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="section cta-section text-center">
                <div className="container-narrow">
                    <h2 className="text-h1">Start finding your scholarships today.</h2>
                    <p className="text-small" style={{ marginTop: 12, marginBottom: 32 }}>
                        Free forever. No ads. No paid listings.
                    </p>
                    <Button onClick={() => navigate('/register')} className="cta-btn">
                        Find My Scholarships <ArrowRight size={18} />
                    </Button>
                    <p className="text-small" style={{ marginTop: 16 }}>Join 50,000+ students</p>
                </div>
            </section>

            <Footer />
        </div>
    );
}

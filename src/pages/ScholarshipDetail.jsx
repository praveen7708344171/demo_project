import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Users, GraduationCap, CheckCircle, XCircle, Download, Bookmark } from 'lucide-react';
import Navbar from '../components/Navbar';
import MobileNav from '../components/MobileNav';
import { CategoryBadge, DeadlineBadge } from '../components/Badge';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';
import './ScholarshipDetail.css';

const eligibility = [
    { label: 'Category', yours: 'OBC', required: 'SC/ST/OBC', pass: true },
    { label: 'Income', yours: 'Rs. 2,00,000', required: 'Below Rs. 4,50,000', pass: true },
    { label: 'Marks (12th)', yours: '78%', required: 'Above 60%', pass: true },
    { label: 'Education Level', yours: 'Undergraduate', required: 'UG/PG', pass: true },
    { label: 'Domicile', yours: 'Bihar', required: 'All States', pass: true },
    { label: 'Field of Study', yours: 'Engineering', required: 'All Fields', pass: true },
];

const documents = [
    { name: 'Aadhar Card', hint: 'Download from uidai.gov.in', done: false },
    { name: 'Income Certificate', hint: 'Apply at your district office', done: false },
    { name: 'Caste Certificate', hint: 'Available at district magistrate office', done: false },
    { name: '10th Marksheet', hint: 'From your school or board website', done: false },
    { name: '12th Marksheet', hint: 'From your school or board website', done: false },
    { name: 'College Admission Proof', hint: 'Get from your college office', done: false },
    { name: 'Bank Passbook (first page)', hint: 'Photo of first page with details', done: false },
];

const applySteps = [
    { title: 'Create account on National Scholarship Portal', desc: 'Go to scholarships.gov.in and create a new account using your Aadhar number and mobile.' },
    { title: 'Fill the application form', desc: 'Enter your personal, academic, and family details. Most of this is already in your ScholarMatch profile.' },
    { title: 'Upload required documents', desc: 'Scan and upload all 7 documents listed in the Documents tab. PDF format, under 200KB each.' },
    { title: 'Verify and submit', desc: 'Review all details carefully. Once submitted, you cannot edit. You will receive an application number.' },
    { title: 'Institute verification', desc: 'Your college will verify your application. Contact your scholarship cell if it takes more than 7 days.' },
];

const mistakes = [
    'Uploading blurry document scans',
    'Mismatching Aadhar name with bank account name',
    'Forgetting to get institute verification before deadline',
];

export default function ScholarshipDetail() {
    const navigate = useNavigate();
    const [tab, setTab] = useState('overview');
    const [docs, setDocs] = useState(documents);
    const [saved, setSaved] = useState(false);
    const tabs = ['Overview', 'Eligibility', 'Documents', 'How to Apply'];
    const docsReady = docs.filter(d => d.done).length;

    return (
        <div className="detail-page">
            <Navbar variant="dashboard" />
            <div className="container" style={{ paddingTop: 24, paddingBottom: 100 }}>
                <button className="back-btn" onClick={() => navigate('/dashboard')}>
                    <ArrowLeft size={18} /> Back to Dashboard
                </button>

                {/* Hero Card */}
                <div className="detail-hero" style={{ borderLeftColor: '#4CAF50' }}>
                    <div className="detail-hero__top">
                        <div className="detail-hero__provider-info">
                            <div className="provider-logo">MEI</div>
                            <span className="text-small">Ministry of Education, Govt. of India</span>
                        </div>
                        <CategoryBadge type="govt" />
                    </div>
                    <h1 className="detail-hero__name">Central Sector Scholarship Scheme for College and University Students</h1>
                    <p className="detail-hero__amount text-number">Rs. 25,000</p>
                    <p className="text-small" style={{ marginTop: -8, marginBottom: 16 }}>per year, renewable for entire course duration</p>
                    <div className="detail-chips">
                        <div className="detail-chip"><Calendar size={14} /> Deadline: March 31, 2025</div>
                        <div className="detail-chip detail-chip--danger"><Clock size={14} /> 23 days remaining</div>
                        <div className="detail-chip"><Users size={14} /> Open to All States</div>
                        <div className="detail-chip"><GraduationCap size={14} /> Engineering Students</div>
                    </div>
                </div>

                {/* Match Score */}
                <div className="match-card">
                    <div className="match-card__header">
                        <span className="text-label">Your Eligibility Match</span>
                        <span className="match-score-badge">6/6</span>
                    </div>
                    <ProgressBar value={100} color="var(--color-success)" />
                </div>

                {/* Tabs */}
                <div className="detail-tabs">
                    {tabs.map(t => (
                        <button key={t} className={`detail-tab ${tab === t.toLowerCase().replace(/ /g, '') ? 'detail-tab--active' : ''}`}
                            onClick={() => setTab(t.toLowerCase().replace(/ /g, ''))}>
                            {t}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="detail-content">
                    {tab === 'overview' && (
                        <div className="animate-fade-in">
                            <p style={{ marginBottom: 24, lineHeight: 1.7 }}>
                                The Central Sector Scheme of Scholarship for College and University students is implemented by the Ministry of Education.
                                Every year, 82,000 fresh scholarships (41,000 for boys and 41,000 for girls) are awarded to meritorious students from
                                low-income families to enable them to pursue higher education. The scholarship amount is directly transferred to the student's bank account.
                            </p>
                            <h4 style={{ marginBottom: 12 }}>Key Highlights</h4>
                            <div className="highlights-list">
                                <div className="highlight-item"><CheckCircle size={16} color="var(--color-success)" /> Direct bank transfer — no middlemen</div>
                                <div className="highlight-item"><CheckCircle size={16} color="var(--color-success)" /> No interview required</div>
                                <div className="highlight-item"><CheckCircle size={16} color="var(--color-success)" /> Results announced within 3 months</div>
                                <div className="highlight-item"><CheckCircle size={16} color="var(--color-success)" /> Renewable for entire duration of course</div>
                                <div className="highlight-item"><CheckCircle size={16} color="var(--color-success)" /> Rs. 20,000 at UG level, Rs. 25,000 at PG level</div>
                            </div>
                        </div>
                    )}

                    {tab === 'eligibility' && (
                        <div className="animate-fade-in">
                            <div className="elig-table">
                                {eligibility.map((e, i) => (
                                    <div key={i} className="elig-row">
                                        <span className="elig-label">{e.label}</span>
                                        <span className="elig-yours">{e.yours}</span>
                                        <span className="elig-required">{e.required}</span>
                                        <span className="elig-status">
                                            {e.pass ? <CheckCircle size={18} color="var(--color-success)" /> : <XCircle size={18} color="var(--color-danger)" />}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {tab === 'documents' && (
                        <div className="animate-fade-in">
                            <h4>Get these ready before applying</h4>
                            <p className="text-small" style={{ margin: '8px 0 16px' }}>{docsReady} of {docs.length} documents ready</p>
                            <ProgressBar value={(docsReady / docs.length) * 100} />
                            <div className="doc-list">
                                {docs.map((d, i) => (
                                    <label key={i} className="doc-item">
                                        <input type="checkbox" checked={d.done} onChange={() => {
                                            const next = [...docs]; next[i] = { ...d, done: !d.done }; setDocs(next);
                                        }} />
                                        <div className="doc-item__content">
                                            <span className={`doc-item__name ${d.done ? 'doc-item__name--done' : ''}`}>{d.name}</span>
                                            <span className="doc-item__hint">{d.hint}</span>
                                        </div>
                                        {d.done && <CheckCircle size={18} color="var(--color-success)" />}
                                    </label>
                                ))}
                            </div>
                            <Button variant="ghost" style={{ marginTop: 16 }}><Download size={16} /> Download Checklist PDF</Button>
                        </div>
                    )}

                    {tab === 'howtoapply' && (
                        <div className="animate-fade-in">
                            <div className="time-pill">⏱ Estimated time: 25 minutes</div>
                            <div className="apply-steps">
                                {applySteps.map((s, i) => (
                                    <div key={i} className="apply-step">
                                        <div className="apply-step__number">{i + 1}</div>
                                        <div className="apply-step__content">
                                            <h4>{s.title}</h4>
                                            <p className="text-small">{s.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mistakes-section">
                                <h4 style={{ marginBottom: 12 }}>Common Mistakes to Avoid</h4>
                                {mistakes.map((m, i) => (
                                    <div key={i} className="mistake-item">
                                        <XCircle size={16} color="var(--color-danger)" /> {m}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Sticky bottom bar mobile */}
            <div className="detail-sticky-bar hide-desktop">
                <span className="detail-sticky-amount text-number">Rs. 25,000</span>
                <div className="flex gap-sm">
                    <Button variant="ghost" size="small" onClick={() => setSaved(!saved)}>
                        <Bookmark size={16} fill={saved ? 'currentColor' : 'none'} /> {saved ? 'Saved' : 'Save'}
                    </Button>
                    <Button size="small">Apply Now</Button>
                </div>
            </div>

            <MobileNav />
        </div>
    );
}

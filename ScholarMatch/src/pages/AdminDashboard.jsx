import { useState } from 'react';
import { Users, GraduationCap, FileText, AlertTriangle, Edit, Plus, Eye } from 'lucide-react';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { CategoryBadge, DeadlineBadge } from '../components/Badge';
import './AdminDashboard.css';

const expiringScholarships = [
    { name: 'Central Sector Scholarship', deadline: 'Mar 31', matched: 342, applied: 89 },
    { name: 'PM Scholarship SC/ST', deadline: 'Mar 28', matched: 567, applied: 201 },
    { name: 'Pratibha Kiran', deadline: 'Apr 2', matched: 189, applied: 45 },
    { name: 'HDFC Badhte Kadam', deadline: 'Apr 5', matched: 234, applied: 78 },
    { name: 'College Merit Award', deadline: 'Apr 8', matched: 145, applied: 56 },
];

const chartDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const chartValues = [45, 62, 38, 89, 72, 55, 94];
const maxVal = Math.max(...chartValues);

export default function AdminDashboard() {
    const [showForm, setShowForm] = useState(false);
    const [formTab, setFormTab] = useState('basic');

    return (
        <div className="admin-page">
            <Navbar variant="admin" />
            <div className="container" style={{ paddingTop: 24, paddingBottom: 48 }}>
                <div className="admin-header">
                    <div>
                        <h2>Good evening, Admin</h2>
                        <p className="text-small">Here's what's happening today</p>
                    </div>
                    <Button onClick={() => setShowForm(!showForm)}>
                        <Plus size={18} /> Add Scholarship
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid-4 stat-grid">
                    <StatCard icon={<Users size={22} />} number="1,247" label="Total Students" color="#3498DB" />
                    <StatCard icon={<GraduationCap size={22} />} number="50" label="Total Scholarships" color="var(--color-primary)" />
                    <StatCard icon={<FileText size={22} />} number="89" label="Applications Today" color="var(--color-success)" />
                    <StatCard icon={<AlertTriangle size={22} />} number="5" label="Expiring This Week" color="var(--color-danger)" />
                </div>

                {/* Charts */}
                <div className="admin-charts">
                    <div className="chart-card">
                        <h4 className="chart-title">Student Registrations</h4>
                        <p className="text-small">Last 7 days</p>
                        <div className="bar-chart">
                            {chartValues.map((v, i) => (
                                <div key={i} className="bar-col">
                                    <div className="bar-fill" style={{ height: `${(v / maxVal) * 100}%` }}>
                                        <span className="bar-value">{v}</span>
                                    </div>
                                    <span className="bar-label">{chartDays[i]}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="chart-card">
                        <h4 className="chart-title">Scholarship Categories</h4>
                        <p className="text-small">Distribution</p>
                        <div className="donut-container">
                            <svg viewBox="0 0 120 120" width="160" height="160">
                                <circle cx="60" cy="60" r="45" fill="none" stroke="#4CAF50" strokeWidth="16" strokeDasharray="85 198" strokeDashoffset="0" />
                                <circle cx="60" cy="60" r="45" fill="none" stroke="#9B59B6" strokeWidth="16" strokeDasharray="56 227" strokeDashoffset="-85" />
                                <circle cx="60" cy="60" r="45" fill="none" stroke="#2EC4B6" strokeWidth="16" strokeDasharray="42 241" strokeDashoffset="-141" />
                                <circle cx="60" cy="60" r="45" fill="none" stroke="#3498DB" strokeWidth="16" strokeDasharray="100 183" strokeDashoffset="-183" />
                            </svg>
                            <div className="donut-legend">
                                <div className="legend-item"><span className="legend-dot" style={{ background: '#4CAF50' }}></span> Govt <strong>30%</strong></div>
                                <div className="legend-item"><span className="legend-dot" style={{ background: '#9B59B6' }}></span> Private <strong>20%</strong></div>
                                <div className="legend-item"><span className="legend-dot" style={{ background: '#2EC4B6' }}></span> NGO <strong>15%</strong></div>
                                <div className="legend-item"><span className="legend-dot" style={{ background: '#3498DB' }}></span> College <strong>35%</strong></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Expiring Table */}
                <div className="admin-table-card">
                    <h4 style={{ marginBottom: 16 }}>Scholarships Expiring This Week</h4>
                    <div className="admin-table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Deadline</th>
                                    <th>Students Matched</th>
                                    <th>Applied</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expiringScholarships.map((s, i) => (
                                    <tr key={i}>
                                        <td className="table-name">{s.name}</td>
                                        <td><DeadlineBadge daysLeft={Math.floor(Math.random() * 10) + 1} /></td>
                                        <td>{s.matched}</td>
                                        <td>{s.applied}</td>
                                        <td><button className="btn btn-teal-ghost btn-sm"><Edit size={14} /> Edit</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add Scholarship Form */}
                {showForm && (
                    <div className="admin-form-card animate-fade-in-up">
                        <h3 style={{ marginBottom: 20 }}>Add New Scholarship</h3>
                        <div className="form-tabs">
                            {['Basic', 'Eligibility', 'Documents', 'Preview'].map(t => (
                                <button key={t} className={`detail-tab ${formTab === t.toLowerCase() ? 'detail-tab--active' : ''}`}
                                    onClick={() => setFormTab(t.toLowerCase())}>{t}</button>
                            ))}
                        </div>
                        <div className="admin-form-fields">
                            {formTab === 'basic' && (
                                <>
                                    <InputField label="Scholarship Name" placeholder="Enter scholarship name" />
                                    <InputField label="Provider / Organization" placeholder="E.g. Ministry of Education" />
                                    <InputField label="Category" type="select" options={['Government', 'Private', 'NGO', 'College']} placeholder="Select category" />
                                    <InputField label="Amount (Rs.)" placeholder="25000" />
                                    <InputField label="Application Deadline" type="date" />
                                    <InputField label="Description" placeholder="Brief description of the scholarship..." />
                                </>
                            )}
                            {formTab === 'eligibility' && (
                                <>
                                    <InputField label="Minimum Marks" placeholder="60%" />
                                    <InputField label="Category Eligible" type="select" options={['All', 'SC/ST', 'OBC', 'EWS', 'General']} placeholder="Select" />
                                    <InputField label="Max Family Income" placeholder="Rs. 4,50,000" />
                                    <InputField label="Education Level" type="select" options={['10th', '12th', 'UG', 'PG', 'PhD']} placeholder="Select" />
                                    <InputField label="States Eligible" placeholder="All States" />
                                </>
                            )}
                            {formTab === 'documents' && (
                                <>
                                    <p className="text-small" style={{ marginBottom: 8 }}>Select required documents for this scholarship:</p>
                                    {['Aadhar Card', 'Income Certificate', 'Caste Certificate', '10th Marksheet', '12th Marksheet', 'College Admission Proof', 'Bank Passbook'].map(d => (
                                        <label key={d} className="doc-check-item">
                                            <input type="checkbox" /> {d}
                                        </label>
                                    ))}
                                </>
                            )}
                            {formTab === 'preview' && (
                                <div className="preview-card">
                                    <CategoryBadge type="govt" />
                                    <h4 style={{ margin: '12px 0 4px' }}>New Scholarship Name</h4>
                                    <p className="text-small">Provider Name</p>
                                    <p className="detail-hero__amount text-number" style={{ fontSize: 28, margin: '12px 0' }}>Rs. 25,000</p>
                                    <Button fullWidth>Publish Scholarship</Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

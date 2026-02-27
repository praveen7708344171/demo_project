import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, GraduationCap, Users, Award, Check } from 'lucide-react';
import Button from '../components/Button';
import InputField from '../components/InputField';
import ProgressBar from '../components/ProgressBar';
import Navbar from '../components/Navbar';
import './ProfileForm.css';

const stepsMeta = [
    { icon: <User size={22} />, label: 'Personal', title: 'Personal Information', sub: 'This helps us find scholarships in your region' },
    { icon: <GraduationCap size={22} />, label: 'Academic', title: 'Academic Information', sub: 'This helps us find more scholarships for you' },
    { icon: <Users size={22} />, label: 'Family', title: 'Family Details', sub: 'Many scholarships are income-based' },
    { icon: <Award size={22} />, label: 'Special', title: 'Special Categories', sub: 'Tell us anything that makes you unique' },
];

const states = ['Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'];
const categories = ['General', 'OBC', 'SC', 'ST', 'EWS'];
const religions = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Other'];

export default function ProfileForm() {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);

    const progress = ((step + 1) / stepsMeta.length) * 100;

    const handleNext = () => {
        if (step < stepsMeta.length - 1) setStep(step + 1);
        else {
            setLoading(true);
            setTimeout(() => { setLoading(false); navigate('/dashboard'); }, 2000);
        }
    };

    return (
        <div className="profile-page">
            <Navbar variant="landing" />
            <div className="container-form" style={{ paddingTop: 40, paddingBottom: 80 }}>
                {/* Step dots */}
                <div className="profile-steps">
                    {stepsMeta.map((s, i) => (
                        <div key={i} className="profile-step-dot-group">
                            <div className={`profile-step-dot ${i < step ? 'profile-step-dot--done' : i === step ? 'profile-step-dot--active' : ''}`}>
                                {i < step ? <Check size={16} /> : i + 1}
                            </div>
                            <span className={`profile-step-label ${i === step ? 'profile-step-label--active' : ''}`}>{s.label}</span>
                            {i < stepsMeta.length - 1 && <div className={`profile-step-line ${i < step ? 'profile-step-line--done' : ''}`} />}
                        </div>
                    ))}
                </div>

                <div className="profile-progress-info">
                    <span>Step {step + 1} of {stepsMeta.length} — {stepsMeta[step].title}</span>
                    <span className="text-orange">{Math.round(progress)}% complete</span>
                </div>
                <ProgressBar value={progress} />

                {/* Form header */}
                <div className="profile-form-header">
                    <div className="profile-form-icon">{stepsMeta[step].icon}</div>
                    <h2 style={{ fontSize: 22 }}>{stepsMeta[step].title}</h2>
                    <p className="text-small">{stepsMeta[step].sub}</p>
                </div>

                {/* Auto-save indicator */}
                <div className="autosave-indicator">
                    <Check size={14} /> Saved just now
                </div>

                {/* Step forms */}
                <div className="profile-fields">
                    {step === 0 && (
                        <>
                            <InputField label="Full Name" placeholder="Ravi Kumar" name="name" />
                            <InputField label="Date of Birth" type="date" name="dob" />
                            <InputField label="Gender" type="select" options={['Male', 'Female', 'Other']} name="gender" placeholder="Select gender" />
                            <InputField label="State" type="select" options={states} name="state" placeholder="Select state" />
                            <InputField label="District" placeholder="Enter your district" name="district" />
                            <InputField label="Pincode" placeholder="110001" name="pincode" />
                        </>
                    )}
                    {step === 1 && (
                        <>
                            <InputField label="Current Education Level" type="select" options={['10th Pass', '12th Pass', 'Undergraduate', 'Postgraduate', 'PhD']} name="education" placeholder="Select level" />
                            <InputField label="Field of Study" type="select" options={['Engineering', 'Medical', 'Arts', 'Commerce', 'Science', 'Law', 'Other']} name="field" placeholder="Select field" />
                            <InputField label="College/Institute Name" placeholder="IIT Bombay" name="college" />
                            <InputField label="Year of Study" type="select" options={['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year']} name="year" placeholder="Select year" />
                            <InputField label="10th Marks (%)" placeholder="85" name="marks10" />
                            <InputField label="12th Marks (%)" placeholder="78" name="marks12" />
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <InputField label="Annual Family Income" type="select" options={['Below Rs. 1,00,000', 'Rs. 1,00,000 - 2,50,000', 'Rs. 2,50,000 - 5,00,000', 'Rs. 5,00,000 - 8,00,000', 'Above Rs. 8,00,000']} name="income" placeholder="Select range" />
                            <InputField label="Category" type="select" options={categories} name="category" placeholder="Select category" />
                            <InputField label="Religion" type="select" options={religions} name="religion" placeholder="Select religion" />
                            <InputField label="Parent/Guardian Occupation" placeholder="Farmer, Teacher, etc." name="occupation" />
                            <div className="radio-group">
                                <span className="input-label">Are you first generation graduate?</span>
                                <div className="radio-pills">
                                    <label className="radio-pill radio-pill--active"><input type="radio" name="firstgen" defaultChecked hidden />Yes</label>
                                    <label className="radio-pill"><input type="radio" name="firstgen" hidden />No</label>
                                </div>
                            </div>
                        </>
                    )}
                    {step === 3 && (
                        <>
                            <div className="radio-group">
                                <span className="input-label">Do you have a disability?</span>
                                <div className="radio-pills">
                                    <label className="radio-pill"><input type="radio" name="disability" hidden />Yes</label>
                                    <label className="radio-pill radio-pill--active"><input type="radio" name="disability" defaultChecked hidden />No</label>
                                </div>
                            </div>
                            <div className="radio-group">
                                <span className="input-label">Are you a single girl child?</span>
                                <div className="radio-pills">
                                    <label className="radio-pill"><input type="radio" name="singlegirl" hidden />Yes</label>
                                    <label className="radio-pill radio-pill--active"><input type="radio" name="singlegirl" defaultChecked hidden />No</label>
                                </div>
                            </div>
                            <div className="radio-group">
                                <span className="input-label">Are you from a minority community?</span>
                                <div className="radio-pills">
                                    <label className="radio-pill"><input type="radio" name="minority" hidden />Yes</label>
                                    <label className="radio-pill radio-pill--active"><input type="radio" name="minority" defaultChecked hidden />No</label>
                                </div>
                            </div>
                            <InputField label="Any sports/cultural achievements?" placeholder="State-level athlete, etc." name="achievements" />
                            <InputField label="Any other relevant information" placeholder="Anything else we should know..." name="other" />
                        </>
                    )}
                </div>

                {/* Nav buttons */}
                <div className="profile-nav-buttons">
                    {step > 0 ? (
                        <Button variant="ghost" onClick={() => setStep(step - 1)}>← Previous</Button>
                    ) : <div />}
                    {step < stepsMeta.length - 1 ? (
                        <Button onClick={handleNext}>Next Step →</Button>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Button onClick={handleNext} loading={loading} fullWidth style={{ height: 56 }}>
                                {loading ? 'Finding your scholarships...' : 'Find My Scholarships'}
                            </Button>
                            <span className="text-small" style={{ marginTop: 8 }}>We'll match you in seconds</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

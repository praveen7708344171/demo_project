import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Accessibility, MessageCircle } from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';

import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfileForm from './pages/ProfileForm';
import Dashboard from './pages/Dashboard';
import ScholarshipDetail from './pages/ScholarshipDetail';
import Applications from './pages/Applications';
import Notifications from './pages/Notifications';
import AdminDashboard from './pages/AdminDashboard';
import Chatbot from './components/Chatbot';
import AccessibilityPanel from './components/AccessibilityPanel';

import './App.css';

function AppContent() {
    const [chatOpen, setChatOpen] = useState(false);
    const [a11yOpen, setA11yOpen] = useState(false);
    const location = useLocation();

    const isAuthPage = ['/login', '/register'].includes(location.pathname);

    return (
        <>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfileForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/scholarship/:id" element={<ScholarshipDetail />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/admin" element={<AdminDashboard />} />
            </Routes>

            {/* Floating Buttons */}
            {!isAuthPage && (
                <>
                    <button
                        className="fab fab-chat"
                        onClick={() => setChatOpen(true)}
                        aria-label="Open Sakhi chatbot"
                    >
                        <MessageCircle size={24} />
                    </button>

                    <button
                        className="fab fab-a11y"
                        onClick={() => setA11yOpen(true)}
                        aria-label="Accessibility settings"
                    >
                        <Accessibility size={22} />
                    </button>
                </>
            )}

            <Chatbot isOpen={chatOpen} onClose={() => setChatOpen(false)} />
            <AccessibilityPanel isOpen={a11yOpen} onClose={() => setA11yOpen(false)} />
        </>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </ThemeProvider>
    );
}

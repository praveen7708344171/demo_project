import { useState } from 'react';
import { X, Send, Mic, Paperclip, Globe } from 'lucide-react';
import Avatar from './Avatar';
import './Chatbot.css';

const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
];

const quickReplies = [
    'Find my scholarships',
    'Document help',
    'How to apply',
    'Check deadline',
];

export default function Chatbot({ isOpen, onClose }) {
    const [messages, setMessages] = useState([
        {
            from: 'bot',
            text: "Namaste! I'm Sakhi, your personal scholarship guide.\n\nI can help you find scholarships, prepare documents, and answer any questions — in your language.\n\nWhat would you like to know?",
            time: 'Just now',
        },
    ]);
    const [input, setInput] = useState('');
    const [showLang, setShowLang] = useState(false);
    const [lang, setLang] = useState('en');
    const [recording, setRecording] = useState(false);

    const sendMessage = (text) => {
        if (!text?.trim()) return;
        const newMsg = { from: 'user', text: text.trim(), time: 'Just now' };
        const reply = { from: 'bot', text: getBotReply(text.trim()), time: 'Just now' };
        setMessages(prev => [...prev, newMsg, reply]);
        setInput('');
    };

    const getBotReply = (msg) => {
        const lower = msg.toLowerCase();
        if (lower.includes('scholarship') || lower.includes('find'))
            return "Based on your profile, I found 18 scholarships you're eligible for! The top one is the Central Sector Scholarship worth Rs. 25,000/year. Would you like me to show the details?";
        if (lower.includes('document'))
            return "For most government scholarships, you'll need:\n• Income Certificate\n• Caste Certificate\n• Marksheet (10th & 12th)\n• Aadhar Card\n• Bank Passbook\n\nWant me to help you prepare any of these?";
        if (lower.includes('apply'))
            return "I'll guide you step by step! First, make sure your profile is 100% complete. Then I'll show you exactly what documents to upload. It usually takes about 25 minutes. Ready to start?";
        if (lower.includes('deadline'))
            return "You have 3 scholarships with deadlines this week:\n• PM Scholarship — 3 days left\n• State Merit Award — 5 days left\n• Tata Trust Grant — 7 days left\n\nShall I help you apply to the most urgent one?";
        return "I understand! Let me look into that for you. Could you tell me a bit more about what you're looking for? I'm here to help! 😊";
    };

    if (!isOpen) return null;

    return (
        <div className="chatbot-overlay" onClick={onClose}>
            <div className="chatbot" onClick={e => e.stopPropagation()}>
                <div className="chatbot__header">
                    <div className="chatbot__header-left">
                        <div className="sakhi-avatar">S</div>
                        <div>
                            <div className="chatbot__name">Sakhi <span className="online-dot" /></div>
                            <div className="chatbot__subtitle">Your Scholarship Guide</div>
                        </div>
                    </div>
                    <div className="chatbot__header-right">
                        <button className="lang-btn" onClick={() => setShowLang(!showLang)}>
                            <Globe size={16} /> {lang.toUpperCase()}
                        </button>
                        <button className="chatbot__close" onClick={onClose}><X size={20} /></button>
                    </div>
                </div>

                {showLang && (
                    <div className="lang-dropdown">
                        {languages.map(l => (
                            <button key={l.code} className={`lang-option ${lang === l.code ? 'lang-option--active' : ''}`}
                                onClick={() => { setLang(l.code); setShowLang(false); }}>
                                <span>{l.flag}</span> {l.name}
                            </button>
                        ))}
                    </div>
                )}

                <div className="chatbot__messages">
                    {messages.map((msg, i) => (
                        <div key={i} className={`chat-msg chat-msg--${msg.from}`}>
                            {msg.from === 'bot' && <Avatar name="Sakhi" size={32} />}
                            <div className={`chat-bubble chat-bubble--${msg.from}`}>
                                {msg.text.split('\n').map((line, j) => (
                                    <span key={j}>{line}<br /></span>
                                ))}
                            </div>
                        </div>
                    ))}

                    {messages.length === 1 && (
                        <div className="quick-replies">
                            {quickReplies.map(qr => (
                                <button key={qr} className="quick-reply-chip" onClick={() => sendMessage(qr)}>
                                    {qr}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="chatbot__input-bar">
                    {recording ? (
                        <div className="recording-state">
                            <div className="recording-pulse" />
                            <span>Listening...</span>
                            <button className="btn btn-sm btn-primary" onClick={() => setRecording(false)}>Stop</button>
                        </div>
                    ) : (
                        <>
                            <button className="chatbot__action-btn"><Paperclip size={18} /></button>
                            <input
                                className="chatbot__input"
                                placeholder="Type or speak..."
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                            />
                            <button className="chatbot__action-btn mic-btn" onClick={() => setRecording(true)}>
                                <Mic size={18} />
                            </button>
                            <button className="chatbot__send-btn" onClick={() => sendMessage(input)} disabled={!input.trim()}>
                                <Send size={18} />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

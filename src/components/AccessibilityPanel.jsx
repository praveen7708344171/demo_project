import { useState } from 'react';
import { X, Eye, BookOpen, Moon, Sun, Globe, Minus, Plus } from 'lucide-react';
import Toggle from './Toggle';
import { useTheme } from '../contexts/ThemeContext';
import './AccessibilityPanel.css';

export default function AccessibilityPanel({ isOpen, onClose }) {
    const { theme, setTheme } = useTheme();
    const [fontSize, setFontSize] = useState(16);
    const [highContrast, setHighContrast] = useState(false);
    const [visualImpaired, setVisualImpaired] = useState(false);
    const [screenReader, setScreenReader] = useState(false);
    const [dyslexia, setDyslexia] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);
    const [colorBlind, setColorBlind] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="a11y-overlay" onClick={onClose}>
            <div className="a11y-panel" onClick={e => e.stopPropagation()}>
                <div className="a11y-panel__header">
                    <h3>Accessibility Settings</h3>
                    <button className="a11y-panel__close" onClick={onClose}><X size={20} /></button>
                </div>

                <div className="a11y-panel__body">
                    <div className="a11y-section">
                        <span className="text-label">Visual</span>
                        <Toggle label="High Contrast Mode" checked={highContrast} onChange={setHighContrast} />
                        <Toggle label="Visual Impaired Mode" checked={visualImpaired} onChange={setVisualImpaired} />
                        <Toggle label="Screen Reader Mode" checked={screenReader} onChange={setScreenReader} />

                        <div className="a11y-slider">
                            <span className="toggle-label">Font Size</span>
                            <div className="slider-control">
                                <button className="slider-btn" onClick={() => setFontSize(Math.max(14, fontSize - 2))}><Minus size={14} /></button>
                                <span className="slider-value">{fontSize}px</span>
                                <button className="slider-btn" onClick={() => setFontSize(Math.min(32, fontSize + 2))}><Plus size={14} /></button>
                            </div>
                        </div>
                    </div>

                    <div className="a11y-section">
                        <span className="text-label">Reading</span>
                        <Toggle label="Dyslexia Mode (OpenDyslexic)" checked={dyslexia} onChange={setDyslexia} />
                    </div>

                    <div className="a11y-section">
                        <span className="text-label">Motion</span>
                        <Toggle label="Reduce Motion" checked={reduceMotion} onChange={setReduceMotion} />
                    </div>

                    <div className="a11y-section">
                        <span className="text-label">Color</span>
                        <Toggle label="Colour Blind Mode" checked={colorBlind} onChange={setColorBlind} />
                    </div>

                    <div className="a11y-section">
                        <span className="text-label">Theme</span>
                        <div className="theme-pills">
                            <button className={`theme-pill ${theme === 'light' ? 'theme-pill--active' : ''}`}
                                onClick={() => setTheme('light')}>
                                <Sun size={14} /> Light
                            </button>
                            <button className={`theme-pill ${theme === 'dark' ? 'theme-pill--active' : ''}`}
                                onClick={() => setTheme('dark')}>
                                <Moon size={14} /> Dark
                            </button>
                        </div>
                    </div>

                    <button
                        className="btn btn-danger-ghost w-full"
                        onClick={() => {
                            setHighContrast(false); setVisualImpaired(false);
                            setScreenReader(false); setDyslexia(false);
                            setReduceMotion(false); setColorBlind(false);
                            setFontSize(16); setTheme('light');
                        }}
                    >
                        Reset All Settings
                    </button>
                </div>
            </div>
        </div>
    );
}

import { useState } from 'react';
import { Eye, EyeOff, Check } from 'lucide-react';
import './InputField.css';

export default function InputField({
    label, type = 'text', placeholder, value, onChange,
    error, success, disabled, name, options, icon
}) {
    const [showPassword, setShowPassword] = useState(false);
    const [focused, setFocused] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    if (type === 'select') {
        return (
            <div className={`input-group ${error ? 'input-error' : ''} ${success ? 'input-success' : ''}`}>
                {label && <label className="input-label">{label}</label>}
                <div className="input-wrapper">
                    <select
                        className="input-field input-select"
                        value={value}
                        onChange={onChange}
                        name={name}
                        disabled={disabled}
                    >
                        <option value="">{placeholder || 'Select...'}</option>
                        {options?.map(opt => (
                            <option key={opt.value || opt} value={opt.value || opt}>
                                {opt.label || opt}
                            </option>
                        ))}
                    </select>
                </div>
                {error && <span className="input-helper input-helper--error">{error}</span>}
            </div>
        );
    }

    return (
        <div className={`input-group ${error ? 'input-error' : ''} ${success ? 'input-success' : ''} ${focused ? 'input-focused' : ''}`}>
            {label && <label className="input-label">{label}</label>}
            <div className="input-wrapper">
                {icon && <span className="input-icon">{icon}</span>}
                <input
                    className={`input-field ${icon ? 'input-field--with-icon' : ''}`}
                    type={inputType}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    name={name}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
                {isPassword && (
                    <button type="button" className="input-toggle" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
                {success && (
                    <span className="input-check">
                        <Check size={16} />
                    </span>
                )}
            </div>
            {error && <span className="input-helper input-helper--error">{error}</span>}
        </div>
    );
}

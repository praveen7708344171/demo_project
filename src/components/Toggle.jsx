import './Toggle.css';

export default function Toggle({ checked, onChange, label }) {
    return (
        <label className="toggle-group">
            <span className="toggle-label">{label}</span>
            <div className={`toggle ${checked ? 'toggle--on' : ''}`} onClick={() => onChange(!checked)}>
                <div className="toggle__thumb" />
            </div>
        </label>
    );
}

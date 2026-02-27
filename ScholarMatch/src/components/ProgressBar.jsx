import './ProgressBar.css';

export default function ProgressBar({ value = 0, color = 'var(--color-primary)', height = 6 }) {
    return (
        <div className="progress-bar" style={{ height }}>
            <div
                className="progress-bar__fill"
                style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: color }}
            />
        </div>
    );
}

import './StatCard.css';

export default function StatCard({ icon, number, label, color = 'var(--color-primary)', trend }) {
    return (
        <div className="stat-card">
            <div className="stat-card__icon" style={{ background: `${color}15`, color }}>
                {icon}
            </div>
            <div className="stat-card__content">
                <span className="stat-card__number text-number" style={{ color }}>{number}</span>
                <span className="stat-card__label">{label}</span>
            </div>
            {trend && (
                <span className={`stat-card__trend ${trend > 0 ? 'trend-up' : 'trend-down'}`}>
                    {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
                </span>
            )}
        </div>
    );
}

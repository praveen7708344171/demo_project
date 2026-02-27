import './NotificationCard.css';

const borderColors = {
    deadline: 'var(--color-danger)',
    match: 'var(--color-primary)',
    received: 'var(--color-success)',
    reminder: 'var(--color-warning)',
    system: 'var(--color-muted)',
};

const iconBgs = {
    deadline: '#FFEBEE',
    match: '#FFF3EE',
    received: '#E8F5E9',
    reminder: '#FFF8E1',
    system: '#F5F5F5',
};

export default function NotificationCard({ type = 'system', title, body, time, unread, icon }) {
    return (
        <div className={`notification-card ${unread ? 'notification-card--unread' : ''}`}
            style={{ borderLeftColor: borderColors[type] }}>
            <div className="notification-card__icon" style={{ background: iconBgs[type], color: borderColors[type] }}>
                {icon}
            </div>
            <div className="notification-card__content">
                <h4 className="notification-card__title">{title}</h4>
                <p className="notification-card__body">{body}</p>
            </div>
            <span className="notification-card__time">{time}</span>
        </div>
    );
}

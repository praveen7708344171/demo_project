export function CategoryBadge({ type }) {
    const config = {
        govt: { bg: '#E8F5E9', color: '#2E7D32', label: 'Government' },
        private: { bg: '#F3E5F5', color: '#6A1B9A', label: 'Private' },
        ngo: { bg: '#E0F7FA', color: '#00695C', label: 'NGO' },
        college: { bg: '#E3F2FD', color: '#1565C0', label: 'College' },
    };
    const c = config[type] || config.govt;
    return (
        <span className="badge-category" style={{ background: c.bg, color: c.color }}>
            {c.label}
        </span>
    );
}

export function DeadlineBadge({ daysLeft }) {
    let bg, color;
    if (daysLeft <= 7) { bg = '#FFEBEE'; color = '#C62828'; }
    else if (daysLeft <= 30) { bg = '#FFF8E1'; color = '#F57F17'; }
    else { bg = '#E8F5E9'; color = '#2E7D32'; }
    return (
        <span className="badge-deadline" style={{ background: bg, color }}>
            {daysLeft} days left
        </span>
    );
}

export function StatusBadge({ status }) {
    const config = {
        saved: { bg: '#F0F0F0', color: '#666' },
        applied: { bg: '#E3F2FD', color: '#1565C0' },
        pending: { bg: '#FFF8E1', color: '#F57F17' },
        received: { bg: '#E8F5E9', color: '#2E7D32' },
        rejected: { bg: '#FFEBEE', color: '#C62828' },
    };
    const c = config[status] || config.saved;
    return (
        <span className="badge-status" style={{ background: c.bg, color: c.color }}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}

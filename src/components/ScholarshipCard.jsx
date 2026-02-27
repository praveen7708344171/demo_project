import './Badge.css';
import { CategoryBadge, DeadlineBadge } from './Badge';
import { Bookmark, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ScholarshipCard.css';

const accentColors = {
    govt: '#4CAF50',
    private: '#9B59B6',
    ngo: '#2EC4B6',
    college: '#3498DB'
};

export default function ScholarshipCard({ scholarship, compact }) {
    const [saved, setSaved] = useState(scholarship.saved || false);
    const navigate = useNavigate();

    return (
        <div
            className={`scholarship-card ${compact ? 'scholarship-card--compact' : ''}`}
            style={{ borderLeftColor: accentColors[scholarship.category] || accentColors.govt }}
        >
            <div className="scholarship-card__top">
                <CategoryBadge type={scholarship.category} />
                <div className="flex items-center gap-sm">
                    <DeadlineBadge daysLeft={scholarship.daysLeft} />
                    <button
                        className={`bookmark-btn ${saved ? 'bookmark-btn--active' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
                        aria-label={saved ? 'Remove bookmark' : 'Save scholarship'}
                    >
                        <Bookmark size={18} fill={saved ? 'var(--color-primary)' : 'none'} stroke={saved ? 'var(--color-primary)' : 'currentColor'} />
                    </button>
                </div>
            </div>

            <h4 className="scholarship-card__name">{scholarship.name}</h4>
            <p className="scholarship-card__provider">{scholarship.provider}</p>
            <p className="scholarship-card__amount text-number">
                {scholarship.amount}
            </p>

            <div className="scholarship-card__divider" />

            <div className="scholarship-card__bottom">
                <span className="scholarship-card__match">
                    <span className="match-dot" />
                    {scholarship.match || '6/6'} match
                </span>
                <div className="flex gap-sm">
                    <button className="btn btn-teal-ghost btn-sm" onClick={() => navigate(`/scholarship/${scholarship.id}`)}>
                        Details
                    </button>
                    <button className="btn btn-primary btn-sm" onClick={(e) => e.stopPropagation()}>
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
}

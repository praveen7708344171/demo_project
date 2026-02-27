import './Avatar.css';

const colors = ['#FF6B35', '#2EC4B6', '#9B59B6', '#3498DB', '#06D6A0', '#FFD166'];

export default function Avatar({ name, size = 40, src }) {
    const initial = name ? name.charAt(0).toUpperCase() : '?';
    const colorIndex = name ? name.charCodeAt(0) % colors.length : 0;

    if (src) {
        return <img className="avatar" src={src} alt={name} style={{ width: size, height: size }} />;
    }

    return (
        <div
            className="avatar"
            style={{
                width: size, height: size,
                background: colors[colorIndex],
                fontSize: size * 0.4,
            }}
        >
            {initial}
        </div>
    );
}

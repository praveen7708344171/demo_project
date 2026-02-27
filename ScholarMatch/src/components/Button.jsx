import './Button.css';

export default function Button({ children, variant = 'primary', size = 'default', fullWidth, loading, disabled, onClick, className = '', ...props }) {
  return (
    <button
      className={`btn btn-${variant} ${size === 'small' ? 'btn-sm' : ''} ${fullWidth ? 'btn-full' : ''} ${loading ? 'btn-loading' : ''} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <>
          <span className="btn-spinner" />
          <span>Please wait...</span>
        </>
      ) : children}
    </button>
  );
}

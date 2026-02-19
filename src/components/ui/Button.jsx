import React from 'react';

export default function Button({
  children,
  type = "button",
  variant = "primary",
  disabled,
  fullWidth,
  onClick,
}) {
  const styles = {
    primary: {
      background: '#1E3A8A',
      color: '#FFFFFF',
      border: 'none',
      boxShadow: '0 4px 16px rgba(30,58,138,.25)',
    },
    outline: {
      background: 'transparent',
      color: '#1E3A8A',
      border: '1.5px solid #1E3A8A',
    },
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{
        ...styles[variant],
        width: fullWidth ? '100%' : 'auto',
        height: '48px',
        padding: '0 28px',
        borderRadius: '50px',
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '15px',
        fontWeight: '500',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        color: '#FFFFFF',
      }}
    >
      {children}
    </button>
  );
}
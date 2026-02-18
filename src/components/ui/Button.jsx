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
      background: 'var(--color-primary)',
      color: '#fff',
      border: 'none',
      boxShadow: '0 4px 16px rgba(30,58,138,.25)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--color-primary)',
      border: '1.5px solid var(--color-primary)',
    }
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
        transition: '220ms cubic-bezier(.4,0,.2,1)',
      }}
    >
      {children}
    </button>
  );
}
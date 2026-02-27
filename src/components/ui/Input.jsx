import React, { useState } from 'react';

export default function Input({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  icon,
}) {
  const [showPw, setShowPw] = useState(false);
  const isPassword = type === "password";

  return (
    <div style={{ marginBottom: '18px' }}>
      {label && (
        <label htmlFor={name} style={{
          display: 'block',
          fontSize: '13px',
          fontWeight: '500',
          color: '#475569',
          marginBottom: '6px',
        }}>
          {label}
        </label>
      )}

      <div style={{ position: 'relative' }}>
        {icon && (
          <span style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#94A3B8',
            fontSize: '16px',
            pointerEvents: 'none',
          }}>
            {icon}
          </span>
        )}

        <input
          id={name}
          name={name}
          type={isPassword && showPw ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            width: '100%',
            height: '46px',
            padding: icon ? '0 14px 0 40px' : '0 14px',
            border: error ? '1.5px solid #EF4444' : '1.5px solid #E2E8F0',
            borderRadius: '10px',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px',
            color: '#1E293B',
            background: '#F8FAFC',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPw(s => !s)}
            style={{
              position: 'absolute',
              right: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#94A3B8',
              fontSize: '16px',
              padding: '0',
            }}
          >
            {showPw ? '🙈' : '👁️'}
          </button>
        )}
      </div>

      {error && (
        <p style={{
          fontSize: '12px',
          color: '#EF4444',
          marginTop: '5px',
        }}>
          ⚠ {error}
        </p>
      )}
    </div>
  );
}
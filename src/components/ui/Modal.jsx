import React from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15,23,42,.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}
      onClick={onClose}
    >
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '32px',
        width: '100%',
        maxWidth: '480px',
        boxShadow: '0 20px 48px rgba(15,23,42,.2)',
        position: 'relative',
      }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}>
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: '20px',
            fontWeight: '700',
            color: '#1E293B',
          }}>
            {title}
          </h2>
          <button onClick={onClose} style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#94A3B8',
          }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}
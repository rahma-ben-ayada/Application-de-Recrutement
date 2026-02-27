import React from 'react';

export default function Card({ children }) {
  return (
    <div style={{
      width: '100%',
      maxWidth: '420px',
      background: '#FFFFFF',
      borderRadius: '16px',
      boxShadow: '0 20px 48px rgba(15,23,42,.14)',
      padding: '44px 40px',
      border: '1px solid #E2E8F0',
      animation: 'slideUp .4s cubic-bezier(.4,0,.2,1) both',
    }}>
      <style>{`
        @keyframes slideUp {
          from { opacity:0; transform: translateY(24px); }
          to   { opacity:1; transform: translateY(0); }
        }
      `}</style>
      {children}
    </div>
  );
}
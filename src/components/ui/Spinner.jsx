import React from 'react';

export default function Spinner() {
  return (
    <>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div style={{
        width: '24px',
        height: '24px',
        border: '3px solid #E2E8F0',
        borderTop: '3px solid #1E3A8A',
        borderRadius: '50%',
        animation: 'spin .7s linear infinite',
        display: 'inline-block',
      }} />
    </>
  );
}
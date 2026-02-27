import React from 'react';

export default function Alert({ type = "error", children }) {
  const styles = {
    error: {
      background: '#FEF2F2',
      color: '#EF4444',
      borderLeft: '3px solid #EF4444',
    },
    success: {
      background: '#F0FDF4',
      color: '#22C55E',
      borderLeft: '3px solid #22C55E',
    },
    warning: {
      background: '#FFF7ED',
      color: '#FB923C',
      borderLeft: '3px solid #FB923C',
    },
  };

  const icons = {
    error: '✕',
    success: '✓',
    warning: '!',
  };

  return (
    <div style={{
      ...styles[type],
      borderRadius: '10px',
      padding: '12px 16px',
      fontSize: '13.5px',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
      lineHeight: '1.5',
    }}>
      <strong>{icons[type]}</strong>
      <span>{children}</span>
    </div>
  );
}

import React from 'react';

export default function Badge({ children, type = "default" }) {
  const styles = {
    default: { background: '#DBEAFE', color: '#1E3A8A' },
    success: { background: '#F0FDF4', color: '#22C55E' },
    error:   { background: '#FEF2F2', color: '#EF4444' },
    warning: { background: '#FFF7ED', color: '#FB923C' },
  };

  return (
    <span style={{
      ...styles[type],
      padding: '4px 12px',
      borderRadius: '50px',
      fontSize: '12px',
      fontWeight: '500',
      display: 'inline-block',
    }}>
      {children}
    </span>
  );
}
import React from 'react';

export default function StatsCard({ label, value, icon }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      padding: '20px 24px',
      border: '1px solid #E2E8F0',
      boxShadow: '0 4px 16px rgba(15,23,42,.06)',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    }}>
      <span style={{ fontSize: '32px' }}>{icon}</span>
      <div>
        <div style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: '24px',
          fontWeight: '800',
          color: '#1E3A8A',
        }}>
          {value}
        </div>
        <div style={{ fontSize: '13px', color: '#94A3B8', marginTop: '2px' }}>
          {label}
        </div>
      </div>
    </div>
  );
}
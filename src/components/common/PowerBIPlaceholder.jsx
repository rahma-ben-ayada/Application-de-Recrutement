import React from 'react';

export default function PowerBIPlaceholder({ title = "Rapport Power BI", height = 480 }) {
  return (
    <div style={{
      height,
      background: '#F1F5F9',
      borderRadius: '12px',
      border: '2px dashed #CBD5E1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      color: '#94A3B8',
    }}>
      <span style={{ fontSize: '40px' }}>📊</span>
      <strong style={{ fontSize: '16px', color: '#475569' }}>{title}</strong>
      <p style={{ fontSize: '13px', textAlign: 'center', color: '#94A3B8' }}>
        Intégration Power BI à venir.<br />
        Remplacer par &lt;iframe&gt; ou SDK Power BI Embedded.
      </p>
    </div>
  );
}
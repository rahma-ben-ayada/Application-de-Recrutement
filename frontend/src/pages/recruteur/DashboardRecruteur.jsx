import React from 'react';
import RecruteurLayout from '../../layouts/RecruteurLayout';
import PowerBIPlaceholder from '../../components/common/PowerBIPlaceholder';

export default function DashboardRecruteur() {
  const stats = [
    { label: 'Offres publiées',       value: '12',  icon: '📋', color: '#1E3A8A' },
    { label: 'Candidatures reçues',   value: '248', icon: '📨', color: '#2563EB' },
    { label: 'Entretiens planifiés',  value: '8',   icon: '🎯', color: '#059669' },
    { label: 'Offres actives',        value: '7',   icon: '✅', color: '#0891B2' },
  ];

  return (
    <RecruteurLayout title="Dashboard RH">

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        marginBottom: '32px',
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '20px 24px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 16px rgba(15,23,42,.06)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}>
            <span style={{ fontSize: '32px' }}>{s.icon}</span>
            <div>
              <div style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: '28px', fontWeight: '800', color: s.color,
              }}>
                {s.value}
              </div>
              <div style={{ fontSize: '13px', color: '#94A3B8', marginTop: '2px' }}>
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Power BI Placeholder */}
      <PowerBIPlaceholder title="Dashboard RH — Power BI" height={480} />

    </RecruteurLayout>
  );
}
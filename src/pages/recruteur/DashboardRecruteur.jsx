import React from 'react';
import RecruteurLayout from '../../layouts/RecruteurLayout';
import PowerBIPlaceholder from '../../components/common/PowerBIPlaceholder';
import StatsCard from '../../components/common/StatsCard';

export default function DashboardRecruteur() {
  return (
    <RecruteurLayout>
      <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '28px', fontWeight: '800', color: '#1E293B', marginBottom: '24px' }}>
        Tableau de bord — Recruteur
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '32px' }}>
        <StatsCard label="Mes Offres"      value="12"  icon="📋" />
        <StatsCard label="Candidatures"    value="248" icon="📨" />
        <StatsCard label="Entretiens"      value="18"  icon="🎯" />
      </div>
      <PowerBIPlaceholder title="Rapport Recrutement — Power BI" height={500} />
    </RecruteurLayout>
  );
}
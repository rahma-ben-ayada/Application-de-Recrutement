import React from 'react';
import CandidatLayout from '../../layouts/CandidatLayout';
import PowerBIPlaceholder from '../../components/common/PowerBIPlaceholder';
import StatsCard from '../../components/common/StatsCard';

export default function DashboardCandidat() {
  return (
    <CandidatLayout>
      <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '28px', fontWeight: '800', color: '#1E293B', marginBottom: '24px' }}>
        Mon Tableau de bord
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '32px' }}>
        <StatsCard label="Candidatures"   value="8"  icon="📨" />
        <StatsCard label="Entretiens"     value="3"  icon="🎯" />
        <StatsCard label="Offres sauvées" value="14" icon="❤️" />
      </div>
      <PowerBIPlaceholder title="Suivi de mes candidatures — Power BI" height={500} />
    </CandidatLayout>
  );
}
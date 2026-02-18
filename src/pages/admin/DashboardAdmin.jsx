import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import PowerBIPlaceholder from '../../components/common/PowerBIPlaceholder';
import StatsCard from '../../components/common/StatsCard';

export default function DashboardAdmin() {
  return (
    <AdminLayout>
      <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '28px', fontWeight: '800', color: '#1E293B', marginBottom: '24px' }}>
        Tableau de bord — Administration
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '32px' }}>
        <StatsCard label="Utilisateurs"   value="1 248" icon="👥" />
        <StatsCard label="Offres actives" value="87"    icon="📋" />
        <StatsCard label="Candidatures"   value="3 410" icon="📨" />
        <StatsCard label="Recrutements"   value="142"   icon="✅" />
      </div>
      <PowerBIPlaceholder title="Tableau analytique — Power BI" height={500} />
    </AdminLayout>
  );
}
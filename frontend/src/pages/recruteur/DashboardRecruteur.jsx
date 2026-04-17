import React, { useState, useEffect } from 'react';
import RecruteurLayout from '../../layouts/RecruteurLayout';
import api from '../../utils/api';

export default function DashboardRecruteur() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await api('/offres/stats');
      setStats(data.stats);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    { label: 'Offres publiées',       value: stats?.totalOffres || 0,       icon: '📋', color: '#1E3A8A', bg: '#DBEAFE' },
    { label: 'Candidatures reçues',   value: stats?.totalCandidatures || 0, icon: '📨', color: '#2563EB', bg: '#EFF6FF' },
    { label: 'Entretiens planifiés',  value: stats?.totalEntretiens || 0,   icon: '🎯', color: '#D97706', bg: '#FEF3C7' },
    { label: 'Offres actives',        value: stats?.offresActives || 0,     icon: '✅', color: '#059669', bg: '#D1FAE5' },
  ];

  const candidatureStats = [
    { label: 'En attente',  value: stats?.candidaturesParStatut?.en_attente || 0, color: '#F59E0B', bg: '#FEF3C7' },
    { label: 'Entretien',   value: stats?.candidaturesParStatut?.entretien || 0, color: '#3B82F6', bg: '#DBEAFE' },
    { label: 'Acceptées',   value: stats?.candidaturesParStatut?.accepte || 0,   color: '#10B981', bg: '#D1FAE5' },
    { label: 'Refusées',    value: stats?.candidaturesParStatut?.refuse || 0,    color: '#EF4444', bg: '#FEE2E2' },
  ];

  const entretienStats = [
    { label: 'Planifiés', value: stats?.entretiensParStatut?.planifie || 0, color: '#F59E0B', bg: '#FEF3C7' },
    { label: 'Acceptés',  value: stats?.entretiensParStatut?.accepte || 0,  color: '#10B981', bg: '#D1FAE5' },
    { label: 'Refusés',   value: stats?.entretiensParStatut?.refuse || 0,   color: '#EF4444', bg: '#FEE2E2' },
  ];

  return (
    <RecruteurLayout title="Dashboard RH">

      {/* Stats */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px', marginBottom: '32px',
      }}>
        {cards.map((s, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: '16px', padding: '24px',
            border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '16px',
          }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '14px',
              background: s.bg, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '26px', flexShrink: 0,
            }}>
              {s.icon}
            </div>
            <div>
              <div style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: loading ? '20px' : '28px',
                fontWeight: '800', color: s.color,
              }}>
                {loading ? '...' : s.value}
              </div>
              <div style={{ fontSize: '13px', color: '#94A3B8', marginTop: '2px' }}>
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Candidatures & Entretiens Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        {/* Candidatures */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 2px 8px rgba(15,23,42,.04)',
        }}>
          <h3 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: '18px',
            fontWeight: '700',
            color: '#1E293B',
            marginBottom: '20px',
          }}>
            Candidatures par statut
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {candidatureStats.map((s, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                background: s.bg,
                borderRadius: '10px',
              }}>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#475569' }}>
                  {s.label}
                </span>
                <span style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: s.color,
                }}>
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Entretiens */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 2px 8px rgba(15,23,42,.04)',
        }}>
          <h3 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: '18px',
            fontWeight: '700',
            color: '#1E293B',
            marginBottom: '20px',
          }}>
            Entretiens par statut
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {entretienStats.map((s, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                background: s.bg,
                borderRadius: '10px',
              }}>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#475569' }}>
                  {s.label}
                </span>
                <span style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: s.color,
                }}>
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </RecruteurLayout>
  );
}

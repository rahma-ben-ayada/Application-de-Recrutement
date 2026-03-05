import React, { useState, useEffect } from 'react';
import RecruteurLayout from '../../layouts/RecruteurLayout';
import api from '../../utils/api';

export default function DashboardRecruteur() {
  const [stats, setStats] = useState({
    totalOffres: 0,
    offresActives: 0,
    totalCandidatures: 0,
    enAttente: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStats = async () => {
    try {
      const offresData = await api('/offres/mes');
      const offres = offresData.offres || [];

      let totalCandidatures = 0;
      let enAttente = 0;

      for (const offre of offres) {
        try {
          const candData = await api(`/candidatures/offre/${offre._id}`);
          const cands = candData.candidatures || [];
          totalCandidatures += cands.length;
          enAttente += cands.filter(c => c.statut === 'en_attente').length;
        } catch (e) {}
      }

      setStats({
        totalOffres: offres.length,
        offresActives: offres.filter(o => o.status === 'active').length,
        totalCandidatures,
        enAttente,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    { label: 'Offres publiées',       value: stats.totalOffres,       icon: '📋', color: '#1E3A8A', bg: '#DBEAFE' },
    { label: 'Candidatures reçues',   value: stats.totalCandidatures, icon: '📨', color: '#2563EB', bg: '#EFF6FF' },
    { label: 'En attente de réponse', value: stats.enAttente,         icon: '⏳', color: '#D97706', bg: '#FEF3C7' },
    { label: 'Offres actives',        value: stats.offresActives,     icon: '✅', color: '#059669', bg: '#D1FAE5' },
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

      {/* Power BI — À venir */}
      <div style={{
        background: '#fff', borderRadius: '16px', padding: '60px',
        border: '2px dashed #E2E8F0', textAlign: 'center',
        boxShadow: '0 4px 16px rgba(15,23,42,.04)',
      }}>
        <div style={{ fontSize: '56px', marginBottom: '16px' }}>📊</div>
        <div style={{
          fontFamily: 'Syne, sans-serif', fontSize: '20px',
          fontWeight: '700', color: '#1E293B', marginBottom: '8px',
        }}>
          Dashboard Power BI
        </div>
        <div style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '24px' }}>
          Le tableau de bord analytique Power BI sera intégré ici
        </div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: '#DBEAFE', color: '#1E3A8A',
          padding: '10px 24px', borderRadius: '50px',
          fontSize: '13px', fontWeight: '600',
        }}>
          🔜 Intégration en cours
        </div>
      </div>

    </RecruteurLayout>
  );
}
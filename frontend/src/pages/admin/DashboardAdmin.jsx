import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import api from '../../utils/api';

export default function DashboardAdmin() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await api('/users/stats');
      setStats(data.stats);
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Dashboard Administrateur">
        <div style={{ textAlign: 'center', padding: '60px', color: '#94A3B8' }}>
          Chargement...
        </div>
      </AdminLayout>
    );
  }

  const statsCards = [
    {
      label: 'Utilisateurs',
      value: stats?.totalUsers || 0,
      color: '#1E3A8A',
      bg: '#DBEAFE',
      icon: '👥',
    },
    {
      label: 'Recruteurs',
      value: stats?.totalRecruteurs || 0,
      color: '#059669',
      bg: '#D1FAE5',
      icon: '🏢',
    },
    {
      label: 'Candidats',
      value: stats?.totalCandidats || 0,
      color: '#7C3AED',
      bg: '#EDE9FE',
      icon: '👤',
    },
    {
      label: 'Offres',
      value: stats?.totalOffres || 0,
      color: '#D97706',
      bg: '#FEF3C7',
      icon: '💼',
    },
    {
      label: 'Candidatures',
      value: stats?.totalCandidatures || 0,
      color: '#0891B2',
      bg: '#CFFAFE',
      icon: '📄',
    },
    {
      label: 'Entretiens',
      value: stats?.totalEntretiens || 0,
      color: '#BE185D',
      bg: '#FCE7F3',
      icon: '🎯',
    },
    {
      label: 'En attente',
      value: stats?.pending || 0,
      color: '#F59E0B',
      bg: '#FEF3C7',
      icon: '⏳',
    },
    {
      label: 'Vérifiés',
      value: stats?.verified || 0,
      color: '#10B981',
      bg: '#D1FAE5',
      icon: '✅',
    },
  ];

  const candidatureStats = [
    { label: 'En attente', value: stats?.candidaturesParStatut?.en_attente || 0, color: '#F59E0B', bg: '#FEF3C7' },
    { label: 'Entretien', value: stats?.candidaturesParStatut?.entretien || 0, color: '#3B82F6', bg: '#DBEAFE' },
    { label: 'Acceptées', value: stats?.candidaturesParStatut?.accepte || 0, color: '#10B981', bg: '#D1FAE5' },
    { label: 'Refusées', value: stats?.candidaturesParStatut?.refuse || 0, color: '#EF4444', bg: '#FEE2E2' },
  ];

  const entretienStats = [
    { label: 'Planifiés', value: stats?.entretiensParStatut?.planifie || 0, color: '#F59E0B', bg: '#FEF3C7' },
    { label: 'Acceptés', value: stats?.entretiensParStatut?.accepte || 0, color: '#10B981', bg: '#D1FAE5' },
    { label: 'Refusés', value: stats?.entretiensParStatut?.refuse || 0, color: '#EF4444', bg: '#FEE2E2' },
  ];

  return (
    <AdminLayout title="Dashboard Administrateur">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {statsCards.map((s, i) => (
            <div key={i} style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              boxShadow: '0 2px 8px rgba(15,23,42,.04)',
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '12px',
                background: s.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                flexShrink: 0,
              }}>
                {s.icon}
              </div>
              <div>
                <div style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '28px',
                  fontWeight: '800',
                  color: s.color,
                }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '13px', color: '#94A3B8', fontWeight: '500' }}>
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
      </div>
    </AdminLayout>
  );
}

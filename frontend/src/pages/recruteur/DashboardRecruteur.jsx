import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { professionalTheme, professionalKeyframes } from '../../theme/professionalTheme';
import RecruteurLayout from '../../layouts/RecruteurLayout';
import api from '../../utils/api';

export default function DashboardRecruteur() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recentCandidatures, setRecentCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetchStats();
    fetchRecentCandidatures();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await api('/offres/stats');
      setStats(data.stats);
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentCandidatures = async () => {
    try {
      const data = await api('/candidatures/recent');
      setRecentCandidatures(data.candidatures || []);
    } catch (err) {
      console.error('Error fetching recent candidatures:', err);
    }
  };

  const cards = [
    {
      label: 'Offres publiées',
      value: stats?.totalOffres || 0,
      change: '+2 ce mois',
      positive: true,
      color: '#5B73F7',
      bg: 'rgba(91, 115, 247, 0.1)',
      icon: '📋',
    },
    {
      label: 'Candidatures reçues',
      value: stats?.totalCandidatures || 0,
      change: '+12 cette sem',
      positive: true,
      color: '#06B6D4',
      bg: 'rgba(6, 182, 212, 0.1)',
      icon: '📨',
    },
    {
      label: 'Entretiens planifiés',
      value: stats?.totalEntretiens || 0,
      change: '+5 cette sem',
      positive: true,
      color: '#F59E0B',
      bg: 'rgba(245, 158, 11, 0.1)',
      icon: '🎯',
    },
    {
      label: 'Offres actives',
      value: stats?.offresActives || 0,
      change: 'Stable',
      positive: true,
      color: '#10B981',
      bg: 'rgba(16, 185, 129, 0.1)',
      icon: '✅',
    },
  ];

  const quickActions = [
    { label: 'Nouvelle offre', icon: '➕', path: '/recruteur/offres', color: '#10B981' },
    { label: 'Mes candidatures', icon: '📨', path: '/recruteur/candidatures', color: '#5B73F7' },
    { label: 'Planifier entretien', icon: '📅', path: '/recruteur/planifier', color: '#F59E0B' },
    { label: 'Mes entretiens', icon: '🎯', path: '/recruteur/entretiens', color: '#EC4899' },
  ];

  const getStatusBadge = (statut) => {
    const badges = {
      en_attente: { bg: '#FEF3C7', color: '#D97706', label: 'En attente' },
      entretien: { bg: '#DBEAFE', color: '#1E3A8A', label: 'Entretien' },
      accepte: { bg: '#D1FAE5', color: '#059669', label: 'Accepté' },
      refuse: { bg: '#FEE2E2', color: '#DC2626', label: 'Refusé' },
    };
    return badges[statut] || badges.en_attente;
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
    },
    headerTitle: {
      fontSize: professionalTheme.fontSizes['2xl'],
      fontWeight: 800,
      color: professionalTheme.colors.neutral[900],
    },
    headerSubtitle: {
      fontSize: professionalTheme.fontSizes.base,
      color: professionalTheme.colors.neutral[600],
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: '1.5rem',
    },
    statCard: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      padding: isMobile ? '1.5rem' : '2rem',
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      boxShadow: professionalTheme.shadows.sm,
      transition: professionalTheme.transitions.default,
    },
    statHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1rem',
    },
    statIcon: {
      width: '56px',
      height: '56px',
      borderRadius: professionalTheme.radius.xl,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.75rem',
    },
    statChange: {
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[500],
    },
    statValue: {
      fontSize: professionalTheme.fontSizes['3xl'],
      fontWeight: 800,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.25rem',
    },
    statLabel: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      fontWeight: 500,
    },
    quickActions: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: '1rem',
    },
    quickActionButton: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius.xl,
      padding: '1.5rem',
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      cursor: 'pointer',
      transition: professionalTheme.transitions.default,
    },
    quickActionIcon: {
      width: '48px',
      height: '48px',
      borderRadius: professionalTheme.radius.lg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
    },
    quickActionLabel: {
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[900],
    },
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
      gap: '2rem',
    },
    card: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      boxShadow: professionalTheme.shadows.sm,
      overflow: 'hidden',
    },
    cardHeader: {
      padding: '1.5rem 2rem',
      borderBottom: `1px solid ${professionalTheme.colors.neutral[200]}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardTitle: {
      fontSize: professionalTheme.fontSizes.lg,
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
    },
    cardBody: {
      padding: '0',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    tableHeader: {
      background: professionalTheme.colors.neutral[50],
    },
    tableCell: {
      padding: '1rem 2rem',
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      textAlign: 'left',
      borderBottom: `1px solid ${professionalTheme.colors.neutral[200]}`,
    },
    tableRow: {
      transition: professionalTheme.transitions.fast,
      cursor: 'pointer',
    },
    candidatCell: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    candidatAvatar: {
      width: '40px',
      height: '40px',
      borderRadius: professionalTheme.radius.full,
      background: professionalTheme.colors.neutral[100],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1rem',
    },
    badge: {
      padding: '0.25rem 0.75rem',
      borderRadius: professionalTheme.radius.full,
      fontSize: professionalTheme.fontSizes.xs,
      fontWeight: 600,
    },
    statsList: {
      padding: '1.5rem 2rem',
    },
    statsGroup: {
      marginBottom: '2rem',
    },
    statsGroupTitle: {
      fontSize: professionalTheme.fontSizes.base,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '1rem',
    },
    statBar: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '0.75rem',
    },
    statBarLabel: {
      flex: 1,
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[700],
    },
    statBarTrack: {
      flex: 2,
      height: '8px',
      background: professionalTheme.colors.neutral[100],
      borderRadius: professionalTheme.radius.full,
      overflow: 'hidden',
    },
    statBarFill: (width, color) => ({
      height: '100%',
      width: `${width}%`,
      background: color,
      borderRadius: professionalTheme.radius.full,
    }),
    statBarValue: {
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
      minWidth: '40px',
      textAlign: 'right',
    },
    emptyState: {
      padding: '3rem',
      textAlign: 'center',
      color: professionalTheme.colors.neutral[500],
    },
  };

  if (loading) {
    return (
      <RecruteurLayout title="Dashboard RH">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
            <div style={{ color: professionalTheme.colors.neutral[600] }}>Chargement...</div>
          </div>
        </div>
      </RecruteurLayout>
    );
  }

  return (
    <RecruteurLayout title="Dashboard RH">
      <style>{professionalKeyframes}</style>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.headerTitle}>Tableau de bord</h1>
            <p style={styles.headerSubtitle}>Bienvenue sur votre espace recruteur</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={styles.statsGrid}>
          {cards.map((stat, index) => (
            <div
              key={index}
              style={styles.statCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = professionalTheme.shadows.lg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = professionalTheme.shadows.sm;
              }}
            >
              <div style={styles.statHeader}>
                <div style={{ ...styles.statIcon, background: stat.bg }}>
                  {stat.icon}
                </div>
                <div style={styles.statChange}>{stat.change}</div>
              </div>
              <div style={styles.statValue}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 style={{ fontSize: professionalTheme.fontSizes.xl, fontWeight: 700, marginBottom: '1rem', color: professionalTheme.colors.neutral[900] }}>
            Actions rapides
          </h2>
          <div style={styles.quickActions}>
            {quickActions.map((action, index) => (
              <div
                key={index}
                style={styles.quickActionButton}
                onClick={() => navigate(action.path)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = professionalTheme.shadows.md;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ ...styles.quickActionIcon, background: `${action.color}15` }}>
                  {action.icon}
                </div>
                <div style={styles.quickActionLabel}>{action.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div style={styles.contentGrid}>
          {/* Recent Candidatures */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Candidatures récentes</h3>
              <button
                onClick={() => navigate('/recruteur/candidatures')}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: professionalTheme.radius.full,
                  border: `1px solid ${professionalTheme.colors.neutral[200]}`,
                  background: '#FFFFFF',
                  color: professionalTheme.colors.neutral[700],
                  fontSize: professionalTheme.fontSizes.sm,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Voir tout
              </button>
            </div>
            <div style={styles.cardBody}>
              {recentCandidatures.length > 0 ? (
                <table style={styles.table}>
                  <thead style={styles.tableHeader}>
                    <tr>
                      <th style={styles.tableCell}>Candidat</th>
                      <th style={styles.tableCell}>Offre</th>
                      <th style={styles.tableCell}>Statut</th>
                      <th style={styles.tableCell}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCandidatures.slice(0, 5).map((candidature, index) => (
                      <tr
                        key={index}
                        style={styles.tableRow}
                        onClick={() => navigate(`/recruteur/candidatures`)}
                        onMouseEnter={(e) => e.currentTarget.style.background = professionalTheme.colors.neutral[50]}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <td style={styles.tableCell}>
                          <div style={styles.candidatCell}>
                            <div style={styles.candidatAvatar}>
                              {candidature.candidatId?.photo || '👤'}
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, color: professionalTheme.colors.neutral[900] }}>
                                {candidature.candidatId?.nom || 'Candidat'}
                              </div>
                              <div style={{ fontSize: professionalTheme.fontSizes.xs, color: professionalTheme.colors.neutral[500] }}>
                                {candidature.candidatId?.email || ''}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td style={styles.tableCell}>
                          {candidature.offreId?.titre || 'Offre'}
                        </td>
                        <td style={styles.tableCell}>
                          <span style={{
                            ...styles.badge,
                            ...getStatusBadge(candidature.statut),
                          }}>
                            {getStatusBadge(candidature.statut).label}
                          </span>
                        </td>
                        <td style={styles.tableCell}>
                          {new Date(candidature.createdAt).toLocaleDateString('fr-FR')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={styles.emptyState}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📭</div>
                  <p>Aucune candidature récente</p>
                </div>
              )}
            </div>
          </div>

          {/* Stats Bars */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Statistiques</h3>
            </div>
            <div style={styles.statsList}>
              {/* Candidatures */}
              <div style={styles.statsGroup}>
                <h4 style={styles.statsGroupTitle}>Candidatures par statut</h4>
                {[
                  { label: 'En attente', value: stats?.candidaturesParStatut?.en_attente || 0, total: stats?.totalCandidatures || 1, color: '#F59E0B' },
                  { label: 'Entretien', value: stats?.candidaturesParStatut?.entretien || 0, total: stats?.totalCandidatures || 1, color: '#3B82F6' },
                  { label: 'Acceptées', value: stats?.candidaturesParStatut?.accepte || 0, total: stats?.totalCandidatures || 1, color: '#10B981' },
                  { label: 'Refusées', value: stats?.candidaturesParStatut?.refuse || 0, total: stats?.totalCandidatures || 1, color: '#EF4444' },
                ].map((item, index) => {
                  const percentage = item.total > 0 ? Math.round((item.value / item.total) * 100) : 0;
                  return (
                    <div key={index} style={styles.statBar}>
                      <div style={styles.statBarLabel}>{item.label}</div>
                      <div style={styles.statBarTrack}>
                        <div style={styles.statBarFill(percentage, item.color)} />
                      </div>
                      <div style={styles.statBarValue}>{item.value}</div>
                    </div>
                  );
                })}
              </div>

              {/* Entretiens */}
              <div style={styles.statsGroup}>
                <h4 style={styles.statsGroupTitle}>Entretiens par statut</h4>
                {[
                  { label: 'Planifiés', value: stats?.entretiensParStatut?.planifie || 0, total: stats?.totalEntretiens || 1, color: '#F59E0B' },
                  { label: 'Acceptés', value: stats?.entretiensParStatut?.accepte || 0, total: stats?.totalEntretiens || 1, color: '#10B981' },
                  { label: 'Refusés', value: stats?.entretiensParStatut?.refuse || 0, total: stats?.totalEntretiens || 1, color: '#EF4444' },
                ].map((item, index) => {
                  const percentage = item.total > 0 ? Math.round((item.value / item.total) * 100) : 0;
                  return (
                    <div key={index} style={styles.statBar}>
                      <div style={styles.statBarLabel}>{item.label}</div>
                      <div style={styles.statBarTrack}>
                        <div style={styles.statBarFill(percentage, item.color)} />
                      </div>
                      <div style={styles.statBarValue}>{item.value}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </RecruteurLayout>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { professionalTheme, professionalKeyframes } from '../../theme/professionalTheme';
import CandidatLayout from '../../layouts/CandidatLayout';
import api from '../../utils/api';

// Modern SVG Icons
const Icons = {
  briefcase: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  send: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
  calendar: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  heart: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  checkCircle: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  clock: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  trendingUp: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  trendingDown: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
      <polyline points="17 18 23 18 23 12"/>
    </svg>
  ),
  search: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  user: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  bell: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
  fileText: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <line x1="10" y1="9" x2="8" y2="9"/>
    </svg>
  ),
  arrowRight: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  refresh: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/>
      <polyline points="1 20 1 14 7 14"/>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
    </svg>
  ),
};

export default function DashboardCandidat() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentCandidatures, setRecentCandidatures] = useState([]);
  const [recommendedOffres, setRecommendedOffres] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetchStats();
    fetchRecentCandidatures();
    fetchRecommendedOffres();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await api('/candidatures/stats');
      setStats(data.stats);
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentCandidatures = async () => {
    try {
      const data = await api('/candidatures/mes');
      setRecentCandidatures(data.candidatures || []);
    } catch (err) {
      console.error('Error fetching candidatures:', err);
    }
  };

  const fetchRecommendedOffres = async () => {
    try {
      const data = await api('/offres/recommended');
      setRecommendedOffres(data.offres || []);
    } catch (err) {
      console.error('Error fetching recommended offres:', err);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchStats(), fetchRecentCandidatures(), fetchRecommendedOffres()]);
    setTimeout(() => setRefreshing(false), 500);
  };

  const statsCards = [
    {
      label: 'Candidatures',
      value: stats?.totalCandidatures || 0,
      change: '+3 cette sem',
      positive: true,
      color: '#5B73F7',
      bg: 'rgba(91, 115, 247, 0.1)',
      icon: Icons.send,
    },
    {
      label: 'Entretiens',
      value: stats?.entretiensPlanifies || 0,
      change: '+2 cette sem',
      positive: true,
      color: '#10B981',
      bg: 'rgba(16, 185, 129, 0.1)',
      icon: Icons.calendar,
    },
    {
      label: 'Favoris',
      value: stats?.totalFavoris || 0,
      change: 'Stable',
      positive: true,
      color: '#EC4899',
      bg: 'rgba(236, 72, 153, 0.1)',
      icon: Icons.heart,
    },
    {
      label: 'En attente',
      value: stats?.enAttente || 0,
      change: 'En cours',
      positive: false,
      color: '#F59E0B',
      bg: 'rgba(245, 158, 11, 0.1)',
      icon: Icons.clock,
    },
  ];

  const quickActions = [
    { label: 'Chercher des offres', icon: Icons.search, path: '/candidat/offres', color: '#5B73F7' },
    { label: 'Mes candidatures', icon: Icons.fileText, path: '/candidat/candidatures', color: '#10B981' },
    { label: 'Mes entretiens', icon: Icons.calendar, path: '/candidat/entretiens', color: '#F59E0B' },
    { label: 'Mon profil', icon: Icons.user, path: '/candidat/profil', color: '#8B5CF6' },
  ];

  const getStatusBadge = (statut) => {
    const badges = {
      en_attente: { bg: '#FEF3C7', color: '#D97706', label: 'En attente' },
      en_cours: { bg: '#DBEAFE', color: '#1E3A8A', label: 'En cours' },
      entretien: { bg: '#D1FAE5', color: '#059669', label: 'Entretien' },
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
    headerLeft: {
      flex: 1,
    },
    headerTitle: {
      fontSize: professionalTheme.fontSizes['3xl'],
      fontWeight: 800,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.25rem',
    },
    headerSubtitle: {
      fontSize: professionalTheme.fontSizes.base,
      color: professionalTheme.colors.neutral[600],
    },
    refreshButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1.25rem',
      borderRadius: professionalTheme.radius.full,
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      background: '#FFFFFF',
      color: professionalTheme.colors.neutral[700],
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      cursor: 'pointer',
      transition: professionalTheme.transitions.default,
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
      cursor: 'default',
      overflow: 'hidden',
      borderTop: '4px solid transparent',
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
    },
    statChange: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      padding: '0.25rem 0.5rem',
      borderRadius: professionalTheme.radius.full,
    },
    statValue: {
      fontSize: professionalTheme.fontSizes['3xl'],
      fontWeight: 800,
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
      color: 'var(--action-color)',
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
      fontWeight: 500,
      color: professionalTheme.colors.neutral[600],
      textAlign: 'left',
      borderBottom: `1px solid ${professionalTheme.colors.neutral[200]}`,
    },
    tableRow: {
      transition: professionalTheme.transitions.fast,
      cursor: 'pointer',
    },
    badge: {
      padding: '0.25rem 0.75rem',
      borderRadius: professionalTheme.radius.full,
      fontSize: professionalTheme.fontSizes.xs,
      fontWeight: 600,
    },
    offreCard: {
      padding: '1.5rem 2rem',
      borderBottom: `1px solid ${professionalTheme.colors.neutral[200]}`,
      cursor: 'pointer',
      transition: professionalTheme.transitions.fast,
    },
    offreTitle: {
      fontSize: professionalTheme.fontSizes.base,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.5rem',
    },
    offreCompany: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      marginBottom: '0.75rem',
    },
    offreMeta: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
    },
    offreMetaItem: {
      fontSize: professionalTheme.fontSizes.xs,
      color: professionalTheme.colors.neutral[500],
      background: professionalTheme.colors.neutral[100],
      padding: '0.25rem 0.5rem',
      borderRadius: professionalTheme.radius.sm,
    },
    statBars: {
      padding: '1.5rem 2rem',
    },
    statBarGroup: {
      marginBottom: '2rem',
    },
    statBarGroupTitle: {
      fontSize: professionalTheme.fontSizes.base,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '1rem',
    },
    statBar: (value, total, color) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '0.75rem',
    }),
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
      <CandidatLayout title="Dashboard Candidat">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                border: '4px solid #E5E7EB',
                borderTopColor: '#5B73F7',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }} />
            </div>
            <div style={{ color: professionalTheme.colors.neutral[600] }}>Chargement...</div>
          </div>
        </div>
      </CandidatLayout>
    );
  }

  return (
    <CandidatLayout title="Dashboard Candidat">
      <style>{professionalKeyframes}</style>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .rotate {
          animation: rotate 1s linear infinite;
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <h1 style={styles.headerTitle}>Tableau de bord</h1>
            <p style={styles.headerSubtitle}>Bienvenue sur votre espace candidat</p>
          </div>
          <button
            onClick={handleRefresh}
            style={{
              ...styles.refreshButton,
              opacity: refreshing ? 0.7 : 1,
            }}
            disabled={refreshing}
          >
            <span style={refreshing ? { animation: 'rotate 1s linear infinite' } : {}}>
              {Icons.refresh}
            </span>
            {refreshing ? 'Actualisation...' : 'Actualiser'}
          </button>
        </div>

        {/* Stats Grid */}
        <div style={styles.statsGrid}>
          {statsCards.map((stat, index) => (
            <div
              key={index}
              style={{
                ...styles.statCard,
                borderTopColor: stat.color,
              }}
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
                <div style={{ ...styles.statIcon, background: stat.bg, color: stat.color }}>
                  {stat.icon}
                </div>
                <div style={{
                  ...styles.statChange,
                  background: stat.positive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  color: stat.positive ? '#059669' : '#EF4444',
                }}>
                  {stat.positive ? Icons.trendingUp : Icons.trendingDown}
                  {stat.change}
                </div>
              </div>
              <div style={{ ...styles.statValue, color: stat.color }}>
                {stat.value.toLocaleString()}
              </div>
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
                <div style={{
                  ...styles.quickActionIcon,
                  background: `${action.color}15`,
                  color: action.color,
                }}>
                  {action.icon}
                </div>
                <div style={styles.quickActionLabel}>{action.label}</div>
                <div style={{ marginLeft: 'auto', color: professionalTheme.colors.neutral[400] }}>
                  {Icons.arrowRight}
                </div>
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
                onClick={() => navigate('/candidat/candidatures')}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: professionalTheme.radius.full,
                  border: `1px solid ${professionalTheme.colors.neutral[200]}`,
                  background: '#FFFFFF',
                  color: professionalTheme.colors.neutral[700],
                  fontSize: professionalTheme.fontSizes.sm,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: professionalTheme.transitions.fast,
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = professionalTheme.colors.neutral[50]}
                onMouseLeave={(e) => e.currentTarget.style.background = '#FFFFFF'}
              >
                Voir tout
              </button>
            </div>
            <div style={styles.cardBody}>
              {recentCandidatures.length > 0 ? (
                <table style={styles.table}>
                  <thead style={styles.tableHeader}>
                    <tr>
                      <th style={styles.tableCell}>Offre</th>
                      <th style={styles.tableCell}>Entreprise</th>
                      <th style={styles.tableCell}>Statut</th>
                      <th style={styles.tableCell}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCandidatures.slice(0, 5).map((candidature, index) => (
                      <tr
                        key={index}
                        style={styles.tableRow}
                        onClick={() => navigate('/candidat/candidatures')}
                        onMouseEnter={(e) => e.currentTarget.style.background = professionalTheme.colors.neutral[50]}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <td style={styles.tableCell}>
                          <div style={{ fontWeight: 600, color: professionalTheme.colors.neutral[900] }}>
                            {candidature.offreId?.titre || 'Offre'}
                          </div>
                        </td>
                        <td style={styles.tableCell}>
                          {candidature.offreId?.entrepriseId?.nom || 'Entreprise'}
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
                  <p>Aucune candidature pour le moment</p>
                  <button
                    onClick={() => navigate('/candidat/offres')}
                    style={{
                      marginTop: '1rem',
                      padding: '0.75rem 1.5rem',
                      borderRadius: professionalTheme.radius.full,
                      border: 'none',
                      background: '#5B73F7',
                      color: '#FFFFFF',
                      fontSize: professionalTheme.fontSizes.sm,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Découvrir des offres
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Recommended Offres */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Offres recommandées</h3>
              <button
                onClick={() => navigate('/candidat/offres')}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: professionalTheme.radius.full,
                  border: `1px solid ${professionalTheme.colors.neutral[200]}`,
                  background: '#FFFFFF',
                  color: professionalTheme.colors.neutral[700],
                  fontSize: professionalTheme.fontSizes.sm,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: professionalTheme.transitions.fast,
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = professionalTheme.colors.neutral[50]}
                onMouseLeave={(e) => e.currentTarget.style.background = '#FFFFFF'}
              >
                Voir tout
              </button>
            </div>
            <div style={styles.cardBody}>
              {recommendedOffres.length > 0 ? (
                recommendedOffres.slice(0, 4).map((offre, index) => (
                  <div
                    key={index}
                    style={styles.offreCard}
                    onClick={() => navigate(`/offres/${offre._id}`)}
                    onMouseEnter={(e) => e.currentTarget.style.background = professionalTheme.colors.neutral[50]}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={styles.offreTitle}>{offre.titre}</div>
                    <div style={styles.offreCompany}>{offre.entrepriseId?.nom || 'Entreprise'}</div>
                    <div style={styles.offreMeta}>
                      <span style={styles.offreMetaItem}>{offre.type}</span>
                      <span style={styles.offreMetaItem}>{offre.lieu}</span>
                      <span style={styles.offreMetaItem}>{offre.salaire}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div style={styles.emptyState}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔍</div>
                  <p>Explorez les offres disponibles</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </CandidatLayout>
  );
}

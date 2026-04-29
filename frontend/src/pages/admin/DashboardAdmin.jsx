import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { professionalTheme, professionalKeyframes } from '../../theme/professionalTheme';
import AdminLayout from '../../layouts/AdminLayout';
import api from '../../utils/api';

// Modern SVG Icons
const Icons = {
  users: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  building: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
      <path d="M9 22v-4h6v4"/>
      <path d="M8 6h.01"/>
      <path d="M16 6h.01"/>
      <path d="M8 10h.01"/>
      <path d="M16 10h.01"/>
      <path d="M8 14h.01"/>
      <path d="M16 14h.01"/>
      <path d="M8 18h.01"/>
      <path d="M16 18h.01"/>
    </svg>
  ),
  user: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  briefcase: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
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
  target: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  clock: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  checkCircle: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
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
  settings: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
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

export default function DashboardAdmin() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentUsers, setRecentUsers] = useState([]);
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
    fetchRecentUsers();
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

  const fetchRecentUsers = async () => {
    try {
      const data = await api('/users/recent');
      setRecentUsers(data.users || []);
    } catch (err) {
      console.error('Error fetching recent users:', err);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchStats(), fetchRecentUsers()]);
    setTimeout(() => setRefreshing(false), 500);
  };

  const statsCards = [
    {
      label: 'Utilisateurs',
      value: stats?.totalUsers || 0,
      change: '+12%',
      positive: true,
      color: '#5B73F7',
      bg: 'rgba(91, 115, 247, 0.1)',
      icon: Icons.users,
    },
    {
      label: 'Recruteurs',
      value: stats?.totalRecruteurs || 0,
      change: '+8%',
      positive: true,
      color: '#10B981',
      bg: 'rgba(16, 185, 129, 0.1)',
      icon: Icons.building,
    },
    {
      label: 'Candidats',
      value: stats?.totalCandidats || 0,
      change: '+15%',
      positive: true,
      color: '#8B5CF6',
      bg: 'rgba(139, 92, 246, 0.1)',
      icon: Icons.user,
    },
    {
      label: 'Offres',
      value: stats?.totalOffres || 0,
      change: '+5%',
      positive: true,
      color: '#F59E0B',
      bg: 'rgba(245, 158, 11, 0.1)',
      icon: Icons.briefcase,
    },
    {
      label: 'Candidatures',
      value: stats?.totalCandidatures || 0,
      change: '+22%',
      positive: true,
      color: '#06B6D4',
      bg: 'rgba(6, 182, 212, 0.1)',
      icon: Icons.fileText,
    },
    {
      label: 'Entretiens',
      value: stats?.totalEntretiens || 0,
      change: '+18%',
      positive: true,
      color: '#EC4899',
      bg: 'rgba(236, 72, 153, 0.1)',
      icon: Icons.target,
    },
    {
      label: 'En attente',
      value: stats?.pending || 0,
      change: '-3%',
      positive: false,
      color: '#F59E0B',
      bg: 'rgba(245, 158, 11, 0.1)',
      icon: Icons.clock,
    },
    {
      label: 'Vérifiés',
      value: stats?.verified || 0,
      change: '+10%',
      positive: true,
      color: '#10B981',
      bg: 'rgba(16, 185, 129, 0.1)',
      icon: Icons.checkCircle,
    },
  ];

  const quickActions = [
    { label: 'Gérer les recruteurs', icon: Icons.building, path: '/admin/recruteurs', color: '#10B981' },
    { label: 'Voir les candidats', icon: Icons.user, path: '/admin/candidats', color: '#5B73F7' },
    { label: 'Gérer les offres', icon: Icons.briefcase, path: '/admin/offres', color: '#F59E0B' },
    { label: 'Paramètres', icon: Icons.settings, path: '/admin/parametres', color: '#6B7280' },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      pending: { bg: '#FEF3C7', color: '#D97706', label: 'En attente' },
      active: { bg: '#D1FAE5', color: '#059669', label: 'Actif' },
      rejected: { bg: '#FEE2E2', color: '#DC2626', label: 'Rejeté' },
      suspended: { bg: '#F3F4F6', color: '#4B5563', label: 'Suspendu' },
    };
    return badges[status] || badges.pending;
  };

  const getRoleBadge = (role) => {
    const badges = {
      admin: { bg: '#FEE2E2', color: '#DC2626', label: 'Admin' },
      recruteur: { bg: '#DBEAFE', color: '#1E3A8A', label: 'Recruteur' },
      candidat: { bg: '#EDE9FE', color: '#7C3AED', label: 'Candidat' },
    };
    return badges[role] || badges.candidat;
  };

  const getInitials = (nom) => {
    if (!nom) return 'U';
    return nom.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (nom) => {
    const colors = ['#5B73F7', '#10B981', '#8B5CF6', '#F59E0B', '#06B6D4', '#EC4899'];
    if (!nom) return colors[0];
    const index = nom.charCodeAt(0) % colors.length;
    return colors[index];
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
  };

  if (loading) {
    return (
      <AdminLayout title="Dashboard Administrateur">
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
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard Administrateur">
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
            <p style={styles.headerSubtitle}>Vue d'ensemble de la plateforme</p>
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
          {/* Recent Users Table */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Utilisateurs récents</h3>
              <button
                onClick={() => navigate('/admin/recruteurs')}
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
              <table style={styles.table}>
                <thead style={styles.tableHeader}>
                  <tr>
                    <th style={styles.tableCell}>Utilisateur</th>
                    <th style={styles.tableCell}>Rôle</th>
                    <th style={styles.tableCell}>Statut</th>
                    <th style={styles.tableCell}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.slice(0, 5).map((user, index) => (
                    <tr
                      key={index}
                      style={styles.tableRow}
                      onMouseEnter={(e) => e.currentTarget.style.background = professionalTheme.colors.neutral[50]}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={styles.tableCell}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: professionalTheme.radius.full,
                            background: getAvatarColor(user.nom),
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: professionalTheme.fontSizes.sm,
                            fontWeight: 600,
                          }}>
                            {getInitials(user.nom)}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: professionalTheme.colors.neutral[900] }}>
                              {user.nom}
                            </div>
                            <div style={{ fontSize: professionalTheme.fontSizes.xs, color: professionalTheme.colors.neutral[500] }}>
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={styles.tableCell}>
                        <span style={{
                          ...styles.badge,
                          ...getRoleBadge(user.role),
                        }}>
                          {getRoleBadge(user.role).label}
                        </span>
                      </td>
                      <td style={styles.tableCell}>
                        <span style={{
                          ...styles.badge,
                          ...getStatusBadge(user.status),
                        }}>
                          {getStatusBadge(user.status).label}
                        </span>
                      </td>
                      <td style={styles.tableCell}>
                        {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stats Bars */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Statistiques détaillées</h3>
            </div>
            <div style={styles.statBars}>
              {/* Candidatures */}
              <div style={styles.statBarGroup}>
                <h4 style={styles.statBarGroupTitle}>Candidatures</h4>
                {[
                  { label: 'En attente', value: stats?.candidaturesParStatut?.en_attente || 0, total: stats?.totalCandidatures || 1, color: '#F59E0B' },
                  { label: 'Entretien', value: stats?.candidaturesParStatut?.entretien || 0, total: stats?.totalCandidatures || 1, color: '#3B82F6' },
                  { label: 'Acceptées', value: stats?.candidaturesParStatut?.accepte || 0, total: stats?.totalCandidatures || 1, color: '#10B981' },
                  { label: 'Refusées', value: stats?.candidaturesParStatut?.refuse || 0, total: stats?.totalCandidatures || 1, color: '#EF4444' },
                ].map((item, index) => {
                  const percentage = item.total > 0 ? Math.round((item.value / item.total) * 100) : 0;
                  return (
                    <div key={index} style={styles.statBar(item.value, item.total, item.color)}>
                      <div style={styles.statBarLabel}>{item.label}</div>
                      <div style={styles.statBarTrack}>
                        <div style={{
                          height: '100%',
                          width: `${percentage}%`,
                          background: item.color,
                          borderRadius: professionalTheme.radius.full,
                          transition: 'width 0.5s ease',
                        }} />
                      </div>
                      <div style={styles.statBarValue}>{item.value}</div>
                    </div>
                  );
                })}
              </div>

              {/* Entretiens */}
              <div style={styles.statBarGroup}>
                <h4 style={styles.statBarGroupTitle}>Entretiens</h4>
                {[
                  { label: 'Planifiés', value: stats?.entretiensParStatut?.planifie || 0, total: stats?.totalEntretiens || 1, color: '#F59E0B' },
                  { label: 'Acceptés', value: stats?.entretiensParStatut?.accepte || 0, total: stats?.totalEntretiens || 1, color: '#10B981' },
                  { label: 'Refusés', value: stats?.entretiensParStatut?.refuse || 0, total: stats?.totalEntretiens || 1, color: '#EF4444' },
                ].map((item, index) => {
                  const percentage = item.total > 0 ? Math.round((item.value / item.total) * 100) : 0;
                  return (
                    <div key={index} style={styles.statBar(item.value, item.total, item.color)}>
                      <div style={styles.statBarLabel}>{item.label}</div>
                      <div style={styles.statBarTrack}>
                        <div style={{
                          height: '100%',
                          width: `${percentage}%`,
                          background: item.color,
                          borderRadius: professionalTheme.radius.full,
                          transition: 'width 0.5s ease',
                        }} />
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
    </AdminLayout>
  );
}

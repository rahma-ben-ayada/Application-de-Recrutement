import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { professionalTheme, professionalKeyframes } from '../../theme/professionalTheme';
import RecruteurLayout from '../../layouts/RecruteurLayout';
import api from '../../utils/api';

// Professional SVG Icons
const Icons = {
  calendar: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
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
  xCircle: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="15" y1="9" x2="9" y2="15"/>
      <line x1="9" y1="9" x2="15" y2="15"/>
    </svg>
  ),
  target: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  user: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  briefcase: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  video: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7"/>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
    </svg>
  ),
  fileText: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <line x1="10" y1="9" x2="8" y2="9"/>
    </svg>
  ),
  externalLink: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  ),
  plus: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
};

export default function EntretiensRH() {
  const navigate = useNavigate();
  const [entretiens, setEntretiens] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetchEntretiens();
  }, []);

  const fetchEntretiens = async () => {
    try {
      const data = await api('/entretiens/mes');
      setEntretiens(data.entretiens || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (statut) => {
    const configs = {
      planifié: {
        bg: '#FEF3C7',
        color: '#D97706',
        label: 'Planifié',
        icon: Icons.clock,
      },
      accepté: {
        bg: '#D1FAE5',
        color: '#059669',
        label: 'Accepté',
        icon: Icons.checkCircle,
      },
      refusé: {
        bg: '#FEE2E2',
        color: '#DC2626',
        label: 'Refusé',
        icon: Icons.xCircle,
      },
    };
    return configs[statut] || configs.planifié;
  };

  const getInitials = (nom) => {
    if (!nom) return '?';
    return nom.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (nom) => {
    const colors = ['#5B73F7', '#10B981', '#8B5CF6', '#F59E0B', '#06B6D4', '#EC4899'];
    if (!nom) return colors[0];
    const index = nom.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const filtered = filter === 'all'
    ? entretiens
    : entretiens.filter(e => e.statut === filter);

  const stats = {
    total: entretiens.length,
    planifié: entretiens.filter(e => e.statut === 'planifié').length,
    accepté: entretiens.filter(e => e.statut === 'accepté').length,
    refusé: entretiens.filter(e => e.statut === 'refusé').length,
  };

  const filterOptions = [
    { key: 'all', label: 'Tous', icon: Icons.target },
    { key: 'planifié', label: 'Planifiés', icon: Icons.clock },
    { key: 'accepté', label: 'Acceptés', icon: Icons.checkCircle },
    { key: 'refusé', label: 'Refusés', icon: Icons.xCircle },
  ];

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
      fontSize: professionalTheme.fontSizes['2xl'],
      fontWeight: 800,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.25rem',
    },
    headerSubtitle: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: '1.5rem',
      marginBottom: '2rem',
    },
    statCard: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      padding: '1.5rem',
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      boxShadow: professionalTheme.shadows.sm,
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      transition: professionalTheme.transitions.default,
    },
    statIcon: {
      width: '56px',
      height: '56px',
      borderRadius: professionalTheme.radius.xl,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    statValue: {
      fontSize: professionalTheme.fontSizes['2xl'],
      fontWeight: 800,
      color: professionalTheme.colors.neutral[900],
    },
    statLabel: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      fontWeight: 500,
    },
    filters: {
      display: 'flex',
      gap: '0.75rem',
      marginBottom: '2rem',
      flexWrap: 'wrap',
    },
    filterButton: {
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
      transition: professionalTheme.transitions.fast,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '1rem',
    },
    card: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      padding: '1.5rem 2rem',
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      boxShadow: professionalTheme.shadows.sm,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: professionalTheme.transitions.default,
    },
    cardLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      flex: 1,
    },
    avatar: {
      width: '56px',
      height: '56px',
      borderRadius: professionalTheme.radius.full,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: professionalTheme.fontSizes.lg,
      fontWeight: 700,
      color: '#FFFFFF',
    },
    candidateInfo: {
      flex: 1,
    },
    candidateName: {
      fontSize: professionalTheme.fontSizes.base,
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.25rem',
    },
    jobTitle: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
    },
    interviewDetails: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[500],
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
    },
    detailItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
    },
    notes: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[500],
      marginTop: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
    },
    cardRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    statusBadge: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      padding: '0.5rem 1rem',
      borderRadius: professionalTheme.radius.full,
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
    },
    joinButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      borderRadius: professionalTheme.radius.full,
      background: 'linear-gradient(135deg, #5B73F7 0%, #4F63E6 100%)',
      color: '#FFFFFF',
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      cursor: 'pointer',
      textDecoration: 'none',
      transition: professionalTheme.transitions.default,
      boxShadow: '0 4px 12px rgba(91, 115, 247, 0.25)',
    },
    emptyState: {
      textAlign: 'center',
      padding: '4rem 2rem',
      color: professionalTheme.colors.neutral[500],
    },
    loadingState: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '400px',
    },
  };

  if (loading) {
    return (
      <RecruteurLayout title="Entretiens">
        <div style={styles.loadingState}>
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
      </RecruteurLayout>
    );
  }

  return (
    <RecruteurLayout title="Entretiens">
      <style>{professionalKeyframes}</style>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <h1 style={styles.headerTitle}>Entretiens planifiés</h1>
            <p style={styles.headerSubtitle}>
              Gérez vos entretiens et suivez les candidats
            </p>
          </div>
          <button
            onClick={() => navigate('/recruteur/planifier')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              borderRadius: professionalTheme.radius.full,
              border: 'none',
              background: 'linear-gradient(135deg, #5B73F7 0%, #4F63E6 100%)',
              color: '#FFFFFF',
              fontSize: professionalTheme.fontSizes.sm,
              fontWeight: 600,
              cursor: 'pointer',
              transition: professionalTheme.transitions.default,
              boxShadow: '0 4px 12px rgba(91, 115, 247, 0.25)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {Icons.plus}
            Planifier un entretien
          </button>
        </div>

        {/* Stats */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: '#DBEAFE', color: '#1E3A8A' }}>
              {Icons.target}
            </div>
            <div>
              <div style={styles.statValue}>{stats.total}</div>
              <div style={styles.statLabel}>Total</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: '#FEF3C7', color: '#D97706' }}>
              {Icons.clock}
            </div>
            <div>
              <div style={{ ...styles.statValue, color: '#D97706' }}>{stats.planifié}</div>
              <div style={styles.statLabel}>Planifiés</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: '#D1FAE5', color: '#059669' }}>
              {Icons.checkCircle}
            </div>
            <div>
              <div style={{ ...styles.statValue, color: '#059669' }}>{stats.accepté}</div>
              <div style={styles.statLabel}>Acceptés</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: '#FEE2E2', color: '#DC2626' }}>
              {Icons.xCircle}
            </div>
            <div>
              <div style={{ ...styles.statValue, color: '#DC2626' }}>{stats.refusé}</div>
              <div style={styles.statLabel}>Refusés</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={styles.filters}>
          {filterOptions.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                ...styles.filterButton,
                background: filter === f.key ? '#5B73F7' : '#FFFFFF',
                color: filter === f.key ? '#FFFFFF' : professionalTheme.colors.neutral[700],
                borderColor: filter === f.key ? '#5B73F7' : professionalTheme.colors.neutral[200],
              }}
              onMouseEnter={(e) => filter !== f.key && (e.currentTarget.style.background = professionalTheme.colors.neutral[50])}
              onMouseLeave={(e) => filter !== f.key && (e.currentTarget.style.background = '#FFFFFF')}
            >
              {f.icon}
              {f.label}
            </button>
          ))}
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>
              {Icons.calendar}
            </div>
            <h3 style={{ fontSize: professionalTheme.fontSizes.xl, fontWeight: 700, marginBottom: '0.5rem', color: professionalTheme.colors.neutral[900] }}>
              Aucun entretien trouvé
            </h3>
            <p style={{ marginBottom: '1.5rem' }}>
              {filter === 'all'
                ? 'Commencez par planifier vos premiers entretiens'
                : 'Aucun entretien ne correspond à ce filtre'}
            </p>
            {filter === 'all' && (
              <button
                onClick={() => navigate('/recruteur/planifier')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  borderRadius: professionalTheme.radius.full,
                  border: 'none',
                  background: 'linear-gradient(135deg, #5B73F7 0%, #4F63E6 100%)',
                  color: '#FFFFFF',
                  fontSize: professionalTheme.fontSizes.sm,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: professionalTheme.transitions.default,
                  boxShadow: '0 4px 12px rgba(91, 115, 247, 0.25)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {Icons.plus}
                Planifier un entretien
              </button>
            )}
          </div>
        ) : (
          <div style={styles.grid}>
            {filtered.map(e => {
              const statusConfig = getStatusConfig(e.statut);

              return (
                <div
                  key={e._id}
                  style={styles.card}
                  onMouseEnter={(event) => event.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(event) => event.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={styles.cardLeft}>
                    <div style={{
                      ...styles.avatar,
                      background: getAvatarColor(e.candidat?.nom),
                    }}>
                      {getInitials(e.candidat?.nom)}
                    </div>
                    <div style={styles.candidateInfo}>
                      <div style={styles.candidateName}>
                        {e.candidat?.nom || 'Candidat inconnu'}
                      </div>
                      <div style={styles.jobTitle}>
                        {Icons.briefcase}
                        {' '}
                        {e.offre?.titre || 'Poste non spécifié'}
                      </div>
                      <div style={styles.interviewDetails}>
                        <div style={styles.detailItem}>
                          {Icons.calendar}
                          {' '}
                          {e.date ? new Date(e.date).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }) : 'Date à définir'}
                        </div>
                        <div style={styles.detailItem}>
                          {Icons.clock}
                          {' '}
                          {e.heure || 'Heure à définir'}
                        </div>
                      </div>
                      {e.notes && (
                        <div style={styles.notes}>
                          {Icons.fileText}
                          {' '}
                          {e.notes}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={styles.cardRight}>
                    {e.lien && (
                      <a
                        href={e.lien}
                        target="_blank"
                        rel="noreferrer"
                        style={styles.joinButton}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        {Icons.video}
                        Rejoindre
                        {Icons.externalLink}
                      </a>
                    )}
                    <span style={{
                      ...styles.statusBadge,
                      background: statusConfig.bg,
                      color: statusConfig.color,
                    }}>
                      {statusConfig.icon}
                      {statusConfig.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </RecruteurLayout>
  );
}

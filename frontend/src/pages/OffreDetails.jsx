import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { professionalTheme, professionalKeyframes } from '../theme/professionalTheme';
import api from '../utils/api';

export default function OffreDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [offre, setOffre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchOffre = async () => {
      setLoading(true);
      try {
        const data = await api(`/offres/${id}`, 'GET');
        setOffre(data.offre);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOffre();
  }, [id]);

  const handleApply = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    // TODO: Implement candidature logic
    navigate('/login');
  };

  const handleSave = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    // TODO: Implement favori logic
    alert('Fonctionnalité de sauvegarde bientôt disponible!');
  };

  function getTimeAgo(date) {
    if (!date) return 'Récent';
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} heures`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} jours`;
    return `${Math.floor(seconds / 604800)} semaines`;
  }

  const styles = {
    page: {
      fontFamily: professionalTheme.fonts.sans,
      background: '#FAFAFA',
      color: professionalTheme.colors.neutral[900],
      minHeight: '100vh',
    },
    navbar: {
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(228, 228, 231, 0.5)',
      transition: professionalTheme.transitions.default,
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    },
    navContainer: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: isMobile ? '0 1.5rem' : '0 2rem',
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      cursor: 'pointer',
      transition: professionalTheme.transitions.fast,
    },
    logoIcon: {
      width: isMobile ? '42px' : '48px',
      height: isMobile ? '42px' : '48px',
      borderRadius: professionalTheme.radius.xl,
      background: professionalTheme.gradients.primary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFFFFF',
      fontWeight: 700,
      fontSize: isMobile ? '16px' : '18px',
    },
    logoText: {
      fontSize: isMobile ? professionalTheme.fontSizes.xl : professionalTheme.fontSizes['2xl'],
      fontWeight: 800,
      background: professionalTheme.gradients.primary,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.625rem 1rem',
      borderRadius: professionalTheme.radius.full,
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      background: '#FFFFFF',
      color: professionalTheme.colors.neutral[700],
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 500,
      cursor: 'pointer',
      transition: professionalTheme.transitions.fast,
    },
    container: {
      maxWidth: '1000px',
      margin: '0 auto',
      padding: isMobile ? '2rem 1.5rem' : '3rem 2rem',
    },
    header: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['3xl'],
      padding: isMobile ? '2rem' : '3rem',
      boxShadow: professionalTheme.shadows.xl,
      marginBottom: '2rem',
    },
    headerTop: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      gap: '1rem',
    },
    companyLogo: {
      width: isMobile ? '80px' : '100px',
      height: isMobile ? '80px' : '100px',
      borderRadius: professionalTheme.radius['2xl'],
      background: professionalTheme.colors.neutral[100],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: isMobile ? '2.5rem' : '3rem',
    },
    headerInfo: {
      flex: 1,
      minWidth: 0,
    },
    companyName: {
      fontSize: professionalTheme.fontSizes.base,
      color: professionalTheme.colors.neutral[600],
      marginBottom: '0.5rem',
    },
    jobTitle: {
      fontSize: isMobile ? professionalTheme.fontSizes['2xl'] : professionalTheme.fontSizes['3xl'],
      fontWeight: 800,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '1rem',
      lineHeight: 1.2,
    },
    postedDate: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.375rem',
      padding: '0.375rem 0.75rem',
      borderRadius: professionalTheme.radius.full,
      background: professionalTheme.colors.neutral[100],
      fontSize: professionalTheme.fontSizes.xs,
      color: professionalTheme.colors.neutral[600],
    },
    saveButton: {
      padding: '0.75rem 1.5rem',
      borderRadius: professionalTheme.radius.full,
      border: `2px solid ${professionalTheme.colors.neutral[200]}`,
      background: '#FFFFFF',
      color: professionalTheme.colors.neutral[700],
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      cursor: 'pointer',
      transition: professionalTheme.transitions.fast,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    tags: {
      display: 'flex',
      gap: '0.75rem',
      flexWrap: 'wrap',
      marginBottom: '2rem',
    },
    tag: {
      padding: '0.625rem 1rem',
      borderRadius: professionalTheme.radius.full,
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
    },
    metaGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: isMobile ? '1rem' : '2rem',
      paddingTop: '2rem',
      borderTop: `1px solid ${professionalTheme.colors.neutral[200]}`,
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    metaIcon: {
      width: '48px',
      height: '48px',
      borderRadius: professionalTheme.radius.lg,
      background: professionalTheme.colors.primary[50],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.25rem',
    },
    metaContent: {
      flex: 1,
    },
    metaLabel: {
      fontSize: professionalTheme.fontSizes.xs,
      color: professionalTheme.colors.neutral[500],
      marginBottom: '0.25rem',
    },
    metaValue: {
      fontSize: professionalTheme.fontSizes.base,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[900],
    },
    section: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['3xl'],
      padding: isMobile ? '2rem' : '3rem',
      boxShadow: professionalTheme.shadows.xl,
      marginBottom: '2rem',
    },
    sectionTitle: {
      fontSize: professionalTheme.fontSizes.xl,
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    description: {
      fontSize: professionalTheme.fontSizes.base,
      lineHeight: 1.7,
      color: professionalTheme.colors.neutral[700],
    },
    requirements: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: '1rem',
    },
    requirement: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      padding: '1rem',
      background: professionalTheme.colors.neutral[50],
      borderRadius: professionalTheme.radius.lg,
    },
    sidebar: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['3xl'],
      padding: isMobile ? '2rem' : '2.5rem',
      boxShadow: professionalTheme.shadows.xl,
      position: 'sticky',
      top: '100px',
    },
    sidebarTitle: {
      fontSize: professionalTheme.fontSizes.lg,
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '1.5rem',
    },
    companyInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1.5rem',
    },
    applyButton: {
      width: '100%',
      padding: '1rem 2rem',
      borderRadius: professionalTheme.radius.full,
      background: professionalTheme.gradients.primary,
      color: '#FFFFFF',
      fontSize: professionalTheme.fontSizes.base,
      fontWeight: 700,
      border: 'none',
      cursor: 'pointer',
      transition: professionalTheme.transitions.default,
      boxShadow: '0 4px 15px rgba(91, 115, 247, 0.3)',
      marginBottom: '1rem',
    },
    shareButton: {
      width: '100%',
      padding: '1rem 2rem',
      borderRadius: professionalTheme.radius.full,
      background: professionalTheme.colors.neutral[100],
      color: professionalTheme.colors.neutral[900],
      fontSize: professionalTheme.fontSizes.base,
      fontWeight: 600,
      border: 'none',
      cursor: 'pointer',
      transition: professionalTheme.transitions.fast,
    },
    loadingState: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      gap: '1rem',
    },
    errorState: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      gap: '1rem',
      textAlign: 'center',
      padding: '2rem',
    },
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <nav style={styles.navbar}>
          <div style={styles.navContainer}>
            <div style={styles.logo} onClick={() => navigate('/')}>
              <div style={styles.logoIcon}>SR</div>
              <div style={styles.logoText}>SmartRecruit</div>
            </div>
          </div>
        </nav>
        <div style={styles.loadingState}>
          <div style={{ fontSize: '3rem' }}>⏳</div>
          <div style={{ fontSize: professionalTheme.fontSizes.lg, fontWeight: 600 }}>
            Chargement...
          </div>
        </div>
      </div>
    );
  }

  if (error || !offre) {
    return (
      <div style={styles.page}>
        <nav style={styles.navbar}>
          <div style={styles.navContainer}>
            <div style={styles.logo} onClick={() => navigate('/')}>
              <div style={styles.logoIcon}>SR</div>
              <div style={styles.logoText}>SmartRecruit</div>
            </div>
          </div>
        </nav>
        <div style={styles.errorState}>
          <div style={{ fontSize: '3rem' }}>😕</div>
          <div style={{ fontSize: professionalTheme.fontSizes.xl, fontWeight: 600 }}>
            Offre non trouvée
          </div>
          <div style={{ color: professionalTheme.colors.neutral[600] }}>
            {error || 'Cette offre n\'existe pas ou a été supprimée.'}
          </div>
          <button
            style={styles.backButton}
            onClick={() => navigate('/offres')}
          >
            ← Retour aux offres
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <style>{professionalKeyframes}</style>

      {/* ===== NAVBAR ===== */}
      <nav style={{
        ...styles.navbar,
        borderBottom: scrolled ? `1px solid ${professionalTheme.colors.neutral[200]}` : '1px solid rgba(228, 228, 231, 0.5)',
      }}>
        <div style={styles.navContainer}>
          <div style={styles.logo} onClick={() => navigate('/')}>
            <div style={styles.logoIcon}>SR</div>
            <div style={styles.logoText}>SmartRecruit</div>
          </div>
          <button
            style={styles.backButton}
            onClick={() => navigate('/offres')}
          >
            ← Retour aux offres
          </button>
        </div>
      </nav>

      {/* ===== CONTENT ===== */}
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.headerTop}>
            <div style={{ display: 'flex', gap: '2rem', flex: 1, minWidth: 0 }}>
              <div style={styles.companyLogo}>
                {offre.recruteur?.photo || '🏢'}
              </div>
              <div style={styles.headerInfo}>
                <div style={styles.companyName}>
                  {offre.recruteur?.entreprise || 'Entreprise'}
                </div>
                <h1 style={styles.jobTitle}>{offre.titre}</h1>
                <div style={styles.postedDate}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                  Posté il y a {getTimeAgo(offre.createdAt)}
                </div>
              </div>
            </div>
            <button style={styles.saveButton} onClick={handleSave}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
              Sauvegarder
            </button>
          </div>

          <div style={styles.tags}>
            <span style={{
              ...styles.tag,
              background: professionalTheme.colors.primary[50],
              color: professionalTheme.colors.primary[700],
            }}>
              {offre.secteur || 'Informatique'}
            </span>
            <span style={{
              ...styles.tag,
              background: professionalTheme.colors.info.light,
              color: professionalTheme.colors.info.dark,
            }}>
              {offre.type}
            </span>
            <span style={{
              ...styles.tag,
              background: professionalTheme.colors.success.light,
              color: professionalTheme.colors.success.dark,
            }}>
              💰 {offre.salaire ? `${offre.salaire.min} - ${offre.salaire.max} ${offre.salaire.devise || 'TND'}` : 'Salaire non spécifié'}
            </span>
          </div>

          <div style={styles.metaGrid}>
            <div style={styles.metaItem}>
              <div style={styles.metaIcon}>📍</div>
              <div style={styles.metaContent}>
                <div style={styles.metaLabel}>Lieu</div>
                <div style={styles.metaValue}>{offre.lieu}</div>
              </div>
            </div>
            <div style={styles.metaItem}>
              <div style={styles.metaIcon}>💼</div>
              <div style={styles.metaContent}>
                <div style={styles.metaLabel}>Type</div>
                <div style={styles.metaValue}>{offre.type}</div>
              </div>
            </div>
            <div style={styles.metaItem}>
              <div style={styles.metaIcon}>📅</div>
              <div style={styles.metaContent}>
                <div style={styles.metaLabel}>Experience</div>
                <div style={styles.metaValue}>{offre.experience || 'Non spécifié'}</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: isMobile ? 'block' : 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
          <div>
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>
                📝 Description du poste
              </h2>
              <div style={styles.description}>
                {offre.description || 'Aucune description disponible.'}
              </div>
            </div>

            {offre.requirements && offre.requirements.length > 0 && (
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>
                  ✅ Requirements & Qualifications
                </h2>
                <div style={styles.requirements}>
                  {offre.requirements.map((req, index) => (
                    <div key={index} style={styles.requirement}>
                      <div style={{ color: professionalTheme.colors.success.dark, fontSize: '1.25rem' }}>✓</div>
                      <div style={{ flex: 1 }}>{req}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={styles.sidebar}>
            <h3 style={styles.sidebarTitle}>À propos de l'entreprise</h3>
            <div style={styles.companyInfo}>
              <div style={{ width: '60px', height: '60px', borderRadius: professionalTheme.radius.lg, background: professionalTheme.colors.neutral[100], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                {offre.recruteur?.photo || '🏢'}
              </div>
              <div>
                <div style={{ fontWeight: 600, color: professionalTheme.colors.neutral[900] }}>
                  {offre.recruteur?.entreprise || 'Entreprise'}
                </div>
                <div style={{ fontSize: professionalTheme.fontSizes.sm, color: professionalTheme.colors.neutral[600] }}>
                  {offre.recruteur?.secteur || 'Secteur non spécifié'}
                </div>
              </div>
            </div>

            <button
              style={styles.applyButton}
              onClick={handleApply}
            >
              Postuler maintenant
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>

            <button style={styles.shareButton}>
              Partager cette offre
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

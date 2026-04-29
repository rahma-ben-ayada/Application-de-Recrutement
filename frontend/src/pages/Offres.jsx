import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { professionalTheme, professionalKeyframes } from '../theme/professionalTheme';
import api from '../utils/api';

const types = ['CDI', 'CDD', 'Stage', 'Freelance', 'Alternance'];

const locations = ['Tunis', 'Remote', 'Sfax', 'Sousse', 'Nabeul', 'Bizerte', 'Monastir', 'Gabès'];

const secteurs = [
  'Informatique', 'Marketing', 'Finance', 'Design', 'Ventes',
  'Ressources Humaines', 'Juridique', 'Santé', 'Ingénierie', 'Autre'
];

const stats = [
  { value: '5000+', label: 'Offres Actives', icon: '💼' },
  { value: '1200+', label: 'Entreprises', icon: '🏢' },
  { value: '15000+', label: 'Candidatures', icon: '📄' },
  { value: '98%', label: 'Satisfaction', icon: '⭐' },
];

const featuredCategories = [
  { name: 'Tech & Digital', icon: '💻', count: 245, color: '#5B73F7' },
  { name: 'Marketing', icon: '📱', count: 128, color: '#14D2C4' },
  { name: 'Finance', icon: '💰', count: 95, color: '#F59E0B' },
  { name: 'Design', icon: '🎨', count: 67, color: '#EC4899' },
  { name: 'RH', icon: '👥', count: 54, color: '#8B5CF6' },
  { name: 'Santé', icon: '🏥', count: 43, color: '#10B981' },
];

export default function Offres() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedSecteur, setSelectedSecteur] = useState('Tous');
  const [selectedType, setSelectedType] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const [offres, setOffres] = useState([]);
  const [loadingOffres, setLoadingOffres] = useState(true);
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchOffres = async () => {
      setLoadingOffres(true);
      try {
        const data = await api('/offres', 'GET');
        const transformedOffres = data.offres?.map((offre) => ({
          id: offre._id,
          titre: offre.titre,
          entreprise: offre.recruteur?.entreprise || 'Entreprise',
          entrepriseId: offre.recruteur?._id,
          lieu: offre.lieu,
          type: offre.type,
          salaire: offre.salaire || 'Non spécifié',
          logo: offre.recruteur?.photo || '🏢',
          posted: getTimeAgo(offre.createdAt),
          secteur: offre.recruteur?.secteur || 'Autre',
          description: offre.description,
          requirements: offre.competences || [],
        })) || [];
        setOffres(transformedOffres);
      } catch (error) {
        console.error('Error fetching offres:', error);
        setOffres([]);
      } finally {
        setLoadingOffres(false);
      }
    };
    fetchOffres();
  }, []);

  function getTimeAgo(date) {
    if (!date) return 'Récent';
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}j`;
    return `${Math.floor(seconds / 604800)} sem`;
  }

  const filteredOffres = offres.filter(offre => {
    const matchSearch = offre.titre.toLowerCase().includes(search.toLowerCase()) ||
                        offre.entreprise.toLowerCase().includes(search.toLowerCase()) ||
                        offre.secteur.toLowerCase().includes(search.toLowerCase());
    const matchSecteur = selectedSecteur === 'Tous' || offre.secteur === selectedSecteur;
    const matchType = !selectedType || offre.type === selectedType;
    const matchLocation = !selectedLocation || offre.lieu === selectedLocation;
    return matchSearch && matchSecteur && matchType && matchLocation;
  }).sort((a, b) => {
    if (sortBy === 'recent') return 0;
    if (sortBy === 'titre') return a.titre.localeCompare(b.titre);
    return 0;
  });

  const categories = [
    { name: 'Tous', count: offres.length },
    ...secteurs.map(secteur => ({
      name: secteur,
      count: offres.filter(o => o.secteur === secteur).length
    })).filter(cat => cat.count > 0)
  ];

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
      boxShadow: '0 8px 24px rgba(91, 115, 247, 0.3)',
      transition: professionalTheme.transitions.fast,
    },
    logoText: {
      fontSize: isMobile ? professionalTheme.fontSizes.xl : professionalTheme.fontSizes['2xl'],
      fontWeight: 800,
      background: professionalTheme.gradients.primary,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    navLinks: {
      display: isMobile ? 'none' : 'flex',
      gap: '2.5rem',
      alignItems: 'center',
    },
    navLink: {
      color: professionalTheme.colors.neutral[700],
      textDecoration: 'none',
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      cursor: 'pointer',
      padding: '0.5rem 1rem',
      borderRadius: professionalTheme.radius.lg,
      transition: professionalTheme.transitions.fast,
    },
    button: {
      padding: '0.75rem 1.5rem',
      borderRadius: professionalTheme.radius.full,
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      cursor: 'pointer',
      transition: professionalTheme.transitions.default,
      border: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    buttonPrimary: {
      background: professionalTheme.gradients.primary,
      color: '#FFFFFF',
      boxShadow: '0 4px 15px rgba(91, 115, 247, 0.3)',
    },
    buttonSecondary: {
      background: professionalTheme.colors.neutral[100],
      color: professionalTheme.colors.neutral[900],
    },
    hero: {
      paddingTop: isMobile ? '5rem' : '7rem',
      paddingBottom: isMobile ? '3rem' : '4rem',
      background: `linear-gradient(135deg, ${professionalTheme.colors.primary[50]} 0%, ${professionalTheme.colors.secondary[50]} 100%)`,
      position: 'relative',
      overflow: 'hidden',
    },
    heroBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.15,
      backgroundImage: `
        radial-gradient(circle at 20% 50%, rgba(91, 115, 247, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 80% 50%, rgba(20, 210, 196, 0.2) 0%, transparent 50%)
      `,
    },
    heroContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      textAlign: 'center',
      position: 'relative',
      zIndex: 1,
      padding: isMobile ? '0 1.5rem' : '0 2rem',
    },
    heroBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: professionalTheme.colors.primary[50],
      color: professionalTheme.colors.primary[700],
      padding: '0.5rem 1rem',
      borderRadius: professionalTheme.radius.full,
      fontSize: isMobile ? professionalTheme.fontSizes.xs : professionalTheme.fontSizes.sm,
      fontWeight: 600,
      marginBottom: '1.5rem',
    },
    heroTitle: {
      fontSize: isMobile ? professionalTheme.fontSizes['4xl'] : professionalTheme.fontSizes['5xl'],
      fontWeight: 800,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '1.5rem',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    heroSubtitle: {
      fontSize: isMobile ? professionalTheme.fontSizes.base : professionalTheme.fontSizes.xl,
      color: professionalTheme.colors.neutral[700],
      maxWidth: '700px',
      margin: '0 auto 2rem',
      lineHeight: 1.6,
    },
    searchBox: {
      maxWidth: '650px',
      margin: '0 auto',
      position: 'relative',
    },
    searchInput: {
      width: '100%',
      padding: '1.25rem 1.5rem',
      borderRadius: professionalTheme.radius.full,
      border: `2px solid ${professionalTheme.colors.neutral[200]}`,
      fontSize: professionalTheme.fontSizes.base,
      outline: 'none',
      transition: professionalTheme.transitions.default,
      boxShadow: professionalTheme.shadows.lg,
      background: '#FFFFFF',
    },
    statsSection: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['3xl'],
      padding: isMobile ? '2rem' : '3rem',
      boxShadow: professionalTheme.shadows.xl,
      marginTop: isMobile ? '-2rem' : '-3rem',
      position: 'relative',
      zIndex: 10,
      maxWidth: '1100px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: isMobile ? '1.5rem' : '2rem',
    },
    statCard: {
      textAlign: 'center',
    },
    statIcon: {
      width: isMobile ? '56px' : '64px',
      height: isMobile ? '56px' : '64px',
      borderRadius: professionalTheme.radius.xl,
      background: professionalTheme.gradients.primary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: isMobile ? '1.75rem' : '2rem',
      margin: '0 auto 1rem',
    },
    statValue: {
      fontSize: isMobile ? professionalTheme.fontSizes['2xl'] : professionalTheme.fontSizes['3xl'],
      fontWeight: 800,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.25rem',
    },
    statLabel: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      fontWeight: 500,
    },
    categoriesSection: {
      padding: isMobile ? '3rem 1.5rem' : '4rem 2rem',
    },
    categoriesContainer: {
      maxWidth: '1400px',
      margin: '0 auto',
    },
    categoriesGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(6, 1fr)',
      gap: isMobile ? '1rem' : '1.5rem',
    },
    categoryCard: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      padding: isMobile ? '1.25rem' : '1.5rem',
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      textAlign: 'center',
      cursor: 'pointer',
      transition: professionalTheme.transitions.default,
    },
    categoryIcon: {
      width: '56px',
      height: '56px',
      borderRadius: professionalTheme.radius.xl,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.75rem',
      margin: '0 auto 0.75rem',
    },
    categoryName: {
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.25rem',
    },
    categoryCount: {
      fontSize: professionalTheme.fontSizes.xs,
      color: professionalTheme.colors.neutral[500],
    },
    filtersSection: {
      background: '#FFFFFF',
      padding: isMobile ? '1.5rem' : '2rem',
      borderBottom: `1px solid ${professionalTheme.colors.neutral[200]}`,
      position: 'sticky',
      top: '80px',
      zIndex: 100,
      boxShadow: professionalTheme.shadows.sm,
    },
    filtersContainer: {
      maxWidth: '1400px',
      margin: '0 auto',
      display: 'flex',
      gap: isMobile ? '1rem' : '2rem',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    searchBoxCompact: {
      flex: 1,
      minWidth: '280px',
    },
    searchInputCompact: {
      width: '100%',
      padding: '0.875rem 1.5rem',
      borderRadius: professionalTheme.radius.full,
      border: `2px solid ${professionalTheme.colors.neutral[200]}`,
      fontSize: professionalTheme.fontSizes.base,
      outline: 'none',
      transition: professionalTheme.transitions.default,
      background: '#FFFFFF',
    },
    filterGroup: {
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    filterLabel: {
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[700],
      marginRight: '0.5rem',
    },
    filterButton: (isActive) => ({
      padding: '0.625rem 1.25rem',
      borderRadius: professionalTheme.radius.full,
      border: isActive ? `2px solid ${professionalTheme.colors.primary[600]}` : `2px solid ${professionalTheme.colors.neutral[200]}`,
      background: isActive ? professionalTheme.colors.primary[50] : '#FFFFFF',
      color: isActive ? professionalTheme.colors.primary[700] : professionalTheme.colors.neutral[700],
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      cursor: 'pointer',
      transition: professionalTheme.transitions.fast,
    }),
    viewToggle: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      background: professionalTheme.colors.neutral[100],
      borderRadius: professionalTheme.radius.full,
    },
    viewToggleButton: (isActive) => ({
      padding: '0.5rem',
      borderRadius: professionalTheme.radius.md,
      border: 'none',
      background: isActive ? professionalTheme.colors.primary[600] : 'transparent',
      color: isActive ? '#FFFFFF' : professionalTheme.colors.neutral[600],
      cursor: 'pointer',
      transition: professionalTheme.transitions.fast,
    }),
    section: {
      padding: isMobile ? '3rem 1.5rem' : '4rem 2rem',
    },
    sectionContainer: {
      maxWidth: '1400px',
      margin: '0 auto',
    },
    resultsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      gap: '1rem',
    },
    resultsCount: {
      fontSize: professionalTheme.fontSizes.xl,
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
    },
    sortSelect: {
      padding: '0.625rem 1rem',
      borderRadius: professionalTheme.radius.lg,
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[700],
      outline: 'none',
      background: '#FFFFFF',
      cursor: 'pointer',
    },
    offresGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: isMobile ? '1.5rem' : '2rem',
    },
    offresList: {
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? '1rem' : '1.5rem',
    },
    offreCard: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      padding: isMobile ? '1.5rem' : '2rem',
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      transition: professionalTheme.transitions.default,
      cursor: 'pointer',
      position: 'relative',
    },
    offreCardList: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '1rem' : '2rem',
      alignItems: isMobile ? 'flex-start' : 'center',
    },
    offreLogo: {
      width: isMobile ? '56px' : '64px',
      height: isMobile ? '56px' : '64px',
      borderRadius: professionalTheme.radius.xl,
      background: professionalTheme.colors.neutral[100],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: isMobile ? '1.75rem' : '2rem',
      flexShrink: 0,
    },
    offreContent: {
      flex: 1,
      minWidth: 0,
    },
    offreHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: '0.75rem',
      gap: '1rem',
    },
    offreEntreprise: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      marginBottom: '0.25rem',
    },
    offrePosted: {
      fontSize: professionalTheme.fontSizes.xs,
      color: professionalTheme.colors.neutral[400],
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
    },
    offreTitle: {
      fontSize: professionalTheme.fontSizes.lg,
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.75rem',
      lineHeight: 1.3,
    },
    offreDescription: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      marginBottom: '1rem',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },
    offreDetails: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap',
      marginBottom: '1rem',
    },
    offreTag: {
      padding: '0.375rem 0.75rem',
      borderRadius: professionalTheme.radius.full,
      fontSize: professionalTheme.fontSizes.xs,
      fontWeight: 600,
    },
    offreMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '1rem',
      borderTop: `1px solid ${professionalTheme.colors.neutral[200]}`,
      gap: '1rem',
    },
    offreLocation: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.375rem',
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
    },
    applyButton: {
      padding: '0.625rem 1.5rem',
      borderRadius: professionalTheme.radius.full,
      background: professionalTheme.gradients.primary,
      color: '#FFFFFF',
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      border: 'none',
      cursor: 'pointer',
      transition: professionalTheme.transitions.default,
    },
    emptyState: {
      textAlign: 'center',
      padding: '4rem 2rem',
    },
    emptyIcon: {
      fontSize: '4rem',
      marginBottom: '1rem',
    },
    emptyTitle: {
      fontSize: professionalTheme.fontSizes.xl,
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.5rem',
    },
    emptyText: {
      fontSize: professionalTheme.fontSizes.base,
      color: professionalTheme.colors.neutral[600],
    },
    ctaSection: {
      background: professionalTheme.gradients.primary,
      borderRadius: professionalTheme.radius['3xl'],
      padding: isMobile ? '3rem 2rem' : '4rem 3rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    },
    ctaBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.1,
      backgroundImage: `
        radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
      `,
    },
    ctaContent: {
      position: 'relative',
      zIndex: 1,
    },
    ctaTitle: {
      fontSize: isMobile ? professionalTheme.fontSizes['2xl'] : professionalTheme.fontSizes['3xl'],
      fontWeight: 800,
      color: '#FFFFFF',
      marginBottom: '1rem',
    },
    ctaSubtitle: {
      fontSize: isMobile ? professionalTheme.fontSizes.base : professionalTheme.fontSizes.xl,
      color: 'rgba(255, 255, 255, 0.9)',
      marginBottom: '2rem',
    },
    footer: {
      background: professionalTheme.colors.neutral[900],
      color: '#FFFFFF',
      padding: isMobile ? '3rem 1.5rem 2rem' : '4rem 2rem 3rem',
    },
    footerContainer: {
      maxWidth: '1400px',
      margin: '0 auto',
    },
    footerBottom: {
      paddingTop: '2rem',
      borderTop: `1px solid ${professionalTheme.colors.neutral[800]}`,
      textAlign: 'center',
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[500],
    },
  };

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

          <div style={styles.navLinks}>
            {['Fonctionnalités', 'Offres', 'Entreprises', 'Ressources'].map((link) => (
              <a
                key={link}
                style={{
                  ...styles.navLink,
                  color: link === 'Offres' ? professionalTheme.colors.primary[600] : professionalTheme.colors.neutral[700],
                }}
                onClick={() => {
                  if (link === 'Fonctionnalités') navigate('/fonctionnalites');
                  else if (link === 'Offres') navigate('/offres');
                  else if (link === 'Entreprises') navigate('/entreprises');
                  else if (link === 'Ressources') navigate('/ressources');
                }}
              >
                {link}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button style={{ ...styles.button, ...styles.buttonSecondary }} onClick={() => navigate('/login')}>
              Connexion
            </button>
            <button style={{ ...styles.button, ...styles.buttonPrimary }} onClick={() => navigate('/register')}>
              Déposer CV
            </button>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section style={styles.hero}>
        <div style={styles.heroBackground} />
        <div style={styles.heroContainer}>
          <div style={styles.heroBadge}>
            <span>💼</span>
            <span>{offres.length} offres disponibles</span>
          </div>
          <h1 style={styles.heroTitle}>
            Trouvez l'Emploi de Vos Rêves
          </h1>
          <p style={styles.heroSubtitle}>
            Explorez des milliers d'opportunités auprès des meilleures entreprises. Votre carrière commence ici.
          </p>

          <div style={styles.searchBox}>
            <input
              type="text"
              placeholder="🔍 Rechercher un poste, une entreprise..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = professionalTheme.colors.primary[500];
                e.currentTarget.style.boxShadow = '0 0 0 4px rgba(91, 115, 247, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = professionalTheme.colors.neutral[200];
                e.currentTarget.style.boxShadow = professionalTheme.shadows.lg;
              }}
            />
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <div style={styles.statsSection}>
        <div style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} style={styles.statCard}>
              <div style={styles.statIcon}>{stat.icon}</div>
              <div style={styles.statValue}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== FEATURED CATEGORIES ===== */}
      <section style={styles.categoriesSection}>
        <div style={styles.categoriesContainer}>
          <div style={styles.categoriesGrid}>
            {featuredCategories.map((category, index) => (
              <div
                key={index}
                style={styles.categoryCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = professionalTheme.shadows.lg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => setSelectedSecteur(category.name)}
              >
                <div style={{ ...styles.categoryIcon, background: `${category.color}15` }}>
                  {category.icon}
                </div>
                <div style={styles.categoryName}>{category.name}</div>
                <div style={styles.categoryCount}>{category.count} offres</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FILTERS ===== */}
      <section style={styles.filtersSection}>
        <div style={styles.filtersContainer}>
          <div style={styles.searchBoxCompact}>
            <input
              type="text"
              placeholder="🔍 Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInputCompact}
            />
          </div>

          <div style={styles.filterGroup}>
            <span style={styles.filterLabel}>Secteur:</span>
            {categories.slice(0, 6).map(cat => (
              <button
                key={cat.name}
                style={styles.filterButton(selectedSecteur === cat.name)}
                onClick={() => setSelectedSecteur(cat.name)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div style={styles.filterGroup}>
            <span style={styles.filterLabel}>Type:</span>
            <button
              style={styles.filterButton(selectedType === null)}
              onClick={() => setSelectedType(null)}
            >
              Tous
            </button>
            {types.slice(0, 4).map(type => (
              <button
                key={type}
                style={styles.filterButton(selectedType === type)}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </button>
            ))}
          </div>

          <div style={styles.viewToggle}>
            <button
              style={styles.viewToggleButton(viewMode === 'grid')}
              onClick={() => setViewMode('grid')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
              </svg>
            </button>
            <button
              style={styles.viewToggleButton(viewMode === 'list')}
              onClick={() => setViewMode('list')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="3" x2="21" y2="3"/>
                <line x1="3" y1="9" x2="21" y2="9"/>
                <line x1="3" y1="15" x2="21" y2="15"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ===== OFFRES ===== */}
      <section style={styles.section}>
        <div style={styles.sectionContainer}>
          <div style={styles.resultsHeader}>
            <div style={styles.resultsCount}>
              {filteredOffres.length} offre{filteredOffres.length > 1 ? 's' : ''} trouvée{filteredOffres.length > 1 ? 's' : ''}
            </div>
            <select
              style={styles.sortSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recent">Plus récent</option>
              <option value="titre">Titre A-Z</option>
            </select>
          </div>

          {loadingOffres ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>⏳</div>
              <div style={styles.emptyTitle}>Chargement des offres...</div>
            </div>
          ) : filteredOffres.length > 0 ? (
            <div style={viewMode === 'list' ? styles.offresList : styles.offresGrid}>
              {filteredOffres.map((offre) => (
                <div
                  key={offre.id}
                  style={viewMode === 'list' ? { ...styles.offreCard, ...styles.offreCardList } : styles.offreCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = viewMode === 'list' ? 'translateX(8px)' : 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = professionalTheme.shadows.xl;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  onClick={() => navigate(`/offres/${offre.id}`)}
                >
                  <div style={styles.offreLogo}>{offre.logo}</div>
                  <div style={styles.offreContent}>
                    <div style={styles.offreHeader}>
                      <div>
                        <div style={styles.offreEntreprise}>{offre.entreprise}</div>
                        <div style={styles.offrePosted}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 6v6l4 2"/>
                          </svg>
                          Il y a {offre.posted}
                        </div>
                      </div>
                    </div>

                    <h3 style={styles.offreTitle}>{offre.titre}</h3>
                    {offre.description && <p style={styles.offreDescription}>{offre.description}</p>}

                    <div style={styles.offreDetails}>
                      <span style={{
                        ...styles.offreTag,
                        background: professionalTheme.colors.primary[50],
                        color: professionalTheme.colors.primary[700],
                      }}>
                        {offre.secteur}
                      </span>
                      <span style={{
                        ...styles.offreTag,
                        background: professionalTheme.colors.info.light,
                        color: professionalTheme.colors.info.dark,
                      }}>
                        {offre.type}
                      </span>
                      <span style={{
                        ...styles.offreTag,
                        background: professionalTheme.colors.success.light,
                        color: professionalTheme.colors.success.dark,
                      }}>
                        💰 {offre.salaire}
                      </span>
                    </div>

                    <div style={styles.offreMeta}>
                      <span style={styles.offreLocation}>
                        📍 {offre.lieu}
                      </span>
                      <button
                        style={styles.applyButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/offres/${offre.id}`);
                        }}
                      >
                        Postuler
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>🔍</div>
              <div style={styles.emptyTitle}>Aucune offre trouvée</div>
              <div style={styles.emptyText}>
                Essayez d'ajuster vos critères de recherche
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={styles.section}>
        <div style={styles.sectionContainer}>
          <div style={styles.ctaSection}>
            <div style={styles.ctaBackground} />
            <div style={styles.ctaContent}>
              <h2 style={styles.ctaTitle}>
                Vous ne trouvez pas votre bonheur ?
              </h2>
              <p style={styles.ctaSubtitle}>
                Créez une alerte emploi et soyez notifié des nouvelles opportunités qui correspondent à votre profil
              </p>
              <button
                style={{
                  ...styles.button,
                  background: '#FFFFFF',
                  color: professionalTheme.colors.primary[600],
                  padding: '0.875rem 2rem',
                  fontSize: professionalTheme.fontSizes.base,
                }}
              >
                Créer une alerte
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <div style={styles.footerBottom}>
            © 2024 SmartRecruit. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}

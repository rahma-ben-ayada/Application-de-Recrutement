import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { professionalTheme, professionalKeyframes } from '../theme/professionalTheme';
import api from '../utils/api';

const logoMap = {
  'CDI': '💼',
  'CDD': '📋',
  'Stage': '🎓',
  'Freelance': '🚀',
  default: '💼',
};

const getLogoForType = (type) => logoMap[type] || logoMap.default;

const stats = [
  { value: '12K+', label: 'Candidats Actifs',   icon: '👤', color: '#5B73F7' },
  { value: '340+', label: 'Entreprises',        icon: '🏢', color: '#14D2C4' },
  { value: '1.2K',label: 'Offres Publiées',    icon: '📋', color: '#F59E0B' },
  { value: '98%',  label: 'Satisfaction',       icon: '⭐', color: '#8B5CF6' },
];

const features = [
  { icon: '🤖', title: 'IA Scoring Intelligent',   desc: 'Algorithmes avancés pour évaluer et classer les candidats automatiquement.', color: '#5B73F7' },
  { icon: '🎯', title: 'Matching Précis',         desc: 'Trouvez la perle rare grâce à notre moteur de matching intelligent.', color: '#14D2C4' },
  { icon: '📊', title: 'Analytics Temps Réel',    desc: 'Tableaux de bord interactifs pour suivre vos KPIs RH en direct.', color: '#F59E0B' },
  { icon: '📅', title: 'Entretiens Vidéo',        desc: 'Planifiez et organisez vos entretiens avec intégration vidéo.', color: '#8B5CF6' },
  { icon: '🔒', title: 'Sécurité Maximale',       desc: 'Vos données sont protégées par chiffrement bout-en-bout.', color: '#EF4444' },
  { icon: '🌍', title: 'International',           desc: 'Plateforme multilingue avec support 24/7 dans le monde entier.', color: '#10B981' },
];

const temoignages = [
  { nom: 'Sarah Ben Ali',  poste: 'DRH, Tech Corp',   avatar: 'SB', texte: 'SmartRecruit a transformé notre processus. Le score IA nous fait gagner 50% de temps.', color: '#5B73F7' },
  { nom: 'Karim Mansouri', poste: 'CEO, StartUp RH',  avatar: 'KM', texte: 'Interface exceptionnelle et fonctionnalités puissantes. Recrutement facilité !', color: '#14D2C4' },
  { nom: 'Lina Cherif',    poste: 'Candidat Recruté', avatar: 'LC', texte: 'J\'ai décroché mon emploi idéal en 2 semaines. Plateforme intuitive.', color: '#10B981' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [search, setSearch] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [animatedStats, setAnimatedStats] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [offres, setOffres] = useState([]);
  const [loadingOffres, setLoadingOffres] = useState(true);
  const [offresError, setOffresError] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigateToDashboard = () => {
    if (user?.role) {
      // Candidates don't have a dashboard, they go to offres
      const dashboardPath = user.role === 'candidat'
        ? '/candidat/offres'
        : `/${user.role}/dashboard`;
      navigate(dashboardPath);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedStats(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchOffres = async () => {
      try {
        setLoadingOffres(true);
        setOffresError(null);
        const data = await api('/offres', 'GET');
        const transformedOffres = data.offres.map((offre) => ({
          id: offre._id,
          titre: offre.titre,
          entreprise: offre.recruteur?.entreprise || offre.recruteur?.nom || 'Entreprise',
          lieu: offre.lieu,
          type: offre.type,
          salaire: offre.salaire || 'Non spécifié',
          logo: getLogoForType(offre.type),
          competences: offre.competences || [],
          description: offre.description,
          createdAt: offre.createdAt,
        }));
        setOffres(transformedOffres);
      } catch (err) {
        console.error('Error fetching offers:', err);
        setOffresError('Impossible de charger les offres. Veuillez réessayer.');
      } finally {
        setLoadingOffres(false);
      }
    };

    fetchOffres();
  }, []);

  const filteredOffres = offres.filter(o =>
    o.titre.toLowerCase().includes(search.toLowerCase()) ||
    o.entreprise.toLowerCase().includes(search.toLowerCase()) ||
    o.lieu.toLowerCase().includes(search.toLowerCase())
  );

  const styles = {
    page: {
      fontFamily: professionalTheme.fonts.sans,
      background: '#FFFFFF',
      color: professionalTheme.colors.neutral[900],
      lineHeight: 1.6,
    },
    navbar: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10000,
      background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
      backdropFilter: 'blur(12px)',
      borderBottom: scrolled ? `1px solid ${professionalTheme.colors.neutral[200]}` : 'none',
      transition: professionalTheme.transitions.default,
    },
    navContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: isMobile ? '0 1rem' : '0 1.5rem',
      height: '72px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      cursor: 'pointer',
    },
    logoIcon: {
      width: isMobile ? '36px' : '40px',
      height: isMobile ? '36px' : '40px',
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
      fontSize: isMobile ? professionalTheme.fontSizes.lg : professionalTheme.fontSizes.xl,
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
      letterSpacing: '-0.02em',
    },
    navLinks: {
      display: isMobile ? 'none' : 'flex',
      gap: '2rem',
      alignItems: 'center',
    },
    mobileMenuButton: {
      display: isMobile ? 'flex' : 'none',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '0.5rem',
      flexDirection: 'column',
      gap: '4px',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mobileMenuLine: (isOpen) => ({
      width: '24px',
      height: '2px',
      background: professionalTheme.colors.neutral[900],
      transition: 'all 0.3s ease',
      transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
    }),
    mobileMenuLineCenter: (isOpen) => ({
      width: '24px',
      height: '2px',
      background: professionalTheme.colors.neutral[900],
      transition: 'all 0.3s ease',
      opacity: isOpen ? 0 : 1,
    }),
    mobileMenuLineBottom: (isOpen) => ({
      width: '24px',
      height: '2px',
      background: professionalTheme.colors.neutral[900],
      transition: 'all 0.3s ease',
      transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
    }),
    mobileMenuOverlay: {
      display: mobileMenuOpen ? 'block' : 'none',
      position: 'fixed',
      top: '72px',
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9998,
    },
    mobileMenu: {
      display: mobileMenuOpen ? 'flex' : 'none',
      position: 'fixed',
      top: '72px',
      left: 0,
      right: 0,
      background: '#FFFFFF',
      flexDirection: 'column',
      padding: '1.5rem',
      gap: '0.75rem',
      borderBottom: `1px solid ${professionalTheme.colors.neutral[200]}`,
      boxShadow: professionalTheme.shadows.xl,
      maxHeight: 'calc(100vh - 72px)',
      overflowY: 'auto',
      zIndex: 9999,
      animation: 'slideDown 0.3s ease',
    },
    mobileMenuLink: {
      padding: '1rem',
      color: professionalTheme.colors.neutral[800],
      textDecoration: 'none',
      fontSize: professionalTheme.fontSizes.base,
      fontWeight: 500,
      borderRadius: professionalTheme.radius.lg,
      transition: professionalTheme.transitions.fast,
      cursor: 'pointer',
      border: `1px solid transparent`,
    },
    mobileMenuButtons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      marginTop: '1rem',
      paddingTop: '1rem',
      borderTop: `1px solid ${professionalTheme.colors.neutral[200]}`,
    },
    navLink: {
      color: professionalTheme.colors.neutral[600],
      textDecoration: 'none',
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 500,
      transition: professionalTheme.transitions.fast,
      cursor: 'pointer',
    },
    button: {
      padding: '0.625rem 1.25rem',
      borderRadius: professionalTheme.radius.lg,
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 500,
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
    },
    buttonSecondary: {
      background: professionalTheme.colors.neutral[100],
      color: professionalTheme.colors.neutral[900],
    },
    hero: {
      paddingTop: isMobile ? '5rem' : '8rem',
      paddingBottom: isMobile ? '2rem' : '5rem',
      background: professionalTheme.gradients.subtle,
      position: 'relative',
      overflow: 'hidden',
    },
    heroContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: isMobile ? '0 1rem' : '0 1.5rem',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: isMobile ? '2rem' : '4rem',
      alignItems: 'center',
      textAlign: isMobile ? 'center' : 'left',
    },
    heroContent: {
      maxWidth: isMobile ? '100%' : '560px',
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: professionalTheme.colors.primary[50],
      color: professionalTheme.colors.primary[700],
      padding: '0.375rem 0.875rem',
      borderRadius: professionalTheme.radius.full,
      fontSize: isMobile ? professionalTheme.fontSizes.xs : professionalTheme.fontSizes.sm,
      fontWeight: 500,
      marginBottom: '1.5rem',
    },
    heroTitle: {
      fontSize: isMobile ? professionalTheme.fontSizes['3xl'] : professionalTheme.fontSizes['5xl'],
      fontWeight: 800,
      lineHeight: 1.1,
      color: professionalTheme.colors.neutral[900],
      marginBottom: isMobile ? '1rem' : '1.5rem',
      letterSpacing: '-0.03em',
    },
    heroSubtitle: {
      fontSize: isMobile ? professionalTheme.fontSizes.sm : professionalTheme.fontSizes.lg,
      color: professionalTheme.colors.neutral[600],
      marginBottom: isMobile ? '1.5rem' : '2rem',
      maxWidth: isMobile ? '100%' : '480px',
    },
    heroButtons: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: isMobile ? 'center' : 'flex-start',
    },
    heroStats: {
      display: 'flex',
      gap: isMobile ? '1rem' : '2rem',
      paddingTop: isMobile ? '1.5rem' : '2rem',
      borderTop: `1px solid ${professionalTheme.colors.neutral[200]}`,
    },
    heroStat: {
      flex: 1,
    },
    heroStatValue: {
      fontSize: professionalTheme.fontSizes['3xl'],
      fontWeight: 700,
      color: professionalTheme.colors.primary[600],
    },
    heroStatLabel: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
    },
    heroImage: {
      position: 'relative',
    },
    heroCard: {
      background: professionalTheme.glass.card.background,
      backdropFilter: professionalTheme.glass.card.backdropFilter,
      border: professionalTheme.glass.card.border,
      borderRadius: professionalTheme.radius['3xl'],
      padding: '2rem',
      boxShadow: professionalTheme.shadows['2xl'],
    },
    section: {
      padding: '5rem 1.5rem',
    },
    sectionContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
    },
    sectionHeader: {
      textAlign: 'center',
      marginBottom: '3rem',
    },
    sectionTitle: {
      fontSize: professionalTheme.fontSizes['4xl'],
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '1rem',
      letterSpacing: '-0.02em',
    },
    sectionSubtitle: {
      fontSize: professionalTheme.fontSizes.lg,
      color: professionalTheme.colors.neutral[600],
      maxWidth: '600px',
      margin: '0 auto',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: isMobile ? '1rem' : '1.5rem',
    },
    statCard: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      padding: isMobile ? '1.25rem' : '1.5rem',
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      textAlign: 'center',
      transition: professionalTheme.transitions.default,
    },
    statValue: {
      fontSize: isMobile ? professionalTheme.fontSizes['3xl'] : professionalTheme.fontSizes['4xl'],
      fontWeight: 700,
      color: professionalTheme.colors.primary[600],
      marginBottom: '0.25rem',
    },
    statLabel: {
      fontSize: isMobile ? professionalTheme.fontSizes.xs : professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      marginBottom: '0.5rem',
    },
    statChange: {
      fontSize: professionalTheme.fontSizes.xs,
      color: professionalTheme.colors.success.dark,
      fontWeight: 500,
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: isMobile ? '1.25rem' : '2rem',
    },
    featureCard: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      padding: '2rem',
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      transition: professionalTheme.transitions.default,
      cursor: 'pointer',
    },
    featureIcon: {
      width: '56px',
      height: '56px',
      borderRadius: professionalTheme.radius.xl,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '1.25rem',
      fontSize: '1.5rem',
    },
    featureTitle: {
      fontSize: professionalTheme.fontSizes.xl,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.5rem',
    },
    featureDescription: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      lineHeight: 1.6,
    },
    testimonialsSection: {
      background: professionalTheme.colors.neutral[50],
    },
    testimonialsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: isMobile ? '1.5rem' : '2rem',
    },
    testimonialCard: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      padding: isMobile ? '1.5rem' : '2rem',
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
    },
    testimonialHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1rem',
    },
    testimonialAvatar: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFFFFF',
      fontWeight: 600,
      fontSize: professionalTheme.fontSizes.sm,
    },
    testimonialInfo: {},
    testimonialName: {
      fontSize: professionalTheme.fontSizes.base,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[900],
    },
    testimonialRole: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
    },
    testimonialContent: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[700],
      lineHeight: 1.7,
      marginBottom: '1rem',
      fontStyle: 'italic',
    },
    testimonialRating: {
      display: 'flex',
      gap: '0.25rem',
      color: professionalTheme.colors.warning.DEFAULT,
    },
    offresSection: {
      background: professionalTheme.colors.neutral[50],
    },
    offresGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: isMobile ? '1rem' : '1.5rem',
    },
    offreCard: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      padding: isMobile ? '1.25rem' : '1.5rem',
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      transition: professionalTheme.transitions.default,
      cursor: 'pointer',
    },
    offreHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1rem',
    },
    offreLogo: {
      width: '48px',
      height: '48px',
      borderRadius: professionalTheme.radius.lg,
      background: professionalTheme.colors.neutral[100],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
    },
    offreTitle: {
      fontSize: professionalTheme.fontSizes.base,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.75rem',
    },
    offreTags: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '1rem',
    },
    offreTag: {
      padding: '0.25rem 0.75rem',
      borderRadius: professionalTheme.radius.md,
      fontSize: professionalTheme.fontSizes.xs,
      fontWeight: 500,
    },
    ctaSection: {
      background: professionalTheme.gradients.primary,
      borderRadius: professionalTheme.radius['3xl'],
      padding: '4rem 2rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    },
    ctaContent: {
      position: 'relative',
      zIndex: 1,
      maxWidth: '600px',
      margin: '0 auto',
    },
    ctaTitle: {
      fontSize: professionalTheme.fontSizes['4xl'],
      fontWeight: 700,
      color: '#FFFFFF',
      marginBottom: '1rem',
    },
    ctaSubtitle: {
      fontSize: professionalTheme.fontSizes.lg,
      color: 'rgba(255, 255, 255, 0.9)',
      marginBottom: '2rem',
    },
    footer: {
      background: professionalTheme.colors.neutral[900],
      color: '#FFFFFF',
      padding: '4rem 1.5rem 2rem',
    },
    footerContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
    },
    footerGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr 1fr',
      gap: isMobile ? '1.5rem' : '3rem',
      marginBottom: '3rem',
    },
    footerBrand: {
      maxWidth: isMobile ? '100%' : '280px',
    },
    footerDescription: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[400],
      lineHeight: 1.7,
    },
    footerLink: {
      display: 'block',
      color: professionalTheme.colors.neutral[400],
      textDecoration: 'none',
      fontSize: professionalTheme.fontSizes.sm,
      marginBottom: '0.75rem',
      transition: professionalTheme.transitions.fast,
    },
    footerBottom: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '2rem',
      borderTop: `1px solid ${professionalTheme.colors.neutral[800]}`,
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '1rem' : '0',
      textAlign: isMobile ? 'center' : 'left',
    },
    searchInput: {
      width: '100%',
      maxWidth: '500px',
      padding: '0.875rem 1.5rem',
      borderRadius: professionalTheme.radius.full,
      border: `2px solid ${professionalTheme.colors.neutral[200]}`,
      fontSize: professionalTheme.fontSizes.sm,
      outline: 'none',
      transition: professionalTheme.transitions.default,
    },
  };

  return (
    <div style={styles.page}>
      <style>{professionalKeyframes}</style>

      {/* ===== NAVBAR ===== */}
      <nav style={styles.navbar}>
        <div style={styles.navContainer}>
          <div style={styles.logo} onClick={() => navigate('/')}>
            <div style={styles.logoIcon}>SR</div>
            <div style={styles.logoText}>SmartRecruit</div>
          </div>

          <div style={styles.navLinks}>
            {['Fonctionnalités', 'Offres', 'Entreprises', 'Ressources'].map((link) => (
              <a
                key={link}
                style={styles.navLink}
                onClick={() => {
                  if (link === 'Fonctionnalités') navigate('/fonctionnalites');
                  else if (link === 'Offres') navigate('/offres');
                  else if (link === 'Entreprises') navigate('/entreprises');
                  else if (link === 'Ressources') navigate('/ressources');
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = professionalTheme.colors.primary[600];
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = professionalTheme.colors.neutral[600];
                }}
              >
                {link}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {/* Authenticated user menu */}
            {user ? (
              <>
                <div style={{ display: isMobile ? 'none' : 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  {/* Role badge */}
                  <div style={{
                    padding: '0.375rem 0.875rem',
                    borderRadius: professionalTheme.radius.full,
                    fontSize: professionalTheme.fontSizes.sm,
                    fontWeight: 500,
                    background: professionalTheme.colors.primary[50],
                    color: professionalTheme.colors.primary[700],
                  }}>
                    {user.role === 'admin' ? '🛡 Admin' : user.role === 'recruteur' ? '🏢 Recruteur' : '👤 Candidat'}
                  </div>

                  {/* Dashboard button */}
                  <button
                    style={{ ...styles.button, background: 'transparent', color: professionalTheme.colors.neutral[700], border: `1px solid ${professionalTheme.colors.neutral[300]}` }}
                    onClick={handleNavigateToDashboard}
                  >
                    Mon Dashboard
                  </button>

                  {/* Logout button */}
                  <button
                    style={{ ...styles.button, ...styles.buttonPrimary }}
                    onClick={handleLogout}
                  >
                    Déconnexion
                  </button>
                </div>
              </>
            ) : (
              <div style={{ display: isMobile ? 'none' : 'flex', gap: '0.75rem' }}>
                <button
                  style={{ ...styles.button, background: 'transparent', color: professionalTheme.colors.neutral[700], border: `1px solid ${professionalTheme.colors.neutral[300]}` }}
                  onClick={() => navigate('/login')}
                >
                  Connexion
                </button>
                <button
                  style={{ ...styles.button, ...styles.buttonPrimary }}
                  onClick={() => navigate('/register')}
                >
                  Démarrer gratuitement
                </button>
              </div>
            )}
            <button
              style={styles.mobileMenuButton}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div style={styles.mobileMenuLine(mobileMenuOpen)} />
              <div style={styles.mobileMenuLineCenter(mobileMenuOpen)} />
              <div style={styles.mobileMenuLineBottom(mobileMenuOpen)} />
            </button>
          </div>
        </div>
      </nav>

      {/* ===== MOBILE MENU ===== */}
      {mobileMenuOpen && (
        <>
          <div
            style={styles.mobileMenuOverlay}
            onClick={() => setMobileMenuOpen(false)}
          />
          <div style={styles.mobileMenu}>
            {['Fonctionnalités', 'Offres', 'Entreprises', 'Ressources'].map((link) => (
              <a
                key={link}
                style={styles.mobileMenuLink}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (link === 'Fonctionnalités') navigate('/fonctionnalites');
                  else if (link === 'Offres') navigate('/offres');
                  else if (link === 'Entreprises') navigate('/entreprises');
                  else if (link === 'Ressources') navigate('/ressources');
                }}
              >
                {link}
              </a>
            ))}

            {/* Mobile menu: Authenticated vs Not authenticated */}
            {user ? (
              <div style={styles.mobileMenuButtons}>
                {/* Role badge */}
                <div style={{
                  padding: '0.75rem 1rem',
                  borderRadius: professionalTheme.radius.full,
                  fontSize: professionalTheme.fontSizes.sm,
                  fontWeight: 500,
                  background: professionalTheme.colors.primary[50],
                  color: professionalTheme.colors.primary[700],
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}>
                  {user.role === 'admin' ? '🛡 Admin' : user.role === 'recruteur' ? '🏢 Recruteur' : '👤 Candidat'}
                </div>

                <button
                  style={{ ...styles.button, width: '100%', background: professionalTheme.colors.neutral[100], color: professionalTheme.colors.neutral[900] }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleNavigateToDashboard();
                  }}
                >
                  Mon Dashboard
                </button>
                <button
                  style={{ ...styles.button, width: '100%', ...styles.buttonPrimary }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div style={styles.mobileMenuButtons}>
                <button
                  style={{ ...styles.button, width: '100%', background: professionalTheme.colors.neutral[100], color: professionalTheme.colors.neutral[900] }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/login');
                  }}
                >
                  Connexion
                </button>
                <button
                  style={{ ...styles.button, width: '100%', ...styles.buttonPrimary }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/register');
                  }}
                >
                  Démarrer gratuitement
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* ===== HERO SECTION ===== */}
      <section style={styles.hero}>
        <div style={styles.heroContainer}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>
              {user ? `Bienvenue, ${user.nom || user.name || 'Utilisateur'} !` : 'Connectez les Meilleurs '}
              {!user && <span style={{ color: professionalTheme.colors.primary[600] }}>Talents</span>}
            </h1>

            <p style={styles.heroSubtitle}>
              {user
                ? `Vous êtes connecté en tant que ${user.role === 'admin' ? 'administrateur' : user.role === 'recruteur' ? 'recruteur' : 'candidat'}. Continuez à explorer SmartRecruit ou accédez à votre dashboard.`
                : 'SmartRecruit utilise l\'intelligence artificielle pour révolutionner votre processus de recrutement. Trouvez le candidat idéal en moins de temps.'
              }
            </p>

            <div style={styles.heroButtons}>
              {user ? (
                <button
                  style={{ ...styles.button, ...styles.buttonPrimary, padding: '0.875rem 1.75rem', fontSize: '1rem' }}
                  onClick={handleNavigateToDashboard}
                >
                  Mon Dashboard
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              ) : (
                <>
                  <button
                    style={{ ...styles.button, ...styles.buttonPrimary, padding: '0.875rem 1.75rem', fontSize: '1rem' }}
                    onClick={() => navigate('/register')}
                  >
                    Commencer Gratuitement
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                  <button
                    style={{ ...styles.button, ...styles.buttonSecondary, padding: '0.875rem 1.75rem', fontSize: '1rem' }}
                  >
                    Voir la Démo
                  </button>
                </>
              )}
            </div>

            <div style={styles.heroStats}>
              {stats.slice(0, 3).map((stat, index) => (
                <div key={index} style={styles.heroStat}>
                  <div style={styles.heroStatValue}>{stat.value}</div>
                  <div style={styles.heroStatLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.heroImage}>
            <div style={styles.heroCard}>
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📊</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Dashboard Analytics
                </h3>
                <p style={{ fontSize: '0.875rem', color: professionalTheme.colors.neutral[600] }}>
                  Suivez vos candidatures en temps réel
                </p>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                {[
                  { label: 'Candidats', value: '2,847', color: professionalTheme.colors.primary[500] },
                  { label: 'Entretiens', value: '156', color: professionalTheme.colors.secondary[600] },
                  { label: 'Recrutés', value: '43', color: professionalTheme.colors.success.DEFAULT },
                ].map((item, i) => (
                  <div key={i} style={{ flex: 1 }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: item.color }}>
                      {item.value}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: professionalTheme.colors.neutral[600] }}>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section style={styles.section}>
        <div style={styles.sectionContainer}>
          <div style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div
                key={index}
                style={styles.statCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = professionalTheme.shadows.xl;
                  e.currentTarget.style.borderColor = stat.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = professionalTheme.colors.neutral[200];
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{stat.icon}</div>
                <div style={{ ...styles.statValue, color: stat.color }}>{stat.value}</div>
                <div style={styles.statLabel}>{stat.label}</div>
                <div style={styles.statChange}>+{Math.floor(Math.random() * 30) + 10}% vs mois dernier</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section style={{ ...styles.section, background: professionalTheme.colors.neutral[50] }}>
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              Fonctionnalités Puissantes
            </h2>
            <p style={styles.sectionSubtitle}>
              Découvrez comment SmartRecruit transforme votre processus de recrutement
            </p>
          </div>

          <div style={styles.featuresGrid}>
            {features.map((feature) => (
              <div
                key={feature.title}
                style={styles.featureCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = professionalTheme.shadows.xl;
                  e.currentTarget.style.borderColor = feature.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = professionalTheme.colors.neutral[200];
                }}
              >
                <div style={{ ...styles.featureIcon, background: feature.color + '20', color: feature.color }}>
                  {feature.icon}
                </div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDescription}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OFFRES SECTION ===== */}
      <section style={{ ...styles.section, ...styles.offresSection }}>
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              Offres Récentes
            </h2>
            <p style={styles.sectionSubtitle}>
              Découvrez les dernières opportunités de carrière
            </p>
          </div>

          <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
            <input
              type="text"
              placeholder="🔍 Rechercher une offre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = professionalTheme.colors.primary[500];
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(91, 115, 247, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = professionalTheme.colors.neutral[200];
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {loadingOffres ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '3px solid #E5E7EB',
                borderTop: `3px solid ${professionalTheme.colors.primary[600]}`,
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }} />
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
          ) : offresError ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
              <p style={{ color: professionalTheme.colors.error.main, marginBottom: '1rem' }}>{offresError}</p>
              <button
                style={{ ...styles.button, ...styles.buttonPrimary }}
                onClick={() => window.location.reload()}
              >
                Réessayer
              </button>
            </div>
          ) : filteredOffres.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <p style={{ color: professionalTheme.colors.neutral[600], fontSize: professionalTheme.fontSizes.lg }}>
                {search ? 'Aucune offre ne correspond à votre recherche.' : 'Aucune offre disponible pour le moment.'}
              </p>
            </div>
          ) : (
            <div style={styles.offresGrid}>
              {filteredOffres.slice(0, 6).map((offre) => (
                <div
                  key={offre.id}
                  style={styles.offreCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = professionalTheme.shadows.xl;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  onClick={() => user ? navigate('/candidat/offres') : navigate('/login')}
                >
                  <div style={styles.offreHeader}>
                    <div style={styles.offreLogo}>{offre.logo}</div>
                    <div>
                      <div style={{ fontSize: professionalTheme.fontSizes.sm, fontWeight: 600, color: professionalTheme.colors.neutral[900] }}>
                        {offre.entreprise}
                      </div>
                      <div style={{ fontSize: professionalTheme.fontSizes.xs, color: professionalTheme.colors.neutral[600] }}>
                        📍 {offre.lieu}
                      </div>
                    </div>
                  </div>

                  <h3 style={styles.offreTitle}>{offre.titre}</h3>

                  <div style={styles.offreTags}>
                    <span style={{ ...styles.offreTag, background: professionalTheme.colors.info.light, color: professionalTheme.colors.info.dark }}>
                      {offre.type}
                    </span>
                    <span style={{ ...styles.offreTag, background: professionalTheme.colors.success.light, color: professionalTheme.colors.success.dark }}>
                      💰 {offre.salaire}
                    </span>
                  </div>

                  <button
                    style={{
                      ...styles.button,
                      ...styles.buttonPrimary,
                      width: '100%',
                      padding: '0.625rem',
                      fontSize: professionalTheme.fontSizes.sm,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      user ? navigate('/candidat/offres') : navigate('/login');
                    }}
                  >
                    {user ? 'Voir les offres' : 'Postuler →'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section style={{ ...styles.section, ...styles.testimonialsSection }}>
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              Ce que disent nos Clients
            </h2>
            <p style={styles.sectionSubtitle}>
              Des milliers d'entreprises nous font confiance
            </p>
          </div>

          <div style={styles.testimonialsGrid}>
            {temoignages.map((temoignage) => (
              <div key={temoignage.nom} style={styles.testimonialCard}>
                <div style={styles.testimonialHeader}>
                  <div style={{ ...styles.testimonialAvatar, background: temoignage.color }}>
                    {temoignage.avatar}
                  </div>
                  <div style={styles.testimonialInfo}>
                    <div style={styles.testimonialName}>{temoignage.nom}</div>
                    <div style={styles.testimonialRole}>{temoignage.poste}</div>
                  </div>
                </div>
                <p style={styles.testimonialContent}>"{temoignage.texte}"</p>
                <div style={styles.testimonialRating}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section style={styles.section}>
        <div style={styles.sectionContainer}>
          <div style={styles.ctaSection}>
            <div style={styles.ctaContent}>
              <h2 style={styles.ctaTitle}>
                {user ? 'Bienvenue sur SmartRecruit !' : 'Prêt à Transformer Votre Recrutement ?'}
              </h2>
              <p style={styles.ctaSubtitle}>
                {user
                  ? `Connecté en tant que ${user.role === 'admin' ? 'administrateur' : user.role === 'recruteur' ? 'recruteur' : 'candidat'}. Accédez à votre dashboard pour gérer vos activités.`
                  : 'Rejoignez des milliers d\'entreprises qui font confiance à SmartRecruit pour trouver les meilleurs talents.'
                }
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                {user ? (
                  <button
                    style={{ ...styles.button, background: '#FFFFFF', color: professionalTheme.colors.primary[600], padding: '0.875rem 2rem', fontSize: '1rem' }}
                    onClick={handleNavigateToDashboard}
                  >
                    Aller au Dashboard
                  </button>
                ) : (
                  <>
                    <button
                      style={{ ...styles.button, background: '#FFFFFF', color: professionalTheme.colors.primary[600], padding: '0.875rem 2rem', fontSize: '1rem' }}
                      onClick={() => navigate('/register')}
                    >
                      Démarrer Gratuitement
                    </button>
                    <button
                      style={{ ...styles.button, background: 'transparent', color: '#FFFFFF', border: '2px solid rgba(255, 255, 255, 0.3)', padding: '0.875rem 2rem', fontSize: '1rem' }}
                    >
                      Contacter l'Équipe
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <div style={styles.footerGrid}>
            <div style={styles.footerBrand}>
              <div style={styles.logo}>
                <div style={{ ...styles.logoIcon, width: '36px', height: '36px', fontSize: '14px' }}>SR</div>
                <div style={{ fontSize: professionalTheme.fontSizes.lg, fontWeight: 700 }}>SmartRecruit</div>
              </div>
              <p style={styles.footerDescription}>
                La plateforme de recrutement intelligente qui connecte les meilleurs talents aux opportunités idéales grâce à l'IA.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: professionalTheme.fontSizes.sm, fontWeight: 600, marginBottom: '1rem', color: '#FFFFFF' }}>
                Produit
              </h4>
              {['Fonctionnalités', 'Tarification', 'Entreprises', 'API'].map((link) => (
                <a key={link} href="#" style={styles.footerLink}>{link}</a>
              ))}
            </div>

            <div>
              <h4 style={{ fontSize: professionalTheme.fontSizes.sm, fontWeight: 600, marginBottom: '1rem', color: '#FFFFFF' }}>
                Entreprise
              </h4>
              {['À Propos', 'Blog', 'Carrières', 'Contact'].map((link) => (
                <a key={link} href="#" style={styles.footerLink}>{link}</a>
              ))}
            </div>

            <div>
              <h4 style={{ fontSize: professionalTheme.fontSizes.sm, fontWeight: 600, marginBottom: '1rem', color: '#FFFFFF' }}>
                Légal
              </h4>
              {['Confidentialité', 'CGU', 'Cookies', 'Mentions'].map((link) => (
                <a key={link} href="#" style={styles.footerLink}>{link}</a>
              ))}
            </div>
          </div>

          <div style={styles.footerBottom}>
            <div style={{ fontSize: professionalTheme.fontSizes.sm, color: professionalTheme.colors.neutral[500] }}>
              © 2024 SmartRecruit. Tous droits réservés.
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {['LinkedIn', 'Twitter', 'Facebook'].map((social) => (
                <a
                  key={social}
                  href="#"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: professionalTheme.radius.lg,
                    background: professionalTheme.colors.neutral[800],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: professionalTheme.colors.neutral[400],
                    textDecoration: 'none',
                    fontSize: professionalTheme.fontSizes.xs,
                    fontWeight: 600,
                  }}
                >
                  {social.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

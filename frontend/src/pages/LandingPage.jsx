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
  { value: '12K+', label: 'Candidats Actifs',   icon: '👥', color: '#5B73F7', bg: 'rgba(91, 115, 247, 0.1)' },
  { value: '340+', label: 'Entreprises',        icon: '🏢', color: '#14D2C4', bg: 'rgba(20, 210, 196, 0.1)' },
  { value: '1.2K',label: 'Offres Publiées',    icon: '💼', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
  { value: '98%',  label: 'Satisfaction',       icon: '⭐', color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)' },
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

const howItWorks = [
  { step: '01', title: 'Créez votre compte', desc: 'Inscription gratuite en 2 minutes', icon: '👤' },
  { step: '02', title: 'Complétez votre profil', desc: 'Ajoutez votre CV et compétences', icon: '📝' },
  { step: '03', title: 'Postulez aux offres', desc: 'Trouvez l\'opportunité qui vous correspond', icon: '💼' },
  { step: '04', title: 'Décrochez l\'emploi', desc: 'Suivez vos candidatures en temps réel', icon: '🎉' },
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
  const [visibleSection, setVisibleSection] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigateToDashboard = () => {
    if (user?.role) {
      const dashboardPath = user.role === 'candidat'
        ? '/candidat/offres'
        : `/${user.role}/dashboard`;
      navigate(dashboardPath);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect visible sections for animations
      const sections = ['stats', 'features', 'how-it-works', 'testimonials'];
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight - 100;
          if (isVisible && visibleSection !== section) {
            setVisibleSection(section);
          }
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleSection]);

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
      background: '#FAFAFA',
      color: professionalTheme.colors.neutral[900],
      lineHeight: 1.6,
      overflowX: 'hidden',
    },
    // Enhanced Navbar with glassmorphism
    navbar: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10000,
      background: scrolled
        ? 'rgba(255, 255, 255, 0.85)'
        : 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: scrolled
        ? `1px solid ${professionalTheme.colors.neutral[200]}`
        : '1px solid rgba(224, 224, 227, 0.5)',
      transition: professionalTheme.transitions.default,
      boxShadow: scrolled
        ? '0 4px 30px rgba(0, 0, 0, 0.05)'
        : 'none',
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
      letterSpacing: '-0.02em',
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
      transition: professionalTheme.transitions.fast,
      cursor: 'pointer',
      position: 'relative',
      padding: '0.5rem 0',
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
    mobileMenuButton: {
      display: isMobile ? 'flex' : 'none',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '0.5rem',
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
      top: '80px',
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9998,
    },
    mobileMenu: {
      display: mobileMenuOpen ? 'flex' : 'none',
      position: 'fixed',
      top: '80px',
      left: 0,
      right: 0,
      background: '#FFFFFF',
      flexDirection: 'column',
      padding: '1.5rem',
      gap: '0.75rem',
      borderBottom: `1px solid ${professionalTheme.colors.neutral[200]}`,
      boxShadow: professionalTheme.shadows.xl,
      zIndex: 9999,
    },
    // Enhanced Hero Section
    hero: {
      paddingTop: isMobile ? '7rem' : '10rem',
      paddingBottom: isMobile ? '4rem' : '8rem',
      background: `linear-gradient(135deg, ${professionalTheme.colors.primary[50]} 0%, ${professionalTheme.colors.secondary[50]} 50%, ${professionalTheme.colors.neutral[50]} 100%)`,
      position: 'relative',
      overflow: 'hidden',
    },
    heroBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.4,
      backgroundImage: `
        radial-gradient(circle at 20% 50%, rgba(91, 115, 247, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(20, 210, 196, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 40% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
      `,
      animation: 'float 20s ease-in-out infinite',
    },
    heroContainer: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: isMobile ? '0 1.5rem' : '0 2rem',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
      gap: isMobile ? '3rem' : '6rem',
      alignItems: 'center',
      position: 'relative',
      zIndex: 1,
    },
    heroContent: {
      maxWidth: isMobile ? '100%' : '640px',
    },
    badge: {
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
      border: `1px solid ${professionalTheme.colors.primary[100]}`,
      boxShadow: `0 4px 12px ${professionalTheme.colors.primary[100]}`,
    },
    heroTitle: {
      fontSize: isMobile ? professionalTheme.fontSizes['4xl'] : professionalTheme.fontSizes['5xl'],
      fontWeight: 800,
      lineHeight: 1.1,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '1.5rem',
      letterSpacing: '-0.03em',
    },
    heroTitleGradient: {
      background: professionalTheme.gradients.primary,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    heroSubtitle: {
      fontSize: isMobile ? professionalTheme.fontSizes.base : professionalTheme.fontSizes.xl,
      color: professionalTheme.colors.neutral[600],
      marginBottom: '2rem',
      maxWidth: isMobile ? '100%' : '540px',
      lineHeight: 1.7,
    },
    heroButtons: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '3rem',
      flexDirection: isMobile ? 'column' : 'row',
    },
    heroStats: {
      display: 'flex',
      gap: isMobile ? '1.5rem' : '3rem',
      paddingTop: '2rem',
      borderTop: `1px solid ${professionalTheme.colors.neutral[200]}`,
    },
    heroStat: {
      flex: 1,
    },
    heroStatValue: {
      fontSize: professionalTheme.fontSizes['3xl'],
      fontWeight: 800,
      color: professionalTheme.colors.primary[600],
      marginBottom: '0.25rem',
    },
    heroStatLabel: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      fontWeight: 500,
    },
    // Enhanced Hero Image/Card
    heroImage: {
      position: 'relative',
    },
    heroCard: {
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      borderRadius: professionalTheme.radius['3xl'],
      padding: '2.5rem',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      transform: 'perspective(1000px) rotateY(-5deg)',
      transition: professionalTheme.transitions.default,
    },
    heroCardBefore: {
      content: '""',
      position: 'absolute',
      top: '-20px',
      right: '-20px',
      width: '100%',
      height: '100%',
      background: professionalTheme.gradients.primary,
      borderRadius: professionalTheme.radius['3xl'],
      zIndex: -1,
      opacity: 0.2,
    },
    // Enhanced Sections
    section: {
      padding: isMobile ? '5rem 1.5rem' : '7rem 2rem',
    },
    sectionContainer: {
      maxWidth: '1400px',
      margin: '0 auto',
    },
    sectionHeader: {
      textAlign: 'center',
      marginBottom: isMobile ? '3rem' : '4rem',
    },
    sectionBadge: {
      display: 'inline-block',
      padding: '0.375rem 0.875rem',
      borderRadius: professionalTheme.radius.full,
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      background: professionalTheme.colors.primary[50],
      color: professionalTheme.colors.primary[700],
      marginBottom: '1rem',
    },
    sectionTitle: {
      fontSize: isMobile ? professionalTheme.fontSizes['3xl'] : professionalTheme.fontSizes['4xl'],
      fontWeight: 800,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '1rem',
      letterSpacing: '-0.02em',
    },
    sectionSubtitle: {
      fontSize: isMobile ? professionalTheme.fontSizes.base : professionalTheme.fontSizes.xl,
      color: professionalTheme.colors.neutral[600],
      maxWidth: '640px',
      margin: '0 auto',
    },
    // Enhanced Stats Section
    statsSection: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['3xl'],
      padding: isMobile ? '2rem' : '3rem',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
      marginTop: isMobile ? '-3rem' : '-4rem',
      position: 'relative',
      zIndex: 10,
      maxWidth: '1200px',
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
      padding: isMobile ? '1rem' : '1.5rem',
      borderRadius: professionalTheme.radius.xl,
      transition: professionalTheme.transitions.default,
    },
    statIcon: {
      width: isMobile ? '56px' : '64px',
      height: isMobile ? '56px' : '64px',
      borderRadius: professionalTheme.radius.xl,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: isMobile ? '1.5rem' : '2rem',
      margin: '0 auto 1rem',
    },
    statValue: {
      fontSize: isMobile ? professionalTheme.fontSizes['2xl'] : professionalTheme.fontSizes['3xl'],
      fontWeight: 800,
      marginBottom: '0.25rem',
    },
    statLabel: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      fontWeight: 500,
    },
    // Enhanced Features Section
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: isMobile ? '1.5rem' : '2rem',
    },
    featureCard: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      padding: isMobile ? '2rem' : '2.5rem',
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      transition: professionalTheme.transitions.default,
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
    },
    featureCardBefore: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: professionalTheme.gradients.primary,
      transform: 'scaleX(0)',
      transformOrigin: 'left',
      transition: professionalTheme.transitions.default,
    },
    featureIcon: {
      width: '64px',
      height: '64px',
      borderRadius: professionalTheme.radius.xl,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '1.5rem',
      fontSize: '1.75rem',
    },
    featureTitle: {
      fontSize: professionalTheme.fontSizes.xl,
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.75rem',
    },
    featureDescription: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      lineHeight: 1.7,
    },
    // Enhanced How It Works Section
    howItWorksGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
      gap: isMobile ? '2rem' : '3rem',
    },
    stepCard: {
      textAlign: 'center',
      position: 'relative',
    },
    stepNumber: {
      width: '64px',
      height: '64px',
      borderRadius: '50%',
      background: professionalTheme.gradients.primary,
      color: '#FFFFFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: professionalTheme.fontSizes.xl,
      fontWeight: 800,
      margin: '0 auto 1.5rem',
      boxShadow: '0 8px 24px rgba(91, 115, 247, 0.3)',
    },
    stepIcon: {
      fontSize: '2.5rem',
      marginBottom: '1rem',
    },
    stepTitle: {
      fontSize: professionalTheme.fontSizes.lg,
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.5rem',
    },
    stepDescription: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
    },
    // Enhanced Offers Section
    offresSection: {
      background: '#FFFFFF',
    },
    offresGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: isMobile ? '1.5rem' : '2rem',
    },
    offreCard: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      padding: isMobile ? '1.5rem' : '2rem',
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      transition: professionalTheme.transitions.default,
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
    },
   offreCardBefore: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: professionalTheme.gradients.primary,
      transform: 'scaleX(0)',
      transformOrigin: 'left',
      transition: professionalTheme.transitions.default,
    },
    offreHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1.25rem',
    },
    offreLogo: {
      width: '56px',
      height: '56px',
      borderRadius: professionalTheme.radius.xl,
      background: professionalTheme.colors.neutral[100],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
    },
    offreTitle: {
      fontSize: professionalTheme.fontSizes.lg,
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '1rem',
      lineHeight: 1.4,
    },
    offreTags: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '1.25rem',
      flexWrap: 'wrap',
    },
    offreTag: {
      padding: '0.375rem 0.75rem',
      borderRadius: professionalTheme.radius.full,
      fontSize: professionalTheme.fontSizes.xs,
      fontWeight: 600,
    },
    // Enhanced Testimonials Section
    testimonialsSection: {
      background: professionalTheme.colors.neutral[900],
      color: '#FFFFFF',
      position: 'relative',
      overflow: 'hidden',
    },
    testimonialsBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.1,
      backgroundImage: `
        radial-gradient(circle at 20% 50%, rgba(91, 115, 247, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 50%, rgba(20, 210, 196, 0.3) 0%, transparent 50%)
      `,
    },
    testimonialsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: isMobile ? '2rem' : '2.5rem',
      position: 'relative',
      zIndex: 1,
    },
    testimonialCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: professionalTheme.radius['2xl'],
      padding: isMobile ? '2rem' : '2.5rem',
      transition: professionalTheme.transitions.default,
    },
    testimonialHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1.5rem',
    },
    testimonialAvatar: {
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFFFFF',
      fontWeight: 700,
      fontSize: professionalTheme.fontSizes.lg,
    },
    testimonialContent: {
      fontSize: professionalTheme.fontSizes.base,
      color: 'rgba(255, 255, 255, 0.9)',
      lineHeight: 1.7,
      marginBottom: '1.5rem',
      fontStyle: 'italic',
    },
    testimonialRating: {
      display: 'flex',
      gap: '0.25rem',
      color: '#FBBF24',
    },
    // Enhanced CTA Section
    ctaSection: {
      background: professionalTheme.gradients.primary,
      borderRadius: professionalTheme.radius['3xl'],
      padding: isMobile ? '4rem 2rem' : '6rem 3rem',
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
      opacity: 0.2,
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
      fontSize: isMobile ? professionalTheme.fontSizes['3xl'] : professionalTheme.fontSizes['4xl'],
      fontWeight: 800,
      color: '#FFFFFF',
      marginBottom: '1.5rem',
    },
    ctaSubtitle: {
      fontSize: isMobile ? professionalTheme.fontSizes.base : professionalTheme.fontSizes.xl,
      color: 'rgba(255, 255, 255, 0.9)',
      marginBottom: '2.5rem',
      maxWidth: '640px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    // Enhanced Footer
    footer: {
      background: professionalTheme.colors.neutral[900],
      color: '#FFFFFF',
      padding: isMobile ? '4rem 2rem 2rem' : '6rem 2rem 2rem',
    },
    footerContainer: {
      maxWidth: '1400px',
      margin: '0 auto',
    },
    footerGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr 1fr',
      gap: isMobile ? '2rem' : '4rem',
      marginBottom: '4rem',
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
    },
    searchInput: {
      width: '100%',
      maxWidth: '560px',
      padding: '1rem 1.5rem',
      borderRadius: professionalTheme.radius.full,
      border: `2px solid ${professionalTheme.colors.neutral[200]}`,
      fontSize: professionalTheme.fontSizes.base,
      outline: 'none',
      transition: professionalTheme.transitions.default,
      background: '#FFFFFF',
    },
  };

  return (
    <div style={styles.page}>
      <style>{professionalKeyframes}</style>

      {/* ===== NAVBAR ===== */}
      <nav style={styles.navbar}>
        <div style={styles.navContainer}>
          <div
            style={styles.logo}
            onClick={() => navigate('/')}
            onMouseEnter={(e) => {
              e.currentTarget.querySelector('[data-logo-icon]').style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.querySelector('[data-logo-icon]').style.transform = 'scale(1)';
            }}
          >
            <div style={styles.logoIcon} data-logo-icon>SR</div>
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
                  e.target.style.color = professionalTheme.colors.neutral[700];
                }}
              >
                {link}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {user ? (
              <div style={{ display: isMobile ? 'none' : 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <div style={{
                  padding: '0.5rem 1rem',
                  borderRadius: professionalTheme.radius.full,
                  fontSize: professionalTheme.fontSizes.sm,
                  fontWeight: 600,
                  background: professionalTheme.colors.primary[50],
                  color: professionalTheme.colors.primary[700],
                }}>
                  {user.role === 'admin' ? '🛡 Admin' : user.role === 'recruteur' ? '🏢 Recruteur' : '👤 Candidat'}
                </div>
                <button style={{ ...styles.button, ...styles.buttonSecondary }} onClick={handleNavigateToDashboard}>
                  Mon Dashboard
                </button>
                <button style={{ ...styles.button, ...styles.buttonPrimary }} onClick={handleLogout}>
                  Déconnexion
                </button>
              </div>
            ) : (
              <div style={{ display: isMobile ? 'none' : 'flex', gap: '0.75rem' }}>
                <button style={{ ...styles.button, ...styles.buttonSecondary }} onClick={() => navigate('/login')}>
                  Connexion
                </button>
                <button style={{ ...styles.button, ...styles.buttonPrimary }} onClick={() => navigate('/register')}>
                  Démarrer Gratuitement
                </button>
              </div>
            )}
            <button style={styles.mobileMenuButton} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
          <div style={styles.mobileMenuOverlay} onClick={() => setMobileMenuOpen(false)} />
          <div style={styles.mobileMenu}>
            {['Fonctionnalités', 'Offres', 'Entreprises', 'Ressources'].map((link) => (
              <a
                key={link}
                style={{ ...styles.navLink, padding: '1rem' }}
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
          </div>
        </>
      )}

      {/* ===== HERO SECTION ===== */}
      <section style={styles.hero}>
        <div style={styles.heroBackground} />
        <div style={styles.heroContainer}>
          <div style={styles.heroContent}>
            <div style={styles.badge}>
              <span>🚀</span>
              <span>#1 Plateforme de Recrutement IA</span>
            </div>
            <h1 style={styles.heroTitle}>
              {user ? `Bienvenue, ${user.nom || user.name || 'Utilisateur'} !` : (
                <>
                  Connectez les Meilleurs{' '}
                  <span style={styles.heroTitleGradient}>Talents</span>
                </>
              )}
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
                  style={{ ...styles.button, ...styles.buttonPrimary, padding: '1rem 2rem', fontSize: '1rem' }}
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
                    style={{ ...styles.button, ...styles.buttonPrimary, padding: '1rem 2rem', fontSize: '1rem' }}
                    onClick={() => navigate('/register')}
                  >
                    Commencer Gratuitement
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                  <button style={{ ...styles.button, ...styles.buttonSecondary, padding: '1rem 2rem', fontSize: '1rem' }}>
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
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>📊</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  Dashboard Analytics
                </h3>
                <p style={{ fontSize: professionalTheme.fontSizes.sm, color: professionalTheme.colors.neutral[600] }}>
                  Suivez vos candidatures en temps réel
                </p>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                {[
                  { label: 'Candidats', value: '2,847', color: professionalTheme.colors.primary[500] },
                  { label: 'Entretiens', value: '156', color: professionalTheme.colors.secondary[600] },
                  { label: 'Recrutés', value: '43', color: professionalTheme.colors.success.DEFAULT },
                ].map((item, i) => (
                  <div key={i} style={{ flex: 1 }}>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: item.color, marginBottom: '0.25rem' }}>
                      {item.value}
                    </div>
                    <div style={{ fontSize: professionalTheme.fontSizes.xs, color: professionalTheme.colors.neutral[600] }}>
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
      <div style={styles.statsSection} id="stats">
        <div style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} style={styles.statCard}>
              <div style={{ ...styles.statIcon, background: stat.bg, color: stat.color }}>
                {stat.icon}
              </div>
              <div style={{ ...styles.statValue, color: stat.color }}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== HOW IT WORKS ===== */}
      <section style={styles.section} id="how-it-works">
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionBadge}>Comment ça marche</div>
            <h2 style={styles.sectionTitle}>4 Égles Simples</h2>
            <p style={styles.sectionSubtitle}>
              Commencez à recruter ou trouver votre emploi idéal en quelques minutes
            </p>
          </div>
          <div style={styles.howItWorksGrid}>
            {howItWorks.map((step, index) => (
              <div key={index} style={styles.stepCard}>
                <div style={styles.stepNumber}>{step.step}</div>
                <div style={styles.stepIcon}>{step.icon}</div>
                <h3 style={styles.stepTitle}>{step.title}</h3>
                <p style={styles.stepDescription}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section style={{ ...styles.section, background: professionalTheme.colors.neutral[50] }} id="features">
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionBadge}>Fonctionnalités</div>
            <h2 style={styles.sectionTitle}>Puissantes & Innovantes</h2>
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
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = professionalTheme.shadows.xl;
                  e.currentTarget.querySelector('[data-feature-line]').style.transform = 'scaleX(1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.querySelector('[data-feature-line]').style.transform = 'scaleX(0)';
                }}
              >
                <div style={{ ...styles.featureCardBefore, background: feature.color }} data-feature-line />
                <div style={{ ...styles.featureIcon, background: `${feature.color}15`, color: feature.color }}>
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
            <div style={styles.sectionBadge}>Opportunités</div>
            <h2 style={styles.sectionTitle}>Offres Récentes</h2>
            <p style={styles.sectionSubtitle}>
              Découvrez les dernières opportunités de carrière
            </p>
          </div>

          <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'center' }}>
            <input
              type="text"
              placeholder="🔍 Rechercher une offre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = professionalTheme.colors.primary[500];
                e.currentTarget.style.boxShadow = '0 0 0 4px rgba(91, 115, 247, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = professionalTheme.colors.neutral[200];
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {loadingOffres ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                border: '4px solid #E5E7EB',
                borderTop: `4px solid ${professionalTheme.colors.primary[600]}`,
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }} />
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
          ) : offresError ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
              <p style={{ color: professionalTheme.colors.error.main, marginBottom: '1rem' }}>{offresError}</p>
              <button style={{ ...styles.button, ...styles.buttonPrimary }} onClick={() => window.location.reload()}>
                Réessayer
              </button>
            </div>
          ) : filteredOffres.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
              <p style={{ color: professionalTheme.colors.neutral[600], fontSize: professionalTheme.fontSizes.xl }}>
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
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = professionalTheme.shadows.xl;
                    e.currentTarget.querySelector('[data-offre-line]').style.transform = 'scaleX(1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.querySelector('[data-offre-line]').style.transform = 'scaleX(0)';
                  }}
                  onClick={() => user ? navigate('/candidat/offres') : navigate('/login')}
                >
                  <div style={styles.offreCardBefore} data-offre-line />
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
                      padding: '0.75rem',
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
      <section style={{ ...styles.section, ...styles.testimonialsSection }} id="testimonials">
        <div style={styles.testimonialsBackground} />
        <div style={styles.sectionContainer}>
          <div style={{ ...styles.sectionHeader, position: 'relative', zIndex: 1 }}>
            <div style={{ ...styles.sectionBadge, background: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF' }}>
              Témoignages
            </div>
            <h2 style={{ ...styles.sectionTitle, color: '#FFFFFF' }}>
              Ce que disent nos Clients
            </h2>
            <p style={{ ...styles.sectionSubtitle, color: 'rgba(255, 255, 255, 0.8)' }}>
              Des milliers d'entreprises nous font confiance
            </p>
          </div>
          <div style={styles.testimonialsGrid}>
            {temoignages.map((temoignage) => (
              <div
                key={temoignage.nom}
                style={styles.testimonialCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
              >
                <div style={styles.testimonialHeader}>
                  <div style={{ ...styles.testimonialAvatar, background: temoignage.color }}>
                    {temoignage.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: professionalTheme.fontSizes.base, fontWeight: 700, color: '#FFFFFF' }}>
                      {temoignage.nom}
                    </div>
                    <div style={{ fontSize: professionalTheme.fontSizes.sm, color: 'rgba(255, 255, 255, 0.7)' }}>
                      {temoignage.poste}
                    </div>
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
            <div style={styles.ctaBackground} />
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
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                {user ? (
                  <button
                    style={{ ...styles.button, background: '#FFFFFF', color: professionalTheme.colors.primary[600], padding: '1rem 2.5rem', fontSize: '1rem' }}
                    onClick={handleNavigateToDashboard}
                  >
                    Aller au Dashboard
                  </button>
                ) : (
                  <>
                    <button
                      style={{ ...styles.button, background: '#FFFFFF', color: professionalTheme.colors.primary[600], padding: '1rem 2.5rem', fontSize: '1rem' }}
                      onClick={() => navigate('/register')}
                    >
                      Démarrer Gratuitement
                    </button>
                    <button
                      style={{ ...styles.button, background: 'transparent', color: '#FFFFFF', border: '2px solid rgba(255, 255, 255, 0.3)', padding: '1rem 2.5rem', fontSize: '1rem' }}
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
            <div>
              <div style={styles.logo} style={{ marginBottom: '1rem' }}>
                <div style={{ ...styles.logoIcon, width: '40px', height: '40px', fontSize: '14px' }}>SR</div>
                <div style={{ fontSize: professionalTheme.fontSizes.xl, fontWeight: 700 }}>SmartRecruit</div>
              </div>
              <p style={{ fontSize: professionalTheme.fontSizes.sm, color: professionalTheme.colors.neutral[400], lineHeight: 1.7, maxWidth: '280px' }}>
                La plateforme de recrutement intelligente qui connecte les meilleurs talents aux opportunités idéales grâce à l'IA.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: professionalTheme.fontSizes.sm, fontWeight: 700, marginBottom: '1.25rem', color: '#FFFFFF' }}>
                Produit
              </h4>
              {['Fonctionnalités', 'Tarification', 'Entreprises', 'API'].map((link) => (
                <a key={link} href="#" style={styles.footerLink}>{link}</a>
              ))}
            </div>

            <div>
              <h4 style={{ fontSize: professionalTheme.fontSizes.sm, fontWeight: 700, marginBottom: '1.25rem', color: '#FFFFFF' }}>
                Entreprise
              </h4>
              {['À Propos', 'Blog', 'Carrières', 'Contact'].map((link) => (
                <a key={link} href="#" style={styles.footerLink}>{link}</a>
              ))}
            </div>

            <div>
              <h4 style={{ fontSize: professionalTheme.fontSizes.sm, fontWeight: 700, marginBottom: '1.25rem', color: '#FFFFFF' }}>
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
                    width: '44px',
                    height: '44px',
                    borderRadius: professionalTheme.radius.lg,
                    background: professionalTheme.colors.neutral[800],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: professionalTheme.colors.neutral[400],
                    textDecoration: 'none',
                    fontSize: professionalTheme.fontSizes.xs,
                    fontWeight: 600,
                    transition: professionalTheme.transitions.fast,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = professionalTheme.colors.primary[600];
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = professionalTheme.colors.neutral[800];
                    e.currentTarget.style.color = professionalTheme.colors.neutral[400];
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

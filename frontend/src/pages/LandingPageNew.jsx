import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { professionalTheme, professionalKeyframes } from '../theme/professionalTheme';

// Sample data
const features = [
  {
    id: 1,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'IA Scoring Intelligent',
    description: 'Notre algorithme avancé analyse et classe automatiquement les candidats selon vos critères.',
    color: '#5B73F7',
  },
  {
    id: 2,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: 'Matching Temps Réel',
    description: 'Trouvez instantanément les profils les plus adaptés à vos offres d\'emploi.',
    color: '#14D2C4',
  },
  {
    id: 3,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    title: 'Dashboard Analytics',
    description: 'Visualisez vos KPIs RH avec des tableaux de bord interactifs et personnalisables.',
    color: '#F59E0B',
  },
  {
    id: 4,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Gestion Collaborative',
    description: 'Travaillez en équipe avec des espaces partagés et des commentaires en temps réel.',
    color: '#8B5CF6',
  },
  {
    id: 5,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    title: 'Sécurité Renforcée',
    description: 'Vos données sont protégées par un chiffrement de bout en bout et une authentification 2FA.',
    color: '#EF4444',
  },
  {
    id: 6,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: 'Communication Intégrée',
    description: 'Chat vidéo, messagerie et notifications pour fluidifier vos échanges avec les candidats.',
    color: '#10B981',
  },
];

const stats = [
  { value: '12K+', label: 'Candidats Actifs', change: '+23%' },
  { value: '850+', label: 'Entreprises', change: '+12%' },
  { value: '4.5K', label: 'Placements Réussis', change: '+45%' },
  { value: '98%', label: 'Satisfaction Client', change: '+3%' },
];

const testimonials = [
  {
    id: 1,
    name: 'Sarah Ben Ali',
    role: 'Directrice RH',
    company: 'Tech Corp Tunisia',
    avatar: 'SB',
    content: 'SmartRecruit a révolutionné notre processus de recrutement. Le score IA nous fait gagner 60% de temps sur le présélectionnement.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Karim Mansouri',
    role: 'CEO',
    company: 'Startup Hub',
    avatar: 'KM',
    content: 'L\'interface est intuitive et les fonctionnalités sont puissantes. Nous avons trouvé notre développeur idéal en 2 semaines.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Lina Cherif',
    role: 'Candidat Placée',
    company: 'Digital Agency',
    avatar: 'LC',
    content: 'Grâce au matching intelligent, j\'ai reçu des offres qui correspondaient parfaitement à mon profil. Excellent service !',
    rating: 5,
  },
];

const jobCategories = [
  { name: 'IT & Développement', count: 234, icon: '💻' },
  { name: 'Marketing & Digital', count: 156, icon: '📱' },
  { name: 'Finance & Comptabilité', count: 189, icon: '📊' },
  { name: 'Ressources Humaines', count: 98, icon: '👥' },
  { name: 'Design & Création', count: 87, icon: '🎨' },
  { name: 'Ventes & Commercial', count: 145, icon: '🤝' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('candidat');
  const [emailInput, setEmailInput] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      zIndex: professionalTheme.zIndex.fixed,
      background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
      backdropFilter: 'blur(12px)',
      borderBottom: scrolled ? `1px solid ${professionalTheme.colors.neutral[200]}` : 'none',
      transition: professionalTheme.transitions.default,
    },
    navContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1.5rem',
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
      width: '40px',
      height: '40px',
      borderRadius: professionalTheme.radius.xl,
      background: professionalTheme.gradients.primary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFFFFF',
      fontWeight: 700,
      fontSize: '18px',
    },
    logoText: {
      fontSize: professionalTheme.fontSizes.xl,
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
      letterSpacing: '-0.02em',
    },
    navLinks: {
      display: 'flex',
      gap: '2rem',
      alignItems: 'center',
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
    buttonOutline: {
      background: 'transparent',
      color: professionalTheme.colors.neutral[700],
      border: `1px solid ${professionalTheme.colors.neutral[300]}`,
    },
    hero: {
      paddingTop: '8rem',
      paddingBottom: '5rem',
      background: professionalTheme.gradients.subtle,
      position: 'relative',
      overflow: 'hidden',
    },
    heroContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1.5rem',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '4rem',
      alignItems: 'center',
    },
    heroContent: {
      maxWidth: '560px',
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: professionalTheme.colors.primary[50],
      color: professionalTheme.colors.primary[700],
      padding: '0.375rem 0.875rem',
      borderRadius: professionalTheme.radius.full,
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 500,
      marginBottom: '1.5rem',
    },
    heroTitle: {
      fontSize: professionalTheme.fontSizes['5xl'],
      fontWeight: 800,
      lineHeight: 1.1,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '1.5rem',
      letterSpacing: '-0.03em',
    },
    heroSubtitle: {
      fontSize: professionalTheme.fontSizes.lg,
      color: professionalTheme.colors.neutral[600],
      marginBottom: '2rem',
      maxWidth: '480px',
    },
    heroButtons: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
    },
    heroStats: {
      display: 'flex',
      gap: '2rem',
      paddingTop: '2rem',
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
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '1.5rem',
    },
    statCard: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      padding: '1.5rem',
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      textAlign: 'center',
      transition: professionalTheme.transitions.default,
    },
    statValue: {
      fontSize: professionalTheme.fontSizes['4xl'],
      fontWeight: 700,
      color: professionalTheme.colors.primary[600],
      marginBottom: '0.25rem',
    },
    statLabel: {
      fontSize: professionalTheme.fontSizes.sm,
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
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '2rem',
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
      color: '#FFFFFF',
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
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '2rem',
    },
    testimonialCard: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      padding: '2rem',
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
      background: professionalTheme.gradients.primary,
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
    ctaButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
    },
    ctaButton: {
      padding: '0.875rem 2rem',
      borderRadius: professionalTheme.radius.xl,
      fontSize: professionalTheme.fontSizes.base,
      fontWeight: 600,
      cursor: 'pointer',
      border: 'none',
    },
    ctaButtonPrimary: {
      background: '#FFFFFF',
      color: professionalTheme.colors.primary[600],
    },
    ctaButtonSecondary: {
      background: 'transparent',
      color: '#FFFFFF',
      border: '2px solid rgba(255, 255, 255, 0.3)',
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
      gridTemplateColumns: '2fr 1fr 1fr 1fr',
      gap: '3rem',
      marginBottom: '3rem',
    },
    footerBrand: {
      maxWidth: '280px',
    },
    footerLogo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '1rem',
    },
    footerDescription: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[400],
      lineHeight: 1.7,
    },
    footerColumn: {},
    footerTitle: {
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      color: '#FFFFFF',
      marginBottom: '1rem',
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
    },
    footerCopyright: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[500],
    },
    footerSocial: {
      display: 'flex',
      gap: '1rem',
    },
    socialLink: {
      width: '40px',
      height: '40px',
      borderRadius: professionalTheme.radius.lg,
      background: professionalTheme.colors.neutral[800],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: professionalTheme.colors.neutral[400],
      transition: professionalTheme.transitions.fast,
      textDecoration: 'none',
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

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              style={{ ...styles.button, ...styles.buttonOutline }}
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
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section style={styles.hero}>
        <div style={styles.heroContainer}>
          <div style={styles.heroContent}>
            <div style={styles.badge}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              #1 Plateforme de Recrutement en Tunisie
            </div>

            <h1 style={styles.heroTitle}>
              Connectez les Meilleurs
              <span style={{ color: professionalTheme.colors.primary[600] }}> Talents</span>
            </h1>

            <p style={styles.heroSubtitle}>
              SmartRecruit utilise l'intelligence artificielle pour révolutionner votre processus de recrutement. Trouvez le candidat idéal en moins de temps.
            </p>

            <div style={styles.heroButtons}>
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Voir la Démo
              </button>
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
                  e.currentTarget.style.borderColor = professionalTheme.colors.primary[300];
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = professionalTheme.colors.neutral[200];
                }}
              >
                <div style={styles.statValue}>{stat.value}</div>
                <div style={styles.statLabel}>{stat.label}</div>
                <div style={styles.statChange}>{stat.change} vs mois dernier</div>
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
                key={feature.id}
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
                <div style={{ ...styles.featureIcon, background: feature.color }}>
                  {feature.icon}
                </div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
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
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} style={styles.testimonialCard}>
                <div style={styles.testimonialHeader}>
                  <div style={styles.testimonialAvatar}>{testimonial.avatar}</div>
                  <div style={styles.testimonialInfo}>
                    <div style={styles.testimonialName}>{testimonial.name}</div>
                    <div style={styles.testimonialRole}>
                      {testimonial.role} · {testimonial.company}
                    </div>
                  </div>
                </div>
                <p style={styles.testimonialContent}>"{testimonial.content}"</p>
                <div style={styles.testimonialRating}>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
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
                Prêt à Transformer Votre Recrutement ?
              </h2>
              <p style={styles.ctaSubtitle}>
                Rejoignez des milliers d'entreprises qui font confiance à SmartRecruit pour trouver les meilleurs talents.
              </p>
              <div style={styles.ctaButtons}>
                <button
                  style={styles.ctaButtonPrimary}
                  onClick={() => navigate('/register')}
                >
                  Démarrer Gratuitement
                </button>
                <button
                  style={styles.ctaButtonSecondary}
                >
                  Contacter l'Équipe
                </button>
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
              <div style={styles.footerLogo}>
                <div style={styles.logoIcon}>SR</div>
                <div style={{ fontSize: '1.125rem', fontWeight: 700 }}>SmartRecruit</div>
              </div>
              <p style={styles.footerDescription}>
                La plateforme de recrutement intelligente qui connecte les meilleurs talents aux opportunités idéales grâce à l'IA.
              </p>
            </div>

            <div style={styles.footerColumn}>
              <h4 style={styles.footerTitle}>Produit</h4>
              <a href="#" style={styles.footerLink}>Fonctionnalités</a>
              <a href="#" style={styles.footerLink}>Tarification</a>
              <a href="#" style={styles.footerLink}>Entreprises</a>
              <a href="#" style={styles.footerLink}>API</a>
            </div>

            <div style={styles.footerColumn}>
              <h4 style={styles.footerTitle}>Entreprise</h4>
              <a href="#" style={styles.footerLink}>À Propos</a>
              <a href="#" style={styles.footerLink}>Blog</a>
              <a href="#" style={styles.footerLink}>Carrières</a>
              <a href="#" style={styles.footerLink}>Contact</a>
            </div>

            <div style={styles.footerColumn}>
              <h4 style={styles.footerTitle}>Légal</h4>
              <a href="#" style={styles.footerLink}>Confidentialité</a>
              <a href="#" style={styles.footerLink}>CGU</a>
              <a href="#" style={styles.footerLink}>Cookies</a>
              <a href="#" style={styles.footerLink}>Mentions Légales</a>
            </div>
          </div>

          <div style={styles.footerBottom}>
            <div style={styles.footerCopyright}>
              © 2024 SmartRecruit. Tous droits réservés.
            </div>
            <div style={styles.footerSocial}>
              {['linkedin', 'twitter', 'facebook', 'instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  style={styles.socialLink}
                  onMouseEnter={(e) => {
                    e.target.style.background = professionalTheme.colors.neutral[700];
                    e.target.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = professionalTheme.colors.neutral[800];
                    e.target.style.color = professionalTheme.colors.neutral[400];
                  }}
                >
                  <span style={{ textTransform: 'capitalize', fontSize: '0.75rem', fontWeight: 600 }}>
                    {social.slice(0, 2)}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

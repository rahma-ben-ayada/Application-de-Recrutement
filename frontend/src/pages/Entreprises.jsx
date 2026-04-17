import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { professionalTheme, professionalKeyframes } from '../theme/professionalTheme';

const entreprises = [
  {
    id: 1,
    nom: 'Tech Corp',
    secteur: 'Informatique',
    logo: '💻',
    employes: '50-100',
    localisation: 'Tunis',
    offres: 5,
    description: 'Leader dans le développement de solutions logicielles innovantes.',
    badges: ['Top Employeur', 'Certifié'],
  },
  {
    id: 2,
    nom: 'StartUp RH',
    secteur: 'Ressources Humaines',
    logo: '🚀',
    employes: '20-50',
    localisation: 'Sfax',
    offres: 3,
    description: 'Startup spécialisée dans les solutions RH modernes.',
    badges: ['Innovant'],
  },
  {
    id: 3,
    nom: 'Big Finance',
    secteur: 'Finance',
    logo: '🏦',
    employes: '500+',
    localisation: 'Tunis',
    offres: 8,
    description: 'Institution financière de premier plan.',
    badges: ['Top Employeur', 'International'],
  },
  {
    id: 4,
    nom: 'Digital Agency',
    secteur: 'Marketing Digital',
    logo: '📱',
    employes: '10-20',
    localisation: 'Sousse',
    offres: 2,
    description: 'Agence de marketing digital créative.',
    badges: [],
  },
  {
    id: 5,
    nom: 'Dev Studio',
    secteur: 'Informatique',
    logo: '⚡',
    employes: '30-50',
    localisation: 'Tunis',
    offres: 4,
    description: 'Studio de développement mobile et web.',
    badges: ['Certifié'],
  },
  {
    id: 6,
    nom: 'Cloud Corp',
    secteur: 'Cloud Computing',
    logo: '☁️',
    employes: '100-200',
    localisation: 'Remote',
    offres: 6,
    description: 'Solutions cloud pour entreprises.',
    badges: ['Top Employeur', 'Innovant', 'International'],
  },
];

const secteurs = [...new Set(entreprises.map(e => e.secteur))];

const benefits = [
  { icon: '🎯', title: 'Visibilité Maximale', description: 'Votre entreprise vue par des milliers de candidats qualifiés' },
  { icon: '⚡', title: 'Recrutement Rapide', description: 'Trouvez le bon candidat en moins de 15 jours' },
  { icon: '💰', title: 'Coût Réduit', description: 'Économisez jusqu\'à 70% sur vos frais de recrutement' },
  { icon: '📊', title: 'Analytics Avancés', description: 'Suivez vos performances en temps réel' },
];

export default function Entreprises() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedSector, setSelectedSector] = useState('Tous');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredEntreprises = entreprises.filter(ent => {
    const matchSearch = ent.nom.toLowerCase().includes(search.toLowerCase());
    const matchSector = selectedSector === 'Tous' || ent.secteur === selectedSector;
    return matchSearch && matchSector;
  });

  const styles = {
    page: {
      fontFamily: professionalTheme.fonts.sans,
      background: '#FFFFFF',
      color: professionalTheme.colors.neutral[900],
      minHeight: '100vh',
    },
    navbar: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #E4E4E7',
    },
    navContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1.5rem',
      height: '72px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '@media (max-width: 1024px)': {
        padding: '0 1rem',
      },
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
      '@media (max-width: 640px)': {
        width: '36px',
        height: '36px',
        fontSize: '14px',
      },
    },
    navLinks: {
      display: 'flex',
      gap: '2rem',
      alignItems: 'center',
      '@media (max-width: 1024px)': {
        display: 'none',
      },
    },
    mobileMenuButton: {
      display: 'none',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '0.5rem',
      '@media (max-width: 1024px)': {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        alignItems: 'center',
        justifyContent: 'center',
      },
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
    mobileMenu: {
      display: 'none',
      '@media (max-width: 1024px)': {
        display: mobileMenuOpen ? 'flex' : 'none',
        position: 'absolute',
        top: '72px',
        left: 0,
        right: 0,
        background: '#FFFFFF',
        flexDirection: 'column',
        padding: '1rem',
        gap: '0.5rem',
        borderBottom: `1px solid ${professionalTheme.colors.neutral[200]}`,
        boxShadow: professionalTheme.shadows.lg,
      },
    },
    mobileMenuLink: {
      padding: '0.75rem 1rem',
      color: professionalTheme.colors.neutral[700],
      textDecoration: 'none',
      fontSize: professionalTheme.fontSizes.base,
      fontWeight: 500,
      borderRadius: professionalTheme.radius.lg,
      transition: professionalTheme.transitions.fast,
    },
    mobileMenuButtons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      marginTop: '0.5rem',
      paddingTop: '0.5rem',
      borderTop: `1px solid ${professionalTheme.colors.neutral[200]}`,
    },
    navLink: {
      color: professionalTheme.colors.neutral[600],
      textDecoration: 'none',
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 500,
      cursor: 'pointer',
    },
    button: {
      padding: '0.625rem 1.25rem',
      borderRadius: professionalTheme.radius.lg,
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 500,
      cursor: 'pointer',
      border: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    hero: {
      padding: '5rem 1.5rem',
      background: professionalTheme.gradients.primary,
      color: '#FFFFFF',
      position: 'relative',
      overflow: 'hidden',
    },
    heroContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      textAlign: 'center',
      position: 'relative',
      zIndex: 1,
    },
    heroTitle: {
      fontSize: professionalTheme.fontSizes['5xl'],
      fontWeight: 800,
      marginBottom: '1.5rem',
    },
    heroSubtitle: {
      fontSize: professionalTheme.fontSizes.xl,
      color: 'rgba(255, 255, 255, 0.9)',
      marginBottom: '2.5rem',
      maxWidth: '600px',
      margin: '0 auto 2.5rem',
    },
    heroButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
    },
    heroButtonPrimary: {
      padding: '0.875rem 2rem',
      borderRadius: professionalTheme.radius.xl,
      background: '#FFFFFF',
      color: professionalTheme.colors.primary[600],
      fontSize: professionalTheme.fontSizes.base,
      fontWeight: 600,
      border: 'none',
      cursor: 'pointer',
    },
    heroButtonSecondary: {
      padding: '0.875rem 2rem',
      borderRadius: professionalTheme.radius.xl,
      background: 'transparent',
      color: '#FFFFFF',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      fontSize: professionalTheme.fontSizes.base,
      fontWeight: 600,
      cursor: 'pointer',
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
    },
    sectionSubtitle: {
      fontSize: professionalTheme.fontSizes.lg,
      color: professionalTheme.colors.neutral[600],
    },
    benefitsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '2rem',
      '@media (max-width: 1024px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1.5rem',
      },
      '@media (max-width: 640px)': {
        gridTemplateColumns: '1fr',
        gap: '1.25rem',
      },
    },
    benefitCard: {
      textAlign: 'center',
    },
    benefitIcon: {
      fontSize: '2.5rem',
      marginBottom: '1rem',
    },
    benefitTitle: {
      fontSize: professionalTheme.fontSizes.xl,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.5rem',
    },
    benefitDescription: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      lineHeight: 1.6,
    },
    filtersSection: {
      padding: '2rem 1.5rem',
      borderBottom: '1px solid #E4E4E7',
    },
    filtersContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'flex',
      gap: '2rem',
      alignItems: 'center',
    },
    searchBox: {
      flex: 1,
      maxWidth: '400px',
    },
    searchInput: {
      width: '100%',
      padding: '0.75rem 1rem',
      borderRadius: professionalTheme.radius.lg,
      border: '1px solid #E4E4E7',
      fontSize: professionalTheme.fontSizes.sm,
      outline: 'none',
    },
    filterGroup: {
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
    },
    filterButton: (isActive) => ({
      padding: '0.5rem 1rem',
      borderRadius: professionalTheme.radius.full,
      border: isActive ? '1px solid #5B73F7' : '1px solid #E4E4E7',
      background: isActive ? professionalTheme.colors.primary[50] : '#FFFFFF',
      color: isActive ? professionalTheme.colors.primary[700] : professionalTheme.colors.neutral[600],
      fontSize: professionalTheme.fontSizes.sm,
      cursor: 'pointer',
    }),
    entreprisesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '2rem',
      '@media (max-width: 1024px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1.5rem',
      },
      '@media (max-width: 640px)': {
        gridTemplateColumns: '1fr',
        gap: '1.25rem',
      },
    },
    entrepriseCard: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      padding: '2rem',
      border: '1px solid #E4E4E7',
      textAlign: 'center',
      transition: professionalTheme.transitions.default,
      '@media (max-width: 640px)': {
        padding: '1.5rem',
      },
    },
    entrepriseLogo: {
      width: '80px',
      height: '80px',
      borderRadius: professionalTheme.radius['2xl'],
      background: professionalTheme.colors.neutral[100],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2.5rem',
      margin: '0 auto 1.5rem',
    },
    entrepriseNom: {
      fontSize: professionalTheme.fontSizes.xl,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.5rem',
    },
    entrepriseSecteur: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      marginBottom: '0.5rem',
    },
    entrepriseDescription: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[700],
      lineHeight: 1.6,
      marginBottom: '1rem',
    },
    entrepriseBadges: {
      display: 'flex',
      gap: '0.5rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginBottom: '1.5rem',
    },
    entrepriseBadge: {
      padding: '0.25rem 0.75rem',
      borderRadius: professionalTheme.radius.full,
      background: professionalTheme.colors.primary[50],
      color: professionalTheme.colors.primary[700],
      fontSize: professionalTheme.fontSizes.xs,
      fontWeight: 500,
    },
    entrepriseMeta: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1.5rem',
      paddingTop: '1.5rem',
      borderTop: '1px solid #F4F4F5',
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
    },
    entrepriseMetaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
    },
    ctaSection: {
      background: professionalTheme.colors.neutral[50],
      borderRadius: professionalTheme.radius['3xl'],
      padding: '4rem 2rem',
      textAlign: 'center',
    },
    ctaTitle: {
      fontSize: professionalTheme.fontSizes['3xl'],
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '1rem',
    },
    ctaSubtitle: {
      fontSize: professionalTheme.fontSizes.base,
      color: professionalTheme.colors.neutral[600],
      marginBottom: '2rem',
    },
    testimonialsSection: {
      background: professionalTheme.colors.neutral[50],
    },
    testimonialsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '2rem',
      '@media (max-width: 1024px)': {
        gridTemplateColumns: '1fr',
        gap: '1.5rem',
      },
    },
    testimonialCard: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      padding: '2rem',
      border: '1px solid #E4E4E7',
      '@media (max-width: 640px)': {
        padding: '1.5rem',
      },
    },
    testimonialQuote: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[700],
      lineHeight: 1.7,
      fontStyle: 'italic',
      marginBottom: '1.5rem',
    },
    testimonialAuthor: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
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
    },
    testimonialName: {
      fontSize: professionalTheme.fontSizes.base,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[900],
    },
    testimonialRole: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
    },
    footer: {
      background: professionalTheme.colors.neutral[900],
      color: '#FFFFFF',
      padding: '3rem 1.5rem 2rem',
    },
    footerContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
    },
    footerBottom: {
      paddingTop: '2rem',
      borderTop: '1px solid #27272A',
      textAlign: 'center',
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[500],
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
            <div style={{ fontSize: professionalTheme.fontSizes.xl, fontWeight: 700, color: professionalTheme.colors.neutral[900] }}>
              SmartRecruit
            </div>
          </div>

          <div style={styles.navLinks}>
            {['Fonctionnalités', 'Offres', 'Entreprises', 'Ressources'].map((link) => (
              <a
                key={link}
                style={{
                  ...styles.navLink,
                  color: link === 'Entreprises' ? professionalTheme.colors.primary[600] : professionalTheme.colors.neutral[600],
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
            <div style={{ display: isMobile ? 'none' : 'flex', gap: '0.75rem' }}>
              <button
                style={{ ...styles.button, background: professionalTheme.colors.neutral[100], color: professionalTheme.colors.neutral[900] }}
                onClick={() => navigate('/login')}
              >
                Connexion
              </button>
              <button
                style={{ ...styles.button, background: professionalTheme.gradients.primary, color: '#FFFFFF' }}
                onClick={() => navigate('/register')}
              >
                Recruter
              </button>
            </div>
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
      {isMobile && mobileMenuOpen && (
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
              style={{ ...styles.button, width: '100%', background: professionalTheme.gradients.primary, color: '#FFFFFF' }}
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/register');
              }}
            >
              Recruter
            </button>
          </div>
        </div>
      )}

      {/* ===== HERO ===== */}
      <section style={styles.hero}>
        <div style={styles.heroContainer}>
          <h1 style={styles.heroTitle}>
            Recrutez les Meilleurs Talents
          </h1>
          <p style={styles.heroSubtitle}>
            Rejoignez +500 entreprises qui font confiance à SmartRecruit pour leur recrutement
          </p>

          <div style={styles.heroButtons}>
            <button
              style={styles.heroButtonPrimary}
              onClick={() => navigate('/register')}
            >
              Commencer Gratuitement
            </button>
            <button
              style={styles.heroButtonSecondary}
            >
              Voir Démo
            </button>
          </div>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section style={styles.section}>
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              Pourquoi Choisir SmartRecruit ?
            </h2>
            <p style={styles.sectionSubtitle}>
              Des avantages concrets pour votre entreprise
            </p>
          </div>

          <div style={styles.benefitsGrid}>
            {benefits.map((benefit, i) => (
              <div key={i} style={styles.benefitCard}>
                <div style={styles.benefitIcon}>{benefit.icon}</div>
                <h3 style={styles.benefitTitle}>{benefit.title}</h3>
                <p style={styles.benefitDescription}>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FILTERS ===== */}
      <section style={styles.filtersSection}>
        <div style={styles.filtersContainer}>
          <div style={styles.searchBox}>
            <input
              type="text"
              placeholder="🔍 Rechercher une entreprise..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          <div style={styles.filterGroup}>
            <span style={{ fontSize: professionalTheme.fontSizes.sm, fontWeight: 600, color: professionalTheme.colors.neutral[700] }}>
              Secteur:
            </span>
            {['Tous', ...secteurs].map(sector => (
              <button
                key={sector}
                style={styles.filterButton(selectedSector === sector)}
                onClick={() => setSelectedSector(sector)}
              >
                {sector}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ENTREPRISES ===== */}
      <section style={styles.section}>
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              Entreprises Recrutant
            </h2>
            <p style={styles.sectionSubtitle}>
              Découvrez les entreprises qui recherchent des talents comme vous
            </p>
          </div>

          <div style={styles.entreprisesGrid}>
            {filteredEntreprises.map((entreprise) => (
              <div
                key={entreprise.id}
                style={styles.entrepriseCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = professionalTheme.shadows.xl;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={styles.entrepriseLogo}>{entreprise.logo}</div>
                <h3 style={styles.entrepriseNom}>{entreprise.nom}</h3>
                <p style={styles.entrepriseSecteur}>{entreprise.secteur}</p>
                <p style={styles.entrepriseDescription}>{entreprise.description}</p>

                <div style={styles.entrepriseBadges}>
                  {entreprise.badges.map(badge => (
                    <span key={badge} style={styles.entrepriseBadge}>{badge}</span>
                  ))}
                </div>

                <div style={styles.entrepriseMeta}>
                  <span style={styles.entrepriseMetaItem}>
                    👥 {entreprise.employes}
                  </span>
                  <span style={styles.entrepriseMetaItem}>
                    💼 {entreprise.offres} offre{entreprise.offres > 1 ? 's' : ''}
                  </span>
                  <span style={styles.entrepriseMetaItem}>
                    📍 {entreprise.localisation}
                  </span>
                </div>
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
              Ce Que Disent Nos Recruteurs
            </h2>
            <p style={styles.sectionSubtitle}>
              Des entreprises satisfaites partagent leur expérience
            </p>
          </div>

          <div style={styles.testimonialsGrid}>
            {[
              {
                quote: 'SmartRecruit nous a fait gagner 60% de temps sur le présélectionnement. L\'IA scoring est impressionnante !',
                name: 'Sarah Ben Ali',
                role: 'DRH chez Tech Corp',
                avatar: 'SB',
              },
              {
                quote: 'Nous avons trouvé 3 développeurs qualifiés en 2 semaines. Plateforme intuitive et efficace.',
                name: 'Karim Mansouri',
                role: 'CEO chez StartUp RH',
                avatar: 'KM',
              },
              {
                quote: 'Le support client est excellent et les fonctionnalités correspondent parfaitement à nos besoins.',
                name: 'Lina Cherif',
                role: 'RH Manager chez Big Finance',
                avatar: 'LC',
              },
            ].map((testimonial, i) => (
              <div key={i} style={styles.testimonialCard}>
                <p style={styles.testimonialQuote}> "{testimonial.quote}" </p>
                <div style={styles.testimonialAuthor}>
                  <div style={styles.testimonialAvatar}>{testimonial.avatar}</div>
                  <div>
                    <div style={styles.testimonialName}>{testimonial.name}</div>
                    <div style={styles.testimonialRole}>{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={styles.section}>
        <div style={styles.sectionContainer}>
          <div style={styles.ctaSection}>
            <h2 style={styles.ctaTitle}>
              Prêt à Recruter ?
            </h2>
            <p style={styles.ctaSubtitle}>
              Publiez votre première offre et trouvez le talent idéal en quelques jours
            </p>
            <button
              style={{ ...styles.button, ...styles.heroButtonPrimary }}
              onClick={() => navigate('/register')}
            >
              Publier une Offre
            </button>
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

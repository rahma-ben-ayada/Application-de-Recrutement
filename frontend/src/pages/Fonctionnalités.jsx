import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { professionalTheme, professionalKeyframes } from '../theme/professionalTheme';

const features = [
  {
    id: 1,
    icon: '🤖',
    title: 'IA Scoring Intelligent',
    description: 'Algorithmes avancés pour évaluer et classer les candidats automatiquement selon vos critères.',
    color: '#5B73F7',
    bgLight: '#E8EEFF',
    benefits: ['Évaluation automatique des CV', 'Score de matching en temps réel', 'Classement intelligent des profils'],
  },
  {
    id: 2,
    icon: '🎯',
    title: 'Matching Précis',
    description: 'Trouvez la perle rare grâce à notre moteur de matching intelligent.',
    color: '#14D2C4',
    bgLight: '#D8F8F3',
    benefits: ['Matching multi-critères', 'Recherche sémantique', 'Suggestions intelligentes'],
  },
  {
    id: 3,
    icon: '📊',
    title: 'Analytics Temps Réel',
    description: 'Tableaux de bord interactifs pour suivre vos KPIs RH en direct.',
    color: '#F59E0B',
    bgLight: '#FEF3E0',
    benefits: ['KPIs personnalisables', 'Rapports automatisés', 'Export de données'],
  },
  {
    id: 4,
    icon: '📅',
    title: 'Entretiens Vidéo',
    description: 'Planifiez et organisez vos entretiens avec intégration vidéo native.',
    color: '#8B5CF6',
    bgLight: '#EDE9FE',
    benefits: ['Visioconférence intégrée', 'Calendrier partagé', 'Rappels automatiques'],
  },
  {
    id: 5,
    icon: '🔒',
    title: 'Sécurité Maximale',
    description: 'Vos données sont protégées par chiffrement bout-en-bout.',
    color: '#EF4444',
    bgLight: '#FEE2E2',
    benefits: ['Chiffrement AES-256', 'Authentification 2FA', 'Conformité RGPD'],
  },
  {
    id: 6,
    icon: '🌍',
    title: 'International',
    description: 'Plateforme multilingue avec support 24/7 dans le monde entier.',
    color: '#10B981',
    bgLight: '#D1FAE5',
    benefits: ['Multi-langues', 'Support 24/7', 'Déploiement mondial'],
  },
];

const pricing = [
  {
    name: 'Starter',
    price: '0 TND',
    period: 'gratuit',
    description: 'Pour les débutants',
    features: [
      'Jusqu\'à 3 offres actives',
      '50 candidatures par mois',
      'Support email',
      'Rapports basiques',
    ],
    cta: 'Commencer',
    popular: false,
  },
  {
    name: 'Professional',
    price: '199 TND',
    period: '/mois',
    description: 'Pour les entreprises en croissance',
    features: [
      'Offres illimitées',
      '500 candidatures par mois',
      'IA Scoring',
      'Support prioritaire',
      'Analytics avancés',
    ],
    cta: 'Essayer Gratuitement',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Sur mesure',
    period: '',
    description: 'Pour les grandes organisations',
    features: [
      'Tout illimité',
      'API dédiée',
      'Account manager',
      'Formation sur site',
      'SLA garanti',
    ],
    cta: 'Contacter',
    popular: false,
  },
];

export default function Fonctionnalités() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    logoText: {
      fontSize: professionalTheme.fontSizes.xl,
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
      '@media (max-width: 640px)': {
        fontSize: professionalTheme.fontSizes.lg,
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
      textAlign: 'center',
      background: professionalTheme.gradients.subtle,
    },
    heroContainer: {
      maxWidth: '800px',
      margin: '0 auto',
    },
    heroTitle: {
      fontSize: professionalTheme.fontSizes['5xl'],
      fontWeight: 800,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '1.5rem',
    },
    heroSubtitle: {
      fontSize: professionalTheme.fontSizes.lg,
      color: professionalTheme.colors.neutral[600],
      lineHeight: 1.6,
    },
    section: {
      padding: '5rem 1.5rem',
    },
    sectionContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
    },
    sectionTitle: {
      fontSize: professionalTheme.fontSizes['4xl'],
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
      textAlign: 'center',
      marginBottom: '1rem',
    },
    sectionSubtitle: {
      fontSize: professionalTheme.fontSizes.lg,
      color: professionalTheme.colors.neutral[600],
      textAlign: 'center',
      maxWidth: '600px',
      margin: '0 auto 3rem',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '2rem',
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
        gap: '1.5rem',
      },
    },
    featureCard: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      padding: '2rem',
      border: '1px solid #E4E4E7',
    },
    featureHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1rem',
      marginBottom: '1rem',
    },
    featureIcon: {
      width: '56px',
      height: '56px',
      borderRadius: professionalTheme.radius.xl,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      flexShrink: 0,
    },
    featureTitle: {
      fontSize: professionalTheme.fontSizes.xl,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[900],
    },
    featureDescription: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      lineHeight: 1.6,
      marginBottom: '1.5rem',
    },
    benefitsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    benefitItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[700],
    },
    pricingGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '2rem',
      maxWidth: '1100px',
      margin: '0 auto',
      '@media (max-width: 1024px)': {
        gridTemplateColumns: '1fr',
        gap: '1.5rem',
      },
    },
    pricingCard: (isPopular) => ({
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      padding: '2rem',
      border: isPopular ? '2px solid #5B73F7' : '1px solid #E4E4E7',
      position: 'relative',
      textAlign: 'center',
    }),
    popularBadge: {
      position: 'absolute',
      top: '-12px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: professionalTheme.gradients.primary,
      color: '#FFFFFF',
      padding: '0.25rem 1rem',
      borderRadius: professionalTheme.radius.full,
      fontSize: professionalTheme.fontSizes.xs,
      fontWeight: 600,
    },
    pricingName: {
      fontSize: professionalTheme.fontSizes.xl,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.5rem',
    },
    pricingDescription: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      marginBottom: '1.5rem',
    },
    pricingPrice: {
      fontSize: professionalTheme.fontSizes['4xl'],
      fontWeight: 700,
      color: professionalTheme.colors.primary[600],
      marginBottom: '0.25rem',
    },
    pricingPeriod: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      marginBottom: '2rem',
    },
    pricingFeatures: {
      listStyle: 'none',
      padding: 0,
      margin: '0 0 2rem',
      textAlign: 'left',
    },
    pricingFeature: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.5rem 0',
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[700],
    },
    ctaSection: {
      background: professionalTheme.gradients.primary,
      borderRadius: professionalTheme.radius['3xl'],
      padding: '4rem 2rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
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
      padding: '3rem 1.5rem 2rem',
    },
    footerContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
    },
    footerGrid: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr 1fr',
      gap: '3rem',
      marginBottom: '2rem',
    },
    footerLink: {
      display: 'block',
      color: professionalTheme.colors.neutral[400],
      textDecoration: 'none',
      fontSize: professionalTheme.fontSizes.sm,
      marginBottom: '0.75rem',
    },
    footerBottom: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '2rem',
      borderTop: '1px solid #27272A',
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
                style={{
                  ...styles.navLink,
                  color: link === 'Fonctionnalités' ? professionalTheme.colors.primary[600] : professionalTheme.colors.neutral[600],
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
                Démarrer
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
              Démarrer
            </button>
          </div>
        </div>
      )}

      {/* ===== HERO ===== */}
      <section style={styles.hero}>
        <div style={styles.heroContainer}>
          <h1 style={styles.heroTitle}>
            Fonctionnalités Puissantes
          </h1>
          <p style={styles.heroSubtitle}>
            Découvrez comment SmartRecruit transforme votre processus de recrutement avec des outils intelligents et intuitifs.
          </p>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section style={styles.section}>
        <div style={styles.sectionContainer}>
          <h2 style={styles.sectionTitle}>
            Tout ce dont vous avez besoin
          </h2>
          <p style={styles.sectionSubtitle}>
            Une suite complète d'outils pour chaque étape du recrutement
          </p>

          <div style={styles.featuresGrid}>
            {features.map((feature) => (
              <div key={feature.id} style={styles.featureCard}>
                <div style={styles.featureHeader}>
                  <div style={{
                    ...styles.featureIcon,
                    background: feature.bgLight,
                    color: feature.color
                  }}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 style={styles.featureTitle}>{feature.title}</h3>
                  </div>
                </div>
                <p style={styles.featureDescription}>{feature.description}</p>
                <div style={styles.benefitsList}>
                  {feature.benefits.map((benefit, i) => (
                    <div key={i} style={styles.benefitItem}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={feature.color} strokeWidth="3">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section style={{ ...styles.section, background: professionalTheme.colors.neutral[50] }}>
        <div style={styles.sectionContainer}>
          <h2 style={styles.sectionTitle}>
            Tarification Simple
          </h2>
          <p style={styles.sectionSubtitle}>
            Choisissez le plan qui correspond à vos besoins
          </p>

          <div style={styles.pricingGrid}>
            {pricing.map((plan) => (
              <div key={plan.name} style={styles.pricingCard(plan.popular)}>
                {plan.popular && <div style={styles.popularBadge}>Plus populaire</div>}
                <h3 style={styles.pricingName}>{plan.name}</h3>
                <p style={styles.pricingDescription}>{plan.description}</p>
                <div style={styles.pricingPrice}>{plan.price}</div>
                <div style={styles.pricingPeriod}>{plan.period}</div>
                <ul style={styles.pricingFeatures}>
                  {plan.features.map((feature, i) => (
                    <li key={i} style={styles.pricingFeature}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={plan.popular ? professionalTheme.colors.primary[500] : professionalTheme.colors.success.dark} strokeWidth="2">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  style={{
                    ...styles.button,
                    width: '100%',
                    background: plan.popular ? professionalTheme.gradients.primary : professionalTheme.colors.neutral[100],
                    color: plan.popular ? '#FFFFFF' : professionalTheme.colors.neutral[900],
                  }}
                >
                  {plan.cta}
                </button>
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
              Prêt à Essayer ?
            </h2>
            <p style={styles.ctaSubtitle}>
              Commencez gratuitement et découvrez la puissance de SmartRecruit
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                style={{ ...styles.button, background: '#FFFFFF', color: professionalTheme.colors.primary[600], padding: '0.875rem 2rem' }}
                onClick={() => navigate('/register')}
              >
                Démarrer Gratuitement
              </button>
              <button
                style={{ ...styles.button, background: 'transparent', color: '#FFFFFF', border: '2px solid rgba(255, 255, 255, 0.3)', padding: '0.875rem 2rem' }}
              >
                Demander une Démo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <div style={styles.footerGrid}>
            <div>
              <div style={styles.logo}>
                <div style={{ ...styles.logoIcon, width: '36px', height: '36px' }}>SR</div>
                <div style={{ fontSize: professionalTheme.fontSizes.lg, fontWeight: 700 }}>SmartRecruit</div>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: professionalTheme.fontSizes.sm, fontWeight: 600, marginBottom: '1rem', color: '#FFFFFF' }}>
                Produit
              </h4>
              {['Fonctionnalités', 'Tarification', 'Entreprises'].map((link) => (
                <a key={link} href="#" style={styles.footerLink}>{link}</a>
              ))}
            </div>

            <div>
              <h4 style={{ fontSize: professionalTheme.fontSizes.sm, fontWeight: 600, marginBottom: '1rem', color: '#FFFFFF' }}>
                Entreprise
              </h4>
              {['À Propos', 'Blog', 'Contact'].map((link) => (
                <a key={link} href="#" style={styles.footerLink}>{link}</a>
              ))}
            </div>

            <div>
              <h4 style={{ fontSize: professionalTheme.fontSizes.sm, fontWeight: 600, marginBottom: '1rem', color: '#FFFFFF' }}>
                Légal
              </h4>
              {['Confidentialité', 'CGU', 'Cookies'].map((link) => (
                <a key={link} href="#" style={styles.footerLink}>{link}</a>
              ))}
            </div>
          </div>

          <div style={styles.footerBottom}>
            <div style={{ fontSize: professionalTheme.fontSizes.sm, color: professionalTheme.colors.neutral[500] }}>
              © 2024 SmartRecruit. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

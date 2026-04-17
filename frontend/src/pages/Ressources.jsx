import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { professionalTheme, professionalKeyframes } from '../theme/professionalTheme';

const articles = [
  {
    id: 1,
    title: '10 Astuces pour un CV Parfait',
    category: 'Conseils Carrière',
    excerpt: 'Découvrez les techniques pour créer un CV qui se démarque et attire les recruteurs.',
    image: '📄',
    date: '15 Avr 2024',
    readTime: '5 min',
    featured: true,
  },
  {
    id: 2,
    title: 'Comment Réussir un Entretien Vidéo',
    category: 'Entretien',
    excerpt: 'Préparez-vous efficacement aux entretiens en ligne avec ces conseils pratiques.',
    image: '📹',
    date: '12 Avr 2024',
    readTime: '7 min',
    featured: true,
  },
  {
    id: 3,
    title: 'Les Compétences les Plus Recherchées en 2024',
    category: 'Tendances',
    excerpt: 'Analyse des compétences clés que les entreprises recherchent cette année.',
    image: '🎯',
    date: '10 Avr 2024',
    readTime: '6 min',
    featured: false,
  },
  {
    id: 4,
    title: 'Lettre de Motivation : Exemples et Modèles',
    category: 'Conseils Carrière',
    excerpt: 'Templates et exemples de lettres de motivation efficaces.',
    image: '✉️',
    date: '8 Avr 2024',
    readTime: '8 min',
    featured: false,
  },
  {
    id: 5,
    title: 'Questions Fréquentes en Entretien',
    category: 'Entretien',
    excerpt: 'Préparez-vous aux questions les plus posées par les recruteurs.',
    image: '❓',
    date: '5 Avr 2024',
    readTime: '10 min',
    featured: false,
  },
  {
    id: 6,
    title: 'Networking : Stratégies pour Candidats',
    category: 'Carrière',
    excerpt: 'Comment développer votre réseau professionnel pour booster votre recherche.',
    image: '🤝',
    date: '3 Avr 2024',
    readTime: '6 min',
    featured: false,
  },
];

const categories = ['Tous', 'Conseils Carrière', 'Entretien', 'Tendances', 'Carrière'];

const guides = [
  { title: 'Guide du Recrutement', description: 'Tout savoir sur le recrutement moderne', icon: '📚' },
  { title: 'Boîte à Outils CV', description: 'Ressources pour créer un CV parfait', icon: '🛠️' },
  { title: 'Préparation Entretien', description: 'Checklist et conseils pour réussir', icon: '✅' },
  { title: 'Salaires & Négociation', description: 'Comprendre et négocier votre salaire', icon: '💰' },
];

export default function Ressources() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredArticles = articles.filter(article => {
    const matchCategory = selectedCategory === 'Tous' || article.category === selectedCategory;
    const matchSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                     article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const featuredArticles = articles.filter(a => a.featured);
  const regularArticles = filteredArticles.filter(a => !a.featured);

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
      padding: '4rem 1.5rem',
      background: professionalTheme.gradients.subtle,
    },
    heroContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      textAlign: 'center',
    },
    heroTitle: {
      fontSize: professionalTheme.fontSizes['4xl'],
      fontWeight: 800,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '1rem',
    },
    heroSubtitle: {
      fontSize: professionalTheme.fontSizes.base,
      color: professionalTheme.colors.neutral[600],
      marginBottom: '2rem',
    },
    searchBox: {
      maxWidth: '500px',
      margin: '0 auto',
    },
    searchInput: {
      width: '100%',
      padding: '0.875rem 1.5rem',
      borderRadius: professionalTheme.radius.full,
      border: '2px solid #E4E4E7',
      fontSize: professionalTheme.fontSizes.base,
      outline: 'none',
      boxShadow: professionalTheme.shadows.md,
    },
    section: {
      padding: '4rem 1.5rem',
    },
    sectionContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
    },
    sectionHeader: {
      marginBottom: '2rem',
    },
    sectionTitle: {
      fontSize: professionalTheme.fontSizes['2xl'],
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.5rem',
    },
    sectionSubtitle: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
    },
    guidesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '1.5rem',
      '@media (max-width: 1024px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1.25rem',
      },
      '@media (max-width: 640px)': {
        gridTemplateColumns: '1fr',
        gap: '1rem',
      },
    },
    guideCard: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius.xl,
      padding: '1.5rem',
      border: '1px solid #E4E4E7',
      textAlign: 'center',
      transition: professionalTheme.transitions.default,
      '@media (max-width: 640px)': {
        padding: '1.25rem',
      },
    },
    guideIcon: {
      fontSize: '2rem',
      marginBottom: '1rem',
    },
    guideTitle: {
      fontSize: professionalTheme.fontSizes.base,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.5rem',
    },
    guideDescription: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      lineHeight: 1.5,
    },
    filtersSection: {
      marginBottom: '2rem',
    },
    filterTabs: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap',
    },
    filterTab: (isActive) => ({
      padding: '0.5rem 1rem',
      borderRadius: professionalTheme.radius.full,
      border: isActive ? '1px solid #5B73F7' : '1px solid #E4E4E7',
      background: isActive ? professionalTheme.colors.primary[50] : '#FFFFFF',
      color: isActive ? professionalTheme.colors.primary[700] : professionalTheme.colors.neutral[600],
      fontSize: professionalTheme.fontSizes.sm,
      cursor: 'pointer',
      transition: professionalTheme.transitions.fast,
    }),
    featuredSection: {
      marginBottom: '3rem',
    },
    featuredGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '2rem',
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
        gap: '1.5rem',
      },
    },
    articleCard: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      overflow: 'hidden',
      border: '1px solid #E4E4E7',
      transition: professionalTheme.transitions.default,
    },
    articleCardLarge: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0',
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
      },
    },
    articleImage: {
      background: professionalTheme.gradients.subtle,
      padding: '3rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '4rem',
    },
    articleImageLarge: {
      height: '100%',
      minHeight: '250px',
    },
    articleContent: {
      padding: '2rem',
    },
    articleCategory: {
      display: 'inline-block',
      padding: '0.25rem 0.75rem',
      borderRadius: professionalTheme.radius.full,
      background: professionalTheme.colors.primary[50],
      color: professionalTheme.colors.primary[700],
      fontSize: professionalTheme.fontSizes.xs,
      fontWeight: 500,
      marginBottom: '0.75rem',
    },
    articleTitle: {
      fontSize: professionalTheme.fontSizes.xl,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.75rem',
      lineHeight: 1.4,
    },
    articleExcerpt: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      lineHeight: 1.6,
      marginBottom: '1rem',
    },
    articleMeta: {
      display: 'flex',
      gap: '1rem',
      fontSize: professionalTheme.fontSizes.xs,
      color: professionalTheme.colors.neutral[500],
    },
    articlesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1.5rem',
      '@media (max-width: 1024px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1.25rem',
      },
      '@media (max-width: 640px)': {
        gridTemplateColumns: '1fr',
        gap: '1rem',
      },
    },
    newsletterSection: {
      background: professionalTheme.gradients.primary,
      borderRadius: professionalTheme.radius['3xl'],
      padding: '3rem 2rem',
      textAlign: 'center',
      '@media (max-width: 640px)': {
        padding: '2rem 1.5rem',
      },
    },
    newsletterTitle: {
      fontSize: professionalTheme.fontSizes['2xl'],
      fontWeight: 700,
      color: '#FFFFFF',
      marginBottom: '1rem',
    },
    newsletterSubtitle: {
      fontSize: professionalTheme.fontSizes.base,
      color: 'rgba(255, 255, 255, 0.9)',
      marginBottom: '2rem',
    },
    newsletterForm: {
      display: 'flex',
      gap: '1rem',
      maxWidth: '400px',
      margin: '0 auto',
    },
    newsletterInput: {
      flex: 1,
      padding: '0.875rem 1.5rem',
      borderRadius: professionalTheme.radius.full,
      border: 'none',
      fontSize: professionalTheme.fontSizes.sm,
    },
    newsletterButton: {
      padding: '0.875rem 1.5rem',
      borderRadius: professionalTheme.radius.full,
      background: professionalTheme.colors.neutral[900],
      color: '#FFFFFF',
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      border: 'none',
      cursor: 'pointer',
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
                  color: link === 'Ressources' ? professionalTheme.colors.primary[600] : professionalTheme.colors.neutral[600],
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
                S'inscrire
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
              S'inscrire
            </button>
          </div>
        </div>
      )}

      {/* ===== HERO ===== */}
      <section style={styles.hero}>
        <div style={styles.heroContainer}>
          <h1 style={styles.heroTitle}>
            Ressources & Conseils Carrière
          </h1>
          <p style={styles.heroSubtitle}>
            Guides, articles et outils pour booster votre recherche d'emploi
          </p>

          <div style={styles.searchBox}>
            <input
              type="text"
              placeholder="🔍 Rechercher un article, un guide..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = professionalTheme.colors.primary[500];
                e.currentTarget.style.boxShadow = '0 0 0 4px rgba(91, 115, 247, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = professionalTheme.colors.neutral[200];
                e.currentTarget.style.boxShadow = professionalTheme.shadows.md;
              }}
            />
          </div>
        </div>
      </section>

      {/* ===== GUIDES ===== */}
      <section style={styles.section}>
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Guides Pratiques</h2>
            <p style={styles.sectionSubtitle}>Ressources essentielles pour chaque étape</p>
          </div>

          <div style={styles.guidesGrid}>
            {guides.map((guide, i) => (
              <div
                key={i}
                style={styles.guideCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = professionalTheme.shadows.lg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={styles.guideIcon}>{guide.icon}</div>
                <h3 style={styles.guideTitle}>{guide.title}</h3>
                <p style={styles.guideDescription}>{guide.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ARTICLES ===== */}
      <section style={{ ...styles.section, background: professionalTheme.colors.neutral[50] }}>
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Articles Récents</h2>
            <p style={styles.sectionSubtitle}>Conseils d'experts et tendances du marché</p>
          </div>

          <div style={styles.filtersSection}>
            <div style={styles.filterTabs}>
              {categories.map(category => (
                <button
                  key={category}
                  style={styles.filterTab(selectedCategory === category)}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Articles */}
          {featuredArticles.length > 0 && (
            <div style={styles.featuredSection}>
              <div style={styles.featuredGrid}>
                {featuredArticles.map((article) => (
                  <div
                    key={article.id}
                    style={{ ...styles.articleCard, ...styles.articleCardLarge }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = professionalTheme.shadows.xl;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ ...styles.articleImage, ...styles.articleImageLarge }}>
                      {article.image}
                    </div>
                    <div style={styles.articleContent}>
                      <span style={styles.articleCategory}>{article.category}</span>
                      <h3 style={styles.articleTitle}>{article.title}</h3>
                      <p style={styles.articleExcerpt}>{article.excerpt}</p>
                      <div style={styles.articleMeta}>
                        <span>📅 {article.date}</span>
                        <span>⏱️ {article.readTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Regular Articles */}
          <div style={styles.articlesGrid}>
            {regularArticles.map((article) => (
              <div
                key={article.id}
                style={styles.articleCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = professionalTheme.shadows.lg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={styles.articleImage}>{article.image}</div>
                <div style={styles.articleContent}>
                  <span style={styles.articleCategory}>{article.category}</span>
                  <h3 style={styles.articleTitle}>{article.title}</h3>
                  <p style={styles.articleExcerpt}>{article.excerpt}</p>
                  <div style={styles.articleMeta}>
                    <span>📅 {article.date}</span>
                    <span>⏱️ {article.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section style={styles.section}>
        <div style={styles.sectionContainer}>
          <div style={styles.newsletterSection}>
            <h2 style={styles.newsletterTitle}>Restez Informé</h2>
            <p style={styles.newsletterSubtitle}>
              Recevez nos derniers conseils et offres d'emploi directement dans votre boîte mail
            </p>
            <form style={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Votre adresse email"
                style={styles.newsletterInput}
              />
              <button type="submit" style={styles.newsletterButton}>
                S'inscrire
              </button>
            </form>
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

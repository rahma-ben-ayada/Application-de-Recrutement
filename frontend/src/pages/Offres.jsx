import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { professionalTheme, professionalKeyframes } from '../theme/professionalTheme';

const offresRecentes = [
  { id: 1, titre: 'Développeur React Senior', entreprise: 'Tech Corp', lieu: 'Tunis', type: 'CDI', salaire: '2500 - 3500 TND', logo: '💻', posted: '2 jours', secteur: 'Informatique' },
  { id: 2, titre: 'Data Scientist', entreprise: 'StartUp RH', lieu: 'Remote', type: 'CDD', salaire: '3000 - 4000 TND', logo: '📊', posted: '1 jour', secteur: 'Data' },
  { id: 3, titre: 'UX/UI Designer', entreprise: 'Big Finance', lieu: 'Sfax', type: 'Stage', salaire: '800 - 1200 TND', logo: '🎨', posted: '3 jours', secteur: 'Design' },
  { id: 4, titre: 'Chef de projet IT', entreprise: 'Dev Studio', lieu: 'Tunis', type: 'CDI', salaire: '3500 - 4500 TND', logo: '⚡', posted: '5 jours', secteur: 'Management' },
  { id: 5, titre: 'Développeur Java', entreprise: 'Big Finance', lieu: 'Sousse', type: 'CDI', salaire: '2800 - 3800 TND', logo: '☕', posted: '1 semaine', secteur: 'Informatique' },
  { id: 6, titre: 'DevOps Engineer', entreprise: 'Cloud Corp', lieu: 'Remote', type: 'CDI', salaire: '4000 - 5000 TND', logo: '☁️', posted: '4 jours', secteur: 'Cloud' },
  { id: 7, titre: 'Marketing Manager', entreprise: 'Digital Agency', lieu: 'Tunis', type: 'CDI', salaire: '2000 - 2800 TND', logo: '📱', posted: '6 heures', secteur: 'Marketing' },
  { id: 8, titre: 'Comptable', entreprise: 'Audit Firm', lieu: 'Nabeul', type: 'CDI', salaire: '1500 - 2000 TND', logo: '📈', posted: '2 jours', secteur: 'Finance' },
  { id: 9, titre: 'Commercial B2B', entreprise: 'Sales Pro', lieu: 'Tunis', type: 'CDI', salaire: '1200 - 2000 TND', logo: '🤝', posted: '12 heures', secteur: 'Ventes' },
];

const categories = [
  { name: 'Tous', count: offresRecentes.length },
  { name: 'Informatique', count: 3 },
  { name: 'Marketing', count: 1 },
  { name: 'Finance', count: 2 },
  { name: 'Design', count: 1 },
  { name: 'Ventes', count: 1 },
  { name: 'Management', count: 1 },
];

const types = ['CDI', 'CDD', 'Stage', 'Freelance'];

export default function Offres() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedType, setSelectedType] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const locations = [...new Set(offresRecentes.map(o => o.lieu))];

  const filteredOffres = offresRecentes.filter(offre => {
    const matchSearch = offre.titre.toLowerCase().includes(search.toLowerCase()) ||
                        offre.entreprise.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === 'Tous' || offre.secteur === selectedCategory;
    const matchType = !selectedType || offre.type === selectedType;
    const matchLocation = !selectedLocation || offre.lieu === selectedLocation;
    return matchSearch && matchCategory && matchType && matchLocation;
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
      padding: '4rem 1.5rem 2rem',
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
      maxWidth: '600px',
      margin: '0 auto',
      position: 'relative',
    },
    searchInput: {
      width: '100%',
      padding: '1rem 1.5rem',
      borderRadius: professionalTheme.radius.full,
      border: '2px solid #E4E4E7',
      fontSize: professionalTheme.fontSizes.base,
      outline: 'none',
      transition: professionalTheme.transitions.default,
      boxShadow: professionalTheme.shadows.md,
    },
    filtersSection: {
      padding: '2rem 1.5rem',
      borderBottom: '1px solid #E4E4E7',
      '@media (max-width: 640px)': {
        padding: '1.5rem 1rem',
      },
    },
    filtersContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    mobileFiltersToggle: {
      display: 'none',
      width: '100%',
      padding: '0.75rem 1rem',
      background: professionalTheme.colors.primary[50],
      border: `1px solid ${professionalTheme.colors.primary[200]}`,
      borderRadius: professionalTheme.radius.lg,
      color: professionalTheme.colors.primary[700],
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 500,
      cursor: 'pointer',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '0.5rem',
      '@media (max-width: 768px)': {
        display: 'flex',
      },
    },
    filtersContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      width: '100%',
      '@media (max-width: 768px)': {
        display: mobileFiltersOpen ? 'flex' : 'none',
      },
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
    },
    filterButton: (isActive) => ({
      padding: '0.5rem 1rem',
      borderRadius: professionalTheme.radius.full,
      border: isActive ? '1px solid #5B73F7' : '1px solid #E4E4E7',
      background: isActive ? professionalTheme.colors.primary[50] : '#FFFFFF',
      color: isActive ? professionalTheme.colors.primary[700] : professionalTheme.colors.neutral[600],
      fontSize: professionalTheme.fontSizes.sm,
      cursor: 'pointer',
      transition: professionalTheme.transitions.fast,
    }),
    section: {
      padding: '3rem 1.5rem',
    },
    sectionContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
    },
    resultsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
    },
    resultsCount: {
      fontSize: professionalTheme.fontSizes.lg,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[900],
    },
    sortSelect: {
      padding: '0.5rem 1rem',
      borderRadius: professionalTheme.radius.lg,
      border: '1px solid #E4E4E7',
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[700],
      outline: 'none',
    },
    offresGrid: {
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
    offreCard: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      padding: '1.5rem',
      border: '1px solid #E4E4E7',
      transition: professionalTheme.transitions.default,
      cursor: 'pointer',
      '@media (max-width: 640px)': {
        padding: '1.25rem',
      },
    },
    offreHeader: {
      display: 'flex',
      alignItems: 'flex-start',
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
      flexShrink: 0,
    },
    offreInfo: {
      flex: 1,
    },
    offreEntreprise: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      marginBottom: '0.25rem',
    },
    offrePosted: {
      fontSize: professionalTheme.fontSizes.xs,
      color: professionalTheme.colors.neutral[400],
    },
    offreTitle: {
      fontSize: professionalTheme.fontSizes.base,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.75rem',
    },
    offreDetails: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap',
      marginBottom: '1rem',
    },
    offreTag: {
      padding: '0.25rem 0.75rem',
      borderRadius: professionalTheme.radius.md,
      fontSize: professionalTheme.fontSizes.xs,
      fontWeight: 500,
    },
    offreMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '1rem',
      borderTop: '1px solid #F4F4F5',
    },
    offreLocation: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
    },
    applyButton: {
      padding: '0.5rem 1rem',
      borderRadius: professionalTheme.radius.lg,
      background: professionalTheme.gradients.primary,
      color: '#FFFFFF',
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 500,
      border: 'none',
      cursor: 'pointer',
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      gap: '0.5rem',
      marginTop: '3rem',
    },
    pageButton: (isActive) => ({
      width: '40px',
      height: '40px',
      borderRadius: professionalTheme.radius.lg,
      border: isActive ? '1px solid #5B73F7' : '1px solid #E4E4E7',
      background: isActive ? professionalTheme.colors.primary[50] : '#FFFFFF',
      color: isActive ? professionalTheme.colors.primary[700] : professionalTheme.colors.neutral[600],
      fontSize: professionalTheme.fontSizes.sm,
      cursor: 'pointer',
      transition: professionalTheme.transitions.fast,
    }),
    ctaSection: {
      background: professionalTheme.gradients.primary,
      borderRadius: professionalTheme.radius['3xl'],
      padding: '3rem 2rem',
      textAlign: 'center',
      marginTop: '3rem',
    },
    ctaTitle: {
      fontSize: professionalTheme.fontSizes['2xl'],
      fontWeight: 700,
      color: '#FFFFFF',
      marginBottom: '1rem',
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
                  color: link === 'Offres' ? professionalTheme.colors.primary[600] : professionalTheme.colors.neutral[600],
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
                Déposer un CV
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
              Déposer un CV
            </button>
          </div>
        </div>
      )}

      {/* ===== HERO ===== */}
      <section style={styles.hero}>
        <div style={styles.heroContainer}>
          <h1 style={styles.heroTitle}>
            Trouvez l'Emploi de Vos Rêves
          </h1>
          <p style={styles.heroSubtitle}>
            {offresRecentes.length} offres disponibles dans tous les secteurs
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
                e.currentTarget.style.boxShadow = professionalTheme.shadows.md;
              }}
            />
          </div>
        </div>
      </section>

      {/* ===== FILTERS ===== */}
      <section style={styles.filtersSection}>
        <div style={styles.filtersContainer}>
          <button
            style={styles.mobileFiltersToggle}
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          >
            <span>🔍 Filtres</span>
            <span>{mobileFiltersOpen ? '▲' : '▼'}</span>
          </button>

          <div style={styles.filtersContent}>
            <div style={styles.filterGroup}>
              <span style={styles.filterLabel}>Catégorie:</span>
              {categories.map(cat => (
                <button
                  key={cat.name}
                  style={styles.filterButton(selectedCategory === cat.name)}
                  onClick={() => setSelectedCategory(cat.name)}
                >
                  {cat.name} ({cat.count})
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
              {types.map(type => (
                <button
                  key={type}
                  style={styles.filterButton(selectedType === type)}
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </button>
              ))}
            </div>

            <div style={styles.filterGroup}>
              <span style={styles.filterLabel}>Lieu:</span>
              <button
                style={styles.filterButton(selectedLocation === null)}
                onClick={() => setSelectedLocation(null)}
              >
                Tous
              </button>
              {locations.map(loc => (
                <button
                  key={loc}
                  style={styles.filterButton(selectedLocation === loc)}
                  onClick={() => setSelectedLocation(loc)}
                >
                  {loc}
                </button>
              ))}
            </div>
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
            <select style={styles.sortSelect}>
              <option>Plus récent</option>
              <option>Plus pertinent</option>
              <option>Salaire décroissant</option>
            </select>
          </div>

          <div style={styles.offresGrid}>
            {filteredOffres.map((offre) => (
              <div
                key={offre.id}
                style={styles.offreCard}
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
                onClick={() => navigate('/login')}
              >
                <div style={styles.offreHeader}>
                  <div style={styles.offreLogo}>{offre.logo}</div>
                  <div style={styles.offreInfo}>
                    <div style={styles.offreEntreprise}>{offre.entreprise}</div>
                    <div style={styles.offrePosted}>Posté il y a {offre.posted}</div>
                  </div>
                </div>

                <h3 style={styles.offreTitle}>{offre.titre}</h3>

                <div style={styles.offreDetails}>
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
                  <button style={styles.applyButton}>Postuler</button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div style={styles.pagination}>
            {[1, 2, 3].map((page) => (
              <button key={page} style={styles.pageButton(page === 1)}>
                {page}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={styles.section}>
        <div style={styles.sectionContainer}>
          <div style={styles.ctaSection}>
            <h2 style={styles.ctaTitle}>
              Vous ne trouvez pas votre bonheur ?
            </h2>
            <p style={{ fontSize: professionalTheme.fontSizes.base, color: 'rgba(255, 255, 255, 0.9)', marginBottom: '2rem' }}>
              Créez une alerte emploi et soyez notifié des nouvelles opportunités
            </p>
            <button
              style={{ ...styles.button, background: '#FFFFFF', color: professionalTheme.colors.primary[600], padding: '0.875rem 2rem' }}
            >
              Créer une alerte
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

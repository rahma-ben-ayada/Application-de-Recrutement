import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { luxuryTheme, keyframes } from '../theme/luxuryTheme';

const offresRecentes = [
  { id: 1, titre: 'Développeur React Senior', entreprise: 'Tech Corp',   lieu: 'Tunis',  type: 'CDI',   salaire: '2500 - 3500 TND', logo: '💻' },
  { id: 2, titre: 'Data Scientist',           entreprise: 'StartUp RH', lieu: 'Remote', type: 'CDD',   salaire: '3000 - 4000 TND', logo: '📊' },
  { id: 3, titre: 'UX/UI Designer',           entreprise: 'Big Finance', lieu: 'Sfax',   type: 'Stage', salaire: '800 - 1200 TND',  logo: '🎨' },
  { id: 4, titre: 'Chef de projet IT',        entreprise: 'Dev Studio',  lieu: 'Tunis',  type: 'CDI',   salaire: '3500 - 4500 TND', logo: '⚡' },
  { id: 5, titre: 'Développeur Java',         entreprise: 'Big Finance', lieu: 'Sousse', type: 'CDI',   salaire: '2800 - 3800 TND', logo: '☕' },
  { id: 6, titre: 'DevOps Engineer',          entreprise: 'Cloud Corp',  lieu: 'Remote', type: 'CDI',   salaire: '4000 - 5000 TND', logo: '☁️' },
];

const stats = [
  { value: '12K+', label: 'Candidats Actifs',   icon: '👤', color: '#D4AF37' },
  { value: '340+', label: 'Entreprises',        icon: '🏢', color: '#0066FF' },
  { value: '1.2K',label: 'Offres Publiées',    icon: '📋', color: '#00CC7A' },
  { value: '98%',  label: 'Satisfaction',       icon: '⭐', color: '#C27DFF' },
];

const features = [
  { icon: '🤖', title: 'IA Scoring Intelligent',   desc: 'Algorithmes avancés pour évaluer et classer les candidats automatiquement.', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { icon: '🎯', title: 'Matching Précis',         desc: 'Trouvez la perle rare grâce à notre moteur de matching intelligent.', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { icon: '📊', title: 'Analytics Temps Réel',    desc: 'Tableaux de bord interactifs pour suivre vos KPIs RH en direct.', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { icon: '📅', title: 'Entretiens Vidéo',        desc: 'Planifiez et organisez vos entretiens avec intégration vidéo.', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { icon: '🔒', title: 'Sécurité Maximale',       desc: 'Vos données sont protégées par chiffrement bout-en-bout.', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { icon: '🌍', title: 'International',           desc: 'Plateforme multilingue avec support 24/7 dans le monde entier.', gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
];

const temoignages = [
  { nom: 'Sarah Ben Ali',  poste: 'DRH, Tech Corp',   avatar: 'S', texte: 'SmartRecruit a transformé notre processus. Le score IA nous fait gagner 50% de temps.', color: '#D4AF37' },
  { nom: 'Karim Mansouri', poste: 'CEO, StartUp RH',  avatar: 'K', texte: 'Interface exceptionnelle et fonctionnalités puissantes. Recrutement facilité !', color: '#0066FF' },
  { nom: 'Lina Cherif',    poste: 'Candidat Recruté', avatar: 'L', texte: 'J\'ai décroché mon emploi idéal en 2 semaines. Plateforme intuitive.', color: '#00CC7A' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [animatedStats, setAnimatedStats] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedStats(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredOffres = offresRecentes.filter(o =>
    o.titre.toLowerCase().includes(search.toLowerCase()) ||
    o.entreprise.toLowerCase().includes(search.toLowerCase()) ||
    o.lieu.toLowerCase().includes(search.toLowerCase())
  );

  const styles = {
    page: {
      fontFamily: '"Inter", "DM Sans", sans-serif',
      background: '#FAFBFC',
      overflowX: 'hidden',
    },
    navbar: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: scrolled ? 'rgba(10, 22, 40, 0.95)' : 'transparent',
      backdropFilter: 'blur(20px)',
      padding: '0 80px',
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'all 0.4s ease',
      boxShadow: scrolled ? '0 8px 32px rgba(0, 0, 0, 0.1)' : 'none',
    },
    logo: {
      fontFamily: '"Playfair Display", serif',
      fontSize: '28px',
      fontWeight: '700',
      color: '#fff',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    logoIcon: {
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8941F 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      boxShadow: '0 8px 24px rgba(212, 175, 55, 0.4)',
    },
    navLinks: {
      display: 'flex',
      gap: '40px',
      alignItems: 'center',
    },
    navLink: {
      color: '#fff',
      textDecoration: 'none',
      fontSize: '15px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative',
    },
    navLinkAfter: {
      content: '""',
      position: 'absolute',
      bottom: '-4px',
      left: 0,
      width: 0,
      height: '2px',
      background: '#D4AF37',
      transition: 'width 0.3s ease',
    },
    btn: {
      padding: '12px 28px',
      borderRadius: '50px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      fontFamily: '"Inter", sans-serif',
    },
    btnPrimary: {
      background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
      color: '#0A1628',
      boxShadow: '0 8px 24px rgba(212, 175, 55, 0.4)',
    },
    btnSecondary: {
      background: 'transparent',
      color: '#fff',
      border: '2px solid rgba(255, 255, 255, 0.3)',
    },
    hero: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0A1628 0%, #1E3A5F 50%, #2E5082 100%)',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    },
    heroContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 80px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '80px',
      alignItems: 'center',
      zIndex: 2,
    },
    heroText: {
      color: '#fff',
    },
    heroBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      background: 'rgba(212, 175, 55, 0.15)',
      border: '1px solid rgba(212, 175, 55, 0.3)',
      borderRadius: '50px',
      padding: '8px 20px',
      marginBottom: '24px',
      fontSize: '13px',
      fontWeight: '600',
      color: '#D4AF37',
    },
    heroTitle: {
      fontFamily: '"Playfair Display", serif',
      fontSize: '64px',
      fontWeight: '700',
      lineHeight: '1.1',
      marginBottom: '24px',
      background: 'linear-gradient(135deg, #fff 0%, #D4AF37 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    heroSubtitle: {
      fontSize: '18px',
      lineHeight: '1.7',
      color: 'rgba(255, 255, 255, 0.8)',
      marginBottom: '40px',
      maxWidth: '500px',
    },
    heroButtons: {
      display: 'flex',
      gap: '16px',
    },
    heroImage: {
      position: 'relative',
    },
    heroCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '24px',
      padding: '40px',
      boxShadow: '0 32px 64px rgba(0, 0, 0, 0.2)',
    },
    floatingElement: (delay) => ({
      position: 'absolute',
      animation: `float 6s ease-in-out ${delay}s infinite`,
    }),
    section: {
      padding: '120px 80px',
      maxWidth: '1400px',
      margin: '0 auto',
    },
    sectionTitle: {
      fontFamily: '"Playfair Display", serif',
      fontSize: '48px',
      fontWeight: '700',
      color: '#0A1628',
      textAlign: 'center',
      marginBottom: '16px',
    },
    sectionSubtitle: {
      fontSize: '18px',
      color: '#64748B',
      textAlign: 'center',
      marginBottom: '60px',
      maxWidth: '600px',
      margin: '0 auto 60px',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '32px',
      marginBottom: '80px',
    },
    statCard: {
      background: '#fff',
      borderRadius: '20px',
      padding: '40px 32px',
      textAlign: 'center',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      transition: 'all 0.4s ease',
    },
    statValue: {
      fontFamily: '"Playfair Display", serif',
      fontSize: '48px',
      fontWeight: '700',
      marginBottom: '8px',
      background: 'linear-gradient(135deg, #0A1628 0%, #2E5082 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    statLabel: {
      fontSize: '14px',
      color: '#64748B',
      fontWeight: '500',
    },
    featureCard: {
      background: '#fff',
      borderRadius: '24px',
      padding: '40px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      transition: 'all 0.4s ease',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
    },
    featureIcon: {
      width: '64px',
      height: '64px',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '28px',
      marginBottom: '24px',
    },
    offreCard: {
      background: '#fff',
      borderRadius: '20px',
      padding: '32px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      transition: 'all 0.4s ease',
      cursor: 'pointer',
    },
    testimonialCard: {
      background: '#fff',
      borderRadius: '24px',
      padding: '40px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
      border: '1px solid rgba(0, 0, 0, 0.05)',
    },
    ctaSection: {
      background: 'linear-gradient(135deg, #0A1628 0%, #1E3A5F 100%)',
      borderRadius: '32px',
      padding: '80px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    },
    footer: {
      background: '#0A1628',
      padding: '80px',
      color: '#fff',
    },
    footerGrid: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr 1fr',
      gap: '60px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    footerLink: {
      color: 'rgba(255, 255, 255, 0.7)',
      textDecoration: 'none',
      fontSize: '14px',
      display: 'block',
      marginBottom: '12px',
      transition: 'color 0.3s ease',
    },
  };

  return (
    <div style={styles.page}>
      <style>{keyframes}</style>

      {/* ===== NAVBAR ===== */}
      <nav style={styles.navbar}>
        <div style={styles.logo} onClick={() => navigate('/')}>
          <div style={styles.logoIcon}>💼</div>
          <div>
            <div>SmartRecruit</div>
            <style>{`
              div { font-family: 'Inter', sans-serif !important; }
            `}</style>
          </div>
        </div>

        <div style={styles.navLinks}>
          {['Fonctionnalités', 'Offres', 'Témoignages', 'Contact'].map((link) => (
            <a
              key={link}
              style={styles.navLink}
              onMouseEnter={(e) => {
                e.target.style.color = '#D4AF37';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#fff';
              }}
            >
              {link}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <button
            style={{ ...styles.btn, ...styles.btnSecondary }}
            onClick={() => navigate('/login')}
          >
            Connexion
          </button>
          <button
            style={{ ...styles.btn, ...styles.btnPrimary }}
            onClick={() => navigate('/register')}
          >
            S'inscrire →
          </button>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section style={styles.hero}>
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)',
          top: '-200px',
          right: '-100px',
          animation: 'float 8s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,102,255,0.1) 0%, transparent 70%)',
          bottom: '-100px',
          left: '-100px',
          animation: 'float 6s ease-in-out infinite reverse',
        }} />

        <div style={styles.heroContent}>
          <div style={styles.heroText}>
            <div style={styles.heroBadge}>
              <span>🚀</span>
              <span>#1 Plateforme de Recrutement en Tunisie</span>
            </div>

            <h1 style={styles.heroTitle}>
              Transformez Votre<br />
              <span style={{ color: '#D4AF37' }}>Processus de Recrutement</span>
            </h1>

            <p style={styles.heroSubtitle}>
              Connectez les meilleurs talents aux opportunités idéales grâce à notre technologie IA de pointe et une expérience utilisateur premium.
            </p>

            <div style={styles.heroButtons}>
              <button
                style={{
                  ...styles.btn,
                  ...styles.btnPrimary,
                  padding: '16px 40px',
                  fontSize: '16px',
                }}
                onClick={() => navigate('/register')}
              >
                Commencer Gratuitement →
              </button>
              <button
                style={{
                  ...styles.btn,
                  ...styles.btnSecondary,
                  padding: '16px 40px',
                  fontSize: '16px',
                }}
              >
                Voir Démo
              </button>
            </div>

            <div style={{ display: 'flex', gap: '40px', marginTop: '48px' }}>
              {stats.map((stat, i) => (
                <div key={i}>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: '#D4AF37' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.heroImage}>
            <div style={styles.heroCard}>
              <div style={{ marginBottom: '32px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
                  Dashboard Analytics
                </div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                  Suivez vos candidatures en temps réel
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                {[
                  { label: 'Candidats', value: '2,847', color: '#D4AF37' },
                  { label: 'Entretiens', value: '156', color: '#00CC7A' },
                  { label: 'Recrutés', value: '43', color: '#0066FF' },
                ].map((item, i) => (
                  <div key={i} style={{ flex: 1 }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: item.value === '43' ? '#fff' : item.color }}>
                      {item.value}
                    </div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
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
        <div style={styles.statsGrid}>
          {stats.map((stat, i) => (
            <div
              key={i}
              style={styles.statCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = `0 16px 48px ${stat.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
              }}
            >
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>{stat.icon}</div>
              <div style={{ ...styles.statValue, color: stat.color }}>
                {animatedStats ? stat.value : '0'}
              </div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section style={{ ...styles.section, background: '#F8FAFC' }}>
        <h2 style={styles.sectionTitle}>
          Fonctionnalités <span style={{ color: '#D4AF37' }}>Premium</span>
        </h2>
        <p style={styles.sectionSubtitle}>
          Découvrez notre suite complète d'outils pour transformer votre recrutement
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
          {features.map((feature, i) => (
            <div
              key={i}
              style={styles.featureCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 24px 64px rgba(0, 0, 0, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.06)';
              }}
            >
              <div style={{ ...styles.featureIcon, background: feature.gradient }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '22px',
                fontWeight: '700',
                color: '#0A1628',
                marginBottom: '12px',
              }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: '15px', color: '#64748B', lineHeight: '1.7' }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== OFFRES SECTION ===== */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>
          Offres <span style={{ color: '#D4AF37' }}>Récentes</span>
        </h2>
        <p style={styles.sectionSubtitle}>
          Découvrez les dernières opportunités de carrière
        </p>

        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
          <input
            type="text"
            placeholder="🔍 Rechercher une offre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '500px',
              padding: '16px 24px',
              borderRadius: '50px',
              border: '2px solid #E2E8F0',
              fontSize: '15px',
              outline: 'none',
              transition: 'all 0.3s ease',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#D4AF37';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(212, 175, 55, 0.15)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#E2E8F0';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {filteredOffres.slice(0, 6).map((offre) => (
            <div
              key={offre.id}
              style={styles.offreCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.12)';
                e.currentTarget.style.borderColor = '#D4AF37';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.05)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                }}>
                  {offre.logo}
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#0A1628', marginBottom: '4px' }}>
                    {offre.entreprise}
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748B' }}>
                    📍 {offre.lieu}
                  </div>
                </div>
              </div>

              <h3 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '18px',
                fontWeight: '700',
                color: '#0A1628',
                marginBottom: '12px',
              }}>
                {offre.titre}
              </h3>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <span style={{
                  background: '#DBEAFE',
                  color: '#1E40AF',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                }}>
                  {offre.type}
                </span>
                <span style={{
                  background: '#D1FAE5',
                  color: '#059669',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                }}>
                  💰 {offre.salaire}
                </span>
              </div>

              <button
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
                  color: '#0A1628',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onClick={() => navigate('/login')}
              >
                Postuler →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TÉMOIGNAGES ===== */}
      <section style={{ ...styles.section, background: '#0A1628' }}>
        <h2 style={{ ...styles.sectionTitle, color: '#fff' }}>
          Ce que disent nos <span style={{ color: '#D4AF37' }}>Clients</span>
        </h2>
        <p style={{ ...styles.sectionSubtitle, color: 'rgba(255,255,255,0.7)' }}>
          Des milliers d'entreprises nous font confiance
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
          {temoignages.map((temoignage, i) => (
            <div key={i} style={styles.testimonialCard}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '24px',
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${temoignage.color} 0%, ${temoignage.color}99 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '20px',
                  fontWeight: '700',
                }}>
                  {temoignage.avatar}
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#0A1628' }}>
                    {temoignage.nom}
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748B' }}>
                    {temoignage.poste}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.8', fontStyle: 'italic' }}>
                "{temoignage.texte}"
              </p>
              <div style={{ marginTop: '20px', color: '#D4AF37', fontSize: '20px' }}>
                {'★'.repeat(5)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section style={styles.section}>
        <div style={styles.ctaSection}>
          <div style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)',
            top: '-200px',
            right: '-100px',
          }} />

          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '42px',
            fontWeight: '700',
            color: '#fff',
            marginBottom: '16px',
          }}>
            Prêt à Transformer Votre Recrutement ?
          </h2>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255,255,255,0.8)',
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px',
          }}>
            Rejoignez des milliers d'entreprises qui font confiance à SmartRecruit
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button
              style={{
                ...styles.btn,
                ...styles.btnPrimary,
                padding: '16px 48px',
                fontSize: '16px',
              }}
              onClick={() => navigate('/register')}
            >
              Démarrer Gratuitement →
            </button>
            <button
              style={{
                ...styles.btn,
                ...styles.btnSecondary,
                padding: '16px 48px',
                fontSize: '16px',
              }}
            >
              Contacter Sales
            </button>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={styles.footer}>
        <div style={styles.footerGrid}>
          <div>
            <div style={{ ...styles.logo, marginBottom: '24px' }}>
              <div style={styles.logoIcon}>💼</div>
              <div>SmartRecruit</div>
            </div>
            <p style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: '1.7',
              maxWidth: '300px',
            }}>
              La plateforme de recrutement premium qui connecte les meilleurs talents aux opportunités idéales.
            </p>
          </div>

          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '700',
              marginBottom: '24px',
              color: '#D4AF37',
            }}>
              Produit
            </h4>
            {['Fonctionnalités', 'Tarifs', 'Entreprises', 'API'].map((link) => (
              <a key={link} href="#" style={styles.footerLink}>{link}</a>
            ))}
          </div>

          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '700',
              marginBottom: '24px',
              color: '#D4AF37',
            }}>
              Entreprise
            </h4>
            {['À Propos', 'Carrières', 'Blog', 'Contact'].map((link) => (
              <a key={link} href="#" style={styles.footerLink}>{link}</a>
            ))}
          </div>

          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '700',
              marginBottom: '24px',
              color: '#D4AF37',
            }}>
              Légal
            </h4>
            {['Confidentialité', 'CGU', 'Cookies', 'Mentions'].map((link) => (
              <a key={link} href="#" style={styles.footerLink}>{link}</a>
            ))}
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          marginTop: '60px',
          paddingTop: '32px',
          textAlign: 'center',
          fontSize: '14px',
          color: 'rgba(255,255,255,0.6)',
        }}>
          © 2024 SmartRecruit. Tous droits réservés. Fait avec ❤️ en Tunisie
        </div>
      </footer>
    </div>
  );
}

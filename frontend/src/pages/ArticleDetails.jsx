import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { professionalTheme, professionalKeyframes } from '../theme/professionalTheme';
import api from '../utils/api';

const categoryColors = {
  'Conseils Carrière': '#5B73F7',
  'Entretien': '#14D2C4',
  'Tendances': '#F59E0B',
  'Carrière': '#8B5CF6',
  'Technologie': '#10B981',
};

const relatedArticles = [
  { id: 1, title: 'Comment Réussir un Entretien', category: 'Entretien', readTime: '5 min' },
  { id: 2, title: 'Les Compétences 2024', category: 'Tendances', readTime: '6 min' },
  { id: 3, title: 'Lettre de Motivation Parfaite', category: 'Conseils Carrière', readTime: '8 min' },
];

export default function ArticleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api(`/articles/${id}`, 'GET');
        setArticle(data.article);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Article non trouvé ou erreur de chargement.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  const handleLike = async () => {
    try {
      await api(`/articles/${id}/like`, 'POST');
      setLiked(true);
      setArticle(prev => ({ ...prev, likes: prev.likes + 1 }));
    } catch (err) {
      console.error('Error liking article:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.titre,
          text: article.extrait,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers!');
    }
  };

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
      position: 'sticky',
      top: 0,
      zIndex: 1000,
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
      width: '40px',
      height: '40px',
      borderRadius: professionalTheme.radius.xl,
      background: professionalTheme.gradients.primary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFFFFF',
      fontWeight: 700,
      fontSize: '14px',
    },
    navLink: {
      color: professionalTheme.colors.neutral[600],
      textDecoration: 'none',
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 500,
      cursor: 'pointer',
      padding: '0.5rem 1rem',
      borderRadius: professionalTheme.radius.lg,
      transition: professionalTheme.transitions.fast,
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.625rem 1rem',
      borderRadius: professionalTheme.radius.lg,
      border: '1px solid #E4E4E7',
      background: '#FFFFFF',
      cursor: 'pointer',
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 500,
      color: professionalTheme.colors.neutral[700],
      transition: professionalTheme.transitions.fast,
    },
    container: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: isMobile ? '2rem 1rem' : '3rem 1.5rem',
    },
    header: {
      marginBottom: '2rem',
    },
    categoryBadge: {
      display: 'inline-block',
      padding: '0.375rem 0.875rem',
      borderRadius: professionalTheme.radius.full,
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 500,
      marginBottom: '1rem',
    },
    title: {
      fontSize: isMobile ? professionalTheme.fontSizes['3xl'] : professionalTheme.fontSizes['4xl'],
      fontWeight: 800,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '1rem',
      lineHeight: 1.2,
    },
    meta: {
      display: 'flex',
      gap: '1.5rem',
      flexWrap: 'wrap',
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.375rem',
    },
    heroImage: {
      width: '100%',
      height: isMobile ? '250px' : '400px',
      borderRadius: professionalTheme.radius['2xl'],
      background: professionalTheme.gradients.subtle,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '6rem',
      marginBottom: '2rem',
      overflow: 'hidden',
    },
    heroImageWithUrl: {
      width: '100%',
      height: isMobile ? '250px' : '400px',
      objectFit: 'cover',
    },
    actions: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      paddingBottom: '2rem',
      borderBottom: '1px solid #E4E4E7',
    },
    actionButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.625rem 1rem',
      borderRadius: professionalTheme.radius.lg,
      border: '1px solid #E4E4E7',
      background: '#FFFFFF',
      cursor: 'pointer',
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 500,
      color: professionalTheme.colors.neutral[700],
      transition: professionalTheme.transitions.fast,
    },
    content: {
      fontSize: professionalTheme.fontSizes.lg,
      lineHeight: 1.8,
      color: professionalTheme.colors.neutral[800],
    },
    contentParagraph: {
      marginBottom: '1.5rem',
    },
    contentHeading: {
      fontSize: professionalTheme.fontSizes.xl,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[900],
      marginTop: '2rem',
      marginBottom: '1rem',
    },
    authorCard: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1.5rem',
      background: professionalTheme.colors.neutral[50],
      borderRadius: professionalTheme.radius.xl,
      marginTop: '3rem',
    },
    authorAvatar: {
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      background: professionalTheme.gradients.primary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFFFFF',
      fontWeight: 600,
      fontSize: professionalTheme.fontSizes.lg,
    },
    authorInfo: {
      flex: 1,
    },
    authorName: {
      fontSize: professionalTheme.fontSizes.base,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.25rem',
    },
    authorRole: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
    },
    relatedSection: {
      marginTop: '4rem',
      paddingTop: '3rem',
      borderTop: '1px solid #E4E4E7',
    },
    relatedTitle: {
      fontSize: professionalTheme.fontSizes['2xl'],
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '1.5rem',
    },
    relatedGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: '1.5rem',
    },
    relatedCard: {
      padding: '1.5rem',
      background: professionalTheme.colors.neutral[50],
      borderRadius: professionalTheme.radius.xl,
      cursor: 'pointer',
      transition: professionalTheme.transitions.fast,
    },
    relatedCardCategory: {
      display: 'inline-block',
      padding: '0.25rem 0.625rem',
      borderRadius: professionalTheme.radius.full,
      fontSize: professionalTheme.fontSizes.xs,
      fontWeight: 500,
      marginBottom: '0.75rem',
    },
    relatedCardTitle: {
      fontSize: professionalTheme.fontSizes.base,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.5rem',
      lineHeight: 1.4,
    },
    relatedCardMeta: {
      fontSize: professionalTheme.fontSizes.xs,
      color: professionalTheme.colors.neutral[600],
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      gap: '1rem',
    },
    errorContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      gap: '1rem',
      textAlign: 'center',
      padding: '2rem',
    },
    errorIcon: {
      fontSize: '4rem',
      marginBottom: '1rem',
    },
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <nav style={styles.navbar}>
          <div style={styles.navContainer}>
            <div style={styles.logo} onClick={() => navigate('/')}>
              <div style={styles.logoIcon}>SR</div>
              <span style={{ fontSize: professionalTheme.fontSizes.xl, fontWeight: 700 }}>
                SmartRecruit
              </span>
            </div>
          </div>
        </nav>
        <div style={styles.loadingContainer}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #E5E7EB',
            borderTop: `4px solid ${professionalTheme.colors.primary[600]}`,
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }} />
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          <p style={{ color: professionalTheme.colors.neutral[600] }}>Chargement de l'article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div style={styles.page}>
        <nav style={styles.navbar}>
          <div style={styles.navContainer}>
            <div style={styles.logo} onClick={() => navigate('/')}>
              <div style={styles.logoIcon}>SR</div>
              <span style={{ fontSize: professionalTheme.fontSizes.xl, fontWeight: 700 }}>
                SmartRecruit
              </span>
            </div>
          </div>
        </nav>
        <div style={styles.errorContainer}>
          <div style={styles.errorIcon}>📄</div>
          <h2 style={{ fontSize: professionalTheme.fontSizes['2xl'], fontWeight: 700, marginBottom: '0.5rem' }}>
            Article Non Trouvé
          </h2>
          <p style={{ color: professionalTheme.colors.neutral[600], marginBottom: '1.5rem' }}>
            {error || 'L\'article que vous recherchez n\'existe pas.'}
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button style={styles.backButton} onClick={() => navigate('/ressources')}>
              ← Retour aux Ressources
            </button>
            <button
              style={{ ...styles.backButton, background: professionalTheme.gradients.primary, color: '#FFFFFF', border: 'none' }}
              onClick={() => navigate('/')}
            >
              Accueil
            </button>
          </div>
        </div>
      </div>
    );
  }

  const categoryColor = categoryColors[article.categorie] || professionalTheme.colors.primary[600];

  return (
    <div style={styles.page}>
      <style>{professionalKeyframes}</style>

      {/* ===== NAVBAR ===== */}
      <nav style={styles.navbar}>
        <div style={styles.navContainer}>
          <div style={styles.logo} onClick={() => navigate('/')}>
            <div style={styles.logoIcon}>SR</div>
            <span style={{ fontSize: professionalTheme.fontSizes.xl, fontWeight: 700, color: professionalTheme.colors.neutral[900] }}>
              SmartRecruit
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <a
              style={styles.navLink}
              onClick={() => navigate('/ressources')}
            >
              Ressources
            </a>
            <button style={styles.backButton} onClick={() => navigate('/ressources')}>
              ← Retour
            </button>
          </div>
        </div>
      </nav>

      {/* ===== ARTICLE CONTENT ===== */}
      <div style={styles.container}>
        <header style={styles.header}>
          <span style={{ ...styles.categoryBadge, background: `${categoryColor}15`, color: categoryColor }}>
            {article.categorie}
          </span>
          <h1 style={styles.title}>{article.titre}</h1>
          <div style={styles.meta}>
            <div style={styles.metaItem}>
              <span>✍️</span>
              <span>{article.nomAuteur || 'Équipe SmartRecruit'}</span>
            </div>
            <div style={styles.metaItem}>
              <span>📅</span>
              <span>{new Date(article.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <div style={styles.metaItem}>
              <span>⏱️</span>
              <span>{article.tempsLecture || '5 min'}</span>
            </div>
            <div style={styles.metaItem}>
              <span>👁️</span>
              <span>{article.vues || 0} vues</span>
            </div>
          </div>
        </header>

        {article.imageUrl ? (
          <div style={styles.heroImage}>
            <img src={article.imageUrl} alt={article.titre} style={styles.heroImageWithUrl} />
          </div>
        ) : (
          <div style={styles.heroImage}>
            {article.image || '📄'}
          </div>
        )}

        <div style={styles.actions}>
          <button
            style={{
              ...styles.actionButton,
              background: liked ? professionalTheme.colors.primary[50] : '#FFFFFF',
              borderColor: liked ? professionalTheme.colors.primary[600] : '#E4E4E7',
              color: liked ? professionalTheme.colors.primary[700] : professionalTheme.colors.neutral[700],
            }}
            onClick={handleLike}
          >
            <span>{liked ? '❤️' : '🤍'}</span>
            <span>J'aime</span>
            <span>({article.likes || 0})</span>
          </button>
          <button style={styles.actionButton} onClick={handleShare}>
            <span>🔗</span>
            <span>Partager</span>
          </button>
        </div>

        <article style={styles.content}>
          <p style={styles.contentParagraph}>{article.extrait}</p>
          <div dangerouslySetInnerHTML={{ __html: article.contenu }} />
        </article>

        <div style={styles.authorCard}>
          <div style={styles.authorAvatar}>
            {article.nomAuteur?.charAt(0) || 'S'}
          </div>
          <div style={styles.authorInfo}>
            <div style={styles.authorName}>{article.nomAuteur || 'Équipe SmartRecruit'}</div>
            <div style={styles.authorRole}>Expert en Recrutement</div>
          </div>
        </div>

        <section style={styles.relatedSection}>
          <h2 style={styles.relatedTitle}>Articles Similaires</h2>
          <div style={styles.relatedGrid}>
            {relatedArticles.map((related) => {
              const relatedColor = categoryColors[related.category] || professionalTheme.colors.primary[600];
              return (
                <div
                  key={related.id}
                  style={styles.relatedCard}
                  onClick={() => navigate(`/article/${related.id}`)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = professionalTheme.shadows.md;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <span style={{ ...styles.relatedCardCategory, background: `${relatedColor}15`, color: relatedColor }}>
                    {related.category}
                  </span>
                  <h3 style={styles.relatedCardTitle}>{related.title}</h3>
                  <div style={styles.relatedCardMeta}>⏱️ {related.readTime}</div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

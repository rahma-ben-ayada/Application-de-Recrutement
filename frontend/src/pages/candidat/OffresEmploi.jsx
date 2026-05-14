import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { professionalTheme, professionalKeyframes } from '../../theme/professionalTheme';
import CandidatLayout from '../../layouts/CandidatLayout';
import api from '../../utils/api';

// Modern SVG Icons
const Icons = {
  search: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  briefcase: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  mapPin: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  clock: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  heart: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  checkCircle: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  send: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
  filter: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
    </svg>
  ),
  users: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  building: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
      <path d="M9 22v-4h6v4"/>
      <path d="M8 6h.01"/>
      <path d="M16 6h.01"/>
      <path d="M8 10h.01"/>
      <path d="M16 10h.01"/>
      <path d="M8 14h.01"/>
      <path d="M16 14h.01"/>
      <path d="M8 18h.01"/>
      <path d="M16 18h.01"/>
    </svg>
  ),
  fileText: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <line x1="10" y1="9" x2="8" y2="9"/>
    </svg>
  ),
};

export default function OffresEmploi() {
  const navigate = useNavigate();
  const location = useLocation();
  const [offres, setOffres] = useState([]);
  const [mesCandidatures, setMesCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterLieu, setFilterLieu] = useState('all');
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [offreToPostuler, setOffreToPostuler] = useState(null);
  const [lettre, setLettre] = useState('');
  const [cvFile, setCvFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [favoris, setFavoris] = useState([]);

  const types = ['all', 'CDI', 'CDD', 'Stage', 'Freelance', 'Alternance'];
  const lieux = ['all', 'Tunis', 'Sfax', 'Sousse', 'Remote', 'Nabeul', 'Monastir'];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetchData();

    // Check if coming from alertes page with results
    if (location.state?.alerteResultats) {
      setOffres(location.state.alerteResultats);
      setMessage({
        type: 'success',
        text: `${location.state.alerteResultats.length} offre(s) trouvée(s) correspondant à vos alertes`
      });
      setTimeout(() => setMessage(null), 5000);
    }
  }, [location.state]);

  const fetchData = async () => {
    try {
      const [offresData, candidaturesData] = await Promise.all([
        api('/offres'),
        api('/candidatures/mes'),
      ]);
      setOffres(offresData.offres || []);
      setMesCandidatures(candidaturesData.candidatures || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const dejaPostule = (offreId) =>
    mesCandidatures.some(c => c.offre?._id === offreId || c.offre === offreId);

  const isFavori = (offreId) => favoris.includes(offreId);

  const toggleFavori = (offreId) => {
    if (isFavori(offreId)) {
      setFavoris(favoris.filter(id => id !== offreId));
    } else {
      setFavoris([...favoris, offreId]);
    }
  };

  const openPostuler = (offre) => {
    setOffreToPostuler(offre);
    setLettre('');
    setCvFile(null);
    setShowModal(true);
  };

  const handlePostuler = async () => {
    if (!cvFile) return showMessage('error', 'Veuillez joindre votre CV !');
    try {
      const formData = new FormData();
      formData.append('offreId', offreToPostuler._id);
      formData.append('lettre', lettre);
      formData.append('cv', cvFile);

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/candidatures', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la candidature');
      }

      showMessage('success', 'Candidature envoyée avec succès !');
      setShowModal(false);
      fetchData();
    } catch (err) {
      showMessage('error', err.message || 'Erreur lors de la candidature');
    }
  };

  const getTypeBadge = (type) => {
    const badges = {
      CDI: { bg: '#DBEAFE', color: '#1E3A8A', label: 'CDI' },
      CDD: { bg: '#FEF3C7', color: '#D97706', label: 'CDD' },
      Stage: { bg: '#D1FAE5', color: '#059669', label: 'Stage' },
      Freelance: { bg: '#EDE9FE', color: '#7C3AED', label: 'Freelance' },
      Alternance: { bg: '#FEE2E2', color: '#DC2626', label: 'Alternance' },
    };
    return badges[type] || { bg: '#F1F5F9', color: '#475569', label: type };
  };

  const filteredOffres = offres.filter(offre => {
    const matchesSearch = !search ||
      offre.titre?.toLowerCase().includes(search.toLowerCase()) ||
      offre.description?.toLowerCase().includes(search.toLowerCase()) ||
      offre.entrepriseId?.nom?.toLowerCase().includes(search.toLowerCase());

    const matchesType = filterType === 'all' || offre.type === filterType;
    const matchesLieu = filterLieu === 'all' || offre.lieu?.includes(filterLieu);

    return matchesSearch && matchesType && matchesLieu;
  });

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
    },
    headerLeft: {
      flex: 1,
    },
    headerTitle: {
      fontSize: professionalTheme.fontSizes['3xl'],
      fontWeight: 800,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.25rem',
    },
    headerSubtitle: {
      fontSize: professionalTheme.fontSizes.base,
      color: professionalTheme.colors.neutral[600],
    },
    filters: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
      flexWrap: 'wrap',
      padding: '1.5rem',
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
    },
    searchBox: {
      position: 'relative',
      flex: 1,
      minWidth: '250px',
    },
    searchInput: {
      width: '100%',
      padding: '0.75rem 1rem 0.75rem 2.5rem',
      borderRadius: professionalTheme.radius.full,
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      background: professionalTheme.colors.neutral[50],
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[700],
      outline: 'none',
    },
    searchIcon: {
      position: 'absolute',
      left: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: professionalTheme.colors.neutral[400],
    },
    filterGroup: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap',
    },
    filterButton: (active) => ({
      padding: '0.5rem 1rem',
      borderRadius: professionalTheme.radius.full,
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      background: active ? '#5B73F7' : '#FFFFFF',
      color: active ? '#FFFFFF' : professionalTheme.colors.neutral[700],
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 500,
      cursor: 'pointer',
      transition: professionalTheme.transitions.fast,
    }),
    grid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(400px, 1fr))',
      gap: '1.5rem',
    },
    card: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      boxShadow: professionalTheme.shadows.sm,
      overflow: 'hidden',
      transition: professionalTheme.transitions.default,
      position: 'relative',
    },
    cardHeader: {
      padding: '1.5rem',
      borderBottom: `1px solid ${professionalTheme.colors.neutral[100]}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    companyInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    companyLogo: {
      width: '48px',
      height: '48px',
      borderRadius: professionalTheme.radius.xl,
      background: professionalTheme.colors.neutral[100],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
    },
    companyName: {
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[900],
    },
    cardBody: {
      padding: '1.5rem',
    },
    cardTitle: {
      fontSize: professionalTheme.fontSizes.xl,
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.75rem',
      lineHeight: '1.3',
    },
    cardDescription: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      lineHeight: '1.6',
      marginBottom: '1rem',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },
    cardMeta: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      marginBottom: '1rem',
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
    },
    cardFooter: {
      padding: '1rem 1.5rem',
      background: professionalTheme.colors.neutral[50],
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardActions: {
      display: 'flex',
      gap: '0.5rem',
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      borderRadius: professionalTheme.radius.full,
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      background: '#FFFFFF',
      color: professionalTheme.colors.neutral[700],
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      cursor: 'pointer',
      transition: professionalTheme.transitions.fast,
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #5B73F7 0%, #4F63E6 100%)',
      color: '#FFFFFF',
      border: 'none',
      boxShadow: '0 4px 12px rgba(91, 115, 247, 0.25)',
    },
    favoriButton: {
      padding: '0.5rem',
      background: '#FFFFFF',
      color: professionalTheme.colors.neutral[400],
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
    },
    favoriButtonActive: {
      padding: '0.5rem',
      background: '#FEE2E2',
      color: '#EF4444',
      border: `1px solid #FEE2E2`,
    },
    badge: {
      padding: '0.25rem 0.75rem',
      borderRadius: professionalTheme.radius.full,
      fontSize: professionalTheme.fontSizes.xs,
      fontWeight: 600,
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem',
    },
    modalContent: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      width: '100%',
      maxWidth: '500px',
      maxHeight: '90vh',
      overflow: 'auto',
    },
    modalHeader: {
      padding: '1.5rem 2rem',
      borderBottom: `1px solid ${professionalTheme.colors.neutral[200]}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: professionalTheme.fontSizes.xl,
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
    },
    modalBody: {
      padding: '2rem',
    },
    formGroup: {
      marginBottom: '1.5rem',
    },
    formLabel: {
      display: 'block',
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.5rem',
    },
    formTextarea: {
      width: '100%',
      padding: '0.75rem 1rem',
      borderRadius: professionalTheme.radius.lg,
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      background: '#FFFFFF',
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[700],
      outline: 'none',
      minHeight: '100px',
      resize: 'vertical',
    },
    fileUpload: {
      border: `2px dashed ${professionalTheme.colors.neutral[200]}`,
      borderRadius: professionalTheme.radius.xl,
      padding: '2rem',
      textAlign: 'center',
      cursor: 'pointer',
      transition: professionalTheme.transitions.fast,
    },
    modalFooter: {
      padding: '1.5rem 2rem',
      borderTop: `1px solid ${professionalTheme.colors.neutral[200]}`,
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '1rem',
    },
    message: {
      padding: '1rem 1.5rem',
      borderRadius: professionalTheme.radius.xl,
      marginBottom: '1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 500,
    },
    emptyState: {
      textAlign: 'center',
      padding: '4rem 2rem',
      color: professionalTheme.colors.neutral[500],
    },
    loadingState: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '400px',
    },
    stats: {
      display: 'flex',
      gap: '2rem',
      padding: '0 1rem',
    },
    statItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
    },
  };

  if (loading) {
    return (
      <CandidatLayout title="Offres d'emploi">
        <div style={styles.loadingState}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                border: '4px solid #E5E7EB',
                borderTopColor: '#5B73F7',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }} />
            </div>
            <div style={{ color: professionalTheme.colors.neutral[600] }}>Chargement...</div>
          </div>
        </div>
      </CandidatLayout>
    );
  }

  return (
    <CandidatLayout title="Offres d'emploi">
      <style>{professionalKeyframes}</style>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div style={styles.container}>
        {/* Message */}
        {message && (
          <div style={{
            ...styles.message,
            background: message.type === 'success' ? '#D1FAE5' : '#FEE2E2',
            color: message.type === 'success' ? '#059669' : '#EF4444',
          }}>
            {message.text}
            <button onClick={() => setMessage(null)} style={{
              background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: 'inherit',
            }}>✕</button>
          </div>
        )}

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <h1 style={styles.headerTitle}>Offres d'emploi</h1>
            <p style={styles.headerSubtitle}>
              {filteredOffres.length} offre{filteredOffres.length > 1 ? 's' : ''} disponible{filteredOffres.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div style={styles.filters}>
          <div style={styles.searchBox}>
            <div style={styles.searchIcon}>{Icons.search}</div>
            <input
              type="text"
              placeholder="Rechercher par titre, entreprise, compétence..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />
          </div>
          <div style={styles.filterGroup}>
            {types.map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                style={styles.filterButton(filterType === type)}
                onMouseEnter={(e) => !e.currentTarget.style.background.includes('5B73F7') && (e.currentTarget.style.background = professionalTheme.colors.neutral[100])}
                onMouseLeave={(e) => !e.currentTarget.style.background.includes('5B73F7') && (e.currentTarget.style.background = '#FFFFFF')}
              >
                {type === 'all' ? 'Tous' : type}
              </button>
            ))}
          </div>
          <div style={styles.filterGroup}>
            {lieux.map(lieu => (
              <button
                key={lieu}
                onClick={() => setFilterLieu(lieu)}
                style={styles.filterButton(filterLieu === lieu)}
                onMouseEnter={(e) => !e.currentTarget.style.background.includes('5B73F7') && (e.currentTarget.style.background = professionalTheme.colors.neutral[100])}
                onMouseLeave={(e) => !e.currentTarget.style.background.includes('5B73F7') && (e.currentTarget.style.background = '#FFFFFF')}
              >
                {lieu === 'all' ? 'Tous les lieux' : lieu}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filteredOffres.length > 0 ? (
          <div style={styles.grid}>
            {filteredOffres.map((offre) => {
              const typeBadge = getTypeBadge(offre.type);
              const applied = dejaPostule(offre._id);
              const favori = isFavori(offre._id);

              return (
                <div
                  key={offre._id}
                  style={styles.card}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={styles.cardHeader}>
                    <div style={styles.companyInfo}>
                      <div style={styles.companyLogo}>
                        {offre.entrepriseId?.logo ? (
                          <img src={offre.entrepriseId.logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: professionalTheme.radius.xl }} />
                        ) : (
                          Icons.building
                        )}
                      </div>
                      <div>
                        <div style={styles.companyName}>
                          {offre.entrepriseId?.nom || 'Entreprise'}
                        </div>
                        <div style={styles.stats}>
                          <div style={styles.statItem}>
                            {Icons.users}
                            {offre.candidaturesCount || 0} candidats
                          </div>
                          <div style={styles.statItem}>
                            {Icons.clock}
                            {new Date(offre.createdAt).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFavori(offre._id)}
                      style={{
                        ...styles.button,
                        ...(favori ? styles.favoriButtonActive : styles.favoriButton),
                        padding: '0.5rem',
                      }}
                      title={favori ? "Retirer des favoris" : "Ajouter aux favoris"}
                    >
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        {Icons.heart}
                      </span>
                    </button>
                  </div>

                  <div style={styles.cardBody}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <h3 style={styles.cardTitle}>{offre.titre}</h3>
                      <span style={{
                        ...styles.badge,
                        background: typeBadge.bg,
                        color: typeBadge.color,
                      }}>
                        {typeBadge.label}
                      </span>
                    </div>
                    <p style={styles.cardDescription}>
                      {offre.description || 'Aucune description disponible'}
                    </p>
                    <div style={styles.cardMeta}>
                      <div style={styles.metaItem}>
                        {Icons.mapPin}
                        {offre.lieu}
                      </div>
                      {offre.salaire && (
                        <div style={styles.metaItem}>
                          💰 {offre.salaire}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={styles.cardFooter}>
                    <div style={{ fontSize: professionalTheme.fontSizes.xs, color: professionalTheme.colors.neutral[500] }}>
                      {offre.entrepriseId?.nom}
                    </div>
                    <div style={styles.cardActions}>
                      <button
                        onClick={() => navigate(`/offres/${offre._id}`)}
                        style={styles.button}
                        onMouseEnter={(e) => e.currentTarget.style.background = professionalTheme.colors.neutral[100]}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#FFFFFF'}
                      >
                        Voir détails
                      </button>
                      {applied ? (
                        <button
                          style={{
                            ...styles.button,
                            background: '#D1FAE5',
                            color: '#059669',
                            borderColor: '#D1FAE5',
                          }}
                          disabled
                        >
                          {Icons.checkCircle}
                          Postulé
                        </button>
                      ) : (
                        <button
                          onClick={() => openPostuler(offre)}
                          style={{
                            ...styles.button,
                            ...styles.primaryButton,
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                          {Icons.send}
                          Postuler
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>🔍</div>
            <h3 style={{ fontSize: professionalTheme.fontSizes.xl, fontWeight: 700, marginBottom: '0.5rem', color: professionalTheme.colors.neutral[900] }}>
              Aucune offre trouvée
            </h3>
            <p>
              {search || filterType !== 'all' || filterLieu !== 'all'
                ? 'Essayez d\'autres critères de recherche'
                : 'Revenez bientôt pour de nouvelles opportunités'}
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && offreToPostuler && (
        <div style={styles.modal} onClick={(e) => e.target.style === styles.modal && setShowModal(false)}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Postuler - {offreToPostuler.titre}</h2>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: professionalTheme.colors.neutral[400] }}
              >
                ✕
              </button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Lettre de motivation (optionnelle)</label>
                <textarea
                  value={lettre}
                  onChange={(e) => setLettre(e.target.value)}
                  placeholder="Expliquez pourquoi vous êtes le candidat idéal..."
                  style={styles.formTextarea}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>CV * {cvFile && `✓ ${cvFile.name}`}</label>
                <div style={styles.fileUpload}>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setCvFile(e.target.files[0])}
                    style={{ display: 'none' }}
                    id="cv-upload"
                  />
                  <label htmlFor="cv-upload" style={{ cursor: 'pointer' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📄</div>
                    <div style={{ fontSize: professionalTheme.fontSizes.sm, color: professionalTheme.colors.neutral[600] }}>
                      Cliquez pour uploader ou glissez-déposez
                    </div>
                    <div style={{ fontSize: professionalTheme.fontSizes.xs, color: professionalTheme.colors.neutral[400] }}>
                      PDF, DOC jusqu'à 10MB
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button
                onClick={() => setShowModal(false)}
                style={styles.button}
              >
                Annuler
              </button>
              <button
                onClick={handlePostuler}
                style={{
                  ...styles.button,
                  ...styles.primaryButton,
                }}
                disabled={!cvFile}
              >
                {Icons.send}
                Envoyer ma candidature
              </button>
            </div>
          </div>
        </div>
      )}
    </CandidatLayout>
  );
}

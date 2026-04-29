import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { professionalTheme, professionalKeyframes } from '../../theme/professionalTheme';
import CandidatLayout from '../../layouts/CandidatLayout';
import api from '../../utils/api';

export default function OffresEmploi() {
  const navigate = useNavigate();
  const location = useLocation();
  const [offres, setOffres] = useState([]);
  const [mesCandidatures, setMesCandidatures] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('Tous');
  const [filterLieu, setFilterLieu] = useState('Tous');
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [offreToPostuler, setOffreToPostuler] = useState(null);
  const [lettre, setLettre] = useState('');
  const [cvFile, setCvFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [fromAlerte, setFromAlerte] = useState(false);

  const types = ['Tous', 'CDI', 'CDD', 'Stage', 'Freelance'];
  const lieux = ['Tous', 'Tunis', 'Sfax', 'Sousse', 'Remote'];

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
      setFromAlerte(true);
      setMessage({
        type: 'success',
        text: `${location.state.alerteResultats.length} offre(s) trouvée(s) correspondant à vos alertes`
      });
      setTimeout(() => setMessage(null), 5000);
    }
  }, [location.state]);

  const fetchData = async () => {
    try {
      const [offresData, candidaturesData, statsData] = await Promise.all([
        api('/offres'),
        api('/candidatures/mes'),
        api('/candidatures/stats').catch(() => ({ stats: null })),
      ]);
      setOffres(offresData.offres || []);
      setMesCandidatures(candidaturesData.candidatures || []);
      setStats(statsData.stats);
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

  const openPostuler = (offre) => {
    setOffreToPostuler(offre);
    setLettre('');
    setCvFile(null);
    setVideoFile(null);
    setShowModal(true);
  };

  const handlePostuler = async () => {
    if (!cvFile) return showMessage('error', '⚠️ Veuillez joindre votre CV !');
    try {
      const formData = new FormData();
      formData.append('offreId', offreToPostuler._id);
      formData.append('lettre', lettre);
      formData.append('cv', cvFile);
      if (videoFile) formData.append('video', videoFile);

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/candidatures', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setShowModal(false);
      showMessage('success', `✅ Candidature envoyée pour "${offreToPostuler.titre}" !`);
      fetchData();
    } catch (err) {
      showMessage('error', err.message);
    }
  };

  const filtered = offres.filter(o => {
    const matchSearch =
      o.titre?.toLowerCase().includes(search.toLowerCase()) ||
      o.recruteur?.entreprise?.toLowerCase().includes(search.toLowerCase()) ||
      (o.competences || []).some(c => c.toLowerCase().includes(search.toLowerCase()));
    const matchType = filterType === 'Tous' || o.type === filterType;
    const matchLieu = filterLieu === 'Tous' || o.lieu === filterLieu;
    return matchSearch && matchType && matchLieu;
  });

  const statsCards = [
    {
      label: 'Offres disponibles',
      value: offres.length,
      color: '#5B73F7',
      bg: 'rgba(91, 115, 247, 0.1)',
      icon: '📋',
    },
    {
      label: 'Mes candidatures',
      value: mesCandidatures.length,
      color: '#10B981',
      bg: 'rgba(16, 185, 129, 0.1)',
      icon: '📨',
    },
    {
      label: 'En entretien',
      value: stats?.en_entretien || 0,
      color: '#F59E0B',
      bg: 'rgba(245, 158, 11, 0.1)',
      icon: '🎯',
    },
    {
      label: 'Acceptées',
      value: stats?.acceptees || 0,
      color: '#06B6D4',
      bg: 'rgba(6, 182, 212, 0.1)',
      icon: '✅',
    },
  ];

  const typeBadge = (type) => {
    const styles = {
      CDI: { bg: '#DBEAFE', color: '#1E3A8A' },
      CDD: { bg: '#FEF3C7', color: '#D97706' },
      Stage: { bg: '#D1FAE5', color: '#059669' },
      Freelance: { bg: '#EDE9FE', color: '#7C3AED' },
    };
    const s = styles[type] || { bg: '#F1F5F9', color: '#475569' };
    return (
      <span style={{
        background: s.bg, color: s.color,
        padding: '0.25rem 0.75rem', borderRadius: professionalTheme.radius.full,
        fontSize: professionalTheme.fontSizes.xs, fontWeight: 600,
      }}>
        {type}
      </span>
    );
  };

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
    headerTitle: {
      fontSize: professionalTheme.fontSizes['2xl'],
      fontWeight: 800,
      color: professionalTheme.colors.neutral[900],
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: '1.5rem',
    },
    statCard: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      padding: isMobile ? '1.5rem' : '2rem',
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      boxShadow: professionalTheme.shadows.sm,
    },
    statIcon: {
      width: '56px',
      height: '56px',
      borderRadius: professionalTheme.radius.xl,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.75rem',
    },
    statContent: {
      flex: 1,
    },
    statValue: {
      fontSize: professionalTheme.fontSizes['2xl'],
      fontWeight: 800,
      color: professionalTheme.colors.neutral[900],
    },
    statLabel: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      fontWeight: 500,
    },
    filtersCard: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      padding: '1.5rem',
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      boxShadow: professionalTheme.shadows.sm,
    },
    filtersGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr',
      gap: '1rem',
    },
    filterGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    filterLabel: {
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[700],
    },
    searchInput: {
      width: '100%',
      padding: '0.75rem 1rem',
      borderRadius: professionalTheme.radius.full,
      border: `2px solid ${professionalTheme.colors.neutral[200]}`,
      fontSize: professionalTheme.fontSizes.base,
      outline: 'none',
      transition: professionalTheme.transitions.default,
    },
    filterButtons: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap',
    },
    filterButton: (isActive) => ({
      padding: '0.5rem 1rem',
      borderRadius: professionalTheme.radius.full,
      border: isActive ? `2px solid ${professionalTheme.colors.primary[600]}` : `1px solid ${professionalTheme.colors.neutral[200]}`,
      background: isActive ? professionalTheme.colors.primary[50] : '#FFFFFF',
      color: isActive ? professionalTheme.colors.primary[700] : professionalTheme.colors.neutral[700],
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      cursor: 'pointer',
      transition: professionalTheme.transitions.fast,
    }),
    select: {
      width: '100%',
      padding: '0.75rem 1rem',
      borderRadius: professionalTheme.radius.full,
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      fontSize: professionalTheme.fontSizes.base,
      outline: 'none',
      background: '#FFFFFF',
      cursor: 'pointer',
    },
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: selected ? '1fr 400px' : '1fr',
      gap: '2rem',
    },
    offresList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    offreCard: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      padding: '1.5rem',
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      cursor: 'pointer',
      transition: professionalTheme.transitions.default,
      boxShadow: professionalTheme.shadows.sm,
    },
    offreHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1rem',
      gap: '1rem',
    },
    offreCompany: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '0.5rem',
    },
    offreLogo: {
      width: '48px',
      height: '48px',
      borderRadius: professionalTheme.radius.lg,
      background: professionalTheme.colors.neutral[100],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.25rem',
    },
    offreTitle: {
      fontSize: professionalTheme.fontSizes.lg,
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.5rem',
    },
    offreMeta: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    offreTags: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap',
      marginBottom: '1rem',
    },
    offreActions: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '0.5rem',
    },
    applyButton: {
      padding: '0.625rem 1.25rem',
      borderRadius: professionalTheme.radius.full,
      background: professionalTheme.gradients.primary,
      color: '#FFFFFF',
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      border: 'none',
      cursor: 'pointer',
      transition: professionalTheme.transitions.default,
    },
    appliedBadge: {
      padding: '0.5rem 1rem',
      borderRadius: professionalTheme.radius.full,
      background: professionalTheme.colors.success.light,
      color: professionalTheme.colors.success.dark,
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
    },
    detailPanel: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      padding: '2rem',
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      boxShadow: professionalTheme.shadows.sm,
      position: 'sticky',
      top: '20px',
      maxHeight: 'calc(100vh - 100px)',
      overflowY: 'auto',
    },
    detailHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
    },
    detailTitle: {
      fontSize: professionalTheme.fontSizes.xl,
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
    },
    detailRow: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0.75rem 0',
      borderBottom: `1px solid ${professionalTheme.colors.neutral[100]}`,
    },
    detailLabel: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
    },
    detailValue: {
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[900],
    },
    detailSection: {
      marginTop: '1.5rem',
    },
    detailSectionTitle: {
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[700],
      marginBottom: '0.75rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    detailDescription: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[700],
      lineHeight: 1.7,
    },
    competencesGrid: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap',
    },
    competenceTag: {
      padding: '0.375rem 0.75rem',
      borderRadius: professionalTheme.radius.full,
      background: professionalTheme.colors.primary[50],
      color: professionalTheme.colors.primary[700],
      fontSize: professionalTheme.fontSizes.xs,
      fontWeight: 600,
    },
    modal: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem',
    },
    modalContent: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      padding: '2rem',
      width: '100%',
      maxWidth: '520px',
      maxHeight: '90vh',
      overflowY: 'auto',
      boxShadow: professionalTheme.shadows['2xl'],
    },
    modalTitle: {
      fontSize: professionalTheme.fontSizes.xl,
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.5rem',
    },
    modalSubtitle: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      marginBottom: '2rem',
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
    fileInput: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem',
      borderRadius: professionalTheme.radius.lg,
      border: cvFile ? `2px solid ${professionalTheme.colors.success.main}` : `2px dashed ${professionalTheme.colors.neutral[200]}`,
      background: professionalTheme.colors.neutral[50],
    },
    fileInputButton: {
      padding: '0.5rem 1rem',
      borderRadius: professionalTheme.radius.full,
      background: professionalTheme.colors.primary[600],
      color: '#FFFFFF',
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      cursor: 'pointer',
      border: 'none',
    },
    textarea: {
      width: '100%',
      padding: '0.75rem 1rem',
      borderRadius: professionalTheme.radius.lg,
      border: `2px solid ${professionalTheme.colors.neutral[200]}`,
      fontSize: professionalTheme.fontSizes.base,
      outline: 'none',
      fontFamily: 'inherit',
      resize: 'vertical',
      minHeight: '100px',
    },
    modalActions: {
      display: 'flex',
      gap: '1rem',
      marginTop: '2rem',
    },
    modalButton: {
      flex: 1,
      padding: '0.875rem 1.5rem',
      borderRadius: professionalTheme.radius.full,
      fontSize: professionalTheme.fontSizes.base,
      fontWeight: 600,
      cursor: 'pointer',
      transition: professionalTheme.transitions.default,
    },
    emptyState: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      padding: '4rem 2rem',
      textAlign: 'center',
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
    },
    messageBox: (type) => ({
      padding: '1rem 1.25rem',
      borderRadius: professionalTheme.radius.lg,
      marginBottom: '1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: type === 'success' ? professionalTheme.colors.success.light : professionalTheme.colors.error.light,
      color: type === 'success' ? professionalTheme.colors.success.dark : professionalTheme.colors.error.dark,
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 500,
    }),
  };

  if (loading) {
    return (
      <CandidatLayout title="Offres d'emploi">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
            <div style={{ color: professionalTheme.colors.neutral[600] }}>Chargement...</div>
          </div>
        </div>
      </CandidatLayout>
    );
  }

  return (
    <CandidatLayout title="Offres d'emploi">
      <style>{professionalKeyframes}</style>
      <div style={styles.container}>
        {/* Message */}
        {message && (
          <div style={styles.messageBox(message.type)}>
            {message.text}
            <button
              onClick={() => setMessage(null)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.25rem',
                color: 'inherit',
              }}
            >
              ✕
            </button>
          </div>
        )}

        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Trouvez votre prochain emploi</h1>
        </div>

        {/* Stats */}
        <div style={styles.statsGrid}>
          {statsCards.map((stat, index) => (
            <div key={index} style={styles.statCard}>
              <div style={{ ...styles.statIcon, background: stat.bg }}>
                {stat.icon}
              </div>
              <div style={styles.statContent}>
                <div style={{ ...styles.statValue, color: stat.color }}>{stat.value}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={styles.filtersCard}>
          <div style={styles.filtersGrid}>
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Recherche</label>
              <input
                placeholder="🔍 Titre, entreprise, compétence..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Type de contrat</label>
              <div style={styles.filterButtons}>
                {types.map(t => (
                  <button
                    key={t}
                    onClick={() => setFilterType(t)}
                    style={styles.filterButton(filterType === t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Lieu</label>
              <select value={filterLieu} onChange={e => setFilterLieu(e.target.value)} style={styles.select}>
                {lieux.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={styles.contentGrid}>
          {/* Offres List */}
          <div style={styles.offresList}>
            {filtered.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                <div style={{ fontSize: professionalTheme.fontSizes.lg, fontWeight: 700, color: professionalTheme.colors.neutral[900], marginBottom: '0.5rem' }}>
                  Aucune offre trouvée
                </div>
                <div style={{ fontSize: professionalTheme.fontSizes.base, color: professionalTheme.colors.neutral[600] }}>
                  Essayez d'ajuster vos critères de recherche
                </div>
              </div>
            ) : (
              filtered.map(offre => (
                <div
                  key={offre._id}
                  style={{
                    ...styles.offreCard,
                    border: selected?._id === offre._id ? `2px solid ${professionalTheme.colors.primary[600]}` : `1px solid ${professionalTheme.colors.neutral[200]}`,
                    boxShadow: selected?._id === offre._id ? professionalTheme.shadows.md : professionalTheme.shadows.sm,
                  }}
                  onClick={() => setSelected(selected?._id === offre._id ? null : offre)}
                  onMouseEnter={(e) => {
                    if (selected?._id !== offre._id) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = professionalTheme.shadows.md;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selected?._id !== offre._id) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = professionalTheme.shadows.sm;
                    }
                  }}
                >
                  <div style={styles.offreHeader}>
                    <div style={{ flex: 1 }}>
                      <div style={styles.offreCompany}>
                        <div style={styles.offreLogo}>🏢</div>
                        <div>
                          <div style={{ fontWeight: 600, color: professionalTheme.colors.neutral[900] }}>
                            {offre.recruteur?.entreprise || 'Entreprise'}
                          </div>
                          <div style={styles.offreMeta}>
                            📍 {offre.lieu} • {new Date(offre.createdAt).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                      </div>
                      <h3 style={styles.offreTitle}>{offre.titre}</h3>
                      <div style={styles.offreTags}>
                        {typeBadge(offre.type)}
                        {offre.salaire && (
                          <span style={{
                            background: professionalTheme.colors.success.light,
                            color: professionalTheme.colors.success.dark,
                            padding: '0.25rem 0.75rem',
                            borderRadius: professionalTheme.radius.full,
                            fontSize: professionalTheme.fontSizes.xs,
                            fontWeight: 600,
                          }}>
                            💰 {offre.salaire}
                          </span>
                        )}
                        {(offre.competences || []).slice(0, 3).map((c, i) => (
                          <span key={i} style={{
                            background: professionalTheme.colors.neutral[100],
                            color: professionalTheme.colors.neutral[700],
                            padding: '0.25rem 0.75rem',
                            borderRadius: professionalTheme.radius.full,
                            fontSize: professionalTheme.fontSizes.xs,
                            fontWeight: 500,
                          }}>
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div style={styles.offreActions}>
                      <div style={{ fontSize: professionalTheme.fontSizes.xs, color: professionalTheme.colors.neutral[400] }}>
                        {new Date(offre.createdAt).toLocaleDateString('fr-FR')}
                      </div>
                      {dejaPostule(offre._id) ? (
                        <div style={styles.appliedBadge}>✓ Postulé</div>
                      ) : (
                        <button
                          style={styles.applyButton}
                          onClick={e => {
                            e.stopPropagation();
                            openPostuler(offre);
                          }}
                        >
                          Postuler →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Detail Panel */}
          {selected && (
            <div style={styles.detailPanel}>
              <div style={styles.detailHeader}>
                <h3 style={styles.detailTitle}>Détail de l'offre</h3>
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: professionalTheme.colors.neutral[400],
                    fontSize: '1.5rem',
                  }}
                >
                  ✕
                </button>
              </div>

              <div style={styles.detailTitle}>{selected.titre}</div>
              <div style={styles.offreMeta} style={{ marginBottom: '1rem' }}>
                {selected.recruteur?.entreprise || '—'} • 📍 {selected.lieu}
              </div>

              {[
                { label: 'Type', value: selected.type },
                { label: 'Lieu', value: selected.lieu },
                { label: 'Salaire', value: selected.salaire || '—' },
                { label: 'Publié le', value: new Date(selected.createdAt).toLocaleDateString('fr-FR') },
              ].map((f, i) => (
                <div key={i} style={styles.detailRow}>
                  <span style={styles.detailLabel}>{f.label}</span>
                  <span style={styles.detailValue}>{f.value}</span>
                </div>
              ))}

              {(selected.competences || []).length > 0 && (
                <div style={styles.detailSection}>
                  <div style={styles.detailSectionTitle}>Compétences requises</div>
                  <div style={styles.competencesGrid}>
                    {selected.competences.map((c, i) => (
                      <span key={i} style={styles.competenceTag}>{c}</span>
                    ))}
                  </div>
                </div>
              )}

              {selected.description && (
                <div style={styles.detailSection}>
                  <div style={styles.detailSectionTitle}>Description</div>
                  <p style={styles.detailDescription}>{selected.description}</p>
                </div>
              )}

              {dejaPostule(selected._id) ? (
                <div style={{
                  ...styles.appliedBadge,
                  textAlign: 'center',
                  marginTop: '1.5rem',
                  padding: '1rem',
                }}>
                  ✓ Vous avez déjà postulé à cette offre
                </div>
              ) : (
                <button
                  onClick={() => openPostuler(selected)}
                  style={{ ...styles.applyButton, width: '100%', marginTop: '1.5rem' }}
                >
                  Postuler à cette offre →
                </button>
              )}
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && offreToPostuler && (
          <div style={styles.modal} onClick={() => setShowModal(false)}>
            <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
              <div style={styles.detailHeader}>
                <h3 style={styles.modalTitle}>Postuler à l'offre</h3>
                <button
                  onClick={() => setShowModal(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', color: professionalTheme.colors.neutral[400] }}
                >
                  ✕
                </button>
              </div>

              <div style={{
                background: professionalTheme.colors.primary[50],
                borderRadius: professionalTheme.radius.lg,
                padding: '1rem',
                marginBottom: '2rem',
              }}>
                <div style={{ fontWeight: 700, color: professionalTheme.colors.primary[700] }}>
                  {offreToPostuler.titre}
                </div>
                <div style={{ fontSize: professionalTheme.fontSizes.sm, color: professionalTheme.colors.primary[600] }}>
                  {offreToPostuler.recruteur?.entreprise || '—'} • {offreToPostuler.lieu}
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>
                  📄 CV <span style={{ color: professionalTheme.colors.error.main }}>*</span>
                  <span style={{ color: professionalTheme.colors.neutral[500], fontSize: professionalTheme.fontSizes.xs }}>
                    {' '}(PDF, DOC, DOCX)
                  </span>
                </label>
                <div style={styles.fileInput}>
                  <span style={{ fontSize: professionalTheme.fontSizes.sm, color: cvFile ? professionalTheme.colors.success.dark : professionalTheme.colors.neutral[500] }}>
                    {cvFile ? `✓ ${cvFile.name}` : 'Aucun fichier sélectionné'}
                  </span>
                  <label style={styles.fileInputButton}>
                    📁 Parcourir
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      style={{ display: 'none' }}
                      onChange={e => setCvFile(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>
                  🎥 Vidéo de présentation
                  <span style={{ color: professionalTheme.colors.neutral[500], fontSize: professionalTheme.fontSizes.xs }}>
                    {' '}(30 sec max, MP4/MOV)
                  </span>
                </label>
                <div style={styles.fileInput}>
                  <span style={{ fontSize: professionalTheme.fontSizes.sm, color: videoFile ? professionalTheme.colors.success.dark : professionalTheme.colors.neutral[500] }}>
                    {videoFile ? `✓ ${videoFile.name}` : 'Aucun fichier sélectionné'}
                  </span>
                  <label style={styles.fileInputButton}>
                    🎬 Parcourir
                    <input
                      type="file"
                      accept=".mp4,.mov,.webm"
                      style={{ display: 'none' }}
                      onChange={e => setVideoFile(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>
                  ✍️ Lettre de motivation
                  <span style={{ color: professionalTheme.colors.neutral[500], fontSize: professionalTheme.fontSizes.xs }}>
                    {' '}(optionnel)
                  </span>
                </label>
                <textarea
                  placeholder="Présentez-vous et expliquez pourquoi vous êtes intéressé..."
                  value={lettre}
                  onChange={e => setLettre(e.target.value)}
                  style={styles.textarea}
                />
              </div>

              <div style={styles.modalActions}>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    ...styles.modalButton,
                    background: '#FFFFFF',
                    color: professionalTheme.colors.neutral[700],
                    border: `1px solid ${professionalTheme.colors.neutral[200]}`,
                  }}
                >
                  Annuler
                </button>
                <button
                  onClick={handlePostuler}
                  style={{
                    ...styles.modalButton,
                    background: professionalTheme.gradients.primary,
                    color: '#FFFFFF',
                    border: 'none',
                  }}
                >
                  Envoyer ma candidature →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </CandidatLayout>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { professionalTheme, professionalKeyframes } from '../../theme/professionalTheme';
import RecruteurLayout from '../../layouts/RecruteurLayout';
import api from '../../utils/api';

// Modern SVG Icons
const Icons = {
  briefcase: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  plus: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  edit: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  trash: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
      <line x1="10" y1="11" x2="10" y2="17"/>
      <line x1="14" y1="11" x2="14" y2="17"/>
    </svg>
  ),
  eye: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  search: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  calendar: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
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
  checkCircle: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  xCircle: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="15" y1="9" x2="9" y2="15"/>
      <line x1="9" y1="9" x2="15" y2="15"/>
    </svg>
  ),
  alertCircle: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
};

const emptyForm = {
  titre: '', lieu: '', type: 'CDI', description: '', salaire: '', competences: '',
};

export default function MesOffres() {
  const navigate = useNavigate();
  const [mesOffres, setMesOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editOffre, setEditOffre] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetchMesOffres();
  }, []);

  const fetchMesOffres = async () => {
    try {
      const data = await api('/offres/mes');
      setMesOffres(data.offres || []);
    } catch (err) {
      console.error(err);
      showMessage('error', 'Erreur lors du chargement des offres');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const openCreate = () => {
    setEditOffre(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (offre) => {
    setEditOffre(offre);
    setForm({
      titre: offre.titre,
      lieu: offre.lieu,
      type: offre.type,
      description: offre.description,
      salaire: offre.salaire || '',
      competences: (offre.competences || []).join(', '),
    });
    setShowModal(true);
  };

  const saveOffre = async () => {
    if (!form.titre?.trim()) {
      showMessage('error', 'Le titre est requis');
      return;
    }
    if (!form.lieu?.trim()) {
      showMessage('error', 'Le lieu est requis');
      return;
    }
    if (!form.type) {
      showMessage('error', 'Le type de contrat est requis');
      return;
    }

    const payload = {
      titre: form.titre.trim(),
      lieu: form.lieu.trim(),
      type: form.type,
      description: form.description?.trim() || '',
      salaire: form.salaire?.trim() || '',
      competences: form.competences
        ? form.competences.split(',').map(c => c.trim()).filter(c => c.length > 0)
        : [],
    };

    try {
      if (editOffre) {
        await api(`/offres/${editOffre._id}`, 'PUT', payload);
        showMessage('success', 'Offre modifiée avec succès !');
      } else {
        await api('/offres', 'POST', payload);
        showMessage('success', 'Offre créée avec succès !');
      }
      setShowModal(false);
      fetchMesOffres();
    } catch (err) {
      console.error('Error saving offer:', err);
      showMessage('error', err.message || 'Erreur lors de la sauvegarde');
    }
  };

  const deleteOffre = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) return;
    try {
      await api(`/offres/${id}`, 'DELETE');
      showMessage('success', 'Offre supprimée avec succès');
      fetchMesOffres();
    } catch (err) {
      showMessage('error', err.message || 'Erreur lors de la suppression');
    }
  };

  const toggleStatus = async (offre) => {
    try {
      await api(`/offres/${offre._id}`, 'PUT', {
        status: offre.status === 'active' ? 'closed' : 'active',
      });
      fetchMesOffres();
      showMessage('success', `Offre ${offre.status === 'active' ? 'désactivée' : 'activée'} avec succès`);
    } catch (err) {
      showMessage('error', err.message || 'Erreur lors de la modification du statut');
    }
  };

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const filteredOffres = mesOffres.filter(o =>
    o.titre?.toLowerCase().includes(search.toLowerCase()) ||
    o.lieu?.toLowerCase().includes(search.toLowerCase())
  );

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

  const getStatusBadge = (status) => {
    const badges = {
      active: { bg: '#D1FAE5', color: '#059669', label: 'Active', icon: Icons.checkCircle },
      closed: { bg: '#FEE2E2', color: '#DC2626', label: 'Close', icon: Icons.xCircle },
      pending: { bg: '#FEF3C7', color: '#D97706', label: 'En attente', icon: Icons.alertCircle },
    };
    return badges[status] || badges.pending;
  };

  const getInitials = (nom) => {
    if (!nom) return 'E';
    return nom.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (nom) => {
    const colors = ['#5B73F7', '#10B981', '#8B5CF6', '#F59E0B', '#06B6D4', '#EC4899'];
    if (!nom) return colors[0];
    const index = nom.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0.5rem',
    },
    headerLeft: {
      flex: 1,
    },
    headerTitle: {
      fontSize: professionalTheme.fontSizes['2xl'],
      fontWeight: 800,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.25rem',
    },
    headerSubtitle: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
    },
    actions: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
    },
    searchBox: {
      position: 'relative',
      width: isMobile ? '100%' : '300px',
    },
    searchInput: {
      width: '100%',
      padding: '0.75rem 1rem 0.75rem 2.5rem',
      borderRadius: professionalTheme.radius.full,
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      background: '#FFFFFF',
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[700],
      outline: 'none',
      transition: professionalTheme.transitions.fast,
    },
    searchIcon: {
      position: 'absolute',
      left: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: professionalTheme.colors.neutral[400],
      pointerEvents: 'none',
    },
    createButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1.5rem',
      borderRadius: professionalTheme.radius.full,
      border: 'none',
      background: 'linear-gradient(135deg, #5B73F7 0%, #4F63E6 100%)',
      color: '#FFFFFF',
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      cursor: 'pointer',
      transition: professionalTheme.transitions.default,
      boxShadow: '0 4px 12px rgba(91, 115, 247, 0.25)',
    },
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
    },
    cardHeader: {
      padding: '1.5rem',
      borderBottom: `1px solid ${professionalTheme.colors.neutral[100]}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    cardTitle: {
      fontSize: professionalTheme.fontSizes.lg,
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.5rem',
      lineHeight: '1.3',
    },
    cardMeta: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    badge: {
      padding: '0.25rem 0.75rem',
      borderRadius: professionalTheme.radius.full,
      fontSize: professionalTheme.fontSizes.xs,
      fontWeight: 600,
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem',
    },
    cardBody: {
      padding: '1.5rem',
    },
    cardDescription: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      lineHeight: '1.6',
      marginBottom: '1rem',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },
    cardStats: {
      display: 'flex',
      gap: '1.5rem',
      marginBottom: '1rem',
    },
    statItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
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
    actionButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.25rem',
      padding: '0.5rem 0.75rem',
      borderRadius: professionalTheme.radius.lg,
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      background: '#FFFFFF',
      color: professionalTheme.colors.neutral[700],
      fontSize: professionalTheme.fontSizes.xs,
      fontWeight: 500,
      cursor: 'pointer',
      transition: professionalTheme.transitions.fast,
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
      maxWidth: '600px',
      maxHeight: '90vh',
      overflow: 'auto',
      boxShadow: professionalTheme.shadows.xl,
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
    formInput: {
      width: '100%',
      padding: '0.75rem 1rem',
      borderRadius: professionalTheme.radius.lg,
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      background: '#FFFFFF',
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[700],
      outline: 'none',
      transition: professionalTheme.transitions.fast,
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
      transition: professionalTheme.transitions.fast,
      minHeight: '100px',
      resize: 'vertical',
    },
    formSelect: {
      width: '100%',
      padding: '0.75rem 1rem',
      borderRadius: professionalTheme.radius.lg,
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      background: '#FFFFFF',
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[700],
      outline: 'none',
      transition: professionalTheme.transitions.fast,
      cursor: 'pointer',
    },
    modalFooter: {
      padding: '1.5rem 2rem',
      borderTop: `1px solid ${professionalTheme.colors.neutral[200]}`,
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '1rem',
    },
    button: {
      padding: '0.75rem 1.5rem',
      borderRadius: professionalTheme.radius.full,
      border: 'none',
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      cursor: 'pointer',
      transition: professionalTheme.transitions.fast,
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #5B73F7 0%, #4F63E6 100%)',
      color: '#FFFFFF',
      boxShadow: '0 4px 12px rgba(91, 115, 247, 0.25)',
    },
    secondaryButton: {
      background: '#FFFFFF',
      color: professionalTheme.colors.neutral[700],
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
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
    emptyIcon: {
      fontSize: '4rem',
      marginBottom: '1rem',
      opacity: 0.5,
    },
    loadingState: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '400px',
    },
  };

  if (loading) {
    return (
      <RecruteurLayout title="Mes Offres">
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
      </RecruteurLayout>
    );
  }

  return (
    <RecruteurLayout title="Mes Offres">
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
            <h1 style={styles.headerTitle}>Gestion des offres</h1>
            <p style={styles.headerSubtitle}>Créez et gérez vos offres d'emploi</p>
          </div>
          <div style={styles.actions}>
            <div style={styles.searchBox}>
              <div style={styles.searchIcon}>{Icons.search}</div>
              <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={styles.searchInput}
              />
            </div>
            <button
              onClick={openCreate}
              style={styles.createButton}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {Icons.plus}
              Nouvelle offre
            </button>
          </div>
        </div>

        {/* Grid */}
        {filteredOffres.length > 0 ? (
          <div style={styles.grid}>
            {filteredOffres.map((offre) => {
              const typeBadge = getTypeBadge(offre.type);
              const statusBadge = getStatusBadge(offre.status);

              return (
                <div
                  key={offre._id}
                  style={styles.card}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={styles.cardHeader}>
                    <div style={{ flex: 1 }}>
                      <h3 style={styles.cardTitle}>{offre.titre}</h3>
                      <div style={styles.cardMeta}>
                        <span style={{ ...styles.badge, background: typeBadge.bg, color: typeBadge.color }}>
                          {typeBadge.label}
                        </span>
                        <span style={{
                          ...styles.badge,
                          background: statusBadge.bg,
                          color: statusBadge.color,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                        }}>
                          <span style={{ display: 'flex', alignItems: 'center' }}>
                            {statusBadge.icon}
                          </span>
                          {statusBadge.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={styles.cardBody}>
                    <p style={styles.cardDescription}>
                      {offre.description || 'Aucune description'}
                    </p>

                    <div style={styles.cardStats}>
                      <div style={styles.statItem}>
                        <span style={{ color: professionalTheme.colors.neutral[400] }}>
                          {Icons.calendar}
                        </span>
                        {new Date(offre.createdAt).toLocaleDateString('fr-FR')}
                      </div>
                      <div style={styles.statItem}>
                        <span style={{ color: professionalTheme.colors.neutral[400] }}>
                          {Icons.users}
                        </span>
                        {offre.candidaturesCount || 0} candidatures
                      </div>
                    </div>

                    <div style={styles.cardMeta}>
                      <span style={styles.statItem}>
                        📍 {offre.lieu}
                      </span>
                      {offre.salaire && (
                        <span style={styles.statItem}>
                          💰 {offre.salaire}
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={styles.cardFooter}>
                    <div style={styles.cardActions}>
                      <button
                        onClick={() => navigate(`/offres/${offre._id}`)}
                        style={styles.actionButton}
                        onMouseEnter={(e) => e.currentTarget.style.background = professionalTheme.colors.neutral[100]}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#FFFFFF'}
                      >
                        {Icons.eye}
                        Voir
                      </button>
                      <button
                        onClick={() => openEdit(offre)}
                        style={styles.actionButton}
                        onMouseEnter={(e) => e.currentTarget.style.background = professionalTheme.colors.neutral[100]}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#FFFFFF'}
                      >
                        {Icons.edit}
                        Modifier
                      </button>
                      <button
                        onClick={() => toggleStatus(offre)}
                        style={{
                          ...styles.actionButton,
                          color: offre.status === 'active' ? '#EF4444' : '#10B981',
                          borderColor: offre.status === 'active' ? '#FEE2E2' : '#D1FAE5',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = offre.status === 'active' ? '#FEE2E2' : '#D1FAE5'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#FFFFFF'}
                      >
                        {offre.status === 'active' ? Icons.xCircle : Icons.checkCircle}
                        {offre.status === 'active' ? 'Désactiver' : 'Activer'}
                      </button>
                      <button
                        onClick={() => deleteOffre(offre._id)}
                        style={{
                          ...styles.actionButton,
                          color: '#EF4444',
                          borderColor: '#FEE2E2',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#FEE2E2'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#FFFFFF'}
                      >
                        {Icons.trash}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📋</div>
            <h3 style={{ fontSize: professionalTheme.fontSizes.xl, fontWeight: 700, marginBottom: '0.5rem', color: professionalTheme.colors.neutral[900] }}>
              {search ? 'Aucune offre trouvée' : 'Aucune offre créée'}
            </h3>
            <p style={{ marginBottom: '1.5rem' }}>
              {search
                ? 'Essayez d\'autres termes de recherche'
                : 'Commencez par créer votre première offre d\'emploi'}
            </p>
            {!search && (
              <button
                onClick={openCreate}
                style={styles.createButton}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {Icons.plus}
                Créer une offre
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={styles.modal} onClick={(e) => e.target.style === styles.modal && setShowModal(false)}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {editOffre ? 'Modifier l\'offre' : 'Nouvelle offre'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: professionalTheme.colors.neutral[400] }}
              >
                ✕
              </button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Titre du poste *</label>
                <input
                  type="text"
                  value={form.titre}
                  onChange={set('titre')}
                  placeholder="Ex: Développeur Full Stack"
                  style={styles.formInput}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1, ...styles.formGroup }}>
                  <label style={styles.formLabel}>Type de contrat *</label>
                  <select
                    value={form.type}
                    onChange={set('type')}
                    style={styles.formSelect}
                  >
                    <option value="CDI">CDI</option>
                    <option value="CDD">CDD</option>
                    <option value="Stage">Stage</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Alternance">Alternance</option>
                  </select>
                </div>

                <div style={{ flex: 1, ...styles.formGroup }}>
                  <label style={styles.formLabel}>Lieu *</label>
                  <input
                    type="text"
                    value={form.lieu}
                    onChange={set('lieu')}
                    placeholder="Ex: Paris, Tunis"
                    style={styles.formInput}
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Salaire</label>
                <input
                  type="text"
                  value={form.salaire}
                  onChange={set('salaire')}
                  placeholder="Ex: 40-60k€, selon expérience"
                  style={styles.formInput}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Compétences requises</label>
                <input
                  type="text"
                  value={form.competences}
                  onChange={set('competences')}
                  placeholder="Ex: React, Node.js, MongoDB (séparées par des virgules)"
                  style={styles.formInput}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Description du poste</label>
                <textarea
                  value={form.description}
                  onChange={set('description')}
                  placeholder="Décrivez le poste, les responsabilités, les avantages..."
                  style={styles.formTextarea}
                />
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button
                onClick={() => setShowModal(false)}
                style={{ ...styles.button, ...styles.secondaryButton }}
                onMouseEnter={(e) => e.currentTarget.style.background = professionalTheme.colors.neutral[50]}
                onMouseLeave={(e) => e.currentTarget.style.background = '#FFFFFF'}
              >
                Annuler
              </button>
              <button
                onClick={saveOffre}
                style={{ ...styles.button, ...styles.primaryButton }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {editOffre ? 'Mettre à jour' : 'Créer l\'offre'}
              </button>
            </div>
          </div>
        </div>
      )}
    </RecruteurLayout>
  );
}

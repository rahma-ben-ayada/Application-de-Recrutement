import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { professionalTheme, professionalKeyframes } from '../../theme/professionalTheme';
import RecruteurLayout from '../../layouts/RecruteurLayout';
import api from '../../utils/api';

// Professional SVG Icons
const Icons = {
  calendar: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  clock: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  checkCircle: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  xCircle: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="15" y1="9" x2="9" y2="15"/>
      <line x1="9" y1="9" x2="15" y2="15"/>
    </svg>
  ),
  target: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  user: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  briefcase: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  video: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7"/>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
    </svg>
  ),
  externalLink: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
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
  plus: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  alertCircle: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
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

const emptyForm = { candidatureId: '', date: '', heure: '', lien: '', notes: '' };

export default function PlanifierEntretien() {
  const navigate = useNavigate();
  const [entretiens, setEntretiens] = useState([]);
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetchCandidatures();
    fetchEntretiens();
  }, []);

  const fetchCandidatures = async () => {
    try {
      const offresData = await api('/offres/mes');
      const offres = offresData.offres || [];
      let allCandidatures = [];
      for (const offre of offres) {
        try {
          const data = await api(`/candidatures/offre/${offre._id}`);
          const filtered = (data.candidatures || []).filter(
            c => c.statut === 'entretien' || c.statut === 'accepte'
          );
          allCandidatures = [...allCandidatures, ...filtered];
        } catch (e) {}
      }
      setCandidatures(allCandidatures);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchEntretiens = async () => {
    try {
      const data = await api('/entretiens/mes');
      setEntretiens(data.entretiens || []);
    } catch (err) {
      console.error(err);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const openCreate = () => {
    setEditId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (e) => {
    setEditId(e._id);
    setForm({
      candidatureId: e.candidature?._id || '',
      date: e.date ? new Date(e.date).toISOString().split('T')[0] : '',
      heure: e.heure || '',
      lien: e.lien || '',
      notes: e.notes || '',
    });
    setShowModal(true);
  };

  const save = async () => {
    if (!form.candidatureId || !form.date || !form.heure)
      return showMessage('error', 'Veuillez remplir tous les champs obligatoires');

    try {
      if (editId) {
        await api(`/entretiens/${editId}`, 'PUT', {
          date: form.date,
          heure: form.heure,
          lien: form.lien,
          notes: form.notes,
        });
        showMessage('success', 'Entretien modifié avec succès !');
      } else {
        await api('/entretiens', 'POST', form);
        showMessage('success', 'Entretien planifié avec succès !');
      }
      setShowModal(false);
      fetchEntretiens();
    } catch (err) {
      showMessage('error', err.message || 'Erreur lors de la sauvegarde');
    }
  };

  const deleteEntretien = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet entretien ?')) return;
    try {
      await api(`/entretiens/${id}`, 'DELETE');
      showMessage('success', 'Entretien supprimé avec succès');
      fetchEntretiens();
    } catch (err) {
      showMessage('error', err.message || 'Erreur lors de la suppression');
    }
  };

  const changeStatut = async (id, statut) => {
    try {
      await api(`/entretiens/${id}`, 'PUT', { statut });
      fetchEntretiens();
    } catch (err) {
      showMessage('error', err.message || 'Erreur lors de la modification');
    }
  };

  const getStatusConfig = (statut) => {
    const configs = {
      planifié: {
        bg: '#FEF3C7',
        color: '#D97706',
        label: 'Planifié',
        icon: Icons.clock,
      },
      accepté: {
        bg: '#D1FAE5',
        color: '#059669',
        label: 'Accepté',
        icon: Icons.checkCircle,
      },
      refusé: {
        bg: '#FEE2E2',
        color: '#DC2626',
        label: 'Refusé',
        icon: Icons.xCircle,
      },
    };
    return configs[statut] || configs.planifié;
  };

  const getInitials = (nom) => {
    if (!nom) return '?';
    return nom.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (nom) => {
    const colors = ['#5B73F7', '#10B981', '#8B5CF6', '#F59E0B', '#06B6D4', '#EC4899'];
    if (!nom) return colors[0];
    const index = nom.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const stats = {
    total: entretiens.length,
    planifié: entretiens.filter(e => e.statut === 'planifié').length,
    accepté: entretiens.filter(e => e.statut === 'accepté').length,
    refusé: entretiens.filter(e => e.statut === 'refusé').length,
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
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: '1.5rem',
      marginBottom: '2rem',
    },
    statCard: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      padding: '1.5rem',
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      boxShadow: professionalTheme.shadows.sm,
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    statIcon: {
      width: '56px',
      height: '56px',
      borderRadius: professionalTheme.radius.xl,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
    alert: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '1rem 1.5rem',
      borderRadius: professionalTheme.radius.xl,
      background: '#FEF3C7',
      border: '1px solid #FCD34D',
      color: '#92400E',
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 500,
    },
    table: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      boxShadow: professionalTheme.shadows.sm,
      overflow: 'hidden',
    },
    tableHeader: {
      background: professionalTheme.colors.neutral[50],
      padding: '1rem 1.5rem',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '2fr 1.5fr 1fr 1fr 1fr 1.5fr 1fr 0.5fr',
      gap: '1rem',
      fontWeight: 600,
      color: professionalTheme.colors.neutral[700],
      fontSize: professionalTheme.fontSizes.sm,
    },
    tableRow: {
      padding: '1.5rem',
      borderBottom: `1px solid ${professionalTheme.colors.neutral[100]}`,
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '2fr 1.5fr 1fr 1fr 1fr 1.5fr 1fr 0.5fr',
      gap: '1rem',
      alignItems: 'center',
      transition: professionalTheme.transitions.fast,
    },
    candidateCell: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    avatar: {
      width: '40px',
      height: '40px',
      borderRadius: professionalTheme.radius.full,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      color: '#FFFFFF',
    },
    candidateInfo: {
      flex: 1,
    },
    candidateName: {
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[900],
    },
    candidateEmail: {
      fontSize: professionalTheme.fontSizes.xs,
      color: professionalTheme.colors.neutral[500],
    },
    text: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[700],
    },
    meta: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
    },
    link: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem',
      padding: '0.25rem 0.75rem',
      borderRadius: professionalTheme.radius.full,
      background: '#EFF6FF',
      color: '#2563EB',
      fontSize: professionalTheme.fontSizes.xs,
      fontWeight: 500,
      textDecoration: 'none',
    },
    statusSelect: {
      padding: '0.25rem 0.75rem',
      borderRadius: professionalTheme.radius.full,
      border: 'none',
      fontSize: professionalTheme.fontSizes.xs,
      fontWeight: 600,
      cursor: 'pointer',
      outline: 'none',
    },
    actions: {
      display: 'flex',
      gap: '0.5rem',
    },
    actionButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.25rem',
      padding: '0.5rem',
      borderRadius: professionalTheme.radius.lg,
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      background: '#FFFFFF',
      cursor: 'pointer',
      transition: professionalTheme.transitions.fast,
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
    formInput: {
      width: '100%',
      padding: '0.75rem 1rem',
      borderRadius: professionalTheme.radius.lg,
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      background: '#FFFFFF',
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[700],
      outline: 'none',
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
      minHeight: '80px',
      resize: 'vertical',
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
  };

  if (loading) {
    return (
      <RecruteurLayout title="Planifier Entretien">
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
    <RecruteurLayout title="Planifier Entretien">
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
            <h1 style={styles.headerTitle}>Planifier des entretiens</h1>
            <p style={styles.headerSubtitle}>
              Organisez et gérez vos entretiens avec les candidats
            </p>
          </div>
          <button
            onClick={openCreate}
            style={styles.createButton}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {Icons.plus}
            Planifier un entretien
          </button>
        </div>

        {/* Alert if no eligible candidates */}
        {!loading && candidatures.length === 0 && (
          <div style={styles.alert}>
            {Icons.alertCircle}
            <span>
              Aucun candidat avec statut "Entretien" ou "Accepté".
              Allez dans <strong onClick={() => navigate('/recruteur/candidatures')} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Candidatures</strong> et changez le statut d'un candidat d'abord.
            </span>
          </div>
        )}

        {/* Stats */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: '#DBEAFE', color: '#1E3A8A' }}>
              {Icons.target}
            </div>
            <div>
              <div style={styles.statValue}>{stats.total}</div>
              <div style={styles.statLabel}>Total</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: '#FEF3C7', color: '#D97706' }}>
              {Icons.clock}
            </div>
            <div>
              <div style={{ ...styles.statValue, color: '#D97706' }}>{stats.planifié}</div>
              <div style={styles.statLabel}>Planifiés</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: '#D1FAE5', color: '#059669' }}>
              {Icons.checkCircle}
            </div>
            <div>
              <div style={{ ...styles.statValue, color: '#059669' }}>{stats.accepté}</div>
              <div style={styles.statLabel}>Acceptés</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: '#FEE2E2', color: '#DC2626' }}>
              {Icons.xCircle}
            </div>
            <div>
              <div style={{ ...styles.statValue, color: '#DC2626' }}>{stats.refusé}</div>
              <div style={styles.statLabel}>Refusés</div>
            </div>
          </div>
        </div>

        {/* Table */}
        {entretiens.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>
              {Icons.calendar}
            </div>
            <h3 style={{ fontSize: professionalTheme.fontSizes.xl, fontWeight: 700, marginBottom: '0.5rem', color: professionalTheme.colors.neutral[900] }}>
              Aucun entretien planifié
            </h3>
            <p style={{ marginBottom: '1.5rem' }}>
              Commencez par planifier votre premier entretien
            </p>
            {candidatures.length > 0 && (
              <button
                onClick={openCreate}
                style={styles.createButton}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {Icons.plus}
                Planifier un entretien
              </button>
            )}
          </div>
        ) : (
          <div style={styles.table}>
            <div style={styles.tableHeader}>
              <div>Candidat</div>
              <div>Offre</div>
              <div>Date</div>
              <div>Heure</div>
              <div>Lien</div>
              <div>Notes</div>
              <div>Statut</div>
              <div>Actions</div>
            </div>
            {entretiens.map((e, i) => {
              const statusConfig = getStatusConfig(e.statut);

              return (
                <div
                  key={e._id}
                  style={{
                    ...styles.tableRow,
                    background: i % 2 === 0 ? '#FFFFFF' : professionalTheme.colors.neutral[50],
                  }}
                  onMouseEnter={(event) => event.currentTarget.style.background = professionalTheme.colors.neutral[100]}
                  onMouseLeave={(event) => event.currentTarget.style.background = i % 2 === 0 ? '#FFFFFF' : professionalTheme.colors.neutral[50]}
                >
                  <div style={styles.candidateCell}>
                    <div style={{
                      ...styles.avatar,
                      background: getAvatarColor(e.candidat?.nom),
                    }}>
                      {getInitials(e.candidat?.nom)}
                    </div>
                    <div style={styles.candidateInfo}>
                      <div style={styles.candidateName}>
                        {e.candidat?.nom || 'Candidat inconnu'}
                      </div>
                      <div style={styles.candidateEmail}>
                        {e.candidat?.email || ''}
                      </div>
                    </div>
                  </div>

                  <div style={styles.text}>
                    <div style={styles.meta}>
                      {Icons.briefcase}
                      {' '}
                      {e.offre?.titre || '—'}
                    </div>
                  </div>

                  <div style={styles.text}>
                    <div style={styles.meta}>
                      {Icons.calendar}
                      {' '}
                      {e.date ? new Date(e.date).toLocaleDateString('fr-FR') : '—'}
                    </div>
                  </div>

                  <div style={styles.text}>
                    <div style={styles.meta}>
                      {Icons.clock}
                      {' '}
                      {e.heure || '—'}
                    </div>
                  </div>

                  <div>
                    {e.lien ? (
                      <a
                        href={e.lien}
                        target="_blank"
                        rel="noreferrer"
                        style={styles.link}
                      >
                        {Icons.video}
                        Rejoindre
                        {Icons.externalLink}
                      </a>
                    ) : (
                      <span style={{ fontSize: professionalTheme.fontSizes.xs, color: professionalTheme.colors.neutral[400] }}>
                        —
                      </span>
                    )}
                  </div>

                  <div style={{ ...styles.text, fontSize: professionalTheme.fontSizes.xs }}>
                    {e.notes ? (
                      <div style={styles.meta}>
                        {Icons.fileText}
                        {e.notes.substring(0, 30)}
                        {e.notes.length > 30 ? '...' : ''}
                      </div>
                    ) : (
                      <span style={{ color: professionalTheme.colors.neutral[400] }}>—</span>
                    )}
                  </div>

                  <div>
                    <select
                      value={e.statut}
                      onChange={(ev) => changeStatut(e._id, ev.target.value)}
                      style={{
                        ...styles.statusSelect,
                        background: statusConfig.bg,
                        color: statusConfig.color,
                      }}
                    >
                      <option value="planifié">Planifié</option>
                      <option value="accepté">Accepté</option>
                      <option value="refusé">Refusé</option>
                    </select>
                  </div>

                  <div style={styles.actions}>
                    <button
                      onClick={() => openEdit(e)}
                      style={{
                        ...styles.actionButton,
                        color: '#059669',
                        borderColor: '#D1FAE5',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#D1FAE5'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#FFFFFF'}
                      title="Modifier"
                    >
                      {Icons.edit}
                    </button>
                    <button
                      onClick={() => deleteEntretien(e._id)}
                      style={{
                        ...styles.actionButton,
                        color: '#EF4444',
                        borderColor: '#FEE2E2',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#FEE2E2'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#FFFFFF'}
                      title="Supprimer"
                    >
                      {Icons.trash}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={styles.modal} onClick={(e) => e.target.style === styles.modal && setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {editId ? 'Modifier l\'entretien' : 'Planifier un entretien'}
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
                <label style={styles.formLabel}>Candidat *</label>
                <select
                  value={form.candidatureId}
                  onChange={set('candidatureId')}
                  style={styles.formSelect}
                >
                  <option value="">Sélectionner un candidat</option>
                  {candidatures.map(c => (
                    <option key={c._id} value={c._id}>
                      {c.candidatId?.nom} - {c.offreId?.titre}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1, ...styles.formGroup }}>
                  <label style={styles.formLabel}>Date *</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={set('date')}
                    min={new Date().toISOString().split('T')[0]}
                    style={styles.formInput}
                  />
                </div>

                <div style={{ flex: 1, ...styles.formGroup }}>
                  <label style={styles.formLabel}>Heure *</label>
                  <input
                    type="time"
                    value={form.heure}
                    onChange={set('heure')}
                    style={styles.formInput}
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Lien de réunion (optionnel)</label>
                <input
                  type="url"
                  value={form.lien}
                  onChange={set('lien')}
                  placeholder="https://zoom.us/j/..."
                  style={styles.formInput}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Notes (optionnel)</label>
                <textarea
                  value={form.notes}
                  onChange={set('notes')}
                  placeholder="Notes pour l'entretien..."
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
                onClick={save}
                style={{ ...styles.button, ...styles.primaryButton }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {Icons.calendar}
                {editId ? 'Mettre à jour' : 'Planifier'}
              </button>
            </div>
          </div>
        </div>
      )}
    </RecruteurLayout>
  );
}

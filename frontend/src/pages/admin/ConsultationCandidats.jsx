import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import api from '../../utils/api';
import { professionalTheme } from '../../theme/professionalTheme';

// Modern SVG Icons
const Icons = {
  user: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  clock: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  checkCircle: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  ban: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
    </svg>
  ),
  shield: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  search: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  check: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  x: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  moreVertical: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1"/>
      <circle cx="12" cy="5" r="1"/>
      <circle cx="12" cy="19" r="1"/>
    </svg>
  ),
  trash: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  ),
  eye: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  brain: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 5.76-2.28"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-5.76-2.28"/>
    </svg>
  ),
  award: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7"/>
      <polyline points="8.21 13.89 7 23 12 23 17 13.89"/>
      <line x1="12" y1="23" x2="12" y2="23"/>
    </svg>
  ),
};

function ScoreCell() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{
        flex: 1, height: '6px', background: '#F1F5F9',
        borderRadius: '99px', overflow: 'hidden',
      }}>
        <div style={{ width: '0%', height: '100%', background: '#CBD5E1', borderRadius: '99px' }} />
      </div>
      <span style={{ fontSize: '12px', color: '#CBD5E1', fontWeight: '600', minWidth: '28px' }}>--</span>
    </div>
  );
}

export default function ConsultationCandidats() {
  const [candidats, setCandidats] = useState([]);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState('pending');
  const [filterStatus, setFilterStatus] = useState('tous');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const data = await api('/users');
      const candidatsList = data.users.filter(u => u.role === 'candidat');
      setCandidats(candidatsList);
      setPending(candidatsList.filter(u => u.status === 'pending'));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleValidate = async (id) => {
    try {
      await api(`/users/${id}/validate`, 'PUT');
      showMessage('success', 'Candidat validé !');
      fetchAll();
    } catch (err) {
      showMessage('error', err.message);
    }
  };

  const handleReject = async (id) => {
    try {
      await api(`/users/${id}/reject`, 'PUT');
      showMessage('error', 'Candidat refusé');
      fetchAll();
    } catch (err) {
      showMessage('error', err.message);
    }
  };

  const handleSuspend = async (id) => {
    try {
      await api(`/users/${id}/suspend`, 'PUT', { reason: 'Suspension administrative' });
      showMessage('warning', 'Compte suspendu');
      fetchAll();
    } catch (err) {
      showMessage('error', err.message);
    }
  };

  const handleActivate = async (id) => {
    try {
      await api(`/users/${id}/activate`, 'PUT');
      showMessage('success', 'Compte réactivé !');
      fetchAll();
    } catch (err) {
      showMessage('error', err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce candidat ?')) return;
    try {
      await api(`/users/${id}`, 'DELETE');
      showMessage('success', 'Candidat supprimé');
      if (selected?._id === id) setSelected(null);
      fetchAll();
    } catch (err) {
      showMessage('error', err.message);
    }
  };

  const statusBadge = (status) => {
    const styles = {
      pending:   { bg: '#FEF3C7', color: '#D97706', label: 'En attente', icon: Icons.clock },
      active:    { bg: '#D1FAE5', color: '#059669', label: 'Actif', icon: Icons.checkCircle },
      rejected:  { bg: '#FEE2E2', color: '#EF4444', label: 'Refusé', icon: Icons.ban },
      suspended: { bg: '#F3F4F6', color: '#6B7280', label: 'Suspendu', icon: Icons.shield },
    };
    const s = styles[status] || styles.pending;
    return (
      <span style={{
        background: s.bg, color: s.color,
        padding: '4px 12px', borderRadius: '50px',
        fontSize: '12px', fontWeight: '600',
        display: 'inline-flex', alignItems: 'center', gap: '6px',
      }}>
        <span style={{ display: 'flex', alignItems: 'center' }}>{s.icon}</span>
        {s.label}
      </span>
    );
  };

  const getInitials = (nom) => {
    if (!nom) return 'U';
    return nom.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (nom) => {
    const colors = ['#7C3AED', '#8B5CF6', '#A78BFA', '#C4B5FD'];
    if (!nom) return colors[0];
    const index = nom.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const currentList = activeTab === 'pending' ? pending : candidats;

  const filtered = currentList.filter(c => {
    const matchSearch =
      c.nom?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      (c.competences || []).some(k => k.toLowerCase().includes(search.toLowerCase()));
    const matchStatus =
      filterStatus === 'tous' ? true :
      filterStatus === 'actif' ? c.status === 'active' :
      c.status !== 'active';
    return matchSearch && matchStatus;
  });

  if (loading) {
    return (
      <AdminLayout title="Consultation des Candidats">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '48px', height: '48px',
              border: '4px solid #E5E7EB',
              borderTopColor: '#7C3AED',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <div style={{ color: professionalTheme.colors.neutral[600] }}>Chargement...</div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Consultation des Candidats">
      <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Message */}
        {message && (
          <div style={{
            padding: '12px 16px', borderRadius: '10px', marginBottom: '20px',
            background: message.type === 'success' ? '#D1FAE5' : message.type === 'warning' ? '#FEF3C7' : '#FEE2E2',
            color: message.type === 'success' ? '#059669' : message.type === 'warning' ? '#D97706' : '#EF4444',
            fontSize: '14px', fontWeight: '500',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            {message.text}
            <button onClick={() => setMessage(null)} style={{
              background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: 'inherit',
            }}>{Icons.x}</button>
          </div>
        )}

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: professionalTheme.fontSizes['2xl'], fontWeight: 800, color: professionalTheme.colors.neutral[900], marginBottom: '0.5rem' }}>
            Consultation des Candidats
          </h1>
          <p style={{ color: professionalTheme.colors.neutral[600] }}>Validez, gérez et suivez tous les candidats de la plateforme</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total candidats', value: candidats.length, color: '#7C3AED', bg: '#EDE9FE', icon: Icons.user },
            { label: 'En attente', value: candidats.filter(c => c.status === 'pending').length, color: '#D97706', bg: '#FEF3C7', icon: Icons.clock },
            { label: 'Actifs', value: candidats.filter(c => c.status === 'active').length, color: '#059669', bg: '#D1FAE5', icon: Icons.checkCircle },
            { label: 'Score IA', value: '--', color: '#CBD5E1', bg: '#F8FAFC', icon: Icons.brain },
          ].map((s, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: '14px', padding: '1.5rem',
              border: i === 3 ? '1.5px dashed #E2E8F0' : '1px solid #E2E8F0',
              display: 'flex', alignItems: 'center', gap: '1rem',
              boxShadow: professionalTheme.shadows.sm,
            }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: s.bg, color: s.color, display: 'flex', alignItems: 'center',
                justifyContent: 'center',
              }}>
                {s.icon}
              </div>
              <div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '24px', fontWeight: 800, color: s.color }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs + Filtres */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '4px', background: '#F1F5F9', padding: '4px', borderRadius: '10px' }}>
            {[
              { key: 'pending', label: 'En attente', count: pending.length },
              { key: 'all', label: 'Tous', count: candidats.length },
            ].map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
                padding: '10px 20px', border: 'none', cursor: 'pointer',
                background: activeTab === tab.key ? '#fff' : 'transparent',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '14px', fontWeight: 600,
                color: activeTab === tab.key ? '#7C3AED' : '#64748B',
                borderRadius: '8px',
                transition: '150ms',
                boxShadow: activeTab === tab.key ? professionalTheme.shadows.sm : 'none',
              }}>
                {tab.label} <span style={{
                  background: activeTab === tab.key ? '#EDE9FE' : '#E2E8F0',
                  color: activeTab === tab.key ? '#7C3AED' : '#64748B',
                  padding: '2px 8px', borderRadius: '12px', marginLeft: '8px', fontSize: '12px'
                }}>{tab.count}</span>
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }}>
                {Icons.search}
              </div>
              <input
                placeholder="Rechercher..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  height: '44px', padding: '0 12px 0 40px', borderRadius: '10px',
                  border: '1.5px solid #E2E8F0', fontFamily: 'DM Sans, sans-serif',
                  fontSize: '14px', outline: 'none', width: '220px', background: '#F8FAFC',
                }}
              />
            </div>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              style={{
                height: '44px', padding: '0 14px', borderRadius: '10px',
                border: '1.5px solid #E2E8F0', fontFamily: 'DM Sans, sans-serif',
                fontSize: '14px', outline: 'none', background: '#F8FAFC', cursor: 'pointer',
              }}
            >
              <option value="tous">Tous les statuts</option>
              <option value="actif">Actifs</option>
              <option value="inactif">Inactifs</option>
            </select>
          </div>
        </div>

        {/* Table + Panel */}
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 340px' : '1fr', gap: '1.5rem', transition: 'grid-template-columns 0.3s ease' }}>

          {/* Table */}
          <div style={{
            background: '#fff', borderRadius: '16px',
            border: '1px solid #E2E8F0', overflow: 'hidden',
            boxShadow: professionalTheme.shadows.sm,
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#F8FAFC' }}>
                <tr>
                  {['Candidat', 'Expérience', 'Compétences', 'Score IA', 'Statut'].map(h => (
                    <th key={h} style={{
                      padding: '14px 20px', textAlign: 'left',
                      color: '#64748B', fontSize: '12px', fontWeight: 600,
                      fontFamily: 'DM Sans, sans-serif', textTransform: 'uppercase', letterSpacing: '0.5px',
                    }}>
                      {h}
                    </th>
                  ))}
                  <th style={{ padding: '14px 20px' }}></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr
                    key={c._id}
                    onClick={() => setSelected(c)}
                    style={{
                      borderBottom: '1px solid #F1F5F9',
                      background: selected?._id === c._id ? '#F5F3FF' : i % 2 === 0 ? '#fff' : '#FAFAFA',
                      cursor: 'pointer',
                      transition: '150ms',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#F5F3FF'}
                    onMouseLeave={(e) => e.currentTarget.style.background = selected?._id === c._id ? '#F5F3FF' : i % 2 === 0 ? '#fff' : '#FAFAFA'}
                  >
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '40px', height: '40px', borderRadius: '10px',
                          background: getAvatarColor(c.nom),
                          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '14px', fontWeight: 600,
                        }}>
                          {getInitials(c.nom)}
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '500', color: '#1E293B' }}>{c.nom}</div>
                          <div style={{ fontSize: '12px', color: '#94A3B8' }}>{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px', color: '#64748B', fontSize: '14px' }}>
                      {c.experience ? `${c.experience} ans` : '—'}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {(c.competences || []).slice(0, 2).map((k, j) => (
                          <span key={j} style={{
                            background: '#F1F5F9', color: '#475569',
                            padding: '2px 8px', borderRadius: '4px',
                            fontSize: '11px', fontWeight: '500',
                          }}>
                            {k}
                          </span>
                        ))}
                        {(c.competences || []).length > 2 && (
                          <span style={{
                            background: '#E2E8F0', color: '#94A3B8',
                            padding: '2px 8px', borderRadius: '4px', fontSize: '11px',
                          }}>
                            +{c.competences.length - 2}
                          </span>
                        )}
                        {(c.competences || []).length === 0 && (
                          <span style={{ fontSize: '12px', color: '#CBD5E1' }}>—</span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px', minWidth: '120px' }}>
                      <ScoreCell />
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      {statusBadge(c.status)}
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: '4px' }}>
                        {Icons.moreVertical}
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{
                      textAlign: 'center', padding: '40px',
                      color: '#94A3B8', fontSize: '14px',
                    }}>
                      {activeTab === 'pending' ? 'Aucun candidat en attente !' : 'Aucun candidat trouvé'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Panel détail */}
          {selected && (
            <div style={{
              background: '#fff', borderRadius: '16px',
              border: '1px solid #E2E8F0', padding: '1.5rem',
              boxShadow: professionalTheme.shadows.sm, height: 'fit-content',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1E293B' }}>Profil Candidat</h3>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: '4px' }}>
                  {Icons.x}
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', padding: '1rem', background: '#F8FAFC', borderRadius: '10px' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '12px',
                  background: getAvatarColor(selected.nom),
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', fontWeight: 700,
                }}>
                  {getInitials(selected.nom)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#1E293B', fontSize: '16px' }}>{selected.nom}</div>
                  <div style={{ fontSize: '13px', color: '#64748B' }}>{selected.email}</div>
                </div>
              </div>

              {/* Score IA placeholder */}
              <div style={{
                background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
                border: '1.5px dashed #E2E8F0',
                borderRadius: '12px', padding: '1.5rem',
                textAlign: 'center', marginBottom: '1.5rem',
              }}>
                <div style={{ color: '#CBD5E1', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
                  {Icons.brain}
                </div>
                <div style={{ fontSize: '32px', fontWeight: 800, color: '#CBD5E1', fontFamily: 'Syne, sans-serif' }}>
                  -- / 100
                </div>
                <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '6px' }}>
                  Score IA — disponible après intégration ML
                </div>
              </div>

              {[
                { label: 'Expérience', value: selected.experience ? `${selected.experience} ans` : '—' },
                { label: 'Téléphone', value: selected.telephone || '—' },
                { label: 'Statut', value: statusBadge(selected.status) },
                { label: 'Inscrit le', value: new Date(selected.createdAt).toLocaleDateString('fr-FR') },
              ].map((f, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '10px 0', borderBottom: '1px solid #F1F5F9', fontSize: '13px',
                }}>
                  <span style={{ color: '#94A3B8' }}>{f.label}</span>
                  <span style={{ color: '#1E293B', fontWeight: '500' }}>{f.value}</span>
                </div>
              ))}

              {/* Compétences */}
              {(selected.competences || []).length > 0 && (
                <div style={{ marginTop: '16px' }}>
                  <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px', fontWeight: 600 }}>
                    Compétences
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {selected.competences.map((k, i) => (
                      <span key={i} style={{
                        background: '#F1F5F9', color: '#475569',
                        padding: '4px 12px', borderRadius: '6px',
                        fontSize: '12px', fontWeight: '500',
                      }}>
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div style={{ marginTop: '20px', display: 'grid', gap: '8px' }}>
                {(selected.status === 'pending' || selected.status === 'rejected') && (
                  <button onClick={() => handleValidate(selected._id)} style={{
                    padding: '10px', borderRadius: '8px', border: 'none',
                    background: '#059669', color: '#fff', fontSize: '14px', fontWeight: 600,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  }}>
                    {Icons.check} Valider
                  </button>
                )}
                {selected.status === 'pending' && (
                  <button onClick={() => handleReject(selected._id)} style={{
                    padding: '10px', borderRadius: '8px', border: '1px solid #FEE2E2',
                    background: '#FEF2F2', color: '#EF4444', fontSize: '14px', fontWeight: 600,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  }}>
                    {Icons.ban} Refuser
                  </button>
                )}
                {selected.status === 'active' && (
                  <button onClick={() => handleSuspend(selected._id)} style={{
                    padding: '10px', borderRadius: '8px', border: '1px solid #FEE2E2',
                    background: '#FEF2F2', color: '#EF4444', fontSize: '14px', fontWeight: 600,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  }}>
                    {Icons.shield} Suspendre
                  </button>
                )}
                {selected.status === 'suspended' && (
                  <button onClick={() => handleActivate(selected._id)} style={{
                    padding: '10px', borderRadius: '8px', border: 'none',
                    background: '#059669', color: '#fff', fontSize: '14px', fontWeight: 600,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  }}>
                    {Icons.award} Réactiver
                  </button>
                )}
                <button onClick={() => handleDelete(selected._id)} style={{
                  padding: '10px', borderRadius: '8px', border: '1px solid #FEE2E2',
                  background: '#FEF2F2', color: '#EF4444', fontSize: '14px', fontWeight: 600,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}>
                  {Icons.trash} Supprimer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

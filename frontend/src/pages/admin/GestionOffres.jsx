import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import api from '../../utils/api';
import { professionalTheme } from '../../theme/professionalTheme';

// Modern SVG Icons
const Icons = {
  briefcase: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
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
  search: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
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
  building: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
      <path d="M9 22v-4h6v4"/>
      <path d="M8 6h.01"/>
      <path d="M16 6h.01"/>
      <path d="M8 10h.01"/>
      <path d="M16 10h.01"/>
    </svg>
  ),
  calendar: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
};

export default function GestionOffres() {
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchOffres();
  }, []);

  const fetchOffres = async () => {
    try {
      const data = await api('/offres/all');
      setOffres(data.offres || []);
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

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette offre ?')) return;
    try {
      await api(`/offres/${id}`, 'DELETE');
      showMessage('success', 'Offre supprimée');
      if (selected?._id === id) setSelected(null);
      fetchOffres();
    } catch (err) {
      showMessage('error', err.message);
    }
  };

  const typeBadge = (type) => {
    const styles = {
      CDI:       { bg: '#DBEAFE', color: '#1E3A8A', label: 'CDI' },
      CDD:       { bg: '#FEF3C7', color: '#D97706', label: 'CDD' },
      Stage:     { bg: '#D1FAE5', color: '#059669', label: 'Stage' },
      Freelance: { bg: '#EDE9FE', color: '#7C3AED', label: 'Freelance' },
    };
    const s = styles[type] || { bg: '#F1F5F9', color: '#475569', label: type };
    return (
      <span style={{
        background: s.bg, color: s.color,
        padding: '4px 12px', borderRadius: '50px',
        fontSize: '12px', fontWeight: '600',
      }}>
        {s.label}
      </span>
    );
  };

  const statusBadge = (status) => {
    const styles = {
      active: { bg: '#D1FAE5', color: '#059669', label: 'Active', icon: Icons.checkCircle },
      closed: { bg: '#FEE2E2', color: '#EF4444', label: 'Fermée', icon: Icons.xCircle },
    };
    const s = styles[status] || styles.active;
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

  const filtered = offres.filter(o => {
    const matchSearch =
      o.titre?.toLowerCase().includes(search.toLowerCase()) ||
      o.lieu?.toLowerCase().includes(search.toLowerCase()) ||
      o.recruteur?.entreprise?.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'all' ? true : o.type === filterType;
    const matchStatus = filterStatus === 'all' ? true : o.status === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  if (loading) {
    return (
      <AdminLayout title="Gestion des Offres">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '48px', height: '48px',
              border: '4px solid #E5E7EB',
              borderTopColor: '#F59E0B',
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
    <AdminLayout title="Gestion des Offres">
      <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Message */}
        {message && (
          <div style={{
            padding: '12px 16px', borderRadius: '10px', marginBottom: '20px',
            background: message.type === 'success' ? '#D1FAE5' : '#FEE2E2',
            color: message.type === 'success' ? '#059669' : '#EF4444',
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
            Gestion des Offres
          </h1>
          <p style={{ color: professionalTheme.colors.neutral[600] }}>Consultez, gérez et modérez toutes les offres de la plateforme</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total offres', value: offres.length, color: '#1E3A8A', bg: '#DBEAFE', icon: Icons.briefcase },
            { label: 'Actives', value: offres.filter(o => o.status === 'active').length, color: '#059669', bg: '#D1FAE5', icon: Icons.checkCircle },
            { label: 'Fermées', value: offres.filter(o => o.status === 'closed').length, color: '#EF4444', bg: '#FEE2E2', icon: Icons.xCircle },
            { label: 'CDI', value: offres.filter(o => o.type === 'CDI').length, color: '#7C3AED', bg: '#EDE9FE', icon: Icons.briefcase },
          ].map((s, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: '14px', padding: '1.5rem',
              border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '1rem',
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

        {/* Filters */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              style={{
                height: '44px', padding: '0 14px', borderRadius: '10px',
                border: '1.5px solid #E2E8F0', fontFamily: 'DM Sans, sans-serif',
                fontSize: '14px', outline: 'none', background: '#F8FAFC', cursor: 'pointer',
              }}
            >
              <option value="all">Tous les types</option>
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
              <option value="Stage">Stage</option>
              <option value="Freelance">Freelance</option>
            </select>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              style={{
                height: '44px', padding: '0 14px', borderRadius: '10px',
                border: '1.5px solid #E2E8F0', fontFamily: 'DM Sans, sans-serif',
                fontSize: '14px', outline: 'none', background: '#F8FAFC', cursor: 'pointer',
              }}
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actives</option>
              <option value="closed">Fermées</option>
            </select>
          </div>

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
                fontSize: '14px', outline: 'none', width: '280px', background: '#F8FAFC',
              }}
            />
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
                  {['Titre', 'Entreprise', 'Type', 'Lieu', 'Statut', 'Date'].map(h => (
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
                {filtered.map((offre, i) => (
                  <tr
                    key={offre._id}
                    onClick={() => setSelected(offre)}
                    style={{
                      borderBottom: '1px solid #F1F5F9',
                      background: selected?._id === offre._id ? '#F8FAFC' : i % 2 === 0 ? '#fff' : '#FAFAFA',
                      cursor: 'pointer',
                      transition: '150ms',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                    onMouseLeave={(e) => e.currentTarget.style.background = selected?._id === offre._id ? '#F8FAFC' : i % 2 === 0 ? '#fff' : '#FAFAFA'}
                  >
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: 600, color: '#1E293B', fontSize: '14px' }}>
                        {offre.titre}
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          width: '32px', height: '32px', borderRadius: '8px',
                          background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {Icons.building}
                        </span>
                        <span style={{ color: '#64748B', fontSize: '14px' }}>
                          {offre.recruteur?.entreprise || '—'}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      {typeBadge(offre.type)}
                    </td>
                    <td style={{ padding: '16px 20px', color: '#64748B', fontSize: '14px' }}>
                      📍 {offre.lieu}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      {statusBadge(offre.status)}
                    </td>
                    <td style={{ padding: '16px 20px', color: '#64748B', fontSize: '13px' }}>
                      {new Date(offre.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: '4px' }}>
                        {Icons.eye}
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} style={{
                      textAlign: 'center', padding: '40px',
                      color: '#94A3B8', fontSize: '14px',
                    }}>
                      Aucune offre trouvée
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Detail Panel */}
          {selected && (
            <div style={{
              background: '#fff', borderRadius: '16px',
              border: '1px solid #E2E8F0', padding: '1.5rem',
              boxShadow: professionalTheme.shadows.sm, height: 'fit-content',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1E293B' }}>Détails de l'offre</h3>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: '4px' }}>
                  {Icons.x}
                </button>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '4px', fontWeight: 600 }}>Titre du poste</div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#1E293B' }}>{selected.titre}</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '4px', fontWeight: 600 }}>Entreprise</div>
                  <div style={{ fontSize: '14px', color: '#1E293B', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#F59E0B' }}>{Icons.building}</span>
                    {selected.recruteur?.entreprise || '—'}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '4px', fontWeight: 600 }}>Recruteur</div>
                  <div style={{ fontSize: '14px', color: '#1E293B', fontWeight: 500 }}>
                    {selected.recruteur?.nom || '—'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '4px', fontWeight: 600 }}>Type</div>
                  {typeBadge(selected.type)}
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '4px', fontWeight: 600 }}>Lieu</div>
                  <div style={{ fontSize: '14px', color: '#1E293B', fontWeight: 500 }}>
                    📍 {selected.lieu}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '4px', fontWeight: 600 }}>Statut</div>
                  {statusBadge(selected.status)}
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '4px', fontWeight: 600 }}>Description</div>
                <div style={{ fontSize: '14px', color: '#475569', lineHeight: '1.5', maxHeight: '100px', overflow: 'auto' }}>
                  {selected.description || 'Pas de description'}
                </div>
              </div>

              {(selected.competences || []).length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px', fontWeight: 600 }}>Compétences requises</div>
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

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '4px', fontWeight: 600 }}>Salaire</div>
                  <div style={{ fontSize: '14px', color: '#1E293B', fontWeight: 500 }}>
                    {selected.salaire || 'Non spécifié'}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '4px', fontWeight:600 }}>Date de publication</div>
                  <div style={{ fontSize: '14px', color: '#1E293B', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {Icons.calendar}
                    {new Date(selected.createdAt).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #F1F5F9' }}>
                <button onClick={() => handleDelete(selected._id)} style={{
                  width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #FEE2E2',
                  background: '#FEF2F2', color: '#EF4444', fontSize: '14px', fontWeight: 600,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#FEE2E2'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#FEF2F2'}
                >
                  {Icons.trash} Supprimer cette offre
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

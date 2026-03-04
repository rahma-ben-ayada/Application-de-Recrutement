import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import api from '../../utils/api';

export default function GestionOffres() {
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchOffres();
  }, []);

  const fetchOffres = async () => {
    try {
      const data = await api('/offres/all');
      setOffres(data.offres);
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
      showMessage('success', '🗑️ Offre supprimée');
      if (selected?._id === id) setSelected(null);
      fetchOffres();
    } catch (err) {
      showMessage('error', err.message);
    }
  };

  const typeBadge = (type) => {
    const styles = {
      CDI:       { bg: '#DBEAFE', color: '#1E3A8A' },
      CDD:       { bg: '#FEF3C7', color: '#D97706' },
      Stage:     { bg: '#D1FAE5', color: '#059669' },
      Freelance: { bg: '#EDE9FE', color: '#7C3AED' },
    };
    const s = styles[type] || { bg: '#F1F5F9', color: '#475569' };
    return (
      <span style={{
        background: s.bg, color: s.color,
        padding: '4px 10px', borderRadius: '50px',
        fontSize: '12px', fontWeight: '600',
      }}>
        {type}
      </span>
    );
  };

  const statusBadge = (status) => (
    <span style={{
      background: status === 'active' ? '#D1FAE5' : '#FEE2E2',
      color: status === 'active' ? '#059669' : '#EF4444',
      padding: '4px 10px', borderRadius: '50px',
      fontSize: '12px', fontWeight: '600',
    }}>
      {status === 'active' ? '✅ Active' : '❌ Fermée'}
    </span>
  );

  const filtered = offres.filter(o =>
    o.titre?.toLowerCase().includes(search.toLowerCase()) ||
    o.lieu?.toLowerCase().includes(search.toLowerCase()) ||
    o.recruteur?.entreprise?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Gestion des Offres">

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
          }}>✕</button>
        </div>
      )}

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total offres',  value: offres.length,                                        color: '#1E3A8A', bg: '#DBEAFE', icon: '📋' },
          { label: 'Actives',       value: offres.filter(o => o.status === 'active').length,     color: '#059669', bg: '#D1FAE5', icon: '✅' },
          { label: 'Fermées',       value: offres.filter(o => o.status === 'closed').length,     color: '#EF4444', bg: '#FEE2E2', icon: '❌' },
          { label: 'CDI',           value: offres.filter(o => o.type === 'CDI').length,          color: '#7C3AED', bg: '#EDE9FE', icon: '💼' },
        ].map((s, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: '14px', padding: '20px',
            border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '16px',
          }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: s.bg, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '22px',
            }}>
              {s.icon}
            </div>
            <div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '24px', fontWeight: '800', color: s.color }}>
                {s.value}
              </div>
              <div style={{ fontSize: '12px', color: '#94A3B8' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'flex-end' }}>
        <input
          placeholder="🔍 Rechercher une offre..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            height: '42px', padding: '0 16px', borderRadius: '10px',
            border: '1.5px solid #E2E8F0', fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px', outline: 'none', width: '280px', background: '#F8FAFC',
          }}
        />
      </div>

      {/* Table + Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 340px' : '1fr', gap: '20px' }}>

        {/* Table */}
        <div style={{
          background: '#fff', borderRadius: '16px',
          border: '1px solid #E2E8F0', overflow: 'hidden',
        }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#94A3B8' }}>
              Chargement...
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#1E3A8A' }}>
                    {['Titre', 'Recruteur', 'Lieu', 'Type', 'Salaire', 'Status', 'Date', 'Actions'].map(h => (
                      <th key={h} style={{
                        padding: '14px 16px', textAlign: 'left',
                        color: '#fff', fontSize: '13px', fontWeight: '600',
                        fontFamily: 'DM Sans, sans-serif', whiteSpace: 'nowrap',
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((o, i) => (
                    <tr key={o._id} style={{
                      borderBottom: '1px solid #F1F5F9',
                      background: selected?._id === o._id ? '#F0F9FF' : i % 2 === 0 ? '#fff' : '#FAFAFA',
                      transition: '150ms',
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = '#F1F5F9'}
                      onMouseLeave={e => e.currentTarget.style.background = selected?._id === o._id ? '#F0F9FF' : i % 2 === 0 ? '#fff' : '#FAFAFA'}
                    >
                      <td style={tdStyle}>
                        <div style={{ fontSize: '14px', fontWeight: '500', color: '#1E293B' }}>{o.titre}</div>
                      </td>
                      <td style={tdStyle}>
                        <div style={{ fontSize: '13px', color: '#1E293B' }}>{o.recruteur?.nom || '—'}</div>
                        <div style={{ fontSize: '11px', color: '#94A3B8' }}>{o.recruteur?.entreprise || '—'}</div>
                      </td>
                      <td style={tdStyle}>{o.lieu || '—'}</td>
                      <td style={tdStyle}>{typeBadge(o.type)}</td>
                      <td style={tdStyle}>{o.salaire || '—'}</td>
                      <td style={tdStyle}>{statusBadge(o.status)}</td>
                      <td style={tdStyle}>
                        {new Date(o.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                      <td style={{ ...tdStyle, whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button onClick={() => setSelected(selected?._id === o._id ? null : o)} style={btnStyle('#DBEAFE', '#1E3A8A')}>
                            👁
                          </button>
                          <button onClick={() => handleDelete(o._id)} style={btnStyle('#FEE2E2', '#EF4444')}>
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={8} style={{
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
          )}
        </div>

        {/* Panel détail */}
        {selected && (
          <div style={{
            background: '#fff', borderRadius: '16px', padding: '24px',
            border: '1px solid #E2E8F0', height: 'fit-content',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '16px', fontWeight: '700', color: '#1E293B' }}>
                Détail Offre
              </h3>
              <button onClick={() => setSelected(null)} style={{
                background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: '18px',
              }}>✕</button>
            </div>

            <div style={{
              background: '#EFF6FF', borderRadius: '12px', padding: '16px', marginBottom: '20px',
            }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '16px', fontWeight: '700', color: '#1E3A8A', marginBottom: '8px' }}>
                {selected.titre}
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {typeBadge(selected.type)}
                {statusBadge(selected.status)}
              </div>
            </div>

            {[
              { label: 'Recruteur',  value: selected.recruteur?.nom || '—' },
              { label: 'Entreprise', value: selected.recruteur?.entreprise || '—' },
              { label: 'Lieu',       value: selected.lieu || '—' },
              { label: 'Salaire',    value: selected.salaire || '—' },
              { label: 'Publié le',  value: new Date(selected.createdAt).toLocaleDateString('fr-FR') },
            ].map((f, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '10px 0', borderBottom: '1px solid #F1F5F9', fontSize: '13px',
              }}>
                <span style={{ color: '#94A3B8' }}>{f.label}</span>
                <span style={{ color: '#1E293B', fontWeight: '500' }}>{f.value}</span>
              </div>
            ))}

            {/* Description */}
            {selected.description && (
              <div style={{ marginTop: '16px' }}>
                <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                  Description
                </div>
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.7' }}>
                  {selected.description}
                </p>
              </div>
            )}

            {/* Compétences */}
            {(selected.competences || []).length > 0 && (
              <div style={{ marginTop: '16px' }}>
                <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                  Compétences requises
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {selected.competences.map((k, i) => (
                    <span key={i} style={{
                      background: '#DBEAFE', color: '#1E3A8A',
                      padding: '4px 12px', borderRadius: '6px',
                      fontSize: '12px', fontWeight: '500',
                    }}>
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action supprimer */}
            <button onClick={() => handleDelete(selected._id)} style={{
              width: '100%', padding: '10px', borderRadius: '8px',
              border: 'none', cursor: 'pointer', fontSize: '13px',
              fontWeight: '600', fontFamily: 'DM Sans, sans-serif',
              background: '#FEE2E2', color: '#EF4444', marginTop: '20px',
            }}>
              🗑️ Supprimer l'offre
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

const tdStyle = {
  padding: '14px 16px', fontSize: '14px',
  color: '#475569', fontFamily: 'DM Sans, sans-serif',
};

const btnStyle = (bg, color) => ({
  background: bg, color, border: 'none', borderRadius: '6px',
  padding: '6px 10px', fontSize: '12px', cursor: 'pointer',
  fontFamily: 'DM Sans, sans-serif', fontWeight: '500',
});
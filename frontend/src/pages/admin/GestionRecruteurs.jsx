import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import api from '../../utils/api';

export default function GestionRecruteurs() {
  const [recruteurs, setRecruteurs] = useState([]);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState('pending');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const allData = await api('/users');
      const recruteursList = allData.users.filter(u => u.role === 'recruteur');
      setRecruteurs(recruteursList);
      setPending(recruteursList.filter(u => u.status === 'pending'));
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
      showMessage('success', '✅ Recruteur validé avec succès !');
      fetchAll();
    } catch (err) {
      showMessage('error', err.message);
    }
  };

  const handleReject = async (id) => {
    try {
      await api(`/users/${id}/reject`, 'PUT');
      showMessage('warning', '❌ Recruteur refusé');
      fetchAll();
    } catch (err) {
      showMessage('error', err.message);
    }
  };

  const handleSuspend = async (id) => {
    try {
      await api(`/users/${id}/suspend`, 'PUT', { reason: 'Suspension administrative' });
      showMessage('warning', '🚫 Compte suspendu');
      fetchAll();
    } catch (err) {
      showMessage('error', err.message);
    }
  };

  const handleActivate = async (id) => {
    try {
      await api(`/users/${id}/activate`, 'PUT');
      showMessage('success', '✅ Compte réactivé !');
      fetchAll();
    } catch (err) {
      showMessage('error', err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce recruteur ?')) return;
    try {
      await api(`/users/${id}`, 'DELETE');
      showMessage('success', '🗑️ Recruteur supprimé');
      if (selected?._id === id) setSelected(null);
      fetchAll();
    } catch (err) {
      showMessage('error', err.message);
    }
  };

  const statusBadge = (status) => {
    const styles = {
      pending:   { bg: '#FEF3C7', color: '#D97706', label: '⏳ En attente' },
      active:    { bg: '#D1FAE5', color: '#059669', label: '✅ Actif' },
      rejected:  { bg: '#FEE2E2', color: '#EF4444', label: '❌ Refusé' },
      suspended: { bg: '#F3F4F6', color: '#6B7280', label: '🚫 Suspendu' },
    };
    const s = styles[status] || styles.pending;
    return (
      <span style={{
        background: s.bg, color: s.color,
        padding: '4px 10px', borderRadius: '50px',
        fontSize: '12px', fontWeight: '600',
      }}>
        {s.label}
      </span>
    );
  };

  const filtered = (activeTab === 'pending' ? pending : recruteurs).filter(r =>
    r.nom.toLowerCase().includes(search.toLowerCase()) ||
    r.entreprise?.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Gestion des Recruteurs">

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
          }}>✕</button>
        </div>
      )}

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total recruteurs', value: recruteurs.length,                                    color: '#1E3A8A', bg: '#DBEAFE', icon: '🏢' },
          { label: 'En attente',       value: recruteurs.filter(r => r.status === 'pending').length, color: '#D97706', bg: '#FEF3C7', icon: '⏳' },
          { label: 'Actifs',           value: recruteurs.filter(r => r.status === 'active').length,  color: '#059669', bg: '#D1FAE5', icon: '✅' },
          { label: 'Suspendus',        value: recruteurs.filter(r => r.status === 'suspended').length,color: '#EF4444', bg: '#FEE2E2', icon: '🚫' },
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

      {/* Tabs + Search */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #E2E8F0' }}>
          {[
            { key: 'pending', label: `⏳ En attente (${pending.length})` },
            { key: 'all',     label: `🏢 Tous (${recruteurs.length})` },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
              padding: '10px 20px', border: 'none', cursor: 'pointer',
              background: 'none', fontFamily: 'DM Sans, sans-serif',
              fontSize: '14px', fontWeight: '600',
              color: activeTab === tab.key ? '#1E3A8A' : '#94A3B8',
              borderBottom: activeTab === tab.key ? '2px solid #1E3A8A' : '2px solid transparent',
              marginBottom: '-2px', transition: '150ms',
            }}>
              {tab.label}
            </button>
          ))}
        </div>

        <input
          placeholder="🔍 Rechercher..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            height: '42px', padding: '0 16px', borderRadius: '10px',
            border: '1.5px solid #E2E8F0', fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px', outline: 'none', width: '260px', background: '#F8FAFC',
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
                    {['Recruteur', 'Entreprise', 'Secteur', 'Status', 'Date', 'Actions'].map(h => (
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
                  {filtered.map((r, i) => (
                    <tr key={r._id} style={{
                      borderBottom: '1px solid #F1F5F9',
                      background: selected?._id === r._id ? '#F0F9FF' : i % 2 === 0 ? '#fff' : '#FAFAFA',
                      transition: '150ms',
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = '#F1F5F9'}
                      onMouseLeave={e => e.currentTarget.style.background = selected?._id === r._id ? '#F0F9FF' : i % 2 === 0 ? '#fff' : '#FAFAFA'}
                    >
                      <td style={tdStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '36px', height: '36px', borderRadius: '50%',
                            background: '#DBEAFE', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', color: '#1E3A8A',
                            fontWeight: '700', fontSize: '14px',
                          }}>
                            {r.nom[0]}
                          </div>
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: '500', color: '#1E293B' }}>{r.nom}</div>
                            <div style={{ fontSize: '12px', color: '#94A3B8' }}>{r.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={tdStyle}>{r.entreprise || '—'}</td>
                      <td style={tdStyle}>{r.secteur || '—'}</td>
                      <td style={tdStyle}>{statusBadge(r.status)}</td>
                      <td style={tdStyle}>
                        {new Date(r.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                      <td style={{ ...tdStyle, whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button onClick={() => setSelected(selected?._id === r._id ? null : r)} style={btnStyle('#DBEAFE', '#1E3A8A')}>
                            👁
                          </button>
                          {(r.status === 'pending' || r.status === 'rejected') && (
                            <button onClick={() => handleValidate(r._id)} style={btnStyle('#D1FAE5', '#059669')}>
                              ✅
                            </button>
                          )}
                          {r.status === 'pending' && (
                            <button onClick={() => handleReject(r._id)} style={btnStyle('#FEE2E2', '#EF4444')}>
                              ❌
                            </button>
                          )}
                          {r.status === 'active' && (
                            <button onClick={() => handleSuspend(r._id)} style={btnStyle('#FEF3C7', '#D97706')}>
                              🚫
                            </button>
                          )}
                          {r.status === 'suspended' && (
                            <button onClick={() => handleActivate(r._id)} style={btnStyle('#D1FAE5', '#059669')}>
                              ▶️
                            </button>
                          )}
                          <button onClick={() => handleDelete(r._id)} style={btnStyle('#FEE2E2', '#EF4444')}>
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{
                        textAlign: 'center', padding: '40px',
                        color: '#94A3B8', fontSize: '14px',
                      }}>
                        {activeTab === 'pending' ? '✅ Aucun recruteur en attente !' : 'Aucun recruteur trouvé'}
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
                Fiche Recruteur
              </h3>
              <button onClick={() => setSelected(null)} style={{
                background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: '18px',
              }}>✕</button>
            </div>

            <div style={{
              width: '60px', height: '60px', borderRadius: '50%', background: '#DBEAFE',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#1E3A8A', fontWeight: '800', fontSize: '24px',
              fontFamily: 'Syne, sans-serif', margin: '0 auto 20px',
            }}>
              {selected.nom[0]}
            </div>

            {[
              { label: 'Nom complet',  value: selected.nom },
              { label: 'Email',        value: selected.email },
              { label: 'Entreprise',   value: selected.entreprise || '—' },
              { label: 'Secteur',      value: selected.secteur || '—' },
              { label: 'Téléphone',    value: selected.telephone || '—' },
              { label: 'Status',       value: selected.status },
              { label: 'Vérifié',      value: selected.isVerified ? '✅ Oui' : '❌ Non' },
              { label: 'Inscrit le',   value: new Date(selected.createdAt).toLocaleDateString('fr-FR') },
            ].map((f, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '10px 0', borderBottom: '1px solid #F1F5F9', fontSize: '13px',
              }}>
                <span style={{ color: '#94A3B8' }}>{f.label}</span>
                <span style={{ color: '#1E293B', fontWeight: '500' }}>{f.value}</span>
              </div>
            ))}

            {/* Actions dans le panel */}
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(selected.status === 'pending' || selected.status === 'rejected') && (
                <button onClick={() => handleValidate(selected._id)} style={{
                  ...fullBtnStyle, background: '#D1FAE5', color: '#059669',
                }}>
                  ✅ Valider le compte
                </button>
              )}
              {selected.status === 'pending' && (
                <button onClick={() => handleReject(selected._id)} style={{
                  ...fullBtnStyle, background: '#FEE2E2', color: '#EF4444',
                }}>
                  ❌ Refuser le compte
                </button>
              )}
              {selected.status === 'active' && (
                <button onClick={() => handleSuspend(selected._id)} style={{
                  ...fullBtnStyle, background: '#FEF3C7', color: '#D97706',
                }}>
                  🚫 Suspendre le compte
                </button>
              )}
              {selected.status === 'suspended' && (
                <button onClick={() => handleActivate(selected._id)} style={{
                  ...fullBtnStyle, background: '#D1FAE5', color: '#059669',
                }}>
                  ▶️ Réactiver le compte
                </button>
              )}
              <button onClick={() => handleDelete(selected._id)} style={{
                ...fullBtnStyle, background: '#FEE2E2', color: '#EF4444',
              }}>
                🗑️ Supprimer le compte
              </button>
            </div>
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

const fullBtnStyle = {
  width: '100%', padding: '10px', borderRadius: '8px',
  border: 'none', cursor: 'pointer', fontSize: '13px',
  fontWeight: '600', fontFamily: 'DM Sans, sans-serif',
};
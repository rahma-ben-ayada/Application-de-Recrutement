import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import api from '../../utils/api';

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
      showMessage('success', '✅ Candidat validé !');
      fetchAll();
    } catch (err) {
      showMessage('error', err.message);
    }
  };

  const handleReject = async (id) => {
    try {
      await api(`/users/${id}/reject`, 'PUT');
      showMessage('warning', '❌ Candidat refusé');
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
    if (!window.confirm('Supprimer ce candidat ?')) return;
    try {
      await api(`/users/${id}`, 'DELETE');
      showMessage('success', '🗑️ Candidat supprimé');
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

  const currentList = activeTab === 'pending' ? pending : candidats;

  const filtered = currentList.filter(c => {
    const matchSearch =
      c.nom.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.competences || []).some(k => k.toLowerCase().includes(search.toLowerCase()));
    const matchStatus =
      filterStatus === 'tous' ? true :
      filterStatus === 'actif' ? c.status === 'active' :
      c.status !== 'active';
    return matchSearch && matchStatus;
  });

  return (
    <AdminLayout title="Consultation des Candidats">

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
          { label: 'Total candidats', value: candidats.length,                                     color: '#7C3AED', bg: '#EDE9FE', icon: '👤' },
          { label: 'En attente',      value: candidats.filter(c => c.status === 'pending').length,  color: '#D97706', bg: '#FEF3C7', icon: '⏳' },
          { label: 'Actifs',          value: candidats.filter(c => c.status === 'active').length,   color: '#059669', bg: '#D1FAE5', icon: '✅' },
          { label: 'Score IA',        value: '--',                                                   color: '#CBD5E1', bg: '#F8FAFC', icon: '🤖' },
        ].map((s, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: '14px', padding: '20px',
            border: i === 3 ? '1.5px dashed #E2E8F0' : '1px solid #E2E8F0',
            display: 'flex', alignItems: 'center', gap: '16px',
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

      {/* Tabs + Filtres */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #E2E8F0' }}>
          {[
            { key: 'pending', label: `⏳ En attente (${pending.length})` },
            { key: 'all',     label: `👤 Tous (${candidats.length})` },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
              padding: '10px 20px', border: 'none', cursor: 'pointer',
              background: 'none', fontFamily: 'DM Sans, sans-serif',
              fontSize: '14px', fontWeight: '600',
              color: activeTab === tab.key ? '#7C3AED' : '#94A3B8',
              borderBottom: activeTab === tab.key ? '2px solid #7C3AED' : '2px solid transparent',
              marginBottom: '-2px', transition: '150ms',
            }}>
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            placeholder="🔍 Rechercher..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              height: '42px', padding: '0 16px', borderRadius: '10px',
              border: '1.5px solid #E2E8F0', fontFamily: 'DM Sans, sans-serif',
              fontSize: '14px', outline: 'none', width: '220px', background: '#F8FAFC',
            }}
          />
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            style={{
              height: '42px', padding: '0 14px', borderRadius: '10px',
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
                    {['Candidat', 'Expérience', 'Compétences', 'Score IA', 'Status', 'Date', 'Actions'].map(h => (
                      <th key={h} style={{
                        padding: '14px 16px', textAlign: 'left',
                        color: h === 'Score IA' ? '#93C5FD' : '#fff',
                        fontSize: '13px', fontWeight: '600',
                        fontFamily: 'DM Sans, sans-serif', whiteSpace: 'nowrap',
                      }}>
                        {h === 'Score IA' ? '🤖 ' + h : h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, i) => (
                    <tr key={c._id} style={{
                      borderBottom: '1px solid #F1F5F9',
                      background: selected?._id === c._id ? '#F5F3FF' : i % 2 === 0 ? '#fff' : '#FAFAFA',
                      transition: '150ms',
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = '#F5F3FF'}
                      onMouseLeave={e => e.currentTarget.style.background = selected?._id === c._id ? '#F5F3FF' : i % 2 === 0 ? '#fff' : '#FAFAFA'}
                    >
                      <td style={tdStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '36px', height: '36px', borderRadius: '50%',
                            background: '#EDE9FE', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', color: '#7C3AED',
                            fontWeight: '700', fontSize: '14px', flexShrink: 0,
                          }}>
                            {c.nom[0]}
                          </div>
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: '500', color: '#1E293B' }}>{c.nom}</div>
                            <div style={{ fontSize: '12px', color: '#94A3B8' }}>{c.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={tdStyle}>{c.experience ? `${c.experience} ans` : '—'}</td>
                      <td style={tdStyle}>
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
                      <td style={{ ...tdStyle, minWidth: '120px' }}>
                        <ScoreCell />
                      </td>
                      <td style={tdStyle}>{statusBadge(c.status)}</td>
                      <td style={tdStyle}>
                        {new Date(c.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                      <td style={{ ...tdStyle, whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button onClick={() => setSelected(selected?._id === c._id ? null : c)} style={btnStyle('#EDE9FE', '#7C3AED')}>
                            👁
                          </button>
                          {(c.status === 'pending' || c.status === 'rejected') && (
                            <button onClick={() => handleValidate(c._id)} style={btnStyle('#D1FAE5', '#059669')}>
                              ✅
                            </button>
                          )}
                          {c.status === 'pending' && (
                            <button onClick={() => handleReject(c._id)} style={btnStyle('#FEE2E2', '#EF4444')}>
                              ❌
                            </button>
                          )}
                          {c.status === 'active' && (
                            <button onClick={() => handleSuspend(c._id)} style={btnStyle('#FEF3C7', '#D97706')}>
                              🚫
                            </button>
                          )}
                          {c.status === 'suspended' && (
                            <button onClick={() => handleActivate(c._id)} style={btnStyle('#D1FAE5', '#059669')}>
                              ▶️
                            </button>
                          )}
                          <button onClick={() => handleDelete(c._id)} style={btnStyle('#FEE2E2', '#EF4444')}>
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{
                        textAlign: 'center', padding: '40px',
                        color: '#94A3B8', fontSize: '14px',
                      }}>
                        {activeTab === 'pending' ? '✅ Aucun candidat en attente !' : 'Aucun candidat trouvé'}
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
                Profil Candidat
              </h3>
              <button onClick={() => setSelected(null)} style={{
                background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: '18px',
              }}>✕</button>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: '#EDE9FE', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: '#7C3AED',
                fontWeight: '800', fontSize: '24px', fontFamily: 'Syne, sans-serif',
                margin: '0 auto 10px',
              }}>
                {selected.nom[0]}
              </div>
              <div style={{ fontWeight: '700', fontSize: '16px', color: '#1E293B', fontFamily: 'Syne, sans-serif' }}>
                {selected.nom}
              </div>
              <div style={{ fontSize: '13px', color: '#94A3B8' }}>{selected.email}</div>
            </div>

            {/* Score IA placeholder */}
            <div style={{
              background: '#F8FAFC', border: '2px dashed #E2E8F0',
              borderRadius: '12px', padding: '20px',
              textAlign: 'center', marginBottom: '20px',
            }}>
              <div style={{ fontSize: '28px', marginBottom: '6px' }}>🤖</div>
              <div style={{ fontSize: '32px', fontWeight: '800', color: '#CBD5E1', fontFamily: 'Syne, sans-serif' }}>
                -- / 100
              </div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '6px' }}>
                Score IA — disponible après intégration ML
              </div>
            </div>

            {[
              { label: 'Expérience',  value: selected.experience ? `${selected.experience} ans` : '—' },
              { label: 'Téléphone',   value: selected.telephone || '—' },
              { label: 'Status',      value: selected.status },
              { label: 'Vérifié',     value: selected.isVerified ? '✅ Oui' : '❌ Non' },
              { label: 'Inscrit le',  value: new Date(selected.createdAt).toLocaleDateString('fr-FR') },
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
                <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '.05em' }}>
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
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(selected.status === 'pending' || selected.status === 'rejected') && (
                <button onClick={() => handleValidate(selected._id)} style={{ ...fullBtnStyle, background: '#D1FAE5', color: '#059669' }}>
                  ✅ Valider le compte
                </button>
              )}
              {selected.status === 'pending' && (
                <button onClick={() => handleReject(selected._id)} style={{ ...fullBtnStyle, background: '#FEE2E2', color: '#EF4444' }}>
                  ❌ Refuser le compte
                </button>
              )}
              {selected.status === 'active' && (
                <button onClick={() => handleSuspend(selected._id)} style={{ ...fullBtnStyle, background: '#FEF3C7', color: '#D97706' }}>
                  🚫 Suspendre le compte
                </button>
              )}
              {selected.status === 'suspended' && (
                <button onClick={() => handleActivate(selected._id)} style={{ ...fullBtnStyle, background: '#D1FAE5', color: '#059669' }}>
                  ▶️ Réactiver le compte
                </button>
              )}
              <button onClick={() => handleDelete(selected._id)} style={{ ...fullBtnStyle, background: '#FEE2E2', color: '#EF4444' }}>
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
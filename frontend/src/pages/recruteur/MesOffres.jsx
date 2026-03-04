import React, { useState, useEffect } from 'react';
import RecruteurLayout from '../../layouts/RecruteurLayout';
import api from '../../utils/api';

const emptyForm = {
  titre: '', lieu: '', type: 'CDI', description: '', salaire: '', competences: '',
};

export default function MesOffres() {
  const [mesOffres, setMesOffres] = useState([]);
  const [toutesOffres, setToutesOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('mes');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editOffre, setEditOffre] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchMesOffres();
    fetchToutesOffres();
  }, []);

  const fetchMesOffres = async () => {
    try {
      const data = await api('/offres/mes');
      setMesOffres(data.offres);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchToutesOffres = async () => {
    try {
      const data = await api('/offres');
      setToutesOffres(data.offres);
    } catch (err) {
      console.error(err);
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
    if (!form.titre.trim()) return alert('Le titre est requis');
    if (!form.lieu.trim()) return alert('Le lieu est requis');

    const payload = {
      ...form,
      competences: form.competences
        ? form.competences.split(',').map(c => c.trim()).filter(Boolean)
        : [],
    };

    try {
      if (editOffre) {
        await api(`/offres/${editOffre._id}`, 'PUT', payload);
        showMessage('success', '✅ Offre modifiée avec succès !');
      } else {
        await api('/offres', 'POST', payload);
        showMessage('success', '✅ Offre créée avec succès !');
      }
      setShowModal(false);
      fetchMesOffres();
    } catch (err) {
      showMessage('error', err.message);
    }
  };

  const deleteOffre = async (id) => {
    if (!window.confirm('Supprimer cette offre ?')) return;
    try {
      await api(`/offres/${id}`, 'DELETE');
      showMessage('success', '🗑️ Offre supprimée');
      if (selected?._id === id) setSelected(null);
      fetchMesOffres();
    } catch (err) {
      showMessage('error', err.message);
    }
  };

  const toggleStatus = async (offre) => {
    try {
      await api(`/offres/${offre._id}`, 'PUT', {
        status: offre.status === 'active' ? 'closed' : 'active',
      });
      fetchMesOffres();
    } catch (err) {
      showMessage('error', err.message);
    }
  };

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const filteredMes = mesOffres.filter(o =>
    o.titre?.toLowerCase().includes(search.toLowerCase()) ||
    o.lieu?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredTous = toutesOffres.filter(o =>
    o.titre?.toLowerCase().includes(search.toLowerCase()) ||
    o.lieu?.toLowerCase().includes(search.toLowerCase()) ||
    o.recruteur?.entreprise?.toLowerCase().includes(search.toLowerCase())
  );

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

  return (
    <RecruteurLayout title="Offres d'emploi">

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

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {[
          { key: 'mes',  label: `📋 Mes offres (${mesOffres.length})` },
          { key: 'tous', label: `👁 Toutes les offres (${toutesOffres.length})` },
        ].map(t => (
          <button key={t.key} onClick={() => { setActiveTab(t.key); setSelected(null); setSearch(''); }} style={{
            padding: '10px 20px', borderRadius: '10px', border: 'none',
            cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px', fontWeight: '500',
            background: activeTab === t.key ? '#1E3A8A' : '#fff',
            color: activeTab === t.key ? '#fff' : '#475569',
            boxShadow: '0 1px 3px rgba(15,23,42,.08)',
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ===== MES OFFRES ===== */}
      {activeTab === 'mes' && (
        <>
          {/* Stats + actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { label: 'Total',     value: mesOffres.length,                                    color: '#1E3A8A', bg: '#DBEAFE' },
                { label: 'Actives',   value: mesOffres.filter(o => o.status === 'active').length,  color: '#059669', bg: '#D1FAE5' },
                { label: 'Fermées',   value: mesOffres.filter(o => o.status === 'closed').length,  color: '#EF4444', bg: '#FEE2E2' },
              ].map((s, i) => (
                <div key={i} style={{
                  background: '#fff', borderRadius: '12px', padding: '12px 20px',
                  border: '1px solid #E2E8F0', textAlign: 'center',
                  display: 'flex', alignItems: 'center', gap: '12px',
                }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '8px',
                    background: s.bg, display: 'flex', alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <div style={{ fontSize: '16px', fontWeight: '800', color: s.color, fontFamily: 'Syne, sans-serif' }}>
                      {s.value}
                    </div>
                  </div>
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                placeholder="🔍 Rechercher..."
                value={search} onChange={e => setSearch(e.target.value)}
                style={searchStyle}
              />
              <button onClick={openCreate} style={createBtnStyle}>
                ➕ Nouvelle offre
              </button>
            </div>
          </div>

          {/* Table */}
          <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 340px' : '1fr', gap: '20px' }}>
            <div style={{
              background: '#fff', borderRadius: '16px',
              border: '1px solid #E2E8F0', overflow: 'hidden',
            }}>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#94A3B8' }}>Chargement...</div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#1E3A8A' }}>
                        {['Titre', 'Lieu', 'Type', 'Salaire', 'Status', 'Date', 'Actions'].map(h => (
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
                      {filteredMes.map((o, i) => (
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
                          <td style={tdStyle}>📍 {o.lieu}</td>
                          <td style={tdStyle}>{typeBadge(o.type)}</td>
                          <td style={tdStyle}>{o.salaire || '—'}</td>
                          <td style={tdStyle}>
                            <span style={{
                              background: o.status === 'active' ? '#D1FAE5' : '#FEE2E2',
                              color: o.status === 'active' ? '#059669' : '#EF4444',
                              padding: '4px 10px', borderRadius: '50px',
                              fontSize: '12px', fontWeight: '600',
                            }}>
                              {o.status === 'active' ? '✅ Active' : '❌ Fermée'}
                            </span>
                          </td>
                          <td style={tdStyle}>
                            {new Date(o.createdAt).toLocaleDateString('fr-FR')}
                          </td>
                          <td style={{ ...tdStyle, whiteSpace: 'nowrap' }}>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button onClick={() => setSelected(selected?._id === o._id ? null : o)} style={btnStyle('#DBEAFE', '#1E3A8A')}>👁</button>
                              <button onClick={() => openEdit(o)} style={btnStyle('#D1FAE5', '#059669')}>✏️</button>
                              <button onClick={() => toggleStatus(o)} style={btnStyle('#FEF3C7', '#D97706')}>
                                {o.status === 'active' ? '⏸' : '▶'}
                              </button>
                              <button onClick={() => deleteOffre(o._id)} style={btnStyle('#FEE2E2', '#EF4444')}>🗑️</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredMes.length === 0 && (
                        <tr>
                          <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: '#94A3B8', fontSize: '14px' }}>
                            Aucune offre — cliquez sur "Nouvelle offre" pour commencer !
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
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '16px', fontWeight: '700', color: '#1E293B' }}>
                    Détail offre
                  </h3>
                  <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: '18px' }}>✕</button>
                </div>

                <div style={{
                  background: '#EFF6FF', borderRadius: '12px', padding: '16px', marginBottom: '16px',
                }}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '15px', fontWeight: '700', color: '#1E3A8A', marginBottom: '8px' }}>
                    {selected.titre}
                  </div>
                  {typeBadge(selected.type)}
                </div>

                {[
                  { label: 'Lieu',      value: selected.lieu || '—' },
                  { label: 'Salaire',   value: selected.salaire || '—' },
                  { label: 'Status',    value: selected.status === 'active' ? '✅ Active' : '❌ Fermée' },
                  { label: 'Publié le', value: new Date(selected.createdAt).toLocaleDateString('fr-FR') },
                ].map((f, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between',
                    padding: '10px 0', borderBottom: '1px solid #F1F5F9', fontSize: '13px',
                  }}>
                    <span style={{ color: '#94A3B8' }}>{f.label}</span>
                    <span style={{ color: '#1E293B', fontWeight: '500' }}>{f.value}</span>
                  </div>
                ))}

                {selected.description && (
                  <div style={{ marginTop: '16px' }}>
                    <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '.05em' }}>Description</div>
                    <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.7' }}>{selected.description}</p>
                  </div>
                )}

                {(selected.competences || []).length > 0 && (
                  <div style={{ marginTop: '16px' }}>
                    <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '.05em' }}>Compétences</div>
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

                <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
                  <button onClick={() => openEdit(selected)} style={{ ...fullBtnStyle, background: '#DBEAFE', color: '#1E3A8A' }}>
                    ✏️ Modifier
                  </button>
                  <button onClick={() => deleteOffre(selected._id)} style={{ ...fullBtnStyle, background: '#FEE2E2', color: '#EF4444' }}>
                    🗑️ Supprimer
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* ===== TOUTES LES OFFRES ===== */}
      {activeTab === 'tous' && (
        <>
          <div style={{
            background: '#EFF6FF', border: '1px solid #BFDBFE',
            borderRadius: '10px', padding: '12px 20px',
            color: '#1E3A8A', fontSize: '13px', fontWeight: '500',
            marginBottom: '20px',
          }}>
            👁 Mode consultation uniquement
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
            <input
              placeholder="🔍 Rechercher par titre, lieu, entreprise..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{ ...searchStyle, width: '300px' }}
            />
          </div>

          <div style={{
            background: '#fff', borderRadius: '16px',
            border: '1px solid #E2E8F0', overflow: 'hidden',
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#1E3A8A' }}>
                    {['Titre', 'Recruteur', 'Entreprise', 'Lieu', 'Type', 'Date'].map(h => (
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
                  {filteredTous.map((o, i) => (
                    <tr key={o._id} style={{
                      borderBottom: '1px solid #F1F5F9',
                      background: i % 2 === 0 ? '#fff' : '#FAFAFA',
                      transition: '150ms',
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = '#F1F5F9'}
                      onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#FAFAFA'}
                    >
                      <td style={tdStyle}>
                        <div style={{ fontSize: '14px', fontWeight: '500', color: '#1E293B' }}>{o.titre}</div>
                      </td>
                      <td style={tdStyle}>{o.recruteur?.nom || '—'}</td>
                      <td style={tdStyle}>{o.recruteur?.entreprise || '—'}</td>
                      <td style={tdStyle}>📍 {o.lieu}</td>
                      <td style={tdStyle}>{typeBadge(o.type)}</td>
                      <td style={tdStyle}>{new Date(o.createdAt).toLocaleDateString('fr-FR')}</td>
                    </tr>
                  ))}
                  {filteredTous.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: '#94A3B8', fontSize: '14px' }}>
                        Aucune offre trouvée
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Modal Créer/Modifier */}
      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(15,23,42,.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
        }} onClick={() => setShowModal(false)}>
          <div style={{
            background: '#fff', borderRadius: '16px', padding: '32px',
            width: '100%', maxWidth: '500px',
            boxShadow: '0 20px 48px rgba(15,23,42,.2)',
            maxHeight: '90vh', overflowY: 'auto',
          }} onClick={e => e.stopPropagation()}>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '20px', fontWeight: '700', color: '#1E293B' }}>
                {editOffre ? "Modifier l'offre" : 'Nouvelle offre'}
              </h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: '18px' }}>✕</button>
            </div>

            {[
              { label: 'Titre du poste *', key: 'titre', placeholder: 'Ex: Développeur React' },
              { label: 'Lieu *',           key: 'lieu',  placeholder: 'Ex: Tunis, Remote...' },
              { label: 'Salaire',          key: 'salaire', placeholder: 'Ex: 2000-3000 TND' },
              { label: 'Compétences (séparées par virgule)', key: 'competences', placeholder: 'Ex: React, Node.js, MongoDB' },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>{f.label}</label>
                <input
                  placeholder={f.placeholder}
                  value={form[f.key]} onChange={set(f.key)}
                  style={inputStyle}
                />
              </div>
            ))}

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Type de contrat</label>
              <select value={form.type} onChange={set('type')} style={inputStyle}>
                <option>CDI</option>
                <option>CDD</option>
                <option>Stage</option>
                <option>Freelance</option>
              </select>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>Description</label>
              <textarea
                placeholder="Décrivez le poste..."
                value={form.description} onChange={set('description')}
                rows={4}
                style={{ ...inputStyle, height: 'auto', padding: '12px 14px', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowModal(false)} style={cancelBtnStyle}>Annuler</button>
              <button onClick={saveOffre} style={saveBtnStyle}>
                {editOffre ? 'Enregistrer' : "Créer l'offre"}
              </button>
            </div>
          </div>
        </div>
      )}
    </RecruteurLayout>
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
  flex: 1, padding: '10px', borderRadius: '8px',
  border: 'none', cursor: 'pointer', fontSize: '13px',
  fontWeight: '600', fontFamily: 'DM Sans, sans-serif',
};

const searchStyle = {
  height: '42px', padding: '0 16px', borderRadius: '10px',
  border: '1.5px solid #E2E8F0', fontFamily: 'DM Sans, sans-serif',
  fontSize: '14px', outline: 'none', background: '#F8FAFC', width: '220px',
};

const createBtnStyle = {
  height: '42px', padding: '0 20px', borderRadius: '10px',
  background: '#1E3A8A', color: '#fff', border: 'none',
  fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
  fontWeight: '500', cursor: 'pointer',
};

const saveBtnStyle = {
  flex: 1, height: '44px', borderRadius: '50px', border: 'none',
  background: '#1E3A8A', color: '#fff', cursor: 'pointer',
  fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: '500',
};

const cancelBtnStyle = {
  flex: 1, height: '44px', borderRadius: '50px',
  border: '1.5px solid #E2E8F0', background: '#fff',
  cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
  fontSize: '14px', color: '#475569',
};

const labelStyle = {
  fontSize: '13px', fontWeight: '500', color: '#475569',
  display: 'block', marginBottom: '6px',
};

const inputStyle = {
  width: '100%', height: '42px', padding: '0 14px',
  border: '1.5px solid #E2E8F0', borderRadius: '10px',
  fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
  outline: 'none', boxSizing: 'border-box', background: '#F8FAFC',
};
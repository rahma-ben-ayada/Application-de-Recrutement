import React, { useState, useEffect } from 'react';
import RecruteurLayout from '../../layouts/RecruteurLayout';
import api from '../../utils/api';

const statutColors = {
  'planifié': { bg: '#FFF7ED', color: '#FB923C' },
  'accepté':  { bg: '#F0FDF4', color: '#059669' },
  'refusé':   { bg: '#FEF2F2', color: '#EF4444' },
};

const emptyForm = { candidatureId: '', date: '', heure: '', lien: '', notes: '' };

export default function PlanifierEntretien() {
  const [entretiens, setEntretiens] = useState([]);
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState(null);

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
      return alert('Remplissez tous les champs obligatoires !');

    try {
      if (editId) {
        await api(`/entretiens/${editId}`, 'PUT', {
          date: form.date,
          heure: form.heure,
          lien: form.lien,
          notes: form.notes,
        });
        showMessage('success', '✅ Entretien modifié !');
      } else {
        await api('/entretiens', 'POST', form);
        showMessage('success', '✅ Entretien planifié !');
      }
      setShowModal(false);
      fetchEntretiens();
    } catch (err) {
      showMessage('error', err.message || 'Erreur lors de la sauvegarde');
    }
  };

  const deleteEntretien = async (id) => {
    if (!window.confirm('Supprimer cet entretien ?')) return;
    try {
      await api(`/entretiens/${id}`, 'DELETE');
      showMessage('success', '🗑️ Entretien supprimé');
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

  return (
    <RecruteurLayout title="Planifier un entretien">

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
          <button onClick={() => setMessage(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: 'inherit' }}>✕</button>
        </div>
      )}

      {/* Stats + bouton */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr) auto', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total',     value: entretiens.length,                                      color: '#1E3A8A', bg: '#DBEAFE', icon: '🎯' },
          { label: 'Planifiés', value: entretiens.filter(e => e.statut === 'planifié').length,  color: '#D97706', bg: '#FEF3C7', icon: '⏳' },
          { label: 'Acceptés',  value: entretiens.filter(e => e.statut === 'accepté').length,   color: '#059669', bg: '#D1FAE5', icon: '✅' },
          { label: 'Refusés',   value: entretiens.filter(e => e.statut === 'refusé').length,    color: '#EF4444', bg: '#FEE2E2', icon: '❌' },
        ].map((s, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: '14px', padding: '20px',
            border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '10px',
              background: s.bg, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '20px', flexShrink: 0,
            }}>
              {s.icon}
            </div>
            <div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '22px', fontWeight: '800', color: s.color }}>
                {s.value}
              </div>
              <div style={{ fontSize: '12px', color: '#94A3B8' }}>{s.label}</div>
            </div>
          </div>
        ))}
        <button onClick={openCreate} style={{
          padding: '0 24px', borderRadius: '14px', border: 'none',
          background: '#1E3A8A', color: '#fff', cursor: 'pointer',
          fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: '600',
          whiteSpace: 'nowrap',
        }}>
          ➕ Planifier
        </button>
      </div>

      {/* Info si aucun candidat accepté */}
      {!loading && candidatures.length === 0 && (
        <div style={{
          background: '#FEF3C7', border: '1px solid #FCD34D',
          borderRadius: '10px', padding: '14px 20px',
          color: '#92400E', fontSize: '13px', marginBottom: '20px',
        }}>
          ⚠️ Aucun candidat avec statut "Entretien" ou "Accepté". Allez dans Candidatures et changez le statut d'un candidat d'abord.
        </div>
      )}

      {/* Table */}
      <div style={{
        background: '#fff', borderRadius: '16px',
        border: '1px solid #E2E8F0', overflow: 'hidden',
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#1E3A8A' }}>
                {['Candidat', 'Offre', 'Date', 'Heure', 'Lien', 'Notes', 'Statut', 'Actions'].map(h => (
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
              {entretiens.map((e, i) => (
                <tr key={e._id} style={{
                  borderBottom: '1px solid #F1F5F9',
                  background: i % 2 === 0 ? '#fff' : '#FAFAFA',
                  transition: '150ms',
                }}
                  onMouseEnter={ev => ev.currentTarget.style.background = '#F1F5F9'}
                  onMouseLeave={ev => ev.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#FAFAFA'}
                >
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '34px', height: '34px', borderRadius: '50%',
                        background: '#DBEAFE', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', color: '#1E3A8A',
                        fontWeight: '700', fontSize: '13px', flexShrink: 0,
                      }}>
                        {(e.candidat?.nom || '?')[0]}
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#1E293B' }}>
                          {e.candidat?.nom || '—'}
                        </div>
                        <div style={{ fontSize: '11px', color: '#94A3B8' }}>
                          {e.candidat?.email || ''}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <span style={{ fontSize: '12px', color: '#475569' }}>
                      {e.offre?.titre || '—'}
                    </span>
                  </td>
                  <td style={tdStyle}>📅 {e.date ? new Date(e.date).toLocaleDateString('fr-FR') : '—'}</td>
                  <td style={tdStyle}>🕐 {e.heure || '—'}</td>
                  <td style={tdStyle}>
                    {e.lien ? (
                      <a href={e.lien} target="_blank" rel="noreferrer" style={{
                        fontSize: '12px', color: '#2563EB', textDecoration: 'none',
                        background: '#EFF6FF', padding: '4px 10px', borderRadius: '6px',
                      }}>
                        🔗 Rejoindre
                      </a>
                    ) : '—'}
                  </td>
                  <td style={{ ...tdStyle, maxWidth: '150px' }}>
                    <span style={{ fontSize: '12px', color: '#94A3B8' }}>
                      {e.notes || '—'}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <select
                      value={e.statut}
                      onChange={ev => changeStatut(e._id, ev.target.value)}
                      style={{
                        background: statutColors[e.statut]?.bg || '#F3F4F6',
                        color: statutColors[e.statut]?.color || '#6B7280',
                        border: 'none', borderRadius: '50px',
                        padding: '4px 10px', fontSize: '12px',
                        fontWeight: '600', cursor: 'pointer',
                        fontFamily: 'DM Sans, sans-serif', outline: 'none',
                      }}
                    >
                      <option value="planifié">Planifié</option>
                      <option value="accepté">Accepté</option>
                      <option value="refusé">Refusé</option>
                    </select>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button onClick={() => openEdit(e)} style={btnStyle('#D1FAE5', '#059669')}>✏️</button>
                      <button onClick={() => deleteEntretien(e._id)} style={btnStyle('#FEE2E2', '#EF4444')}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
              {entretiens.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: '#94A3B8', fontSize: '14px' }}>
                    Aucun entretien planifié — cliquez sur "Planifier" pour commencer
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
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
                {editId ? "Modifier l'entretien" : 'Planifier un entretien'}
              </h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: '18px' }}>✕</button>
            </div>

            {/* Candidat */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Candidat *</label>
              {loading ? (
                <div style={{ color: '#94A3B8', fontSize: '13px' }}>Chargement...</div>
              ) : candidatures.length === 0 ? (
                <div style={{
                  background: '#FEF3C7', borderRadius: '8px', padding: '10px 14px',
                  fontSize: '13px', color: '#92400E',
                }}>
                  ⚠️ Aucun candidat disponible. Changez d'abord le statut d'une candidature à "Entretien".
                </div>
              ) : (
                <select value={form.candidatureId} onChange={set('candidatureId')} style={selectStyle}>
                  <option value="">Sélectionner un candidat</option>
                  {candidatures.map(c => (
                    <option key={c._id} value={c._id}>
                      {c.candidat?.nom || '—'} — {c.offre?.titre || '—'}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Date + Heure */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={labelStyle}>Date *</label>
                <input type="date" value={form.date} onChange={set('date')} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Heure *</label>
                <input type="time" value={form.heure} onChange={set('heure')} style={inputStyle} />
              </div>
            </div>

            {/* Lien */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Lien (Google Meet / Zoom)</label>
              <input
                type="url"
                placeholder="https://meet.google.com/..."
                value={form.lien}
                onChange={set('lien')}
                style={inputStyle}
              />
            </div>

            {/* Notes */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Notes</label>
              <textarea
                placeholder="Instructions, remarques..."
                value={form.notes}
                onChange={set('notes')}
                rows={3}
                style={{ ...inputStyle, height: 'auto', padding: '10px 14px', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowModal(false)} style={{
                flex: 1, height: '44px', borderRadius: '50px',
                border: '1.5px solid #E2E8F0', background: '#fff',
                cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#475569',
              }}>
                Annuler
              </button>
              <button onClick={save} style={{
                flex: 1, height: '44px', borderRadius: '50px', border: 'none',
                background: '#1E3A8A', color: '#fff', cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: '500',
              }}>
                {editId ? 'Enregistrer' : 'Planifier'}
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

const inputStyle = {
  width: '100%', height: '42px', padding: '0 14px',
  border: '1.5px solid #E2E8F0', borderRadius: '10px',
  fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
  outline: 'none', boxSizing: 'border-box', background: '#F8FAFC',
};

const selectStyle = {
  width: '100%', height: '42px', padding: '0 14px',
  border: '1.5px solid #E2E8F0', borderRadius: '10px',
  fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
  outline: 'none', background: '#F8FAFC', cursor: 'pointer',
};

const labelStyle = {
  fontSize: '13px', fontWeight: '500', color: '#475569',
  display: 'block', marginBottom: '6px',
};

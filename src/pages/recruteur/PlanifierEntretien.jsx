import React, { useState } from 'react';
import RecruteurLayout from '../../layouts/RecruteurLayout';

const candidats = [
  { id: 1, name: 'Yasmine Benali', offre: 'Développeur React Senior' },
  { id: 2, name: 'Karim Mansouri', offre: 'Data Scientist' },
  { id: 3, name: 'Lina Cherif',    offre: 'UX/UI Designer' },
];

const initialEntretiens = [
  { id: 1, candidatId: 1, date: '2026-02-25', heure: '10:00', lien: 'https://meet.google.com/abc', statut: 'Planifié' },
  { id: 2, candidatId: 2, date: '2026-02-26', heure: '14:30', lien: 'https://zoom.us/j/123', statut: 'Accepté' },
];

const statutColors = {
  'Planifié': { bg: '#FFF7ED', color: '#FB923C' },
  'Accepté':  { bg: '#F0FDF4', color: '#059669' },
  'Refusé':   { bg: '#FEF2F2', color: '#EF4444' },
};

const emptyForm = { candidatId: '', date: '', heure: '', lien: '', statut: 'Planifié' };

export default function PlanifierEntretien() {
  const [entretiens, setEntretiens] = useState(initialEntretiens);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const openCreate = () => {
    setEditId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (e) => {
    setEditId(e.id);
    setForm({ ...e });
    setShowModal(true);
  };

  const save = () => {
    if (!form.candidatId || !form.date || !form.heure) return alert('Remplissez tous les champs obligatoires');
    if (editId) {
      setEntretiens(es => es.map(e => e.id === editId ? { ...e, ...form } : e));
    } else {
      setEntretiens(es => [...es, { ...form, id: Date.now(), candidatId: Number(form.candidatId) }]);
    }
    setShowModal(false);
  };

  const deleteEntretien = (id) => {
    if (window.confirm('Supprimer cet entretien ?')) {
      setEntretiens(es => es.filter(e => e.id !== id));
    }
  };

  const changeStatut = (id, statut) => {
    setEntretiens(es => es.map(e => e.id === id ? { ...e, statut } : e));
  };

  return (
    <RecruteurLayout title="Planifier un entretien">

      {/* Stats */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: 'Total',    value: entretiens.length,                                   color: '#1E3A8A' },
          { label: 'Planifiés',value: entretiens.filter(e => e.statut === 'Planifié').length, color: '#FB923C' },
          { label: 'Acceptés', value: entretiens.filter(e => e.statut === 'Accepté').length,  color: '#059669' },
          { label: 'Refusés',  value: entretiens.filter(e => e.statut === 'Refusé').length,   color: '#EF4444' },
        ].map((s, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: '10px', padding: '12px 24px',
            border: '1px solid #E2E8F0', textAlign: 'center', flex: 1,
          }}>
            <div style={{ fontSize: '22px', fontWeight: '800', color: s.color, fontFamily: 'Syne, sans-serif' }}>
              {s.value}
            </div>
            <div style={{ fontSize: '12px', color: '#94A3B8' }}>{s.label}</div>
          </div>
        ))}
        <button onClick={openCreate} style={{
          padding: '0 24px', borderRadius: '10px', border: 'none',
          background: '#1E3A8A', color: '#fff', cursor: 'pointer',
          fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: '500',
          flex: 1,
        }}>
          ➕ Planifier
        </button>
      </div>

      {/* Liste entretiens */}
      <div style={{
        background: '#fff', borderRadius: '12px',
        border: '1px solid #E2E8F0', overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(15,23,42,.06)',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              {['Candidat', 'Offre', 'Date', 'Heure', 'Lien', 'Statut', 'Actions'].map(h => (
                <th key={h} style={{
                  padding: '14px 16px', textAlign: 'left', fontSize: '11px',
                  fontWeight: '600', color: '#94A3B8',
                  textTransform: 'uppercase', letterSpacing: '.05em',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entretiens.map((e, i) => {
              const candidat = candidats.find(c => c.id === Number(e.candidatId));
              return (
                <tr key={e.id} style={{
                  borderBottom: i < entretiens.length - 1 ? '1px solid #F1F5F9' : 'none',
                }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '34px', height: '34px', borderRadius: '50%',
                        background: '#DBEAFE', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', color: '#1E3A8A',
                        fontWeight: '700', fontSize: '13px', fontFamily: 'Syne, sans-serif',
                        flexShrink: 0,
                      }}>
                        {candidat?.name[0]}
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#1E293B' }}>
                        {candidat?.name}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '12px', color: '#475569' }}>
                    {candidat?.offre}
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#475569' }}>
                    📅 {e.date}
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#475569' }}>
                    🕐 {e.heure}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <a href={e.lien} target="_blank" rel="noreferrer" style={{
                      fontSize: '12px', color: '#2563EB', textDecoration: 'none',
                    }}>
                      🔗 Rejoindre
                    </a>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <select
                      value={e.statut}
                      onChange={ev => changeStatut(e.id, ev.target.value)}
                      style={{
                        background: statutColors[e.statut]?.bg,
                        color: statutColors[e.statut]?.color,
                        border: 'none', borderRadius: '50px',
                        padding: '4px 10px', fontSize: '12px',
                        fontWeight: '500', cursor: 'pointer',
                        fontFamily: 'DM Sans, sans-serif', outline: 'none',
                      }}
                    >
                      <option>Planifié</option>
                      <option>Accepté</option>
                      <option>Refusé</option>
                    </select>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button onClick={() => openEdit(e)} style={btnStyle('#F0FDF4', '#059669')}>✏️</button>
                      <button onClick={() => deleteEntretien(e.id)} style={btnStyle('#FEF2F2', '#EF4444')}>🗑</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {entretiens.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: '#94A3B8' }}>
            Aucun entretien planifié
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(15,23,42,.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
        }} onClick={() => setShowModal(false)}>
          <div style={{
            background: '#fff', borderRadius: '16px', padding: '32px',
            width: '100%', maxWidth: '460px', boxShadow: '0 20px 48px rgba(15,23,42,.2)',
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '20px', fontWeight: '700', color: '#1E293B' }}>
                {editId ? 'Modifier l\'entretien' : 'Planifier un entretien'}
              </h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: '18px' }}>✕</button>
            </div>

            {/* Candidat */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: '500', color: '#475569', display: 'block', marginBottom: '6px' }}>
                Candidat *
              </label>
              <select value={form.candidatId} onChange={set('candidatId')} style={selectStyle}>
                <option value="">Sélectionner un candidat</option>
                {candidats.map(c => (
                  <option key={c.id} value={c.id}>{c.name} — {c.offre}</option>
                ))}
              </select>
            </div>

            {/* Date + Heure */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '500', color: '#475569', display: 'block', marginBottom: '6px' }}>
                  Date *
                </label>
                <input type="date" value={form.date} onChange={set('date')} style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '500', color: '#475569', display: 'block', marginBottom: '6px' }}>
                  Heure *
                </label>
                <input type="time" value={form.heure} onChange={set('heure')} style={inputStyle} />
              </div>
            </div>

            {/* Lien */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: '500', color: '#475569', display: 'block', marginBottom: '6px' }}>
                Lien (Google Meet / Zoom)
              </label>
              <input
                type="url"
                placeholder="https://meet.google.com/..."
                value={form.lien}
                onChange={set('lien')}
                style={inputStyle}
              />
            </div>

            {/* Statut */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '13px', fontWeight: '500', color: '#475569', display: 'block', marginBottom: '6px' }}>
                Statut
              </label>
              <select value={form.statut} onChange={set('statut')} style={selectStyle}>
                <option>Planifié</option>
                <option>Accepté</option>
                <option>Refusé</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowModal(false)} style={{
                flex: 1, height: '44px', borderRadius: '50px',
                border: '1.5px solid #E2E8F0', background: '#fff',
                cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                fontSize: '14px', color: '#475569',
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

const btnStyle = (bg, color) => ({
  background: bg, color, border: 'none', borderRadius: '6px',
  padding: '7px 10px', fontSize: '13px', cursor: 'pointer',
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
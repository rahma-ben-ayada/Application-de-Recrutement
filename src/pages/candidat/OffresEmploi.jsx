import React, { useState } from 'react';
import RecruteurLayout from '../../layouts/RecruteurLayout';

const mesOffresData = [
  {
    id: 1,
    titre: 'Développeur React Senior',
    lieu: 'Tunis',
    type: 'CDI',
    candidatures: 24,
    status: true,
    date: '2026-01-15',
    description: 'Nous recherchons un développeur React expérimenté...',
    recruteur: 'Moi',
    entreprise: 'Mon Entreprise',
    salaire: '2500 - 3500 TND',
  },
  {
    id: 2,
    titre: 'Data Scientist',
    lieu: 'Remote',
    type: 'CDD',
    candidatures: 18,
    status: true,
    date: '2026-01-20',
    description: 'Rejoignez notre équipe data pour analyser...',
    recruteur: 'Moi',
    entreprise: 'Mon Entreprise',
    salaire: '3000 - 4000 TND',
  },
];

const autresOffresData = [
  {
    id: 3,
    titre: 'UX/UI Designer',
    lieu: 'Sfax',
    type: 'Stage',
    candidatures: 31,
    status: true,
    date: '2026-01-10',
    description: 'Créer des interfaces utilisateur modernes...',
    recruteur: 'Sophie Lambert',
    entreprise: 'Tech Corp',
    salaire: '800 - 1200 TND',
  },
  {
    id: 4,
    titre: 'Chef de projet IT',
    lieu: 'Tunis',
    type: 'CDI',
    candidatures: 12,
    status: true,
    date: '2026-01-18',
    description: 'Gérer les projets informatiques...',
    recruteur: 'Marc Dubois',
    entreprise: 'StartUp RH',
    salaire: '3500 - 4500 TND',
  },
  {
    id: 5,
    titre: 'Développeur Java',
    lieu: 'Sousse',
    type: 'CDI',
    candidatures: 8,
    status: false,
    date: '2026-01-05',
    description: 'Développement d\'applications Java...',
    recruteur: 'Julie Petit',
    entreprise: 'Big Finance',
    salaire: '2800 - 3800 TND',
  },
];

const emptyForm = {
  titre: '', lieu: '', type: 'CDI', description: '', status: true, salaire: '',
};

export default function MesOffres() {
  const [mesOffres, setMesOffres] = useState(mesOffresData);
  const [activeTab, setActiveTab] = useState('mes');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editOffre, setEditOffre] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [selected, setSelected] = useState(null);

  const filteredMes = mesOffres.filter(o =>
    o.titre.toLowerCase().includes(search.toLowerCase()) ||
    o.lieu.toLowerCase().includes(search.toLowerCase())
  );

  const filteredAutres = autresOffresData.filter(o =>
    o.titre.toLowerCase().includes(search.toLowerCase()) ||
    o.lieu.toLowerCase().includes(search.toLowerCase()) ||
    o.entreprise.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditOffre(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (offre) => {
    setEditOffre(offre);
    setForm({ ...offre });
    setShowModal(true);
  };

  const saveOffre = () => {
    if (!form.titre.trim()) return alert('Le titre est requis');
    if (editOffre) {
      setMesOffres(os => os.map(o => o.id === editOffre.id ? { ...o, ...form } : o));
    } else {
      setMesOffres(os => [...os, {
        ...form,
        id: Date.now(),
        candidatures: 0,
        date: new Date().toISOString().split('T')[0],
        recruteur: 'Moi',
        entreprise: 'Mon Entreprise',
      }]);
    }
    setShowModal(false);
  };

  const deleteOffre = (id) => {
    if (window.confirm('Supprimer cette offre ?')) {
      setMesOffres(os => os.filter(o => o.id !== id));
      if (selected?.id === id) setSelected(null);
    }
  };

  const toggleStatus = (id) => {
    setMesOffres(os => os.map(o => o.id === id ? { ...o, status: !o.status } : o));
  };

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <RecruteurLayout title="Offres d'emploi">

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {[
          { key: 'mes',    label: `Mes offres (${mesOffres.length})`,                     icon: '📋' },
          { key: 'autres', label: `Offres des autres recruteurs (${autresOffresData.length})`, icon: '👁' },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => { setActiveTab(t.key); setSelected(null); setSearch(''); }}
            style={{
              padding: '10px 20px', borderRadius: '10px', border: 'none',
              cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
              fontSize: '14px', fontWeight: '500',
              background: activeTab === t.key ? '#1E3A8A' : '#fff',
              color: activeTab === t.key ? '#fff' : '#475569',
              boxShadow: '0 1px 3px rgba(15,23,42,.08)',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ======= MES OFFRES ======= */}
      {activeTab === 'mes' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { label: 'Total',     value: mesOffres.length,                         color: '#1E3A8A' },
                { label: 'Actives',   value: mesOffres.filter(o => o.status).length,  color: '#059669' },
                { label: 'Inactives', value: mesOffres.filter(o => !o.status).length, color: '#EF4444' },
              ].map((s, i) => (
                <div key={i} style={{
                  background: '#fff', borderRadius: '10px', padding: '10px 20px',
                  border: '1px solid #E2E8F0', textAlign: 'center',
                }}>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: s.color, fontFamily: 'Syne, sans-serif' }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                placeholder="🔍 Rechercher..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={searchStyle}
              />
              <button onClick={openCreate} style={createBtnStyle}>
                ➕ Nouvelle offre
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 340px' : '1fr', gap: '20px', alignItems: 'start' }}>
            <TableOffres
              offres={filteredMes}
              isMine={true}
              selected={selected}
              onSelect={setSelected}
              onEdit={openEdit}
              onToggle={toggleStatus}
              onDelete={deleteOffre}
            />
            {selected && (
              <DetailPanel
                offre={selected}
                isMine={true}
                onClose={() => setSelected(null)}
                onEdit={openEdit}
                onDelete={deleteOffre}
              />
            )}
          </div>
        </>
      )}

      {/* ======= AUTRES OFFRES ======= */}
      {activeTab === 'autres' && (
        <>
          <div style={{
            background: '#EFF6FF', border: '1px solid #BFDBFE',
            borderRadius: '10px', padding: '12px 20px',
            color: '#1E3A8A', fontSize: '13px', fontWeight: '500',
            marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            👁 Mode consultation uniquement — vous ne pouvez pas modifier les offres des autres recruteurs
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
            <input
              placeholder="🔍 Rechercher par titre, lieu, entreprise..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ ...searchStyle, width: '300px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 340px' : '1fr', gap: '20px', alignItems: 'start' }}>
            <TableOffres
              offres={filteredAutres}
              isMine={false}
              selected={selected}
              onSelect={setSelected}
            />
            {selected && (
              <DetailPanel
                offre={selected}
                isMine={false}
                onClose={() => setSelected(null)}
              />
            )}
          </div>
        </>
      )}

      {/* ======= Modal ======= */}
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

            {/* Titre */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Titre du poste *</label>
              <input type="text" placeholder="Ex: Développeur React" value={form.titre} onChange={set('titre')} style={inputStyle} />
            </div>

            {/* Lieu + Type */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={labelStyle}>Lieu</label>
                <input type="text" placeholder="Ex: Tunis, Remote..." value={form.lieu} onChange={set('lieu')} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Type de contrat</label>
                <select value={form.type} onChange={set('type')} style={inputStyle}>
                  <option>CDI</option>
                  <option>CDD</option>
                  <option>Stage</option>
                  <option>Freelance</option>
                </select>
              </div>
            </div>

            {/* Salaire */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Salaire</label>
              <input type="text" placeholder="Ex: 2500 - 3500 TND" value={form.salaire} onChange={set('salaire')} style={inputStyle} />
            </div>

            {/* Description */}
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

// ============================================================
// Composant Table
// ============================================================
function TableOffres({ offres, isMine, selected, onSelect, onEdit, onToggle, onDelete }) {
  return (
    <div style={{
      background: '#fff', borderRadius: '12px',
      border: '1px solid #E2E8F0', overflow: 'hidden',
      boxShadow: '0 4px 16px rgba(15,23,42,.06)',
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
            {['Titre', 'Entreprise', 'Lieu', 'Type', 'Salaire', 'Candidatures', 'Date', 'Statut', 'Actions'].map(h => (
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
          {offres.map((o, i) => (
            <tr key={o.id} style={{
              borderBottom: i < offres.length - 1 ? '1px solid #F1F5F9' : 'none',
              background: selected?.id === o.id ? '#F0F9FF' : 'transparent',
            }}>
              {/* Titre */}
              <td style={{ padding: '14px 16px' }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#1E293B' }}>{o.titre}</div>
              </td>

              {/* Entreprise */}
              <td style={{ padding: '14px 16px', fontSize: '13px', color: '#475569' }}>
                🏢 {o.entreprise}
              </td>

              {/* Lieu */}
              <td style={{ padding: '14px 16px', fontSize: '13px', color: '#475569' }}>
                📍 {o.lieu}
              </td>

              {/* Type */}
              <td style={{ padding: '14px 16px' }}>
                <span style={{
                  background: o.type === 'CDI' ? '#DBEAFE' : o.type === 'CDD' ? '#FFF7ED' : '#F0FDF4',
                  color: o.type === 'CDI' ? '#1E3A8A' : o.type === 'CDD' ? '#FB923C' : '#059669',
                  padding: '4px 10px', borderRadius: '50px', fontSize: '12px', fontWeight: '500',
                }}>
                  {o.type}
                </span>
              </td>

              {/* Salaire */}
              <td style={{ padding: '14px 16px' }}>
                <span style={{
                  background: '#F0FDF4', color: '#059669',
                  padding: '4px 10px', borderRadius: '50px',
                  fontSize: '12px', fontWeight: '500',
                }}>
                  💰 {o.salaire || 'Non précisé'}
                </span>
              </td>

              {/* Candidatures */}
              <td style={{ padding: '14px 16px' }}>
                <span style={{
                  background: '#DBEAFE', color: '#1E3A8A',
                  padding: '4px 10px', borderRadius: '50px', fontSize: '12px', fontWeight: '500',
                }}>
                  {o.candidatures}
                </span>
              </td>

              {/* Date */}
              <td style={{ padding: '14px 16px', fontSize: '13px', color: '#94A3B8' }}>{o.date}</td>

              {/* Statut */}
              <td style={{ padding: '14px 16px' }}>
                <span style={{
                  background: o.status ? '#F0FDF4' : '#FEF2F2',
                  color: o.status ? '#059669' : '#EF4444',
                  padding: '4px 10px', borderRadius: '50px', fontSize: '12px', fontWeight: '500',
                }}>
                  {o.status ? '✓ Active' : '✕ Inactive'}
                </span>
              </td>

              {/* Actions */}
              <td style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={() => onSelect(selected?.id === o.id ? null : o)} style={btnStyle('#DBEAFE', '#1E3A8A')}>👁</button>
                  {isMine && (
                    <>
                      <button onClick={() => onEdit(o)} style={btnStyle('#F0FDF4', '#059669')}>✏️</button>
                      <button onClick={() => onToggle(o.id)} style={btnStyle('#FFF7ED', '#FB923C')}>{o.status ? '⏸' : '▶'}</button>
                      <button onClick={() => onDelete(o.id)} style={btnStyle('#FEF2F2', '#EF4444')}>🗑</button>
                    </>
                  )}
                  {!isMine && (
                    <span style={{
                      background: '#F1F5F9', color: '#94A3B8',
                      padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '500',
                    }}>
                      Lecture seule
                    </span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {offres.length === 0 && (
        <div style={{ padding: '40px', textAlign: 'center', color: '#94A3B8', fontSize: '14px' }}>
          Aucune offre trouvée
        </div>
      )}
    </div>
  );
}

// ============================================================
// Composant Panel Détail
// ============================================================
function DetailPanel({ offre, isMine, onClose, onEdit, onDelete }) {
  return (
    <div style={{
      background: '#fff', borderRadius: '12px', padding: '24px',
      border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(15,23,42,.06)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '16px', fontWeight: '700', color: '#1E293B' }}>
          Détail offre
        </h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: '18px' }}>✕</button>
      </div>

      {!isMine && (
        <div style={{
          background: '#EFF6FF', border: '1px solid #BFDBFE',
          borderRadius: '8px', padding: '8px 14px',
          color: '#1E3A8A', fontSize: '12px', fontWeight: '500',
          marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px',
        }}>
          👁 Consultation uniquement
        </div>
      )}

      <div style={{ fontSize: '15px', fontWeight: '700', color: '#1E293B', marginBottom: '16px', fontFamily: 'Syne, sans-serif' }}>
        {offre.titre}
      </div>

      {[
        { label: 'Entreprise',   value: offre.entreprise },
        { label: 'Recruteur',    value: offre.recruteur },
        { label: 'Lieu',         value: offre.lieu },
        { label: 'Type',         value: offre.type },
        { label: 'Salaire',      value: offre.salaire || 'Non précisé' },
        { label: 'Candidatures', value: `${offre.candidatures} candidats` },
        { label: 'Date',         value: offre.date },
        { label: 'Statut',       value: offre.status ? 'Active' : 'Inactive' },
      ].map((f, i) => (
        <div key={i} style={{
          display: 'flex', justifyContent: 'space-between',
          padding: '10px 0', borderBottom: '1px solid #F1F5F9', fontSize: '13px',
        }}>
          <span style={{ color: '#94A3B8' }}>{f.label}</span>
          <span style={{ color: '#1E293B', fontWeight: '500' }}>{f.value}</span>
        </div>
      ))}

      <div style={{ marginTop: '16px' }}>
        <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px' }}>Description</div>
        <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>{offre.description}</p>
      </div>

      {isMine && (
        <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
          <button onClick={() => onEdit(offre)} style={saveBtnStyle}>✏️ Modifier</button>
          <button onClick={() => onDelete(offre.id)} style={cancelBtnStyle}>🗑 Supprimer</button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// Styles
// ============================================================
const btnStyle = (bg, color) => ({
  background: bg, color, border: 'none', borderRadius: '6px',
  padding: '7px 10px', fontSize: '13px', cursor: 'pointer',
  fontFamily: 'DM Sans, sans-serif', fontWeight: '500',
});

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
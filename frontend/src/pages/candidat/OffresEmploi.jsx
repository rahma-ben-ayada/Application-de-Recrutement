import React, { useState } from 'react';
import CandidatLayout from '../../layouts/CandidatLayout';

const offresData = [
  {
    id: 1,
    titre: 'Développeur React Senior',
    entreprise: 'Tech Corp',
    lieu: 'Tunis',
    type: 'CDI',
    description: 'Nous recherchons un développeur React expérimenté pour rejoindre notre équipe...',
    competences: ['React', 'Node.js', 'MongoDB'],
    salaire: '2500 - 3500 TND',
    date: '2026-01-15',
    status: true,
  },
  {
    id: 2,
    titre: 'Data Scientist',
    entreprise: 'StartUp RH',
    lieu: 'Remote',
    type: 'CDD',
    description: 'Rejoignez notre équipe data pour analyser et modéliser des données...',
    competences: ['Python', 'ML', 'SQL'],
    salaire: '3000 - 4000 TND',
    date: '2026-01-20',
    status: true,
  },
  {
    id: 3,
    titre: 'UX/UI Designer',
    entreprise: 'Big Finance',
    lieu: 'Sfax',
    type: 'Stage',
    description: 'Créer des interfaces utilisateur modernes et intuitives...',
    competences: ['Figma', 'CSS', 'Adobe XD'],
    salaire: '800 - 1200 TND',
    date: '2026-01-10',
    status: true,
  },
  {
    id: 4,
    titre: 'Chef de projet IT',
    entreprise: 'Dev Studio',
    lieu: 'Tunis',
    type: 'CDI',
    description: 'Gérer les projets informatiques de A à Z...',
    competences: ['Gestion projet', 'Agile', 'Jira'],
    salaire: '3500 - 4500 TND',
    date: '2026-01-18',
    status: true,
  },
  {
    id: 5,
    titre: 'Développeur Java',
    entreprise: 'Big Finance',
    lieu: 'Sousse',
    type: 'CDI',
    description: 'Développement d\'applications Java robustes...',
    competences: ['Java', 'Spring Boot', 'Docker'],
    salaire: '2800 - 3800 TND',
    date: '2026-01-05',
    status: true,
  },
  {
    id: 6,
    titre: 'DevOps Engineer',
    entreprise: 'Cloud Corp',
    lieu: 'Remote',
    type: 'CDI',
    description: 'Gérer et automatiser l\'infrastructure cloud...',
    competences: ['Docker', 'Kubernetes', 'AWS'],
    salaire: '4000 - 5000 TND',
    date: '2026-01-22',
    status: true,
  },
];

export default function OffresEmploi() {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('Tous');
  const [filterLieu, setFilterLieu] = useState('Tous');
  const [selected, setSelected] = useState(null);
  const [postules, setPostules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [offreToPostuler, setOffreToPostuler] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [lettreFile, setLettreFile] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  const types = ['Tous', 'CDI', 'CDD', 'Stage', 'Freelance'];
  const lieux = ['Tous', 'Tunis', 'Sfax', 'Sousse', 'Remote'];

  const filtered = offresData.filter(o => {
    const matchSearch =
      o.titre.toLowerCase().includes(search.toLowerCase()) ||
      o.entreprise.toLowerCase().includes(search.toLowerCase()) ||
      o.competences.some(c => c.toLowerCase().includes(search.toLowerCase()));
    const matchType = filterType === 'Tous' || o.type === filterType;
    const matchLieu = filterLieu === 'Tous' || o.lieu === filterLieu;
    return matchSearch && matchType && matchLieu && o.status;
  });

  const openPostuler = (offre) => {
    setOffreToPostuler(offre);
    setCvFile(null);
    setLettreFile(null);
    setShowModal(true);
  };

  const handlePostuler = () => {
    if (!cvFile) {
      alert('Veuillez joindre votre CV !');
      return;
    }
    setPostules(ps => [...ps, offreToPostuler.id]);
    setShowModal(false);
    setSuccessMsg(`✅ Candidature envoyée pour "${offreToPostuler.titre}" !`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const dejaPostule = (id) => postules.includes(id);

  return (
    <CandidatLayout title="Offres d'emploi">

      {/* Message succès */}
      {successMsg && (
        <div style={{
          background: '#F0FDF4', border: '1px solid #22C55E',
          borderRadius: '10px', padding: '14px 20px',
          color: '#059669', fontSize: '14px', fontWeight: '500',
          marginBottom: '24px',
        }}>
          {successMsg}
        </div>
      )}

      {/* Stats */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {[
          { label: 'Offres disponibles', value: offresData.length,  color: '#1E3A8A' },
          { label: 'Mes candidatures',   value: postules.length,    color: '#059669' },
          { label: 'Résultats filtrés',  value: filtered.length,    color: '#0891B2' },
        ].map((s, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: '10px', padding: '12px 24px',
            border: '1px solid #E2E8F0', textAlign: 'center', flex: '1 1 100px',
          }}>
            <div style={{
              fontSize: '22px', fontWeight: '800', color: s.color,
              fontFamily: 'Syne, sans-serif', marginBottom: '2px',
            }}>
              {s.value}
            </div>
            <div style={{ fontSize: '12px', color: '#94A3B8' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filtres */}
      <div style={{
        background: '#fff', borderRadius: '12px', padding: '20px',
        border: '1px solid #E2E8F0', marginBottom: '20px',
        display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end',
      }}>
        <div style={{ flex: 2, minWidth: '240px' }}>
          <label style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>
            Recherche
          </label>
          <input
            placeholder="🔍 Titre, entreprise, compétence..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>
            Type de contrat
          </label>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {types.map(t => (
              <button key={t} onClick={() => setFilterType(t)} style={{
                padding: '8px 14px', borderRadius: '50px', border: 'none',
                cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: '13px',
                background: filterType === t ? '#1E3A8A' : '#F1F5F9',
                color: filterType === t ? '#fff' : '#475569',
                fontWeight: filterType === t ? '600' : '400', transition: '150ms',
              }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>
            Lieu
          </label>
          <select value={filterLieu} onChange={e => setFilterLieu(e.target.value)} style={{
            height: '40px', padding: '0 14px', borderRadius: '10px',
            border: '1.5px solid #E2E8F0', fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px', outline: 'none', background: '#F8FAFC', cursor: 'pointer',
          }}>
            {lieux.map(l => <option key={l}>{l}</option>)}
          </select>
        </div>
      </div>

      {/* Layout liste + détail */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: selected ? '1fr 380px' : '1fr',
        gap: '20px', alignItems: 'start',
      }}>

        {/* Liste offres */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.length === 0 && (
            <div style={{
              background: '#fff', borderRadius: '12px', padding: '40px',
              textAlign: 'center', color: '#94A3B8', border: '1px solid #E2E8F0',
            }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</div>
              Aucune offre trouvée
            </div>
          )}

          {filtered.map(offre => (
            <div key={offre.id} onClick={() => setSelected(selected?.id === offre.id ? null : offre)}
              style={{
                background: '#fff', borderRadius: '12px', padding: '20px 24px',
                border: selected?.id === offre.id ? '2px solid #1E3A8A' : '1px solid #E2E8F0',
                boxShadow: '0 4px 16px rgba(15,23,42,.06)',
                cursor: 'pointer', transition: '200ms',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '10px',
                      background: '#DBEAFE', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '20px', flexShrink: 0,
                    }}>
                      🏢
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '700', color: '#1E293B', fontFamily: 'Syne, sans-serif' }}>
                        {offre.titre}
                      </div>
                      <div style={{ fontSize: '13px', color: '#94A3B8', marginTop: '2px' }}>
                        {offre.entreprise} • 📍 {offre.lieu}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={tagStyle('#DBEAFE', '#1E3A8A')}>{offre.type}</span>
                    <span style={tagStyle('#F0FDF4', '#059669')}>💰 {offre.salaire}</span>
                    {offre.competences.slice(0, 3).map((c, i) => (
                      <span key={i} style={tagStyle('#F1F5F9', '#475569')}>{c}</span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', marginLeft: '16px' }}>
                  <span style={{ fontSize: '11px', color: '#CBD5E1' }}>{offre.date}</span>
                  {dejaPostule(offre.id) ? (
                    <span style={tagStyle('#F0FDF4', '#059669')}>✓ Postulé</span>
                  ) : (
                    <button onClick={(e) => { e.stopPropagation(); openPostuler(offre); }} style={{
                      padding: '8px 18px', borderRadius: '50px', border: 'none',
                      background: '#1E3A8A', color: '#fff', cursor: 'pointer',
                      fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: '500',
                      boxShadow: '0 4px 12px rgba(30,58,138,.2)',
                    }}>
                      Postuler →
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Panel détail */}
        {selected && (
          <div style={{
            background: '#fff', borderRadius: '12px', padding: '24px',
            border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(15,23,42,.06)',
            position: 'sticky', top: '20px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '16px', fontWeight: '700', color: '#1E293B' }}>
                Détail de l'offre
              </h3>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: '18px' }}>✕</button>
            </div>

            <div style={{ fontSize: '18px', fontWeight: '800', color: '#1E293B', fontFamily: 'Syne, sans-serif', marginBottom: '4px' }}>
              {selected.titre}
            </div>
            <div style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '16px' }}>
              {selected.entreprise} • 📍 {selected.lieu}
            </div>

            {[
              { label: 'Type',    value: selected.type },
              { label: 'Lieu',    value: selected.lieu },
              { label: 'Salaire', value: selected.salaire },
              { label: 'Date',    value: selected.date },
            ].map((f, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '10px 0', borderBottom: '1px solid #F1F5F9', fontSize: '13px',
              }}>
                <span style={{ color: '#94A3B8' }}>{f.label}</span>
                <span style={{ color: '#1E293B', fontWeight: '500' }}>{f.value}</span>
              </div>
            ))}

            <div style={{ margin: '16px 0' }}>
              <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px' }}>Compétences requises</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {selected.competences.map((c, i) => (
                  <span key={i} style={tagStyle('#F1F5F9', '#475569')}>{c}</span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px' }}>Description</div>
              <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.7' }}>{selected.description}</p>
            </div>

            {dejaPostule(selected.id) ? (
              <div style={{
                background: '#F0FDF4', borderRadius: '10px', padding: '14px',
                textAlign: 'center', color: '#059669', fontWeight: '500', fontSize: '14px',
              }}>
                ✓ Vous avez déjà postulé à cette offre
              </div>
            ) : (
              <button onClick={() => openPostuler(selected)} style={{
                width: '100%', height: '46px', borderRadius: '50px', border: 'none',
                background: '#1E3A8A', color: '#fff', cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: '500',
                boxShadow: '0 4px 16px rgba(30,58,138,.25)',
              }}>
                Postuler à cette offre →
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal Postuler */}
      {showModal && offreToPostuler && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(15,23,42,.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
        }} onClick={() => setShowModal(false)}>
          <div style={{
            background: '#fff', borderRadius: '16px', padding: '32px',
            width: '100%', maxWidth: '500px',
            boxShadow: '0 20px 48px rgba(15,23,42,.2)',
          }} onClick={e => e.stopPropagation()}>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '20px', fontWeight: '700', color: '#1E293B' }}>
                Postuler à l'offre
              </h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: '18px' }}>✕</button>
            </div>

            <p style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '24px' }}>
              {offreToPostuler.titre} — {offreToPostuler.entreprise}
            </p>

            {/* CV */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>CV <span style={{ color: '#EF4444' }}>*</span> (PDF, DOC, DOCX)</label>
              <div style={{
                border: '1.5px solid #E2E8F0', borderRadius: '10px',
                padding: '10px 14px', background: '#F8FAFC',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px',
              }}>
                <span style={{ fontSize: '13px', color: cvFile ? '#1E293B' : '#94A3B8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {cvFile ? cvFile.name : 'Aucun fichier sélectionné'}
                </span>
                <label style={{
                  padding: '6px 14px', borderRadius: '8px', flexShrink: 0,
                  background: '#1E3A8A', color: '#fff', cursor: 'pointer',
                  fontSize: '12px', fontFamily: 'DM Sans, sans-serif', fontWeight: '500',
                }}>
                  📁 Parcourir
                  <input type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={e => setCvFile(e.target.files[0])} />
                </label>
              </div>
              {cvFile && (
                <p style={{ fontSize: '12px', color: '#059669', marginTop: '5px' }}>
                  ✓ {cvFile.name} ({(cvFile.size / 1024).toFixed(0)} KB)
                </p>
              )}
            </div>

            {/* Lettre */}
            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>Lettre de motivation <span style={{ color: '#94A3B8', fontSize: '12px' }}>(optionnel)</span></label>
              <div style={{
                border: '1.5px solid #E2E8F0', borderRadius: '10px',
                padding: '10px 14px', background: '#F8FAFC',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px',
              }}>
                <span style={{ fontSize: '13px', color: lettreFile ? '#1E293B' : '#94A3B8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {lettreFile ? lettreFile.name : 'Aucun fichier sélectionné'}
                </span>
                <label style={{
                  padding: '6px 14px', borderRadius: '8px', flexShrink: 0,
                  background: '#1E3A8A', color: '#fff', cursor: 'pointer',
                  fontSize: '12px', fontFamily: 'DM Sans, sans-serif', fontWeight: '500',
                }}>
                  📁 Parcourir
                  <input type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={e => setLettreFile(e.target.files[0])} />
                </label>
              </div>
              {lettreFile && (
                <p style={{ fontSize: '12px', color: '#059669', marginTop: '5px' }}>
                  ✓ {lettreFile.name} ({(lettreFile.size / 1024).toFixed(0)} KB)
                </p>
              )}
            </div>

            <div style={{
              background: '#EFF6FF', borderRadius: '8px', padding: '10px 14px',
              fontSize: '12px', color: '#1E3A8A', marginBottom: '20px',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              ℹ️ Votre CV sera transmis directement au recruteur
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowModal(false)} style={{
                flex: 1, height: '44px', borderRadius: '50px',
                border: '1.5px solid #E2E8F0', background: '#fff',
                cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#475569',
              }}>
                Annuler
              </button>
              <button onClick={handlePostuler} style={{
                flex: 1, height: '44px', borderRadius: '50px', border: 'none',
                background: '#1E3A8A', color: '#fff', cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: '500',
                boxShadow: '0 4px 12px rgba(30,58,138,.2)',
              }}>
                Envoyer ma candidature →
              </button>
            </div>
          </div>
        </div>
      )}
    </CandidatLayout>
  );
}

const tagStyle = (bg, color) => ({
  background: bg, color,
  padding: '4px 10px', borderRadius: '50px',
  fontSize: '12px', fontWeight: '500',
  display: 'inline-block',
});

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
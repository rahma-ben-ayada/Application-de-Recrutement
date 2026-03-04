import React, { useState, useEffect } from 'react';
import CandidatLayout from '../../layouts/CandidatLayout';
import api from '../../utils/api';

export default function OffresEmploi() {
  const [offres, setOffres] = useState([]);
  const [mesCandidatures, setMesCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('Tous');
  const [filterLieu, setFilterLieu] = useState('Tous');
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [offreToPostuler, setOffreToPostuler] = useState(null);
  const [lettre, setLettre] = useState('');
  const [cvFile, setCvFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [message, setMessage] = useState(null);

  const types = ['Tous', 'CDI', 'CDD', 'Stage', 'Freelance'];
  const lieux = ['Tous', 'Tunis', 'Sfax', 'Sousse', 'Remote'];

  useEffect(() => {
    fetchOffres();
    fetchMesCandidatures();
  }, []);

  const fetchOffres = async () => {
    try {
      const data = await api('/offres');
      setOffres(data.offres);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMesCandidatures = async () => {
    try {
      const data = await api('/candidatures/mes');
      setMesCandidatures(data.candidatures);
    } catch (err) {
      console.error(err);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const dejaPostule = (offreId) =>
    mesCandidatures.some(c => c.offre?._id === offreId || c.offre === offreId);

  const openPostuler = (offre) => {
    setOffreToPostuler(offre);
    setLettre('');
    setCvFile(null);
    setVideoFile(null);
    setShowModal(true);
  };

  const handlePostuler = async () => {
    if (!cvFile) return showMessage('error', '⚠️ Veuillez joindre votre CV !');
    try {
      const formData = new FormData();
      formData.append('offreId', offreToPostuler._id);
      formData.append('lettre', lettre);
      formData.append('cv', cvFile);
      if (videoFile) formData.append('video', videoFile);

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/candidatures', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setShowModal(false);
      showMessage('success', `✅ Candidature envoyée pour "${offreToPostuler.titre}" !`);
      fetchMesCandidatures();
    } catch (err) {
      showMessage('error', err.message);
    }
  };

  const filtered = offres.filter(o => {
    const matchSearch =
      o.titre?.toLowerCase().includes(search.toLowerCase()) ||
      o.recruteur?.entreprise?.toLowerCase().includes(search.toLowerCase()) ||
      (o.competences || []).some(c => c.toLowerCase().includes(search.toLowerCase()));
    const matchType = filterType === 'Tous' || o.type === filterType;
    const matchLieu = filterLieu === 'Tous' || o.lieu === filterLieu;
    return matchSearch && matchType && matchLieu;
  });

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
    <CandidatLayout title="Offres d'emploi">

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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Offres disponibles', value: offres.length,          color: '#1E3A8A', bg: '#DBEAFE', icon: '📋' },
          { label: 'Mes candidatures',   value: mesCandidatures.length, color: '#059669', bg: '#D1FAE5', icon: '📨' },
          { label: 'Résultats filtrés',  value: filtered.length,        color: '#7C3AED', bg: '#EDE9FE', icon: '🔍' },
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

      {/* Filtres */}
      <div style={{
        background: '#fff', borderRadius: '14px', padding: '20px',
        border: '1px solid #E2E8F0', marginBottom: '20px',
        display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end',
      }}>
        <div style={{ flex: 2, minWidth: '240px' }}>
          <label style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>
            Recherche
          </label>
          <input
            placeholder="🔍 Titre, entreprise, compétence..."
            value={search} onChange={e => setSearch(e.target.value)}
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
            height: '42px', padding: '0 14px', borderRadius: '10px',
            border: '1.5px solid #E2E8F0', fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px', outline: 'none', background: '#F8FAFC', cursor: 'pointer',
          }}>
            {lieux.map(l => <option key={l}>{l}</option>)}
          </select>
        </div>
      </div>

      {/* Liste + Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: '20px' }}>

        {/* Liste offres */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#94A3B8' }}>
              Chargement...
            </div>
          ) : filtered.length === 0 ? (
            <div style={{
              background: '#fff', borderRadius: '14px', padding: '40px',
              textAlign: 'center', color: '#94A3B8', border: '1px solid #E2E8F0',
            }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</div>
              Aucune offre trouvée
            </div>
          ) : (
            filtered.map(offre => (
              <div key={offre._id}
                onClick={() => setSelected(selected?._id === offre._id ? null : offre)}
                style={{
                  background: '#fff', borderRadius: '14px', padding: '20px 24px',
                  border: selected?._id === offre._id ? '2px solid #1E3A8A' : '1px solid #E2E8F0',
                  cursor: 'pointer', transition: '200ms',
                  boxShadow: selected?._id === offre._id ? '0 4px 20px rgba(30,58,138,.15)' : '0 2px 8px rgba(15,23,42,.04)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
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
                          {offre.recruteur?.entreprise || '—'} • 📍 {offre.lieu}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {typeBadge(offre.type)}
                      {offre.salaire && (
                        <span style={{ background: '#D1FAE5', color: '#059669', padding: '4px 10px', borderRadius: '50px', fontSize: '12px', fontWeight: '500' }}>
                          💰 {offre.salaire}
                        </span>
                      )}
                      {(offre.competences || []).slice(0, 3).map((c, i) => (
                        <span key={i} style={{ background: '#F1F5F9', color: '#475569', padding: '4px 10px', borderRadius: '50px', fontSize: '12px', fontWeight: '500' }}>
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', marginLeft: '16px' }}>
                    <span style={{ fontSize: '11px', color: '#CBD5E1' }}>
                      {new Date(offre.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                    {dejaPostule(offre._id) ? (
                      <span style={{ background: '#D1FAE5', color: '#059669', padding: '6px 14px', borderRadius: '50px', fontSize: '12px', fontWeight: '600' }}>
                        ✓ Postulé
                      </span>
                    ) : (
                      <button onClick={e => { e.stopPropagation(); openPostuler(offre); }} style={{
                        padding: '8px 18px', borderRadius: '50px', border: 'none',
                        background: '#1E3A8A', color: '#fff', cursor: 'pointer',
                        fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: '500',
                      }}>
                        Postuler →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Panel détail */}
        {selected && (
          <div style={{
            background: '#fff', borderRadius: '16px', padding: '24px',
            border: '1px solid #E2E8F0', height: 'fit-content',
            position: 'sticky', top: '20px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '16px', fontWeight: '700', color: '#1E293B' }}>
                Détail de l'offre
              </h3>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: '18px' }}>✕</button>
            </div>

            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '18px', fontWeight: '800', color: '#1E293B', marginBottom: '4px' }}>
              {selected.titre}
            </div>
            <div style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '16px' }}>
              {selected.recruteur?.entreprise || '—'} • 📍 {selected.lieu}
            </div>

            {[
              { label: 'Type',      value: selected.type },
              { label: 'Lieu',      value: selected.lieu },
              { label: 'Salaire',   value: selected.salaire || '—' },
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

            {(selected.competences || []).length > 0 && (
              <div style={{ margin: '16px 0' }}>
                <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                  Compétences requises
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {selected.competences.map((c, i) => (
                    <span key={i} style={{ background: '#DBEAFE', color: '#1E3A8A', padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '500' }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selected.description && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                  Description
                </div>
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.7' }}>
                  {selected.description}
                </p>
              </div>
            )}

            {dejaPostule(selected._id) ? (
              <div style={{
                background: '#D1FAE5', borderRadius: '10px', padding: '14px',
                textAlign: 'center', color: '#059669', fontWeight: '600', fontSize: '14px',
              }}>
                ✓ Vous avez déjà postulé à cette offre
              </div>
            ) : (
              <button onClick={() => openPostuler(selected)} style={{
                width: '100%', height: '46px', borderRadius: '50px', border: 'none',
                background: '#1E3A8A', color: '#fff', cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: '500',
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
            width: '100%', maxWidth: '520px',
            boxShadow: '0 20px 48px rgba(15,23,42,.2)',
            maxHeight: '90vh', overflowY: 'auto',
          }} onClick={e => e.stopPropagation()}>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '20px', fontWeight: '700', color: '#1E293B' }}>
                Postuler à l'offre
              </h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: '18px' }}>✕</button>
            </div>

            <div style={{ background: '#EFF6FF', borderRadius: '10px', padding: '12px 16px', marginBottom: '24px' }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '14px', fontWeight: '700', color: '#1E3A8A' }}>
                {offreToPostuler.titre}
              </div>
              <div style={{ fontSize: '13px', color: '#94A3B8' }}>
                {offreToPostuler.recruteur?.entreprise || '—'} • {offreToPostuler.lieu}
              </div>
            </div>

            {/* CV */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>
                📄 CV <span style={{ color: '#EF4444' }}>*</span>
                <span style={{ color: '#94A3B8', fontSize: '12px', fontWeight: '400' }}> (PDF, DOC, DOCX)</span>
              </label>
              <div style={{
                border: cvFile ? '1.5px solid #059669' : '1.5px dashed #E2E8F0',
                borderRadius: '10px', padding: '12px 14px', background: '#F8FAFC',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: '13px', color: cvFile ? '#059669' : '#94A3B8' }}>
                  {cvFile ? `✓ ${cvFile.name}` : 'Aucun fichier sélectionné'}
                </span>
                <label style={{
                  padding: '6px 14px', borderRadius: '8px',
                  background: '#1E3A8A', color: '#fff', cursor: 'pointer',
                  fontSize: '12px', fontFamily: 'DM Sans, sans-serif', fontWeight: '500',
                }}>
                  📁 Parcourir
                  <input type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }}
                    onChange={e => setCvFile(e.target.files[0])} />
                </label>
              </div>
            </div>

            {/* Vidéo */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>
                🎥 Vidéo de présentation
                <span style={{ color: '#94A3B8', fontSize: '12px', fontWeight: '400' }}> (30 sec max, MP4/MOV)</span>
              </label>
              <div style={{
                border: videoFile ? '1.5px solid #059669' : '1.5px dashed #E2E8F0',
                borderRadius: '10px', padding: '12px 14px', background: '#F8FAFC',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: '13px', color: videoFile ? '#059669' : '#94A3B8' }}>
                  {videoFile ? `✓ ${videoFile.name}` : 'Aucun fichier sélectionné'}
                </span>
                <label style={{
                  padding: '6px 14px', borderRadius: '8px',
                  background: '#1E3A8A', color: '#fff', cursor: 'pointer',
                  fontSize: '12px', fontFamily: 'DM Sans, sans-serif', fontWeight: '500',
                }}>
                  🎬 Parcourir
                  <input type="file" accept=".mp4,.mov,.webm" style={{ display: 'none' }}
                    onChange={e => setVideoFile(e.target.files[0])} />
                </label>
              </div>
              {videoFile && (
                <p style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>
                  ⚠️ Assurez-vous que la vidéo fait moins de 30 secondes
                </p>
              )}
            </div>

            {/* Lettre */}
            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>
                ✍️ Lettre de motivation
                <span style={{ color: '#94A3B8', fontSize: '12px', fontWeight: '400' }}> (optionnel)</span>
              </label>
              <textarea
                placeholder="Présentez-vous et expliquez pourquoi vous êtes intéressé..."
                value={lettre} onChange={e => setLettre(e.target.value)}
                rows={4}
                style={{
                  width: '100%', padding: '12px 14px',
                  border: '1.5px solid #E2E8F0', borderRadius: '10px',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
                  outline: 'none', boxSizing: 'border-box',
                  background: '#F8FAFC', resize: 'vertical',
                }}
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
              <button onClick={handlePostuler} style={{
                flex: 1, height: '44px', borderRadius: '50px', border: 'none',
                background: '#1E3A8A', color: '#fff', cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: '500',
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

const inputStyle = {
  width: '100%', height: '42px', padding: '0 14px',
  border: '1.5px solid #E2E8F0', borderRadius: '10px',
  fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
  outline: 'none', boxSizing: 'border-box', background: '#F8FAFC',
};

const labelStyle = {
  fontSize: '13px', fontWeight: '500', color: '#475569',
  display: 'block', marginBottom: '6px',
};
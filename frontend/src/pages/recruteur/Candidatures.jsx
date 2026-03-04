import React, { useState, useEffect } from 'react';
import RecruteurLayout from '../../layouts/RecruteurLayout';
import api from '../../utils/api';

const statutColors = {
  en_attente: { bg: '#FFF7ED', color: '#FB923C', label: '⏳ En attente' },
  accepte:    { bg: '#F0FDF4', color: '#059669', label: '✅ Accepté' },
  refuse:     { bg: '#FEF2F2', color: '#EF4444', label: '❌ Refusé' },
  entretien:  { bg: '#EDE9FE', color: '#7C3AED', label: '🗓 Entretien' },
};

export default function Candidatures() {
  const [mesOffres, setMesOffres] = useState([]);
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOffre, setSelectedOffre] = useState(null);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchMesOffres();
  }, []);

  useEffect(() => {
    if (selectedOffre) {
      fetchCandidatures(selectedOffre);
    } else {
      setCandidatures([]);
    }
  }, [selectedOffre]);

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

  const fetchCandidatures = async (offreId) => {
    try {
      setLoading(true);
      const data = await api(`/candidatures/offre/${offreId}`);
      setCandidatures(data.candidatures);
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

  const changeStatut = async (id, statut) => {
    try {
      await api(`/candidatures/${id}`, 'PUT', { statut });
      showMessage('success', `✅ Statut mis à jour !`);
      if (selectedOffre) fetchCandidatures(selectedOffre);
      if (selected?._id === id) setSelected(s => ({ ...s, statut }));
    } catch (err) {
      showMessage('error', err.message);
    }
  };

  return (
    <RecruteurLayout title="Candidatures reçues">

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

      {/* Sélection offre */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{
          fontFamily: 'Syne, sans-serif', fontSize: '16px',
          fontWeight: '700', color: '#1E293B', marginBottom: '12px',
        }}>
          Sélectionnez une offre
        </h3>
        {loading && mesOffres.length === 0 ? (
          <div style={{ color: '#94A3B8' }}>Chargement...</div>
        ) : mesOffres.length === 0 ? (
          <div style={{
            background: '#FEF3C7', border: '1px solid #FCD34D',
            borderRadius: '10px', padding: '16px',
            color: '#92400E', fontSize: '14px',
          }}>
            ⚠️ Vous n'avez pas encore publié d'offres.
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {mesOffres.map(o => (
              <button key={o._id} onClick={() => {
                setSelectedOffre(o._id);
                setSelected(null);
              }} style={{
                padding: '10px 20px', borderRadius: '50px', border: 'none',
                cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                fontSize: '13px', fontWeight: '500',
                background: selectedOffre === o._id ? '#1E3A8A' : '#F1F5F9',
                color: selectedOffre === o._id ? '#fff' : '#475569',
                transition: '150ms',
              }}>
                📋 {o.titre}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      {selectedOffre && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'Total',      value: candidatures.length,                                              color: '#1E3A8A', bg: '#DBEAFE', icon: '📋' },
            { label: 'En attente', value: candidatures.filter(c => c.statut === 'en_attente').length,       color: '#D97706', bg: '#FEF3C7', icon: '⏳' },
            { label: 'Acceptés',   value: candidatures.filter(c => c.statut === 'accepte').length,          color: '#059669', bg: '#D1FAE5', icon: '✅' },
            { label: 'Refusés',    value: candidatures.filter(c => c.statut === 'refuse').length,           color: '#EF4444', bg: '#FEE2E2', icon: '❌' },
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
      )}

      {/* Table + Panel */}
      {selectedOffre && (
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 360px' : '1fr', gap: '20px' }}>

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
                      {['Candidat', 'Expérience', 'Compétences', 'Score IA', 'Statut', 'Actions'].map(h => (
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
                    {candidatures.map((c, i) => (
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
                              {c.candidat?.nom?.[0] || '?'}
                            </div>
                            <div>
                              <div style={{ fontSize: '14px', fontWeight: '500', color: '#1E293B' }}>
                                {c.candidat?.nom || '—'}
                              </div>
                              <div style={{ fontSize: '12px', color: '#94A3B8' }}>
                                {c.candidat?.email || '—'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td style={tdStyle}>
                          {c.candidat?.experience ? `${c.candidat.experience} ans` : '—'}
                        </td>
                        <td style={tdStyle}>
                          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                            {(c.candidat?.competences || []).slice(0, 2).map((k, j) => (
                              <span key={j} style={{
                                background: '#F1F5F9', color: '#475569',
                                padding: '2px 8px', borderRadius: '4px',
                                fontSize: '11px', fontWeight: '500',
                              }}>
                                {k}
                              </span>
                            ))}
                            {(c.candidat?.competences || []).length === 0 && (
                              <span style={{ fontSize: '12px', color: '#CBD5E1' }}>—</span>
                            )}
                          </div>
                        </td>
                        {/* Score IA placeholder */}
                        <td style={{ ...tdStyle, minWidth: '100px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ flex: 1, height: '5px', background: '#F1F5F9', borderRadius: '99px' }} />
                            <span style={{ fontSize: '12px', color: '#CBD5E1', fontWeight: '600' }}>--</span>
                          </div>
                        </td>
                        <td style={tdStyle}>
                          <span style={{
                            background: statutColors[c.statut]?.bg,
                            color: statutColors[c.statut]?.color,
                            padding: '4px 10px', borderRadius: '50px',
                            fontSize: '12px', fontWeight: '600',
                          }}>
                            {statutColors[c.statut]?.label || c.statut}
                          </span>
                        </td>
                        <td style={{ ...tdStyle, whiteSpace: 'nowrap' }}>
                          <button onClick={() => setSelected(selected?._id === c._id ? null : c)} style={btnStyle('#EDE9FE', '#7C3AED')}>
                            👁 Voir
                          </button>
                        </td>
                      </tr>
                    ))}
                    {candidatures.length === 0 && (
                      <tr>
                        <td colSpan={6} style={{
                          textAlign: 'center', padding: '40px',
                          color: '#94A3B8', fontSize: '14px',
                        }}>
                          Aucune candidature pour cette offre
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
                  Profil Candidat
                </h3>
                <button onClick={() => setSelected(null)} style={{
                  background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: '18px',
                }}>✕</button>
              </div>

              {/* Avatar */}
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: '#EDE9FE', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: '#7C3AED',
                  fontWeight: '800', fontSize: '24px', fontFamily: 'Syne, sans-serif',
                  margin: '0 auto 10px',
                }}>
                  {selected.candidat?.nom?.[0] || '?'}
                </div>
                <div style={{ fontWeight: '700', fontSize: '16px', color: '#1E293B', fontFamily: 'Syne, sans-serif' }}>
                  {selected.candidat?.nom}
                </div>
                <div style={{ fontSize: '13px', color: '#94A3B8' }}>{selected.candidat?.email}</div>
              </div>

              {/* Score IA placeholder */}
              <div style={{
                background: '#F8FAFC', border: '2px dashed #E2E8F0',
                borderRadius: '12px', padding: '16px',
                textAlign: 'center', marginBottom: '16px',
              }}>
                <div style={{ fontSize: '24px', marginBottom: '4px' }}>🤖</div>
                <div style={{ fontSize: '28px', fontWeight: '800', color: '#CBD5E1', fontFamily: 'Syne, sans-serif' }}>
                  -- / 100
                </div>
                <div style={{ fontSize: '11px', color: '#CBD5E1' }}>
                  Score IA — disponible après intégration ML
                </div>
              </div>

              {/* Infos */}
              {[
                { label: 'Expérience',  value: selected.candidat?.experience ? `${selected.candidat.experience} ans` : '—' },
                { label: 'Téléphone',   value: selected.candidat?.telephone || '—' },
                { label: 'Postulé le',  value: new Date(selected.createdAt).toLocaleDateString('fr-FR') },
              ].map((f, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '10px 0', borderBottom: '1px solid #F1F5F9', fontSize: '13px',
                }}>
                  <span style={{ color: '#94A3B8' }}>{f.label}</span>
                  <span style={{ color: '#1E293B', fontWeight: '500' }}>{f.value}</span>
                </div>
              ))}

              {/* Lettre */}
              {selected.lettre && (
                <div style={{ marginTop: '16px' }}>
                  <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                    Lettre de motivation
                  </div>
                  <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.7', background: '#F8FAFC', borderRadius: '8px', padding: '12px' }}>
                    {selected.lettre}
                  </p>
                </div>
              )}

              {/* Compétences */}
              {(selected.candidat?.competences || []).length > 0 && (
                <div style={{ marginTop: '16px' }}>
                  <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                    Compétences
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {selected.candidat.competences.map((k, i) => (
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

              {/* Changer statut */}
              <div style={{ marginTop: '20px' }}>
                <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                  Changer le statut
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {Object.entries(statutColors).map(([key, val]) => (
                    <button key={key} onClick={() => changeStatut(selected._id, key)} style={{
                      padding: '10px 16px', borderRadius: '8px', border: 'none',
                      cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                      fontSize: '13px', fontWeight: '600',
                      background: selected.statut === key ? val.color : val.bg,
                      color: selected.statut === key ? '#fff' : val.color,
                      transition: '200ms',
                    }}>
                      {val.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Message si aucune offre sélectionnée */}
      {!selectedOffre && mesOffres.length > 0 && (
        <div style={{
          background: '#EFF6FF', border: '1px solid #BFDBFE',
          borderRadius: '12px', padding: '40px',
          textAlign: 'center', color: '#1E3A8A',
        }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>📋</div>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '16px', fontWeight: '700' }}>
            Sélectionnez une offre pour voir les candidatures
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
  padding: '6px 12px', fontSize: '12px', cursor: 'pointer',
  fontFamily: 'DM Sans, sans-serif', fontWeight: '500',
});
import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';

const initialCandidats = [
  {
    id: 1,
    name: 'Yasmine Benali',
    email: 'yasmine@mail.com',
    competences: ['React', 'Node.js', 'MongoDB'],
    experience: '3 ans',
    candidatures: 4,
    cv: 'CV_Yasmine.pdf',
    score: null,
    status: true,
  },
  {
    id: 2,
    name: 'Karim Mansouri',
    email: 'karim@mail.com',
    competences: ['Python', 'Django', 'SQL'],
    experience: '5 ans',
    candidatures: 2,
    cv: 'CV_Karim.pdf',
    score: null,
    status: true,
  },
  {
    id: 3,
    name: 'Lina Cherif',
    email: 'lina@mail.com',
    competences: ['UI/UX', 'Figma', 'CSS'],
    experience: '2 ans',
    candidatures: 6,
    cv: 'CV_Lina.pdf',
    score: null,
    status: true,
  },
  {
    id: 4,
    name: 'Mehdi Oussama',
    email: 'mehdi@mail.com',
    competences: ['Java', 'Spring Boot', 'Docker'],
    experience: '4 ans',
    candidatures: 3,
    cv: 'CV_Mehdi.pdf',
    score: null,
    status: false,
  },
];

// Composant Score — vide jusqu'à intégration ML
function ScoreCell() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}>
      {/* Barre vide */}
      <div style={{
        flex: 1,
        height: '6px',
        background: '#F1F5F9',
        borderRadius: '99px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: '0%',
          height: '100%',
          background: '#CBD5E1',
          borderRadius: '99px',
        }} />
      </div>
      <span style={{
        fontSize: '12px',
        color: '#CBD5E1',
        fontWeight: '600',
        minWidth: '28px',
      }}>
        --
      </span>
    </div>
  );
}

export default function ConsultationCandidats() {
  const [candidats, setCandidats] = useState(initialCandidats);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [filterStatus, setFilterStatus] = useState('tous');

  const filtered = candidats.filter(c => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.competences.some(k => k.toLowerCase().includes(search.toLowerCase()));
    const matchStatus =
      filterStatus === 'tous' ? true :
      filterStatus === 'actif' ? c.status : !c.status;
    return matchSearch && matchStatus;
  });

  const deleteCandidat = (id) => {
    if (window.confirm('Supprimer ce candidat ?')) {
      setCandidats(cs => cs.filter(c => c.id !== id));
      if (selected?.id === id) setSelected(null);
    }
  };

  const toggleStatus = (id) => {
    setCandidats(cs => cs.map(c => c.id === id ? { ...c, status: !c.status } : c));
    if (selected?.id === id) setSelected(s => ({ ...s, status: !s.status }));
  };

  return (
    <AdminLayout title="Consultation des Candidats">

      {/* Stats */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {[
          { label: 'Total candidats', value: candidats.length,                         color: '#1E3A8A' },
          { label: 'Actifs',          value: candidats.filter(c => c.status).length,  color: '#059669' },
          { label: 'Inactifs',        value: candidats.filter(c => !c.status).length, color: '#EF4444' },
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

        {/* Badge Score IA désactivé */}
        <div style={{
          background: '#F8FAFC',
          border: '1.5px dashed #CBD5E1',
          borderRadius: '10px',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flex: '1 1 100px',
          justifyContent: 'center',
        }}>
          <span style={{ fontSize: '18px' }}>🤖</span>
          <div>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#94A3B8' }}>
              Score IA
            </div>
            <div style={{ fontSize: '11px', color: '#CBD5E1' }}>
              Non activé
            </div>
          </div>
        </div>
      </div>

      {/* Barre outils */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          placeholder="🔍 Rechercher par nom, email, compétence..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1, minWidth: '240px', height: '42px', padding: '0 16px',
            borderRadius: '10px', border: '1.5px solid #E2E8F0',
            fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
            outline: 'none', background: '#F8FAFC',
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

      {/* Table + Panel détail */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: selected ? '1fr 340px' : '1fr',
        gap: '20px', alignItems: 'start',
      }}>

        {/* Table */}
        <div style={{
          background: '#fff', borderRadius: '12px',
          border: '1px solid #E2E8F0', overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(15,23,42,.06)',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                {['Candidat', 'Expérience', 'Compétences', 'Candidatures', 'CV', 'Score IA', 'Statut', 'Actions'].map(h => (
                  <th key={h} style={{
                    padding: '14px 16px', textAlign: 'left', fontSize: '11px',
                    fontWeight: '600', color: h === 'Score IA' ? '#CBD5E1' : '#94A3B8',
                    textTransform: 'uppercase', letterSpacing: '.05em',
                  }}>
                    {h === 'Score IA' ? '🤖 ' + h : h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={c.id} style={{
                  borderBottom: i < filtered.length - 1 ? '1px solid #F1F5F9' : 'none',
                  background: selected?.id === c.id ? '#F5F3FF' : 'transparent',
                }}>

                  {/* Candidat */}
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '50%',
                        background: '#EDE9FE', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', color: '#7C3AED',
                        fontWeight: '700', fontSize: '14px', fontFamily: 'Syne, sans-serif',
                        flexShrink: 0,
                      }}>
                        {c.name[0]}
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#1E293B' }}>{c.name}</div>
                        <div style={{ fontSize: '11px', color: '#94A3B8' }}>{c.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Expérience */}
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#475569' }}>
                    {c.experience}
                  </td>

                  {/* Compétences */}
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {c.competences.slice(0, 2).map((k, j) => (
                        <span key={j} style={{
                          background: '#F1F5F9', color: '#475569',
                          padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '500',
                        }}>
                          {k}
                        </span>
                      ))}
                      {c.competences.length > 2 && (
                        <span style={{
                          background: '#E2E8F0', color: '#94A3B8',
                          padding: '2px 8px', borderRadius: '4px', fontSize: '11px',
                        }}>
                          +{c.competences.length - 2}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Candidatures */}
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      background: '#DBEAFE', color: '#1E3A8A',
                      padding: '4px 10px', borderRadius: '50px',
                      fontSize: '12px', fontWeight: '500',
                    }}>
                      {c.candidatures}
                    </span>
                  </td>

                  {/* CV */}
                  <td style={{ padding: '14px 16px', fontSize: '12px', color: '#2563EB' }}>
                    📄 {c.cv}
                  </td>

                  {/* Score IA — vide */}
                  <td style={{ padding: '14px 16px', minWidth: '120px' }}>
                    <ScoreCell />
                  </td>

                  {/* Statut */}
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      background: c.status ? '#F0FDF4' : '#FEF2F2',
                      color: c.status ? '#059669' : '#EF4444',
                      padding: '4px 10px', borderRadius: '50px',
                      fontSize: '11px', fontWeight: '500',
                    }}>
                      {c.status ? '✓ Actif' : '✕ Inactif'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button onClick={() => setSelected(selected?.id === c.id ? null : c)} style={btnStyle('#EDE9FE', '#7C3AED')}>👁</button>
                      <button onClick={() => toggleStatus(c.id)} style={btnStyle('#FFF7ED', '#FB923C')}>{c.status ? '⏸' : '▶'}</button>
                      <button onClick={() => deleteCandidat(c.id)} style={btnStyle('#FEF2F2', '#EF4444')}>🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', color: '#94A3B8', fontSize: '14px' }}>
              Aucun candidat trouvé
            </div>
          )}
        </div>

        {/* Panel détail */}
        {selected && (
          <div style={{
            background: '#fff', borderRadius: '12px', padding: '24px',
            border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(15,23,42,.06)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
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
                {selected.name[0]}
              </div>
              <div style={{ fontWeight: '700', fontSize: '16px', color: '#1E293B', fontFamily: 'Syne, sans-serif' }}>
                {selected.name}
              </div>
              <div style={{ fontSize: '13px', color: '#94A3B8' }}>{selected.email}</div>
            </div>

            {/* Score IA — placeholder */}
            <div style={{
              background: '#F8FAFC',
              border: '2px dashed #E2E8F0',
              borderRadius: '12px', padding: '20px',
              textAlign: 'center', marginBottom: '20px',
            }}>
              <div style={{ fontSize: '28px', marginBottom: '6px' }}>🤖</div>
              <div style={{
                fontSize: '32px', fontWeight: '800', color: '#CBD5E1',
                fontFamily: 'Syne, sans-serif',
              }}>
                -- / 100
              </div>
              <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '6px' }}>
                Score IA — disponible après intégration ML
              </div>
              {/* Barre vide */}
              <div style={{
                height: '6px', background: '#E2E8F0', borderRadius: '99px',
                marginTop: '12px', overflow: 'hidden',
              }}>
                <div style={{ width: '0%', height: '100%', background: '#CBD5E1' }} />
              </div>
            </div>

            {/* Infos */}
            {[
              { label: 'Expérience',   value: selected.experience },
              { label: 'Candidatures', value: `${selected.candidatures} soumises` },
              { label: 'CV',           value: selected.cv },
              { label: 'Statut',       value: selected.status ? 'Actif' : 'Inactif' },
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

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
              <button
                onClick={() => toggleStatus(selected.id)}
                style={{
                  flex: 1, height: '40px', borderRadius: '50px', border: 'none',
                  background: selected.status ? '#FEF2F2' : '#F0FDF4',
                  color: selected.status ? '#EF4444' : '#059669',
                  cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                  fontSize: '13px', fontWeight: '500',
                }}
              >
                {selected.status ? '⏸ Désactiver' : '▶ Activer'}
              </button>
              <button
                onClick={() => deleteCandidat(selected.id)}
                style={{
                  flex: 1, height: '40px', borderRadius: '50px', border: 'none',
                  background: '#FEF2F2', color: '#EF4444',
                  cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                  fontSize: '13px', fontWeight: '500',
                }}
              >
                🗑 Supprimer
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

const btnStyle = (bg, color) => ({
  background: bg, color, border: 'none', borderRadius: '6px',
  padding: '7px 10px', fontSize: '13px', cursor: 'pointer',
  fontFamily: 'DM Sans, sans-serif', fontWeight: '500',
});
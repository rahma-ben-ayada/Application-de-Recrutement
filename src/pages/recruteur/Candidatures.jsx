import React, { useState } from 'react';
import RecruteurLayout from '../../layouts/RecruteurLayout';

const offres = [
  { id: 1, titre: 'Développeur React Senior' },
  { id: 2, titre: 'Data Scientist' },
  { id: 3, titre: 'UX/UI Designer' },
];

const allCandidatures = [
  { id: 1, offreId: 1, name: 'Yasmine Benali',  email: 'yasmine@mail.com', experience: '3 ans', competences: ['React', 'Node.js'], cv: 'CV_Yasmine.pdf', statut: 'En attente' },
  { id: 2, offreId: 1, name: 'Karim Mansouri',  email: 'karim@mail.com',   experience: '5 ans', competences: ['React', 'TypeScript'], cv: 'CV_Karim.pdf', statut: 'Accepté' },
  { id: 3, offreId: 2, name: 'Lina Cherif',     email: 'lina@mail.com',    experience: '2 ans', competences: ['Python', 'ML'], cv: 'CV_Lina.pdf', statut: 'En attente' },
  { id: 4, offreId: 2, name: 'Mehdi Oussama',   email: 'mehdi@mail.com',   experience: '4 ans', competences: ['Python', 'Django'], cv: 'CV_Mehdi.pdf', statut: 'Refusé' },
  { id: 5, offreId: 3, name: 'Sara Tounsi',     email: 'sara@mail.com',    experience: '2 ans', competences: ['Figma', 'CSS'], cv: 'CV_Sara.pdf', statut: 'En attente' },
];

const statutColors = {
  'En attente': { bg: '#FFF7ED', color: '#FB923C' },
  'Accepté':    { bg: '#F0FDF4', color: '#059669' },
  'Refusé':     { bg: '#FEF2F2', color: '#EF4444' },
};

export default function Candidatures() {
  const [selectedOffre, setSelectedOffre] = useState(null);
  const [selected, setSelected] = useState(null);
  const [candidatures, setCandidatures] = useState(allCandidatures);

  const filtered = selectedOffre
    ? candidatures.filter(c => c.offreId === selectedOffre)
    : candidatures;

  const changeStatut = (id, statut) => {
    setCandidatures(cs => cs.map(c => c.id === id ? { ...c, statut } : c));
    if (selected?.id === id) setSelected(s => ({ ...s, statut }));
  };

  return (
    <RecruteurLayout title="Candidatures reçues">

      {/* Filtre par offre */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setSelectedOffre(null)}
          style={{
            padding: '8px 18px', borderRadius: '50px', border: 'none', cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: '500',
            background: !selectedOffre ? '#1E3A8A' : '#F1F5F9',
            color: !selectedOffre ? '#fff' : '#475569',
          }}
        >
          Toutes les offres ({candidatures.length})
        </button>
        {offres.map(o => (
          <button
            key={o.id}
            onClick={() => setSelectedOffre(o.id)}
            style={{
              padding: '8px 18px', borderRadius: '50px', border: 'none', cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: '500',
              background: selectedOffre === o.id ? '#1E3A8A' : '#F1F5F9',
              color: selectedOffre === o.id ? '#fff' : '#475569',
            }}
          >
            {o.titre} ({candidatures.filter(c => c.offreId === o.id).length})
          </button>
        ))}
      </div>

      {/* Table + Panel */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: selected ? '1fr 340px' : '1fr',
        gap: '20px', alignItems: 'start',
      }}>
        <div style={{
          background: '#fff', borderRadius: '12px',
          border: '1px solid #E2E8F0', overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(15,23,42,.06)',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                {['Candidat', 'Offre', 'Expérience', 'Compétences', 'CV', 'Score IA', 'Statut', 'Actions'].map(h => (
                  <th key={h} style={{
                    padding: '14px 16px', textAlign: 'left', fontSize: '11px',
                    fontWeight: '600',
                    color: h === 'Score IA' ? '#CBD5E1' : '#94A3B8',
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
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '34px', height: '34px', borderRadius: '50%',
                        background: '#EDE9FE', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', color: '#7C3AED',
                        fontWeight: '700', fontSize: '13px', fontFamily: 'Syne, sans-serif',
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
                  <td style={{ padding: '14px 16px', fontSize: '12px', color: '#475569' }}>
                    {offres.find(o => o.id === c.offreId)?.titre}
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#475569' }}>{c.experience}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {c.competences.map((k, j) => (
                        <span key={j} style={{
                          background: '#F1F5F9', color: '#475569',
                          padding: '2px 8px', borderRadius: '4px', fontSize: '11px',
                        }}>
                          {k}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '12px', color: '#2563EB' }}>
                    📄 {c.cv}
                  </td>
                  {/* Score IA vide */}
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ flex: 1, height: '5px', background: '#F1F5F9', borderRadius: '99px' }} />
                      <span style={{ fontSize: '12px', color: '#CBD5E1', fontWeight: '600' }}>--</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      background: statutColors[c.statut]?.bg,
                      color: statutColors[c.statut]?.color,
                      padding: '4px 10px', borderRadius: '50px', fontSize: '11px', fontWeight: '500',
                    }}>
                      {c.statut}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <button onClick={() => setSelected(selected?.id === c.id ? null : c)} style={btnStyle('#EDE9FE', '#7C3AED')}>
                      👁
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', color: '#94A3B8' }}>
              Aucune candidature
            </div>
          )}
        </div>

        {/* Panel détail candidat */}
        {selected && (
          <div style={{
            background: '#fff', borderRadius: '12px', padding: '24px',
            border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(15,23,42,.06)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '16px', fontWeight: '700', color: '#1E293B' }}>
                Profil Candidat
              </h3>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: '18px' }}>✕</button>
            </div>

            {/* Avatar */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{
                width: '60px', height: '60px', borderRadius: '50%',
                background: '#EDE9FE', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: '#7C3AED',
                fontWeight: '800', fontSize: '22px', fontFamily: 'Syne, sans-serif',
                margin: '0 auto 8px',
              }}>
                {selected.name[0]}
              </div>
              <div style={{ fontWeight: '700', fontSize: '15px', color: '#1E293B', fontFamily: 'Syne, sans-serif' }}>
                {selected.name}
              </div>
              <div style={{ fontSize: '12px', color: '#94A3B8' }}>{selected.email}</div>
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
              { label: 'Expérience', value: selected.experience },
              { label: 'CV', value: selected.cv },
              { label: 'Offre', value: offres.find(o => o.id === selected.offreId)?.titre },
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
            <div style={{ margin: '16px 0' }}>
              <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px' }}>Compétences</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {selected.competences.map((k, i) => (
                  <span key={i} style={{
                    background: '#F1F5F9', color: '#475569',
                    padding: '4px 12px', borderRadius: '6px', fontSize: '12px',
                  }}>
                    {k}
                  </span>
                ))}
              </div>
            </div>

            {/* Changer statut */}
            <div>
              <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                Changer le statut
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['En attente', 'Accepté', 'Refusé'].map(s => (
                  <button
                    key={s}
                    onClick={() => changeStatut(selected.id, s)}
                    style={{
                      padding: '8px 14px', borderRadius: '50px', border: 'none', cursor: 'pointer',
                      fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: '500',
                      background: selected.statut === s ? statutColors[s].color : '#F1F5F9',
                      color: selected.statut === s ? '#fff' : '#475569',
                      transition: '200ms',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </RecruteurLayout>
  );
}

const btnStyle = (bg, color) => ({
  background: bg, color, border: 'none', borderRadius: '6px',
  padding: '7px 10px', fontSize: '13px', cursor: 'pointer',
  fontFamily: 'DM Sans, sans-serif', fontWeight: '500',
});
import React, { useState } from 'react';
import CandidatLayout from '../../layouts/CandidatLayout';

const candidaturesData = [
  {
    id: 1,
    titre: 'Développeur React Senior',
    entreprise: 'Tech Corp',
    lieu: 'Tunis',
    type: 'CDI',
    datePostulation: '2026-01-16',
    statut: 'En attente',
    cv: 'CV_MonNom.pdf',
  },
  {
    id: 2,
    titre: 'Data Scientist',
    entreprise: 'StartUp RH',
    lieu: 'Remote',
    type: 'CDD',
    datePostulation: '2026-01-21',
    statut: 'Accepté',
    cv: 'CV_MonNom.pdf',
  },
  {
    id: 3,
    titre: 'Chef de projet IT',
    entreprise: 'Dev Studio',
    lieu: 'Tunis',
    type: 'CDI',
    datePostulation: '2026-01-19',
    statut: 'Refusé',
    cv: 'CV_MonNom.pdf',
  },
];

const statutColors = {
  'En attente': { bg: '#FFF7ED', color: '#FB923C', icon: '⏳' },
  'Accepté':    { bg: '#F0FDF4', color: '#059669', icon: '✅' },
  'Refusé':     { bg: '#FEF2F2', color: '#EF4444', icon: '❌' },
  'Entretien':  { bg: '#EDE9FE', color: '#7C3AED', icon: '🎯' },
};

export default function MesCandidatures() {
  const [candidatures] = useState(candidaturesData);
  const [filter, setFilter] = useState('Tous');
  const [selected, setSelected] = useState(null);

  const statuts = ['Tous', 'En attente', 'Accepté', 'Refusé'];

  const filtered = filter === 'Tous'
    ? candidatures
    : candidatures.filter(c => c.statut === filter);

  return (
    <CandidatLayout title="Mes Candidatures">

      {/* Stats */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {[
          { label: 'Total',       value: candidatures.length,                              color: '#1E3A8A' },
          { label: 'En attente',  value: candidatures.filter(c => c.statut === 'En attente').length, color: '#FB923C' },
          { label: 'Acceptées',   value: candidatures.filter(c => c.statut === 'Accepté').length,  color: '#059669' },
          { label: 'Refusées',    value: candidatures.filter(c => c.statut === 'Refusé').length,   color: '#EF4444' },
        ].map((s, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: '10px', padding: '12px 24px',
            border: '1px solid #E2E8F0', textAlign: 'center', flex: '1 1 100px',
          }}>
            <div style={{ fontSize: '22px', fontWeight: '800', color: s.color, fontFamily: 'Syne, sans-serif' }}>
              {s.value}
            </div>
            <div style={{ fontSize: '12px', color: '#94A3B8' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filtre statut */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {statuts.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              padding: '8px 18px', borderRadius: '50px', border: 'none',
              cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
              fontSize: '13px', fontWeight: '500',
              background: filter === s ? '#1E3A8A' : '#fff',
              color: filter === s ? '#fff' : '#475569',
              boxShadow: '0 1px 3px rgba(15,23,42,.08)',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Liste candidatures */}
      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 340px' : '1fr', gap: '20px', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.length === 0 && (
            <div style={{
              background: '#fff', borderRadius: '12px', padding: '40px',
              textAlign: 'center', color: '#94A3B8', border: '1px solid #E2E8F0',
            }}>
              Aucune candidature trouvée
            </div>
          )}

          {filtered.map(c => {
            const s = statutColors[c.statut];
            return (
              <div
                key={c.id}
                onClick={() => setSelected(selected?.id === c.id ? null : c)}
                style={{
                  background: '#fff', borderRadius: '12px', padding: '20px 24px',
                  border: selected?.id === c.id ? '2px solid #1E3A8A' : '1px solid #E2E8F0',
                  boxShadow: '0 4px 16px rgba(15,23,42,.06)',
                  cursor: 'pointer', transition: '200ms',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '10px',
                    background: '#DBEAFE', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '20px', flexShrink: 0,
                  }}>
                    🏢
                  </div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#1E293B', fontFamily: 'Syne, sans-serif' }}>
                      {c.titre}
                    </div>
                    <div style={{ fontSize: '13px', color: '#94A3B8', marginTop: '2px' }}>
                      {c.entreprise} • 📍 {c.lieu} • {c.type}
                    </div>
                    <div style={{ fontSize: '12px', color: '#CBD5E1', marginTop: '4px' }}>
                      Postulé le {c.datePostulation}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    background: s.bg, color: s.color,
                    padding: '6px 14px', borderRadius: '50px',
                    fontSize: '13px', fontWeight: '600',
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                  }}>
                    {s.icon} {c.statut}
                  </span>
                </div>
              </div>
            );
          })}
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
                Détail candidature
              </h3>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: '18px' }}>✕</button>
            </div>

            {/* Statut mis en avant */}
            <div style={{
              background: statutColors[selected.statut].bg,
              borderRadius: '12px', padding: '16px', textAlign: 'center', marginBottom: '20px',
            }}>
              <div style={{ fontSize: '32px', marginBottom: '4px' }}>
                {statutColors[selected.statut].icon}
              </div>
              <div style={{
                fontSize: '16px', fontWeight: '700',
                color: statutColors[selected.statut].color,
                fontFamily: 'Syne, sans-serif',
              }}>
                {selected.statut}
              </div>
              <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>
                Statut de votre candidature
              </div>
            </div>

            {[
              { label: 'Poste',            value: selected.titre },
              { label: 'Entreprise',       value: selected.entreprise },
              { label: 'Lieu',             value: selected.lieu },
              { label: 'Type',             value: selected.type },
              { label: 'Date postulation', value: selected.datePostulation },
              { label: 'CV envoyé',        value: selected.cv },
            ].map((f, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '10px 0', borderBottom: '1px solid #F1F5F9', fontSize: '13px',
              }}>
                <span style={{ color: '#94A3B8' }}>{f.label}</span>
                <span style={{ color: '#1E293B', fontWeight: '500' }}>{f.value}</span>
              </div>
            ))}

            {/* Timeline */}
            <div style={{ marginTop: '20px' }}>
              <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                Suivi
              </div>
              {[
                { label: 'Candidature envoyée', done: true,  date: selected.datePostulation },
                { label: 'En cours d\'examen',  done: true,  date: '' },
                { label: 'Entretien',           done: selected.statut === 'Entretien' || selected.statut === 'Accepté', date: '' },
                { label: 'Décision finale',     done: selected.statut === 'Accepté' || selected.statut === 'Refusé', date: '' },
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                    background: step.done ? '#059669' : '#E2E8F0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', color: '#fff',
                  }}>
                    {step.done ? '✓' : ''}
                  </div>
                  <div style={{ flex: 1, fontSize: '13px', color: step.done ? '#1E293B' : '#94A3B8', fontWeight: step.done ? '500' : '400' }}>
                    {step.label}
                  </div>
                  {step.date && (
                    <span style={{ fontSize: '11px', color: '#94A3B8' }}>{step.date}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </CandidatLayout>
  );
}
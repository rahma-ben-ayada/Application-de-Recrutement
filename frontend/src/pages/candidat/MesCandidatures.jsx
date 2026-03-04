import React, { useState, useEffect } from 'react';
import CandidatLayout from '../../layouts/CandidatLayout';
import api from '../../utils/api';

const statutColors = {
  en_attente: { bg: '#FFF7ED', color: '#FB923C', icon: '⏳', label: 'En attente' },
  accepte:    { bg: '#F0FDF4', color: '#059669', icon: '✅', label: 'Accepté' },
  refuse:     { bg: '#FEF2F2', color: '#EF4444', icon: '❌', label: 'Refusé' },
  entretien:  { bg: '#EDE9FE', color: '#7C3AED', icon: '🎯', label: 'Entretien' },
};

export default function MesCandidatures() {
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('tous');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchMesCandidatures();
  }, []);

  const fetchMesCandidatures = async () => {
    try {
      const data = await api('/candidatures/mes');
      setCandidatures(data.candidatures);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const statuts = [
    { key: 'tous',       label: 'Tous' },
    { key: 'en_attente', label: 'En attente' },
    { key: 'accepte',    label: 'Accepté' },
    { key: 'refuse',     label: 'Refusé' },
    { key: 'entretien',  label: 'Entretien' },
  ];

  const filtered = filter === 'tous'
    ? candidatures
    : candidatures.filter(c => c.statut === filter);

  return (
    <CandidatLayout title="Mes Candidatures">

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total',      value: candidatures.length,                                              color: '#1E3A8A', bg: '#DBEAFE', icon: '📋' },
          { label: 'En attente', value: candidatures.filter(c => c.statut === 'en_attente').length,       color: '#FB923C', bg: '#FFF7ED', icon: '⏳' },
          { label: 'Acceptées',  value: candidatures.filter(c => c.statut === 'accepte').length,          color: '#059669', bg: '#D1FAE5', icon: '✅' },
          { label: 'Refusées',   value: candidatures.filter(c => c.statut === 'refuse').length,           color: '#EF4444', bg: '#FEE2E2', icon: '❌' },
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

      {/* Filtre statut */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {statuts.map(s => (
          <button key={s.key} onClick={() => setFilter(s.key)} style={{
            padding: '8px 18px', borderRadius: '50px', border: 'none',
            cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px', fontWeight: '500',
            background: filter === s.key ? '#1E3A8A' : '#fff',
            color: filter === s.key ? '#fff' : '#475569',
            boxShadow: '0 1px 3px rgba(15,23,42,.08)',
            transition: '150ms',
          }}>
            {s.label}
          </button>
        ))}
      </div>

      {/* Liste + Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 360px' : '1fr', gap: '20px', alignItems: 'start' }}>

        {/* Liste */}
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
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>📭</div>
              Aucune candidature trouvée
            </div>
          ) : (
            filtered.map(c => {
              const s = statutColors[c.statut] || statutColors.en_attente;
              return (
                <div key={c._id}
                  onClick={() => setSelected(selected?._id === c._id ? null : c)}
                  style={{
                    background: '#fff', borderRadius: '14px', padding: '20px 24px',
                    border: selected?._id === c._id ? '2px solid #1E3A8A' : '1px solid #E2E8F0',
                    cursor: 'pointer', transition: '200ms',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    boxShadow: selected?._id === c._id ? '0 4px 20px rgba(30,58,138,.15)' : '0 2px 8px rgba(15,23,42,.04)',
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
                        {c.offre?.titre || '—'}
                      </div>
                      <div style={{ fontSize: '13px', color: '#94A3B8', marginTop: '2px' }}>
                        {c.offre?.recruteur?.entreprise || '—'} • 📍 {c.offre?.lieu || '—'} • {c.offre?.type || '—'}
                      </div>
                      <div style={{ fontSize: '12px', color: '#CBD5E1', marginTop: '4px' }}>
                        Postulé le {new Date(c.createdAt).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </div>

                  <span style={{
                    background: s.bg, color: s.color,
                    padding: '6px 14px', borderRadius: '50px',
                    fontSize: '13px', fontWeight: '600',
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    whiteSpace: 'nowrap',
                  }}>
                    {s.icon} {s.label}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Panel détail */}
        {selected && (
          <div style={{
            background: '#fff', borderRadius: '16px', padding: '24px',
            border: '1px solid #E2E8F0', position: 'sticky', top: '20px',
            height: 'fit-content',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '16px', fontWeight: '700', color: '#1E293B' }}>
                Détail candidature
              </h3>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: '18px' }}>✕</button>
            </div>

            {/* Statut mis en avant */}
            <div style={{
              background: (statutColors[selected.statut] || statutColors.en_attente).bg,
              borderRadius: '12px', padding: '20px', textAlign: 'center', marginBottom: '20px',
            }}>
              <div style={{ fontSize: '36px', marginBottom: '6px' }}>
                {(statutColors[selected.statut] || statutColors.en_attente).icon}
              </div>
              <div style={{
                fontSize: '16px', fontWeight: '700', fontFamily: 'Syne, sans-serif',
                color: (statutColors[selected.statut] || statutColors.en_attente).color,
              }}>
                {(statutColors[selected.statut] || statutColors.en_attente).label}
              </div>
              <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>
                Statut de votre candidature
              </div>
            </div>

            {[
              { label: 'Poste',        value: selected.offre?.titre || '—' },
              { label: 'Entreprise',   value: selected.offre?.recruteur?.entreprise || '—' },
              { label: 'Lieu',         value: selected.offre?.lieu || '—' },
              { label: 'Type',         value: selected.offre?.type || '—' },
              { label: 'Postulé le',   value: new Date(selected.createdAt).toLocaleDateString('fr-FR') },
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

            {/* Timeline */}
            <div style={{ marginTop: '20px' }}>
              <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                Suivi
              </div>
              {[
                { label: 'Candidature envoyée', done: true },
                { label: "En cours d'examen",   done: true },
                { label: 'Entretien',            done: selected.statut === 'entretien' || selected.statut === 'accepte' },
                { label: 'Décision finale',      done: selected.statut === 'accepte' || selected.statut === 'refuse' },
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div style={{
                    width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                    background: step.done ? '#059669' : '#E2E8F0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', color: '#fff', fontWeight: '700',
                  }}>
                    {step.done ? '✓' : ''}
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: step.done ? '#1E293B' : '#94A3B8',
                    fontWeight: step.done ? '500' : '400',
                  }}>
                    {step.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </CandidatLayout>
  );
}
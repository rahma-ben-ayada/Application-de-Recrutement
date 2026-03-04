import React, { useState, useEffect } from 'react';
import RecruteurLayout from '../../layouts/RecruteurLayout';

const statutColors = {
  'Planifié': { bg: '#FFF7ED', color: '#FB923C', icon: '⏳' },
  'Accepté':  { bg: '#D1FAE5', color: '#059669', icon: '✅' },
  'Refusé':   { bg: '#FEE2E2', color: '#EF4444', icon: '❌' },
};

export default function EntretiensRH() {
  const [entretiens, setEntretiens] = useState([]);
  const [filter, setFilter] = useState('tous');

  useEffect(() => {
    const saved = localStorage.getItem('entretiens_recruteur');
    if (saved) setEntretiens(JSON.parse(saved));
  }, []);

  const filtered = filter === 'tous'
    ? entretiens
    : entretiens.filter(e => e.statut.toLowerCase() === filter);

  return (
    <RecruteurLayout title="Entretiens RH">

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total',     value: entretiens.length,                                      color: '#1E3A8A', bg: '#DBEAFE', icon: '🎯' },
          { label: 'Planifiés', value: entretiens.filter(e => e.statut === 'Planifié').length,  color: '#D97706', bg: '#FEF3C7', icon: '⏳' },
          { label: 'Acceptés',  value: entretiens.filter(e => e.statut === 'Accepté').length,   color: '#059669', bg: '#D1FAE5', icon: '✅' },
          { label: 'Refusés',   value: entretiens.filter(e => e.statut === 'Refusé').length,    color: '#EF4444', bg: '#FEE2E2', icon: '❌' },
        ].map((s, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: '14px', padding: '20px',
            border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '10px',
              background: s.bg, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '20px',
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
      </div>

      {/* Filtres */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {[
          { key: 'tous',     label: 'Tous' },
          { key: 'planifié', label: '⏳ Planifiés' },
          { key: 'accepté',  label: '✅ Acceptés' },
          { key: 'refusé',   label: '❌ Refusés' },
        ].map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)} style={{
            padding: '8px 18px', borderRadius: '50px', border: 'none',
            cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px', fontWeight: '500',
            background: filter === f.key ? '#1E3A8A' : '#fff',
            color: filter === f.key ? '#fff' : '#475569',
            boxShadow: '0 1px 3px rgba(15,23,42,.08)',
          }}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Liste */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filtered.length === 0 ? (
          <div style={{
            background: '#fff', borderRadius: '14px', padding: '40px',
            textAlign: 'center', color: '#94A3B8', border: '1px solid #E2E8F0',
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🎯</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '16px', fontWeight: '700' }}>
              Aucun entretien
            </div>
            <div style={{ fontSize: '13px', marginTop: '8px' }}>
              Allez dans "Planifier Entretien" pour en ajouter
            </div>
          </div>
        ) : (
          filtered.map(e => {
            const s = statutColors[e.statut] || statutColors['Planifié'];
            return (
              <div key={e.id} style={{
                background: '#fff', borderRadius: '14px', padding: '20px 24px',
                border: '1px solid #E2E8F0', display: 'flex',
                justifyContent: 'space-between', alignItems: 'center',
                boxShadow: '0 2px 8px rgba(15,23,42,.04)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '50%',
                    background: '#DBEAFE', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', color: '#1E3A8A',
                    fontWeight: '700', fontSize: '18px', flexShrink: 0,
                  }}>
                    {(e.candidature?.candidat?.nom || '?')[0]}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '15px', fontWeight: '700', color: '#1E293B' }}>
                      {e.candidature?.candidat?.nom || '—'}
                    </div>
                    <div style={{ fontSize: '13px', color: '#94A3B8', marginTop: '2px' }}>
                      {e.candidature?.offre?.titre || '—'}
                    </div>
                    <div style={{ fontSize: '12px', color: '#CBD5E1', marginTop: '4px' }}>
                      📅 {e.date} à 🕐 {e.heure}
                    </div>
                    {e.notes && (
                      <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>
                        📝 {e.notes}
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {e.lien && (
                    <a href={e.lien} target="_blank" rel="noreferrer" style={{
                      background: '#1E3A8A', color: '#fff',
                      padding: '8px 16px', borderRadius: '50px',
                      fontSize: '13px', fontWeight: '500',
                      textDecoration: 'none',
                    }}>
                      🔗 Rejoindre
                    </a>
                  )}
                  <span style={{
                    background: s.bg, color: s.color,
                    padding: '6px 14px', borderRadius: '50px',
                    fontSize: '12px', fontWeight: '600',
                  }}>
                    {s.icon} {e.statut}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </RecruteurLayout>
  );
}
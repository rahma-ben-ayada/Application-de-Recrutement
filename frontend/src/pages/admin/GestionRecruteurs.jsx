import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';

const initialRecruteurs = [
  { id: 1, name: 'Sophie Lambert',  email: 'sophie@rh.com',  entreprise: 'Tech Corp',    offres: 8,  status: true  },
  { id: 2, name: 'Marc Dubois',     email: 'marc@rh.com',    entreprise: 'StartUp RH',   offres: 3,  status: true  },
  { id: 3, name: 'Julie Petit',     email: 'julie@rh.com',   entreprise: 'Big Finance',  offres: 12, status: false },
  { id: 4, name: 'Antoine Moreau',  email: 'antoine@rh.com', entreprise: 'Dev Studio',   offres: 5,  status: true  },
];

export default function GestionRecruteurs() {
  const [recruteurs, setRecruteurs] = useState(initialRecruteurs);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = recruteurs.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.entreprise.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id) => {
    setRecruteurs(rs => rs.map(r => r.id === id ? { ...r, status: !r.status } : r));
  };

  const deleteRecruteur = (id) => {
    if (window.confirm('Supprimer ce recruteur ?')) {
      setRecruteurs(rs => rs.filter(r => r.id !== id));
      if (selected?.id === id) setSelected(null);
    }
  };

  return (
    <AdminLayout title="Gestion des Recruteurs">

      {/* Stats */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: 'Total recruteurs', value: recruteurs.length,                        color: '#1E3A8A' },
          { label: 'Actifs',           value: recruteurs.filter(r => r.status).length, color: '#059669' },
          { label: 'Inactifs',         value: recruteurs.filter(r => !r.status).length,color: '#EF4444' },
          { label: 'Offres totales',   value: recruteurs.reduce((a, r) => a + r.offres, 0), color: '#0891B2' },
        ].map((s, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: '10px', padding: '12px 24px',
            border: '1px solid #E2E8F0', textAlign: 'center',
          }}>
            <div style={{ fontSize: '22px', fontWeight: '800', color: s.color, fontFamily: 'Syne, sans-serif' }}>
              {s.value}
            </div>
            <div style={{ fontSize: '12px', color: '#94A3B8' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 340px' : '1fr', gap: '20px' }}>

        {/* Table */}
        <div>
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'flex-end' }}>
            <input
              placeholder="🔍 Rechercher un recruteur..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                height: '42px', padding: '0 16px', borderRadius: '10px',
                border: '1.5px solid #E2E8F0', fontFamily: 'DM Sans, sans-serif',
                fontSize: '14px', outline: 'none', width: '280px', background: '#F8FAFC',
              }}
            />
          </div>

          <div style={{
            background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0',
            overflow: 'hidden', boxShadow: '0 4px 16px rgba(15,23,42,.06)',
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  {['Recruteur', 'Entreprise', 'Offres', 'Statut', 'Actions'].map(h => (
                    <th key={h} style={{
                      padding: '14px 20px', textAlign: 'left', fontSize: '12px',
                      fontWeight: '600', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '.05em',
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={r.id} style={{
                    borderBottom: i < filtered.length - 1 ? '1px solid #F1F5F9' : 'none',
                    background: selected?.id === r.id ? '#F0F9FF' : 'transparent',
                    cursor: 'pointer',
                  }}>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '36px', height: '36px', borderRadius: '50%',
                          background: '#DBEAFE', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', color: '#1E3A8A',
                          fontWeight: '700', fontSize: '14px', fontFamily: 'Syne, sans-serif',
                        }}>
                          {r.name[0]}
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '500', color: '#1E293B' }}>{r.name}</div>
                          <div style={{ fontSize: '12px', color: '#94A3B8' }}>{r.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: '14px', color: '#475569' }}>{r.entreprise}</td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{
                        background: '#DBEAFE', color: '#1E3A8A',
                        padding: '4px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: '500',
                      }}>
                        {r.offres} offres
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{
                        background: r.status ? '#F0FDF4' : '#FEF2F2',
                        color: r.status ? '#059669' : '#EF4444',
                        padding: '4px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: '500',
                      }}>
                        {r.status ? '✓ Actif' : '✕ Inactif'}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => setSelected(selected?.id === r.id ? null : r)} style={btnStyle('#DBEAFE', '#1E3A8A')}>
                          👁 Voir
                        </button>
                        <button onClick={() => toggleStatus(r.id)} style={btnStyle('#FFF7ED', '#FB923C')}>
                          {r.status ? '⏸ Désactiver' : '▶ Activer'}
                        </button>
                        <button onClick={() => deleteRecruteur(r.id)} style={btnStyle('#FEF2F2', '#EF4444')}>
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Panel détail */}
        {selected && (
          <div style={{
            background: '#fff', borderRadius: '12px', padding: '24px',
            border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(15,23,42,.06)',
            height: 'fit-content',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '16px', fontWeight: '700', color: '#1E293B' }}>
                Fiche Recruteur
              </h3>
              <button onClick={() => setSelected(null)} style={{
                background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: '18px',
              }}>✕</button>
            </div>

            <div style={{
              width: '60px', height: '60px', borderRadius: '50%', background: '#DBEAFE',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#1E3A8A', fontWeight: '800', fontSize: '24px',
              fontFamily: 'Syne, sans-serif', margin: '0 auto 16px',
            }}>
              {selected.name[0]}
            </div>

            {[
              { label: 'Nom complet', value: selected.name },
              { label: 'Email', value: selected.email },
              { label: 'Entreprise', value: selected.entreprise },
              { label: 'Offres publiées', value: `${selected.offres} offres` },
              { label: 'Statut', value: selected.status ? 'Actif' : 'Inactif' },
            ].map((f, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '10px 0', borderBottom: '1px solid #F1F5F9',
                fontSize: '13px',
              }}>
                <span style={{ color: '#94A3B8' }}>{f.label}</span>
                <span style={{ color: '#1E293B', fontWeight: '500' }}>{f.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

const btnStyle = (bg, color) => ({
  background: bg, color, border: 'none', borderRadius: '6px',
  padding: '6px 10px', fontSize: '12px', cursor: 'pointer',
  fontFamily: 'DM Sans, sans-serif', fontWeight: '500', whiteSpace: 'nowrap',
});
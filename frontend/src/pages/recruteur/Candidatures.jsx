import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecruteurLayout from '../../layouts/RecruteurLayout';
import api from '../../utils/api';

// SVG Icons
const ClockIcon = ({ size = 20, color = '#FB923C' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const CheckCircleIcon = ({ size = 20, color = '#059669' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const XCircleIcon = ({ size = 20, color = '#EF4444' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
);

const TargetIcon = ({ size = 20, color = '#7C3AED' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const DocumentIcon = ({ size = 20, color = '#1E3A8A' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

const UserIcon = ({ size = 20, color = '#64748B' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const MailIcon = ({ size = 16, color = '#94A3B8' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const PhoneIcon = ({ size = 16, color = '#94A3B8' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const TrophyIcon = ({ size = 20, color = '#059669' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
);

const TrashIcon = ({ size = 20, color = '#EF4444' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>
);

const InboxIcon = ({ size = 40, color = '#94A3B8' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
  </svg>
);

const CalendarIcon = ({ size = 16, color = '#94A3B8' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const EyeIcon = ({ size = 16, color = '#64748B' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const getStatusConfig = (statut) => {
  const configs = {
    en_attente: { bg: '#FFF7ED', color: '#FB923C', icon: ClockIcon, label: 'En attente' },
    en_cours: { bg: '#DBEAFE', color: '#1E3A8A', icon: EyeIcon, label: 'En cours' },
    entretien: { bg: '#EDE9FE', color: '#7C3AED', icon: TargetIcon, label: 'Entretien' },
    accepte: { bg: '#F0FDF4', color: '#059669', icon: CheckCircleIcon, label: 'Accepté' },
    refuse: { bg: '#FEF2F2', color: '#EF4444', icon: XCircleIcon, label: 'Refusé' },
  };
  return configs[statut] || configs.en_attente;
};

export default function Candidatures() {
  const navigate = useNavigate();
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('tous');
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCandidatures();
  }, []);

  const fetchCandidatures = async () => {
    try {
      const data = await api('/candidatures');
      setCandidatures(data.candidatures || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatut = async (id, nouveauStatut) => {
    try {
      await api(`/candidatures/${id}/statut`, 'PUT', { statut: nouveauStatut });
      fetchCandidatures();
    } catch (err) {
      console.error(err);
    }
  };

  const getInitials = (nom) => {
    if (!nom) return 'U';
    return nom.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (nom) => {
    const colors = ['#5B73F7', '#10B981', '#8B5CF6', '#F59E0B', '#06B6D4', '#EC4899'];
    if (!nom) return colors[0];
    const index = nom.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const filtered = candidatures.filter(c => {
    const matchesFilter = filter === 'tous' || c.statut === filter;
    const matchesSearch = !search ||
      c.candidatId?.nom?.toLowerCase().includes(search.toLowerCase()) ||
      c.offreId?.titre?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filterOptions = [
    { key: 'tous',       label: 'Tous',        icon: <DocumentIcon size={18} color={filter === 'tous' ? '#FFFFFF' : '#475569'} /> },
    { key: 'en_attente', label: 'En attente',  icon: <ClockIcon size={18} color={filter === 'en_attente' ? '#FFFFFF' : '#475569'} /> },
    { key: 'en_cours',   label: 'En cours',    icon: <EyeIcon size={18} color={filter === 'en_cours' ? '#FFFFFF' : '#475569'} /> },
    { key: 'entretien',  label: 'Entretiens',  icon: <TargetIcon size={18} color={filter === 'entretien' ? '#FFFFFF' : '#475569'} /> },
    { key: 'accepte',    label: 'Acceptés',    icon: <CheckCircleIcon size={18} color={filter === 'accepte' ? '#FFFFFF' : '#475569'} /> },
    { key: 'refuse',     label: 'Refusés',     icon: <XCircleIcon size={18} color={filter === 'refuse' ? '#FFFFFF' : '#475569'} /> },
  ];

  const statutColors = {
    en_attente: { bg: '#FFF7ED', color: '#FB923C', label: 'En attente' },
    en_cours:   { bg: '#DBEAFE', color: '#1E3A8A', label: 'En cours' },
    entretien:  { bg: '#EDE9FE', color: '#7C3AED', label: 'Entretien' },
    accepte:    { bg: '#F0FDF4', color: '#059669', label: 'Accepté' },
    refuse:     { bg: '#FEF2F2', color: '#EF4444', label: 'Refusé' },
  };

  const statutSuivant = {
    en_attente: 'en_cours',
    en_cours: 'entretien',
    entretien: 'accepte',
  };

  if (loading) {
    return (
      <RecruteurLayout title="Candidatures">
        <div style={{ textAlign: 'center', padding: '40px', color: '#94A3B8' }}>
          Chargement...
        </div>
      </RecruteurLayout>
    );
  }

  return (
    <RecruteurLayout title="Candidatures">
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total',      value: candidatures.length,                                      color: '#1E3A8A', bg: '#DBEAFE', icon: DocumentIcon },
          { label: 'En attente', value: candidatures.filter(c => c.statut === 'en_attente').length, color: '#FB923C', bg: '#FFF7ED', icon: ClockIcon },
          { label: 'Acceptées',  value: candidatures.filter(c => c.statut === 'accepte').length,    color: '#059669', bg: '#D1FAE5', icon: TrophyIcon },
          { label: 'Refusées',   value: candidatures.filter(c => c.statut === 'refuse').length,     color: '#EF4444', bg: '#FEE2E2', icon: XCircleIcon },
        ].map((s, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: '14px', padding: '20px',
            border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '16px',
          }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: s.bg, display: 'flex', alignItems: 'center',
              justifyContent: 'center',
            }}>
              <s.icon size={24} color={s.color} />
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
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {filterOptions.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              borderRadius: '50px',
              border: `1px solid ${filter === f.key ? '#5B73F7' : '#E2E8F0'}`,
              background: filter === f.key ? '#5B73F7' : '#FFFFFF',
              color: filter === f.key ? '#FFFFFF' : '#475569',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 200ms ease',
              boxShadow: filter === f.key ? '0 4px 12px rgba(91, 115, 247, 0.3)' : '0 1px 3px rgba(15, 23, 42, 0.08)',
            }}
            onMouseEnter={(e) => {
              if (filter !== f.key) {
                e.currentTarget.style.background = '#F8FAFC';
                e.currentTarget.style.borderColor = '#CBD5E1';
              }
            }}
            onMouseLeave={(e) => {
              if (filter !== f.key) {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.borderColor = '#E2E8F0';
              }
            }}
          >
            {React.cloneElement(f.icon, {
              size: 18,
              color: filter === f.key ? '#FFFFFF' : '#475569'
            })}
            {f.label}
          </button>
        ))}
      </div>

      {/* Liste + Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 360px' : '1fr', gap: '20px', alignItems: 'start' }}>

        {/* Liste */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.length === 0 ? (
            <div style={{
              background: '#fff', borderRadius: '14px', padding: '40px',
              textAlign: 'center', color: '#94A3B8', border: '1px solid #E2E8F0',
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                <InboxIcon size={40} color="#94A3B8" />
              </div>
              Aucune candidature trouvée
            </div>
          ) : (
            filtered.map(c => {
              const statusConfig = getStatusConfig(c.statut);
              const StatusIcon = statusConfig.icon;
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
                      background: statusConfig.bg, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', flexShrink: 0,
                    }}>
                      <StatusIcon size={22} color={statusConfig.color} />
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '700', color: '#1E293B', fontFamily: 'Syne, sans-serif' }}>
                        {c.candidatId?.nom || 'Candidat'}
                      </div>
                      <div style={{ fontSize: '13px', color: '#94A3B8', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span>{c.offreId?.titre || '—'}</span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#CBD5E1', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CalendarIcon size={12} />
                        <span>Reçu le {new Date(c.createdAt).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  </div>

                  <span style={{
                    background: statusConfig.bg, color: statusConfig.color,
                    padding: '6px 14px', borderRadius: '50px',
                    fontSize: '13px', fontWeight: '600',
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    whiteSpace: 'nowrap',
                  }}>
                    <StatusIcon size={14} /> {statusConfig.label}
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
              background: getStatusConfig(selected.statut).bg,
              borderRadius: '12px', padding: '20px', textAlign: 'center', marginBottom: '20px',
              border: `1px solid ${selected.statut === 'refuse' ? '#FECACA' : selected.statut === 'accepte' ? '#A7F3D0' : '#FED7AA'}`,
            }}>
              <div style={{ marginBottom: '6px', display: 'flex', justifyContent: 'center' }}>
                {React.createElement(getStatusConfig(selected.statut).icon, { size: 36, color: getStatusConfig(selected.statut).color })}
              </div>
              <div style={{
                fontSize: '16px', fontWeight: '700', fontFamily: 'Syne, sans-serif',
                color: getStatusConfig(selected.statut).color,
              }}>
                {getStatusConfig(selected.statut).label}
              </div>
              <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>
                Statut de la candidature
              </div>
            </div>

            {[
              { label: 'Candidat',   value: selected.candidatId?.nom || '—' },
              { label: 'Email',      value: selected.candidatId?.email || '—' },
              { label: 'Téléphone',  value: selected.candidatId?.telephone || '—' },
              { label: 'Poste',      value: selected.offreId?.titre || '—' },
              { label: 'Reçu le',    value: new Date(selected.createdAt).toLocaleDateString('fr-FR') },
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
            {selected.lettreMotivation && (
              <div style={{ marginTop: '16px' }}>
                <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                  Lettre de motivation
                </div>
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.7', background: '#F8FAFC', borderRadius: '8px', padding: '12px' }}>
                  {selected.lettreMotivation}
                </p>
              </div>
            )}

            {/* Actions */}
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {selected.statut !== 'accepte' && selected.statut !== 'refuse' && (
                <button
                  onClick={() => {
                    updateStatut(selected._id, statutSuivant[selected.statut]);
                    setSelected(null);
                  }}
                  style={{
                    padding: '12px 20px',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #5B73F7 0%, #4F63E6 100%)',
                    color: '#FFFFFF',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 200ms ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  {selected.statut === 'en_attente' ? 'Examiner la candidature' :
                   selected.statut === 'en_cours' ? 'Planifier entretien' :
                   selected.statut === 'entretien' ? 'Accepter le candidat' : 'Avancer'}
                </button>
              )}
              <button
                onClick={() => {
                  if (window.confirm('Refuser cette candidature ?')) {
                    updateStatut(selected._id, 'refuse');
                    setSelected(null);
                  }
                }}
                style={{
                  padding: '12px 20px',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0',
                  background: '#FFFFFF',
                  color: '#EF4444',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#FEF2F2';
                  e.currentTarget.style.borderColor = '#FECACA';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FFFFFF';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                }}
              >
                {selected.statut === 'refuse' ? 'Candidature refusée' : 'Refuser'}
              </button>
            </div>
          </div>
        )}
      </div>
    </RecruteurLayout>
  );
}

import React, { useState, useEffect } from 'react';
import CandidatLayout from '../../layouts/CandidatLayout';
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

const BriefcaseIcon = ({ size = 20, color = '#FB923C' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);

const BuildingIcon = ({ size = 20, color = '#64748B' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
    <path d="M9 22v-4h6v4"/>
    <path d="M8 6h.01"/>
    <path d="M16 6h.01"/>
    <path d="M12 6h.01"/>
    <path d="M12 10h.01"/>
    <path d="M12 14h.01"/>
    <path d="M16 10h.01"/>
    <path d="M16 14h.01"/>
    <path d="M8 10h.01"/>
    <path d="M8 14h.01"/>
  </svg>
);

const MapPinIcon = ({ size = 16, color = '#94A3B8' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
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

const getStatusConfig = (status) => {
  const configs = {
    en_attente: { bg: '#FFF7ED', color: '#FB923C', icon: ClockIcon, label: 'En attente' },
    accepte: { bg: '#F0FDF4', color: '#059669', icon: CheckCircleIcon, label: 'Accepté' },
    refuse: { bg: '#FEF2F2', color: '#EF4444', icon: XCircleIcon, label: 'Refusé' },
    entretien: { bg: '#EDE9FE', color: '#7C3AED', icon: TargetIcon, label: 'Entretien planifié' },
  };
  return configs[status] || configs.en_attente;
};

export default function MesCandidatures() {
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('tous');
  const [selected, setSelected] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchMesCandidatures();
  }, []);

  const fetchMesCandidatures = async () => {
    try {
      const data = await api('/candidatures/mes');
      const cands = data.candidatures || [];
      setCandidatures(cands);
      genererNotifications(cands);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const genererNotifications = (cands) => {
    const notifs = [];
    const vues = JSON.parse(localStorage.getItem('notifs_vues') || '[]');

    cands.forEach(c => {
      const key = `${c._id}_${c.statut}`;
      if (vues.includes(key)) return;

      if (c.statut === 'accepte') {
        notifs.push({
          key, type: 'success',
          msg: `Félicitations ! Votre candidature pour "${c.offre?.titre}" a été acceptée !`,
          icon: TrophyIcon,
        });
      } else if (c.statut === 'refuse') {
        notifs.push({
          key, type: 'error',
          msg: `Votre candidature pour "${c.offre?.titre}" a été refusée.`,
          icon: XCircleIcon,
        });
      } else if (c.statut === 'entretien') {
        notifs.push({
          key, type: 'entretien',
          msg: `Vous êtes convoqué en entretien pour "${c.offre?.titre}" !`,
          icon: TargetIcon,
        });
      }
    });
    setNotifications(notifs);
  };

  const dismissNotif = (key) => {
    const vues = JSON.parse(localStorage.getItem('notifs_vues') || '[]');
    localStorage.setItem('notifs_vues', JSON.stringify([...vues, key]));
    setNotifications(n => n.filter(x => x.key !== key));
  };

  const notifStyle = (type) => ({
    success:   { bg: '#D1FAE5', color: '#059669', border: '#A7F3D0' },
    error:     { bg: '#FEE2E2', color: '#EF4444', border: '#FECACA' },
    entretien: { bg: '#EDE9FE', color: '#7C3AED', border: '#DDD6FE' },
  }[type] || { bg: '#F1F5F9', color: '#475569', border: '#E2E8F0' });

  const filterOptions = [
    { key: 'tous',       label: 'Tous',        icon: <DocumentIcon size={18} color={filter === 'tous' ? '#FFFFFF' : '#475569'} /> },
    { key: 'en_attente', label: 'En attente',  icon: <ClockIcon size={18} color={filter === 'en_attente' ? '#FFFFFF' : '#475569'} /> },
    { key: 'accepte',    label: 'Acceptés',    icon: <CheckCircleIcon size={18} color={filter === 'accepte' ? '#FFFFFF' : '#475569'} /> },
    { key: 'refuse',     label: 'Refusés',     icon: <XCircleIcon size={18} color={filter === 'refuse' ? '#FFFFFF' : '#475569'} /> },
    { key: 'entretien',  label: 'Entretiens',  icon: <TargetIcon size={18} color={filter === 'entretien' ? '#FFFFFF' : '#475569'} /> },
  ];

  const filtered = filter === 'tous'
    ? candidatures
    : candidatures.filter(c => c.statut === filter);

  return (
    <CandidatLayout title="Mes Candidatures">

      {/* Notifications */}
      {notifications.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          {notifications.map(n => {
            const s = notifStyle(n.type);
            const NotifIcon = n.icon;
            return (
              <div key={n.key} style={{
                background: s.bg, border: `1px solid ${s.border}`,
                borderRadius: '12px', padding: '14px 20px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                color: s.color, fontSize: '14px', fontWeight: '500',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <NotifIcon size={18} color={s.color} />
                  <span>{n.msg}</span>
                </div>
                <button onClick={() => dismissNotif(n.key)} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: s.color, fontSize: '18px', marginLeft: '12px',
                }}>✕</button>
              </div>
            );
          })}
        </div>
      )}

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total',      value: candidatures.length,                                        color: '#1E3A8A', bg: '#DBEAFE', icon: DocumentIcon },
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
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#94A3B8' }}>
              Chargement...
            </div>
          ) : filtered.length === 0 ? (
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
                        {c.offre?.titre || '—'}
                      </div>
                      <div style={{ fontSize: '13px', color: '#94A3B8', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span>{c.offre?.recruteur?.entreprise || '—'}</span>
                        <span>•</span>
                        <MapPinIcon size={14} />
                        <span>{c.offre?.lieu || '—'}</span>
                        <span>•</span>
                        <span>{c.offre?.type || '—'}</span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#CBD5E1', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CalendarIcon size={12} />
                        <span>Postulé le {new Date(c.createdAt).toLocaleDateString('fr-FR')}</span>
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
              border: `1px solid ${selected.statut === 'refuse' ? '#FECACA' : selected.statut === 'accepte' ? '#A7F3D0' : selected.statut === 'entretien' ? '#DDD6FE' : '#FED7AA'}`,
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
                Statut de votre candidature
              </div>

              {/* Message personnalisé selon statut */}
              {selected.statut === 'refuse' && (
                <div style={{ marginTop: '10px', fontSize: '12px', color: '#EF4444', background: '#FEE2E2', borderRadius: '8px', padding: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <TrashIcon size={14} />
                  <span>Votre candidature n'a pas été retenue. Continuez à postuler !</span>
                </div>
              )}
              {selected.statut === 'accepte' && (
                <div style={{ marginTop: '10px', fontSize: '12px', color: '#059669', background: '#D1FAE5', borderRadius: '8px', padding: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <TrophyIcon size={14} />
                  <span>Félicitations ! Le recruteur va vous contacter prochainement.</span>
                </div>
              )}
              {selected.statut === 'entretien' && (
                <div style={{ marginTop: '10px', fontSize: '12px', color: '#7C3AED', background: '#EDE9FE', borderRadius: '8px', padding: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <TargetIcon size={14} />
                  <span>Préparez-vous ! Un entretien a été planifié pour vous.</span>
                </div>
              )}
            </div>

            {[
              { label: 'Poste',      value: selected.offre?.titre || '—' },
              { label: 'Entreprise', value: selected.offre?.recruteur?.entreprise || '—' },
              { label: 'Lieu',       value: selected.offre?.lieu || '—' },
              { label: 'Type',       value: selected.offre?.type || '—' },
              { label: 'Postulé le', value: new Date(selected.createdAt).toLocaleDateString('fr-FR') },
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
                { label: 'Candidature envoyée', done: true,  color: '#059669' },
                { label: "En cours d'examen",   done: true,  color: '#059669' },
                { label: 'Entretien',            done: selected.statut === 'entretien' || selected.statut === 'accepte', color: '#7C3AED' },
                { label: 'Décision finale',      done: selected.statut === 'accepte' || selected.statut === 'refuse',
                  color: selected.statut === 'refuse' ? '#EF4444' : '#059669' },
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div style={{
                    width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                    background: step.done ? step.color : '#E2E8F0',
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
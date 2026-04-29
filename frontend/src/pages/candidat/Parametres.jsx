import React, { useState } from 'react';
import CandidatLayout from '../../layouts/CandidatLayout';

const Icons = {
  Bell: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
  Lock: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Settings: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  Shield: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
    </svg>
  ),
  User: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Save: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
      <polyline points="17 21 17 13 7 13 7 21"/>
      <polyline points="7 3 7 8 15 8"/>
    </svg>
  ),
  X: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18"/>
      <path d="m6 6 12 12"/>
    </svg>
  ),
  Briefcase: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  FileText: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" x2="8" y1="13" y2="13"/>
      <line x1="16" x2="8" y1="17" y2="17"/>
    </svg>
  ),
  Calendar: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
      <line x1="16" x2="16" y1="2" y2="6"/>
      <line x1="8" x2="8" y1="2" y2="6"/>
      <line x1="3" x2="21" y1="10" y2="10"/>
    </svg>
  ),
  Download: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" x2="12" y1="15" y2="3"/>
    </svg>
  ),
  LogOut: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" x2="9" y1="12" y2="12"/>
    </svg>
  ),
  Trash: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18"/>
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
    </svg>
  ),
  Target: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  Mail: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  ),
  Clock: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Smartphone: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
      <path d="M12 18h.01"/>
    </svg>
  ),
  Globe: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
      <path d="M2 12h20"/>
    </svg>
  ),
  Key: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 18a3 3 0 1 0 6 0 3 3 0 0 0-6 0"/>
      <path d="M22 12v-3a4 4 0 0 0-4-4H8"/>
      <path d="M6 12v6a2 2 0 0 0 2 2h8"/>
    </svg>
  ),
  ShieldCheck: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  ),
  CheckCircle: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  AlertCircle: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" x2="12" y1="8" y2="12"/>
      <line x1="12" x2="12.01" y1="16" y2="16"/>
    </svg>
  ),
};

export default function ParametresCandidat() {
  const [activeTab, setActiveTab] = useState('notifications');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const [notifs, setNotifs] = useState({
    nouvelleOffre:     true,
    statutCandidature: true,
    entretien:         true,
    newsletter:        false,
    rappels:           true,
  });

  const [securite, setSecurite] = useState({
    motdepasse:      '',
    confirmer:       '',
    doubleAuth:      false,
  });

  const [confidentialite, setConfidentialite] = useState({
    profilVisible:   true,
    cvVisible:       true,
    emailVisible:    false,
    rechercheActive: true,
  });

  const [preferences, setPreferences] = useState({
    langue:          'Français',
    timezone:        'Africa/Tunis',
    typeContrat:     'CDI',
    lieuRecherche:   'Tunis',
    salaireMin:      '2000',
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 800);
  };

  const tabs = [
    { key: 'notifications',   label: 'Notifications',    icon: <Icons.Bell /> },
    { key: 'confidentialite', label: 'Confidentialité',  icon: <Icons.Lock /> },
    { key: 'preferences',     label: 'Préférences',      icon: <Icons.Settings /> },
    { key: 'securite',        label: 'Sécurité',         icon: <Icons.Shield /> },
    { key: 'compte',          label: 'Mon compte',       icon: <Icons.User /> },
  ];

  const Toggle = ({ value, onChange }) => (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: '44px', height: '24px', borderRadius: '50px',
        background: value ? 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)' : '#E2E8F0',
        cursor: 'pointer', position: 'relative', transition: '220ms', flexShrink: 0,
      }}
    >
      <div style={{
        width: '18px', height: '18px', borderRadius: '50%', background: '#fff',
        position: 'absolute', top: '3px',
        left: value ? '23px' : '3px', transition: '220ms',
        boxShadow: '0 1px 4px rgba(0,0,0,.2)',
      }} />
    </div>
  );

  return (
    <CandidatLayout title="Paramètres">

      {saved && (
        <div style={{
          background: '#F0FDF4', border: '1px solid #22C55E',
          borderRadius: '10px', padding: '14px 20px',
          color: '#059669', fontSize: '14px', fontWeight: '500',
          marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <Icons.Check />
          Paramètres enregistrés avec succès !
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '24px', alignItems: 'start' }}>

        {/* Sidebar tabs */}
        <div style={{
          background: '#fff', borderRadius: '12px', padding: '8px',
          border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(15,23,42,.06)',
          position: 'sticky', top: '20px',
        }}>
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center',
                gap: '10px', padding: '11px 14px', borderRadius: '10px',
                border: 'none', cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: '500',
                background: activeTab === t.key ? 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)' : 'transparent',
                color: activeTab === t.key ? '#fff' : '#475569',
                marginBottom: '2px', textAlign: 'left', transition: '200ms',
              }}
            >
              <span style={{ display: 'flex', color: activeTab === t.key ? '#fff' : 'inherit' }}>
                {t.icon}
              </span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Contenu */}
        <div style={{
          background: '#fff', borderRadius: '12px', padding: '32px',
          border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(15,23,42,.06)',
        }}>

          {/* ===== NOTIFICATIONS ===== */}
          {activeTab === 'notifications' && (
            <div>
              <h3 style={titleStyle}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icons.Bell />
                  Notifications
                </span>
              </h3>
              <p style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '24px' }}>
                Choisissez comment vous souhaitez être notifié
              </p>

              {[
                { key: 'nouvelleOffre',     label: 'Nouvelles offres',          desc: 'Recevoir des alertes pour les nouvelles offres correspondant à votre profil', icon: <Icons.Briefcase /> },
                { key: 'statutCandidature', label: 'Statut de candidature',     desc: 'Être notifié quand le statut de votre candidature change', icon: <Icons.FileText /> },
                { key: 'entretien',         label: 'Rappels d\'entretien',      desc: 'Recevoir des rappels avant un entretien planifié', icon: <Icons.Calendar /> },
                { key: 'newsletter',        label: 'Newsletter SmartRecruit',   desc: 'Recevoir nos conseils carrière et actualités emploi', icon: <Icons.Mail /> },
                { key: 'rappels',           label: 'Rappels de profil',         desc: 'Rappels pour compléter et mettre à jour votre profil', icon: <Icons.Target /> },
              ].map(n => (
                <div key={n.key} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '16px 0', borderBottom: '1px solid #F1F5F9',
                }}>
                  <div style={{ flex: 1, marginRight: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#94A3B8', marginTop: '2px' }}>{n.icon}</span>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: '#1E293B', marginBottom: '4px' }}>
                        {n.label}
                      </div>
                      <div style={{ fontSize: '13px', color: '#94A3B8' }}>{n.desc}</div>
                    </div>
                  </div>
                  <Toggle
                    value={notifs[n.key]}
                    onChange={v => setNotifs(ns => ({ ...ns, [n.key]: v }))}
                  />
                </div>
              ))}
            </div>
          )}

          {/* ===== CONFIDENTIALITÉ ===== */}
          {activeTab === 'confidentialite' && (
            <div>
              <h3 style={titleStyle}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icons.Lock />
                  Confidentialité
                </span>
              </h3>
              <p style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '24px' }}>
                Contrôlez la visibilité de vos informations
              </p>

              {[
                { key: 'profilVisible',   label: 'Profil visible par les recruteurs', desc: 'Les recruteurs peuvent trouver votre profil dans leurs recherches', icon: <Icons.User /> },
                { key: 'cvVisible',       label: 'CV téléchargeable',                  desc: 'Les recruteurs peuvent télécharger votre CV directement', icon: <Icons.Download /> },
                { key: 'emailVisible',    label: 'Email visible',                       desc: 'Votre adresse email est visible sur votre profil public', icon: <Icons.Mail /> },
                { key: 'rechercheActive', label: 'En recherche active',                 desc: 'Indiquer aux recruteurs que vous êtes activement en recherche d\'emploi', icon: <Icons.Target /> },
              ].map(c => (
                <div key={c.key} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '16px 0', borderBottom: '1px solid #F1F5F9',
                }}>
                  <div style={{ flex: 1, marginRight: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#94A3B8', marginTop: '2px' }}>{c.icon}</span>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: '#1E293B', marginBottom: '4px' }}>
                        {c.label}
                      </div>
                      <div style={{ fontSize: '13px', color: '#94A3B8' }}>{c.desc}</div>
                    </div>
                  </div>
                  <Toggle
                    value={confidentialite[c.key]}
                    onChange={v => setConfidentialite(cs => ({ ...cs, [c.key]: v }))}
                  />
                </div>
              ))}

              {/* Statut recherche */}
              <div style={{
                background: confidentialite.rechercheActive
                  ? 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)'
                  : 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)',
                borderRadius: '10px', padding: '14px 16px', marginTop: '20px',
                display: 'flex', alignItems: 'center', gap: '12px',
                border: `1px solid ${confidentialite.rechercheActive ? '#86EFAC' : '#FCA5A5'}`,
              }}>
                <span style={{
                  width: '12px', height: '12px', borderRadius: '50%',
                  background: confidentialite.rechercheActive ? '#22C55E' : '#EF4444',
                  boxShadow: `0 0 0 4px ${confidentialite.rechercheActive ? 'rgba(34,197,94,.2)' : 'rgba(239,68,68,.2)'}`,
                }} />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#1E293B' }}>
                    {confidentialite.rechercheActive ? 'En recherche active' : 'Pas en recherche'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>
                    {confidentialite.rechercheActive
                      ? 'Les recruteurs peuvent vous contacter'
                      : 'Votre profil est en mode discret'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===== PRÉFÉRENCES ===== */}
          {activeTab === 'preferences' && (
            <div>
              <h3 style={titleStyle}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icons.Settings />
                  Préférences de recherche
                </span>
              </h3>
              <p style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '24px' }}>
                Personnalisez votre expérience et vos critères de recherche
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>Langue</label>
                  <select
                    value={preferences.langue}
                    onChange={e => setPreferences(p => ({ ...p, langue: e.target.value }))}
                    style={inputStyle}
                  >
                    <option>Français</option>
                    <option>العربية</option>
                    <option>English</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Fuseau horaire</label>
                  <select
                    value={preferences.timezone}
                    onChange={e => setPreferences(p => ({ ...p, timezone: e.target.value }))}
                    style={inputStyle}
                  >
                    <option>Africa/Tunis</option>
                    <option>Europe/Paris</option>
                    <option>UTC</option>
                  </select>
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)', borderRadius: '12px', padding: '20px',
                border: '1px solid #E2E8F0', marginTop: '8px',
              }}>
                <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: '15px', fontWeight: '700', color: '#1E293B', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icons.Target />
                  Critères de recherche d'emploi
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>Type de contrat souhaité</label>
                    <select
                      value={preferences.typeContrat}
                      onChange={e => setPreferences(p => ({ ...p, typeContrat: e.target.value }))}
                      style={inputStyle}
                    >
                      <option>CDI</option>
                      <option>CDD</option>
                      <option>Stage</option>
                      <option>Freelance</option>
                      <option>Tous</option>
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>Lieu de recherche</label>
                    <select
                      value={preferences.lieuRecherche}
                      onChange={e => setPreferences(p => ({ ...p, lieuRecherche: e.target.value }))}
                      style={inputStyle}
                    >
                      <option>Tunis</option>
                      <option>Sfax</option>
                      <option>Sousse</option>
                      <option>Remote</option>
                      <option>Partout</option>
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>Salaire minimum (TND)</label>
                    <input
                      type="number"
                      placeholder="Ex: 2000"
                      value={preferences.salaireMin}
                      onChange={e => setPreferences(p => ({ ...p, salaireMin: e.target.value }))}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===== SÉCURITÉ ===== */}
          {activeTab === 'securite' && (
            <div>
              <h3 style={titleStyle}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icons.Shield />
                  Sécurité
                </span>
              </h3>
              <p style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '24px' }}>
                Gérez la sécurité de votre compte
              </p>

              {/* Changer mot de passe */}
              <div style={{
                background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)', borderRadius: '12px', padding: '20px',
                border: '1px solid #E2E8F0', marginBottom: '20px',
              }}>
                <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: '15px', fontWeight: '700', color: '#1E293B', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icons.Key />
                  Changer le mot de passe
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    { label: 'Mot de passe actuel',     key: 'actuel',    placeholder: '••••••••' },
                    { label: 'Nouveau mot de passe',    key: 'motdepasse', placeholder: '••••••••' },
                    { label: 'Confirmer le nouveau',    key: 'confirmer',  placeholder: '••••••••' },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={labelStyle}>{f.label}</label>
                      <input
                        type="password"
                        placeholder={f.placeholder}
                        value={securite[f.key] || ''}
                        onChange={e => setSecurite(s => ({ ...s, [f.key]: e.target.value }))}
                        style={inputStyle}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Double authentification */}
              <div style={{
                background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)', borderRadius: '12px', padding: '20px',
                border: '1px solid #E2E8F0', marginBottom: '20px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#94A3B8', marginTop: '2px' }}><Icons.ShieldCheck /></span>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#1E293B', marginBottom: '4px' }}>
                        Double authentification
                      </div>
                      <div style={{ fontSize: '13px', color: '#94A3B8' }}>
                        Sécurisez votre compte avec une vérification en deux étapes
                      </div>
                    </div>
                  </div>
                  <Toggle
                    value={securite.doubleAuth}
                    onChange={v => setSecurite(s => ({ ...s, doubleAuth: v }))}
                  />
                </div>
              </div>

              {/* Infos session */}
              <div style={{
                background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)', borderRadius: '12px', padding: '20px',
                border: '1px solid #E2E8F0', marginBottom: '20px',
              }}>
                <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: '15px', fontWeight: '700', color: '#1E293B', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icons.Smartphone />
                  Informations de session
                </h4>
                {[
                  { label: 'Dernière connexion',  value: '25/02/2026 à 10:30', icon: <Icons.Clock /> },
                  { label: 'Appareil',            value: 'Chrome — Windows 10', icon: <Icons.Smartphone /> },
                  { label: 'Adresse IP',          value: '196.XXX.XXX.XXX', icon: <Icons.Globe /> },
                ].map((f, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '10px 0', borderBottom: i < 2 ? '1px solid #F1F5F9' : 'none',
                    fontSize: '13px',
                  }}>
                    <span style={{ color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#94A3B8' }}>{f.icon}</span>
                      {f.label}
                    </span>
                    <span style={{ color: '#1E293B', fontWeight: '500' }}>{f.value}</span>
                  </div>
                ))}
              </div>

              {/* Zone danger */}
              <div style={{
                background: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)', borderRadius: '12px', padding: '20px',
                border: '1px solid #FECACA',
              }}>
                <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: '15px', fontWeight: '700', color: '#EF4444', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icons.AlertCircle />
                  Zone dangereuse
                </h4>
                <p style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '16px' }}>
                  Ces actions sont irréversibles. Soyez prudent.
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button style={{
                    padding: '10px 20px', borderRadius: '10px',
                    border: '1px solid #FECACA', background: '#fff',
                    color: '#EF4444', cursor: 'pointer',
                    fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: '500',
                    display: 'flex', alignItems: 'center', gap: '6px',
                  }}>
                    <Icons.LogOut />
                    Se déconnecter de partout
                  </button>
                  <button style={{
                    padding: '10px 20px', borderRadius: '10px',
                    border: 'none', background: '#EF4444',
                    color: '#fff', cursor: 'pointer',
                    fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: '500',
                    display: 'flex', alignItems: 'center', gap: '6px',
                  }}>
                    <Icons.Trash />
                    Supprimer mon compte
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ===== MON COMPTE ===== */}
          {activeTab === 'compte' && (
            <div>
              <h3 style={titleStyle}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icons.User />
                  Mon compte
                </span>
              </h3>
              <p style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '24px' }}>
                Informations générales sur votre compte SmartRecruit
              </p>

              {[
                { icon: <Icons.Mail />, label: 'Email',           value: 'candidat@test.com' },
                { icon: <Icons.Calendar />, label: 'Membre depuis',   value: 'Janvier 2026' },
                { icon: <Icons.User />, label: 'Type de compte',  value: 'Candidat' },
                { icon: <Icons.CheckCircle />, label: 'Statut',          value: 'Actif' },
                { icon: <Icons.Briefcase />, label: 'Candidatures',    value: '3 candidatures envoyées' },
                { icon: <Icons.FileText />, label: 'CV',              value: 'CV_MonNom_2026.pdf' },
              ].map((f, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '16px',
                  padding: '14px 0', borderBottom: '1px solid #F1F5F9',
                }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', color: '#1E3A8A', flexShrink: 0,
                  }}>
                    {f.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '2px' }}>{f.label}</div>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#1E293B' }}>{f.value}</div>
                  </div>
                </div>
              ))}

              {/* Export données */}
              <div style={{
                background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)', borderRadius: '12px', padding: '20px',
                border: '1px solid #BFDBFE', marginTop: '24px',
              }}>
                <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: '15px', fontWeight: '700', color: '#1E3A8A', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icons.Download />
                  Exporter mes données
                </h4>
                <p style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '16px' }}>
                  Téléchargez une copie de toutes vos données personnelles
                </p>
                <button style={{
                  padding: '10px 20px', borderRadius: '10px', border: 'none',
                  background: '#1E3A8A', color: '#fff', cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: '500',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  <Icons.Download />
                  Télécharger mes données
                </button>
              </div>
            </div>
          )}

          {/* Bouton sauvegarder */}
          {activeTab !== 'compte' && (
            <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button style={{
                height: '44px', padding: '0 24px', borderRadius: '50px',
                border: '1.5px solid #E2E8F0', background: '#fff',
                cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                fontSize: '14px', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                <Icons.X />
                Annuler
              </button>
              <button onClick={handleSave} disabled={loading} style={{
                height: '44px', padding: '0 28px', borderRadius: '50px',
                background: loading ? '#94A3B8' : 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
                color: '#fff', border: 'none',
                fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
                fontWeight: '500', cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 16px rgba(30,58,138,.25)',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                {loading ? (
                  <>
                    <span style={{
                      width: '16px', height: '16px', border: '2px solid #fff',
                      borderTopColor: 'transparent', borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite',
                    }} />
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <Icons.Save />
                    Enregistrer
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </CandidatLayout>
  );
}

const titleStyle = {
  fontFamily: 'Syne, sans-serif', fontSize: '18px',
  fontWeight: '700', color: '#1E293B', marginBottom: '8px',
};

const labelStyle = {
  fontSize: '13px', fontWeight: '500', color: '#475569',
  display: 'block', marginBottom: '6px',
};

const inputStyle = {
  width: '100%', height: '42px', padding: '0 14px',
  border: '1.5px solid #E2E8F0', borderRadius: '10px',
  fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
  outline: 'none', boxSizing: 'border-box', background: '#F8FAFC',
};

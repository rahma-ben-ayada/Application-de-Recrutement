import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';

const Icons = {
  User: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Settings: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
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
  Shield: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
    </svg>
  ),
  Save: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
      <polyline points="17 21 17 13 7 13 7 21"/>
      <polyline points="7 3 7 8 15 8"/>
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Warning: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
      <line x1="12" x2="12" y1="9" y2="13"/>
      <line x1="12" x2="12.01" y1="17" y2="17"/>
    </svg>
  ),
  Database: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M3 5V19A9 3 0 0 0 21 19V5"/>
      <path d="M3 12A9 3 0 0 0 21 12"/>
    </svg>
  ),
  Server: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2"/>
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2"/>
      <line x1="6" x2="6.01" y1="6" y2="6"/>
      <line x1="6" x2="6.01" y1="18" y2="18"/>
    </svg>
  ),
  Brain: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
    </svg>
  ),
  Chart: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v16a2 2 0 0 0 2 2h16"/>
      <path d="M7 16h4"/>
      <path d="M7 11h8"/>
      <path d="M7 6h10"/>
    </svg>
  ),
  Mail: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  ),
  Calendar: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
      <line x1="16" x2="16" y1="2" y2="6"/>
      <line x1="8" x2="8" y1="2" y2="6"/>
      <line x1="3" x2="21" y1="10" y2="10"/>
    </svg>
  ),
  Clock: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  X: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18"/>
      <path d="m6 6 12 12"/>
    </svg>
  ),
  LogOut: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" x2="9" y1="12" y2="12"/>
    </svg>
  ),
  Refresh: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2v6h-6"/>
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8"/>
      <path d="M3 22v-6h6"/>
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  ),
};

export default function Parametres() {
  const [activeTab, setActiveTab] = useState('profil');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const [profil, setProfil] = useState({
    nom: 'Administrateur',
    email: 'admin@smartrecruit.com',
    telephone: '+216 XX XXX XXX',
    motdepasse: '',
    confirmer: '',
  });

  const [notifs, setNotifs] = useState({
    email: true,
    candidature: true,
    entretien: false,
    rapport: true,
  });

  const [systeme, setSysteme] = useState({
    appName: 'SmartRecruit',
    langue: 'Français',
    fuseau: 'Africa/Tunis',
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 800);
  };

  const set = (setter, k) => (e) => setter(p => ({ ...p, [k]: e.target.value }));

  const tabs = [
    { key: 'profil',    label: 'Profil',        icon: <Icons.User /> },
    { key: 'systeme',   label: 'Système',        icon: <Icons.Settings /> },
    { key: 'notifs',    label: 'Notifications',  icon: <Icons.Bell /> },
    { key: 'securite',  label: 'Sécurité',       icon: <Icons.Lock /> },
  ];

  return (
    <AdminLayout title="Paramètres">

      {/* Message succès */}
      {saved && (
        <div style={{
          background: '#F0FDF4', border: '1px solid #22C55E',
          borderRadius: '10px', padding: '14px 20px',
          color: '#059669', fontSize: '14px', fontWeight: '500',
          marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px',
          animation: 'fadeIn .3s ease',
        }}>
          <Icons.Check />
          Modifications enregistrées avec succès !
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '24px', alignItems: 'start' }}>

        {/* Sidebar tabs */}
        <div style={{
          background: '#fff', borderRadius: '12px', padding: '12px',
          border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(15,23,42,.06)',
        }}>
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center',
                gap: '12px', padding: '12px 16px', borderRadius: '10px',
                border: 'none', cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: '500',
                background: activeTab === t.key ? 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)' : 'transparent',
                color: activeTab === t.key ? '#1E3A8A' : '#475569',
                marginBottom: '4px', textAlign: 'left',
                transition: '200ms',
                borderLeft: activeTab === t.key ? '3px solid #1E3A8A' : '3px solid transparent',
              }}
            >
              <span style={{ display: 'flex', color: activeTab === t.key ? '#1E3A8A' : 'inherit' }}>
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

          {/* ---- PROFIL ---- */}
          {activeTab === 'profil' && (
            <div>
              <div style={{ marginBottom: '28px' }}>
                <h3 style={titleStyle}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icons.User />
                    Profil Administrateur
                  </span>
                </h3>
                <p style={{ fontSize: '13px', color: '#94A3B8', marginTop: '4px' }}>
                  Gérez vos informations personnelles et votre mot de passe.
                </p>
              </div>

              {/* Avatar */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px',
                padding: '20px', background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)', borderRadius: '12px',
                border: '1px solid #E2E8F0',
              }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: '#fff',
                  fontWeight: '800', fontSize: '24px', fontFamily: 'Syne, sans-serif',
                  flexShrink: 0, boxShadow: '0 4px 12px rgba(30,58,138,.2)',
                }}>
                  A
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#1E293B', fontFamily: 'Syne, sans-serif' }}>
                    {profil.nom}
                  </div>
                  <div style={{ fontSize: '13px', color: '#94A3B8', marginTop: '2px' }}>
                    {profil.email}
                  </div>
                  <div style={{
                    marginTop: '8px', background: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)', color: '#1E3A8A',
                    padding: '4px 12px', borderRadius: '50px', fontSize: '11px',
                    fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px',
                  }}>
                    <Icons.Shield />
                    Administrateur
                  </div>
                </div>
              </div>

              {/* Champs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <FormField label="Nom complet" type="text" placeholder="Votre nom"
                  value={profil.nom} onChange={set(setProfil, 'nom')} />
                <FormField label="Email" type="email" placeholder="admin@mail.com"
                  value={profil.email} onChange={set(setProfil, 'email')} />
                <FormField label="Téléphone" type="tel" placeholder="+216 XX XXX XXX"
                  value={profil.telephone} onChange={set(setProfil, 'telephone')} />
              </div>

              <Divider label="Changer le mot de passe" />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '20px' }}>
                <FormField label="Nouveau mot de passe" type="password" placeholder="••••••••"
                  value={profil.motdepasse} onChange={set(setProfil, 'motdepasse')} />
                <FormField label="Confirmer le mot de passe" type="password" placeholder="••••••••"
                  value={profil.confirmer} onChange={set(setProfil, 'confirmer')} />
              </div>
            </div>
          )}

          {/* ---- SYSTÈME ---- */}
          {activeTab === 'systeme' && (
            <div>
              <div style={{ marginBottom: '28px' }}>
                <h3 style={titleStyle}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icons.Settings />
                    Paramètres système
                  </span>
                </h3>
                <p style={{ fontSize: '13px', color: '#94A3B8', marginTop: '4px' }}>
                  Configurez les paramètres généraux de l'application.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <FormField label="Nom de l'application" type="text"
                  value={systeme.appName} onChange={set(setSysteme, 'appName')} />

                <div>
                  <label style={labelStyle}>Langue</label>
                  <select value={systeme.langue} onChange={set(setSysteme, 'langue')} style={inputStyle}>
                    <option>Français</option>
                    <option>العربية</option>
                    <option>English</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Fuseau horaire</label>
                  <select value={systeme.fuseau} onChange={set(setSysteme, 'fuseau')} style={inputStyle}>
                    <option>Africa/Tunis</option>
                    <option>Europe/Paris</option>
                    <option>UTC</option>
                  </select>
                </div>
              </div>

              <Divider label="État de la connexion" />

              <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  { label: 'Backend API',      value: 'Non connecté', status: false, icon: <Icons.Server /> },
                  { label: 'Base de données',  value: 'Non connectée', status: false, icon: <Icons.Database /> },
                  { label: 'Power BI',         value: 'Non configuré', status: false, icon: <Icons.Chart /> },
                  { label: 'Modèle ML',        value: 'En développement', status: false, icon: <Icons.Brain /> },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '14px 16px', background: '#F8FAFC',
                    borderRadius: '10px', border: '1px solid #E2E8F0',
                  }}>
                    <span style={{ fontSize: '13px', color: '#475569', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#94A3B8' }}>{item.icon}</span>
                      {item.label}
                    </span>
                    <span style={{
                      background: '#FEF2F2', color: '#EF4444',
                      padding: '4px 10px', borderRadius: '50px',
                      fontSize: '11px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px',
                    }}>
                      ● {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---- NOTIFICATIONS ---- */}
          {activeTab === 'notifs' && (
            <div>
              <div style={{ marginBottom: '28px' }}>
                <h3 style={titleStyle}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icons.Bell />
                    Notifications
                  </span>
                </h3>
                <p style={{ fontSize: '13px', color: '#94A3B8', marginTop: '4px' }}>
                  Choisissez les notifications que vous souhaitez recevoir.
                </p>
              </div>

              {[
                { key: 'email',       label: 'Notifications par email',     desc: 'Recevoir un email pour chaque événement important', icon: <Icons.Mail /> },
                { key: 'candidature', label: 'Nouvelle candidature',         desc: 'Être alerté quand un candidat postule', icon: <Icons.User /> },
                { key: 'entretien',   label: 'Rappel entretien',             desc: 'Rappel 1h avant chaque entretien planifié', icon: <Icons.Calendar /> },
                { key: 'rapport',     label: 'Rapports hebdomadaires',       desc: 'Recevoir un résumé chaque lundi matin', icon: <Icons.Chart /> },
              ].map(n => (
                <div key={n.key} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '18px 0', borderBottom: '1px solid #F1F5F9',
                }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#94A3B8', marginTop: '2px' }}>{n.icon}</span>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: '#1E293B' }}>{n.label}</div>
                      <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '3px' }}>{n.desc}</div>
                    </div>
                  </div>
                  <Toggle
                    value={notifs[n.key]}
                    onChange={() => setNotifs(ns => ({ ...ns, [n.key]: !ns[n.key] }))}
                  />
                </div>
              ))}
            </div>
          )}

          {/* ---- SÉCURITÉ ---- */}
          {activeTab === 'securite' && (
            <div>
              <div style={{ marginBottom: '28px' }}>
                <h3 style={titleStyle}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icons.Lock />
                    Sécurité
                  </span>
                </h3>
                <p style={{ fontSize: '13px', color: '#94A3B8', marginTop: '4px' }}>
                  Gérez la sécurité de votre compte administrateur.
                </p>
              </div>

              {[
                { label: 'Double authentification', value: 'Désactivée',         color: '#EF4444', icon: <Icons.Shield /> },
                { label: 'Durée de session',        value: '8 heures',           color: '#059669', icon: <Icons.Clock /> },
                { label: 'Dernière connexion',      value: "Aujourd'hui 09:30",  color: '#1E3A8A', icon: <Icons.Refresh /> },
                { label: 'Tentatives échouées',     value: '0',                  color: '#059669', icon: <Icons.X /> },
              ].map((f, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '16px', marginBottom: '10px',
                  background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0',
                }}>
                  <span style={{ fontSize: '14px', color: '#475569', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#94A3B8' }}>{f.icon}</span>
                    {f.label}
                  </span>
                  <span style={{
                    fontSize: '13px', fontWeight: '600', color: f.color,
                    background: f.color + '15', padding: '4px 12px', borderRadius: '50px',
                  }}>
                    {f.value}
                  </span>
                </div>
              ))}

              <div style={{
                marginTop: '24px', padding: '16px', background: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)',
                borderRadius: '10px', border: '1px solid #FECACA',
              }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#EF4444', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Icons.Warning />
                  Zone dangereuse
                </div>
                <p style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '12px' }}>
                  Ces actions sont irréversibles. Procédez avec prudence.
                </p>
                <button style={{
                  padding: '8px 20px', borderRadius: '50px', border: '1px solid #EF4444',
                  background: 'transparent', color: '#EF4444', cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: '500',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  <Icons.LogOut />
                  Déconnecter toutes les sessions
                </button>
              </div>
            </div>
          )}

          {/* Bouton sauvegarder */}
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
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </AdminLayout>
  );
}

// ---- Composants internes ----

function FormField({ label, type, placeholder, value, onChange }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={inputStyle}
      />
    </div>
  );
}

function Toggle({ value, onChange }) {
  return (
    <div onClick={onChange} style={{
      width: '44px', height: '24px', borderRadius: '99px',
      cursor: 'pointer', flexShrink: 0,
      background: value ? 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)' : '#E2E8F0',
      position: 'relative', transition: '220ms',
    }}>
      <div style={{
        width: '18px', height: '18px', borderRadius: '50%',
        background: '#fff', position: 'absolute', top: '3px',
        left: value ? '23px' : '3px',
        transition: '220ms',
        boxShadow: '0 1px 3px rgba(0,0,0,.2)',
      }} />
    </div>
  );
}

function Divider({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '8px 0' }}>
      <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
      <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '500', whiteSpace: 'nowrap' }}>
        {label}
      </span>
      <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
    </div>
  );
}

const titleStyle = {
  fontFamily: 'Syne, sans-serif', fontSize: '18px',
  fontWeight: '700', color: '#1E293B',
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
  transition: 'border-color 0.2s',
};

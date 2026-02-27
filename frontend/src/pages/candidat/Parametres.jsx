import React, { useState } from 'react';
import CandidatLayout from '../../layouts/CandidatLayout';

export default function ParametresCandidat() {
  const [activeTab, setActiveTab] = useState('notifications');
  const [saved, setSaved] = useState(false);

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
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { key: 'notifications',   label: 'Notifications',    icon: '🔔' },
    { key: 'confidentialite', label: 'Confidentialité',  icon: '🔒' },
    { key: 'preferences',     label: 'Préférences',      icon: '⚙️' },
    { key: 'securite',        label: 'Sécurité',         icon: '🛡️' },
    { key: 'compte',          label: 'Mon compte',       icon: '👤' },
  ];

  const Toggle = ({ value, onChange }) => (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: '44px', height: '24px', borderRadius: '50px',
        background: value ? '#1E3A8A' : '#E2E8F0',
        cursor: 'pointer', position: 'relative', transition: '200ms', flexShrink: 0,
      }}
    >
      <div style={{
        width: '18px', height: '18px', borderRadius: '50%', background: '#fff',
        position: 'absolute', top: '3px',
        left: value ? '23px' : '3px', transition: '200ms',
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
          marginBottom: '24px',
        }}>
          ✓ Paramètres enregistrés avec succès !
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
                background: activeTab === t.key ? '#1E3A8A' : 'transparent',
                color: activeTab === t.key ? '#fff' : '#475569',
                marginBottom: '2px', textAlign: 'left', transition: '150ms',
              }}
            >
              <span>{t.icon}</span> {t.label}
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
              <h3 style={titleStyle}>🔔 Notifications</h3>
              <p style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '24px' }}>
                Choisissez comment vous souhaitez être notifié
              </p>

              {[
                { key: 'nouvelleOffre',     label: 'Nouvelles offres',          desc: 'Recevoir des alertes pour les nouvelles offres correspondant à votre profil' },
                { key: 'statutCandidature', label: 'Statut de candidature',     desc: 'Être notifié quand le statut de votre candidature change' },
                { key: 'entretien',         label: 'Rappels d\'entretien',      desc: 'Recevoir des rappels avant un entretien planifié' },
                { key: 'newsletter',        label: 'Newsletter SmartRecruit',   desc: 'Recevoir nos conseils carrière et actualités emploi' },
                { key: 'rappels',           label: 'Rappels de profil',         desc: 'Rappels pour compléter et mettre à jour votre profil' },
              ].map(n => (
                <div key={n.key} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '16px 0', borderBottom: '1px solid #F1F5F9',
                }}>
                  <div style={{ flex: 1, marginRight: '16px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#1E293B', marginBottom: '4px' }}>
                      {n.label}
                    </div>
                    <div style={{ fontSize: '13px', color: '#94A3B8' }}>{n.desc}</div>
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
              <h3 style={titleStyle}>🔒 Confidentialité</h3>
              <p style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '24px' }}>
                Contrôlez la visibilité de vos informations
              </p>

              {[
                { key: 'profilVisible',   label: 'Profil visible par les recruteurs', desc: 'Les recruteurs peuvent trouver votre profil dans leurs recherches' },
                { key: 'cvVisible',       label: 'CV téléchargeable',                  desc: 'Les recruteurs peuvent télécharger votre CV directement' },
                { key: 'emailVisible',    label: 'Email visible',                       desc: 'Votre adresse email est visible sur votre profil public' },
                { key: 'rechercheActive', label: 'En recherche active',                 desc: 'Indiquer aux recruteurs que vous êtes activement en recherche d\'emploi' },
              ].map(c => (
                <div key={c.key} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '16px 0', borderBottom: '1px solid #F1F5F9',
                }}>
                  <div style={{ flex: 1, marginRight: '16px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#1E293B', marginBottom: '4px' }}>
                      {c.label}
                    </div>
                    <div style={{ fontSize: '13px', color: '#94A3B8' }}>{c.desc}</div>
                  </div>
                  <Toggle
                    value={confidentialite[c.key]}
                    onChange={v => setConfidentialite(cs => ({ ...cs, [c.key]: v }))}
                  />
                </div>
              ))}

              {/* Statut recherche */}
              <div style={{
                background: confidentialite.rechercheActive ? '#F0FDF4' : '#FEF2F2',
                borderRadius: '10px', padding: '14px 16px', marginTop: '20px',
                display: 'flex', alignItems: 'center', gap: '10px',
              }}>
                <span style={{ fontSize: '20px' }}>
                  {confidentialite.rechercheActive ? '🟢' : '🔴'}
                </span>
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
              <h3 style={titleStyle}>⚙️ Préférences de recherche</h3>
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
                background: '#F8FAFC', borderRadius: '12px', padding: '20px',
                border: '1px solid #E2E8F0', marginTop: '8px',
              }}>
                <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: '15px', fontWeight: '700', color: '#1E293B', marginBottom: '16px' }}>
                  🎯 Critères de recherche d'emploi
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
              <h3 style={titleStyle}>🛡️ Sécurité</h3>
              <p style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '24px' }}>
                Gérez la sécurité de votre compte
              </p>

              {/* Changer mot de passe */}
              <div style={{
                background: '#F8FAFC', borderRadius: '12px', padding: '20px',
                border: '1px solid #E2E8F0', marginBottom: '20px',
              }}>
                <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: '15px', fontWeight: '700', color: '#1E293B', marginBottom: '16px' }}>
                  🔑 Changer le mot de passe
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
                background: '#F8FAFC', borderRadius: '12px', padding: '20px',
                border: '1px solid #E2E8F0', marginBottom: '20px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#1E293B', marginBottom: '4px' }}>
                      🔐 Double authentification
                    </div>
                    <div style={{ fontSize: '13px', color: '#94A3B8' }}>
                      Sécurisez votre compte avec une vérification en deux étapes
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
                background: '#F8FAFC', borderRadius: '12px', padding: '20px',
                border: '1px solid #E2E8F0', marginBottom: '20px',
              }}>
                <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: '15px', fontWeight: '700', color: '#1E293B', marginBottom: '16px' }}>
                  📱 Informations de session
                </h4>
                {[
                  { label: 'Dernière connexion',  value: '25/02/2026 à 10:30' },
                  { label: 'Appareil',            value: 'Chrome — Windows 10' },
                  { label: 'Adresse IP',          value: '196.XXX.XXX.XXX' },
                ].map((f, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between',
                    padding: '10px 0', borderBottom: i < 2 ? '1px solid #F1F5F9' : 'none',
                    fontSize: '13px',
                  }}>
                    <span style={{ color: '#94A3B8' }}>{f.label}</span>
                    <span style={{ color: '#1E293B', fontWeight: '500' }}>{f.value}</span>
                  </div>
                ))}
              </div>

              {/* Zone danger */}
              <div style={{
                background: '#FEF2F2', borderRadius: '12px', padding: '20px',
                border: '1px solid #FECACA',
              }}>
                <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: '15px', fontWeight: '700', color: '#EF4444', marginBottom: '8px' }}>
                  ⚠️ Zone dangereuse
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
                  }}>
                    🚪 Se déconnecter de partout
                  </button>
                  <button style={{
                    padding: '10px 20px', borderRadius: '10px',
                    border: 'none', background: '#EF4444',
                    color: '#fff', cursor: 'pointer',
                    fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: '500',
                  }}>
                    🗑 Supprimer mon compte
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ===== MON COMPTE ===== */}
          {activeTab === 'compte' && (
            <div>
              <h3 style={titleStyle}>👤 Mon compte</h3>
              <p style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '24px' }}>
                Informations générales sur votre compte SmartRecruit
              </p>

              {[
                { icon: '📧', label: 'Email',           value: 'candidat@test.com' },
                { icon: '📅', label: 'Membre depuis',   value: 'Janvier 2026' },
                { icon: '🎯', label: 'Type de compte',  value: 'Candidat' },
                { icon: '✅', label: 'Statut',          value: 'Actif' },
                { icon: '📋', label: 'Candidatures',    value: '3 candidatures envoyées' },
                { icon: '📄', label: 'CV',              value: 'CV_MonNom_2026.pdf' },
              ].map((f, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '16px',
                  padding: '14px 0', borderBottom: '1px solid #F1F5F9',
                }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: '#EFF6FF', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '18px', flexShrink: 0,
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
                background: '#EFF6FF', borderRadius: '12px', padding: '20px',
                border: '1px solid #BFDBFE', marginTop: '24px',
              }}>
                <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: '15px', fontWeight: '700', color: '#1E3A8A', marginBottom: '8px' }}>
                  📥 Exporter mes données
                </h4>
                <p style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '16px' }}>
                  Téléchargez une copie de toutes vos données personnelles
                </p>
                <button style={{
                  padding: '10px 20px', borderRadius: '10px', border: 'none',
                  background: '#1E3A8A', color: '#fff', cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: '500',
                }}>
                  📥 Télécharger mes données
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
                fontSize: '14px', color: '#475569',
              }}>
                Annuler
              </button>
              <button onClick={handleSave} style={{
                height: '44px', padding: '0 32px', borderRadius: '50px',
                background: '#1E3A8A', color: '#fff', border: 'none',
                fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
                fontWeight: '500', cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(30,58,138,.25)',
              }}>
                💾 Enregistrer
              </button>
            </div>
          )}
        </div>
      </div>
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
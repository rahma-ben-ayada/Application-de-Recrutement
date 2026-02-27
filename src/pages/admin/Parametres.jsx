import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';

export default function Parametres() {
  const [activeTab, setActiveTab] = useState('profil');
  const [saved, setSaved] = useState(false);

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
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const set = (setter, k) => (e) => setter(p => ({ ...p, [k]: e.target.value }));

  const tabs = [
    { key: 'profil',    label: 'Profil',        icon: '👤' },
    { key: 'systeme',   label: 'Système',        icon: '⚙️' },
    { key: 'notifs',    label: 'Notifications',  icon: '🔔' },
    { key: 'securite',  label: 'Sécurité',       icon: '🔒' },
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
          ✓ Modifications enregistrées avec succès !
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
                gap: '10px', padding: '12px 16px', borderRadius: '10px',
                border: 'none', cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: '500',
                background: activeTab === t.key ? '#EFF6FF' : 'transparent',
                color: activeTab === t.key ? '#1E3A8A' : '#475569',
                marginBottom: '4px', textAlign: 'left',
                transition: '150ms',
                borderLeft: activeTab === t.key ? '3px solid #1E3A8A' : '3px solid transparent',
              }}
            >
              <span style={{ fontSize: '18px' }}>{t.icon}</span>
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
                <h3 style={titleStyle}>👤 Profil Administrateur</h3>
                <p style={{ fontSize: '13px', color: '#94A3B8', marginTop: '4px' }}>
                  Gérez vos informations personnelles et votre mot de passe.
                </p>
              </div>

              {/* Avatar */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px',
                padding: '20px', background: '#F8FAFC', borderRadius: '12px',
                border: '1px solid #E2E8F0',
              }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: '#1E3A8A', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: '#fff',
                  fontWeight: '800', fontSize: '24px', fontFamily: 'Syne, sans-serif',
                  flexShrink: 0,
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
                    marginTop: '8px', background: '#DBEAFE', color: '#1E3A8A',
                    padding: '3px 10px', borderRadius: '50px', fontSize: '11px',
                    fontWeight: '600', display: 'inline-block',
                  }}>
                    🛡 Administrateur
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
                <h3 style={titleStyle}>⚙️ Paramètres système</h3>
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
                  { label: 'Backend API',      value: 'Non connecté', status: false },
                  { label: 'Base de données',  value: 'Non connectée', status: false },
                  { label: 'Power BI',         value: 'Non configuré', status: false },
                  { label: 'Modèle ML',        value: 'En développement', status: false },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '14px 16px', background: '#F8FAFC',
                    borderRadius: '10px', border: '1px solid #E2E8F0',
                  }}>
                    <span style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>{item.label}</span>
                    <span style={{
                      background: '#FEF2F2', color: '#EF4444',
                      padding: '3px 10px', borderRadius: '50px',
                      fontSize: '11px', fontWeight: '500',
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
                <h3 style={titleStyle}>🔔 Notifications</h3>
                <p style={{ fontSize: '13px', color: '#94A3B8', marginTop: '4px' }}>
                  Choisissez les notifications que vous souhaitez recevoir.
                </p>
              </div>

              {[
                { key: 'email',       label: 'Notifications par email',     desc: 'Recevoir un email pour chaque événement important' },
                { key: 'candidature', label: 'Nouvelle candidature',         desc: 'Être alerté quand un candidat postule' },
                { key: 'entretien',   label: 'Rappel entretien',             desc: 'Rappel 1h avant chaque entretien planifié' },
                { key: 'rapport',     label: 'Rapports hebdomadaires',       desc: 'Recevoir un résumé chaque lundi matin' },
              ].map(n => (
                <div key={n.key} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '18px 0', borderBottom: '1px solid #F1F5F9',
                }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#1E293B' }}>{n.label}</div>
                    <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '3px' }}>{n.desc}</div>
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
                <h3 style={titleStyle}>🔒 Sécurité</h3>
                <p style={{ fontSize: '13px', color: '#94A3B8', marginTop: '4px' }}>
                  Gérez la sécurité de votre compte administrateur.
                </p>
              </div>

              {[
                { label: 'Double authentification', value: 'Désactivée',         color: '#EF4444' },
                { label: 'Durée de session',        value: '8 heures',           color: '#059669' },
                { label: 'Dernière connexion',      value: "Aujourd'hui 09:30",  color: '#1E3A8A' },
                { label: 'Tentatives échouées',     value: '0',                  color: '#059669' },
              ].map((f, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '16px', marginBottom: '10px',
                  background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0',
                }}>
                  <span style={{ fontSize: '14px', color: '#475569', fontWeight: '500' }}>{f.label}</span>
                  <span style={{
                    fontSize: '13px', fontWeight: '600', color: f.color,
                    background: f.color + '15', padding: '4px 12px', borderRadius: '50px',
                  }}>
                    {f.value}
                  </span>
                </div>
              ))}

              <div style={{
                marginTop: '20px', padding: '16px', background: '#FEF2F2',
                borderRadius: '10px', border: '1px solid #FECACA',
              }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#EF4444', marginBottom: '4px' }}>
                  ⚠ Zone dangereuse
                </div>
                <p style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '12px' }}>
                  Ces actions sont irréversibles. Procédez avec prudence.
                </p>
                <button style={{
                  padding: '8px 20px', borderRadius: '50px', border: '1px solid #EF4444',
                  background: 'transparent', color: '#EF4444', cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: '500',
                }}>
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
        </div>
      </div>
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
      background: value ? '#1E3A8A' : '#E2E8F0',
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
};
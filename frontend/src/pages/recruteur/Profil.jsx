import React, { useState } from 'react';
import RecruteurLayout from '../../layouts/RecruteurLayout';

export default function ProfilRecruteur() {
  const [profil, setProfil] = useState({
    nom: 'Recruteur RH',
    email: 'recruteur@smartrecruit.com',
    telephone: '+216 XX XXX XXX',
    entreprise: 'SmartRecruit',
    poste: 'Responsable RH',
    motdepasse: '',
    confirmer: '',
  });

  const [saved, setSaved] = useState(false);
  const set = (k) => (e) => setProfil(p => ({ ...p, [k]: e.target.value }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <RecruteurLayout title="Mon Profil">

      {saved && (
        <div style={{
          background: '#F0FDF4', border: '1px solid #22C55E',
          borderRadius: '10px', padding: '14px 20px',
          color: '#059669', fontSize: '14px', fontWeight: '500',
          marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          ✓ Profil mis à jour avec succès !
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', alignItems: 'start' }}>

        {/* Card gauche — Avatar + infos rapides */}
        <div style={cardStyle}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: '#1E3A8A', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: '#fff',
              fontWeight: '800', fontSize: '32px', fontFamily: 'Syne, sans-serif',
              margin: '0 auto 12px',
            }}>
              {profil.nom[0]}
            </div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '16px', fontWeight: '700', color: '#1E293B' }}>
              {profil.nom}
            </div>
            <div style={{ fontSize: '13px', color: '#94A3B8', marginTop: '4px' }}>
              {profil.poste}
            </div>
            <div style={{
              marginTop: '10px', background: '#DBEAFE', color: '#1E3A8A',
              padding: '4px 14px', borderRadius: '50px',
              fontSize: '12px', fontWeight: '600', display: 'inline-block',
            }}>
              🏢 Recruteur RH
            </div>
          </div>

          {[
            { label: 'Entreprise', value: profil.entreprise, icon: '🏢' },
            { label: 'Email',      value: profil.email,      icon: '✉️' },
            { label: 'Téléphone',  value: profil.telephone,  icon: '📞' },
          ].map((f, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 0', borderBottom: '1px solid #F1F5F9', fontSize: '13px',
            }}>
              <span>{f.icon}</span>
              <div>
                <div style={{ fontSize: '11px', color: '#94A3B8' }}>{f.label}</div>
                <div style={{ color: '#1E293B', fontWeight: '500' }}>{f.value}</div>
              </div>
            </div>
          ))}

          {/* Stats rapides */}
          <div style={{ marginTop: '20px' }}>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '.05em' }}>
              Activité
            </div>
            {[
              { label: 'Offres publiées',    value: '12', color: '#1E3A8A' },
              { label: 'Candidatures reçues', value: '248', color: '#2563EB' },
              { label: 'Entretiens planifiés', value: '8', color: '#059669' },
            ].map((s, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '8px 0', borderBottom: '1px solid #F1F5F9', fontSize: '13px',
              }}>
                <span style={{ color: '#475569' }}>{s.label}</span>
                <span style={{ fontWeight: '700', color: s.color, fontFamily: 'Syne, sans-serif' }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card droite — Formulaire */}
        <div style={cardStyle}>
          <h3 style={titleStyle}>✏️ Modifier mes informations</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            {[
              { label: 'Nom complet',  key: 'nom',        type: 'text',  placeholder: 'Votre nom' },
              { label: 'Email',        key: 'email',      type: 'email', placeholder: 'email@mail.com' },
              { label: 'Téléphone',    key: 'telephone',  type: 'tel',   placeholder: '+216 XX XXX XXX' },
              { label: 'Entreprise',   key: 'entreprise', type: 'text',  placeholder: 'Nom entreprise' },
              { label: 'Poste',        key: 'poste',      type: 'text',  placeholder: 'Votre poste' },
            ].map(f => (
              <div key={f.key}>
                <label style={labelStyle}>{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={profil[f.key]}
                  onChange={set(f.key)}
                  style={inputStyle}
                />
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0' }}>
            <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>Changer le mot de passe</span>
            <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
            <div>
              <label style={labelStyle}>Nouveau mot de passe</label>
              <input
                type="password" placeholder="••••••••"
                value={profil.motdepasse} onChange={set('motdepasse')}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Confirmer</label>
              <input
                type="password" placeholder="••••••••"
                value={profil.confirmer} onChange={set('confirmer')}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
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
    </RecruteurLayout>
  );
}

const cardStyle = {
  background: '#fff', borderRadius: '12px', padding: '24px',
  border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(15,23,42,.06)',
};

const titleStyle = {
  fontFamily: 'Syne, sans-serif', fontSize: '18px',
  fontWeight: '700', color: '#1E293B', marginBottom: '24px',
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
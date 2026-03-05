import React, { useState, useEffect } from 'react';
import RecruteurLayout from '../../layouts/RecruteurLayout';
import api from '../../utils/api';

export default function ProfilRecruteur() {
  const [profil, setProfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [stats, setStats] = useState({ offres: 0, candidatures: 0, entretiens: 0 });

  const [form, setForm] = useState({
    nom: '', telephone: '', entreprise: '', secteur: '', siteWeb: '',
    ancienPassword: '', nouveauPassword: '', confirmer: '',
  });

  useEffect(() => {
    fetchProfil();
    fetchStats();
  }, []);

  const fetchProfil = async () => {
    try {
      const data = await api('/auth/profil');
      const u = data.user;
      setProfil(u);
      setForm({
        nom: u.nom || '',
        telephone: u.telephone || '',
        entreprise: u.entreprise || '',
        secteur: u.secteur || '',
        siteWeb: u.siteWeb || '',
        ancienPassword: '',
        nouveauPassword: '',
        confirmer: '',
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const offresData = await api('/offres/mes');
      const offres = offresData.offres || [];
      let totalCandidatures = 0;
      for (const offre of offres) {
        try {
          const data = await api(`/candidatures/offre/${offre._id}`);
          totalCandidatures += (data.candidatures || []).length;
        } catch (e) {}
      }
      const entretiens = JSON.parse(localStorage.getItem('entretiens_recruteur') || '[]');
      setStats({
        offres: offres.length,
        candidatures: totalCandidatures,
        entretiens: entretiens.length,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSave = async () => {
    if (form.nouveauPassword && form.nouveauPassword !== form.confirmer) {
      return showMessage('error', '❌ Les mots de passe ne correspondent pas !');
    }
    setSaving(true);
    try {
      await api('/auth/profil', 'PUT', {
        nom: form.nom,
        telephone: form.telephone,
        entreprise: form.entreprise,
        secteur: form.secteur,
        siteWeb: form.siteWeb,
      });

      if (form.nouveauPassword) {
        await api('/users/change-password', 'PUT', {
          ancienPassword: form.ancienPassword,
          nouveauPassword: form.nouveauPassword,
        });
      }

      showMessage('success', '✅ Profil mis à jour avec succès !');
      fetchProfil();
    } catch (err) {
      showMessage('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <RecruteurLayout title="Mon Profil">
      <div style={{ textAlign: 'center', padding: '60px', color: '#94A3B8' }}>
        Chargement...
      </div>
    </RecruteurLayout>
  );

  return (
    <RecruteurLayout title="Mon Profil">

      {/* Message */}
      {message && (
        <div style={{
          padding: '12px 16px', borderRadius: '10px', marginBottom: '20px',
          background: message.type === 'success' ? '#D1FAE5' : '#FEE2E2',
          color: message.type === 'success' ? '#059669' : '#EF4444',
          fontSize: '14px', fontWeight: '500',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          {message.text}
          <button onClick={() => setMessage(null)} style={{
            background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: 'inherit',
          }}>✕</button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', alignItems: 'start' }}>

        {/* Card gauche */}
        <div style={cardStyle}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: '#1E3A8A', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: '#fff',
              fontWeight: '800', fontSize: '32px', fontFamily: 'Syne, sans-serif',
              margin: '0 auto 12px',
            }}>
              {profil?.nom?.[0]?.toUpperCase() || '?'}
            </div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '16px', fontWeight: '700', color: '#1E293B' }}>
              {profil?.nom}
            </div>
            <div style={{ fontSize: '13px', color: '#94A3B8', marginTop: '4px' }}>
              {profil?.entreprise || 'Entreprise non renseignée'}
            </div>
            <div style={{
              marginTop: '10px', background: '#DBEAFE', color: '#1E3A8A',
              padding: '4px 14px', borderRadius: '50px',
              fontSize: '12px', fontWeight: '600', display: 'inline-block',
            }}>
              🏢 Recruteur
            </div>
          </div>

          {[
            { label: 'Entreprise', value: profil?.entreprise || '—', icon: '🏢' },
            { label: 'Email',      value: profil?.email || '—',      icon: '✉️' },
            { label: 'Téléphone',  value: profil?.telephone || '—',  icon: '📞' },
            { label: 'Secteur',    value: profil?.secteur || '—',    icon: '🏭' },
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

          {/* Stats réelles */}
          <div style={{ marginTop: '20px' }}>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '.05em' }}>
              Activité
            </div>
            {[
              { label: 'Offres publiées',      value: stats.offres,        color: '#1E3A8A' },
              { label: 'Candidatures reçues',  value: stats.candidatures,  color: '#2563EB' },
              { label: 'Entretiens planifiés', value: stats.entretiens,    color: '#059669' },
            ].map((s, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '8px 0', borderBottom: '1px solid #F1F5F9', fontSize: '13px',
              }}>
                <span style={{ color: '#475569' }}>{s.label}</span>
                <span style={{ fontWeight: '700', color: s.color, fontFamily: 'Syne, sans-serif' }}>
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card droite — Formulaire */}
        <div style={cardStyle}>
          <h3 style={titleStyle}>✏️ Modifier mes informations</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={labelStyle}>Nom complet</label>
              <input value={form.nom} onChange={set('nom')} style={inputStyle} placeholder="Votre nom" />
            </div>
            <div>
              <label style={labelStyle}>Téléphone</label>
              <input value={form.telephone} onChange={set('telephone')} style={inputStyle} placeholder="+216 XX XXX XXX" />
            </div>
            <div>
              <label style={labelStyle}>Entreprise</label>
              <input value={form.entreprise} onChange={set('entreprise')} style={inputStyle} placeholder="Nom entreprise" />
            </div>
            <div>
              <label style={labelStyle}>Secteur</label>
              <input value={form.secteur} onChange={set('secteur')} style={inputStyle} placeholder="Ex: Informatique" />
            </div>
            <div>
              <label style={labelStyle}>Site Web</label>
              <input value={form.siteWeb} onChange={set('siteWeb')} style={inputStyle} placeholder="https://..." />
            </div>
          </div>

          {/* Changer password */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0 16px' }}>
            <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>Changer le mot de passe</span>
            <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '32px' }}>
            <div>
              <label style={labelStyle}>Ancien mot de passe</label>
              <input type="password" value={form.ancienPassword} onChange={set('ancienPassword')} style={inputStyle} placeholder="••••••••" />
            </div>
            <div>
              <label style={labelStyle}>Nouveau mot de passe</label>
              <input type="password" value={form.nouveauPassword} onChange={set('nouveauPassword')} style={inputStyle} placeholder="••••••••" />
            </div>
            <div>
              <label style={labelStyle}>Confirmer</label>
              <input type="password" value={form.confirmer} onChange={set('confirmer')} style={inputStyle} placeholder="••••••••" />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button onClick={fetchProfil} style={{
              height: '44px', padding: '0 24px', borderRadius: '50px',
              border: '1.5px solid #E2E8F0', background: '#fff',
              cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
              fontSize: '14px', color: '#475569',
            }}>
              Annuler
            </button>
            <button onClick={handleSave} disabled={saving} style={{
              height: '44px', padding: '0 32px', borderRadius: '50px',
              background: '#1E3A8A', color: '#fff', border: 'none',
              fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
              fontWeight: '500', cursor: 'pointer',
              opacity: saving ? 0.7 : 1,
            }}>
              {saving ? 'Enregistrement...' : '💾 Enregistrer'}
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
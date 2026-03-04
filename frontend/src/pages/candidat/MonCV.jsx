import React, { useState, useEffect } from 'react';
import CandidatLayout from '../../layouts/CandidatLayout';
import api from '../../utils/api';

export default function MonCV() {
  const [profil, setProfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    nom: '', email: '', telephone: '',
    experience: '', competences: '',
    formation: '', langues: '', objectif: '',
  });

  useEffect(() => {
    fetchProfil();
  }, []);

  const fetchProfil = async () => {
    try {
      const data = await api('/auth/profil');
      setProfil(data.user);
      setForm({
        nom: data.user.nom || '',
        email: data.user.email || '',
        telephone: data.user.telephone || '',
        experience: data.user.experience || '',
        competences: (data.user.competences || []).join(', '),
        formation: data.user.formation || '',
        langues: data.user.langues || '',
        objectif: data.user.objectif || '',
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        competences: form.competences
          ? form.competences.split(',').map(c => c.trim()).filter(Boolean)
          : [],
      };
      await api('/auth/profil', 'PUT', payload);
      showMessage('success', '✅ CV mis à jour !');
      setEditing(false);
      fetchProfil();
    } catch (err) {
      showMessage('error', err.message);
    }
  };

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  if (loading) return (
    <CandidatLayout title="Mon CV">
      <div style={{ textAlign: 'center', padding: '60px', color: '#94A3B8' }}>
        Chargement...
      </div>
    </CandidatLayout>
  );

  return (
    <CandidatLayout title="Mon CV">

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

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px' }}>

        {/* Carte profil gauche */}
        <div>
          <div style={{
            background: '#fff', borderRadius: '16px', padding: '24px',
            border: '1px solid #E2E8F0', textAlign: 'center', marginBottom: '16px',
          }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: '#EDE9FE', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: '#7C3AED',
              fontWeight: '800', fontSize: '32px', fontFamily: 'Syne, sans-serif',
              margin: '0 auto 16px',
            }}>
              {profil?.nom?.[0]?.toUpperCase() || '?'}
            </div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '18px', fontWeight: '700', color: '#1E293B' }}>
              {profil?.nom}
            </div>
            <div style={{ fontSize: '13px', color: '#94A3B8', marginTop: '4px' }}>
              {profil?.email}
            </div>
            {profil?.telephone && (
              <div style={{ fontSize: '13px', color: '#94A3B8', marginTop: '4px' }}>
                📞 {profil.telephone}
              </div>
            )}

            <button onClick={() => setEditing(!editing)} style={{
              marginTop: '16px', width: '100%', height: '40px',
              borderRadius: '50px', border: 'none',
              background: editing ? '#FEE2E2' : '#1E3A8A',
              color: editing ? '#EF4444' : '#fff',
              cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
              fontSize: '13px', fontWeight: '600',
            }}>
              {editing ? '✕ Annuler' : '✏️ Modifier mon CV'}
            </button>

            {editing && (
              <button onClick={handleSave} style={{
                marginTop: '8px', width: '100%', height: '40px',
                borderRadius: '50px', border: 'none',
                background: '#059669', color: '#fff',
                cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                fontSize: '13px', fontWeight: '600',
              }}>
                💾 Enregistrer
              </button>
            )}
          </div>

          {/* Compétences */}
          <div style={{
            background: '#fff', borderRadius: '16px', padding: '20px',
            border: '1px solid #E2E8F0',
          }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '14px', fontWeight: '700', color: '#1E293B', marginBottom: '12px' }}>
              🛠 Compétences
            </div>
            {editing ? (
              <textarea
                placeholder="React, Node.js, Python..."
                value={form.competences}
                onChange={set('competences')}
                rows={4}
                style={{ ...inputStyle, height: 'auto', padding: '10px 14px', resize: 'vertical' }}
              />
            ) : (
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {(profil?.competences || []).length > 0 ? (
                  profil.competences.map((c, i) => (
                    <span key={i} style={{
                      background: '#EDE9FE', color: '#7C3AED',
                      padding: '4px 12px', borderRadius: '6px',
                      fontSize: '12px', fontWeight: '500',
                    }}>
                      {c}
                    </span>
                  ))
                ) : (
                  <span style={{ fontSize: '13px', color: '#CBD5E1' }}>Aucune compétence ajoutée</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Contenu principal droite */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Objectif */}
          <Section title="🎯 Objectif professionnel">
            {editing ? (
              <textarea
                placeholder="Décrivez votre objectif professionnel..."
                value={form.objectif}
                onChange={set('objectif')}
                rows={3}
                style={{ ...inputStyle, height: 'auto', padding: '10px 14px', resize: 'vertical' }}
              />
            ) : (
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.7' }}>
                {profil?.objectif || <span style={{ color: '#CBD5E1' }}>Non renseigné</span>}
              </p>
            )}
          </Section>

          {/* Expérience */}
          <Section title="💼 Expérience">
            {editing ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Années d'expérience</label>
                  <input
                    type="number" min="0" max="50"
                    placeholder="Ex: 3"
                    value={form.experience}
                    onChange={set('experience')}
                    style={inputStyle}
                  />
                </div>
              </div>
            ) : (
              <p style={{ fontSize: '14px', color: '#475569' }}>
                {profil?.experience
                  ? `${profil.experience} ans d'expérience`
                  : <span style={{ color: '#CBD5E1' }}>Non renseigné</span>}
              </p>
            )}
          </Section>

          {/* Formation */}
          <Section title="🎓 Formation">
            {editing ? (
              <textarea
                placeholder="Ex: Master Informatique — Université de Tunis (2020-2022)"
                value={form.formation}
                onChange={set('formation')}
                rows={3}
                style={{ ...inputStyle, height: 'auto', padding: '10px 14px', resize: 'vertical' }}
              />
            ) : (
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                {profil?.formation || <span style={{ color: '#CBD5E1' }}>Non renseigné</span>}
              </p>
            )}
          </Section>

          {/* Langues */}
          <Section title="🌍 Langues">
            {editing ? (
              <input
                placeholder="Ex: Arabe (natif), Français (courant), Anglais (intermédiaire)"
                value={form.langues}
                onChange={set('langues')}
                style={inputStyle}
              />
            ) : (
              <p style={{ fontSize: '14px', color: '#475569' }}>
                {profil?.langues || <span style={{ color: '#CBD5E1' }}>Non renseigné</span>}
              </p>
            )}
          </Section>

          {/* Contact */}
          {editing && (
            <Section title="📞 Informations de contact">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Nom complet</label>
                  <input value={form.nom} onChange={set('nom')} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Téléphone</label>
                  <input value={form.telephone} onChange={set('telephone')} placeholder="+216 XX XXX XXX" style={inputStyle} />
                </div>
              </div>
            </Section>
          )}
        </div>
      </div>
    </CandidatLayout>
  );
}

function Section({ title, children }) {
  return (
    <div style={{
      background: '#fff', borderRadius: '16px', padding: '20px 24px',
      border: '1px solid #E2E8F0',
    }}>
      <div style={{
        fontFamily: 'Syne, sans-serif', fontSize: '15px',
        fontWeight: '700', color: '#1E293B', marginBottom: '12px',
      }}>
        {title}
      </div>
      {children}
    </div>
  );
}

const inputStyle = {
  width: '100%', height: '42px', padding: '0 14px',
  border: '1.5px solid #E2E8F0', borderRadius: '10px',
  fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
  outline: 'none', boxSizing: 'border-box', background: '#F8FAFC',
};

const labelStyle = {
  fontSize: '13px', fontWeight: '500', color: '#475569',
  display: 'block', marginBottom: '6px',
};
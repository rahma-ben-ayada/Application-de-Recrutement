import React, { useState, useEffect } from 'react';
import CandidatLayout from '../../layouts/CandidatLayout';
import api from '../../utils/api';

export default function ProfilCandidat() {
  const [profil, setProfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [activeTab, setActiveTab] = useState('infos');

  // Formulaire infos
  const [form, setForm] = useState({
    nom: '', telephone: '', titre: '', bio: '',
    ancienPassword: '', nouveauPassword: '', confirmer: '',
  });

  // Compétences
  const [competences, setCompetences] = useState([]);
  const [newComp, setNewComp] = useState('');

  // Expérience (années)
  const [experience, setExperience] = useState(0);

  // Formations (texte libre)
  const [formation, setFormation] = useState('');

  // Langues
  const [langues, setLangues] = useState('');

  // CV
  const [cvFile, setCvFile] = useState(null);
  const [uploadingCV, setUploadingCV] = useState(false);

  useEffect(() => {
    fetchProfil();
  }, []);

  const fetchProfil = async () => {
    try {
      const data = await api('/auth/profil');
      const u = data.user;
      setProfil(u);
      setForm({
        nom: u.nom || '',
        telephone: u.telephone || '',
        titre: u.titre || '',
        bio: u.bio || '',
        ancienPassword: '',
        nouveauPassword: '',
        confirmer: '',
      });
      setCompetences(u.competences || []);
      setExperience(u.experience || 0);
      setFormation(u.formation || '');
      setLangues(u.langues || '');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      // Vérifier passwords
      if (form.nouveauPassword && form.nouveauPassword !== form.confirmer) {
        return showMessage('error', '❌ Les mots de passe ne correspondent pas !');
      }

      // Mettre à jour profil
      await api('/auth/profil', 'PUT', {
        nom: form.nom,
        telephone: form.telephone,
        titre: form.titre,
        bio: form.bio,
        competences,
        experience: Number(experience),
        formation,
        langues,
      });

      // Changer password si rempli
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

  const handleUploadCV = async () => {
    if (!cvFile) return;
    setUploadingCV(true);
    try {
      const formData = new FormData();
      formData.append('cv', cvFile);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/upload-cv', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      showMessage('success', '✅ CV uploadé avec succès !');
      setCvFile(null);
      fetchProfil();
    } catch (err) {
      showMessage('error', err.message);
    } finally {
      setUploadingCV(false);
    }
  };

  const addCompetence = () => {
    const c = newComp.trim();
    if (c && !competences.includes(c)) {
      setCompetences(cs => [...cs, c]);
      setNewComp('');
    }
  };

  const removeCompetence = (c) => setCompetences(cs => cs.filter(x => x !== c));

  const tabs = [
    { key: 'infos',       label: 'Informations', icon: '👤' },
    { key: 'competences', label: 'Compétences',  icon: '🛠' },
    { key: 'experience',  label: 'Expérience',   icon: '💼' },
    { key: 'formation',   label: 'Formation',    icon: '🎓' },
    { key: 'cv',          label: 'Mon CV',       icon: '📄' },
  ];

  if (loading) return (
    <CandidatLayout title="Mon Profil">
      <div style={{ textAlign: 'center', padding: '60px', color: '#94A3B8' }}>
        Chargement...
      </div>
    </CandidatLayout>
  );

  return (
    <CandidatLayout title="Mon Profil">

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

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '24px', alignItems: 'start' }}>

        {/* Sidebar tabs */}
        <div style={{
          background: '#fff', borderRadius: '12px', padding: '8px',
          border: '1px solid #E2E8F0', position: 'sticky', top: '20px',
        }}>
          <div style={{ textAlign: 'center', padding: '16px 8px', borderBottom: '1px solid #F1F5F9', marginBottom: '8px' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: '#7C3AED', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: '#fff',
              fontWeight: '800', fontSize: '22px', fontFamily: 'Syne, sans-serif',
              margin: '0 auto 8px',
            }}>
              {profil?.nom?.[0]?.toUpperCase() || '?'}
            </div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#1E293B' }}>{profil?.nom}</div>
            <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>{profil?.email}</div>
          </div>

          {tabs.map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
              width: '100%', display: 'flex', alignItems: 'center',
              gap: '10px', padding: '11px 14px', borderRadius: '10px',
              border: 'none', cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: '500',
              background: activeTab === t.key ? '#1E3A8A' : 'transparent',
              color: activeTab === t.key ? '#fff' : '#475569',
              marginBottom: '2px', textAlign: 'left', transition: '150ms',
            }}>
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {/* Contenu */}
        <div style={{
          background: '#fff', borderRadius: '12px', padding: '32px',
          border: '1px solid #E2E8F0',
        }}>

          {/* INFOS */}
          {activeTab === 'infos' && (
            <div>
              <h3 style={titleStyle}>👤 Informations personnelles</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={labelStyle}>Nom complet</label>
                  <input value={form.nom} onChange={set('nom')} style={inputStyle} placeholder="Votre nom" />
                </div>
                <div>
                  <label style={labelStyle}>Téléphone</label>
                  <input value={form.telephone} onChange={set('telephone')} style={inputStyle} placeholder="+216 XX XXX XXX" />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Titre professionnel</label>
                <input value={form.titre} onChange={set('titre')} style={inputStyle} placeholder="Ex: Développeur Full Stack" />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={labelStyle}>Bio / Présentation</label>
                <textarea
                  value={form.bio} onChange={set('bio')}
                  rows={4} placeholder="Parlez de vous..."
                  style={{ ...inputStyle, height: 'auto', padding: '12px 14px', resize: 'vertical' }}
                />
              </div>

              {/* Changer password */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0 16px' }}>
                <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
                <span style={{ fontSize: '12px', color: '#94A3B8' }}>Changer le mot de passe</span>
                <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
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
            </div>
          )}

          {/* COMPÉTENCES */}
          {activeTab === 'competences' && (
            <div>
              <h3 style={titleStyle}>🛠 Mes compétences</h3>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                <input
                  placeholder="Ajouter une compétence..."
                  value={newComp}
                  onChange={e => setNewComp(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addCompetence()}
                  style={{ ...inputStyle, flex: 1 }}
                />
                <button onClick={addCompetence} style={{
                  height: '42px', padding: '0 20px', borderRadius: '10px',
                  background: '#1E3A8A', color: '#fff', border: 'none',
                  cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
                }}>
                  ➕ Ajouter
                </button>
              </div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {competences.map((c, i) => (
                  <div key={i} style={{
                    background: '#DBEAFE', color: '#1E3A8A',
                    padding: '8px 16px', borderRadius: '50px',
                    fontSize: '14px', fontWeight: '500',
                    display: 'flex', alignItems: 'center', gap: '8px',
                  }}>
                    {c}
                    <button onClick={() => removeCompetence(c)} style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: '#1E3A8A', fontSize: '14px', padding: '0',
                    }}>✕</button>
                  </div>
                ))}
                {competences.length === 0 && (
                  <div style={{ color: '#94A3B8', padding: '20px' }}>
                    Aucune compétence ajoutée
                  </div>
                )}
              </div>
            </div>
          )}

          {/* EXPÉRIENCE */}
          {activeTab === 'experience' && (
            <div>
              <h3 style={titleStyle}>💼 Expérience professionnelle</h3>
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Nombre d'années d'expérience</label>
                <input
                  type="number" min="0" max="50"
                  value={experience}
                  onChange={e => setExperience(e.target.value)}
                  style={{ ...inputStyle, width: '200px' }}
                  placeholder="Ex: 3"
                />
              </div>
              <div style={{
                background: '#EFF6FF', borderRadius: '10px', padding: '16px',
                fontSize: '13px', color: '#1E3A8A',
              }}>
                ℹ️ Cette information sera visible par les recruteurs dans vos candidatures.
              </div>
            </div>
          )}

          {/* FORMATION */}
          {activeTab === 'formation' && (
            <div>
              <h3 style={titleStyle}>🎓 Formation</h3>
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Formation(s)</label>
                <textarea
                  placeholder="Ex: Licence Informatique — FST Tunis (2020-2023)&#10;Master Génie Logiciel — ENSI (2023-2025)"
                  value={formation}
                  onChange={e => setFormation(e.target.value)}
                  rows={5}
                  style={{ ...inputStyle, height: 'auto', padding: '12px 14px', resize: 'vertical' }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Langues</label>
                <input
                  placeholder="Ex: Arabe (natif), Français (courant), Anglais (intermédiaire)"
                  value={langues}
                  onChange={e => setLangues(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
          )}

          {/* CV */}
          {activeTab === 'cv' && (
            <div>
              <h3 style={titleStyle}>📄 Mon CV</h3>

              {/* Upload zone */}
              <div style={{
                border: '2px dashed #CBD5E1', borderRadius: '12px',
                padding: '40px', textAlign: 'center', marginBottom: '24px',
                background: '#F8FAFC',
              }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>📤</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1E293B', marginBottom: '8px' }}>
                  {cvFile ? `✅ ${cvFile.name}` : 'Télécharger votre CV'}
                </div>
                <p style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '16px' }}>
                  PDF, DOC ou DOCX — Max 5 MB
                </p>
                <label style={{
                  padding: '10px 24px', borderRadius: '50px', border: 'none',
                  background: '#1E3A8A', color: '#fff', cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: '500',
                  display: 'inline-block',
                }}>
                  📁 Choisir un fichier
                  <input type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }}
                    onChange={e => setCvFile(e.target.files[0])} />
                </label>

                {cvFile && (
                  <button onClick={handleUploadCV} disabled={uploadingCV} style={{
                    marginLeft: '12px', padding: '10px 24px', borderRadius: '50px', border: 'none',
                    background: '#059669', color: '#fff', cursor: 'pointer',
                    fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: '500',
                  }}>
                    {uploadingCV ? 'Upload...' : '⬆️ Envoyer'}
                  </button>
                )}
              </div>

              {/* CV actuel */}
              {profil?.cv && (
                <div style={{
                  background: '#F8FAFC', borderRadius: '12px', padding: '16px 20px',
                  border: '1px solid #E2E8F0', display: 'flex',
                  justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '24px' }}>📄</span>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: '#1E293B' }}>
                        {profil.cvNom || 'Mon CV'}
                      </div>
                      <div style={{ fontSize: '12px', color: '#94A3B8' }}>CV uploadé</div>
                    </div>
                  </div>
                  
                    href={`http://localhost:5000/${profil.cv}`}
                    target="_blank" rel="noreferrer"
                    style={{
                      padding: '6px 14px', borderRadius: '8px',
                      border: '1px solid #E2E8F0', background: '#fff',
                      fontSize: '13px', fontFamily: 'DM Sans, sans-serif',
                      color: '#475569', textDecoration: 'none',
                    }}
                  <a>
                    👁 Voir
                  </a>
                </div>
              )}

              {!profil?.cv && (
                <div style={{
                  background: '#FEF3C7', borderRadius: '10px', padding: '14px 20px',
                  fontSize: '13px', color: '#92400E',
                }}>
                  ⚠️ Aucun CV uploadé — les recruteurs ne pourront pas voir votre CV
                </div>
              )}
            </div>
          )}

          {/* Bouton sauvegarder (pas pour CV) */}
          {activeTab !== 'cv' && (
            <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
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
          )}
        </div>
      </div>
    </CandidatLayout>
  );
}

const titleStyle = {
  fontFamily: 'Syne, sans-serif', fontSize: '18px',
  fontWeight: '700', color: '#1E293B', marginBottom: '20px',
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

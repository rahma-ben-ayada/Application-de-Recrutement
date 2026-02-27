import React, { useState } from 'react';
import CandidatLayout from '../../layouts/CandidatLayout';

export default function ProfilCandidat() {
  const [profil, setProfil] = useState({
    nom: 'Mon Nom',
    email: 'candidat@mail.com',
    telephone: '+216 XX XXX XXX',
    adresse: 'Tunis, Tunisie',
    titre: 'Développeur Full Stack',
    bio: 'Passionné par le développement web et les nouvelles technologies...',
    motdepasse: '',
    confirmer: '',
  });

  const [competences, setCompetences] = useState(['React', 'Node.js', 'Python']);
  const [newComp, setNewComp] = useState('');
  const [experiences, setExperiences] = useState([
    { id: 1, poste: 'Développeur Front-end', entreprise: 'Tech Corp', debut: '2023-01', fin: '2024-06', desc: 'Développement d\'interfaces React' },
  ]);
  const [formations, setFormations] = useState([
    { id: 1, diplome: 'Licence en Informatique', ecole: 'FST Tunis', annee: '2022' },
  ]);
  const [activeTab, setActiveTab] = useState('infos');
  const [saved, setSaved] = useState(false);

  const set = (k) => (e) => setProfil(p => ({ ...p, [k]: e.target.value }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addCompetence = () => {
    if (newComp.trim() && !competences.includes(newComp.trim())) {
      setCompetences(cs => [...cs, newComp.trim()]);
      setNewComp('');
    }
  };

  const removeCompetence = (c) => setCompetences(cs => cs.filter(x => x !== c));

  const tabs = [
    { key: 'infos',      label: 'Informations',  icon: '👤' },
    { key: 'competences',label: 'Compétences',    icon: '🛠' },
    { key: 'experience', label: 'Expérience',     icon: '💼' },
    { key: 'formation',  label: 'Formation',      icon: '🎓' },
    { key: 'cv',         label: 'Mon CV',         icon: '📄' },
  ];

  return (
    <CandidatLayout title="Mon Profil & CV">

      {saved && (
        <div style={{
          background: '#F0FDF4', border: '1px solid #22C55E',
          borderRadius: '10px', padding: '14px 20px',
          color: '#059669', fontSize: '14px', fontWeight: '500',
          marginBottom: '24px',
        }}>
          ✓ Profil mis à jour avec succès !
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '24px', alignItems: 'start' }}>

        {/* Sidebar tabs */}
        <div style={{
          background: '#fff', borderRadius: '12px', padding: '8px',
          border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(15,23,42,.06)',
          position: 'sticky', top: '20px',
        }}>
          {/* Mini profil */}
          <div style={{ textAlign: 'center', padding: '16px 8px', borderBottom: '1px solid #F1F5F9', marginBottom: '8px' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: '#1E3A8A', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: '#fff',
              fontWeight: '800', fontSize: '22px', fontFamily: 'Syne, sans-serif',
              margin: '0 auto 8px',
            }}>
              {profil.nom[0]}
            </div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#1E293B' }}>{profil.nom}</div>
            <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>{profil.titre}</div>
          </div>

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

          {/* ---- INFOS ---- */}
          {activeTab === 'infos' && (
            <div>
              <h3 style={titleStyle}>👤 Informations personnelles</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                {[
                  { label: 'Nom complet',  key: 'nom',       type: 'text',  placeholder: 'Votre nom' },
                  { label: 'Email',        key: 'email',     type: 'email', placeholder: 'email@mail.com' },
                  { label: 'Téléphone',    key: 'telephone', type: 'tel',   placeholder: '+216 XX XXX XXX' },
                  { label: 'Adresse',      key: 'adresse',   type: 'text',  placeholder: 'Ville, Pays' },
                  { label: 'Titre professionnel', key: 'titre', type: 'text', placeholder: 'Ex: Développeur Full Stack' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={labelStyle}>{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} value={profil[f.key]} onChange={set(f.key)} style={inputStyle} />
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={labelStyle}>Bio / Présentation</label>
                <textarea
                  placeholder="Parlez de vous..."
                  value={profil.bio} onChange={set('bio')}
                  rows={4}
                  style={{ ...inputStyle, height: 'auto', padding: '12px 14px', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '16px 0' }}>
                <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
                <span style={{ fontSize: '12px', color: '#94A3B8' }}>Changer le mot de passe</span>
                <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Nouveau mot de passe</label>
                  <input type="password" placeholder="••••••••" value={profil.motdepasse} onChange={set('motdepasse')} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Confirmer</label>
                  <input type="password" placeholder="••••••••" value={profil.confirmer} onChange={set('confirmer')} style={inputStyle} />
                </div>
              </div>
            </div>
          )}

          {/* ---- COMPÉTENCES ---- */}
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
                    <button
                      onClick={() => removeCompetence(c)}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: '#1E3A8A', fontSize: '14px', padding: '0',
                        display: 'flex', alignItems: 'center',
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {competences.length === 0 && (
                <div style={{ textAlign: 'center', color: '#94A3B8', padding: '40px' }}>
                  Aucune compétence ajoutée
                </div>
              )}
            </div>
          )}

          {/* ---- EXPÉRIENCE ---- */}
          {activeTab === 'experience' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={titleStyle}>💼 Expériences professionnelles</h3>
                <button
                  onClick={() => setExperiences(es => [...es, {
                    id: Date.now(), poste: '', entreprise: '', debut: '', fin: '', desc: ''
                  }])}
                  style={{
                    padding: '8px 16px', borderRadius: '10px', border: 'none',
                    background: '#1E3A8A', color: '#fff', cursor: 'pointer',
                    fontFamily: 'DM Sans, sans-serif', fontSize: '13px',
                  }}
                >
                  ➕ Ajouter
                </button>
              </div>

              {experiences.map((exp, i) => (
                <div key={exp.id} style={{
                  border: '1px solid #E2E8F0', borderRadius: '12px',
                  padding: '20px', marginBottom: '16px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
                    <button
                      onClick={() => setExperiences(es => es.filter(e => e.id !== exp.id))}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', fontSize: '13px' }}
                    >
                      🗑 Supprimer
                    </button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {[
                      { label: 'Poste', key: 'poste', placeholder: 'Ex: Développeur React' },
                      { label: 'Entreprise', key: 'entreprise', placeholder: 'Nom entreprise' },
                      { label: 'Début', key: 'debut', placeholder: '2023-01' },
                      { label: 'Fin', key: 'fin', placeholder: '2024-06 (ou En cours)' },
                    ].map(f => (
                      <div key={f.key}>
                        <label style={labelStyle}>{f.label}</label>
                        <input
                          type="text" placeholder={f.placeholder}
                          value={exp[f.key]}
                          onChange={e => setExperiences(es => es.map(x => x.id === exp.id ? { ...x, [f.key]: e.target.value } : x))}
                          style={inputStyle}
                        />
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '12px' }}>
                    <label style={labelStyle}>Description</label>
                    <textarea
                      placeholder="Décrivez vos missions..."
                      value={exp.desc}
                      onChange={e => setExperiences(es => es.map(x => x.id === exp.id ? { ...x, desc: e.target.value } : x))}
                      rows={3}
                      style={{ ...inputStyle, height: 'auto', padding: '10px 14px', resize: 'vertical' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ---- FORMATION ---- */}
          {activeTab === 'formation' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={titleStyle}>🎓 Formations</h3>
                <button
                  onClick={() => setFormations(fs => [...fs, { id: Date.now(), diplome: '', ecole: '', annee: '' }])}
                  style={{
                    padding: '8px 16px', borderRadius: '10px', border: 'none',
                    background: '#1E3A8A', color: '#fff', cursor: 'pointer',
                    fontFamily: 'DM Sans, sans-serif', fontSize: '13px',
                  }}
                >
                  ➕ Ajouter
                </button>
              </div>

              {formations.map(f => (
                <div key={f.id} style={{
                  border: '1px solid #E2E8F0', borderRadius: '12px',
                  padding: '20px', marginBottom: '16px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
                    <button
                      onClick={() => setFormations(fs => fs.filter(x => x.id !== f.id))}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', fontSize: '13px' }}
                    >
                      🗑 Supprimer
                    </button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                    {[
                      { label: 'Diplôme', key: 'diplome', placeholder: 'Ex: Licence Informatique' },
                      { label: 'École',   key: 'ecole',   placeholder: 'Ex: FST Tunis' },
                      { label: 'Année',   key: 'annee',   placeholder: '2022' },
                    ].map(field => (
                      <div key={field.key}>
                        <label style={labelStyle}>{field.label}</label>
                        <input
                          type="text" placeholder={field.placeholder}
                          value={f[field.key]}
                          onChange={e => setFormations(fs => fs.map(x => x.id === f.id ? { ...x, [field.key]: e.target.value } : x))}
                          style={inputStyle}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ---- CV ---- */}
          {activeTab === 'cv' && (
            <div>
              <h3 style={titleStyle}>📄 Mon CV</h3>

              <div style={{
                border: '2px dashed #CBD5E1', borderRadius: '12px',
                padding: '40px', textAlign: 'center', marginBottom: '24px',
                background: '#F8FAFC',
              }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>📤</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1E293B', marginBottom: '8px' }}>
                  Télécharger votre CV
                </div>
                <p style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '16px' }}>
                  PDF, DOC ou DOCX — Max 5 MB
                </p>
                <button style={{
                  padding: '10px 24px', borderRadius: '50px', border: 'none',
                  background: '#1E3A8A', color: '#fff', cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: '500',
                }}>
                  Choisir un fichier
                </button>
              </div>

              {/* CV actuel */}
              <div style={{
                background: '#F8FAFC', borderRadius: '12px', padding: '16px 20px',
                border: '1px solid #E2E8F0', display: 'flex',
                justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '24px' }}>📄</span>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#1E293B' }}>CV_MonNom_2026.pdf</div>
                    <div style={{ fontSize: '12px', color: '#94A3B8' }}>Ajouté le 15/01/2026 • 1.2 MB</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{
                    padding: '6px 14px', borderRadius: '8px', border: '1px solid #E2E8F0',
                    background: '#fff', cursor: 'pointer', fontSize: '13px',
                    fontFamily: 'DM Sans, sans-serif', color: '#475569',
                  }}>
                    👁 Voir
                  </button>
                  <button style={{
                    padding: '6px 14px', borderRadius: '8px', border: 'none',
                    background: '#FEF2F2', color: '#EF4444', cursor: 'pointer',
                    fontSize: '13px', fontFamily: 'DM Sans, sans-serif',
                  }}>
                    🗑
                  </button>
                </div>
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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    nom: '', email: '', password: '',
    confirmPassword: '', role: '',
    entreprise: '', secteur: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.nom.trim()) e.nom = 'Le nom est requis';
    if (!form.email) e.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email invalide';
    if (!form.password) e.password = 'Le mot de passe est requis';
    else if (form.password.length < 6) e.password = 'Minimum 6 caractères';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Les mots de passe ne correspondent pas';
    if (!form.role) e.role = 'Veuillez choisir un rôle';
    if (form.role === 'recruteur' && !form.entreprise) e.entreprise = "Le nom de l'entreprise est requis";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    try {
      await register({
        nom: form.nom,
        email: form.email,
        password: form.password,
        role: form.role,
        entreprise: form.entreprise,
        secteur: form.secteur,
      });
      setSuccess(true);
    } catch (err) {
      setErrors({ api: err.message });
    } finally {
      setLoading(false);
    }
  };

  // ===== PAGE SUCCÈS =====
  if (success) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: '#F8FAFC', padding: '40px 24px',
      }}>
        <div style={{
          background: '#fff', borderRadius: '20px',
          padding: '48px 40px', maxWidth: '460px', width: '100%',
          boxShadow: '0 8px 32px rgba(15,23,42,.08)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>⏳</div>
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontSize: '24px',
            fontWeight: '800', color: '#1E293B', marginBottom: '12px',
          }}>
            Compte créé avec succès !
          </h2>
          <div style={{
            background: '#FEF3C7', border: '1px solid #FCD34D',
            borderRadius: '12px', padding: '16px', marginBottom: '24px',
          }}>
            <p style={{ fontSize: '14px', color: '#92400E', lineHeight: '1.7' }}>
              ⚠️ Votre compte est <strong>en attente de validation</strong> par l'administrateur.
              Vous recevrez une confirmation dès que votre compte sera activé.
            </p>
          </div>
          <button onClick={() => navigate('/login')} style={{
            width: '100%', height: '48px', borderRadius: '50px', border: 'none',
            background: '#1E3A8A', color: '#fff', cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: '600',
          }}>
            Retour au login →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr',
    }}>

      {/* Panel gauche */}
      <div style={{
        background: '#0F172A', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '60px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,.3) 0%, transparent 70%)',
          top: '-150px', left: '-100px', pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontFamily: 'Syne, sans-serif', fontSize: '28px',
            fontWeight: '800', color: '#fff', marginBottom: '48px',
          }}>
            Smart<span style={{ color: '#60A5FA' }}>Recruit</span>
          </div>

          <h1 style={{
            fontFamily: 'Syne, sans-serif', fontSize: '40px',
            fontWeight: '800', color: '#fff', lineHeight: '1.15', marginBottom: '20px',
          }}>
            Rejoignez la{' '}
            <span style={{ color: '#60A5FA' }}>communauté</span>
          </h1>

          <p style={{ fontSize: '16px', color: '#94A3B8', lineHeight: '1.7', maxWidth: '380px' }}>
            Des milliers de recruteurs et candidats font confiance à SmartRecruit pour leur carrière.
          </p>

          <div style={{ marginTop: '48px' }}>
            {[
              { icon: '✅', text: 'Inscription gratuite et rapide' },
              { icon: '🔒', text: 'Données sécurisées et confidentielles' },
              { icon: '🤖', text: 'Matching IA intelligent' },
              { icon: '📊', text: 'Dashboard personnalisé' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                marginBottom: '16px',
              }}>
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                <span style={{ fontSize: '14px', color: '#94A3B8' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panel droit */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#F8FAFC', padding: '40px 24px', overflowY: 'auto',
      }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>

          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontSize: '24px',
            fontWeight: '800', color: '#1E293B', marginBottom: '6px',
          }}>
            Créer un compte 🚀
          </h2>
          <p style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '28px' }}>
            Rejoignez SmartRecruit dès aujourd'hui
          </p>

          {errors.api && (
            <div style={{
              background: '#FEF2F2', border: '1px solid #FECACA',
              borderRadius: '10px', padding: '12px 16px',
              color: '#EF4444', fontSize: '13px', marginBottom: '20px',
            }}>
              ⚠️ {errors.api}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Nom */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Nom complet *</label>
              <input
                placeholder="Ahmed Trabelsi"
                value={form.nom} onChange={set('nom')}
                style={inputStyle}
              />
              {errors.nom && <p style={errorStyle}>⚠ {errors.nom}</p>}
            </div>

            {/* Email */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Adresse email *</label>
              <input
                type="email" placeholder="vous@exemple.com"
                value={form.email} onChange={set('email')}
                style={inputStyle}
              />
              {errors.email && <p style={errorStyle}>⚠ {errors.email}</p>}
            </div>

            {/* Role */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Je suis un(e)... *</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {[
                  { value: 'candidat',  label: 'Candidat',     icon: '👤' },
                  { value: 'recruteur', label: 'Recruteur RH',  icon: '🏢' },
                ].map(r => (
                  <div key={r.value}
                    onClick={() => setForm(f => ({ ...f, role: r.value }))}
                    style={{
                      border: form.role === r.value ? '1.5px solid #2563EB' : '1.5px solid #E2E8F0',
                      borderRadius: '10px', padding: '14px 12px',
                      cursor: 'pointer', textAlign: 'center',
                      background: form.role === r.value ? '#DBEAFE' : '#F8FAFC',
                      transition: '220ms',
                    }}
                  >
                    <div style={{ fontSize: '22px', marginBottom: '6px' }}>{r.icon}</div>
                    <div style={{ fontSize: '13px', fontWeight: '500', color: '#475569' }}>{r.label}</div>
                  </div>
                ))}
              </div>
              {errors.role && <p style={errorStyle}>⚠ {errors.role}</p>}
            </div>

            {/* Entreprise si recruteur */}
            {form.role === 'recruteur' && (
              <>
                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Nom de l'entreprise *</label>
                  <input
                    placeholder="Tech Corp"
                    value={form.entreprise} onChange={set('entreprise')}
                    style={inputStyle}
                  />
                  {errors.entreprise && <p style={errorStyle}>⚠ {errors.entreprise}</p>}
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Secteur d'activité</label>
                  <input
                    placeholder="Technologie, Finance, RH..."
                    value={form.secteur} onChange={set('secteur')}
                    style={inputStyle}
                  />
                </div>
              </>
            )}

            {/* Password */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Mot de passe *</label>
              <input
                type="password" placeholder="Min. 6 caractères"
                value={form.password} onChange={set('password')}
                style={inputStyle}
              />
              {errors.password && <p style={errorStyle}>⚠ {errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>Confirmer le mot de passe *</label>
              <input
                type="password" placeholder="••••••••"
                value={form.confirmPassword} onChange={set('confirmPassword')}
                style={inputStyle}
              />
              {errors.confirmPassword && <p style={errorStyle}>⚠ {errors.confirmPassword}</p>}
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', height: '48px', borderRadius: '50px', border: 'none',
              background: loading ? '#94A3B8' : '#1E3A8A',
              color: '#fff', cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: '600',
              boxShadow: '0 4px 16px rgba(30,58,138,.25)',
            }}>
              {loading ? 'Création...' : 'Créer mon compte →'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#475569' }}>
            Déjà un compte ?{' '}
            <button onClick={() => navigate('/login')} style={{
              background: 'none', border: 'none', color: '#2563EB',
              cursor: 'pointer', fontWeight: '500', fontFamily: 'DM Sans, sans-serif',
            }}>
              Se connecter
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  fontSize: '13px', fontWeight: '500', color: '#475569',
  display: 'block', marginBottom: '6px',
};

const inputStyle = {
  width: '100%', height: '44px', padding: '0 14px',
  border: '1.5px solid #E2E8F0', borderRadius: '10px',
  fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
  outline: 'none', boxSizing: 'border-box', background: '#F8FAFC',
};

const errorStyle = {
  fontSize: '12px', color: '#EF4444', marginTop: '4px',
};
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);

    try {
      const user = await login(form.email, form.password);

      if (user.role === 'recruteur') {
        navigate('/recruteur/dashboard');
      } else if (user.role === 'candidat') {
        navigate('/candidat/offres');
      } else {
        setError('Accès refusé. Utilisez le portail admin.');
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

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
        <div style={{
          position: 'absolute', width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(96,165,250,.15) 0%, transparent 70%)',
          bottom: '-80px', right: '-50px', pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontFamily: 'Syne, sans-serif', fontSize: '28px',
            fontWeight: '800', color: '#fff', marginBottom: '56px',
          }}>
            Smart<span style={{ color: '#60A5FA' }}>Recruit</span>
          </div>

          <h1 style={{
            fontFamily: 'Syne, sans-serif', fontSize: '42px',
            fontWeight: '800', color: '#fff', lineHeight: '1.15', marginBottom: '20px',
          }}>
            Recrutez les{' '}
            <span style={{ color: '#60A5FA' }}>meilleurs</span>{' '}
            talents
          </h1>

          <p style={{ fontSize: '16px', color: '#94A3B8', lineHeight: '1.7', maxWidth: '380px' }}>
            Gérez vos candidatures et trouvez les meilleures opportunités grâce à SmartRecruit.
          </p>

          <div style={{ display: 'flex', gap: '32px', marginTop: '56px' }}>
            {[
              { value: '12k+', label: 'Candidats actifs' },
              { value: '340+', label: 'Entreprises' },
              { value: '98%',  label: 'Satisfaction' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '26px', fontWeight: '800', color: '#60A5FA' }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '13px', color: '#94A3B8', marginTop: '2px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panel droit */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#F8FAFC', padding: '40px 24px',
      }}>
        <div style={{ width: '100%', maxWidth: '380px' }}>

          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontSize: '24px',
            fontWeight: '800', color: '#1E293B', marginBottom: '6px',
          }}>
            Bon retour 👋
          </h2>
          <p style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '32px' }}>
            Connectez-vous à votre espace SmartRecruit
          </p>

          {error && (
            <div style={{
              background: '#FEF2F2', border: '1px solid #FECACA',
              borderRadius: '10px', padding: '12px 16px',
              color: '#EF4444', fontSize: '13px', marginBottom: '20px',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Adresse email</label>
              <input
                type="email" placeholder="vous@exemple.com"
                value={form.email} onChange={set('email')}
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '8px' }}>
              <label style={labelStyle}>Mot de passe</label>
              <input
                type="password" placeholder="••••••••"
                value={form.password} onChange={set('password')}
                style={inputStyle}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
              <button type="button" onClick={() => navigate('/forgot-password')} style={{
                background: 'none', border: 'none', color: '#2563EB',
                fontSize: '13px', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
              }}>
                Mot de passe oublié ?
              </button>
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', height: '48px', borderRadius: '50px', border: 'none',
              background: loading ? '#94A3B8' : '#1E3A8A',
              color: '#fff', cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: '600',
              boxShadow: '0 4px 16px rgba(30,58,138,.25)',
            }}>
              {loading ? 'Connexion...' : 'Se connecter →'}
            </button>
          </form>

          {/* Comptes test */}
          <div style={{
            marginTop: '20px', background: '#fff', borderRadius: '10px',
            padding: '12px 16px', border: '1px solid #E2E8F0',
          }}>
            <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '.05em' }}>
              Comptes de test
            </div>
            {[
              { role: 'Recruteur', email: 'recruteur@test.com', color: '#059669' },
              { role: 'Candidat',  email: 'candidat@test.com',  color: '#7C3AED' },
            ].map((c, i) => (
              <div key={i}
                onClick={() => setForm({ email: c.email, password: '12345678' })}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '6px 0', borderBottom: i < 1 ? '1px solid #F1F5F9' : 'none',
                  cursor: 'pointer',
                }}
              >
                <span style={{
                  fontSize: '12px', fontWeight: '600', color: c.color,
                  background: c.color + '15', padding: '2px 8px', borderRadius: '4px',
                }}>
                  {c.role}
                </span>
                <span style={{ fontSize: '12px', color: '#94A3B8' }}>{c.email}</span>
              </div>
            ))}
          </div>

          {/* Lien admin */}
          <div style={{
            marginTop: '16px', padding: '12px 16px', borderRadius: '10px',
            background: '#F1F5F9', textAlign: 'center',
          }}>
            <span style={{ fontSize: '13px', color: '#94A3B8' }}>Vous êtes administrateur ? </span>
            <button onClick={() => navigate('/login-admin')} style={{
              background: 'none', border: 'none', color: '#1E3A8A',
              fontSize: '13px', fontWeight: '600', cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
            }}>
              Portail Admin →
            </button>
          </div>

          <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#475569' }}>
            Pas encore de compte ?{' '}
            <button onClick={() => navigate('/register')} style={{
              background: 'none', border: 'none', color: '#2563EB',
              cursor: 'pointer', fontWeight: '500', fontFamily: 'DM Sans, sans-serif',
            }}>
              S'inscrire
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
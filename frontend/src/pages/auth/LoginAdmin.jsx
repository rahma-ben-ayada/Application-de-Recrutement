import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginAdmin() {
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

    if (user.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      setError('Accès refusé. Ce portail est réservé aux administrateurs.');
    }

  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)',
    }}>

      {/* Panel gauche */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '60px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,.25) 0%, transparent 70%)',
          top: '-150px', left: '-100px', pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontFamily: 'Syne, sans-serif', fontSize: '28px',
            fontWeight: '800', color: '#fff', marginBottom: '48px',
          }}>
            Smart<span style={{ color: '#60A5FA' }}>Recruit</span>
          </div>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(239,68,68,.15)', border: '1px solid rgba(239,68,68,.3)',
            borderRadius: '50px', padding: '6px 16px', marginBottom: '24px',
          }}>
            <span>🛡️</span>
            <span style={{ fontSize: '13px', color: '#FCA5A5', fontWeight: '500' }}>
              Portail Administrateur
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Syne, sans-serif', fontSize: '40px',
            fontWeight: '800', color: '#fff', lineHeight: '1.15', marginBottom: '16px',
          }}>
            Espace<br />
            <span style={{ color: '#60A5FA' }}>Administration</span>
          </h1>

          <p style={{ fontSize: '15px', color: '#94A3B8', lineHeight: '1.7', maxWidth: '360px' }}>
            Accès restreint aux administrateurs autorisés. Gérez les recruteurs, candidats et paramètres de la plateforme.
          </p>

          <div style={{ display: 'flex', gap: '24px', marginTop: '48px' }}>
            {[
              { value: '340+', label: 'Recruteurs' },
              { value: '12k+', label: 'Candidats' },
              { value: '98%',  label: 'Disponibilité' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '24px', fontWeight: '800', color: '#60A5FA' }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panel droit — Formulaire */}
      <div style={{
        width: '480px', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: '#F8FAFC', padding: '40px 32px',
      }}>
        <div style={{ width: '100%', maxWidth: '380px' }}>

          {/* Badge admin */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px',
          }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: '#1E3A8A', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '22px',
            }}>
              🛡️
            </div>
            <div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '18px', fontWeight: '800', color: '#1E293B' }}>
                Connexion Admin
              </div>
              <div style={{ fontSize: '13px', color: '#94A3B8' }}>Portail d'administration</div>
            </div>
          </div>

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
              <label style={labelStyle}>Email administrateur</label>
              <input
                type="email"
                placeholder="admin@smartrecruit.tn"
                value={form.email}
                onChange={set('email')}
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>Mot de passe</label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={set('password')}
                style={inputStyle}
              />
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', height: '48px', borderRadius: '50px', border: 'none',
              background: loading ? '#94A3B8' : '#1E3A8A',
              color: '#fff', cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: '600',
              boxShadow: '0 4px 16px rgba(30,58,138,.3)',
            }}>
              {loading ? 'Vérification...' : '🛡️ Accéder au panneau admin'}
            </button>
          </form>

          {/* Compte test */}
          <div style={{
            marginTop: '24px', background: '#fff', borderRadius: '10px',
            padding: '12px 16px', border: '1px solid #E2E8F0',
          }}>
            <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '.05em' }}>
              Compte de test
            </div>
            <div
              onClick={() => setForm({ email: 'admin@test.com', password: '12345678' })}
              style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <span style={{
                fontSize: '12px', fontWeight: '600', color: '#1E3A8A',
                background: '#DBEAFE', padding: '2px 8px', borderRadius: '4px',
              }}>
                Admin
              </span>
              <span style={{ fontSize: '12px', color: '#94A3B8' }}>admin@test.com</span>
            </div>
          </div>

          {/* Lien retour */}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              onClick={() => navigate('/login')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#94A3B8', fontSize: '13px', fontFamily: 'DM Sans, sans-serif',
              }}
            >
              ← Retour au login utilisateurs
            </button>
          </div>
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
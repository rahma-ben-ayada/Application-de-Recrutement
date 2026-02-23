import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email) e.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Email invalide";
    if (!form.password) e.password = "Le mot de passe est requis";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    setErrors(e2);
    if (Object.keys(e2).length) return;
    setLoading(true);
    setAlert(null);

    setTimeout(() => {
      setLoading(false);
      if (form.email.includes('admin')) {
        login({ name: 'Administrateur', email: form.email, role: 'admin' });
        navigate('/admin/dashboard');
      } else if (form.email.includes('recruteur')) {
        login({ name: 'Recruteur RH', email: form.email, role: 'recruteur' });
        navigate('/recruteur/dashboard');
      } else if (form.email.includes('candidat')) {
        login({ name: 'Candidat', email: form.email, role: 'candidat' });
        navigate('/candidat/offres');
      } else {
        setAlert({ type: 'error', msg: 'Email non reconnu. Utilisez admin@..., recruteur@... ou candidat@...' });
      }
    }, 1200);
  };

  const set = (k) => (ev) => setForm(f => ({ ...f, [k]: ev.target.value }));

  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
    }}>

      {/* ===== Panel gauche ===== */}
      <div style={{
        background: '#0F172A',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Cercle décoratif */}
        <div style={{
          position: 'absolute',
          width: '500px', height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,.3) 0%, transparent 70%)',
          top: '-150px', left: '-100px',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          width: '300px', height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(96,165,250,.15) 0%, transparent 70%)',
          bottom: '-80px', right: '-50px',
          pointerEvents: 'none',
        }} />

        {/* Logo */}
        <div style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: '28px',
          fontWeight: '800',
          color: '#fff',
          marginBottom: '56px',
          position: 'relative', zIndex: 1,
        }}>
          Smart<span style={{ color: '#60A5FA' }}>Recruit</span>
        </div>

        {/* Titre */}
        <h1 style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: '42px',
          fontWeight: '800',
          color: '#fff',
          lineHeight: '1.15',
          marginBottom: '20px',
          position: 'relative', zIndex: 1,
        }}>
          Recrutez les{' '}
          <span style={{ color: '#60A5FA' }}>meilleurs</span>{' '}
          talents
        </h1>

        <p style={{
          fontSize: '16px',
          color: '#94A3B8',
          lineHeight: '1.7',
          maxWidth: '380px',
          position: 'relative', zIndex: 1,
        }}>
          Gérez vos candidatures et prenez de meilleures décisions grâce à SmartRecruit.
        </p>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: '32px', marginTop: '56px',
          position: 'relative', zIndex: 1,
        }}>
          {[
            { value: '12k+', label: 'Candidats actifs' },
            { value: '340+', label: 'Entreprises' },
            { value: '98%',  label: 'Satisfaction' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: '26px', fontWeight: '800', color: '#60A5FA',
              }}>
                {s.value}
              </div>
              <div style={{ fontSize: '13px', color: '#94A3B8', marginTop: '2px' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Panel droit ===== */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F8FAFC',
        padding: '40px 24px',
      }}>
        <Card>
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: '24px',
            fontWeight: '800',
            color: '#1E293B',
            marginBottom: '6px',
          }}>
            Bon retour 👋
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#94A3B8',
            marginBottom: '32px',
          }}>
            Connectez-vous à votre espace SmartRecruit
          </p>

          {alert && <Alert type={alert.type}>{alert.msg}</Alert>}

          <form onSubmit={handleSubmit}>
            <Input
              label="Adresse email"
              type="email"
              placeholder="vous@exemple.com"
              icon="✉"
              value={form.email}
              onChange={set('email')}
              error={errors.email}
            />
            <Input
              label="Mot de passe"
              type="password"
              placeholder="••••••••"
              icon="🔒"
              value={form.password}
              onChange={set('password')}
              error={errors.password}
            />

            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: '24px',
            }}>
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                style={{
                  background: 'none', border: 'none',
                  color: '#2563EB', fontSize: '13.5px',
                  cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                  fontWeight: '500',
                }}
              >
                Mot de passe oublié ?
              </button>
            </div>

            <Button type="submit" fullWidth disabled={loading}>
              {loading ? 'Connexion…' : 'Se connecter →'}
            </Button>
          </form>

          {/* Comptes de test */}
          <div style={{
            marginTop: '20px',
            background: '#F8FAFC',
            borderRadius: '10px',
            padding: '12px 16px',
            border: '1px solid #E2E8F0',
          }}>
            <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '.05em' }}>
              Comptes de test
            </div>
            {[
              { role: 'Admin',     email: 'admin@test.com',     color: '#1E3A8A' },
              { role: 'Recruteur', email: 'recruteur@test.com', color: '#059669' },
              { role: 'Candidat',  email: 'candidat@test.com',  color: '#7C3AED' },
            ].map((c, i) => (
              <div
                key={i}
                onClick={() => setForm({ email: c.email, password: '12345678' })}
                style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', padding: '6px 0',
                  borderBottom: i < 2 ? '1px solid #F1F5F9' : 'none',
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

          <p style={{
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '14px',
            color: '#475569',
          }}>
            Pas encore de compte ?{' '}
            <button
              onClick={() => navigate('/register')}
              style={{
                background: 'none', border: 'none',
                color: '#2563EB', cursor: 'pointer',
                fontWeight: '500', fontFamily: 'DM Sans, sans-serif',
              }}
            >
              S'inscrire
            </button>
          </p>
        </Card>
      </div>
    </div>
  );
}
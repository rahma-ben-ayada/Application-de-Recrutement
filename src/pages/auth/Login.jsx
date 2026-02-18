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
    setTimeout(() => {
      setLoading(false);
      // Simulation rôles — à remplacer par API
      if (form.email.includes('admin')) {
        login({ name: 'Admin', email: form.email, role: 'admin' });
        navigate('/admin/dashboard');
      } else if (form.email.includes('recruteur')) {
        login({ name: 'Recruteur', email: form.email, role: 'recruteur' });
        navigate('/recruteur/dashboard');
      } else {
        login({ name: 'Candidat', email: form.email, role: 'candidat' });
        navigate('/candidat/dashboard');
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
      {/* Panel gauche */}
      <div style={{
        background: '#0F172A',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px',
      }}>
        <div style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: '28px',
          fontWeight: '800',
          color: '#fff',
          marginBottom: '48px',
        }}>
          Smart<span style={{ color: '#60A5FA' }}>Recruit</span>
        </div>
        <h1 style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: '42px',
          fontWeight: '800',
          color: '#fff',
          lineHeight: '1.15',
          marginBottom: '20px',
        }}>
          Recrutez les <span style={{ color: '#60A5FA' }}>meilleurs</span> talents
        </h1>
        <p style={{ fontSize: '16px', color: '#94A3B8', lineHeight: '1.7' }}>
          Gérez vos candidatures et prenez de meilleures décisions grâce à SmartRecruit.
        </p>
      </div>

      {/* Panel droit */}
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
          <p style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '32px' }}>
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
                  background: 'none',
                  border: 'none',
                  color: '#2563EB',
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif',
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

          <p style={{
            textAlign: 'center',
            marginTop: '24px',
            fontSize: '14px',
            color: '#475569',
          }}>
            Pas encore de compte ?{' '}
            <button
              onClick={() => navigate('/register')}
              style={{
                background: 'none',
                border: 'none',
                color: '#2563EB',
                cursor: 'pointer',
                fontWeight: '500',
                fontFamily: 'DM Sans, sans-serif',
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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: '' });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Le nom est requis';
    if (!form.email) e.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email invalide';
    if (!form.password) e.password = 'Le mot de passe est requis';
    else if (form.password.length < 8) e.password = 'Minimum 8 caractères';
    if (!form.role) e.role = 'Veuillez choisir un rôle';
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAlert({ type: 'success', msg: 'Compte créé ! Vous pouvez maintenant vous connecter.' });
    }, 1200);
  };

  const set = (k) => (ev) => setForm(f => ({ ...f, [k]: ev.target.value }));

  const roles = [
    { value: 'candidat',   label: 'Candidat',    icon: '👤' },
    { value: 'recruteur',  label: 'Recruteur RH', icon: '🏢' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
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
          Créer un compte
        </h2>
        <p style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '32px' }}>
          Rejoignez SmartRecruit dès aujourd'hui
        </p>

        {alert && <Alert type={alert.type}>{alert.msg}</Alert>}

        <form onSubmit={handleSubmit}>
          <Input
            label="Nom complet"
            placeholder="Jean Dupont"
            icon="👤"
            value={form.name}
            onChange={set('name')}
            error={errors.name}
          />
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
            placeholder="Min. 8 caractères"
            icon="🔒"
            value={form.password}
            onChange={set('password')}
            error={errors.password}
          />

          <div style={{ marginBottom: '18px' }}>
            <label style={{ fontSize: '13px', fontWeight: '500', color: '#475569', display: 'block', marginBottom: '8px' }}>
              Je suis un(e)…
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {roles.map(r => (
                <div
                  key={r.value}
                  onClick={() => setForm(f => ({ ...f, role: r.value }))}
                  style={{
                    border: form.role === r.value ? '1.5px solid #2563EB' : '1.5px solid #E2E8F0',
                    borderRadius: '10px',
                    padding: '14px 12px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    background: form.role === r.value ? '#DBEAFE' : '#F8FAFC',
                    boxShadow: form.role === r.value ? '0 0 0 3px rgba(37,99,235,.12)' : 'none',
                    transition: '220ms',
                  }}
                >
                  <div style={{ fontSize: '22px', marginBottom: '6px' }}>{r.icon}</div>
                  <div style={{ fontSize: '13px', fontWeight: '500', color: '#475569' }}>{r.label}</div>
                </div>
              ))}
            </div>
            {errors.role && <p style={{ fontSize: '12px', color: '#EF4444', marginTop: '5px' }}>⚠ {errors.role}</p>}
          </div>

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? 'Création…' : 'Créer mon compte →'}
          </Button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#475569' }}>
          Déjà un compte ?{' '}
          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'none', border: 'none',
              color: '#2563EB', cursor: 'pointer',
              fontWeight: '500', fontFamily: 'DM Sans, sans-serif',
            }}
          >
            Se connecter
          </button>
        </p>
      </Card>
    </div>
  );
}
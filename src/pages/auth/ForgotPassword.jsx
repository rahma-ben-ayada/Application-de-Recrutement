import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!email) return setError("L'email est requis");
    if (!/\S+@\S+\.\S+/.test(email)) return setError('Email invalide');
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAlert({ type: 'success', msg: 'Lien de réinitialisation envoyé à ' + email });
    }, 1200);
  };

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
        <button
          onClick={() => navigate('/login')}
          style={{
            background: 'none', border: 'none',
            color: '#2563EB', cursor: 'pointer',
            fontSize: '13px', fontFamily: 'DM Sans, sans-serif',
            marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '4px',
          }}
        >
          ← Retour à la connexion
        </button>

        <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔑</div>
        <h2 style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: '24px', fontWeight: '800',
          color: '#1E293B', marginBottom: '6px',
        }}>
          Mot de passe oublié
        </h2>
        <p style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '32px' }}>
          Saisissez votre email et nous vous enverrons un lien de réinitialisation.
        </p>

        {alert && <Alert type={alert.type}>{alert.msg}</Alert>}

        {!alert && (
          <form onSubmit={handleSubmit}>
            <Input
              label="Adresse email"
              type="email"
              placeholder="vous@exemple.com"
              icon="✉"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
            />
            <Button type="submit" fullWidth disabled={loading}>
              {loading ? 'Envoi…' : 'Envoyer le lien →'}
            </Button>
          </form>
        )}

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#475569' }}>
          Vous vous en souvenez ?{' '}
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
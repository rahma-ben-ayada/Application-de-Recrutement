import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { luxuryTheme, keyframes } from '../../theme/luxuryTheme';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

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
        setError('Accès refusé. Veuillez utiliser le portail administrateur.');
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '"Inter", sans-serif',
    },
    leftPanel: {
      background: 'linear-gradient(135deg, #0A1628 0%, #1E3A5F 50%, #2E5082 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '80px 60px',
      position: 'relative',
      zIndex: 1,
    },
    rightPanel: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#FAFBFC',
      padding: '40px 24px',
      position: 'relative',
      zIndex: 1,
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '48px',
    },
    logoIcon: {
      width: '56px',
      height: '56px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8941F 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      boxShadow: '0 8px 32px rgba(212, 175, 55, 0.4)',
    },
    title: {
      fontFamily: '"Playfair Display", serif',
      fontSize: '52px',
      fontWeight: '700',
      color: '#fff',
      lineHeight: '1.1',
      marginBottom: '20px',
    },
    subtitle: {
      fontSize: '16px',
      color: 'rgba(255, 255, 255, 0.8)',
      lineHeight: '1.7',
      maxWidth: '420px',
      marginBottom: '48px',
    },
    featureCard: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '16px 20px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      marginBottom: '16px',
    },
    formContainer: {
      width: '100%',
      maxWidth: '420px',
    },
    formTitle: {
      fontFamily: '"Playfair Display", serif',
      fontSize: '32px',
      fontWeight: '700',
      color: '#0A1628',
      marginBottom: '8px',
    },
    formSubtitle: {
      fontSize: '15px',
      color: '#64748B',
      marginBottom: '32px',
    },
    inputGroup: {
      marginBottom: '20px',
    },
    label: {
      fontSize: '13px',
      fontWeight: '600',
      color: '#475569',
      display: 'block',
      marginBottom: '8px',
    },
    inputWrapper: {
      position: 'relative',
    },
    input: {
      width: '100%',
      height: '52px',
      padding: '0 16px',
      paddingLeft: '48px',
      border: focusedInput !== null && focusedInput !== 'password' && focusedInput !== 'email'
        ? '2px solid #D4AF37'
        : '2px solid #E2E8F0',
      borderRadius: '12px',
      fontSize: '14px',
      outline: 'none',
      background: '#fff',
      transition: 'all 0.3s ease',
      boxShadow: focusedInput === 'email' || focusedInput === 'password'
        ? '0 8px 24px rgba(212, 175, 55, 0.15)'
        : 'none',
    },
    inputIcon: {
      position: 'absolute',
      left: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '20px',
    },
    togglePassword: {
      position: 'absolute',
      right: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '18px',
    },
    button: {
      width: '100%',
      height: '52px',
      borderRadius: '12px',
      border: 'none',
      background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
      color: '#0A1628',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
      boxShadow: '0 8px 24px rgba(212, 175, 55, 0.4)',
      transition: 'all 0.3s ease',
    },
    testAccount: {
      marginTop: '28px',
      background: '#fff',
      borderRadius: '16px',
      padding: '20px',
      border: '1px solid #E2E8F0',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
    },
    adminPortal: {
      marginTop: '24px',
      padding: '20px',
      borderRadius: '16px',
      background: 'linear-gradient(135deg, rgba(10,22,40,0.05) 0%, rgba(30,58,138,0.05) 100%)',
      border: '1px solid rgba(10, 22, 40, 0.1)',
      textAlign: 'center',
    },
    error: {
      background: '#FEF2F2',
      border: '1px solid #FECACA',
      borderRadius: '12px',
      padding: '14px 18px',
      color: '#DC2626',
      fontSize: '13px',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontWeight: '500',
    },
  };

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>

      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)',
        top: '-200px',
        left: '-150px',
        pointerEvents: 'none',
        zIndex: 0,
        animation: 'float 20s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,102,255,0.1) 0%, transparent 70%)',
        bottom: '-100px',
        right: '20%',
        pointerEvents: 'none',
        zIndex: 0,
        animation: 'float 15s ease-in-out infinite reverse',
      }} />

      {/* Left Panel */}
      <div style={styles.leftPanel}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>💼</div>
          <div>
            <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '26px', fontWeight: '700', color: '#fff' }}>
              SmartRecruit
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontWeight: '500' }}>
              PLATEFORME DE RECRUTEMENT PREMIUM
            </div>
          </div>
        </div>

        <h1 style={styles.title}>
          Connectez les <span style={{ color: '#D4AF37' }}>Meilleurs</span> Talents
        </h1>

        <p style={styles.subtitle}>
          Gérez vos candidatures, planifiez des entretiens et trouvez les meilleures opportunités grâce à notre plateforme intelligente de recrutement.
        </p>

        <div style={{ marginBottom: '48px' }}>
          {[
            { icon: '🎯', label: 'Matching intelligent IA' },
            { icon: '📊', label: 'Dashboard analytique temps réel' },
            { icon: '🗓️', label: 'Planification entretiens vidéo' },
            { icon: '🔔', label: 'Notifications intelligentes' },
          ].map((feature, i) => (
            <div key={i} style={styles.featureCard}>
              <span style={{ fontSize: '24px' }}>{feature.icon}</span>
              <span style={{ fontSize: '14px', color: '#fff', fontWeight: '500' }}>
                {feature.label}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '40px' }}>
          {[
            { value: '12K+', label: 'Candidats' },
            { value: '340+', label: 'Entreprises' },
            { value: '98%', label: 'Satisfaction' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '32px', fontWeight: '700', color: '#D4AF37' }}>
                {s.value}
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div style={styles.rightPanel}>
        <div style={styles.formContainer}>

          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={styles.formTitle}>
              Bienvenue 👋
            </h2>
            <p style={styles.formSubtitle}>
              Connectez-vous à votre espace SmartRecruit
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={styles.error}>
              <span style={{ fontSize: '16px' }}>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span>Adresse email</span>
                <span style={{ color: '#D4AF37' }}> *</span>
              </label>
              <div style={styles.inputWrapper}>
                <input
                  type="email"
                  placeholder="vous@exemple.com"
                  value={form.email}
                  onChange={set('email')}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  style={styles.input}
                />
                <span style={styles.inputIcon}>✉️</span>
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span>Mot de passe</span>
                <span style={{ color: '#D4AF37' }}> *</span>
              </label>
              <div style={styles.inputWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={set('password')}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  style={{ ...styles.input, paddingRight: '48px' }}
                />
                <span style={styles.inputIcon}>🔑</span>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.togglePassword}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0066FF',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                Mot de passe oublié ?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(212, 175, 55, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(212, 175, 55, 0.4)';
                }
              }}
            >
              {loading ? 'Connexion...' : 'Se connecter →'}
            </button>
          </form>

          {/* Test Accounts */}
          <div style={styles.testAccount}>
            <div style={{
              fontSize: '10px',
              color: '#94A3B8',
              fontWeight: '700',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              Comptes de test
            </div>
            {[
              { role: 'Recruteur', email: 'recruteur@test.com', color: '#059669', bg: '#D1FAE5' },
              { role: 'Candidat',  email: 'candidat@test.com',  color: '#7C3AED', bg: '#EDE9FE' },
            ].map((c, i) => (
              <div
                key={i}
                onClick={() => setForm({ email: c.email, password: '12345678' })}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  marginBottom: i < 1 ? '12px' : '0',
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = c.bg + '40';
                  e.currentTarget.style.borderColor = c.color;
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#F8FAFC';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <span style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: c.color,
                  background: c.bg,
                  padding: '6px 16px',
                  borderRadius: '20px',
                }}>
                  {c.role}
                </span>
                <span style={{ fontSize: '12px', color: '#64748B', fontFamily: 'monospace' }}>
                  {c.email}
                </span>
              </div>
            ))}
          </div>

          {/* Admin Portal Link */}
          <div style={styles.adminPortal}>
            <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '12px' }}>
              Vous êtes administrateur ?
            </div>
            <button
              onClick={() => navigate('/admin-portal')}
              style={{
                background: 'linear-gradient(135deg, #0A1628 0%, #1E3A5F 100%)',
                border: 'none',
                color: '#fff',
                borderRadius: '12px',
                padding: '12px 24px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: '"Inter", sans-serif',
                boxShadow: '0 8px 24px rgba(10, 22, 40, 0.2)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(10, 22, 40, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(10, 22, 40, 0.2)';
              }}
            >
              🛡️ Portail Admin →
            </button>
          </div>

          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#475569' }}>
            Pas encore de compte ?{' '}
            <button
              onClick={() => navigate('/register')}
              style={{
                background: 'none',
                border: 'none',
                color: '#0066FF',
                cursor: 'pointer',
                fontWeight: '600',
                fontFamily: '"Inter", sans-serif',
              }}
            >
              S'inscrire
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

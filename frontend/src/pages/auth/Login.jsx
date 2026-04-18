import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { professionalTheme, professionalKeyframes, createInputStyle, createButtonStyle } from '../../theme/professionalTheme';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

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
    page: {
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      background: '#FFFFFF',
      fontFamily: professionalTheme.fonts.sans,
      '@media (max-width: 1024px)': {
        gridTemplateColumns: '1fr',
      },
    },
    leftPanel: {
      background: professionalTheme.gradients.primary,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '3rem',
      overflow: 'hidden',
      '@media (max-width: 1024px)': {
        display: 'none',
      },
    },
    rightPanel: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: '#FAFAFA',
      '@media (max-width: 640px)': {
        padding: '1.5rem',
      },
    },
    leftContent: {
      position: 'relative',
      zIndex: 1,
      maxWidth: '480px',
      '@media (max-width: 768px)': {
        maxWidth: '100%',
      },
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '2rem',
    },
    logoIcon: {
      width: '48px',
      height: '48px',
      borderRadius: professionalTheme.radius.xl,
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFFFFF',
      fontWeight: 700,
      fontSize: '1.125rem',
    },
    logoText: {
      fontSize: professionalTheme.fontSizes.xl,
      fontWeight: 700,
      color: '#FFFFFF',
      letterSpacing: '-0.02em',
    },
    leftTitle: {
      fontSize: professionalTheme.fontSizes['4xl'],
      fontWeight: 700,
      color: '#FFFFFF',
      marginBottom: '1rem',
      lineHeight: 1.2,
      '@media (max-width: 768px)': {
        fontSize: professionalTheme.fontSizes['3xl'],
      },
    },
    leftSubtitle: {
      fontSize: professionalTheme.fontSizes.base,
      color: 'rgba(255, 255, 255, 0.8)',
      marginBottom: '2rem',
      lineHeight: 1.6,
      '@media (max-width: 768px)': {
        fontSize: professionalTheme.fontSizes.sm,
      },
    },
    featureList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '1rem',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: professionalTheme.radius.xl,
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    featureIcon: {
      width: '40px',
      height: '40px',
      borderRadius: professionalTheme.radius.lg,
      background: 'rgba(255, 255, 255, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.25rem',
    },
    featureText: {
      flex: 1,
    },
    featureTitle: {
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      color: '#FFFFFF',
      marginBottom: '0.25rem',
    },
    featureDescription: {
      fontSize: professionalTheme.fontSizes.xs,
      color: 'rgba(255, 255, 255, 0.7)',
    },
    formContainer: {
      width: '100%',
      maxWidth: '400px',
      '@media (max-width: 640px)': {
        maxWidth: '100%',
      },
    },
    formHeader: {
      marginBottom: '2rem',
      textAlign: 'center',
      '@media (max-width: 640px)': {
        marginBottom: '1.5rem',
      },
    },
    formTitle: {
      fontSize: professionalTheme.fontSizes['3xl'],
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.5rem',
      '@media (max-width: 640px)': {
        fontSize: professionalTheme.fontSizes['2xl'],
      },
    },
    formSubtitle: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
    },
    formGroup: {
      marginBottom: '1.5rem',
    },
    label: {
      display: 'block',
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 500,
      color: professionalTheme.colors.neutral[700],
      marginBottom: '0.5rem',
    },
    inputWrapper: {
      position: 'relative',
    },
    input: (field) => ({
      ...createInputStyle(focusedField === field ? 'focus' : 'default'),
      paddingLeft: '2.75rem',
      paddingRight: field === 'password' ? '3rem' : '0.875rem',
    }),
    inputIcon: {
      position: 'absolute',
      left: '0.875rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: professionalTheme.colors.neutral[400],
      pointerEvents: 'none',
    },
    togglePassword: {
      position: 'absolute',
      right: '0.875rem',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: professionalTheme.colors.neutral[400],
      padding: '0.25rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    forgotPassword: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: '1.5rem',
    },
    forgotPasswordLink: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.primary[600],
      textDecoration: 'none',
      fontWeight: 500,
      cursor: 'pointer',
    },
    submitButton: {
      ...createButtonStyle('primary', 'lg'),
      width: '100%',
      marginBottom: '1.5rem',
    },
    errorAlert: {
      background: professionalTheme.colors.error.light,
      border: `1px solid ${professionalTheme.colors.error.DEFAULT}`,
      borderRadius: professionalTheme.radius.xl,
      padding: '0.75rem 1rem',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      color: professionalTheme.colors.error.dark,
      fontSize: professionalTheme.fontSizes.sm,
    },
    decorativeCircle: (top, right, size, delay) => ({
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
      top,
      right,
      pointerEvents: 'none',
      animation: `float ${delay}s ease-in-out infinite`,
    }),
  };

  return (
    <div style={styles.page}>
      <style>{professionalKeyframes}</style>

      {/* ===== LEFT PANEL ===== */}
      <div style={styles.leftPanel}>
        <div style={styles.decorativeCircle('-10%', '-10%', '300px', 8)} />
        <div style={styles.decorativeCircle('60%', '80%', '200px', 6)} />
        <div style={styles.decorativeCircle('80%', '20%', '150px', 10)} />

        <div style={styles.leftContent}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>SR</div>
            <div style={styles.logoText}>SmartRecruit</div>
          </div>

          <h1 style={styles.leftTitle}>
            Connectez-vous à Votre Espace
          </h1>

          <p style={styles.leftSubtitle}>
            Accédez à votre tableau de bord et gérez vos candidatures ou offres d'emploi en toute simplicité.
          </p>

          <div style={styles.featureList}>
            {[
              {
                icon: '🎯',
                title: 'Matching Intelligent',
                description: 'Algorithmes IA avancés',
              },
              {
                icon: '📊',
                title: 'Analytics Temps Réel',
                description: 'Suivi de vos KPIs',
              },
              {
                icon: '🔒',
                title: 'Sécurité Maximale',
                description: 'Données protégées',
              },
            ].map((feature, index) => (
              <div key={index} style={styles.featureItem}>
                <div style={styles.featureIcon}>{feature.icon}</div>
                <div style={styles.featureText}>
                  <div style={styles.featureTitle}>{feature.title}</div>
                  <div style={styles.featureDescription}>{feature.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== RIGHT PANEL ===== */}
      <div style={styles.rightPanel}>
        <div style={styles.formContainer}>
          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>Bienvenue 👋</h2>
            <p style={styles.formSubtitle}>Connectez-vous pour continuer</p>
          </div>

          {error && (
            <div style={styles.errorAlert}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v4M12 16h.01"/>
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Adresse email</label>
              <div style={styles.inputWrapper}>
                <input
                  type="email"
                  placeholder="vous@exemple.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  style={styles.input('email')}
                />
                <span style={styles.inputIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <path d="M22 6l-10 7L2 6"/>
                  </svg>
                </span>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Mot de passe</label>
              <div style={styles.inputWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  style={styles.input('password')}
                />
                <span style={styles.inputIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.togglePassword}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div style={styles.forgotPassword}>
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                style={styles.forgotPasswordLink}
              >
                Mot de passe oublié ?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.submitButton,
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                    <circle cx="12" cy="12" r="10" opacity="0.25"/>
                    <path d="M12 2a10 10 0 0 1 10 10" opacity="0.75"/>
                  </svg>
                  Connexion...
                </>
              ) : (
                <>
                  Se connecter
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </>
              )}
            </button>

            {/* Divider */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              margin: '1.5rem 0',
              gap: '1rem',
            }}>
              <div style={{
                flex: 1,
                height: '1px',
                background: professionalTheme.colors.neutral[200],
              }} />
              <span style={{
                fontSize: professionalTheme.fontSizes.sm,
                color: professionalTheme.colors.neutral[500],
                padding: '0 0.5rem',
              }}>
                ou
              </span>
              <div style={{
                flex: 1,
                height: '1px',
                background: professionalTheme.colors.neutral[200],
              }} />
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={() => {
                const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
                window.location.href = `${apiUrl}/api/auth/google`;
              }}
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                background: '#FFFFFF',
                border: `1px solid ${professionalTheme.colors.neutral[300]}`,
                borderRadius: professionalTheme.radius.xl,
                color: professionalTheme.colors.neutral[700],
                fontSize: professionalTheme.fontSizes.base,
                fontWeight: 500,
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                transition: 'all 0.2s ease',
                opacity: loading ? 0.6 : 1,
                ':hover': {
                  background: professionalTheme.colors.neutral[50],
                  borderColor: professionalTheme.colors.neutral[400],
                },
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = professionalTheme.colors.neutral[50];
                  e.currentTarget.style.borderColor = professionalTheme.colors.neutral[400];
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.borderColor = professionalTheme.colors.neutral[300];
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continuer avec Google
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: professionalTheme.fontSizes.sm, color: professionalTheme.colors.neutral[600] }}>
            Pas encore de compte ?{' '}
            <button
              onClick={() => navigate('/register')}
              style={{
                background: 'none',
                border: 'none',
                color: professionalTheme.colors.primary[600],
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 'inherit',
                padding: 0,
              }}
            >
              Créer un compte
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

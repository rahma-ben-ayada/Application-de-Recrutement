import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { professionalTheme, professionalKeyframes, createInputStyle, createButtonStyle } from '../../theme/professionalTheme';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  // This would be replaced with actual auth logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock login logic - replace with actual API
      if (form.email === 'admin@test.com') {
        navigate('/admin-portal');
      } else if (form.email.includes('recruteur')) {
        navigate('/recruteur/dashboard');
      } else {
        navigate('/candidat/offres');
      }
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
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
    },
    leftPanel: {
      background: professionalTheme.gradients.primary,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '3rem',
      overflow: 'hidden',
    },
    rightPanel: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: '#FAFAFA',
    },
    // Left Panel Styles
    leftContent: {
      position: 'relative',
      zIndex: 1,
      maxWidth: '480px',
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
    },
    leftSubtitle: {
      fontSize: professionalTheme.fontSizes.base,
      color: 'rgba(255, 255, 255, 0.8)',
      marginBottom: '2rem',
      lineHeight: 1.6,
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
    // Right Panel Styles
    formContainer: {
      width: '100%',
      maxWidth: '400px',
    },
    formHeader: {
      marginBottom: '2rem',
      textAlign: 'center',
    },
    formTitle: {
      fontSize: professionalTheme.fontSizes['3xl'],
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.5rem',
    },
    formSubtitle: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
    },
    // Form Styles
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
    divider: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      margin: '1.5rem 0',
    },
    dividerLine: {
      flex: 1,
      height: '1px',
      background: professionalTheme.colors.neutral[200],
    },
    dividerText: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[400],
      fontWeight: 500,
    },
    // Test Accounts
    testAccounts: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius.xl,
      padding: '1.25rem',
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      marginBottom: '1.5rem',
    },
    testAccountsTitle: {
      fontSize: professionalTheme.fontSizes.xs,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[500],
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: '1rem',
    },
    testAccount: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem 1rem',
      borderRadius: professionalTheme.radius.lg,
      background: professionalTheme.colors.neutral[50],
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      cursor: 'pointer',
      marginBottom: '0.75rem',
      transition: professionalTheme.transitions.fast,
    },
    testAccountRole: {
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      padding: '0.25rem 0.75rem',
      borderRadius: professionalTheme.radius.full,
    },
    testAccountEmail: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      fontFamily: 'monospace',
    },
    // Error State
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
    // Admin Portal Link
    adminPortal: {
      textAlign: 'center',
      padding: '1rem',
      borderRadius: professionalTheme.radius.xl,
      background: professionalTheme.colors.neutral[100],
    },
    adminPortalText: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      marginBottom: '0.75rem',
    },
    // Decorative Elements
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
        {/* Decorative Elements */}
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

          {/* Error Alert */}
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
            {/* Email Field */}
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

            {/* Password Field */}
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

            {/* Forgot Password */}
            <div style={styles.forgotPassword}>
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                style={styles.forgotPasswordLink}
              >
                Mot de passe oublié ?
              </button>
            </div>

            {/* Submit Button */}
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
          </form>

          <div style={styles.divider}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerText}>ou</span>
            <div style={styles.dividerLine} />
          </div>

          {/* Test Accounts */}
          <div style={styles.testAccounts}>
            <div style={styles.testAccountsTitle}>Comptes de test</div>
            {[
              { role: 'Recruteur', email: 'recruteur@test.com', color: '#10B981', bg: '#D1FAE5' },
              { role: 'Candidat', email: 'candidat@test.com', color: '#8B5CF6', bg: '#EDE9FE' },
            ].map((account, index) => (
              <div
                key={index}
                onClick={() => setForm({ email: account.email, password: '12345678' })}
                style={styles.testAccount}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = account.bg;
                  e.currentTarget.style.borderColor = account.color;
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = professionalTheme.colors.neutral[50];
                  e.currentTarget.style.borderColor = professionalTheme.colors.neutral[200];
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <span
                  style={{
                    ...styles.testAccountRole,
                    color: account.color,
                    background: account.bg,
                  }}
                >
                  {account.role}
                </span>
                <span style={styles.testAccountEmail}>{account.email}</span>
              </div>
            ))}
          </div>

          {/* Admin Portal Link */}
          <div style={styles.adminPortal}>
            <div style={styles.adminPortalText}>
              Vous êtes administrateur ?
            </div>
            <button
              onClick={() => navigate('/admin-portal')}
              style={{
                ...createButtonStyle('primary', 'md'),
                width: '100%',
                fontSize: '0.875rem',
              }}
            >
              Accéder au portail admin
            </button>
          </div>

          {/* Sign Up Link */}
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

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { professionalTheme, professionalKeyframes, createInputStyle, createButtonStyle } from '../../theme/professionalTheme';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { resetPassword } = useAuth();
  const [status, setStatus] = useState('form'); // form, loading, success, error
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Token de réinitialisation manquant. Veuillez utiliser le lien envoyé par email.');
    }
  }, [token]);

  const updateForm = (field) => (e) => {
    setFormData(f => ({ ...f, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(e => ({ ...e, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Minimum 6 caractères';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'La confirmation est requise';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateForm();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus('loading');
    try {
      await resetPassword(token, formData.password);
      setStatus('success');
      setMessage('Mot de passe réinitialisé avec succès ! Vous pouvez maintenant vous connecter.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setStatus('error');
      setMessage(err.message || 'Échec de la réinitialisation. Le token peut être expiré ou invalide.');
    }
  };

  const styles = {
    page: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: professionalTheme.gradients.subtle,
      fontFamily: professionalTheme.fonts.sans,
      padding: '1.5rem',
    },
    container: {
      width: '100%',
      maxWidth: '480px',
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      padding: '2.5rem',
      boxShadow: professionalTheme.shadows.xl,
      textAlign: 'center',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      justifyContent: 'center',
      marginBottom: '2rem',
    },
    logoIcon: {
      width: '48px',
      height: '48px',
      borderRadius: professionalTheme.radius.xl,
      background: professionalTheme.gradients.primary,
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
      color: professionalTheme.colors.neutral[900],
    },
    iconWrapper: (bgColor) => ({
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: bgColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 2rem',
    }),
    title: {
      fontSize: professionalTheme.fontSizes['2xl'],
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.5rem',
    },
    subtitle: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      marginBottom: '2rem',
    },
    formGroup: {
      marginBottom: '1.25rem',
      textAlign: 'left',
    },
    label: {
      display: 'block',
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 500,
      color: professionalTheme.colors.neutral[700],
      marginBottom: '0.5rem',
    },
    input: (hasError) => ({
      ...createInputStyle(),
      ...(hasError ? {
        border: `2px solid ${professionalTheme.colors.error.DEFAULT}`,
        background: professionalTheme.colors.error.light,
      } : {}),
    }),
    errorText: {
      fontSize: professionalTheme.fontSizes.xs,
      color: professionalTheme.colors.error.dark,
      marginTop: '0.375rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
    },
    button: {
      ...createButtonStyle('primary', 'lg'),
      width: '100%',
      marginTop: '1.5rem',
    },
    secondaryButton: {
      ...createButtonStyle('secondary', 'lg'),
      width: '100%',
      marginTop: '1rem',
    },
    message: {
      fontSize: professionalTheme.fontSizes.base,
      color: professionalTheme.colors.neutral[600],
      marginBottom: '2rem',
      lineHeight: 1.6,
    },
    requirements: {
      background: professionalTheme.colors.info.light,
      borderRadius: professionalTheme.radius.lg,
      padding: '1rem',
      marginTop: '1.5rem',
      textAlign: 'left',
    },
    requirementsTitle: {
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      color: professionalTheme.colors.info.dark,
      marginBottom: '0.5rem',
    },
    requirementsList: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.info.dark,
      lineHeight: 1.6,
      paddingLeft: '1.25rem',
    },
  };

  const renderContent = () => {
    switch (status) {
      case 'form':
      case 'loading':
        return (
          <>
            <div style={styles.logo}>
              <div style={styles.logoIcon}>SR</div>
              <div style={styles.logoText}>SmartRecruit</div>
            </div>

            <div style={styles.iconWrapper(professionalTheme.colors.warning.light)}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={professionalTheme.colors.warning.dark} strokeWidth="3">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>

            <h1 style={styles.title}>Réinitialiser le mot de passe</h1>
            <p style={styles.subtitle}>Entrez votre nouveau mot de passe ci-dessous.</p>

            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Nouveau mot de passe <span style={{ color: professionalTheme.colors.error.DEFAULT }}>*</span>
                </label>
                <input
                  type="password"
                  placeholder="Min. 6 caractères"
                  value={formData.password}
                  onChange={updateForm('password')}
                  style={styles.input(!!errors.password)}
                  disabled={status === 'loading'}
                />
                {errors.password && (
                  <div style={styles.errorText}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2"/>
                    </svg>
                    {errors.password}
                  </div>
                )}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Confirmer le mot de passe <span style={{ color: professionalTheme.colors.error.DEFAULT }}>*</span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={updateForm('confirmPassword')}
                  style={styles.input(!!errors.confirmPassword)}
                  disabled={status === 'loading'}
                />
                {errors.confirmPassword && (
                  <div style={styles.errorText}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2"/>
                    </svg>
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  ...styles.button,
                  opacity: status === 'loading' ? 0.6 : 1,
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                }}
              >
                {status === 'loading' ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                      <circle cx="12" cy="12" r="10" opacity="0.25"/>
                      <path d="M12 2a10 10 0 0 1 10 10" opacity="0.75"/>
                    </svg>
                    Réinitialisation...
                  </>
                ) : (
                  <>
                    Réinitialiser le mot de passe
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '0.5rem' }}>
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </>
                )}
              </button>
            </form>

            <button
              onClick={() => navigate('/login')}
              style={styles.secondaryButton}
            >
              Retour à la connexion
            </button>

            <div style={styles.requirements}>
              <div style={styles.requirementsTitle}>Exigences du mot de passe :</div>
              <ul style={styles.requirementsList}>
                <li>Minimum 6 caractères</li>
                <li>Les mots de passe doivent correspondre</li>
                <li>Utilisez un mot de passe sécurisé</li>
              </ul>
            </div>
          </>
        );

      case 'success':
        return (
          <>
            <div style={styles.iconWrapper(professionalTheme.colors.success.light)}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={professionalTheme.colors.success.dark} strokeWidth="3">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <h1 style={styles.title}>Mot de passe réinitialisé !</h1>
            <p style={styles.message}>{message}</p>
            <button
              onClick={() => navigate('/login')}
              style={styles.button}
            >
              Se connecter
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '0.5rem' }}>
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </>
        );

      case 'error':
        return (
          <>
            <div style={styles.iconWrapper(professionalTheme.colors.error.light)}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={professionalTheme.colors.error.dark} strokeWidth="3">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
            <h1 style={styles.title}>Échec de la réinitialisation</h1>
            <p style={styles.message}>{message}</p>
            <button
              onClick={() => navigate('/forgot-password')}
              style={styles.button}
            >
              Demander un nouveau lien
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '0.5rem' }}>
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
            </button>
            <button
              onClick={() => navigate('/login')}
              style={styles.secondaryButton}
            >
              Retour à la connexion
            </button>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div style={styles.page}>
      <style>{professionalKeyframes}</style>
      <div style={styles.container}>
        {renderContent()}
      </div>
    </div>
  );
}

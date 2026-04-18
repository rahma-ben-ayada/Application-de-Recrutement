import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { professionalTheme, professionalKeyframes, createInputStyle, createButtonStyle } from '../../theme/professionalTheme';

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { verifyEmail, resendVerificationEmail } = useAuth();
  const [status, setStatus] = useState('loading'); // loading, success, error, resending
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      handleVerify(token);
    } else {
      setStatus('error');
      setMessage('Token de vérification manquant. Veuillez utiliser le lien envoyé par email.');
    }
  }, [searchParams]);

  const handleVerify = async (token) => {
    try {
      await verifyEmail(token);
      setStatus('success');
      setMessage('Votre email a été vérifié avec succès ! Vous pouvez maintenant vous connecter.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setStatus('error');
      setMessage(err.message || 'Échec de la vérification. Le token peut être expiré ou invalide.');
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Veuillez entrer votre adresse email');
      return;
    }

    setStatus('resending');
    setError('');
    try {
      await resendVerificationEmail(email);
      setStatus('success');
      setMessage('Un nouvel email de vérification a été envoyé ! Veuillez vérifier votre boîte de réception.');
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Échec de l\'envoi de l\'email. Veuillez réessayer.');
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
      marginBottom: '1rem',
    },
    message: {
      fontSize: professionalTheme.fontSizes.base,
      color: professionalTheme.colors.neutral[600],
      marginBottom: '2rem',
      lineHeight: 1.6,
    },
    button: {
      ...createButtonStyle('primary', 'lg'),
      width: '100%',
    },
    secondaryButton: {
      ...createButtonStyle('secondary', 'lg'),
      width: '100%',
      marginTop: '1rem',
    },
    input: {
      ...createInputStyle(),
      marginBottom: '1rem',
      textAlign: 'center',
    },
    errorText: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.error.dark,
      marginTop: '0.5rem',
      marginBottom: '1rem',
    },
    card: {
      background: professionalTheme.colors.neutral[50],
      borderRadius: professionalTheme.radius.xl,
      padding: '1.5rem',
      marginTop: '2rem',
      textAlign: 'left',
    },
    cardTitle: {
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.75rem',
    },
    cardText: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      lineHeight: 1.6,
    },
  };

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <>
            <div style={styles.iconWrapper(professionalTheme.colors.info.light)}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={professionalTheme.colors.info.dark} strokeWidth="3" style={{ animation: 'spin 1s linear infinite' }}>
                <circle cx="12" cy="12" r="10" opacity="0.25"/>
                <path d="M12 2a10 10 0 0 1 10 10" opacity="0.75"/>
              </svg>
            </div>
            <h1 style={styles.title}>Vérification en cours...</h1>
            <p style={styles.message}>Veuillez patienter pendant que nous vérifions votre email.</p>
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
            <h1 style={styles.title}>Email vérifié !</h1>
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
      case 'resending':
        return (
          <>
            <div style={styles.iconWrapper(professionalTheme.colors.error.light)}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={professionalTheme.colors.error.dark} strokeWidth="3">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
            <h1 style={styles.title}>Échec de la vérification</h1>
            <p style={styles.message}>{message}</p>

            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Renvoyer l'email de vérification</h3>
              <p style={styles.cardText}>
                Si le lien a expiré ou ne fonctionne pas, vous pouvez demander un nouvel email de vérification.
              </p>
              <form onSubmit={handleResend}>
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                  disabled={status === 'resending'}
                />
                {error && <div style={styles.errorText}>{error}</div>}
                <button
                  type="submit"
                  disabled={status === 'resending'}
                  style={{
                    ...styles.button,
                    opacity: status === 'resending' ? 0.6 : 1,
                    cursor: status === 'resending' ? 'not-allowed' : 'pointer',
                  }}
                >
                  {status === 'resending' ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                        <circle cx="12" cy="12" r="10" opacity="0.25"/>
                        <path d="M12 2a10 10 0 0 1 10 10" opacity="0.75"/>
                      </svg>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Renvoyer l'email
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '0.5rem' }}>
                        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>

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
        <div style={styles.logo}>
          <div style={styles.logoIcon}>SR</div>
          <div style={styles.logoText}>SmartRecruit</div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}

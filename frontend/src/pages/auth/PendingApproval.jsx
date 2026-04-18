import React from 'react';
import { useNavigate } from 'react-router-dom';
import { professionalTheme, professionalKeyframes } from '../../theme/professionalTheme';

export default function PendingApproval() {
  const navigate = useNavigate();
  const email = new URLSearchParams(window.location.search).get('email') || '';

  const styles = {
    page: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: professionalTheme.gradients.subtle,
      fontFamily: professionalTheme.fonts.sans,
      padding: '1rem',
    },
    container: {
      maxWidth: '500px',
      width: '100%',
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      padding: '3rem 2rem',
      boxShadow: professionalTheme.shadows.xl,
      textAlign: 'center',
    },
    icon: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: professionalTheme.colors.warning.light,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 2rem',
      color: professionalTheme.colors.warning.dark,
      fontSize: '2.5rem',
    },
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
    emailBox: {
      background: professionalTheme.colors.neutral[50],
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      borderRadius: professionalTheme.radius.xl,
      padding: '1rem',
      marginBottom: '2rem',
    },
    emailLabel: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[500],
      marginBottom: '0.25rem',
    },
    emailValue: {
      fontSize: professionalTheme.fontSizes.base,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[900],
    },
    infoCard: {
      background: professionalTheme.colors.info.light,
      border: `1px solid ${professionalTheme.colors.info.DEFAULT}`,
      borderRadius: professionalTheme.radius.xl,
      padding: '1rem 1.25rem',
      marginBottom: '2rem',
      display: 'flex',
      gap: '0.75rem',
      alignItems: 'flex-start',
      textAlign: 'left',
    },
    infoIcon: {
      fontSize: '1.25rem',
      flexShrink: 0,
    },
    infoText: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.info.dark,
    },
    button: {
      ...professionalTheme.createButtonStyle('primary', 'lg'),
      width: '100%',
      maxWidth: '300px',
    },
  };

  return (
    <div style={styles.page}>
      <style>{professionalKeyframes}</style>

      <div style={styles.container}>
        <div style={styles.icon}>⏳</div>

        <h1 style={styles.title}>Compte en attente de validation</h1>

        <p style={styles.message}>
          Votre compte Google a été créé avec succès. Cependant, il doit être validé par un administrateur avant que vous puissiez vous connecter.
        </p>

        {email && (
          <div style={styles.emailBox}>
            <div style={styles.emailLabel}>Adresse email associée</div>
            <div style={styles.emailValue}>{email}</div>
          </div>
        )}

        <div style={styles.infoCard}>
          <div style={styles.infoIcon}>ℹ️</div>
          <div style={styles.infoText}>
            <strong>Prochaines étapes :</strong><br />
            • Un administrateur va examiner votre demande<br />
            • Vous recevrez un email de confirmation lorsque votre compte sera activé<br />
            • Le processus de validation peut prendre 24-48 heures
          </div>
        </div>

        <button
          onClick={() => navigate('/login')}
          style={styles.button}
        >
          Retour à la page de connexion
        </button>
      </div>
    </div>
  );
}

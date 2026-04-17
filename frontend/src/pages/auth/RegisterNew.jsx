import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { professionalTheme, professionalKeyframes, createInputStyle, createButtonStyle } from '../../theme/professionalTheme';

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    nom: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    entreprise: '',
    secteur: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const updateForm = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(e => ({ ...e, [field]: null }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!form.nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!form.email) newErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email invalide';
    if (!form.password) newErrors.password = 'Le mot de passe est requis';
    else if (form.password.length < 8) newErrors.password = 'Minimum 8 caractères';
    if (!form.confirmPassword) newErrors.confirmPassword = 'La confirmation est requise';
    else if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!form.role) newErrors.role = 'Veuillez choisir un rôle';
    if (form.role === 'recruteur' && !form.entreprise.trim()) {
      newErrors.entreprise = "Le nom de l'entreprise est requis";
    }
    return newErrors;
  };

  const handleNext = () => {
    const errs = validateStep1();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = { ...validateStep1(), ...validateStep2() };
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStep(3); // Success screen
    } catch (err) {
      setErrors({ api: err.message });
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    page: {
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1.2fr',
      background: '#FFFFFF',
      fontFamily: professionalTheme.fonts.sans,
    },
    leftPanel: {
      background: professionalTheme.gradients.subtle,
      padding: '3rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      borderRight: `1px solid ${professionalTheme.colors.neutral[200]}`,
    },
    rightPanel: {
      padding: '3rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflowY: 'auto',
    },
    // Left Panel Styles
    leftContent: {
      maxWidth: '400px',
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
      background: professionalTheme.gradients.primary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFFFFF',
      fontWeight: 700,
      fontSize: '1.125rem',
    },
    leftTitle: {
      fontSize: professionalTheme.fontSizes['4xl'],
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '1rem',
      lineHeight: 1.2,
    },
    leftSubtitle: {
      fontSize: professionalTheme.fontSizes.base,
      color: professionalTheme.colors.neutral[600],
      marginBottom: '2rem',
      lineHeight: 1.6,
    },
    benefitList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    benefitItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    benefitIcon: {
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      background: professionalTheme.colors.success.light,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: professionalTheme.colors.success.dark,
      flexShrink: 0,
    },
    benefitText: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[700],
    },
    // Right Panel Styles
    formContainer: {
      width: '100%',
      maxWidth: '440px',
    },
    progressBar: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '2rem',
    },
    progressStep: (isActive, isCompleted) => ({
      flex: 1,
      height: '4px',
      borderRadius: professionalTheme.radius.full,
      background: isCompleted
        ? professionalTheme.colors.primary[500]
        : isActive
        ? professionalTheme.colors.primary[300]
        : professionalTheme.colors.neutral[200],
      transition: professionalTheme.transitions.default,
    })),
    formHeader: {
      marginBottom: '2rem',
    },
    formTitle: {
      fontSize: professionalTheme.fontSizes['2xl'],
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.5rem',
    },
    formSubtitle: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
    },
    formGroup: {
      marginBottom: '1.25rem',
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
    // Role Cards
    roleCards: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem',
      marginBottom: '1.5rem',
    },
    roleCard: (isSelected) => ({
      padding: '1.5rem',
      borderRadius: professionalTheme.radius.xl,
      border: `2px solid ${isSelected ? professionalTheme.colors.primary[500] : professionalTheme.colors.neutral[200]}`,
      background: isSelected ? professionalTheme.colors.primary[50] : '#FFFFFF',
      cursor: 'pointer',
      transition: professionalTheme.transitions.default,
      textAlign: 'center',
    })),
    roleIcon: {
      fontSize: '2rem',
      marginBottom: '0.5rem',
    },
    roleTitle: {
      fontSize: professionalTheme.fontSizes.base,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.25rem',
    },
    roleDescription: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
    },
    // Button Styles
    buttonGroup: {
      display: 'flex',
      gap: '1rem',
      marginTop: '2rem',
    },
    buttonSecondary: {
      ...createButtonStyle('secondary', 'lg'),
      flex: 1,
    },
    buttonPrimary: {
      ...createButtonStyle('primary', 'lg'),
      flex: 1,
    },
    // Login Link
    loginLink: {
      textAlign: 'center',
      marginTop: '1.5rem',
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
    },
    loginLinkButton: {
      background: 'none',
      border: 'none',
      color: professionalTheme.colors.primary[600],
      cursor: 'pointer',
      fontWeight: 600,
      fontSize: 'inherit',
      padding: 0,
    },
    // Success Screen
    successContainer: {
      textAlign: 'center',
      padding: '3rem 2rem',
    },
    successIcon: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: professionalTheme.colors.success.light,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 2rem',
      color: professionalTheme.colors.success.dark,
    },
    successTitle: {
      fontSize: professionalTheme.fontSizes['2xl'],
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '1rem',
    },
    successMessage: {
      fontSize: professionalTheme.fontSizes.base,
      color: professionalTheme.colors.neutral[600],
      marginBottom: '2rem',
      lineHeight: 1.6,
    },
    successCard: {
      background: professionalTheme.colors.warning.light,
      border: `1px solid ${professionalTheme.colors.warning.DEFAULT}`,
      borderRadius: professionalTheme.radius.xl,
      padding: '1rem 1.25rem',
      marginBottom: '2rem',
      display: 'flex',
      gap: '0.75rem',
      alignItems: 'flex-start',
    },
    successCardIcon: {
      fontSize: '1.25rem',
      flexShrink: 0,
    },
    successCardText: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.warning.dark,
      textAlign: 'left',
    },
  };

  // Success Screen
  if (step === 3) {
    return (
      <div style={styles.page}>
        <style>{professionalKeyframes}</style>
        <div style={{ ...styles.rightPanel, width: '100%', maxWidth: '600px', margin: '0 auto' }}>
          <div style={styles.successContainer}>
            <div style={styles.successIcon}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>

            <h2 style={styles.successTitle}>Compte créé avec succès !</h2>

            <p style={styles.successMessage}>
              Bienvenue sur SmartRecruit. Votre compte a été créé et est en attente de validation.
            </p>

            <div style={styles.successCard}>
              <div style={styles.successCardIcon}>⏳</div>
              <div style={styles.successCardText}>
                <strong>En attente de validation</strong><br />
                Votre compte doit être validé par un administrateur avant que vous puissiez vous connecter. Vous recevrez un email de confirmation une fois votre compte activé.
              </div>
            </div>

            <button
              onClick={() => navigate('/login')}
              style={{ ...styles.buttonPrimary, width: 'auto', padding: '0.875rem 2rem' }}
            >
              Retour à la connexion
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <style>{professionalKeyframes}</style>

      {/* ===== LEFT PANEL ===== */}
      <div style={styles.leftPanel}>
        <div style={styles.leftContent}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>SR</div>
            <div style={{ fontSize: professionalTheme.fontSizes.xl, fontWeight: 700, color: professionalTheme.colors.neutral[900] }}>
              SmartRecruit
            </div>
          </div>

          <h1 style={styles.leftTitle}>
            Créez Votre Compte
          </h1>

          <p style={styles.leftSubtitle}>
            Rejoignez la plateforme de recrutement leader et connectez-vous aux meilleures opportunités.
          </p>

          <div style={styles.benefitList}>
            {[
              { text: 'Inscription gratuite et sans engagement' },
              { text: 'Accès aux offres de Premium' },
              { text: 'Outils de suivi avancés' },
              { text: 'Support client dédié 24/7' },
            ].map((benefit, index) => (
              <div key={index} style={styles.benefitItem}>
                <div style={styles.benefitIcon}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <span style={styles.benefitText}>{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== RIGHT PANEL ===== */}
      <div style={styles.rightPanel}>
        <div style={styles.formContainer}>
          {/* Progress Bar */}
          <div style={styles.progressBar}>
            <div style={styles.progressStep(step >= 1, step > 1)} />
            <div style={styles.progressStep(step >= 2, step > 2)} />
          </div>

          {/* Form Header */}
          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>
              {step === 1 ? 'Informations personnelles' : 'Type de compte'}
            </h2>
            <p style={styles.formSubtitle}>
              {step === 1
                ? 'Entrez vos coordonnées pour créer votre compte'
                : 'Choisissez le type de compte qui vous correspond'}
            </p>
          </div>

          {/* API Error */}
          {errors.api && (
            <div style={{
              ...styles.successCard,
              background: professionalTheme.colors.error.light,
              borderColor: professionalTheme.colors.error.DEFAULT,
            }}>
              <span style={styles.successCardIcon}>⚠️</span>
              <span style={{ ...styles.successCardText, color: professionalTheme.colors.error.dark }}>
                {errors.api}
              </span>
            </div>
          )}

          <form onSubmit={step === 1 ? (e) => { e.preventDefault(); handleNext(); } : handleSubmit}>
            {/* STEP 1: Personal Information */}
            {step === 1 && (
              <>
                {/* Name */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Nom complet <span style={{ color: professionalTheme.colors.error.DEFAULT }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ahmed Trabelsi"
                    value={form.nom}
                    onChange={updateForm('nom')}
                    style={styles.input(!!errors.nom)}
                  />
                  {errors.nom && (
                    <div style={styles.errorText}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2"/>
                      </svg>
                      {errors.nom}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Adresse email <span style={{ color: professionalTheme.colors.error.DEFAULT }}>*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="vous@exemple.com"
                    value={form.email}
                    onChange={updateForm('email')}
                    style={styles.input(!!errors.email)}
                  />
                  {errors.email && (
                    <div style={styles.errorText}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2"/>
                      </svg>
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Password */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Mot de passe <span style={{ color: professionalTheme.colors.error.DEFAULT }}>*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Min. 8 caractères"
                    value={form.password}
                    onChange={updateForm('password')}
                    style={styles.input(!!errors.password)}
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

                {/* Confirm Password */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Confirmer le mot de passe <span style={{ color: professionalTheme.colors.error.DEFAULT }}>*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={form.confirmPassword}
                    onChange={updateForm('confirmPassword')}
                    style={styles.input(!!errors.confirmPassword)}
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

                <div style={styles.buttonGroup}>
                  <button
                    type="submit"
                    style={styles.buttonPrimary}
                  >
                    Continuer
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </>
            )}

            {/* STEP 2: Role Selection */}
            {step === 2 && (
              <>
                {/* Role Selection */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Je suis un(e) <span style={{ color: professionalTheme.colors.error.DEFAULT }}>*</span>
                  </label>
                  <div style={styles.roleCards}>
                    {[
                      { value: 'candidat', icon: '👤', title: 'Candidat', description: 'Je cherche un emploi' },
                      { value: 'recruteur', icon: '🏢', title: 'Recruteur', description: 'Je recrute des talents' },
                    ].map((role) => (
                      <div
                        key={role.value}
                        onClick={() => updateForm('role')({ target: { value: role.value } })}
                        style={styles.roleCard(form.role === role.value)}
                        onMouseEnter={(e) => {
                          if (form.role !== role.value) {
                            e.currentTarget.style.borderColor = professionalTheme.colors.primary[300];
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (form.role !== role.value) {
                            e.currentTarget.style.borderColor = professionalTheme.colors.neutral[200];
                            e.currentTarget.style.transform = 'translateY(0)';
                          }
                        }}
                      >
                        <div style={styles.roleIcon}>{role.icon}</div>
                        <div style={styles.roleTitle}>{role.title}</div>
                        <div style={styles.roleDescription}>{role.description}</div>
                      </div>
                    ))}
                  </div>
                  {errors.role && (
                    <div style={styles.errorText}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2"/>
                      </svg>
                      {errors.role}
                    </div>
                  )}
                </div>

                {/* Company Fields (if recruteur) */}
                {form.role === 'recruteur' && (
                  <>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>
                        Nom de l'entreprise <span style={{ color: professionalTheme.colors.error.DEFAULT }}>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Tech Corp SARL"
                        value={form.entreprise}
                        onChange={updateForm('entreprise')}
                        style={styles.input(!!errors.entreprise)}
                      />
                      {errors.entreprise && (
                        <div style={styles.errorText}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2"/>
                          </svg>
                          {errors.entreprise}
                        </div>
                      )}
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Secteur d'activité</label>
                      <input
                        type="text"
                        placeholder="Technologie, Finance, Santé..."
                        value={form.secteur}
                        onChange={updateForm('secteur')}
                        style={styles.input(false)}
                      />
                    </div>
                  </>
                )}

                <div style={styles.buttonGroup}>
                  <button
                    type="button"
                    onClick={handleBack}
                    style={styles.buttonSecondary}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    Retour
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      ...styles.buttonPrimary,
                      opacity: loading ? 0.6 : 1,
                      cursor: loading ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {loading ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                          <circle cx="12" cy="12" r="10" opacity="0.25"/>
                          <path d="M12 2a10 10 0 0 1 10 10" opacity="0.75"/>
                        </svg>
                        Création...
                      </>
                    ) : (
                      <>
                        Créer mon compte
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </form>

          <div style={styles.loginLink}>
            Déjà un compte ?{' '}
            <button
              onClick={() => navigate('/login')}
              style={styles.loginLinkButton}
            >
              Se connecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

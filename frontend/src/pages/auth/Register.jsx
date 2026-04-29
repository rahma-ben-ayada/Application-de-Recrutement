import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { professionalTheme } from '../../theme/professionalTheme';
import './Register.css';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
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
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [nameValidation, setNameValidation] = useState({
    minLength: false,
    maxLength: false,
    validChars: false,
    twoWords: false,
    noNumbers: false,
  });

  // Real-time name validation
  useEffect(() => {
    if (form.nom.trim()) {
      const trimmed = form.nom.trim();
      setNameValidation({
        minLength: trimmed.length >= 3,
        maxLength: trimmed.length <= 50,
        validChars: /^[a-zA-ZÀ-ÿ\s'-]+$/.test(trimmed),
        twoWords: trimmed.split(/\s+/).length >= 2,
        noNumbers: !/\d/.test(form.nom),
      });
    } else {
      setNameValidation({
        minLength: false,
        maxLength: false,
        validChars: false,
        twoWords: false,
        noNumbers: false,
      });
    }
  }, [form.nom]);

  const updateForm = (field) => (e) => {
    const value = e.target.value;
    setForm(f => ({ ...f, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(e => ({ ...e, [field]: null }));
    }

    // Real-time validation for name field
    if (field === 'nom' && value.trim()) {
      const nomErrors = [];

      if (value.trim().length < 3) {
        nomErrors.push('Minimum 3 caractères');
      }
      if (value.trim().length > 50) {
        nomErrors.push('Maximum 50 caractères');
      }
      if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value.trim())) {
        nomErrors.push('Lettres uniquement');
      }
      if (value.trim().split(/\s+/).length < 2) {
        nomErrors.push('Nom et prénom requis');
      }
      if (/\d/.test(value)) {
        nomErrors.push('Pas de chiffres');
      }

      // Show real-time feedback if there are errors
      if (nomErrors.length > 0 && value.trim().length >= 2) {
        setErrors(e => ({
          ...e,
          nom: nomErrors[0] // Show first error
        }));
      }
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    // Name validation
    if (!form.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    } else if (form.nom.trim().length < 3) {
      newErrors.nom = 'Le nom doit contenir au moins 3 caractères';
    } else if (form.nom.trim().length > 50) {
      newErrors.nom = 'Le nom ne peut pas dépasser 50 caractères';
    } else if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(form.nom.trim())) {
      newErrors.nom = 'Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes';
    } else if (form.nom.trim().split(/\s+/).length < 2) {
      newErrors.nom = 'Veuillez entrer votre nom et prénom (au moins 2 mots)';
    } else if (/\d/.test(form.nom)) {
      newErrors.nom = 'Le nom ne peut pas contenir de chiffres';
    } else if (/[^a-zA-ZÀ-ÿ\s'-]/.test(form.nom)) {
      newErrors.nom = 'Caractères spéciaux non autorisés dans le nom';
    }

    // Email validation
    if (!form.email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email invalide';
    }

    // Password validation
    if (!form.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (form.password.length < 8) {
      newErrors.password = 'Minimum 8 caractères';
    }

    // Confirm password validation
    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'La confirmation est requise';
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

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
      await register({
        nom: form.nom,
        email: form.email,
        password: form.password,
        role: form.role,
        entreprise: form.entreprise,
        secteur: form.secteur,
      });
      setStep(3);
    } catch (err) {
      setErrors({ api: err.message });
    } finally {
      setLoading(false);
    }
  };

  if (step === 3) {
    return (
      <div className="register-page">
        <div className="register-right-panel" style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
          <div className="register-success-content">
            <div className="register-success-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>

            <h2 className="register-success-title">Compte créé avec succès ! 🎉</h2>

            <p className="register-success-text">
              Bienvenue sur SmartRecruit. Votre compte a été créé et est en attente de validation.
            </p>

            <div className="register-success-alert">
              <div style={{ fontSize: '1.5rem' }}>⏳</div>
              <div>
                <strong>En attente de validation</strong><br />
                Votre compte doit être validé par un administrateur avant que vous puissiez vous connecter.
              </div>
            </div>

            <button
              onClick={() => navigate('/login')}
              className="register-button register-button-primary"
              style={{ width: 'auto', padding: '1rem 2.5rem' }}
            >
              Retour à la connexion
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const passwordStrength = form.password ? (
    form.password.length < 8 ? { score: 1, text: 'Faible', color: '#EF4444' } :
    form.password.length < 12 ? { score: 2, text: 'Moyen', color: '#F59E0B' } :
    !/[A-Z]/.test(form.password) || !/[0-9]/.test(form.password) ? { score: 2, text: 'Moyen', color: '#F59E0B' } :
    { score: 3, text: 'Fort', color: '#10B981' }
  ) : null;

  return (
    <div className="register-page">
      {/* ===== LEFT PANEL ===== */}
      <div className="register-left-panel">
        <div className="register-grid-pattern" />
        <div className="register-left-content">
          <div className="register-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <div className="register-logo-icon">SR</div>
            <div className="register-logo-text">SmartRecruit</div>
          </div>

          <h1 className="register-left-title">
            Créez Votre Compte
          </h1>

          <p className="register-left-subtitle">
            Rejoignez la plateforme de recrutement leader et connectez-vous aux meilleures opportunités.
          </p>

          <div className="register-benefit-list">
            {[
              { text: 'Inscription gratuite et sans engagement', icon: '✨' },
              { text: 'Accès aux offres de Premium', icon: '💎' },
              { text: 'Outils de suivi avancés', icon: '📊' },
              { text: 'Support client dédié 24/7', icon: '💬' },
            ].map((benefit, index) => (
              <div key={index} className="register-benefit-item" style={{ animationDelay: `${index * 0.1}s` }}>
                <span className="register-benefit-emoji">{benefit.icon}</span>
                <span className="register-benefit-text">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== RIGHT PANEL ===== */}
      <div className="register-right-panel">
        <div className="register-form-container">
          {/* Mobile Logo */}
          <div className="register-mobile-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <div className="register-logo-icon" style={{ width: '44px', height: '44px', fontSize: '1.125rem' }}>SR</div>
            <div className="register-logo-text" style={{ fontSize: '1.25rem' }}>SmartRecruit</div>
          </div>

          {/* Progress Bar */}
          <div className="register-progress-bar">
            <div className={`register-progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
              {step > 1 && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>}
            </div>
            <div className={`register-progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
              {step > 2 && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>}
            </div>
          </div>

          <div className="register-form-header">
            <h2 className="register-form-title">
              {step === 1 ? 'Informations personnelles' : 'Type de compte'}
            </h2>
            <p className="register-form-subtitle">
              {step === 1
                ? 'Entrez vos coordonnées pour créer votre compte'
                : 'Choisissez le type de compte qui vous correspond'}
            </p>
          </div>

          {errors.api && (
            <div className="register-error-alert">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v4M12 16h.01"/>
              </svg>
              <span>{errors.api}</span>
            </div>
          )}

          <form onSubmit={step === 1 ? (e) => { e.preventDefault(); handleNext(); } : handleSubmit}>
            {step === 1 && (
              <>
                {/* Name Input */}
                <div className="register-form-group">
                  <label className="register-label">
                    Nom complet <span className="required">*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      className="register-input"
                      placeholder="Ahmed Trabelsi"
                      value={form.nom}
                      onChange={updateForm('nom')}
                      style={{
                        ...errors.nom ? {
                          border: '2px solid #EF4444',
                          background: '#FEE2E2',
                        } : {},
                        ...(form.nom && !errors.nom ? {
                          border: '2px solid #10B981',
                        } : {}),
                        paddingRight: '2.5rem',
                      }}
                    />
                    {form.nom && !errors.nom && (
                      <span style={{
                        position: 'absolute',
                        right: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#10B981',
                        fontSize: '1.25rem',
                      }}>
                        ✓
                      </span>
                    )}
                  </div>
                  {errors.nom && (
                    <div className="register-error-text">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2"/>
                      </svg>
                      {errors.nom}
                    </div>
                  )}
                  {form.nom && !errors.nom && (
                    <div className="name-requirements-hint" style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#10B981' }}>
                      ✓ Format valide
                    </div>
                  )}
                  {form.nom && form.nom.length > 0 && (
                    <div className="name-validation-indicators" style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {[
                        { valid: nameValidation.minLength, label: 'Min. 3 car.' },
                        { valid: nameValidation.twoWords, label: 'Nom + Prénom' },
                        { valid: nameValidation.validChars, label: 'Lettres uniquement' },
                        { valid: nameValidation.noNumbers, label: 'Pas de chiffres' },
                      ].map((req, index) => (
                        <div
                          key={index}
                          style={{
                            fontSize: '0.7rem',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.25rem',
                            background: req.valid ? '#D1FAE5' : '#F3F4F6',
                            color: req.valid ? '#065F46' : '#9CA3AF',
                            border: `1px solid ${req.valid ? '#10B981' : '#E5E7EB'}`,
                            fontWeight: '500',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {req.valid ? '✓' : '○'} {req.label}
                        </div>
                      ))}
                    </div>
                  )}
                  {!form.nom && (
                    <div className="name-requirements" style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#71717A' }}>
                      <span style={{ color: '#9CA3AF' }}>💡</span> Ex: Ahmed Trabelsi (au moins 2 mots, lettres uniquement)
                    </div>
                  )}
                </div>

                {/* Email Input */}
                <div className="register-form-group">
                  <label className="register-label">
                    Adresse email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    className="register-input"
                    placeholder="vous@exemple.com"
                    value={form.email}
                    onChange={updateForm('email')}
                    style={errors.email ? {
                      border: '2px solid #EF4444',
                      background: '#FEE2E2',
                    } : {}}
                  />
                  {errors.email && (
                    <div className="register-error-text">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2"/>
                      </svg>
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Password Input */}
                <div className="register-form-group">
                  <label className="register-label">
                    Mot de passe <span className="required">*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="register-input"
                      placeholder="Min. 8 caractères"
                      style={{
                        ...errors.password ? {
                          border: '2px solid #EF4444',
                          background: '#FEE2E2',
                        } : {},
                        paddingRight: '3rem',
                      }}
                      value={form.password}
                      onChange={updateForm('password')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '0.875rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#9CA3AF',
                        padding: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        borderRadius: '0.5rem',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = professionalTheme.colors.primary[500];
                        e.currentTarget.style.background = 'rgba(91, 115, 247, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#9CA3AF';
                        e.currentTarget.style.background = 'transparent';
                      }}
                      aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
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
                  {passwordStrength && (
                    <div className="password-strength">
                      <div className="password-strength-bar">
                        <div
                          className="password-strength-fill"
                          style={{
                            width: `${(passwordStrength.score / 3) * 100}%`,
                            background: passwordStrength.color,
                          }}
                        />
                      </div>
                      <span style={{ color: passwordStrength.color, fontSize: '0.75rem' }}>
                        {passwordStrength.text}
                      </span>
                    </div>
                  )}
                  {errors.password && (
                    <div className="register-error-text">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2"/>
                      </svg>
                      {errors.password}
                    </div>
                  )}
                </div>

                {/* Confirm Password Input */}
                <div className="register-form-group">
                  <label className="register-label">
                    Confirmer le mot de passe <span className="required">*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="register-input"
                      placeholder="••••••••"
                      style={{
                        ...errors.confirmPassword ? {
                          border: '2px solid #EF4444',
                          background: '#FEE2E2',
                        } : {},
                        paddingRight: '3rem',
                      }}
                      value={form.confirmPassword}
                      onChange={updateForm('confirmPassword')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{
                        position: 'absolute',
                        right: '0.875rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#9CA3AF',
                        padding: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        borderRadius: '0.5rem',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = professionalTheme.colors.primary[500];
                        e.currentTarget.style.background = 'rgba(91, 115, 247, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#9CA3AF';
                        e.currentTarget.style.background = 'transparent';
                      }}
                      aria-label={showConfirmPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    >
                      {showConfirmPassword ? (
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
                  {errors.confirmPassword && (
                    <div className="register-error-text">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2"/>
                      </svg>
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>

                <div className="register-form-actions">
                  <button type="submit" className="register-button register-button-primary">
                    Continuer
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                {/* Role Selection */}
                <div className="register-form-group">
                  <label className="register-label">
                    Je suis un(e) <span className="required">*</span>
                  </label>
                  <div className="register-role-cards">
                    {[
                      { value: 'candidat', icon: '👤', title: 'Candidat', description: 'Je cherche un emploi' },
                      { value: 'recruteur', icon: '🏢', title: 'Recruteur', description: 'Je recrute des talents' },
                    ].map((role) => (
                      <div
                        key={role.value}
                        className={`register-role-card ${form.role === role.value ? 'selected' : ''}`}
                        onClick={() => updateForm('role')({ target: { value: role.value } })}
                      >
                        <div className="register-role-icon">{role.icon}</div>
                        <div className="register-role-title">{role.title}</div>
                        <div className="register-role-description">{role.description}</div>
                        {form.role === role.value && (
                          <div className="register-role-check">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <path d="M20 6L9 17l-5-5"/>
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {errors.role && (
                    <div className="register-error-text">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2"/>
                      </svg>
                      {errors.role}
                    </div>
                  )}
                </div>

                {form.role === 'recruteur' && (
                  <>
                    <div className="register-form-group">
                      <label className="register-label">
                        Nom de l'entreprise <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="register-input"
                        placeholder="Tech Corp SARL"
                        value={form.entreprise}
                        onChange={updateForm('entreprise')}
                        style={errors.entreprise ? {
                          border: '2px solid #EF4444',
                          background: '#FEE2E2',
                        } : {}}
                      />
                      {errors.entreprise && (
                        <div className="register-error-text">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2"/>
                          </svg>
                          {errors.entreprise}
                        </div>
                      )}
                    </div>

                    <div className="register-form-group">
                      <label className="register-label">Secteur d'activité</label>
                      <input
                        type="text"
                        className="register-input"
                        placeholder="Technologie, Finance, Santé..."
                        value={form.secteur}
                        onChange={updateForm('secteur')}
                      />
                    </div>
                  </>
                )}

                <div className="register-form-actions">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="register-button register-button-secondary"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    Retour
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="register-button register-button-primary"
                    style={loading ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
                  >
                    {loading ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="register-spinner">
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

          <div className="register-login-text">
            Déjà un compte ?{' '}
            <button
              onClick={() => navigate('/login')}
              className="register-login-link"
            >
              Se connecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

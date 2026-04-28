import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
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

  const updateForm = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
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
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>

            <h2 className="register-success-title">Compte créé avec succès !</h2>

            <p className="register-success-text">
              Bienvenue sur SmartRecruit. Votre compte a été créé et est en attente de validation.
            </p>

            <div style={{
              background: '#FEF3C7',
              border: '1px solid #F59E0B',
              borderRadius: '0.75rem',
              padding: '1rem 1.25rem',
              marginBottom: '2rem',
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'flex-start',
            }}>
              <div style={{ fontSize: '1.25rem', flexShrink: 0 }}>⏳</div>
              <div style={{
                fontSize: '0.875rem',
                color: '#92400E',
                textAlign: 'left',
              }}>
                <strong>En attente de validation</strong><br />
                Votre compte doit être validé par un administrateur avant que vous puissiez vous connecter. Vous recevrez un email de confirmation une fois votre compte activé.
              </div>
            </div>

            <button
              onClick={() => navigate('/login')}
              className="register-button register-button-primary"
              style={{ width: 'auto', padding: '0.875rem 2rem' }}
            >
              Retour à la connexion
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="register-page">
      {/* ===== LEFT PANEL ===== */}
      <div className="register-left-panel">
        <div className="register-left-content">
          <div className="register-logo">
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
              { text: 'Inscription gratuite et sans engagement' },
              { text: 'Accès aux offres de Premium' },
              { text: 'Outils de suivi avancés' },
              { text: 'Support client dédié 24/7' },
            ].map((benefit, index) => (
              <div key={index} className="register-benefit-item">
                <div className="register-benefit-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <span className="register-benefit-text">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== RIGHT PANEL ===== */}
      <div className="register-right-panel">
        <div className="register-form-container">
          {/* Progress Bar */}
          <div className="register-progress-bar">
            <div className={`register-progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`} />
            <div className={`register-progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`} />
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
            <div style={{
              background: '#FEE2E2',
              border: '1px solid #EF4444',
              borderRadius: '0.75rem',
              padding: '0.75rem 1rem',
              marginBottom: '1.5rem',
              display: 'flex',
              gap: '0.75rem',
              color: '#991B1B',
              fontSize: '0.875rem',
            }}>
              <span style={{ fontSize: '1.25rem' }}>⚠️</span>
              <span>{errors.api}</span>
            </div>
          )}

          <form onSubmit={step === 1 ? (e) => { e.preventDefault(); handleNext(); } : handleSubmit}>
            {step === 1 && (
              <>
                <div className="register-form-group">
                  <label className="register-label">
                    Nom complet <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="register-input"
                    placeholder="Ahmed Trabelsi"
                    value={form.nom}
                    onChange={updateForm('nom')}
                    style={errors.nom ? {
                      border: '2px solid #EF4444',
                      background: '#FEE2E2',
                    } : {}}
                  />
                  {errors.nom && (
                    <div className="register-error-text">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ verticalAlign: 'middle', marginRight: '0.25rem' }}>
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2"/>
                      </svg>
                      {errors.nom}
                    </div>
                  )}
                </div>

                <div className="register-form-group">
                  <label className="register-label">
                    Adresse email <span style={{ color: '#EF4444' }}>*</span>
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
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ verticalAlign: 'middle', marginRight: '0.25rem' }}>
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2"/>
                      </svg>
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="register-form-group">
                  <label className="register-label">
                    Mot de passe <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="password"
                    className="register-input"
                    placeholder="Min. 8 caractères"
                    value={form.password}
                    onChange={updateForm('password')}
                    style={errors.password ? {
                      border: '2px solid #EF4444',
                      background: '#FEE2E2',
                    } : {}}
                  />
                  {errors.password && (
                    <div className="register-error-text">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ verticalAlign: 'middle', marginRight: '0.25rem' }}>
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2"/>
                      </svg>
                      {errors.password}
                    </div>
                  )}
                </div>

                <div className="register-form-group">
                  <label className="register-label">
                    Confirmer le mot de passe <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="password"
                    className="register-input"
                    placeholder="••••••••"
                    value={form.confirmPassword}
                    onChange={updateForm('confirmPassword')}
                    style={errors.confirmPassword ? {
                      border: '2px solid #EF4444',
                      background: '#FEE2E2',
                    } : {}}
                  />
                  {errors.confirmPassword && (
                    <div className="register-error-text">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ verticalAlign: 'middle', marginRight: '0.25rem' }}>
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
                <div className="register-form-group">
                  <label className="register-label">
                    Je suis un(e) <span style={{ color: '#EF4444' }}>*</span>
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
                      </div>
                    ))}
                  </div>
                  {errors.role && (
                    <div className="register-error-text">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ verticalAlign: 'middle', marginRight: '0.25rem' }}>
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
                        Nom de l'entreprise <span style={{ color: '#EF4444' }}>*</span>
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
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ verticalAlign: 'middle', marginRight: '0.25rem' }}>
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

          <div style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            fontSize: '0.875rem',
            color: '#71717A',
          }}>
            Déjà un compte ?{' '}
            <button
              onClick={() => navigate('/login')}
              style={{
                background: 'none',
                border: 'none',
                color: '#5B73F7',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 'inherit',
                padding: 0,
              }}
            >
              Se connecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

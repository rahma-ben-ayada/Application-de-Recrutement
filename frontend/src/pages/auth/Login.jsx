import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

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

  return (
    <div className="login-page">
      {/* ===== LEFT PANEL ===== */}
      <div className="login-left-panel">
        <div className="login-decorative-circle" style={{ top: '-10%', right: '-10%', width: '300px', height: '300px' }} />
        <div className="login-decorative-circle" style={{ top: '60%', right: '80%', width: '200px', height: '200px', animationDelay: '2s' }} />
        <div className="login-decorative-circle" style={{ top: '80%', right: '20%', width: '150px', height: '150px', animationDelay: '4s' }} />

        <div className="login-left-content">
          <div className="login-logo">
            <div className="login-logo-icon">SR</div>
            <div className="login-logo-text">SmartRecruit</div>
          </div>

          <h1 className="login-left-title">
            Connectez-vous à Votre Espace
          </h1>

          <p className="login-left-subtitle">
            Accédez à votre tableau de bord et gérez vos candidatures ou offres d'emploi en toute simplicité.
          </p>

          <div className="login-feature-list">
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
              <div key={index} className="login-feature-item">
                <div className="login-feature-icon">{feature.icon}</div>
                <div className="login-feature-text">
                  <div className="login-feature-title">{feature.title}</div>
                  <div className="login-feature-description">{feature.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== RIGHT PANEL ===== */}
      <div className="login-right-panel">
        <div className="login-form-container">
          <div className="login-form-header">
            <h2 className="login-form-title">Bienvenue 👋</h2>
            <p className="login-form-subtitle">Connectez-vous pour continuer</p>
          </div>

          {error && (
            <div className="login-error-alert">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v4M12 16h.01"/>
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="login-form-group">
              <label className="login-label">Adresse email</label>
              <div className="login-input-wrapper">
                <input
                  type="email"
                  className="login-input"
                  placeholder="vous@exemple.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />
                <span className="login-input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <path d="M22 6l-10 7L2 6"/>
                  </svg>
                </span>
              </div>
            </div>

            <div className="login-form-group">
              <label className="login-label">Mot de passe</label>
              <div className="login-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`login-input ${showPassword ? '' : 'has-password'}`}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                />
                <span className="login-input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <button
                  type="button"
                  className="login-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
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
            </div>

            <div className="login-forgot-password">
              <button
                type="button"
                className="login-forgot-password-link"
                onClick={() => navigate('/forgot-password')}
              >
                Mot de passe oublié ?
              </button>
            </div>

            <button
              type="submit"
              className="login-submit-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="login-spinner">
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
            <div className="login-divider">
              <div className="login-divider-line" />
              <span className="login-divider-text">ou</span>
              <div className="login-divider-line" />
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              className="login-google-button"
              onClick={() => {
                const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
                window.location.href = `${apiUrl}/api/auth/google`;
              }}
              disabled={loading}
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

          <p className="login-signup-text">
            Pas encore de compte ?{' '}
            <button
              className="login-signup-link"
              onClick={() => navigate('/register')}
            >
              Créer un compte
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

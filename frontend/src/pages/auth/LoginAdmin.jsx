import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { luxuryTheme, keyframes } from '../../theme/luxuryTheme';

export default function LoginAdmin() {
  const navigate = useNavigate();
  const { adminLogin } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [lockTime, setLockTime] = useState(0);
  const [focusedInput, setFocusedInput] = useState(null);

  useEffect(() => {
    const savedAttempts = localStorage.getItem('admin_login_attempts');
    const lockUntil = localStorage.getItem('admin_lock_until');
    if (savedAttempts) setAttempts(parseInt(savedAttempts));
    if (lockUntil && parseInt(lockUntil) > Date.now()) {
      setLocked(true);
      setLockTime(parseInt(lockUntil));
    }
  }, []);

  useEffect(() => {
    if (locked && lockTime > Date.now()) {
      const timer = setInterval(() => {
        if (Date.now() >= lockTime) {
          setLocked(false);
          setLockTime(0);
          localStorage.removeItem('admin_lock_until');
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [locked, lockTime]);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (locked) {
      setError('Compte temporairement verrouillé. Veuillez réessayer plus tard.');
      return;
    }

    if (!form.email || !form.password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Format d\'email invalide');
      return;
    }

    setLoading(true);

    try {
      const user = await adminLogin(form.email, form.password);
      setAttempts(0);
      localStorage.removeItem('admin_login_attempts');
      localStorage.removeItem('admin_lock_until');
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Échec de l\'authentification');
      handleFailedAttempt();
    } finally {
      setLoading(false);
    }
  };

  const handleFailedAttempt = () => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    localStorage.setItem('admin_login_attempts', newAttempts.toString());

    if (newAttempts >= 3) {
      const lockDuration = 5 * 60 * 1000;
      const lockUntil = Date.now() + lockDuration;
      setLocked(true);
      setLockTime(lockUntil);
      localStorage.setItem('admin_lock_until', lockUntil.toString());
    }
  };

  const getLockTimeRemaining = () => {
    const remaining = Math.ceil((lockTime - Date.now()) / 1000);
    if (remaining <= 0) return 0;
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      background: 'linear-gradient(135deg, #0A1628 0%, #1E3A5F 50%, #2E5082 100%)',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '"Inter", sans-serif',
    },
    animatedBg: (delay) => ({
      position: 'absolute',
      width: isMobile ? '300px' : '600px',
      height: isMobile ? '300px' : '600px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)',
      pointerEvents: 'none',
      animation: `float ${20 + delay}s ease-in-out infinite`,
    }),
    leftPanel: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: isMobile ? '40px 20px 20px' : '100px 80px',
      position: 'relative',
      zIndex: 1,
      order: isMobile ? 2 : 1,
    },
    rightPanel: {
      width: isMobile ? '100%' : '580px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(20px)',
      padding: isMobile ? '32px 20px' : '48px 40px',
      position: 'relative',
      zIndex: 1,
      boxShadow: isMobile ? '0 16px 32px rgba(0, 0, 0, 0.2)' : '0 32px 64px rgba(0, 0, 0, 0.2)',
      order: isMobile ? 1 : 2,
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '8px' : '12px',
      marginBottom: isMobile ? '20px' : '40px',
    },
    logoIcon: {
      width: isMobile ? '40px' : '56px',
      height: isMobile ? '40px' : '56px',
      borderRadius: isMobile ? '10px' : '12px',
      background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8941F 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: isMobile ? '18px' : '24px',
      boxShadow: '0 8px 32px rgba(212, 175, 55, 0.4)',
    },
    securityBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      background: 'linear-gradient(135deg, rgba(220,38,38,0.15) 0%, rgba(185,28,28,0.15) 100%)',
      border: '1px solid rgba(220, 38, 38, 0.3)',
      borderRadius: '50px',
      padding: isMobile ? '8px 16px' : '10px 24px',
      marginBottom: isMobile ? '20px' : '32px',
      boxShadow: '0 4px 16px rgba(220, 38, 68, 0.15)',
    },
    title: {
      fontFamily: '"Playfair Display", serif',
      fontSize: isMobile ? '32px' : '52px',
      fontWeight: '700',
      color: '#fff',
      lineHeight: '1.1',
      marginBottom: '20px',
    },
    subtitle: {
      fontSize: isMobile ? '13px' : '15px',
      color: 'rgba(255, 255, 255, 0.8)',
      lineHeight: '1.8',
      maxWidth: isMobile ? '100%' : '420px',
      marginBottom: isMobile ? '24px' : '40px',
    },
    formContainer: {
      width: '100%',
      maxWidth: isMobile ? '100%' : '420px',
    },
    inputGroup: {
      marginBottom: isMobile ? '16px' : '20px',
    },
    label: {
      fontSize: '13px',
      fontWeight: '600',
      color: '#475569',
      display: 'block',
      marginBottom: '8px',
    },
    input: {
      width: '100%',
      height: isMobile ? '48px' : '52px',
      padding: '0 16px',
      paddingLeft: '48px',
      paddingRight: '48px',
      border: focusedInput === 'email' || focusedInput === 'password'
        ? '2px solid #D4AF37'
        : '2px solid #E2E8F0',
      borderRadius: '12px',
      fontSize: isMobile ? '14px' : '14px',
      outline: 'none',
      background: '#F8FAFC',
      transition: 'all 0.3s ease',
      opacity: locked ? 0.6 : 1,
      cursor: locked ? 'not-allowed' : 'text',
      boxShadow: focusedInput === 'email' || focusedInput === 'password'
        ? '0 8px 24px rgba(212, 175, 55, 0.15)'
        : 'none',
    },
    button: {
      width: '100%',
      height: isMobile ? '48px' : '52px',
      borderRadius: '12px',
      border: 'none',
      background: loading || locked
        ? '#94A3B8'
        : 'linear-gradient(135deg, #0A1628 0%, #1E3A5F 100%)',
      color: '#fff',
      fontSize: isMobile ? '14px' : '15px',
      fontWeight: '600',
      cursor: loading || locked ? 'not-allowed' : 'pointer',
      boxShadow: '0 8px 24px rgba(10, 22, 40, 0.3)',
      transition: 'all 0.3s ease',
    },
    error: {
      background: '#FEF2F2',
      border: '1px solid #FECACA',
      borderRadius: '12px',
      padding: '14px 18px',
      color: '#DC2626',
      fontSize: '13px',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
      fontWeight: '500',
    },
    warning: {
      background: '#FEF3C7',
      border: '1px solid #FCD34D',
      borderRadius: '10px',
      padding: '12px 16px',
      fontSize: '12px',
      color: '#92400E',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    lockMessage: {
      background: '#FEF2F2',
      border: '1px solid #FECACA',
      borderRadius: '12px',
      padding: '16px 20px',
      marginBottom: '20px',
    },
  };

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>

      {/* Animated Background */}
      <div style={{ ...styles.animatedBg(0), top: '-200px', left: '-150px' }} />
      <div style={{ ...styles.animatedBg(5), bottom: '-100px', right: '-100px' }} />

      {/* Left Panel */}
      <div style={styles.leftPanel}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>🛡️</div>
          <div>
            <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '26px', fontWeight: '700', color: '#fff' }}>
              SmartRecruit
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontWeight: '500' }}>
              PLATFORME DE RECRUTEMENT
            </div>
          </div>
        </div>

        <div style={styles.securityBadge}>
          <span style={{ fontSize: '18px' }}>⚠️</span>
          <span style={{ fontSize: '13px', color: '#FCA5A5', fontWeight: '600', letterSpacing: '0.5px' }}>
            PORTAIL ADMINISTRATEUR SÉCURISÉ
          </span>
        </div>

        <h1 style={styles.title}>
          Espace<br />
          <span style={{ color: '#D4AF37' }}>Administration</span>
        </h1>

        <p style={styles.subtitle}>
          Accès exclusivement réservé aux administrateurs autorisés. Toute tentative d'intrusion sera signalée et enregistrée.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px', marginBottom: isMobile ? '24px' : '40px' }}>
          {[
            { icon: '🔐', label: 'Authentification 2FA' },
            { icon: '📊', label: 'Journalisation activités' },
            { icon: '🛡️', label: 'Anti-attaques DDoS' },
            { icon: '⏰', label: 'Verrouillage auto' },
          ].map((feature, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: isMobile ? '12px 14px' : '14px 18px',
              border: '1px solid ' + 'rgba(255, 255, 255, 0.1)',
            }}>
              <span style={{ fontSize: isMobile ? '18px' : '20px' }}>{feature.icon}</span>
              <span style={{ fontSize: isMobile ? '11px' : '12px', color: '#fff', fontWeight: '500' }}>
                {feature.label}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: isMobile ? '24px' : '40px' }}>
          {[
            { value: '24/7', label: 'Support' },
            { value: '99.9%', label: 'Disponibilité' },
            { value: 'SSL', label: 'Sécurisé' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: '"Playfair Display", serif', fontSize: isMobile ? '20px' : '24px', fontWeight: '700', color: '#D4AF37' }}>
                {s.value}
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div style={styles.rightPanel}>
        <div style={styles.formContainer}>

          {/* Header */}
          <div style={{ marginBottom: isMobile ? '24px' : '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '10px' : '12px', marginBottom: '16px' }}>
              <div style={{
                width: isMobile ? '48px' : '56px',
                height: isMobile ? '48px' : '56px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #0A1628 0%, #1E3A5F 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isMobile ? '20px' : '24px',
                boxShadow: '0 8px 20px rgba(10, 22, 40, 0.2)',
              }}>
                🔐
              </div>
              <div>
                <div style={{ fontFamily: '"Playfair Display", serif', fontSize: isMobile ? '18px' : '20px', fontWeight: '700', color: '#0A1628' }}>
                  Connexion Administrateur
                </div>
                <div style={{ fontSize: isMobile ? '12px' : '13px', color: '#64748B', fontWeight: '500' }}>
                  Identifiez-vous pour accéder au panneau
                </div>
              </div>
            </div>

            {attempts > 0 && attempts < 3 && (
              <div style={styles.warning}>
                <span>⚠️</span>
                <span>
                  {attempts} tentative{attempts > 1 ? 's' : ''} échouée{attempts > 1 ? 's' : ''}.
                  Verrouillage après 3 tentatives.
                </span>
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div style={styles.error}>
              <span style={{ fontSize: '16px' }}>🚫</span>
              <span>{error}</span>
            </div>
          )}

          {/* Lock Message */}
          {locked && (
            <div style={styles.lockMessage}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '18px' }}>🔒</span>
                <span style={{ fontWeight: '700', color: '#DC2626', fontSize: '14px' }}>
                  Compte temporairement verrouillé
                </span>
              </div>
              <div style={{ fontSize: '12px', color: '#EF4444' }}>
                Trop de tentatives échouées. Réessayez dans {getLockTimeRemaining()} minutes.
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span>Email administrateur</span>
                <span style={{ color: '#D4AF37' }}> *</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  placeholder="admin@smartrecruit.com"
                  value={form.email}
                  onChange={set('email')}
                  disabled={locked}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  style={styles.input}
                />
                <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px' }}>
                  ✉️
                </span>
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span>Mot de passe</span>
                <span style={{ color: '#D4AF37' }}> *</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={form.password}
                  onChange={set('password')}
                  disabled={locked}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  style={styles.input}
                />
                <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px' }}>
                  🔑
                </span>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={locked}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: locked ? 'not-allowed' : 'pointer',
                    fontSize: '16px',
                    opacity: locked ? 0.5 : 1,
                  }}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || locked}
              style={styles.button}
              onMouseEnter={(e) => {
                if (!loading && !locked && !isMobile) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(10, 22, 40, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading && !locked && !isMobile) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(10, 22, 40, 0.3)';
                }
              }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span className="spinner" style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid #fff',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                  }}></span>
                  {isMobile ? 'Vérification...' : 'Vérification en cours...'}
                </span>
              ) : locked ? (
                '🔒 Compte verrouillé'
              ) : (
                isMobile ? '🛡️ Connexion Admin' : '🛡️ Accéder au panneau d\'administration'
              )}
            </button>
          </form>

          {/* Back Link */}
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <button
              type="button"
              onClick={() => navigate('/')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#64748B',
                fontSize: '13px',
                fontWeight: '500',
                fontFamily: '"Inter", sans-serif',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#0A1628'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#64748B'}
            >
              ← Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

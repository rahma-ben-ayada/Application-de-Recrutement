import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Callback() {
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuth();

  useEffect(() => {
    console.log('=== FRONTEND CALLBACK DEBUG ===');
    console.log('Current pathname:', window.location.pathname);

    // Only process if we're actually on the callback page
    if (!window.location.pathname.includes('/auth/callback')) {
      console.log('Not on callback page, skipping processing');
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const userParam = params.get('user');

    console.log('Token present:', !!token);
    console.log('User param present:', !!userParam);
    console.log('Current URL:', window.location.href);

    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        console.log('Parsed user:', user);
        console.log('User role:', user.role);

        // Store authentication data first
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        console.log('Authentication data stored in localStorage');

        // Update auth context
        loginWithGoogle(token, user);
        console.log('User logged in successfully');

        // Force a small delay to ensure state is updated
        setTimeout(() => {
          // Redirect based on role
          if (user.role === 'recruteur') {
            console.log('Redirecting to recruteur dashboard');
            navigate('/recruteur/dashboard', { replace: true });
          } else if (user.role === 'candidat') {
            console.log('Redirecting to candidat offres');
            navigate('/candidat/offres', { replace: true });
          } else {
            console.log('Unknown role, redirecting to login');
            navigate('/login', { replace: true });
          }
        }, 100);
      } catch (error) {
        console.error('Error parsing user data:', error);
        navigate('/login?error=auth_failed', { replace: true });
      }
    } else {
      console.error('Missing token or user parameter');
      console.error('Redirecting to login with error');
      navigate('/login?error=auth_failed', { replace: true });
    }
  }, [navigate, loginWithGoogle]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }}>
      <div style={{
        textAlign: 'center',
        color: '#FFFFFF',
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid rgba(255, 255, 255, 0.3)',
          borderTopColor: '#FFFFFF',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 1rem',
        }} />
        <p style={{ fontSize: '1.125rem', fontWeight: 500 }}>
          Connexion en cours...
        </p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Header({ title }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{
      height: '64px',
      background: '#fff',
      borderBottom: '1px solid #E2E8F0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      boxShadow: '0 1px 3px rgba(15,23,42,.06)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Titre page */}
      <h2 style={{
        fontFamily: 'Syne, sans-serif',
        fontSize: '18px',
        fontWeight: '700',
        color: '#1E293B',
      }}>
        {title}
      </h2>

      {/* Profil + Déconnexion */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '14px', fontWeight: '500', color: '#1E293B' }}>
            {user?.name || 'Administrateur'}
          </div>
          <div style={{ fontSize: '12px', color: '#94A3B8' }}>
            {user?.role || 'admin'}
          </div>
        </div>

        <div style={{
          width: '38px', height: '38px',
          borderRadius: '50%',
          background: '#1E3A8A',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: '700', fontSize: '15px',
          fontFamily: 'Syne, sans-serif',
        }}>
          {(user?.name || 'A')[0].toUpperCase()}
        </div>

        <button
          onClick={handleLogout}
          style={{
            background: '#FEF2F2',
            color: '#EF4444',
            border: 'none',
            borderRadius: '50px',
            padding: '8px 16px',
            fontSize: '13px',
            cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: '500',
          }}
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
}
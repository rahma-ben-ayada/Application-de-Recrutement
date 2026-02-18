import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ user }) {
  const navigate = useNavigate();

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
    }}>
      <div style={{
        fontFamily: 'Syne, sans-serif',
        fontSize: '20px',
        fontWeight: '800',
        color: '#1E3A8A',
      }}>
        Smart<span style={{ color: '#2563EB' }}>Recruit</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '14px', color: '#475569' }}>
          {user?.name || 'Utilisateur'}
        </span>
        <button
          onClick={() => navigate('/login')}
          style={{
            background: '#FEF2F2',
            color: '#EF4444',
            border: 'none',
            borderRadius: '50px',
            padding: '8px 16px',
            fontSize: '13px',
            cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
}
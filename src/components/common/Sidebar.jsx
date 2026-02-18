import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const menus = {
  admin: [
    { label: 'Dashboard',      icon: '📊', path: '/admin/dashboard' },
    { label: 'Utilisateurs',   icon: '👥', path: '/admin/utilisateurs' },
    { label: 'Offres',         icon: '📋', path: '/admin/offres' },
    { label: 'Rapports',       icon: '📈', path: '/admin/rapports' },
    { label: 'Paramètres',     icon: '⚙️', path: '/admin/parametres' },
  ],
  recruteur: [
    { label: 'Dashboard',      icon: '📊', path: '/recruteur/dashboard' },
    { label: 'Mes Offres',     icon: '📋', path: '/recruteur/offres' },
    { label: 'Candidatures',   icon: '📨', path: '/recruteur/candidatures' },
    { label: 'Entretiens',     icon: '🎯', path: '/recruteur/entretiens' },
    { label: 'Profil',         icon: '👤', path: '/recruteur/profil' },
  ],
  candidat: [
    { label: 'Dashboard',      icon: '📊', path: '/candidat/dashboard' },
    { label: 'Offres d\'emploi', icon: '🔍', path: '/candidat/offres' },
    { label: 'Mes Candidatures', icon: '📨', path: '/candidat/candidatures' },
    { label: 'Mon CV',         icon: '📄', path: '/candidat/cv' },
    { label: 'Profil',         icon: '👤', path: '/candidat/profil' },
  ],
};

export default function Sidebar({ role = 'admin' }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{
      width: '240px',
      minHeight: '100vh',
      background: '#0F172A',
      padding: '24px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    }}>
      <div style={{
        fontFamily: 'Syne, sans-serif',
        fontSize: '20px',
        fontWeight: '800',
        color: '#fff',
        padding: '8px 12px',
        marginBottom: '24px',
      }}>
        Smart<span style={{ color: '#60A5FA' }}>Recruit</span>
      </div>

      {menus[role].map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '14px',
              fontWeight: '500',
              background: isActive ? '#1E3A8A' : 'transparent',
              color: isActive ? '#fff' : '#94A3B8',
              width: '100%',
              textAlign: 'left',
              transition: '220ms cubic-bezier(.4,0,.2,1)',
            }}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
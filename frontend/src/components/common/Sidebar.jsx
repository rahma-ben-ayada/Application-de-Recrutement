import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const menus = {
  admin: [
    { label: 'Dashboard',    icon: '📊', path: '/admin/dashboard' },
    { label: 'Recruteurs',   icon: '🏢', path: '/admin/recruteurs' },
    { label: 'Candidats',    icon: '👤', path: '/admin/candidats' },
    { label: 'Offres',       icon: '📋', path: '/admin/offres' },
    { label: 'Paramètres',   icon: '⚙️', path: '/admin/parametres' },
  ],
  recruteur: [
    { label: 'Dashboard',    icon: '📊', path: '/recruteur/dashboard' },
    { label: 'Mes Offres',   icon: '📋', path: '/recruteur/offres' },
    { label: 'Candidatures', icon: '📨', path: '/recruteur/candidatures' },
    { label: 'Entretiens',   icon: '🎯', path: '/recruteur/entretiens' },
    { label: 'Profil',       icon: '👤', path: '/recruteur/profil' },
  ],
  candidat: [
    { label: "Offres d'emploi",  icon: '🔍', path: '/candidat/offres' },
    { label: 'Mes Candidatures', icon: '📨', path: '/candidat/candidatures' },
    { label: 'Mon CV',           icon: '📄', path: '/candidat/cv' },
    { label: 'Profil',           icon: '👤', path: '/candidat/profil' },
    { label: 'Paramètres',       icon: '⚙️', path: '/candidat/parametres' },
  ],
};

export default function Sidebar({ role = 'admin' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{
      width: collapsed ? '70px' : '240px',
      minHeight: '100vh',
      background: '#0F172A',
      padding: '24px 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      transition: '220ms cubic-bezier(.4,0,.2,1)',
      position: 'relative',
      flexShrink: 0,
    }}>
      {/* Logo — cliquable vers dashboard */}
      <div
        onClick={() => navigate(`/${role}/dashboard`)}
        style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: collapsed ? '14px' : '20px',
          fontWeight: '800',
          color: '#fff',
          padding: '8px 12px',
          marginBottom: '16px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        {collapsed ? 'SR' : <>Smart<span style={{ color: '#60A5FA' }}>Recruit</span></>}
      </div>

      {/* Bouton collapse */}
      <button
        onClick={() => setCollapsed(c => !c)}
        style={{
          position: 'absolute',
          right: '-12px',
          top: '72px',
          width: '24px', height: '24px',
          borderRadius: '50%',
          background: '#1E3A8A',
          border: '2px solid #0F172A',
          color: '#fff',
          fontSize: '11px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        {collapsed ? '›' : '‹'}
      </button>

      {/* Role badge */}
      {!collapsed && (
        <div style={{
          background: '#1E3A8A',
          borderRadius: '8px',
          padding: '6px 12px',
          fontSize: '11px',
          color: '#60A5FA',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '.05em',
          marginBottom: '12px',
        }}>
          {role === 'admin' ? '🛡 Administrateur' : role === 'recruteur' ? '🏢 Recruteur' : '👤 Candidat'}
        </div>
      )}

      {/* Menu items */}
      {menus[role].map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            title={collapsed ? item.label : ''}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: collapsed ? '0' : '12px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              padding: '12px',
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
              transition: '150ms',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#1E293B'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94A3B8'; }}
          >
            <span style={{ fontSize: '18px', flexShrink: 0 }}>{item.icon}</span>
            {!collapsed && item.label}
          </button>
        );
      })}
    </div>
  );
}
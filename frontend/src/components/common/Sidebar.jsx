import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const menus = {
  admin: [
    { label: 'Dashboard',  icon: '📊', path: '/admin/dashboard' },
    { label: 'Recruteurs', icon: '🏢', path: '/admin/recruteurs' },
    { label: 'Candidats',  icon: '👤', path: '/admin/candidats' },
    { label: 'Offres',     icon: '📋', path: '/admin/offres' },
    { label: 'Paramètres', icon: '⚙️', path: '/admin/parametres' },
  ],
  recruteur: [
    { label: 'Dashboard',    icon: '📊', path: '/recruteur/dashboard' },
    { label: 'Mes Offres',   icon: '📋', path: '/recruteur/offres' },
    { label: 'Candidatures', icon: '📨', path: '/recruteur/candidatures' },
    { label: 'Entretiens',  icon: '🎯', path: '/recruteur/entretiens' },
    { label: 'Planifier',   icon: '📅', path: '/recruteur/planifier' },
    { label: 'Profil',       icon: '👤', path: '/recruteur/profil' },
  ],
  candidat: [
    { label: "Offres d'emploi",  icon: '🔍', path: '/candidat/offres' },
    { label: 'Mes Favoris',      icon: '⭐', path: '/candidat/favoris' },
    { label: 'Alertes',          icon: '🔔', path: '/candidat/alertes' },
    { label: 'Mes Candidatures', icon: '📨', path: '/candidat/candidatures' },
    { label: 'Mes Entretiens',   icon: '🎯', path: '/candidat/entretiens' },
    { label: 'Reviews',          icon: '⭐', path: '/candidat/reviews' },
    { label: 'Profil',           icon: '👤', path: '/candidat/profil' },
    { label: 'Paramètres',       icon: '⚙️', path: '/candidat/parametres' },
  ],
};

export default function Sidebar({ role = 'admin', isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Use user's role from AuthContext if available, otherwise use prop
  const userRole = user?.role || role;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div className="sidebar-mobile-overlay" onClick={onClose} />
      )}

      <div
        className={`sidebar ${collapsed ? 'collapsed' : ''} ${isOpen ? 'open' : ''}`}
      >
        {/* Mobile close button */}
        {isMobile && (
          <button
            className="sidebar-close-button"
            onClick={onClose}
            aria-label="Fermer le menu"
          >
            ✕
          </button>
        )}

        {/* Logo */}
        <div
          className="sidebar-logo"
          onClick={() => handleNavigate('/')}
        >
          {collapsed && !isMobile ? 'SR' : (
            <>
              Smart<span className="sidebar-logo-text">Recruit</span>
            </>
          )}
        </div>

        {/* Collapse button (desktop only) */}
        <button
          className="sidebar-collapse-button"
          onClick={() => setCollapsed(c => !c)}
          aria-label={collapsed ? 'Développer' : 'Réduire'}
        >
          {collapsed ? '›' : '‹'}
        </button>

        {/* Role badge */}
        <div className="sidebar-role-badge">
          {userRole === 'admin' ? '🛡 Administrateur' : userRole === 'recruteur' ? '🏢 Recruteur' : '👤 Candidat'}
        </div>

        {/* Menu items */}
        <div className="sidebar-menu">
          {menus[userRole]?.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                className={`sidebar-menu-item ${isActive ? 'active' : ''}`}
                onClick={() => handleNavigate(item.path)}
                title={collapsed ? item.label : ''}
              >
                <span className="sidebar-menu-icon">{item.icon}</span>
                <span className="sidebar-menu-text">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

// Export a toggle button component for mobile
export function SidebarToggle({ onClick }) {
  return (
    <button
      className="sidebar-mobile-toggle"
      onClick={onClick}
      aria-label="Ouvrir le menu"
    >
      ☰
    </button>
  );
}

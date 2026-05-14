import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SidebarToggle } from './Sidebar';
import NotificationCenter from './NotificationCenter';
import './Header.css';

export default function Header({ title, onMenuToggle }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // ✅ FIX : user.nom au lieu de user.name
  const displayName = user?.nom || user?.name || 'Utilisateur';
  const displayRole = user?.role || '';

  return (
    <div className="header">
      <div className="header-left">
        <SidebarToggle onClick={onMenuToggle} />
        <h2 className="header-title">{title}</h2>
      </div>

      <div className="header-right">
        {/* Notifications */}
        <NotificationCenter />

        {/* Desktop user info */}
        <div className="header-user-info">
          <div className="header-user-name">{displayName}</div>
          <div className="header-user-role">{displayRole}</div>
        </div>

        {/* Desktop avatar and logout */}
        <div className="header-avatar">{displayName[0].toUpperCase()}</div>
        <button className="header-logout-button" onClick={handleLogout}>
          Déconnexion
        </button>

        {/* Mobile avatar and logout */}
        <div className="header-mobile-user">
          <div className="header-mobile-avatar">{displayName[0].toUpperCase()}</div>
          <button className="header-mobile-logout" onClick={handleLogout} aria-label="Déconnexion">
            ⏻
          </button>
        </div>
      </div>
    </div>
  );
}

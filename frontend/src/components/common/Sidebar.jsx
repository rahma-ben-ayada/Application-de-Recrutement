import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSidebar } from '../../context/SidebarContext';
import { useAlert } from '../../context/AlertContext';
import './Sidebar.css';

// Modern SVG Icons
const Icons = {
  dashboard: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  building: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
      <path d="M9 22v-4h6v4"/>
      <path d="M8 6h.01"/>
      <path d="M16 6h.01"/>
      <path d="M8 10h.01"/>
      <path d="M16 10h.01"/>
      <path d="M8 14h.01"/>
      <path d="M16 14h.01"/>
      <path d="M8 18h.01"/>
      <path d="M16 18h.01"/>
    </svg>
  ),
  users: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  briefcase: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  settings: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  fileText: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <line x1="10" y1="9" x2="8" y2="9"/>
    </svg>
  ),
  target: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  calendar: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  search: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  bell: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
  inbox: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
    </svg>
  ),
  user: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  logout: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  menu: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  close: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  chevronRight: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  chevronLeft: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  ),
};

// Local storage key for sidebar state
const SIDEBAR_COLLAPSED_KEY = 'sidebar_collapsed';
const SIDEBAR_ANIMATION_DURATION = 300;

const menus = {
  admin: [
    {
      label: 'Dashboard',
      icon: Icons.dashboard,
      path: '/admin/dashboard',
      description: 'Vue d\'ensemble',
      color: '#5B73F7'
    },
    {
      label: 'Recruteurs',
      icon: Icons.building,
      path: '/admin/recruteurs',
      description: 'Gérer les recruteurs',
      color: '#10B981'
    },
    {
      label: 'Candidats',
      icon: Icons.users,
      path: '/admin/candidats',
      description: 'Voir les candidats',
      color: '#8B5CF6'
    },
    {
      label: 'Offres',
      icon: Icons.briefcase,
      path: '/admin/offres',
      description: 'Gérer les offres',
      color: '#F59E0B'
    },
    {
      label: 'Paramètres',
      icon: Icons.settings,
      path: '/admin/parametres',
      description: 'Configuration',
      color: '#6B7280'
    },
  ],
  recruteur: [
    {
      label: 'Dashboard',
      icon: Icons.dashboard,
      path: '/recruteur/dashboard',
      description: 'Statistiques',
      color: '#5B73F7'
    },
    {
      label: 'Mes Offres',
      icon: Icons.briefcase,
      path: '/recruteur/offres',
      description: 'Gérer les offres',
      color: '#10B981'
    },
    {
      label: 'Candidatures',
      icon: Icons.inbox,
      path: '/recruteur/candidatures',
      description: 'Candidatures reçues',
      color: '#06B6D4'
    },
    {
      label: 'Entretiens',
      icon: Icons.target,
      path: '/recruteur/entretiens',
      description: 'Entretiens planifiés',
      color: '#F59E0B'
    },
    {
      label: 'Planifier',
      icon: Icons.calendar,
      path: '/recruteur/planifier',
      description: 'Nouvel entretien',
      color: '#8B5CF6'
    },
    {
      label: 'Profil',
      icon: Icons.user,
      path: '/recruteur/profil',
      description: 'Mon profil',
      color: '#6B7280'
    },
  ],
  candidat: [
    {
      label: "Offres d'emploi",
      icon: Icons.search,
      path: '/candidat/offres',
      description: 'Trouver des offres',
      color: '#5B73F7'
    },
    {
      label: 'Alertes',
      icon: Icons.bell,
      path: '/candidat/alertes',
      description: 'Notifications',
      color: '#EF4444',
      isAlert: true
    },
    {
      label: 'Mes Candidatures',
      icon: Icons.fileText,
      path: '/candidat/candidatures',
      description: 'Candidatures envoyées',
      color: '#06B6D4'
    },
    {
      label: 'Mes Entretiens',
      icon: Icons.target,
      path: '/candidat/entretiens',
      description: 'Mes entretiens',
      color: '#10B981'
    },
    {
      label: 'Profil',
      icon: Icons.user,
      path: '/candidat/profil',
      description: 'Mon profil',
      color: '#6B7280'
    },
    {
      label: 'Paramètres',
      icon: Icons.settings,
      path: '/candidat/parametres',
      description: 'Configuration',
      color: '#6B7280'
    },
  ],
};

export default function Sidebar({ role = 'admin', isOpen: isOpenProp, onClose: onCloseProp }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const {
    isOpen: contextIsOpen,
    isCollapsed,
    openSidebar,
    closeSidebar,
    toggleCollapse,
  } = useSidebar();

  // Use context state if available, otherwise use props (for backward compatibility)
  const isOpen = contextIsOpen ?? isOpenProp;
  const onClose = onCloseProp || closeSidebar;
  const { unreadCount: alertCount } = useAlert();

  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);

  // Use user's role from AuthContext if available, otherwise use prop
  const userRole = user?.role || role;

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar on ESC key press (mobile only)
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobile && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, isMobile]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isMobile, isOpen]);

  // Handle close with animation
  const handleClose = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      onClose();
      setIsAnimating(false);
    }, SIDEBAR_ANIMATION_DURATION);
  }, [onClose]);

  // Toggle collapsed state (using context)
  const handleToggleCollapse = useCallback(() => {
    toggleCollapse();
  }, [toggleCollapse]);

  // Handle navigation with automatic mobile sidebar close
  const handleNavigate = useCallback((path) => {
    navigate(path);
    if (isMobile && isOpen) {
      handleClose();
    }
  }, [navigate, isMobile, isOpen, handleClose]);

  const menuItems = menus[userRole] || [];

  // Generate animation classes
  const animationClasses = [];
  if (isAnimating) animationClasses.push('sidebar-closing');
  if (isOpen) animationClasses.push('sidebar-open');
  if (isCollapsed && !isMobile) animationClasses.push('collapsed');

  return (
    <>
      {/* Mobile overlay with improved animation */}
      {isMobile && isOpen && (
        <div
          className={`sidebar-mobile-overlay ${isAnimating ? 'overlay-closing' : ''}`}
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      <div
        className={`sidebar ${animationClasses.join(' ')}`}
        aria-hidden={isMobile && !isOpen}
      >
        {/* Mobile close button */}
        {isMobile && (
          <button
            className="sidebar-close-button"
            onClick={onClose}
            aria-label="Fermer le menu"
          >
            {Icons.close}
          </button>
        )}

        {/* Logo */}
        <div
          className="sidebar-logo"
          onClick={() => handleNavigate('/')}
        >
          {isCollapsed && !isMobile ? (
            <div className="sidebar-logo-icon">SR</div>
          ) : (
            <div className="sidebar-logo-full">
              <div className="sidebar-logo-icon">SR</div>
              <span className="sidebar-logo-text">SmartRecruit</span>
            </div>
          )}
        </div>

        {/* Collapse button (desktop only) */}
        <button
          className="sidebar-collapse-button"
          onClick={handleToggleCollapse}
          aria-label={isCollapsed ? 'Développer' : 'Réduire'}
          aria-pressed={isCollapsed}
          type="button"
        >
          {isCollapsed ? Icons.chevronRight : Icons.chevronLeft}
        </button>

        {/* User info */}
        {!isCollapsed && (
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">
              {user?.photo || '👤'}
            </div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user?.nom || 'Utilisateur'}</div>
              <div className="sidebar-user-role">
                {userRole === 'admin' ? '🛡 Administrateur' : userRole === 'recruteur' ? '🏢 Recruteur' : '👤 Candidat'}
              </div>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="sidebar-divider" />

        {/* Menu items */}
        <div className="sidebar-menu">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            const badge = item.isAlert ? alertCount : item.badge;
            return (
              <button
                key={item.path}
                className={`sidebar-menu-item ${isActive ? 'active' : ''}`}
                onClick={() => handleNavigate(item.path)}
                title={isCollapsed ? item.label : ''}
              >
                <span
                  className="sidebar-menu-icon"
                  style={{ color: isActive ? item.color : 'inherit' }}
                >
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <>
                    <span className="sidebar-menu-text">{item.label}</span>
                    {badge && badge > 0 && (
                      <span className="sidebar-menu-badge">{badge}</span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar footer */}
        {!isCollapsed && (
          <div className="sidebar-footer">
            <div className="sidebar-footer-item">
              <span className="sidebar-footer-icon">{Icons.logout}</span>
              <button
                className="sidebar-footer-link"
                onClick={() => {
                  localStorage.removeItem('token');
                  navigate('/login');
                }}
              >
                Déconnexion
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// Export a toggle button component for mobile
export function SidebarToggle({ onClick }) {
  const { toggleSidebar, isOpen } = useSidebar();

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    } else {
      toggleSidebar();
    }
  }, [onClick, toggleSidebar]);

  return (
    <button
      className="sidebar-mobile-toggle"
      onClick={handleClick}
      aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
      aria-pressed={isOpen}
      type="button"
    >
      {isOpen ? Icons.close : Icons.menu}
    </button>
  );
}

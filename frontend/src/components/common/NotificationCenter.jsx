import React, { useState, useRef, useEffect } from 'react';
import { useSocket } from '../../context/SocketContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import notificationService from '../../services/notificationService';
import './NotificationCenter.css';

export default function NotificationCenter() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    cleanupOldNotifications,
    requestNotificationPermission,
  } = useSocket();

  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Request notification permission on first interaction
  const handleBellClick = async () => {
    if (!isOpen) {
      await requestNotificationPermission();
    }
    setIsOpen(!isOpen);
  };

  const handleNotificationClick = async (notification) => {
    // Marquer comme lu
    if (!notification.lu && notification._id) {
      await markAsRead(notification._id);
    }

    // Fermer le dropdown
    setIsOpen(false);

    // Déterminer la page de destination
    let targetPath = notification.lien;

    // Si pas de lien, utiliser le routage par défaut
    if (!targetPath || targetPath === '') {
      targetPath = notificationService.getDefaultRouteForType(notification.type, user?.role || 'candidat');
    }

    // Naviguer vers la page correspondante
    if (targetPath) {
      // Utiliser window.location pour les liens absolus
      if (targetPath.startsWith('http')) {
        window.location.href = targetPath;
      } else {
        // Utiliser react-router pour les liens relatifs
        navigate(targetPath);
      }
    }
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  const handleCleanup = async () => {
    if (window.confirm('Supprimer toutes les notifications lues de plus de 30 jours ?')) {
      await cleanupOldNotifications();
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.lu;
    return n.type === filter;
  });

  const filterOptions = [
    { value: 'all', label: 'Toutes', icon: '📬' },
    { value: 'unread', label: 'Non lues', icon: '🔵' },
    { value: 'candidature', label: 'Candidatures', icon: '📄' },
    { value: 'entretien', label: 'Entretiens', icon: '📅' },
    { value: 'offre', label: 'Offres', icon: '💼' },
  ];

  return (
    <div className="notification-center" ref={dropdownRef}>
      <button
        className={`notification-bell ${isOpen ? 'active' : ''}`}
        onClick={handleBellClick}
        aria-label="Notifications"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <div className="notification-header-left">
              <h3>Notifications</h3>
              {unreadCount > 0 && (
                <span className="notification-count">{unreadCount}</span>
              )}
            </div>
            <div className="notification-actions">
              {unreadCount > 0 && (
                <button onClick={handleMarkAllAsRead} className="action-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Tout lire
                </button>
              )}
              <button onClick={handleCleanup} className="action-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <div className="notification-filters">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                className={`filter-btn ${filter === option.value ? 'active' : ''}`}
                onClick={() => setFilter(option.value)}
              >
                <span className="filter-icon">{option.icon}</span>
                <span className="filter-label">{option.label}</span>
              </button>
            ))}
          </div>

          <div className="notification-list">
            {filteredNotifications.length === 0 ? (
              <div className="notification-empty">
                <div className="empty-icon">🔔</div>
                <p>Aucune notification</p>
                <small>Vous serez notifié ici des nouvelles activités</small>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <NotificationItem
                  key={notification._id || notification.id}
                  notification={notification}
                  onClick={() => handleNotificationClick(notification)}
                  onDelete={async () => {
                    await deleteNotification(notification._id);
                  }}
                />
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="notification-footer">
              <button onClick={() => navigate('/notifications')} className="view-all-btn">
                Voir toutes les notifications
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function NotificationItem({ notification, onClick, onDelete }) {
  const typeConfig = notificationService.getNotificationTypeConfig(notification.type);
  const relativeTime = notificationService.getRelativeTime(notification.createdAt);

  return (
    <div
      className={`notification-card ${!notification.lu ? 'unread' : ''}`}
      onClick={onClick}
    >
      <div className="notification-card-wrapper">
        <div
          className="notification-card-icon"
          style={{ backgroundColor: typeConfig.bgColor, color: typeConfig.color }}
        >
          {typeConfig.icon}
        </div>

        <div className="notification-card-content">
          <div className="notification-card-header">
            <h4 className="notification-card-title">{notification.titre}</h4>
            <div className="notification-card-meta">
              <span className="notification-card-type">{typeConfig.label}</span>
              <span className="notification-card-time">{relativeTime}</span>
            </div>
          </div>

          <p className="notification-card-message">{notification.message}</p>

          <div className="notification-card-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5l7 7-7 7" />
            </svg>
            Cliquez pour voir les détails
          </div>
        </div>

        <div className="notification-card-actions">
          <button
            className="notification-card-delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            aria-label="Supprimer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {!notification.lu && <div className="notification-card-indicator" />}
    </div>
  );
}

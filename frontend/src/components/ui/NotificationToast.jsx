import React, { useEffect, useState } from 'react';
import './NotificationToast.css';

export default function NotificationToast({ notifications, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (notifications.length > 0) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => onClose(), 300);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notifications, onClose]);

  if (notifications.length === 0) return null;

  return (
    <div className={`notification-toast ${visible ? 'show' : ''}`}>
      <div className="notification-content">
        <div className="notification-icon">🔔</div>
        <div className="notification-body">
          <div className="notification-title">
            {notifications.length === 1 ? 'Nouvelle alerte' : `${notifications.length} nouvelles alertes`}
          </div>
          <div className="notification-message">
            {notifications.map((notif, i) => (
              <div key={i} className="notification-item">
                {notif.message}
              </div>
            ))}
          </div>
        </div>
        <button
          className="notification-close"
          onClick={() => {
            setVisible(false);
            setTimeout(() => onClose(), 300);
          }}
          aria-label="Fermer"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

// Hook for managing notifications
export function useNotifications() {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message }]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
  };
}

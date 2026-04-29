import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';
import alerteService from '../services/alerteService';

const AlertContext = createContext();

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export const AlertProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [alertStats, setAlertStats] = useState(null);

  // Fetch alert stats on mount and when user changes
  useEffect(() => {
    if (user?.role === 'candidat') {
      fetchAlertStats();

      // Start automatic alert checking for candidates
      alerteService.startChecking((notification) => {
        addNotification(notification);
      }, 30); // Check every 30 minutes

      return () => {
        alerteService.stopChecking();
      };
    }
  }, [user]);

  const fetchAlertStats = async () => {
    const stats = await alerteService.getStats();
    if (stats) {
      setAlertStats(stats);
      setUnreadCount(stats.actives || 0);
    }
  };

  const addNotification = useCallback((notification) => {
    const id = Date.now() + Math.random();
    setNotifications(prev => [...prev, { ...notification, id, read: false }]);
    setUnreadCount(prev => prev + 1);

    // Play notification sound if available
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Nouvelle offre d\'emploi', {
        body: notification.message,
        icon: '/favicon.ico',
      });
    }
  }, []);

  const markAsRead = useCallback((id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
    setUnreadCount(0);
  }, []);

  const refreshAlerts = useCallback(async () => {
    const result = await alerteService.checkAlertes((notification) => {
      addNotification(notification);
    });
    await fetchAlertStats();
    return result;
  }, [addNotification]);

  // Request notification permission
  const requestNotificationPermission = useCallback(async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return Notification.permission === 'granted';
  }, []);

  const value = {
    notifications,
    unreadCount,
    alertStats,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearNotifications,
    refreshAlerts,
    requestNotificationPermission,
    fetchAlertStats,
  };

  return (
    <AlertContext.Provider value={value}>
      {children}
    </AlertContext.Provider>
  );
};

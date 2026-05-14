import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { io } from 'socket.io-client';
import notificationService from '../services/notificationService';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setConnected(false);
      }
      return;
    }

    // Initialiser Socket.io
    const socketUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    const newSocket = io(socketUrl, {
      auth: {
        token: localStorage.getItem('token'),
      },
      transports: ['websocket', 'polling'],
    });

    newSocket.on('connect', () => {
      console.log('🔌 Socket connecté:', newSocket.id);
      setConnected(true);

      // Rejoindre les rooms
      newSocket.emit('join-user-room', user._id);
      newSocket.emit('join-role-room', user.role);
    });

    newSocket.on('disconnect', () => {
      console.log('🔌 Socket déconnecté');
      setConnected(false);
    });

    // Écouter les nouvelles notifications
    newSocket.on('nouvelle-notification', (notification) => {
      console.log('🔔 Nouvelle notification reçue:', notification);
      setNotifications(prev => [notification, ...prev]);
      setUnreadCount(prev => prev + 1);

      // Afficher une notification navigateur si autorisé
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(notification.titre, {
          body: notification.message,
          icon: '/favicon.ico',
          tag: notification._id,
        });
      }
    });

    // Écouter les notifications de rôle
    newSocket.on('notification-role', (data) => {
      console.log('📢 Notification de rôle:', data);
      // Ajouter aux notifications sans incrémenter le compteur
      setNotifications(prev => [{ ...data, isRoleNotification: true }, ...prev]);
    });

    setSocket(newSocket);

    // Charger les notifications initiales
    loadInitialNotifications();

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  const loadInitialNotifications = async () => {
    const data = await notificationService.getMyNotifications();
    if (data?.success) {
      setNotifications(data.notifications);
      setUnreadCount(data.nonLues);
    }
  };

  const markAsRead = async (notificationId) => {
    const data = await notificationService.markAsRead(notificationId);
    if (data?.success) {
      setNotifications(prev =>
        prev.map(n => n._id === notificationId ? { ...n, lu: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const markAllAsRead = async () => {
    const data = await notificationService.markAllAsRead();
    if (data?.success) {
      setNotifications(prev => prev.map(n => ({ ...n, lu: true })));
      setUnreadCount(0);
    }
  };

  const deleteNotification = async (notificationId) => {
    const data = await notificationService.deleteNotification(notificationId);
    if (data?.success) {
      setNotifications(prev => prev.filter(n => n._id !== notificationId));
      if (notifications.find(n => n._id === notificationId && !n.lu)) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    }
  };

  const cleanupOldNotifications = async () => {
    const data = await notificationService.cleanupOldNotifications();
    if (data?.success) {
      await loadInitialNotifications();
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return Notification.permission === 'granted';
  };

  const value = {
    socket,
    connected,
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    cleanupOldNotifications,
    requestNotificationPermission,
    refreshNotifications: loadInitialNotifications,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

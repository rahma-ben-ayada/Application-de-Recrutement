import React from 'react';
import { useAlert } from '../../context/AlertContext';
import NotificationToast from './NotificationToast';

export default function NotificationContainer() {
  const { notifications, clearNotifications } = useAlert();

  const handleNotificationClose = () => {
    clearNotifications();
  };

  // Show only the latest 3 notifications
  const latestNotifications = notifications.slice(-3);

  return (
    <>
      {latestNotifications.length > 0 && (
        <NotificationToast
          notifications={latestNotifications}
          onClose={handleNotificationClose}
        />
      )}
    </>
  );
}

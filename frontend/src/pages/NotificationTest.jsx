import React, { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import notificationService from '../services/notificationService';

export default function NotificationTest() {
  const { user } = useAuth();
  const { socket, connected, notifications, unreadCount, refreshNotifications } = useSocket();
  const [apiNotifications, setApiNotifications] = useState(null);
  const [loading, setLoading] = useState(false);

  const testFetchNotifications = async () => {
    setLoading(true);
    try {
      const data = await notificationService.getMyNotifications();
      console.log('📡 Test API Notifications:', data);
      setApiNotifications(data);
    } catch (error) {
      console.error('❌ Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTestNotification = async () => {
    if (!user) {
      alert('Vous devez être connecté');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          utilisateur: user._id || user.id,
          titre: '🧪 Test de notification',
          message: 'Ceci est une notification de test créée manuellement',
          type: 'info',
          lien: '/notifications',
          donnees: { test: true, timestamp: new Date() },
        }),
      });

      const data = await response.json();
      console.log('✅ Notification créée:', data);

      if (data.success) {
        alert('Notification créée avec succès! Vérifiez la cloche dans le header.');
        refreshNotifications();
      }
    } catch (error) {
      console.error('❌ Erreur:', error);
      alert('Erreur lors de la création de la notification');
    }
  };

  useEffect(() => {
    testFetchNotifications();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🧪 Page de Test des Notifications</h1>

      <div style={{ marginBottom: '20px' }}>
        <h2>État de la connexion</h2>
        <p><strong>Utilisateur:</strong> {user?.nom || 'Non connecté'}</p>
        <p><strong>Role:</strong> {user?.role || 'N/A'}</p>
        <p><strong>Socket.io:</strong> {connected ? '🟢 Connecté' : '🔴 Déconnecté'}</p>
        <p><strong>Socket ID:</strong> {socket?.id || 'N/A'}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Notifications depuis SocketContext</h2>
        <p><strong>Total:</strong> {notifications.length}</p>
        <p><strong>Non lues:</strong> {unreadCount}</p>
        <button onClick={refreshNotifications}>🔄 Rafraîchir</button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Notifications depuis l'API</h2>
        {loading ? (
          <p>Chargement...</p>
        ) : apiNotifications ? (
          <>
            <p><strong>Success:</strong> {apiNotifications.success ? '✅' : '❌'}</p>
            <p><strong>Total:</strong> {apiNotifications.notifications?.length || 0}</p>
            <p><strong>Non lues:</strong> {apiNotifications.nonLues || 0}</p>
          </>
        ) : (
          <p>Non chargé</p>
        )}
        <button onClick={testFetchNotifications} disabled={loading}>
          🔄 Recharger
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Actions de test</h2>
        <button onClick={createTestNotification} style={{ marginRight: '10px' }}>
          ➕ Créer une notification de test
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Dernières notifications</h2>
        {notifications.length === 0 ? (
          <p>Aucune notification</p>
        ) : (
          <ul>
            {notifications.slice(0, 5).map((notif, index) => (
              <li key={notif._id || index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                <strong>{notif.titre}</strong>
                <p>{notif.message}</p>
                <small>
                  Type: {notif.type} | Lue: {notif.lu ? '✅' : '❌'} | {new Date(notif.createdAt).toLocaleString('fr-FR')}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Console du navigateur</h2>
        <p>📋 Ouvrez la console du navigateur (F12) pour voir les logs de debug:</p>
        <ul>
          <li>Socket connection logs</li>
          <li>API response logs</li>
          <li>Notification creation logs</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <h3>💡 Instructions</h3>
        <ol>
          <li>Vérifiez que vous êtes connecté</li>
          <li>Vérifiez que Socket.io est connecté (vert)</li>
          <li>Cliquez sur "Créer une notification de test"</li>
          <li>Vérifiez que la notification apparaît dans la liste</li>
          <li>Vérifiez que le compteur dans le header s'incrémente</li>
        </ol>
      </div>
    </div>
  );
}

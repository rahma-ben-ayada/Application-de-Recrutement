import api from '../utils/api';

class NotificationService {
  // Récupérer les notifications de l'utilisateur
  async getMyNotifications() {
    try {
      const data = await api('/notifications/mes');
      return data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return null;
    }
  }

  // Marquer une notification comme lue
  async markAsRead(notificationId) {
    try {
      const data = await api(`/notifications/${notificationId}/lu`, 'PUT');
      return data;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return null;
    }
  }

  // Marquer toutes les notifications comme lues
  async markAllAsRead() {
    try {
      const data = await api('/notifications/tout-lu', 'PUT');
      return data;
    } catch (error) {
      console.error('Error marking all as read:', error);
      return null;
    }
  }

  // Supprimer une notification
  async deleteNotification(notificationId) {
    try {
      const data = await api(`/notifications/${notificationId}`, 'DELETE');
      return data;
    } catch (error) {
      console.error('Error deleting notification:', error);
      return null;
    }
  }

  // Nettoyer les anciennes notifications
  async cleanupOldNotifications() {
    try {
      const data = await api('/notifications/nettoyer', 'DELETE');
      return data;
    } catch (error) {
      console.error('Error cleaning up notifications:', error);
      return null;
    }
  }

  // Obtenir les statistiques des notifications
  async getStats() {
    try {
      const data = await api('/notifications/stats');
      return data;
    } catch (error) {
      console.error('Error fetching notification stats:', error);
      return null;
    }
  }

  // Créer une notification (admin only)
  async createNotification(notificationData) {
    try {
      const data = await api('/notifications', 'POST', notificationData);
      return data;
    } catch (error) {
      console.error('Error creating notification:', error);
      return null;
    }
  }

  // Formater le type de notification pour l'affichage
  getNotificationTypeConfig(type) {
    const configs = {
      info: {
        icon: 'ℹ️',
        color: '#3B82F6',
        bgColor: '#DBEAFE',
        label: 'Information'
      },
      success: {
        icon: '✅',
        color: '#10B981',
        bgColor: '#D1FAE5',
        label: 'Succès'
      },
      warning: {
        icon: '⚠️',
        color: '#F59E0B',
        bgColor: '#FEF3C7',
        label: 'Attention'
      },
      error: {
        icon: '❌',
        color: '#EF4444',
        bgColor: '#FEE2E2',
        label: 'Erreur'
      },
      candidature: {
        icon: '📄',
        color: '#8B5CF6',
        bgColor: '#EDE9FE',
        label: 'Candidature'
      },
      entretien: {
        icon: '📅',
        color: '#EC4899',
        bgColor: '#FCE7F3',
        label: 'Entretien'
      },
      offre: {
        icon: '💼',
        color: '#06B6D4',
        bgColor: '#CFFAFE',
        label: 'Offre'
      },
      alerte: {
        icon: '🔔',
        color: '#F97316',
        bgColor: '#FFEDD5',
        label: 'Alerte'
      },
      message: {
        icon: '💬',
        color: '#6366F1',
        bgColor: '#E0E7FF',
        label: 'Message'
      },
    };
    return configs[type] || configs.info;
  }

  // Formater la date relative
  getRelativeTime(date) {
    const now = new Date();
    const notificationDate = new Date(date);
    const diffInMs = now - notificationDate;
    const diffInMins = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / 3600000);
    const diffInDays = Math.floor(diffInMs / 86400000);

    if (diffInMins < 1) return 'À l\'instant';
    if (diffInMins < 60) return `Il y a ${diffInMins} min`;
    if (diffInHours < 24) return `Il y a ${diffInHours} h`;
    if (diffInDays < 7) return `Il y a ${diffInDays} j`;
    return notificationDate.toLocaleDateString('fr-FR');
  }

  // Obtenir le chemin de redirection par défaut basé sur le type
  getDefaultRouteForType(type, userRole) {
    const routes = {
      'candidat': {
        info: '/candidat/dashboard',
        success: '/candidat/dashboard',
        warning: '/candidat/dashboard',
        error: '/candidat/dashboard',
        candidature: '/candidat/mes-candidatures',
        entretien: '/candidat/entretiens',
        offre: '/candidat/offres',
        alerte: '/candidat/offres',
        message: '/candidat/messages',
      },
      'recruteur': {
        info: '/recruteur/dashboard',
        success: '/recruteur/dashboard',
        warning: '/recruteur/dashboard',
        error: '/recruteur/dashboard',
        candidature: '/recruteur/candidatures',
        entretien: '/recruteur/entretiens',
        offre: '/recruteur/offres',
        alerte: '/recruteur/offres',
        message: '/recruteur/messages',
      },
      'admin': {
        info: '/admin/dashboard',
        success: '/admin/dashboard',
        warning: '/admin/dashboard',
        error: '/admin/dashboard',
        candidature: '/admin/offres',
        entretien: '/admin/entretiens',
        offre: '/admin/offres',
        alerte: '/admin/dashboard',
        message: '/admin/dashboard',
      },
    };

    return routes[userRole]?.[type] || `/${userRole}/dashboard`;
  }
}

// Create singleton instance
const notificationService = new NotificationService();

export default notificationService;

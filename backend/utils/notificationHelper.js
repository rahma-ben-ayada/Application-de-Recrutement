const Notification = require('../models/Notification');

// Get io instance from server (will be initialized when server starts)
let io = null;

// Try to get io from the running server
const getIo = () => {
  if (!io) {
    try {
      // Try to get from the exported server
      const server = require('../server');
      if (server.io) {
        io = server.io;
        console.log('✅ Socket.io io instance récupérée du server');
      }
    } catch (error) {
      console.log('⚠️ Impossible de récupérer io depuis server:', error.message);
    }
  }
  return io;
};

/**
 * Helper pour créer des notifications pour différents événements
 */
class NotificationHelper {
  /**
   * Créer une notification pour un utilisateur spécifique
   */
  static async createNotification(userId, data) {
    try {
      console.log(`📝 Création notification pour user ${userId}:`, data.titre);

      const notification = await Notification.create({
        utilisateur: userId,
        titre: data.titre,
        message: data.message,
        type: data.type || 'info',
        lien: data.lien || '',
        donnees: data.donnees || {},
      });

      console.log(`✅ Notification créée avec ID: ${notification._id}`);

      // Émettre via Socket.io si disponible
      const socketIo = getIo();
      if (socketIo) {
        console.log(`🔌 Émission Socket.io vers user-${userId}`);
        socketIo.to(`user-${userId}`).emit('nouvelle-notification', notification);
      } else {
        console.log('⚠️ Socket.io non disponible pour notification utilisateur');
      }

      return notification;
    } catch (error) {
      console.error('❌ Erreur création notification:', error);
      return null;
    }
  }

  /**
   * Créer des notifications pour tous les utilisateurs d'un rôle
   */
  static async notifyRole(role, data) {
    try {
      const User = require('../models/User');
      const users = await User.find({ role, status: 'active' }).select('_id');

      console.log(`🔔 NotificationHelper.notifyRole: ${users.length} utilisateurs ${role} trouvés`);

      const notifications = [];

      for (const user of users) {
        console.log(`📧 Création notification pour utilisateur ${user._id}`);
        const notification = await this.createNotification(user._id, data);
        if (notification) {
          notifications.push(notification);
        }
      }

      console.log(`✅ ${notifications.length} notifications créées`);

      // Émettre via Socket.io pour tout le rôle
      const socketIo = getIo();
      if (socketIo) {
        console.log(`🔌 Émission Socket.io vers room role-${role}`);
        socketIo.to(`role-${role}`).emit('notification-role', {
          titre: data.titre,
          message: data.message,
          type: data.type,
        });
      } else {
        console.log('⚠️ Socket.io non disponible');
      }

      return notifications;
    } catch (error) {
      console.error('❌ Erreur notification rôle:', error);
      return [];
    }
  }

  // ===== NOTIFICATIONS CANDIDAT =====

  /**
   * Notification de changement de statut de candidature
   */
  static async candidatureStatutChange(candidatId, offreTitre, nouveauStatut) {
    const messages = {
      'en_attente': 'Votre candidature a été reçue et est en attente de traitement',
      'en_cours': 'Votre candidature est actuellement en cours d\'examen par le recruteur',
      'entretien': '🎉 Excellent ! Vous avez été sélectionné pour un entretien',
      'accepte': '🎊 Félicitations ! Vous avez obtenu le poste !',
      'refuse': 'Votre candidature n\'a pas été retenue pour ce poste',
    };

    const titres = {
      'en_attente': '📨 Candidature reçue',
      'en_cours': '👁️ Candidature en cours d\'examen',
      'entretien': '🎉 Sélectionné pour entretien',
      'accepte': '🎊 Candidature acceptée',
      'refuse': '❌ Candidature non retenue',
    };

    return this.createNotification(candidatId, {
      titre: titres[nouveauStatut] || 'Candidature mise à jour',
      message: `${offreTitre}: ${messages[nouveauStatut] || 'Statut mis à jour'}`,
      type: nouveauStatut === 'accepte' ? 'success' : nouveauStatut === 'refuse' ? 'error' : nouveauStatut === 'entretien' ? 'entretien' : 'info',
      lien: '/candidat/mes-candidatures',
      donnees: { offreTitre, statut: nouveauStatut, action: 'view_candidature' },
    });
  }

  /**
   * Notification de nouvel entretien planifié
   */
  static async nouvelEntretien(candidatId, entretienData) {
    const dateEntretien = new Date(entretienData.date);
    const dateStr = dateEntretien.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const heureStr = entretienData.heure || 'à définir';

    return this.createNotification(candidatId, {
      titre: '📅 Entretien confirmé',
      message: `Un entretien pour "${entretienData.offreTitre}" est planifié le ${dateStr} à ${heureStr}`,
      type: 'entretien',
      lien: '/candidat/entretiens',
      donnees: { entretienId: entretienData._id, date: entretienData.date, heure: entretienData.heure },
    });
  }

  /**
   * Notification d'alerte d'emploi correspondante
   */
  static async alerteOffre(candidatId, nombreOffres, alerteTitre) {
    return this.createNotification(candidatId, {
      titre: `🔔 ${nombreOffres} nouvelle(s) offre(s) correspondante(s)`,
      message: `${nombreOffres} offre(s) correspondent à votre alerte "${alerteTitre}". Consultez-les maintenant !`,
      type: 'alerte',
      lien: '/candidat/offres',
      donnees: { nombreOffres, alerteTitre },
    });
  }

  /**
   * Notification de message reçu
   */
  static async messageRecu(candidatId, expediteur, message) {
    return this.createNotification(candidatId, {
      titre: `💬 Nouveau message de ${expediteur}`,
      message: message.substring(0, 80) + (message.length > 80 ? '...' : ''),
      type: 'message',
      lien: '/candidat/messages',
      donnees: { expediteur },
    });
  }

  // ===== NOTIFICATIONS RECRUTEUR =====

  /**
   * Notification de nouvelle candidature
   */
  static async nouvelleCandidature(recruteurId, candidatNom, offreTitre) {
    return this.createNotification(recruteurId, {
      titre: '📄 Nouvelle candidature reçue',
      message: `${candidatNom} vient de postuler à votre offre "${offreTitre}". Consultez son profil maintenant !`,
      type: 'candidature',
      lien: '/recruteur/candidatures',
      donnees: { candidatNom, offreTitre },
    });
  }

  /**
   * Notification de rappel d'entretien
   */
  static async rappelEntretien(recruteurId, entretienData) {
    const dateEntretien = new Date(entretienData.date);
    const dateStr = dateEntretien.toLocaleDateString('fr-FR', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
    const heureStr = entretienData.heure || 'à définir';

    return this.createNotification(recruteurId, {
      titre: '📅 Rappel d\'entretien',
      message: `Entretien avec ${entretienData.candidatNom} prévu le ${dateStr} à ${heureStr}. Préparez-vous !`,
      type: 'entretien',
      lien: '/recruteur/entretiens',
      donnees: { entretienId: entretienData._id, candidatNom: entretienData.candidatNom },
    });
  }

  /**
   * Notification de statistiques hebdomadaires
   */
  static async statistiquesHebdo(recruteurId, stats) {
    return this.createNotification(recruteurId, {
      titre: '📊 Rapport hebdomadaire',
      message: `Cette semaine : ${stats.nouvellesCandidatures} nouvelles candidatures et ${stats.entretiensPlanifies} entretiens planifiés`,
      type: 'info',
      lien: '/recruteur/dashboard',
      donnees: stats,
    });
  }

  // ===== NOTIFICATIONS ADMIN =====

  /**
   * Notification de nouvel utilisateur inscrit
   */
  static async nouvelUtilisateur(userData) {
    const roleLabels = {
      'candidat': 'candidat',
      'recruteur': 'recruteur',
      'admin': 'administrateur'
    };

    const roleRedirects = {
      'candidat': '/admin/candidats',
      'recruteur': '/admin/recruteurs',
      'admin': '/admin/dashboard'
    };

    return this.notifyRole('admin', {
      titre: '👤 Nouveau compte créé',
      message: `${userData.nom} vient de s'inscrire en tant que ${roleLabels[userData.role] || userData.role}. Validez son compte.`,
      type: 'info',
      lien: roleRedirects[userData.role] || '/admin/dashboard',
      donnees: { userId: userData._id, role: userData.role, nom: userData.nom },
    });
  }

  /**
   * Notification de nouveau contenu signalé
   */
  static async nouveauSignalement(signalementData) {
    return this.notifyRole('admin', {
      titre: '🚨 Nouveau signalement à modérer',
      message: `Un ${signalementData.type} a été signalé et nécessite votre attention. Modérez-le maintenant.`,
      type: 'warning',
      lien: '/admin/moderation',
      donnees: signalementData,
    });
  }

  /**
   * Notification d'alerte système
   */
  static async alerteSysteme(message, type = 'warning') {
    return this.notifyRole('admin', {
      titre: '⚠️ Alerte système importante',
      message,
      type,
      lien: '/admin/dashboard',
      donnees: { timestamp: new Date() },
    });
  }

  /**
   * Notification de nouvel abonnement premium
   */
  static async nouvelAbonnement(abonnementData) {
    return this.notifyRole('admin', {
      titre: '💰 Nouvel abonnement Premium',
      message: `${abonnementData.userNom} vient de souscrire à l'abonnement ${abonnementData.plan}. Revenu généré !`,
      type: 'success',
      lien: '/admin/abonnements',
      donnees: abonnementData,
    });
  }

  // ===== NOTIFICATIONS GÉNÉRALES =====

  /**
   * Notification de maintenance planifiée
   */
  static async maintenancePlanifiee(date, duree) {
    const message = `Maintenance prévue le ${new Date(date).toLocaleDateString('fr-FR')} pour une durée de ${duree}`;

    return this.notifyRole('admin', {
      titre: '🔧 Maintenance planifiée',
      message,
      type: 'warning',
      lien: '/admin/dashboard',
      donnees: { date, duree },
    });
  }

  /**
   * Notification de nouvelle fonctionnalité
   */
  static async nouvelleFonctionnalite(role, featureData) {
    return this.notifyRole(role, {
      titre: '✨ Nouvelle fonctionnalité disponible !',
      message: featureData.description,
      type: 'success',
      lien: featureData.lien || '/',
      donnees: { featureName: featureData.name },
    });
  }

  /**
   * Notification de profil mis à jour
   */
  static async profilMisAJour(userId, role) {
    const routes = {
      'candidat': '/candidat/profil',
      'recruteur': '/recruteur/profil',
      'admin': '/admin/parametres',
    };

    return this.createNotification(userId, {
      titre: '✅ Profil mis à jour',
      message: 'Votre profil a été mis à jour avec succès',
      type: 'success',
      lien: routes[role] || '/dashboard',
      donnees: { role },
    });
  }

  /**
   * Notification de document uploadé
   */
  static async documentUploadé(userId, documentNom, role) {
    const routes = {
      'candidat': '/candidat/profil',
      'recruteur': '/recruteur/profil',
    };

    return this.createNotification(userId, {
      titre: '📄 Document uploadé',
      message: `Votre document "${documentNom}" a été uploadé avec succès`,
      type: 'success',
      lien: routes[role] || '/dashboard',
      donnees: { documentNom, role },
    });
  }

  /**
   * Notification de test de compétence terminé
   */
  static async testCompetenceTerminé(candidatId, resultat) {
    return this.createNotification(candidatId, {
      titre: '📝 Test de compétence terminé',
      message: `Votre test de compétence a été évalué. Score: ${resultat.score || 'N/A'}`,
      type: resultat.score > 80 ? 'success' : 'info',
      lien: '/candidat/profil',
      donnees: { resultat },
    });
  }

  /**
   * Notification d'offre expirée
   */
  static async offreExpirée(recruteurId, offreTitre) {
    return this.createNotification(recruteurId, {
      titre: '⏰ Offre expirée',
      message: `Votre offre "${offreTitre}" a expiré. Prolongez-la pour continuer à recevoir des candidatures.`,
      type: 'warning',
      lien: '/recruteur/offres',
      donnees: { offreTitre },
    });
  }

  /**
   * Notification de candidature retirée
   */
  static async candidatureRetirée(candidatId, offreTitre) {
    return this.createNotification(candidatId, {
      titre: '📤 Candidature retirée',
      message: `Votre candidature pour "${offreTitre}" a été retirée.`,
      type: 'info',
      lien: '/candidat/mes-candidatures',
      donnees: { offreTitre },
    });
  }

  /**
   * Notification de compte activé
   */
  static async compteActivé(userId, role) {
    const routes = {
      'candidat': '/candidat/dashboard',
      'recruteur': '/recruteur/dashboard',
    };

    return this.createNotification(userId, {
      titre: '🎉 Compte activé',
      message: 'Votre compte a été activé ! Vous pouvez maintenant accéder à toutes les fonctionnalités.',
      type: 'success',
      lien: routes[role] || '/dashboard',
      donnees: { role },
    });
  }

  /**
   * Notification de rappel de candidature
   */
  static async rappelCandidature(candidatId, offreTitre, joursRestants) {
    return this.createNotification(candidatId, {
      titre: '⏰ Rappel candidature',
      message: `Votre candidature pour "${offreTitre}" est toujours en attente. ${joursRestants} jours restants avant la clôture.`,
      type: 'warning',
      lien: '/candidat/mes-candidatures',
      donnees: { offreTitre, joursRestants },
    });
  }

  /**
   * Notification de bienvenue pour la première connexion
   */
  static async bienvenue(userId, userNom, role) {
    const welcomeMessages = {
      'candidat': {
        titre: '🎉 Bienvenue sur notre plateforme !',
        message: `Bonjour ${userNom} ! Nous sommes ravis de vous accueillir. Commencez à explorer les offres d'emploi et à postuler auprès des meilleures entreprises.`,
        lien: '/candidat/offres',
        type: 'success',
      },
      'recruteur': {
        titre: '🎉 Bienvenue recruteur !',
        message: `Bonjour ${userNom} ! Bienvenue sur notre plateforme de recrutement. Créez vos premières offres d'emploi et trouvez les meilleurs talents.`,
        lien: '/recruteur/offres',
        type: 'success',
      },
      'admin': {
        titre: '🎉 Bienvenue administrateur !',
        message: `Bonjour ${userNom} ! Vous avez maintenant accès au panneau d'administration. Gérez les utilisateurs, les offres et modérez le contenu.`,
        lien: '/admin/dashboard',
        type: 'success',
      },
    };

    const config = welcomeMessages[role] || welcomeMessages.candidat;

    return this.createNotification(userId, {
      titre: config.titre,
      message: config.message,
      type: config.type,
      lien: config.lien,
      donnees: { firstLogin: true, role },
    });
  }
}

module.exports = NotificationHelper;

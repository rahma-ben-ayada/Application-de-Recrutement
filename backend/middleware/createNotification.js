const Notification = require('../models/Notification');

const createNotification = (titre, message, type = 'info') => {
  return async (req, res, next) => {
    try {
      // Créer une notification après une action réussie
      if (req.user && res.statusCode >= 200 && res.statusCode < 300) {
        await Notification.create({
          utilisateur: req.user._id,
          titre,
          message,
          type,
          donnees: {
            path: req.path,
            method: req.method,
          },
        });
      }
    } catch (error) {
      console.error('Erreur lors de la création de notification:', error);
    }

    next();
  };
};

module.exports = createNotification;

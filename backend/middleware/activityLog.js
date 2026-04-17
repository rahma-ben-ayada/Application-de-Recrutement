const ActivityLog = require('../models/ActivityLog');

const logActivity = (action) => {
  return async (req, res, next) => {
    try {
      // Ne pas logger les activités pour les requêtes GET
      if (req.method === 'GET') {
        return next();
      }

      await ActivityLog.create({
        utilisateur: req.user?._id,
        action,
        entity: req.params.entity || null,
        entityId: req.params.id || null,
        details: {
          method: req.method,
          path: req.path,
          body: req.method === 'POST' || req.method === 'PUT' ? req.body : null,
        },
        ip: req.ip,
        userAgent: req.get('user-agent'),
        statut: 'success',
      });
    } catch (error) {
      console.error('Erreur lors du logging d\'activité:', error);
    }

    next();
  };
};

module.exports = logActivity;

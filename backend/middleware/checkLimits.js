const Subscription = require('../models/Subscription');

const checkLimits = (type) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return next();
      }

      const subscription = await Subscription.findOne({
        utilisateur: req.user._id,
        statut: 'active',
        dateFin: { $gt: new Date() },
        isDeleted: false,
      });

      let limite = null;

      if (!subscription) {
        // Limites par défaut pour les utilisateurs gratuits
        const limitesGratuits = {
          offresPubliees: 5,
          candidaturesMois: 20,
          alertes: 3,
          favoris: 10,
          messages: 50,
        };
        limite = limitesGratuits[type];
      } else {
        limite = subscription.limites[type];
      }

      if (limite !== -1 && limite !== null) {
        // Vérifier l'utilisation actuelle
        const models = {
          offresPubliees: 'Offre',
          candidaturesMois: 'Candidature',
          alertes: 'Alerte',
          favoris: 'Favori',
          messages: 'Message',
        };

        const Model = require(`../models/${models[type]}`);

        const count = await Model.countDocuments({
          utilisateur: req.user._id,
          isDeleted: false,
          createdAt: {
            $gte: new Date(new Date().setDate(1) - new Date().getDate() + 1), // Début du mois
          },
        });

        if (count >= limite) {
          return res.status(403).json({
            success: false,
            message: `Limite atteinte pour ${type}. Maximum: ${limite}`,
            limite,
          });
        }
      }

      next();
    } catch (error) {
      console.error('Erreur lors de la vérification des limites:', error);
      next();
    }
  };
};

module.exports = checkLimits;

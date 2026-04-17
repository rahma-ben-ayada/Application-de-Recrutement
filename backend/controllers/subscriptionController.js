const Subscription = require('../models/Subscription');
const Promotion = require('../models/Promotion');
const mongoose = require('mongoose');

// Créer un abonnement
exports.creerSubscription = async (req, res) => {
  try {
    const { plan, methodePaiement, promoCode } = req.body;

    // Vérifier si l'utilisateur a déjà un abonnement actif
    const existant = await Subscription.findOne({
      utilisateur: req.user._id,
      statut: 'active',
    });

    if (existant) {
      return res.status(400).json({ success: false, message: 'Vous avez déjà un abonnement actif' });
    }

    // Calculer la date de fin selon le plan
    const dateDebut = new Date();
    const dateFin = new Date(dateDebut);
    let reduction = 0;

    // Vérifier le code promo
    if (promoCode) {
      const promo = await Promotion.findOne({
        code: promoCode.toUpperCase(),
        estActif: true,
        dateDebut: { $lte: dateDebut },
        dateFin: { $gte: dateDebut },
      });

      if (promo) {
        if (!promo.plansApplicables.includes(plan)) {
          return res.status(400).json({ success: false, message: 'Code promo non applicable à ce plan' });
        }

        if (promo.utilisationsActuelles >= promo.utilisationsMax) {
          return res.status(400).json({ success: false, message: 'Code promo épuisé' });
        }

        reduction = promo.valeur;
        promo.utilisationsActuelles += 1;
        await promo.save();
      }
    }

    // Définir la durée selon le plan
    const durees = {
      basic: 30,
      pro: 90,
      enterprise: 365,
    };

    dateFin.setDate(dateFin.getDate() + durees[plan] || 30);

    // Définir les limites selon le plan
    const limites = {
      basic: {
        offresPubliees: 5,
        candidaturesMois: 20,
        alertes: 3,
        favoris: 10,
        messages: 50,
        recherchesAvancees: false,
        supportPrioritaire: false,
        apiAccess: false,
        exports: false,
        analytics: false,
      },
      pro: {
        offresPubliees: 20,
        candidaturesMois: 100,
        alertes: 10,
        favoris: 50,
        messages: 200,
        recherchesAvancees: true,
        supportPrioritaire: true,
        apiAccess: false,
        exports: true,
        analytics: true,
      },
      enterprise: {
        offresPubliees: -1, // illimité
        candidaturesMois: -1,
        alertes: -1,
        favoris: -1,
        messages: -1,
        recherchesAvancees: true,
        supportPrioritaire: true,
        apiAccess: true,
        exports: true,
        analytics: true,
      },
    };

    const subscription = await Subscription.create({
      utilisateur: req.user._id,
      plan,
      statut: 'active',
      dateDebut,
      dateFin,
      renouvellementAuto: false,
      methodePaiement: methodePaiement || 'free',
      limites: limites[plan],
      promoCode: promoCode || '',
      reduction,
    });

    await subscription.populate('utilisateur', 'nom email');

    res.status(201).json({ success: true, subscription });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Obtenir l'abonnement de l'utilisateur
exports.getMonSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      utilisateur: req.user._id,
      isDeleted: false,
    }).sort({ createdAt: -1 });

    if (!subscription) {
      return res.status(200).json({ success: true, subscription: null });
    }

    res.status(200).json({ success: true, subscription });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mettre à jour l'abonnement
exports.updateSubscription = async (req, res) => {
  try {
    const { renouvellementAuto } = req.body;

    const subscription = await Subscription.findOneAndUpdate(
      { _id: req.params.id, utilisateur: req.user._id, isDeleted: false },
      { renouvellementAuto },
      { new: true }
    );

    if (!subscription) {
      return res.status(404).json({ success: false, message: 'Abonnement non trouvé' });
    }

    res.status(200).json({ success: true, subscription });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Annuler l'abonnement
exports.annulerSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOneAndUpdate(
      { _id: req.params.id, utilisateur: req.user._id, isDeleted: false },
      { statut: 'cancelled', cancelledAt: new Date() },
      { new: true }
    );

    if (!subscription) {
      return res.status(404).json({ success: false, message: 'Abonnement non trouvé' });
    }

    res.status(200).json({ success: true, subscription, message: 'Abonnement annulé' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Vérifier les limites de l'utilisateur
exports.verifierLimites = async (req, res) => {
  try {
    const { type, quantite = 1 } = req.query;

    const subscription = await Subscription.findOne({
      utilisateur: req.user._id,
      statut: 'active',
      dateFin: { $gt: new Date() },
      isDeleted: false,
    });

    if (!subscription) {
      // Utilisateur free
      const limitesFree = {
        offresPubliees: 5,
        candidaturesMois: 20,
        alertes: 3,
        favoris: 10,
        messages: 50,
      };

      if (limitesFree[type] && quantite > limitesFree[type]) {
        return res.status(403).json({ success: false, message: 'Limite atteinte', limite: limitesFree[type] });
      }
    } else {
      // Utilisateur avec abonnement
      const limite = subscription.limites[type];

      if (limite !== -1 && limite < quantite) {
        return res.status(403).json({ success: false, message: 'Limite atteinte', limite });
      }
    }

    res.status(200).json({ success: true, message: 'Limite OK' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Obtenir les plans disponibles
exports.getPlans = async (req, res) => {
  try {
    const plans = [
      {
        id: 'free',
        nom: 'Gratuit',
        prix: 0,
        devise: 'TND',
        duree: 30,
        limites: {
          offresPubliees: 5,
          candidaturesMois: 20,
          alertes: 3,
          favoris: 10,
          messages: 50,
          recherchesAvancees: false,
          supportPrioritaire: false,
          apiAccess: false,
          exports: false,
          analytics: false,
        },
        fonctionnalites: [
          'Recherche basique',
          'Profil candidat',
          'Postulation aux offres',
          '3 alertes emploi',
        ],
      },
      {
        id: 'basic',
        nom: 'Basic',
        prix: 50,
        devise: 'TND',
        duree: 30,
        limites: {
          offresPubliees: 5,
          candidaturesMois: 20,
          alertes: 3,
          favoris: 10,
          messages: 50,
          recherchesAvancees: false,
          supportPrioritaire: false,
          apiAccess: false,
          exports: false,
          analytics: false,
        },
        fonctionnalites: [
          'Tout le plan gratuit',
          'Statistiques de base',
          'Export PDF',
        ],
      },
      {
        id: 'pro',
        nom: 'Professionnel',
        prix: 150,
        devise: 'TND',
        duree: 90,
        limites: {
          offresPubliees: 20,
          candidaturesMois: 100,
          alertes: 10,
          favoris: 50,
          messages: 200,
          recherchesAvancees: true,
          supportPrioritaire: true,
          apiAccess: false,
          exports: true,
          analytics: true,
        },
        fonctionnalites: [
          'Tout le plan Basic',
          'Recherche avancée',
          'Support prioritaire',
          'Analytics détaillés',
          'Export multi-formats',
        ],
      },
      {
        id: 'enterprise',
        nom: 'Entreprise',
        prix: 500,
        devise: 'TND',
        duree: 365,
        limites: {
          offresPubliees: -1,
          candidaturesMois: -1,
          alertes: -1,
          favoris: -1,
          messages: -1,
          recherchesAvancees: true,
          supportPrioritaire: true,
          apiAccess: true,
          exports: true,
          analytics: true,
        },
        fonctionnalites: [
          'Tout illimité',
          'API Access',
          'Account manager dédié',
          'Support 24/7',
          'Intégrations personnalisées',
        ],
      },
    ];

    res.status(200).json({ success: true, plans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Créer un code promo
exports.creerPromotion = async (req, res) => {
  try {
    const { code, type, valeur, plansApplicables, duree, description, conditions } = req.body;

    const promotion = await Promotion.create({
      code: code.toUpperCase(),
      type,
      valeur,
      plansApplicables: plansApplicables || ['basic', 'pro', 'enterprise'],
      dateDebut: new Date(),
      dateFin: new Date(Date.now() + duree * 24 * 60 * 60 * 1000),
      description: description || '',
      conditions: conditions || '',
      creePar: req.user._id,
    });

    res.status(201).json({ success: true, promotion });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Vérifier un code promo
exports.verifierPromotion = async (req, res) => {
  try {
    const { code, plan } = req.query;

    const promotion = await Promotion.findOne({
      code: code.toUpperCase(),
      estActif: true,
      dateDebut: { $lte: new Date() },
      dateFin: { $gte: new Date() },
    });

    if (!promotion) {
      return res.status(404).json({ success: false, message: 'Code promo invalide ou expiré' });
    }

    if (!promotion.plansApplicables.includes(plan)) {
      return res.status(400).json({ success: false, message: 'Code promo non applicable à ce plan' });
    }

    if (promotion.utilisationsActuelles >= promotion.utilisationsMax) {
      return res.status(400).json({ success: false, message: 'Code promo épuisé' });
    }

    res.status(200).json({
      success: true,
      promotion: {
        type: promotion.type,
        valeur: promotion.valeur,
        description: promotion.description,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

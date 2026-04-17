const ActivityLog = require('../models/ActivityLog');

// Créer un log d'activité
exports.createActivityLog = async (req, res) => {
  try {
    const { utilisateur, action, entity, entityId, details, ip, userAgent } = req.body;

    const log = await ActivityLog.create({
      utilisateur,
      action,
      entity,
      entityId,
      details: details || {},
      ip: ip || req.ip,
      userAgent: userAgent || req.get('user-agent'),
    });

    res.status(201).json({ success: true, log });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Obtenir les logs d'un utilisateur
exports.getMesActivityLogs = async (req, res) => {
  try {
    const { limit = 50, action, entity } = req.query;

    const query = { utilisateur: req.user._id };

    if (action) {
      query.action = action;
    }

    if (entity) {
      query.entity = entity;
    }

    const logs = await ActivityLog.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.status(200).json({ success: true, logs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Obtenir les logs administrateur
exports.getActivityLogs = async (req, res) => {
  try {
    const { limit = 100, action, entity, utilisateur, statut } = req.query;

    const query = {};

    if (action) {
      query.action = action;
    }

    if (entity) {
      query.entity = entity;
    }

    if (utilisateur) {
      query.utilisateur = utilisateur;
    }

    if (statut) {
      query.statut = statut;
    }

    const logs = await ActivityLog.find(query)
      .populate('utilisateur', 'nom email')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.status(200).json({ success: true, logs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Stats activité
exports.getStatsActivite = async (req, res) => {
  try {
    const { utilisateur } = req.params;

    const stats = await ActivityLog.aggregate([
      { $match: { utilisateur: mongoose.Types.ObjectId(utilisateur) } },
      {
        $group: {
          _id: '$action',
          count: { $sum: 1 },
          success: { $sum: { $cond: ['$statut', 'success', 1, 0] } },
          failed: { $sum: { $cond: ['$statut', 'failed', 1, 0] } },
        },
      },
      { $sort: { count: -1 } },
    ]);

    const dernieresActivites = await ActivityLog.find({ utilisateur })
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      stats,
      dernieresActivites,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

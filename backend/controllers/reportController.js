const Report = require('../models/Report');
const User = require('../models/User');

// Signaler un contenu
exports.signaler = async (req, res) => {
  try {
    const { type, cible, cibleType, raison, description, piecesJointes } = req.body;

    const report = await Report.create({
      type,
      auteur: req.user._id,
      cible,
      cibleType,
      raison,
      description: description || '',
      piecesJointes: piecesJointes || [],
      priorite: type === 'harcelement' ? 'urgente' : 'moyenne',
    });

    await report.populate('auteur', 'nom email');
    await report.populate('cible', 'nom entreprise');

    res.status(201).json({ success: true, report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Obtenir les signalements de l'utilisateur
exports.getMesSignalements = async (req, res) => {
  try {
    const reports = await Report.find({
      auteur: req.user._id,
      isDeleted: false,
    })
      .populate('cible', 'nom entreprise titre')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, reports });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Obtenir tous les signalements (admin)
exports.getTousSignalements = async (req, res) => {
  try {
    const { statut, type, priorite } = req.query;
    const query = { isDeleted: false };

    if (statut) {
      query.statut = statut;
    }

    if (type) {
      query.type = type;
    }

    if (priorite) {
      query.priorite = priorite;
    }

    const reports = await Report.find(query)
      .populate('auteur', 'nom email')
      .populate('cible', 'nom entreprise titre')
      .populate('assigneA', 'nom email')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, reports });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mettre à jour le statut d'un signalement
exports.updateStatut = async (req, res) => {
  try {
    const { statut, assigneA } = req.body;

    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { statut, assigneA },
      { new: true }
    )
      .populate('auteur', 'nom email')
      .populate('cible', 'nom entreprise titre')
      .populate('assigneA', 'nom email');

    if (!report) {
      return res.status(404).json({ success: false, message: 'Signalement non trouvé' });
    }

    res.status(200).json({ success: true, report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Répondre à un signalement
exports.repondre = async (req, res) => {
  try {
    const { texte } = req.body;

    const report = await Report.findByIdAndUpdate(
      req.params.id,
      {
        reponse: {
          texte,
          date: new Date(),
          reponduPar: req.user._id,
        },
      },
      { new: true }
    )
      .populate('auteur', 'nom email')
      .populate('cible', 'nom entreprise titre')
      .populate('reponse.reponduPar', 'nom email');

    if (!report) {
      return res.status(404).json({ success: false, message: 'Signalement non trouvé' });
    }

    res.status(200).json({ success: true, report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Voter pour un signalement
exports.voter = async (req, res) => {
  try {
    const { type } = req.body; // 'up' ou 'down'

    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, message: 'Signalement non trouvé' });
    }

    const vote = {
      utilisateur: req.user._id,
      type: type === 'up' ? 'up' : 'down',
    };

    const existingVote = report.votes.findIndex(
      v => v.utilisateur.toString() === req.user._id.toString()
    );

    if (existingVote >= 0) {
      report.votes.splice(existingVote, 1);
    }

    report.votes.push(vote);
    await report.save();

    await report.populate('auteur', 'nom email');

    res.status(200).json({ success: true, report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Stats signalements
exports.getStatsSignalements = async (req, res) => {
  try {
    const stats = await Report.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          pending: { $sum: { $cond: ['$statut', 'pending', 1, 0] } },
          en_cours: { $sum: { $cond: ['$statut', 'en_cours', 1, 0] } },
          resolus: { $sum: { $cond: ['$statut', 'resolu', 1, 0] } },
        },
      },
    ]);

    const total = await Report.countDocuments({ isDeleted: false });

    res.status(200).json({
      success: true,
      stats: { total, parType: stats },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

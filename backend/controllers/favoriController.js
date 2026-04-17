const Favori = require('../models/Favori');
const Offre = require('../models/Offre');

// Ajouter un favori
exports.ajouterFavori = async (req, res) => {
  try {
    const { offreId, notes, tags } = req.body;

    // Vérifier si déjà favori
    const existe = await Favori.findOne({
      candidat: req.user._id,
      offre: offreId,
      isDeleted: false,
    });

    if (existe) {
      return res.status(400).json({ success: false, message: 'Offre déjà dans les favoris' });
    }

    const favori = await Favori.create({
      candidat: req.user._id,
      offre: offreId,
      notes: notes || '',
      tags: tags || [],
    });

    await favori.populate('offre');

    res.status(201).json({ success: true, favori });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Obtenir les favoris du candidat
exports.getMesFavoris = async (req, res) => {
  try {
    const favoris = await Favori.find({
      candidat: req.user._id,
      isDeleted: false,
    })
      .populate({
        path: 'offre',
        populate: { path: 'recruteur', select: 'entreprise logo' },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, favoris });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mettre à jour un favori
exports.updateFavori = async (req, res) => {
  try {
    const { notes, tags, statut, priorite, rappel } = req.body;

    const favori = await Favori.findOneAndUpdate(
      { _id: req.params.id, candidat: req.user._id, isDeleted: false },
      { notes, tags, statut, priorite, rappel },
      { new: true }
    ).populate('offre');

    if (!favori) {
      return res.status(404).json({ success: false, message: 'Favori non trouvé' });
    }

    res.status(200).json({ success: true, favori });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Supprimer un favori
exports.deleteFavori = async (req, res) => {
  try {
    const favori = await Favori.findOneAndUpdate(
      { _id: req.params.id, candidat: req.user._id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!favori) {
      return res.status(404).json({ success: false, message: 'Favori non trouvé' });
    }

    res.status(200).json({ success: true, message: 'Favori supprimé' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Vérifier si une offre est en favori
exports.checkFavori = async (req, res) => {
  try {
    const favori = await Favori.findOne({
      candidat: req.user._id,
      offre: req.params.offreId,
      isDeleted: false,
    });

    res.status(200).json({ success: true, isFavori: !!favori, favori });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Obtenir les favoris par statut
exports.getFavorisParStatut = async (req, res) => {
  try {
    const { statut } = req.params;

    const favoris = await Favori.find({
      candidat: req.user._id,
      statut,
      isDeleted: false,
    })
      .populate({
        path: 'offre',
        populate: { path: 'recruteur', select: 'entreprise logo' },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, favoris });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Obtenir les rappels à venir
exports.getRappels = async (req, res) => {
  try {
    const maintenant = new Date();
    const dans7Jours = new Date(maintenant.getTime() + 7 * 24 * 60 * 60 * 1000);

    const favoris = await Favori.find({
      candidat: req.user._id,
      rappel: { $gte: maintenant, $lte: dans7Jours },
      isDeleted: false,
    })
      .populate({
        path: 'offre',
        populate: { path: 'recruteur', select: 'entreprise logo' },
      })
      .sort({ rappel: 1 });

    res.status(200).json({ success: true, favoris });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Stats favoris
exports.getStatsFavoris = async (req, res) => {
  try {
    const favoris = await Favori.find({
      candidat: req.user._id,
      isDeleted: false,
    });

    const parStatut = {
      a_postuler: favoris.filter(f => f.statut === 'a_postuler').length,
      en_cours: favoris.filter(f => f.statut === 'en_cours').length,
      entretien_planifie: favoris.filter(f => f.statut === 'entretien_planifie').length,
      refuse: favoris.filter(f => f.statut === 'refuse').length,
      accepte: favoris.filter(f => f.statut === 'accepte').length,
      archive: favoris.filter(f => f.statut === 'archive').length,
    };

    const parPriorite = {
      urgente: favoris.filter(f => f.priorite === 'urgente').length,
      haute: favoris.filter(f => f.priorite === 'haute').length,
      moyenne: favoris.filter(f => f.priorite === 'moyenne').length,
      basse: favoris.filter(f => f.priorite === 'basse').length,
    };

    const rappelsAvenir = favoris.filter(f => f.rappel && f.rappel > new Date()).length;

    res.status(200).json({
      success: true,
      stats: {
        total: favoris.length,
        parStatut,
        parPriorite,
        rappelsAvenir,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

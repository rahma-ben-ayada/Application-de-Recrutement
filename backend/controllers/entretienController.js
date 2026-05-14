const Entretien = require('../models/Entretien');
const Candidature = require('../models/Candidature');
const Offre = require('../models/Offre');
const User = require('../models/User');
const NotificationHelper = require('../utils/notificationHelper');

// ===== RECRUTEUR — Créer un entretien =====
exports.creerEntretien = async (req, res) => {
  try {
    const { candidatureId, date, heure, lien, notes } = req.body;

    // Vérifier la candidature
    const candidature = await Candidature.findById(candidatureId)
      .populate('offre')
      .populate('candidat');

    if (!candidature) {
      return res.status(404).json({ success: false, message: 'Candidature non trouvée' });
    }

    // Vérifier que l'offre appartient au recruteur
    if (candidature.offre.recruteur.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Non autorisé' });
    }

    // Vérifier si un entretien existe déjà pour cette candidature
    const existe = await Entretien.findOne({
      candidature: candidatureId,
      isDeleted: false,
    });
    if (existe) {
      return res.status(400).json({ success: false, message: 'Un entretien existe déjà pour cette candidature' });
    }

    const entretien = await Entretien.create({
      candidature: candidatureId,
      recruteur: req.user._id,
      candidat: candidature.candidat._id,
      offre: candidature.offre._id,
      date: new Date(date),
      heure,
      lien: lien || '',
      notes: notes || '',
      statut: 'planifié',
    });

    // Mettre à jour le statut de la candidature
    await Candidature.findByIdAndUpdate(candidatureId, {
      statut: 'entretien',
    });

    // Notifier le candidat
    await NotificationHelper.nouvelEntretien(candidature.candidat._id, {
      _id: entretien._id,
      offreTitre: candidature.offre.titre,
      date: entretien.date,
    });

    const populated = await Entretien.findById(entretien._id)
      .populate('candidature')
      .populate('candidat', 'nom email telephone')
      .populate('recruteur', 'nom entreprise')
      .populate('offre', 'titre');

    res.status(201).json({ success: true, message: 'Entretien planifié ✅', entretien: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== RECRUTEUR — Voir ses entretiens =====
exports.getMesEntretiens = async (req, res) => {
  try {
    const entretiens = await Entretien.find({
      recruteur: req.user._id,
      isDeleted: false,
    })
      .populate('candidature')
      .populate('candidat', 'nom email telephone experience competences')
      .populate('offre', 'titre lieu type')
      .sort({ date: 1, heure: 1 });

    res.status(200).json({ success: true, entretiens });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== CANDIDAT — Voir ses entretiens =====
exports.getMesEntretiensCandidat = async (req, res) => {
  try {
    const entretiens = await Entretien.find({
      candidat: req.user._id,
      isDeleted: false,
    })
      .populate('candidature')
      .populate('recruteur', 'nom entreprise siteWeb')
      .populate('offre', 'titre lieu type')
      .sort({ date: 1, heure: 1 });

    res.status(200).json({ success: true, entretiens });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== RECRUTEUR — Modifier un entretien =====
exports.modifierEntretien = async (req, res) => {
  try {
    const { date, heure, lien, notes, statut } = req.body;

    const entretien = await Entretien.findOne({
      _id: req.params.id,
      recruteur: req.user._id,
      isDeleted: false,
    });

    if (!entretien) {
      return res.status(404).json({ success: false, message: 'Entretien non trouvé' });
    }

    if (date) entretien.date = new Date(date);
    if (heure) entretien.heure = heure;
    if (lien !== undefined) entretien.lien = lien;
    if (notes !== undefined) entretien.notes = notes;
    if (statut) entretien.statut = statut;

    await entretien.save();

    const updated = await Entretien.findById(entretien._id)
      .populate('candidature')
      .populate('candidat', 'nom email')
      .populate('offre', 'titre');

    res.status(200).json({ success: true, message: 'Entretien modifié ✅', entretien: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== RECRUTEUR — Supprimer un entretien =====
exports.supprimerEntretien = async (req, res) => {
  try {
    const entretien = await Entretien.findOne({
      _id: req.params.id,
      recruteur: req.user._id,
      isDeleted: false,
    });

    if (!entretien) {
      return res.status(404).json({ success: false, message: 'Entretien non trouvé' });
    }

    entretien.isDeleted = true;
    entretien.statut = 'annulé';
    await entretien.save();

    res.status(200).json({ success: true, message: 'Entretien annulé' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== RECRUTEUR — Statistiques entretiens =====
exports.getStatsEntretiens = async (req, res) => {
  try {
    const total = await Entretien.countDocuments({
      recruteur: req.user._id,
      isDeleted: false,
    });
    const planifies = await Entretien.countDocuments({
      recruteur: req.user._id,
      statut: 'planifié',
      isDeleted: false,
    });
    const acceptes = await Entretien.countDocuments({
      recruteur: req.user._id,
      statut: 'accepté',
      isDeleted: false,
    });
    const refuses = await Entretien.countDocuments({
      recruteur: req.user._id,
      statut: 'refusé',
      isDeleted: false,
    });

    res.status(200).json({
      success: true,
      stats: { total, planifies, acceptes, refuses },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== ADMIN — Tous les entretiens =====
exports.getAllEntretiens = async (req, res) => {
  try {
    const entretiens = await Entretien.find({ isDeleted: false })
      .populate('candidat', 'nom email')
      .populate('recruteur', 'nom entreprise')
      .populate('offre', 'titre')
      .sort({ date: -1 });

    res.status(200).json({ success: true, entretiens });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

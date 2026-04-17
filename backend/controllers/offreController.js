const Offre = require('../models/Offre');
const Candidature = require('../models/Candidature');
const Entretien = require('../models/Entretien');

// ===== PUBLIC — Voir toutes les offres actives =====
exports.getOffres = async (req, res) => {
  try {
    const offres = await Offre.find({ isDeleted: false, status: 'active' })
      .populate('recruteur', 'nom entreprise');
    res.status(200).json({ success: true, offres });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== RECRUTEUR — Créer une offre =====
exports.creerOffre = async (req, res) => {
  try {
    const { titre, description, lieu, type, salaire, competences } = req.body;
    const offre = await Offre.create({
      titre, description, lieu, type, salaire,
      competences, recruteur: req.user._id,
    });
    res.status(201).json({ success: true, message: 'Offre créée ✅', offre });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== RECRUTEUR — Voir ses propres offres =====
exports.getMesOffres = async (req, res) => {
  try {
    const offres = await Offre.find({
      recruteur: req.user._id,
      isDeleted: false,
    });
    res.status(200).json({ success: true, offres });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== RECRUTEUR — Modifier une offre =====
exports.modifierOffre = async (req, res) => {
  try {
    const offre = await Offre.findOne({
      _id: req.params.id,
      recruteur: req.user._id,
      isDeleted: false,
    });
    if (!offre) return res.status(404).json({
      success: false,
      message: 'Offre non trouvée',
    });

    const { titre, description, lieu, type, salaire, competences, status } = req.body;
    Object.assign(offre, { titre, description, lieu, type, salaire, competences, status });
    await offre.save();

    res.status(200).json({ success: true, message: 'Offre modifiée ✅', offre });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== RECRUTEUR — Supprimer une offre (soft delete) =====
exports.supprimerOffre = async (req, res) => {
  try {
    await Offre.findByIdAndUpdate(req.params.id, {
      isDeleted: true,
      status: 'closed',
    });
    res.status(200).json({ success: true, message: 'Offre supprimée' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== ADMIN — Voir toutes les offres =====
exports.getAllOffres = async (req, res) => {
  try {
    const offres = await Offre.find({ isDeleted: false })
      .populate('recruteur', 'nom entreprise');
    res.status(200).json({ success: true, offres });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== RECRUTEUR — Statistiques dashboard =====
exports.getStatsRecruteur = async (req, res) => {
  try {
    // Offres du recruteur
    const mesOffres = await Offre.find({ recruteur: req.user._id, isDeleted: false });
    const offreIds = mesOffres.map(o => o._id);

    // Candidatures pour ces offres
    const candidatures = await Candidature.find({
      offre: { $in: offreIds },
      isDeleted: false,
    });
    const candidatureIds = candidatures.map(c => c._id);

    // Entretiens pour ces candidatures
    const entretiens = await Entretien.find({
      candidature: { $in: candidatureIds },
      isDeleted: false,
    });

    // Stats par statut
    const statuts = {
      en_attente: candidatures.filter(c => c.statut === 'en_attente').length,
      entretien: candidatures.filter(c => c.statut === 'entretien').length,
      accepte: candidatures.filter(c => c.statut === 'accepte').length,
      refuse: candidatures.filter(c => c.statut === 'refuse').length,
    };

    const entretiensStatuts = {
      planifie: entretiens.filter(e => e.statut === 'planifié').length,
      accepte: entretiens.filter(e => e.statut === 'accepté').length,
      refuse: entretiens.filter(e => e.statut === 'refusé').length,
    };

    res.status(200).json({
      success: true,
      stats: {
        totalOffres: mesOffres.length,
        totalCandidatures: candidatures.length,
        totalEntretiens: entretiens.length,
        candidaturesParStatut: statuts,
        entretiensParStatut: entretiensStatuts,
        offresActives: mesOffres.filter(o => o.status === 'active').length,
        offresFermees: mesOffres.filter(o => o.status === 'closed').length,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
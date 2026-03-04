const Offre = require('../models/Offre');

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
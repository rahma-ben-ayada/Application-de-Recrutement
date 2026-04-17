const Candidature = require('../models/Candidature');
const Offre = require('../models/Offre');
const Entretien = require('../models/Entretien');

// ===== CANDIDAT — Postuler =====
exports.postuler = async (req, res) => {
  try {
    const { offreId, lettre } = req.body;

    // Vérifier si déjà postulé
    const existe = await Candidature.findOne({
      candidat: req.user._id,
      offre: offreId,
      isDeleted: false,
    });
    if (existe) return res.status(400).json({
      success: false,
      message: 'Vous avez déjà postulé à cette offre',
    });

    // Récupérer fichiers uploadés
    const cv = req.files?.cv?.[0];
    const video = req.files?.video?.[0];

    const candidature = await Candidature.create({
      candidat: req.user._id,
      offre: offreId,
      lettre: lettre || '',
      cv: cv ? cv.path : '',
      cvNom: cv ? cv.originalname : '',
      video: video ? video.path : '',
      videoNom: video ? video.originalname : '',
    });

    res.status(201).json({
      success: true,
      message: 'Candidature envoyée ✅',
      candidature,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== CANDIDAT — Mes candidatures =====
exports.getMesCandidatures = async (req, res) => {
  try {
    const candidatures = await Candidature.find({
      candidat: req.user._id,
      isDeleted: false,
    }).populate({
      path: 'offre',
      populate: { path: 'recruteur', select: 'nom entreprise' },
    });
    res.status(200).json({ success: true, candidatures });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== RECRUTEUR — Candidatures reçues pour une offre =====
exports.getCandidaturesOffre = async (req, res) => {
  try {
    const candidatures = await Candidature.find({
      offre: req.params.offreId,
      isDeleted: false,
    }).populate('candidat', 'nom email experience competences telephone');
    res.status(200).json({ success: true, candidatures });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== RECRUTEUR — Changer statut =====
exports.updateStatut = async (req, res) => {
  try {
    const candidature = await Candidature.findByIdAndUpdate(
      req.params.id,
      { statut: req.body.statut },
      { new: true }
    );
    res.status(200).json({ success: true, candidature });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== ADMIN — Toutes les candidatures =====
exports.getAllCandidatures = async (req, res) => {
  try {
    const candidatures = await Candidature.find({ isDeleted: false })
      .populate('candidat', 'nom email')
      .populate('offre', 'titre');
    res.status(200).json({ success: true, candidatures });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== CANDIDAT — Statistiques =====
exports.getStatsCandidat = async (req, res) => {
  try {
    const candidatures = await Candidature.find({
      candidat: req.user._id,
      isDeleted: false,
    });
    const candidatureIds = candidatures.map(c => c._id);

    const entretiens = await Entretien.find({
      candidature: { $in: candidatureIds },
      isDeleted: false,
    });

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
        totalCandidatures: candidatures.length,
        totalEntretiens: entretiens.length,
        candidaturesParStatut: statuts,
        entretiensParStatut: entretiensStatuts,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
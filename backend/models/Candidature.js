const mongoose = require('mongoose');

const CandidatureSchema = new mongoose.Schema({
  candidat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  offre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offre',
    required: true,
  },
  lettre: {
    type: String,
    default: '',
  },
  cv: {
    type: String, // chemin du fichier
    default: '',
  },
  cvNom: {
    type: String,
    default: '',
  },
  video: {
    type: String, // chemin du fichier
    default: '',
  },
  videoNom: {
    type: String,
    default: '',
  },
  statut: {
    type: String,
    enum: ['en_attente', 'accepte', 'refuse', 'entretien'],
    default: 'en_attente',
  },
  score: {
    type: Number,
    default: null,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Candidature', CandidatureSchema);
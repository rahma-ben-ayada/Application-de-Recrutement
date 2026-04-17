const mongoose = require('mongoose');

const EntretienSchema = new mongoose.Schema({
  candidature: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidature',
    required: true,
  },
  recruteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
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
  date: {
    type: Date,
    required: true,
  },
  heure: {
    type: String,
    required: true,
  },
  lien: {
    type: String,
    default: '',
  },
  notes: {
    type: String,
    default: '',
  },
  statut: {
    type: String,
    enum: ['planifié', 'accepté', 'refusé', 'annulé'],
    default: 'planifié',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Entretien', EntretienSchema);

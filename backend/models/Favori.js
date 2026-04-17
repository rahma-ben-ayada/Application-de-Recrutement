const mongoose = require('mongoose');

const FavoriSchema = new mongoose.Schema({
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
  notes: {
    type: String,
    default: '',
  },
  tags: [{
    type: String,
  }],
  statut: {
    type: String,
    enum: ['a_postuler', 'en_cours', 'entretien_planifie', 'refuse', 'accepte', 'archive'],
    default: 'a_postuler',
  },
  priorite: {
    type: String,
    enum: ['basse', 'moyenne', 'haute', 'urgente'],
    default: 'moyenne',
  },
  rappel: {
    type: Date,
    default: null,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

// Index unique pour éviter les doublons
FavoriSchema.index({ candidat: 1, offre: 1 }, { unique: true });

module.exports = mongoose.model('Favori', FavoriSchema);

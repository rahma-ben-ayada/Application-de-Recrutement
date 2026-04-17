const mongoose = require('mongoose');

const RecommendationSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['offre', 'candidat', 'competence', 'formation'],
    required: true,
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  raisons: [{
    type: String,
  }],
  statut: {
    type: String,
    enum: ['pending', 'viewed', 'accepted', 'rejected', 'expired'],
    default: 'pending',
  },
  contexte: {
    profilMatch: Number,
    localisationMatch: Number,
    competencesMatch: Number,
    experienceMatch: Number,
    salaireMatch: Number,
  },
  vuLe: {
    type: Date,
    default: null,
  },
  expireLe: {
    type: Date,
    required: true,
  },
  generePar: {
    type: String,
    enum: ['ia', 'manual', 'collaborative', 'content_based'],
    default: 'ia',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

RecommendationSchema.index({ utilisateur: 1, type: 1, score: -1 });
RecommendationSchema.index({ utilisateur: 1, statut: 1 });

module.exports = mongoose.model('Recommendation', RecommendationSchema);

const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['candidature_inappropriee', 'offre_frauduleuse', 'harcelement', 'spam', 'autre'],
    required: true,
  },
  auteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cible: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  cibleType: {
    type: String,
    enum: ['user', 'offre', 'candidature', 'review', 'message'],
    required: true,
  },
  raison: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  statut: {
    type: String,
    enum: ['pending', 'en_cours', 'resolu', 'rejete'],
    default: 'pending',
  },
  priorite: {
    type: String,
    enum: ['basse', 'moyenne', 'haute', 'urgente'],
    default: 'moyenne',
  },
  assigneA: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  reponse: {
    texte: String,
    date: Date,
    reponduPar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  piecesJointes: [{
    nom: String,
    chemin: String,
  }],
  votes: [{
    utilisateur: mongoose.Schema.Types.ObjectId,
    type: String,
    enum: ['up', 'down'],
  }],
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

ReportSchema.index({ auteur: 1, statut: 1 });
ReportSchema.index({ cibleType: 1, cible: 1 });

module.exports = mongoose.model('Report', ReportSchema);

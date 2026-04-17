const mongoose = require('mongoose');

const TestResultSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TestSkill',
    required: true,
  },
  reponses: [{
    question: mongoose.Schema.Types.ObjectId,
    reponse: mongoose.Schema.Types.Mixed,
    estCorrecte: Boolean,
    temps: Number,
    points: Number,
  }],
  score: {
    type: Number,
    required: true,
  },
  scoreMaximum: {
    type: Number,
    required: true,
  },
  pourcentage: {
    type: Number,
    required: true,
  },
  statut: {
    type: String,
    enum: ['en_cours', 'complete', 'abandonne', 'expulse'],
    default: 'en_cours',
  },
  resultat: {
    type: String,
    enum: ['echou', 'reussi', 'excellent'],
    default: null,
  },
  duree: {
    type: Number,
    default: 0,
  },
  dateDebut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateFin: {
    type: Date,
    default: null,
  },
  tentatives: {
    type: Number,
    default: 1,
  },
  competences: [{
    nom: String,
    score: Number,
    niveau: String,
  }],
  recommandations: [{
    type: String,
    titre: String,
    description: String,
    lien: String,
  }],
  certificat: {
    type: String,
    default: null,
  },
  estPublic: {
    type: Boolean,
    default: false,
  },
  partage: {
    linkedin: Boolean,
    autre: Boolean,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

TestResultSchema.index({ utilisateur: 1, test: 1 });
TestResultSchema.index({ utilisateur: 1, statut: 1 });
TestResultSchema.index({ test: 1, score: -1 });

module.exports = mongoose.model('TestResult', TestResultSchema);

const mongoose = require('mongoose');

const TestSkillSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  categorie: {
    type: String,
    enum: ['technique', 'langue', 'personnalite', 'logique', 'creativite'],
    required: true,
  },
  niveau: {
    type: String,
    enum: ['debutant', 'intermediaire', 'avance'],
    default: 'intermediaire',
  },
  duree: {
    type: Number,
    required: true,
  },
  nombreQuestions: {
    type: Number,
    required: true,
  },
  questions: [{
    enonce: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['qcm', 'vrai_faux', 'reponse_courte', 'code', 'pratique'],
      required: true,
    },
    options: [{
      texte: String,
      estCorrecte: Boolean,
    }],
    reponseCorrecte: {
      type: mongoose.Schema.Types.Mixed,
    },
    points: {
      type: Number,
      default: 1,
    },
    ordre: {
      type: Number,
      default: 0,
    },
    explication: {
      type: String,
      default: '',
    },
    temps: {
      type: Number,
      default: 60,
    },
  }],
  resultatReussi: {
    type: Number,
    default: 70,
  },
  competencesEvaluees: [String],
  creePar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  estActif: {
    type: Boolean,
    default: true,
  },
  difficulte: {
    type: String,
    enum: ['facile', 'moyen', 'difficile'],
    default: 'moyen',
  },
  language: {
    type: String,
    enum: ['fr', 'en', 'ar'],
    default: 'fr',
  },
  tags: [String],
  tentatives: {
    type: Number,
    default: 0,
  },
  moyenneScore: {
    type: Number,
    default: 0,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

TestSkillSchema.index({ categorie: 1, estActif: 1 });
TestSkillSchema.index({ competencesEvaluees: 1 });

module.exports = mongoose.model('TestSkill', TestSkillSchema);

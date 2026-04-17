const mongoose = require('mongoose');

const SkillAssessmentSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  competence: {
    type: String,
    required: true,
  },
  categorie: {
    type: String,
    enum: ['technique', 'soft_skill', 'langue', 'outil', 'certification'],
    required: true,
  },
  niveau: {
    type: String,
    enum: ['debutant', 'intermediaire', 'avance', 'expert', 'maitre'],
    required: true,
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  experience: {
    type: Number,
    default: 0,
  },
  projets: [{
    nom: String,
    description: String,
    lien: String,
    date: Date,
  }],
  certifications: [{
    nom: String,
    organisePar: String,
    dateObtention: Date,
    dateExpiration: Date,
    credential: String,
  }],
  evaluePar: {
    type: String,
    enum: ['auto', 'test', 'interview', 'review'],
    default: 'auto',
  },
  derniereEvaluation: {
    type: Date,
    default: null,
  },
  prochainEvaluation: {
    type: Date,
    default: null,
  },
  recommandations: [{
    titre: String,
    description: String,
    priorite: {
      type: String,
      enum: ['basse', 'moyenne', 'haute'],
      default: 'moyenne',
    },
  }],
  estVerifiee: {
    type: Boolean,
    default: false,
  },
  verifiePar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

SkillAssessmentSchema.index({ utilisateur: 1, competence: 1 });
SkillAssessmentSchema.index({ utilisateur: 1, categorie: 1 });

module.exports = mongoose.model('SkillAssessment', SkillAssessmentSchema);

const mongoose = require('mongoose');

const SkillTestSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  categorie: {
    type: String,
    required: true,
    enum: ['technique', 'langue', 'soft_skills', 'metier'],
  },
  domaine: {
    type: String,
    required: true,
  },
  niveau: {
    type: String,
    required: true,
    enum: ['debutant', 'intermediaire', 'avance', 'expert'],
  },
  duree: {
    type: Number, // en minutes
    required: true,
    default: 30,
  },
  questions: [{
    question: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['qcm', 'vrai_faux', 'code', 'cas_pratique'],
      default: 'qcm',
    },
    options: [{
      type: String,
    }],
    reponseCorrecte: {
      type: mongoose.Schema.Types.Mixed,
    },
    points: {
      type: Number,
      default: 1,
    },
    explication: {
      type: String,
    },
  }],
  scoreMin: {
    type: Number, // Score minimum pour réussir
    default: 70,
  },
  scoreMax: {
    type: Number,
    default: 100,
  },
  actif: {
    type: Boolean,
    default: true,
  },
  creePar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  tags: [{
    type: String,
  }],
  difficulte: {
    type: String,
    enum: ['facile', 'moyen', 'difficile'],
    default: 'moyen',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Index pour la recherche
SkillTestSchema.index({ titre: 'text', description: 'text', domaine: 'text', tags: 'text' });

module.exports = mongoose.model('SkillTest', SkillTestSchema);

const mongoose = require('mongoose');

const TestResultSchema = new mongoose.Schema({
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SkillTest',
    required: true,
  },
  candidat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reponses: [{
    question: {
      type: mongoose.Schema.Types.ObjectId,
    },
    reponse: {
      type: mongoose.Schema.Types.Mixed,
    },
    estCorrecte: {
      type: Boolean,
    },
    pointsObtenus: {
      type: Number,
      default: 0,
    },
    tempsPasse: {
      type: Number, // en secondes
    },
  }],
  scoreTotal: {
    type: Number,
    required: true,
    default: 0,
  },
  scoreMax: {
    type: Number,
    required: true,
  },
  pourcentage: {
    type: Number,
    required: true,
  },
  reussi: {
    type: Boolean,
    required: true,
  },
  dureeTotale: {
    type: Number, // en secondes
    required: true,
  },
  dateDebut: {
    type: Date,
    required: true,
  },
  dateFin: {
    type: Date,
    required: true,
  },
  statut: {
    type: String,
    enum: ['en_cours', 'termine', 'abandonne', 'expire'],
    default: 'en_cours',
  },
  tentative: {
    type: Number,
    default: 1,
  },
  certification: {
    type: Boolean,
    default: false,
  },
  certificationUrl: {
    type: String,
  },
  badges: [{
    type: String,
  }],
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Index pour les recherches
TestResultSchema.index({ candidat: 1, test: 1 });
TestResultSchema.index({ candidat: 1, statut: 1 });
TestResultSchema.index({ test: 1, scoreTotal: -1 });

module.exports = mongoose.model('TestResult', TestResultSchema);

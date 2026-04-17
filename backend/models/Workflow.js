const mongoose = require('mongoose');

const WorkflowSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    enum: ['candidature', 'entretien', 'onboarding', 'evaluation'],
    required: true,
  },
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  entreprise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  etapes: [{
    id: String,
    titre: String,
    description: String,
    ordre: Number,
    duree: Number,
    responsables: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    automatique: Boolean,
    conditions: mongoose.Schema.Types.Mixed,
    actions: [{
      type: String,
      config: mongoose.Schema.Types.Mixed,
    }],
  }],
  declencheurs: [{
    type: String,
    config: mongoose.Schema.Types.Mixed,
  }],
  statut: {
    type: String,
    enum: ['actif', 'inactif', 'brouillon'],
    default: 'brouillon',
  },
  executions: [{
    date: Date,
    statut: String,
    resultat: mongoose.Schema.Types.Mixed,
    duree: Number,
  }],
  statistiques: {
    totalExecutions: Number,
    executionsReussies: Number,
    executionsEchouees: Number,
    dureeMoyenne: Number,
  },
  estPublic: {
    type: Boolean,
    default: false,
  },
  tags: [String],
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

WorkflowSchema.index({ utilisateur: 1, type: 1 });
WorkflowSchema.index({ entreprise: 1, type: 1 });
WorkflowSchema.index({ statut: 1 });

module.exports = mongoose.model('Workflow', WorkflowSchema);

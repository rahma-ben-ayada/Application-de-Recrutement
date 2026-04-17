const mongoose = require('mongoose');

const IntegrationSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['linkedin', 'google', 'calendar', 'slack', 'teams', 'zoom', 'meet', 'github', 'behance', 'dribbble'],
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  statut: {
    type: String,
    enum: ['active', 'inactive', 'error', 'expired'],
    default: 'inactive',
  },
  configuration: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  token: {
    type: String,
    default: '',
  },
  refreshToken: {
    type: String,
    default: '',
  },
  tokenExpiration: {
    type: Date,
    default: null,
  },
  scopes: [String],
  derniereSynchro: {
    type: Date,
    default: null,
  },
  derniereVerification: {
    type: Date,
    default: null,
  },
  erreurs: [{
    date: Date,
    message: String,
    code: String,
  }],
  webhooks: [{
    url: String,
    evenements: [String],
    actif: Boolean,
  }],
  logs: [{
    date: Date,
    action: String,
    details: mongoose.Schema.Types.Mixed,
  }],
  preferences: {
    autoSynchro: Boolean,
    frequenceSynchro: String,
    notifications: Boolean,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

IntegrationSchema.index({ utilisateur: 1, type: 1 });
IntegrationSchema.index({ statut: 1 });

module.exports = mongoose.model('Integration', IntegrationSchema);

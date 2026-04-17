const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  titre: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['info', 'success', 'warning', 'error', 'candidature', 'entretien', 'offre', 'alerte', 'message'],
    default: 'info',
  },
  lien: {
    type: String,
    default: '',
  },
  donnees: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  lu: {
    type: Boolean,
    default: false,
  },
  dateLecture: {
    type: Date,
    default: null,
  },
  expireLe: {
    type: Date,
    default: null,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

// Index pour optimiser les requêtes
NotificationSchema.index({ utilisateur: 1, lu: 1, createdAt: -1 });
NotificationSchema.index({ utilisateur: 1, isDeleted: 1 });

module.exports = mongoose.model('Notification', NotificationSchema);

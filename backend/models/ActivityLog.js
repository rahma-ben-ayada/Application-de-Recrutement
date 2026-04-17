const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  action: {
    type: String,
    required: true,
    enum: [
      'login',
      'logout',
      'register',
      'create_offre',
      'update_offre',
      'delete_offre',
      'postuler',
      'accepter_candidature',
      'refuser_candidature',
      'planifier_entretien',
      'annuler_entretien',
      'creer_alerte',
      'ajouter_favori',
      'creer_review',
      'send_message',
      'upload_cv',
      'update_profil',
      'delete_compte',
    ],
  },
  entity: {
    type: String,
    enum: ['offre', 'candidature', 'entretien', 'alerte', 'favori', 'review', 'message', 'user'],
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  ip: {
    type: String,
    default: '',
  },
  userAgent: {
    type: String,
    default: '',
  },
  statut: {
    type: String,
    enum: ['success', 'failed', 'pending'],
    default: 'success',
  },
  errorMessage: {
    type: String,
    default: '',
  },
}, { timestamps: true });

// Index pour optimiser les requêtes
ActivityLogSchema.index({ utilisateur: 1, createdAt: -1 });
ActivityLogSchema.index({ action: 1, createdAt: -1 });
ActivityLogSchema.index({ entity: 1, entityId: 1, createdAt: -1 });

module.exports = mongoose.model('ActivityLog', ActivityLogSchema);

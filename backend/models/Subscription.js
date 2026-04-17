const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  plan: {
    type: String,
    enum: ['free', 'basic', 'pro', 'enterprise'],
    required: true,
  },
  statut: {
    type: String,
    enum: ['active', 'inactive', 'cancelled', 'expired', 'trial'],
    default: 'active',
  },
  dateDebut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateFin: {
    type: Date,
    required: true,
  },
  renouvellementAuto: {
    type: Boolean,
    default: false,
  },
  methodePaiement: {
    type: String,
    enum: ['card', 'paypal', 'transfer', 'check', 'free'],
    default: 'free',
  },
  limites: {
    offresPubliees: { type: Number, default: 5 },
    candidaturesMois: { type: Number, default: 20 },
    alertes: { type: Number, default: 3 },
    favoris: { type: Number, default: 10 },
    messages: { type: Number, default: 50 },
    recherchesAvancees: { type: Boolean, default: false },
    supportPrioritaire: { type: Boolean, default: false },
    apiAccess: { type: Boolean, default: false },
    exports: { type: Boolean, default: false },
    analytics: { type: Boolean, default: false },
  },
  historiquePaiements: [{
    reference: String,
    montant: Number,
    devise: { type: String, default: 'TND' },
    date: Date,
    methode: String,
    statut: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'] },
  }],
  promoCode: {
    type: String,
    default: '',
  },
  reduction: {
    type: Number,
    default: 0,
  },
  cancelledAt: {
    type: Date,
    default: null,
  },
  trialExpiresAt: {
    type: Date,
    default: null,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

SubscriptionSchema.index({ utilisateur: 1 });
SubscriptionSchema.index({ statut: 1, dateFin: 1 });

module.exports = mongoose.model('Subscription', SubscriptionSchema);

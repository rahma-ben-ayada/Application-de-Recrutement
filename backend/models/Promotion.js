const mongoose = require('mongoose');

const PromotionSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  type: {
    type: String,
    enum: ['percentage', 'fixed', 'trial'],
    required: true,
  },
  valeur: {
    type: Number,
    required: true,
  },
  devise: {
    type: String,
    default: 'TND',
  },
  dureeEssai: {
    type: Number,
    default: 0,
  },
  plansApplicables: [{
    type: String,
    enum: ['basic', 'pro', 'enterprise'],
  }],
  utilisationsMax: {
    type: Number,
    default: null,
  },
  utilisationsActuelles: {
    type: Number,
    default: 0,
  },
  utilisationsParUtilisateur: {
    type: Number,
    default: 1,
  },
  minMontant: {
    type: Number,
    default: 0,
  },
  dateDebut: {
    type: Date,
    required: true,
  },
  dateFin: {
    type: Date,
    required: true,
  },
  estActif: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
    default: '',
  },
  conditions: {
    type: String,
    default: '',
  },
  creePar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

PromotionSchema.index({ code: 1 });
PromotionSchema.index({ estActif: 1, dateDebut: 1, dateFin: 1 });

module.exports = mongoose.model('Promotion', PromotionSchema);

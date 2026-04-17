const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['cv', 'lettre_motivation', 'portfolio', 'certificat', 'diplome', 'casier_judiciaire', 'autre'],
    required: true,
  },
  nomOriginal: {
    type: String,
    required: true,
  },
  nomStockage: {
    type: String,
    required: true,
  },
  chemin: {
    type: String,
    required: true,
  },
  taille: {
    type: Number,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  estPrincipale: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    default: '',
  },
  tags: [{
    type: String,
  }],
  telechargements: {
    type: Number,
    default: 0,
  },
  dernierAcces: {
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

DocumentSchema.index({ utilisateur: 1, type: 1 });
DocumentSchema.index({ utilisateur: 1, estPrincipale: 1 });

module.exports = mongoose.model('Document', DocumentSchema);

const mongoose = require('mongoose');

const SavedSearchSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  criteres: {
    keywords: [String],
    lieu: String,
    types: [String],
    salaireMin: Number,
    salaireMax: Number,
    experience: [String],
    competences: [String],
    secteur: [String],
    datePosted: String,
  },
  resultats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offre',
  }],
  nombreResultats: {
    type: Number,
    default: 0,
  },
  derniereExecution: {
    type: Date,
    default: null,
  },
  frequenceRafraichissement: {
    type: String,
    enum: ['manuel', 'quotidien', 'hebdomadaire'],
    default: 'manuel',
  },
  notifications: {
    type: Boolean,
    default: false,
  },
  estPrivee: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

SavedSearchSchema.index({ utilisateur: 1 });
SavedSearchSchema.index({ utilisateur: 1, estPrivee: 1 });

module.exports = mongoose.model('SavedSearch', SavedSearchSchema);

const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ['visite_profil', 'clic_offre', 'candidature', 'entretien', 'message', 'recherche'],
    required: true,
  },
  donnees: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  source: {
    type: String,
    enum: ['direct', 'recherche', 'alerte', 'favori', 'recommandation', 'partage'],
    default: 'direct',
  },
  appareil: {
    type: String,
    enum: ['desktop', 'mobile', 'tablet'],
    default: 'desktop',
  },
  navigateur: {
    type: String,
    default: '',
  },
  localisation: {
    pays: String,
    ville: String,
    coordonnees: {
      lat: Number,
      lng: Number,
    },
  },
  session: {
    type: String,
    default: '',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

AnalyticsSchema.index({ utilisateur: 1, date: -1 });
AnalyticsSchema.index({ type: 1, date: -1 });

module.exports = mongoose.model('Analytics', AnalyticsSchema);

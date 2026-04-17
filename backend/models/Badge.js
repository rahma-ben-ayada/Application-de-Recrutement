const mongoose = require('mongoose');

const BadgeSchema = new mongoose.Schema({
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
    enum: ['accomplissement', 'competence', 'participation', 'temps', 'special'],
    required: true,
  },
  categorie: {
    type: String,
    enum: ['candidat', 'recruteur', 'les_deux'],
    required: true,
  },
  icone: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  couleur: {
    type: String,
    default: '#3B82F6',
  },
  niveau: {
    type: String,
    enum: ['bronze', 'argent', 'or', 'platine', 'diamant'],
    default: 'bronze',
  },
  conditions: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  rarete: {
    type: String,
    enum: ['commun', 'rare', 'epique', 'legendaire'],
    default: 'commun',
  },
  points: {
    type: Number,
    default: 0,
  },
  nombreRecipients: {
    type: Number,
    default: 0,
  },
  estActif: {
    type: Boolean,
    default: true,
  },
  dateDebut: {
    type: Date,
    default: null,
  },
  dateFin: {
    type: Date,
    default: null,
  },
  prerequis: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Badge',
  }],
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

BadgeSchema.index({ type: 1, categorie: 1 });
BadgeSchema.index({ estActif: 1 });

module.exports = mongoose.model('Badge', BadgeSchema);

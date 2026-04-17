const mongoose = require('mongoose');

const CareerPathSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  titre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  objectif: {
    type: String,
    enum: ['emploi', 'competence', 'promotion', 'reorientation', 'freelance'],
    required: true,
  },
  etapes: [{
    titre: String,
    description: String,
    ordre: Number,
    statut: {
      type: String,
      enum: ['pending', 'en_cours', 'complete', 'retarde'],
      default: 'pending',
    },
    dateDebut: Date,
    dateFin: Date,
    ressources: [{
      type: String,
      titre: String,
      lien: String,
    }],
    notes: String,
  }],
  competencesCibles: [{
    competence: String,
    niveauActuel: String,
    niveauCible: String,
  }],
  delai: {
    type: Number,
    default: 0,
  },
  uniteDelai: {
    type: String,
    enum: ['jours', 'mois', 'annees'],
    default: 'mois',
  },
  statut: {
    type: String,
    enum: ['planifie', 'en_cours', 'pause', 'complete', 'abandonne'],
    default: 'planifie',
  },
  progression: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  estPublic: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

CareerPathSchema.index({ utilisateur: 1 });
CareerPathSchema.index({ statut: 1 });

module.exports = mongoose.model('CareerPath', CareerPathSchema);

const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  etablissement: {
    type: String,
    required: true,
  },
  diplome: {
    type: String,
    required: true,
  },
  domaine: {
    type: String,
    required: true,
  },
  niveau: {
    type: String,
    enum: ['bac', 'licence', 'master', 'doctorat', 'certification', 'autre'],
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  dateDebut: {
    type: Date,
    required: true,
  },
  dateFin: {
    type: Date,
    default: null,
  },
  estActuel: {
    type: Boolean,
    default: false,
  },
  ville: {
    type: String,
    default: '',
  },
  pays: {
    type: String,
    default: 'Tunisie',
  },
  mention: {
    type: String,
    enum: ['passable', 'assez_bien', 'bien', 'tres_bien', 'excellent'],
    default: null,
  },
  projets: [{
    titre: String,
    description: String,
    date: Date,
  },
  recognitions: [{
    titre: String,
    description: String,
    date: Date,
  }],
  estVerifiee: {
    type: Boolean,
    default: false,
  },
  documents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document',
  }],
  ordre: {
    type: Number,
    default: 0,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

EducationSchema.index({ utilisateur: 1, dateFin: -1 });

module.exports = mongoose.model('Education', EducationSchema);

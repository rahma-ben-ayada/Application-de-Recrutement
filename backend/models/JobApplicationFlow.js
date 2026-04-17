const mongoose = require('mongoose');

const JobApplicationFlowSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  etapes: [{
    id: {
      type: String,
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
    ordre: {
      type: Number,
      required: true,
    },
    dureeEstimee: {
      type: Number,
      default: 0,
    },
    documents: [String],
    statut: {
      type: String,
      enum: ['pending', 'en_cours', 'complete', 'saute'],
      default: 'pending',
    },
    dateDebut: {
      type: Date,
      default: null,
    },
    dateFin: {
      type: Date,
      default: null,
    },
    notes: {
      type: String,
      default: '',
    },
    rappel: {
      type: Date,
      default: null,
    },
  }],
  offre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offre',
  },
  entreprise: {
    type: String,
    default: '',
  },
  statut: {
    type: String,
    enum: ['brouillon', 'actif', 'pause', 'termine', 'abandonne', 'succes', 'echec'],
    default: 'brouillon',
  },
  progression: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  dateDebut: {
    type: Date,
    default: null,
  },
  dateFin: {
    type: Date,
    default: null,
  },
  resultats: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  estTemplate: {
    type: Boolean,
    default: false,
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

JobApplicationFlowSchema.index({ utilisateur: 1, statut: 1 });
JobApplicationFlowSchema.index({ offre: 1 });

module.exports = mongoose.model('JobApplicationFlow', JobApplicationFlowSchema);

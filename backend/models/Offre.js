const mongoose = require('mongoose');

const OffreSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  lieu: {
    type: String,
    required: [true, 'Le lieu est requis'],
    trim: true,
  },
  type: {
    type: String,
    enum: ['CDI', 'CDD', 'Stage', 'Freelance'],
    default: 'CDI',
  },
  salaire: {
    type: String,
    default: '',
  },
  competences: {
    type: [String],
    default: [],
  },
  recruteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'closed'],
    default: 'active',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Offre', OffreSchema);
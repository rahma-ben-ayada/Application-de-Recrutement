const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ['competence', 'secteur', 'technologie', 'langue', 'certification', 'soft_skill', 'personnalise'],
    default: 'personnalise',
  },
  couleur: {
    type: String,
    default: '#3B82F6',
  },
  description: {
    type: String,
    default: '',
  },
  popularite: {
    type: Number,
    default: 0,
  },
  creePar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  estActif: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

TagSchema.index({ nom: 1, type: 1 });
TagSchema.index({ popularite: -1 });

module.exports = mongoose.model('Tag', TagSchema);

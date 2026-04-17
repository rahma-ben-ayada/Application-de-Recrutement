const mongoose = require('mongoose');

const AlerteSchema = new mongoose.Schema({
  candidat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  titre: {
    type: String,
    default: '',
  },
  keywords: [{
    type: String,
  }],
  lieu: {
    type: String,
    default: '',
  },
  type: [{
    type: String,
    enum: ['CDI', 'CDD', 'Stage', 'Freelance', 'Temporaire'],
  }],
  salaireMin: {
    type: Number,
    default: 0,
  },
  categories: [{
    type: String,
  }],
  frequence: {
    type: String,
    enum: ['immediat', 'quotidien', 'hebdomadaire', 'mensuel'],
    default: 'quotidien',
  },
  active: {
    type: Boolean,
    default: true,
  },
  dernierEnvoi: {
    type: Date,
    default: null,
  },
  nombreOffres: {
    type: Number,
    default: 0,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Alerte', AlerteSchema);

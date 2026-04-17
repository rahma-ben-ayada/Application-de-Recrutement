const mongoose = require('mongoose');

const SalarySchema = new mongoose.Schema({
  titrePoste: {
    type: String,
    required: true,
  },
  secteur: {
    type: String,
    required: true,
  },
  localisation: {
    type: String,
    required: true,
  },
  typeContrat: {
    type: String,
    enum: ['CDI', 'CDD', 'Stage', 'Freelance', 'Interim'],
    required: true,
  },
  experience: {
    type: String,
    enum: ['0-1', '1-3', '3-5', '5-10', '10+'],
    required: true,
  },
  salaires: [{
    devise: {
      type: String,
      default: 'TND',
    },
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    mediane: {
      type: Number,
      required: true,
    },
    moyenne: {
      type: Number,
      required: true,
    },
  }],
  avantages: [{
    type: String,
    present: Boolean,
    description: String,
  }],
  source: {
    type: String,
    enum: ['user_report', 'company', 'survey', 'estimation'],
    default: 'user_report',
  },
  nombreSignales: {
    type: Number,
    default: 1,
  },
  derniereMiseAJour: {
    type: Date,
    default: Date.now,
  },
  estVerifie: {
    type: Boolean,
    default: false,
  },
  verifiePar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

SalarySchema.index({ titrePoste: 1, localisation: 1, experience: 1 });
SalarySchema.index({ secteur: 1, localisation: 1 });
SalarySchema.index({ salaires: { $elemMatch: { devise: 1 } } });

module.exports = mongoose.model('Salary', SalarySchema);

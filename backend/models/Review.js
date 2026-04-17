const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  auteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  entreprise: {
    type: String,
    required: true,
  },
  entrepriseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  noteGenerale: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  criteres: {
    environnement: { type: Number, min: 1, max: 5, default: 0 },
    salaire: { type: Number, min: 1, max: 5, default: 0 },
    equilibre: { type: Number, min: 1, max: 5, default: 0 },
    management: { type: Number, min: 1, max: 5, default: 0 },
    culture: { type: Number, min: 1, max: 5, default: 0 },
  },
  titrePoste: {
    type: String,
    default: '',
  },
  duree: {
    type: String,
    enum: ['moins_1_an', '1_3_ans', '3_5_ans', 'plus_5_ans', 'actuel'],
    default: '',
  },
  typeContrat: {
    type: String,
    enum: ['CDI', 'CDD', 'Stage', 'Freelance', 'Interim'],
    default: '',
  },
  avantages: [{
    type: String,
  }],
  inconvenients: [{
    type: String,
  }],
  titre: {
    type: String,
    required: true,
  },
  commentaire: {
    type: String,
    required: true,
  },
  recommande: {
    type: Boolean,
    default: null,
  },
  verifier: {
    type: Boolean,
    default: false,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  dislikes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  reponse: {
    texte: String,
    date: Date,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

// Index pour éviter les doublons de reviews par le même utilisateur pour la même entreprise
ReviewSchema.index({ auteur: 1, entrepriseId: 1 }, { unique: true });

module.exports = mongoose.model('Review', ReviewSchema);

const mongoose = require('mongoose');

const ForumSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  categorie: {
    type: String,
    enum: ['conseil_carriere', 'technique', 'entretien', 'cv', 'salaire', 'entreprise', 'autre'],
    required: true,
  },
  auteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  contenu: {
    type: String,
    required: true,
  },
  tags: [String],
  statut: {
    type: String,
    enum: ['ouvert', 'resolu', 'ferme'],
    default: 'ouvert',
  },
  estEpinglé: {
    type: Boolean,
    default: false,
  },
  estVerrouille: {
    type: Boolean,
    default: false,
  },
  vues: {
    type: Number,
    default: 0,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  dernierMessage: {
    type: Date,
    default: null,
  },
  nombreReponses: {
    type: Number,
    default: 0,
  },
  estPublic: {
    type: Boolean,
    default: true,
  },
  modérateurs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

ForumSchema.index({ categorie: 1, statut: 1 });
ForumSchema.index({ auteur: 1 });
ForumSchema.index({ tags: 1 });

module.exports = mongoose.model('Forum', ForumSchema);

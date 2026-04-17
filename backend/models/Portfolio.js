const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
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
  type: {
    type: String,
    enum: ['projet', 'case_study', 'article', 'presentation', 'video', 'design', 'code'],
    required: true,
  },
  contenu: {
    type: String,
    default: '',
  },
  images: [{
    url: String,
    titre: String,
    ordre: Number,
  }],
  fichiers: [{
    nom: String,
    url: String,
    type: String,
    taille: Number,
  }],
  liens: [{
    titre: String,
    url: String,
    type: {
      type: String,
      enum: ['github', 'behance', 'dribbble', 'website', 'other'],
    },
  }],
  technologies: [String],
  client: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    default: '',
  },
  dateDebut: {
    type: Date,
    default: null,
  },
  dateFin: {
    type: Date,
    default: null,
  },
  statut: {
    type: String,
    enum: ['brouillon', 'publie', 'archive'],
    default: 'brouillon',
  },
  vues: {
    type: Number,
    default: 0,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  commentaires: [{
    utilisateur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    contenu: String,
    date: {
      type: Date,
      default: Date.now,
    },
  }],
  estPublic: {
    type: Boolean,
    default: true,
  },
  estFeatured: {
    type: Boolean,
    default: false,
  },
  ordre: {
    type: Number,
    default: 0,
  },
  tags: [String],
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

PortfolioSchema.index({ utilisateur: 1, statut: 1 });
PortfolioSchema.index({ type: 1, statut: 1 });
PortfolioSchema.index({ technologies: 1 });

module.exports = mongoose.model('Portfolio', PortfolioSchema);

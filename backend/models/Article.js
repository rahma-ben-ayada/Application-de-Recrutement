const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true,
  },
  contenu: {
    type: String,
    required: [true, 'Le contenu est requis'],
  },
  extrait: {
    type: String,
    required: [true, 'L\'extrait est requis'],
    maxlength: 200,
  },
  categorie: {
    type: String,
    enum: ['Conseils Carrière', 'Entretien', 'Tendances', 'Carrière', 'Technologie'],
    default: 'Conseils Carrière',
  },
  image: {
    type: String,
    default: '📄',
  },
  imageUrl: {
    type: String,
    default: '',
  },
  auteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  nomAuteur: {
    type: String,
    default: 'Équipe SmartRecruit',
  },
  tempsLecture: {
    type: String,
    default: '5 min',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  tags: [{
    type: String,
  }],
  vues: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

ArticleSchema.virtual('formattedDate').get(function() {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return this.createdAt.toLocaleDateString('fr-FR', options);
});

module.exports = mongoose.model('Article', ArticleSchema);

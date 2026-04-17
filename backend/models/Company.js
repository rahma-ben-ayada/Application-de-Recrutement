const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  siret: {
    type: String,
    unique: true,
    sparse: true,
  },
  description: {
    type: String,
    default: '',
  },
  secteur: {
    type: String,
    required: true,
  },
  sousSecteur: {
    type: String,
    default: '',
  },
  taille: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '201-500', '500-1000', '1000+'],
    default: '1-10',
  },
  siteWeb: {
    type: String,
    default: '',
  },
  logo: {
    type: String,
    default: '',
  },
  banniere: {
    type: String,
    default: '',
  },
  localisation: {
    adresse: String,
    ville: String,
    pays: { type: String, default: 'Tunisie' },
    codePostal: String,
    coordonnees: {
      lat: Number,
      lng: Number,
    },
  },
  reseauxSociaux: {
    linkedin: String,
    facebook: String,
    twitter: String,
    instagram: String,
  },
  culture: {
    valeurs: [String],
    avantages: [String],
    environnement: String,
  },
  videos: [{
    titre: String,
    url: String,
    type: {
      type: String,
      enum: ['presentation', 'temoignage', 'culture'],
    },
  }],
  images: [{
    type: String,
    url: String,
    titre: String,
  }],
  certifications: [{
    nom: String,
    organisme: String,
    date: Date,
  }],
  statut: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active',
  },
  typeCompte: {
    type: String,
    enum: ['basic', 'verified', 'premium'],
    default: 'basic',
  },
  dateVerification: {
    type: Date,
    default: null,
  },
  notes: {
    moyenne: { type: Number, default: 0 },
    nombre: { type: Number, default: 0 },
    derniereMiseAJour: { type: Date, default: null },
  },
  statistiques: {
    vuesProfil: { type: Number, default: 0 },
    vuesOffres: { type: Number, default: 0 },
    candidaturesRecues: { type: Number, default: 0 },
    tauxReponse: { type: Number, default: 0 },
    delaiReponseMoyen: { type: Number, default: 0 },
  },
  abonnement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

CompanySchema.index({ nom: 'text', secteur: 1 });
CompanySchema.index({ localisation.ville: 1, secteur: 1 });
CompanySchema.index({ statut: 1 });

module.exports = mongoose.model('Company', CompanySchema);

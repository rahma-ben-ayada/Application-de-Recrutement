const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
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
    enum: ['webinar', 'workshop', 'salon_emploi', 'conference', 'meetup', 'formation'],
    required: true,
  },
  organisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dateDebut: {
    type: Date,
    required: true,
  },
  dateFin: {
    type: Date,
    required: true,
  },
  duree: {
    type: Number,
    default: 0,
  },
  localisation: {
    type: {
      enum: ['en_ligne', 'physique', 'hybride'],
      required: true,
    },
    adresse: String,
    ville: String,
    pays: { type: String, default: 'Tunisie' },
    lien: String,
    coordonnees: {
      lat: Number,
      lng: Number,
    },
  },
  capacite: {
    type: Number,
    default: 0,
  },
  participants: [{
    utilisateur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    dateInscription: {
      type: Date,
      default: Date.now,
    },
    statut: {
      type: String,
      enum: ['inscrit', 'confirme', 'annule', 'present'],
      default: 'inscrit',
    },
  }],
  intervenants: [{
    nom: String,
    role: String,
    bio: String,
    photo: String,
    linkedin: String,
  },
  programme: [{
    heure: String,
    titre: String,
    description: String,
    intervenant: String,
  }],
  tags: [String],
  secteur: [String],
  niveau: {
    type: String,
    enum: ['debutant', 'intermediaire', 'avance', 'tous_niveaux'],
    default: 'tous_niveaux',
  },
  cout: {
    type: Number,
    default: 0,
  },
  devise: {
    type: String,
    default: 'TND',
  },
  estGratuit: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
    default: '',
  },
  images: [String],
  videos: [{
    titre: String,
    url: String,
  }],
  materiaux: [{
    titre: String,
    fichier: String,
    type: String,
  }],
  enregistrement: {
    disponible: Boolean,
    lien: String,
  },
  statut: {
    type: String,
    enum: ['brouillon', 'publie', 'annule', 'termine'],
    default: 'brouillon',
  },
  estPublic: {
    type: Boolean,
    default: true,
  },
  estFeatured: {
    type: Boolean,
    default: false,
  },
  vues: {
    type: Number,
    default: 0,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

EventSchema.index({ type: 1, dateDebut: 1 });
EventSchema.index({ organisateur: 1 });
EventSchema.index({ statut: 1, dateDebut: 1 });

module.exports = mongoose.model('Event', EventSchema);

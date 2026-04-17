const mongoose = require('mongoose');

const MentorshipSchema = new mongoose.Schema({
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  mente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  statut: {
    type: String,
    enum: ['pending', 'active', 'pause', 'termine', 'annule'],
    default: 'pending',
  },
  domaine: {
    type: String,
    required: true,
  },
  objectifs: [String],
  description: {
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
  duree: {
    type: Number,
    default: 0,
  },
  frequence: {
    type: String,
    enum: ['quotidien', 'hebdomadaire', 'mensuel', 'ponctuel'],
    default: 'hebdomadaire',
  },
  sessions: [{
    date: Date,
    duree: Number,
    sujet: String,
    notes: String,
    statut: {
      type: String,
      enum: ['planifie', 'complete', 'annule'],
      default: 'planifie',
    },
  }],
  ressources: [{
    titre: String,
    description: String,
    lien: String,
    type: String,
  }],
  notesMentor: {
    type: String,
    default: '',
  },
  notesMente: {
    type: String,
    default: '',
  },
  feedback: [{
    date: Date,
    note: Number,
    commentaire: String,
    auteur: {
      type: String,
      enum: ['mentor', 'mente'],
    },
  }],
  recommandation: {
    type: String,
    default: null,
  },
  certificat: {
    type: String,
    default: null,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

MentorshipSchema.index({ mentor: 1, statut: 1 });
MentorshipSchema.index({ mente: 1, statut: 1 });
MentorshipSchema.index({ domaine: 1 });

module.exports = mongoose.model('Mentorship', MentorshipSchema);

const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  expediteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  destinataire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sujet: {
    type: String,
    default: '',
  },
  contenu: {
    type: String,
    required: true,
  },
  offre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offre',
  },
  candidature: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidature',
  },
  pieceJointe: {
    type: String,
    default: '',
  },
  lu: {
    type: Boolean,
    default: false,
  },
  dateLecture: {
    type: Date,
    default: null,
  },
  archive: {
    type: Boolean,
    default: false,
  },
  supprimePar: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);

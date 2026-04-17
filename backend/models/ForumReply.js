const mongoose = require('mongoose');

const ForumReplySchema = new mongoose.Schema({
  forum: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Forum',
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
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ForumReply',
    default: null,
  },
  reponses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ForumReply',
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  estMeilleureReponse: {
    type: Boolean,
    default: false,
  },
  estSignale: {
    type: Boolean,
    default: false,
  },
  modifié: {
    type: Boolean,
    default: false,
  },
  dateModification: {
    type: Date,
    default: null,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

ForumReplySchema.index({ forum: 1, parent: 1 });
ForumReplySchema.index({ auteur: 1 });
ForumReplySchema.index({ estMeilleureReponse: 1 });

module.exports = mongoose.model('ForumReply', ForumReplySchema);

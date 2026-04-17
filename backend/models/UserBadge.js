const mongoose = require('mongoose');

const UserBadgeSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  badge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Badge',
    required: true,
  },
  dateObtention: {
    type: Date,
    required: true,
    default: Date.now,
  },
  progression: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  conditionsRemplies: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  estAffiche: {
    type: Boolean,
    default: true,
  },
  partage: {
    linkedin: { type: Boolean, default: false },
    twitter: { type: Boolean, default: false },
    facebook: { type: Boolean, default: false },
  },
  niveau: {
    type: String,
    enum: ['bronze', 'argent', 'or', 'platine', 'diamant'],
    default: 'bronze',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

UserBadgeSchema.index({ utilisateur: 1, badge: 1 }, { unique: true });
UserBadgeSchema.index({ utilisateur: 1 });

module.exports = mongoose.model('UserBadge', UserBadgeSchema);

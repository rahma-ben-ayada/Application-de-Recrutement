const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  notifications: {
    email: {
      type: Boolean,
      default: true,
    },
    push: {
      type: Boolean,
      default: true,
    },
    sms: {
      type: Boolean,
      default: false,
    },
    nouvellesOffres: {
      type: Boolean,
      default: true,
    },
    candidatures: {
      type: Boolean,
      default: true,
    },
    entretiens: {
      type: Boolean,
      default: true,
    },
    messages: {
      type: Boolean,
      default: true,
    },
    misesAJour: {
      type: Boolean,
      default: false,
    },
    newsletter: {
      type: Boolean,
      default: false,
    },
  },
  prive: {
    profilVisible: {
      type: Boolean,
      default: true,
    },
    montrerCompetences: {
      type: Boolean,
      default: true,
    },
    montrerExperience: {
      type: Boolean,
      default: true,
    },
    monstreEmail: {
      type: Boolean,
      default: false,
    },
    montrerTelephone: {
      type: Boolean,
      default: false,
    },
    autoriserContact: {
      type: Boolean,
      default: true,
    },
  },
  langue: {
    type: String,
    enum: ['fr', 'en', 'ar'],
    default: 'fr',
  },
  fuseauHoraire: {
    type: String,
    default: 'Africa/Tunis',
  },
  formatDate: {
    type: String,
    enum: ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'],
    default: 'DD/MM/YYYY',
  },
  theme: {
    type: String,
    enum: ['light', 'dark', 'auto'],
    default: 'light',
  },
  accesibilite: {
    taillePolice: {
      type: String,
      enum: ['small', 'medium', 'large', 'xl'],
      default: 'medium',
    },
    contrasteEleve: {
      type: Boolean,
      default: false,
    },
    reduireMouvements: {
      type: Boolean,
      default: false,
    },
  },
  integrations: {
    linkedin: {
      connecte: { type: Boolean, default: false },
      token: String,
      profileId: String,
    },
    google: {
      connecte: { type: Boolean, default: false },
      token: String,
      calendarId: String,
    },
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

SettingSchema.index({ utilisateur: 1 }, { unique: true });

module.exports = mongoose.model('Setting', SettingSchema);

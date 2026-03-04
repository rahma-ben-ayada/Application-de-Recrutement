const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nom:        { type: String, required: true, trim: true },
  email:      { type: String, required: true, unique: true, lowercase: true },
  password:   { type: String, required: true, minlength: 6, select: false },
  role:       { type: String, enum: ['admin', 'recruteur', 'candidat'], required: true },

  // ===== STATUT =====
  status: {
    type: String,
    enum: ['pending', 'active', 'rejected', 'suspended'],
    default: 'pending',
  },

  // ===== SOFT DELETE =====
  isDeleted:  { type: Boolean, default: false },
  deletedAt:  { type: Date, default: null },

  // ===== RECRUTEUR =====
  entreprise: { type: String, default: '' },
  secteur:    { type: String, default: '' },
  siteWeb:    { type: String, default: '' },

  // ===== CANDIDAT =====
  cv:          { type: String, default: '' },
  competences: [{ type: String }],
  experience:  { type: Number, default: 0 },

  // ===== GENERAL =====
  telephone:  { type: String, default: '' },
  isVerified: { type: Boolean, default: false },
  lastLogin:  { type: Date, default: null },

}, { timestamps: true });

// Chiffrer password
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// Vérifier password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
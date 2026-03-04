const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// ===== ADMIN — Voir tous les users =====
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: false }).select('-password');
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== ADMIN — Voir users en attente =====
exports.getPendingUsers = async (req, res) => {
  try {
    const users = await User.find({
      status: 'pending',
      isDeleted: false
    }).select('-password');
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== ADMIN — Valider un compte =====
exports.validateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: 'active', isVerified: true },
      { new: true }
    );
    if (!user) return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    res.status(200).json({ success: true, message: '✅ Compte validé', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== ADMIN — Refuser un compte =====
exports.rejectUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );
    if (!user) return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    res.status(200).json({ success: true, message: '❌ Compte refusé', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== ADMIN — Suspendre un compte =====
exports.suspendUser = async (req, res) => {
  try {
    const { reason } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        status: 'suspended',
        suspendedReason: reason || 'Violation des conditions d\'utilisation',
        suspendedAt: new Date(),
      },
      { new: true }
    );
    if (!user) return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    res.status(200).json({ success: true, message: 'Compte suspendu', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== ADMIN — Réactiver un compte =====
exports.activateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: 'active' },
      { new: true }
    );
    if (!user) return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    res.status(200).json({ success: true, message: 'Compte réactivé ✅', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== ADMIN — Soft Delete =====
exports.deleteUser = async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({
        success: false,
        message: 'Vous ne pouvez pas supprimer votre propre compte',
      });
    }
    await User.findByIdAndUpdate(req.params.id, {
      isDeleted: true,
      deletedAt: new Date(),
      status: 'suspended',
    });
    res.status(200).json({ success: true, message: 'Compte supprimé' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== ADMIN — Ajouter un user manuellement =====
exports.addUser = async (req, res) => {
  try {
    const { nom, email, password, role, entreprise, secteur } = req.body;

    const userExists = await User.findOne({ email, isDeleted: false });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Cet email est déjà utilisé',
      });
    }

    const user = await User.create({
      nom, email,
      password: password || '12345678',
      role, entreprise, secteur,
      status: 'active',
      isVerified: true,
    });

    res.status(201).json({
      success: true,
      message: 'Utilisateur créé avec succès',
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== USER — Modifier son profil =====
exports.updateProfil = async (req, res) => {
  try {
    const { nom, telephone, entreprise, secteur, siteWeb, competences, experience } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { nom, telephone, entreprise, secteur, siteWeb, competences, experience },
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, message: 'Profil mis à jour', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== USER — Changer password =====
exports.changePassword = async (req, res) => {
  try {
    const { ancienPassword, nouveauPassword } = req.body;
    const user = await User.findById(req.user._id).select('+password');
    const isMatch = await user.comparePassword(ancienPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Ancien mot de passe incorrect',
      });
    }

    user.password = nouveauPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Mot de passe modifié ✅' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== ADMIN — Statistiques =====
exports.getStats = async (req, res) => {
  try {
    const totalUsers      = await User.countDocuments({ isDeleted: false });
    const totalRecruteurs = await User.countDocuments({ role: 'recruteur', isDeleted: false });
    const totalCandidats  = await User.countDocuments({ role: 'candidat', isDeleted: false });
    const pending         = await User.countDocuments({ status: 'pending', isDeleted: false });
    const suspended       = await User.countDocuments({ status: 'suspended', isDeleted: false });
    const verified        = await User.countDocuments({ isVerified: true, isDeleted: false });

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalRecruteurs,
        totalCandidats,
        pending,
        suspended,
        verified,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
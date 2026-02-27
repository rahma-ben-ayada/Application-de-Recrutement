const User = require('../models/User');

// ===== ADMIN — Voir tous les users =====
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ success: true, users });
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
        isSuspended: true,
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
      { isSuspended: false, suspendedReason: '', suspendedAt: null },
      { new: true }
    );
    if (!user) return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    res.status(200).json({ success: true, message: 'Compte réactivé', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== ADMIN — Vérifier un recruteur =====
exports.verifyRecruteur = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isVerified: true },
      { new: true }
    );
    if (!user) return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    res.status(200).json({ success: true, message: 'Recruteur vérifié ✅', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== ADMIN — Supprimer un compte =====
exports.deleteUser = async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({
        success: false,
        message: 'Vous ne pouvez pas supprimer votre propre compte admin',
      });
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Compte supprimé' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== USER — Modifier ses propres infos =====
exports.updateProfil = async (req, res) => {
  try {
    const { nom, telephone, entreprise } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { nom, telephone, entreprise },
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, message: 'Profil mis à jour', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== USER — Changer son mot de passe =====
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

    res.status(200).json({ success: true, message: 'Mot de passe modifié avec succès' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== ADMIN — Statistiques =====
exports.getStats = async (req, res) => {
  try {
    const totalUsers      = await User.countDocuments();
    const totalAdmins     = await User.countDocuments({ role: 'admin' });
    const totalRecruteurs = await User.countDocuments({ role: 'recruteur' });
    const totalCandidats  = await User.countDocuments({ role: 'candidat' });
    const suspended       = await User.countDocuments({ isSuspended: true });
    const verified        = await User.countDocuments({ isVerified: true });

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalAdmins,
        totalRecruteurs,
        totalCandidats,
        suspended,
        verified,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
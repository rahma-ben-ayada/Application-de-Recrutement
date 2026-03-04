const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// ===== REGISTER =====
exports.register = async (req, res) => {
  try {
    const { nom, email, password, role, entreprise, secteur } = req.body;

    // Vérifier si email existe
    const userExists = await User.findOne({ email, isDeleted: false });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'Cet email est déjà utilisé',
      });
    }

    // Admin s'active directement
    const status = role === 'admin' ? 'active' : 'pending';

    const user = await User.create({
      nom, email, password, role,
      entreprise, secteur, status,
    });

    res.status(201).json({
      success: true,
      message: role === 'admin'
        ? 'Compte admin créé avec succès'
        : 'Compte créé ! En attente de validation par l\'administrateur.',
      user: {
        id: user._id,
        nom: user.nom,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== LOGIN =====
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email et mot de passe requis',
      });
    }

    // Trouver user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect',
      });
    }

    // Vérifier soft delete
    if (user.isDeleted) {
      return res.status(401).json({
        success: false,
        message: 'Ce compte a été supprimé',
      });
    }

    // Vérifier status
    if (user.status === 'pending') {
      return res.status(401).json({
        success: false,
        message: 'Votre compte est en attente de validation par l\'administrateur',
      });
    }

    if (user.status === 'rejected') {
      return res.status(401).json({
        success: false,
        message: 'Votre compte a été refusé par l\'administrateur',
      });
    }

    if (user.status === 'suspended') {
      return res.status(401).json({
        success: false,
        message: 'Votre compte est suspendu. Contactez l\'administrateur',
      });
    }

    // Vérifier password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect',
      });
    }

    // Mettre à jour lastLogin
    user.lastLogin = new Date();
    await user.save();

    // Générer token
    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      message: 'Connexion réussie',
      token,
      user: {
        id: user._id,
        nom: user.nom,
        email: user.email,
        role: user.role,
        status: user.status,
        entreprise: user.entreprise,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== GET PROFIL =====
exports.getProfil = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
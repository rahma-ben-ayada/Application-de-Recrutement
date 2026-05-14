const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const NotificationHelper = require('../utils/notificationHelper');

// ===== ADMIN LOGIN (Enhanced Security) =====
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email et mot de passe requis',
      });
    }

    // Find user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect',
      });
    }

    // Verify role is admin
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Accès refusé. Ce portail est réservé aux administrateurs.',
      });
    }

    // Verify soft delete
    if (user.isDeleted) {
      return res.status(401).json({
        success: false,
        message: 'Ce compte a été supprimé',
      });
    }

    // Verify status
    if (user.status === 'pending') {
      return res.status(401).json({
        success: false,
        message: 'Votre compte est en attente de validation',
      });
    }

    if (user.status === 'rejected') {
      return res.status(401).json({
        success: false,
        message: 'Votre compte a été refusé',
      });
    }

    if (user.status === 'suspended') {
      return res.status(401).json({
        success: false,
        message: 'Votre compte est suspendu. Contactez le super administrateur',
      });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect',
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Log admin access
    console.log(`[ADMIN LOGIN] ${user.email} logged in at ${new Date().toISOString()} from IP: ${req.ip}`);

    // Generate token with admin flag
    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      message: 'Connexion administrateur réussie',
      token,
      user: {
        id: user._id,
        nom: user.nom,
        email: user.email,
        role: user.role,
        status: user.status,
        isAdmin: true,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

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

    // Notifier les admins du nouvel utilisateur
    if (role !== 'admin') {
      await NotificationHelper.nouvelUtilisateur({
        _id: user._id,
        nom: user.nom,
        role: user.role,
      });
    }

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
// ===== UPDATE PROFIL =====
exports.updateProfil = async (req, res) => {
  try {
    const { nom, telephone, experience, competences, formation, langues, objectif } = req.body;

    const updateData = {
      nom, telephone,
      experience: experience ? Number(experience) : 0,
      competences: Array.isArray(competences) ? competences : [],
      formation: formation || '',
      langues: langues || '',
      objectif: objectif || '',
    };

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, message: 'Profil mis à jour ✅', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== GOOGLE OAUTH CALLBACK =====
exports.googleAuthCallback = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      console.error('Google Auth: No user found in request');
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
    }

    console.log(`Google Auth Success: ${user.email} (${user.role}) - Status: ${user.status}`);

    // Notifier les admins pour les nouveaux utilisateurs (sauf admin)
    if (user.role !== 'admin' && user.status === 'pending') {
      await NotificationHelper.nouvelUtilisateur({
        _id: user._id,
        nom: user.nom,
        role: user.role,
      });
    }

    // If user status is pending, redirect to pending page
    if (user.status === 'pending') {
      return res.redirect(`${process.env.FRONTEND_URL}/pending-approval?email=${user.email}`);
    }

    // Generate JWT token for active users
    const token = generateToken(user._id, user.role);

    // Redirect to frontend with token and user info
    res.redirect(
      `${process.env.FRONTEND_URL}/auth/callback?token=${token}&user=${encodeURIComponent(
        JSON.stringify({
          id: user._id,
          nom: user.nom,
          email: user.email,
          role: user.role,
          status: user.status,
          photo: user.photo,
        })
      )}`
    );
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
  }
};
// Vérifier si le compte est suspendu
exports.checkSuspended = async (req, res, next) => {
  if (req.user.isSuspended) {
    return res.status(403).json({
      success: false,
      message: 'Votre compte a été suspendu. Contactez l\'administrateur.',
      reason: req.user.suspendedReason,
    });
  }
  next();
};

// Vérifier si recruteur est vérifié
exports.checkVerified = async (req, res, next) => {
  if (req.user.role === 'recruteur' && !req.user.isVerified) {
    return res.status(403).json({
      success: false,
      message: 'Votre compte recruteur n\'est pas encore vérifié par l\'administrateur.',
    });
  }
  next();
};

// Vérifier ownership — l'utilisateur modifie ses propres données
exports.checkOwnership = (req, res, next) => {
  if (req.user._id.toString() !== req.params.id) {
    return res.status(403).json({
      success: false,
      message: 'Vous ne pouvez pas modifier les données d\'un autre utilisateur.',
    });
  }
  next();
};
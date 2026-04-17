const Notification = require('../models/Notification');

// Créer une notification
exports.creerNotification = async (req, res) => {
  try {
    const { utilisateur, titre, message, type, lien, donnees } = req.body;

    const notification = await Notification.create({
      utilisateur,
      titre,
      message,
      type: type || 'info',
      lien: lien || '',
      donnees: donnees || {},
    });

    // Envoyer en temps réel si socket.io est configuré
    req.io?.to(utilisateur.toString()).emit('notification', notification);

    res.status(201).json({ success: true, notification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Obtenir les notifications de l'utilisateur
exports.getMesNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      utilisateur: req.user._id,
      isDeleted: false,
      expireLe: { $gt: new Date() },
    })
      .sort({ createdAt: -1 })
      .limit(50);

    const nonLues = notifications.filter(n => !n.lu).length;

    res.status(200).json({ success: true, notifications, nonLues });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Marquer comme lu
exports.marquerCommeLu = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, utilisateur: req.user._id, isDeleted: false },
      { lu: true, dateLecture: new Date() },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification non trouvée' });
    }

    res.status(200).json({ success: true, notification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Marquer toutes comme lues
exports.marquerToutesCommeLues = async (req, res) => {
  try {
    await Notification.updateMany(
      { utilisateur: req.user._id, lu: false, isDeleted: false },
      { lu: true, dateLecture: new Date() }
    );

    res.status(200).json({ success: true, message: 'Toutes les notifications marquées comme lues' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Supprimer une notification
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, utilisateur: req.user._id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification non trouvée' });
    }

    res.status(200).json({ success: true, message: 'Notification supprimée' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Nettoyer les anciennes notifications
exports.nettoyerNotifications = async (req, res) => {
  try {
    const result = await Notification.deleteMany({
      utilisateur: req.user._id,
      lu: true,
      createdAt: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    });

    res.status(200).json({ success: true, message: `${result.deletedCount} notifications supprimées` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Stats notifications
exports.getStatsNotifications = async (req, res) => {
  try {
    const total = await Notification.countDocuments({
      utilisateur: req.user._id,
      isDeleted: false,
    });

    const nonLues = await Notification.countDocuments({
      utilisateur: req.user._id,
      lu: false,
      isDeleted: false,
    });

    const parType = await Notification.aggregate([
      { $match: { utilisateur: req.user._id, isDeleted: false } },
      { $group: { _id: '$type', count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      success: true,
      stats: { total, nonLues, parType },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

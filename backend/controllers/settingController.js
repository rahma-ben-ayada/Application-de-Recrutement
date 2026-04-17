const Setting = require('../models/Setting');

// Obtenir les paramètres de l'utilisateur
exports.getMesSettings = async (req, res) => {
  try {
    let setting = await Setting.findOne({ utilisateur: req.user._id, isDeleted: false });

    // Créer les paramètres par défaut s'ils n'existent pas
    if (!setting) {
      setting = await Setting.create({ utilisateur: req.user._id });
    }

    res.status(200).json({ success: true, setting });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mettre à jour les paramètres
exports.updateSettings = async (req, res) => {
  try {
    const { notifications, prive, langue, fuseauHoraire, formatDate, theme, accesibilite } = req.body;

    const setting = await Setting.findOneAndUpdate(
      { utilisateur: req.user._id, isDeleted: false },
      {
        notifications: notifications || {},
        prive: prive || {},
        langue: langue || 'fr',
        fuseauHoraire: fuseauHoraire || 'Africa/Tunis',
        formatDate: formatDate || 'DD/MM/YYYY',
        theme: theme || 'light',
        accesibilite: accesibilite || {},
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ success: true, setting });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mettre à jour les notifications
exports.updateNotifications = async (req, res) => {
  try {
    const setting = await Setting.findOne({ utilisateur: req.user._id, isDeleted: false });

    if (!setting) {
      return res.status(404).json({ success: false, message: 'Paramètres non trouvés' });
    }

    setting.notifications = { ...setting.notifications, ...req.body };
    await setting.save();

    res.status(200).json({ success: true, setting });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mettre à jour la confidentialité
exports.updatePrive = async (req, res) => {
  try {
    const setting = await Setting.findOne({ utilisateur: req.user._id, isDeleted: false });

    if (!setting) {
      return res.status(404).json({ success: false, message: 'Paramètres non trouvés' });
    }

    setting.prive = { ...setting.prive, ...req.body };
    await setting.save();

    res.status(200).json({ success: true, setting });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mettre à jour les intégrations
exports.updateIntegrations = async (req, res) => {
  try {
    const { linkedin, google } = req.body;
    const setting = await Setting.findOne({ utilisateur: req.user._id, isDeleted: false });

    if (!setting) {
      return res.status(404).json({ success: false, message: 'Paramètres non trouvés' });
    }

    if (linkedin) {
      setting.integrations.linkedin = { ...setting.integrations.linkedin, ...linkedin };
    }

    if (google) {
      setting.integrations.google = { ...setting.integrations.google, ...google };
    }

    await setting.save();

    res.status(200).json({ success: true, setting });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Réinitialiser les paramètres
exports.resetSettings = async (req, res) => {
  try {
    await Setting.findOneAndUpdate(
      { utilisateur: req.user._id, isDeleted: false },
      {
        notifications: {
          email: true,
          push: true,
          sms: false,
          nouvellesOffres: true,
          candidatures: true,
          entretiens: true,
          messages: true,
          misesAJour: false,
          newsletter: false,
        },
        prive: {
          profilVisible: true,
          montrerCompetences: true,
          montrerExperience: true,
          monstreEmail: false,
          montrerTelephone: false,
          autoriserContact: true,
        },
        langue: 'fr',
        fuseauHoraire: 'Africa/Tunis',
        formatDate: 'DD/MM/YYYY',
        theme: 'light',
        accesibilite: {
          taillePolice: 'medium',
          contrasteEleve: false,
          reduireMouvements: false,
        },
      }
    );

    const setting = await Setting.findOne({ utilisateur: req.user._id, isDeleted: false });

    res.status(200).json({ success: true, setting, message: 'Paramètres réinitialisés' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const Alerte = require('../models/Alerte');
const Offre = require('../models/Offre');

// Créer une alerte
exports.creerAlerte = async (req, res) => {
  try {
    const { titre, keywords, lieu, type, salaireMin, categories, frequence } = req.body;

    const alerte = await Alerte.create({
      candidat: req.user._id,
      titre: titre || 'Alerte personnalisée',
      keywords: keywords || [],
      lieu: lieu || '',
      type: type || [],
      salaireMin: salaireMin || 0,
      categories: categories || [],
      frequence: frequence || 'quotidien',
    });

    res.status(201).json({ success: true, alerte });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Obtenir les alertes du candidat
exports.getMesAlertes = async (req, res) => {
  try {
    const alertes = await Alerte.find({
      candidat: req.user._id,
      isDeleted: false,
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, alertes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mettre à jour une alerte
exports.updateAlerte = async (req, res) => {
  try {
    const alerte = await Alerte.findOneAndUpdate(
      { _id: req.params.id, candidat: req.user._id, isDeleted: false },
      req.body,
      { new: true }
    );

    if (!alerte) {
      return res.status(404).json({ success: false, message: 'Alerte non trouvée' });
    }

    res.status(200).json({ success: true, alerte });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Supprimer une alerte
exports.deleteAlerte = async (req, res) => {
  try {
    const alerte = await Alerte.findOneAndUpdate(
      { _id: req.params.id, candidat: req.user._id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!alerte) {
      return res.status(404).json({ success: false, message: 'Alerte non trouvée' });
    }

    res.status(200).json({ success: true, message: 'Alerte supprimée' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Activer/Désactiver une alerte
exports.toggleAlerte = async (req, res) => {
  try {
    const alerte = await Alerte.findOne({
      _id: req.params.id,
      candidat: req.user._id,
      isDeleted: false,
    });

    if (!alerte) {
      return res.status(404).json({ success: false, message: 'Alerte non trouvée' });
    }

    alerte.active = !alerte.active;
    await alerte.save();

    res.status(200).json({ success: true, alerte });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Rechercher les offres correspondant aux alertes
exports.checkerAlertes = async (req, res) => {
  try {
    const alertes = await Alerte.find({
      candidat: req.user._id,
      active: true,
      isDeleted: false,
    });

    const resultats = [];

    for (const alerte of alertes) {
      const query = { isDeleted: false };

      if (alerte.keywords && alerte.keywords.length > 0) {
        query.$or = alerte.keywords.map(keyword => ({
          $or: [
            { titre: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } },
            { competences: { $regex: keyword, $options: 'i' } },
          ],
        }));
      }

      if (alerte.lieu) {
        query.lieu = { $regex: alerte.lieu, $options: 'i' };
      }

      if (alerte.type && alerte.type.length > 0) {
        query.type = { $in: alerte.type };
      }

      if (alerte.salaireMin > 0) {
        query.salaire = { $gte: alerte.salaireMin };
      }

      const offres = await Offre.find(query).populate('recruteur', 'entreprise logo');

      if (offres.length > 0) {
        resultats.push({
          alerte: alerte._id,
          titreAlerte: alerte.titre,
          nombreOffres: offres.length,
          offres: offres.slice(0, 5),
        });
      }
    }

    res.status(200).json({ success: true, resultats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Stats alertes
exports.getStatsAlertes = async (req, res) => {
  try {
    const alertes = await Alerte.find({
      candidat: req.user._id,
      isDeleted: false,
    });

    const actives = alertes.filter(a => a.active).length;
    const inactives = alertes.length - actives;
    const totalOffres = alertes.reduce((sum, a) => sum + a.nombreOffres, 0);

    res.status(200).json({
      success: true,
      stats: {
        total: alertes.length,
        actives,
        inactives,
        totalOffres,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

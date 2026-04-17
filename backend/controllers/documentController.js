const Document = require('../models/Document');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/documents');
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Type de fichier non autorisé'));
    }
  },
});

// Uploader un document
exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Aucun fichier uploadé' });
    }

    const { type, description, estPrincipale } = req.body;

    // Si c'est le document principal, désactiver les autres
    if (estPrincipale === 'true') {
      await Document.updateMany(
        { utilisateur: req.user._id, type, estPrincipale: true },
        { estPrincipale: false }
      );
    }

    const document = await Document.create({
      utilisateur: req.user._id,
      type,
      nomOriginal: req.file.originalname,
      nomStockage: req.file.filename,
      chemin: req.file.path,
      taille: req.file.size,
      mimeType: req.file.mimetype,
      estPrincipale: estPrincipale === 'true',
      description: description || '',
    });

    res.status(201).json({ success: true, document });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Obtenir les documents de l'utilisateur
exports.getMesDocuments = async (req, res) => {
  try {
    const { type } = req.query;
    const query = { utilisateur: req.user._id, isDeleted: false };

    if (type) {
      query.type = type;
    }

    const documents = await Document.find(query).sort({ estPrincipale: -1, createdAt: -1 });

    res.status(200).json({ success: true, documents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mettre à jour un document
exports.updateDocument = async (req, res) => {
  try {
    const { description, estPrincipale, tags } = req.body;

    // Si c'est le document principal, désactiver les autres du même type
    if (estPrincipale === 'true') {
      const doc = await Document.findById(req.params.id);
      if (doc) {
        await Document.updateMany(
          { utilisateur: req.user._id, type: doc.type, estPrincipale: true, _id: { $ne: req.params.id } },
          { estPrincipale: false }
        );
      }
    }

    const document = await Document.findOneAndUpdate(
      { _id: req.params.id, utilisateur: req.user._id, isDeleted: false },
      { description, estPrincipale, tags },
      { new: true }
    );

    if (!document) {
      return res.status(404).json({ success: false, message: 'Document non trouvé' });
    }

    res.status(200).json({ success: true, document });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Supprimer un document
exports.deleteDocument = async (req, res) => {
  try {
    const document = await Document.findOneAndUpdate(
      { _id: req.params.id, utilisateur: req.user._id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!document) {
      return res.status(404).json({ success: false, message: 'Document non trouvé' });
    }

    // TODO: Supprimer le fichier physique du système

    res.status(200).json({ success: true, message: 'Document supprimé' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Télécharger un document
exports.downloadDocument = async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      utilisateur: req.user._id,
      isDeleted: false,
    });

    if (!document) {
      return res.status(404).json({ success: false, message: 'Document non trouvé' });
    }

    // Incrémenter le compteur de téléchargements
    document.telechargements += 1;
    document.dernierAcces = new Date();
    await document.save();

    res.status(200).json({ success: true, chemin: document.chemin, nom: document.nomOriginal });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Stats documents
exports.getStatsDocuments = async (req, res) => {
  try {
    const documents = await Document.find({
      utilisateur: req.user._id,
      isDeleted: false,
    });

    const parType = {
      cv: documents.filter(d => d.type === 'cv').length,
      lettre_motivation: documents.filter(d => d.type === 'lettre_motivation').length,
      portfolio: documents.filter(d => d.type === 'portfolio').length,
      certificat: documents.filter(d => d.type === 'certificat').length,
      diplome: documents.filter(d => d.type === 'diplome').length,
      autre: documents.filter(d => d.type === 'autre').length,
    };

    const tailleTotale = documents.reduce((sum, d) => sum + d.taille, 0);

    res.status(200).json({
      success: true,
      stats: {
        total: documents.length,
        parType,
        tailleTotale,
        tailleMoyenne: documents.length > 0 ? tailleTotale / documents.length : 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { upload, ...exports };

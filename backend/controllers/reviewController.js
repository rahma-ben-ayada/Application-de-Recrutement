const Review = require('../models/Review');
const User = require('../models/User');

// Créer une review
exports.creerReview = async (req, res) => {
  try {
    const {
      entrepriseId,
      noteGenerale,
      criteres,
      titrePoste,
      duree,
      typeContrat,
      avantages,
      inconvenients,
      titre,
      commentaire,
      recommande,
    } = req.body;

    // Vérifier si l'utilisateur a déjà reviewé cette entreprise
    const existe = await Review.findOne({
      auteur: req.user._id,
      entrepriseId,
      isDeleted: false,
    });

    if (existe) {
      return res.status(400).json({ success: false, message: 'Vous avez déjà publié un avis pour cette entreprise' });
    }

    // Récupérer le nom de l'entreprise
    const entreprise = await User.findById(entrepriseId);
    if (!entreprise || entreprise.role !== 'recruteur') {
      return res.status(404).json({ success: false, message: 'Entreprise non trouvée' });
    }

    const review = await Review.create({
      auteur: req.user._id,
      entreprise: entreprise.entreprise || 'Entreprise',
      entrepriseId,
      noteGenerale,
      criteres: criteres || {},
      titrePoste,
      duree,
      typeContrat,
      avantages: avantages || [],
      inconvenients: inconvenients || [],
      titre,
      commentaire,
      recommande,
    });

    await review.populate('auteur', 'nom email');
    await review.populate('entrepriseId', 'entreprise logo');

    res.status(201).json({ success: true, review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Obtenir les reviews d'une entreprise
exports.getReviewsEntreprise = async (req, res) => {
  try {
    const reviews = await Review.find({
      entrepriseId: req.params.entrepriseId,
      isDeleted: false,
    })
      .populate('auteur', 'nom')
      .sort({ createdAt: -1 });

    // Calculer la moyenne
    const moyenne = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.noteGenerale, 0) / reviews.length
      : 0;

    // Critères moyens
    const criteresMoyens = {
      environnement: 0,
      salaire: 0,
      equilibre: 0,
      management: 0,
      culture: 0,
    };

    if (reviews.length > 0) {
      Object.keys(criteresMoyens).forEach(critere => {
        criteresMoyens[critere] = reviews.reduce((sum, r) => sum + (r.criteres[critere] || 0), 0) / reviews.length;
      });
    }

    // Recommandation %
    const recommandation = reviews.length > 0
      ? (reviews.filter(r => r.recommande === true).length / reviews.length) * 100
      : 0;

    res.status(200).json({
      success: true,
      reviews,
      moyenne: moyenne.toFixed(1),
      criteresMoyens,
      recommandation: recommandation.toFixed(0),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Obtenir les reviews de l'utilisateur
exports.getMesReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      auteur: req.user._id,
      isDeleted: false,
    })
      .populate('entrepriseId', 'entreprise logo')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mettre à jour une review
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findOneAndUpdate(
      { _id: req.params.id, auteur: req.user._id, isDeleted: false },
      req.body,
      { new: true }
    )
      .populate('entrepriseId', 'entreprise logo')
      .populate('auteur', 'nom');

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review non trouvée' });
    }

    res.status(200).json({ success: true, review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Supprimer une review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findOneAndUpdate(
      { _id: req.params.id, auteur: req.user._id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review non trouvée' });
    }

    res.status(200).json({ success: true, message: 'Review supprimée' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Like/Dislike une review
exports.likeReview = async (req, res) => {
  try {
    const { type } = req.body; // 'like' ou 'dislike'

    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review non trouvée' });
    }

    if (type === 'like') {
      if (!review.likes.includes(req.user._id)) {
        review.likes.push(req.user._id);
        review.dislikes = review.dislikes.filter(id => id.toString() !== req.user._id.toString());
      }
    } else if (type === 'dislike') {
      if (!review.dislikes.includes(req.user._id)) {
        review.dislikes.push(req.user._id);
        review.likes = review.likes.filter(id => id.toString() !== req.user._id.toString());
      }
    }

    await review.save();
    await review.populate('auteur', 'nom');

    res.status(200).json({ success: true, review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Répondre à une review (entreprise)
exports.repondreReview = async (req, res) => {
  try {
    const { texte } = req.body;

    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review non trouvée' });
    }

    // Vérifier que l'utilisateur est bien l'entreprise concernée
    if (review.entrepriseId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Non autorisé' });
    }

    review.reponse = {
      texte,
      date: new Date(),
    };

    await review.save();
    await review.populate('auteur', 'nom');

    res.status(200).json({ success: true, review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Obtenir les meilleures entreprises
exports.getTopEntreprises = async (req, res) => {
  try {
    const reviews = await Review.find({ isDeleted: false })
      .populate('entrepriseId', 'entreprise logo')
      .sort({ noteGenerale: -1 });

    // Grouper par entreprise et calculer la moyenne
    const entreprisesMap = new Map();

    reviews.forEach(review => {
      const key = review.entrepriseId._id.toString();
      if (!entreprisesMap.has(key)) {
        entreprisesMap.set(key, {
          entreprise: review.entrepriseId,
          totalReviews: 0,
          sommeNotes: 0,
          reviews: [],
        });
      }

      const data = entreprisesMap.get(key);
      data.totalReviews++;
      data.sommeNotes += review.noteGenerale;
      data.reviews.push(review);
    });

    const entreprises = Array.from(entreprisesMap.values())
      .map(data => ({
        entreprise: data.entreprise,
        moyenne: (data.sommeNotes / data.totalReviews).toFixed(1),
        totalReviews: data.totalReviews,
      }))
      .sort((a, b) => b.moyenne - a.moyenne)
      .slice(0, 20);

    res.status(200).json({ success: true, entreprises });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

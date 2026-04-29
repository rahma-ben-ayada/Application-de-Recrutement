const Article = require('../models/Article');

// ===== PUBLIC — Get all published articles =====
exports.getArticles = async (req, res) => {
  try {
    const { categorie, search, featured } = req.query;
    let filter = { isDeleted: false, status: 'published' };

    if (categorie && categorie !== 'Tous') {
      filter.categorie = categorie;
    }

    if (search) {
      filter.$or = [
        { titre: { $regex: search, $options: 'i' } },
        { extrait: { $regex: search, $options: 'i' } },
        { contenu: { $regex: search, $options: 'i' } },
      ];
    }

    if (featured === 'true') {
      filter.featured = true;
    }

    const articles = await Article.find(filter)
      .populate('auteur', 'nom email')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, articles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== PUBLIC — Get single article by ID =====
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findOne({
      _id: req.params.id,
      isDeleted: false,
      status: 'published',
    }).populate('auteur', 'nom email');

    if (!article) {
      return res.status(404).json({ success: false, message: 'Article non trouvé' });
    }

    article.vues += 1;
    await article.save();

    res.status(200).json({ success: true, article });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== ADMIN — Create article =====
exports.createArticle = async (req, res) => {
  try {
    const { titre, contenu, extrait, categorie, image, imageUrl, tempsLecture, featured, tags } = req.body;

    const article = await Article.create({
      titre,
      contenu,
      extrait,
      categorie,
      image: image || '📄',
      imageUrl,
      auteur: req.user._id,
      nomAuteur: req.user.nom || 'Équipe SmartRecruit',
      tempsLecture: tempsLecture || '5 min',
      featured: featured || false,
      tags: tags || [],
      status: 'published',
    });

    res.status(201).json({ success: true, message: 'Article créé ✅', article });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== ADMIN — Update article =====
exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!article) {
      return res.status(404).json({ success: false, message: 'Article non trouvé' });
    }

    const { titre, contenu, extrait, categorie, image, imageUrl, tempsLecture, featured, tags, status } = req.body;

    Object.assign(article, {
      titre,
      contenu,
      extrait,
      categorie,
      image,
      imageUrl,
      tempsLecture,
      featured,
      tags,
      status,
    });

    await article.save();

    res.status(200).json({ success: true, message: 'Article mis à jour ✅', article });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== ADMIN — Delete article (soft delete) =====
exports.deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndUpdate(req.params.id, {
      isDeleted: true,
    });

    res.status(200).json({ success: true, message: 'Article supprimé' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== PUBLIC — Get featured articles =====
exports.getFeaturedArticles = async (req, res) => {
  try {
    const articles = await Article.find({
      featured: true,
      isDeleted: false,
      status: 'published',
    }).populate('auteur', 'nom email').sort({ createdAt: -1 }).limit(5);

    res.status(200).json({ success: true, articles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== PUBLIC — Like article =====
exports.likeArticle = async (req, res) => {
  try {
    const article = await Article.findOne({
      _id: req.params.id,
      isDeleted: false,
      status: 'published',
    });

    if (!article) {
      return res.status(404).json({ success: false, message: 'Article non trouvé' });
    }

    article.likes += 1;
    await article.save();

    res.status(200).json({ success: true, likes: article.likes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== ADMIN — Get all articles (including drafts) =====
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find({ isDeleted: false })
      .populate('auteur', 'nom email')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, articles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ===== Get categories =====
exports.getCategories = async (req, res) => {
  try {
    const categories = ['Conseils Carrière', 'Entretien', 'Tendances', 'Carrière', 'Technologie'];
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

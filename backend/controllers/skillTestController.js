const SkillTest = require('../models/SkillTest');
const TestResult = require('../models/TestResult');

// @desc    Get all skill tests
// @route   GET /api/skill-tests
// @access  Private
const getAllTests = async (req, res) => {
  try {
    const {
      categorie,
      domaine,
      niveau,
      difficulte,
      search,
      page = 1,
      limit = 20,
    } = req.query;

    let query = { actif: true, isDeleted: false };

    if (categorie) query.categorie = categorie;
    if (domaine) query.domaine = domaine;
    if (niveau) query.niveau = niveau;
    if (difficulte) query.difficulte = difficulte;
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [tests, total] = await Promise.all([
      SkillTest.find(query)
        .select('-questions.reponseCorrecte')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      SkillTest.countDocuments(query),
    ]);

    res.json({
      success: true,
      tests,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Error fetching tests:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des tests',
    });
  }
};

// @desc    Get single skill test
// @route   GET /api/skill-tests/:id
// @access  Private
const getTestById = async (req, res) => {
  try {
    const test = await SkillTest.findById(req.params.id);

    if (!test || test.isDeleted) {
      return res.status(404).json({
        success: false,
        message: 'Test non trouvé',
      });
    }

    // Return test without answers if user is a candidate
    if (req.user.role === 'candidat') {
      const testSansReponses = {
        ...test._doc,
        questions: test.questions.map(q => ({
          question: q.question,
          type: q.type,
          options: q.options,
          points: q.points,
        })),
      };
      return res.json({ success: true, test: testSansReponses });
    }

    res.json({ success: true, test });
  } catch (error) {
    console.error('Error fetching test:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du test',
    });
  }
};

// @desc    Create new skill test
// @route   POST /api/skill-tests
// @access  Private/Admin
const createTest = async (req, res) => {
  try {
    const test = await SkillTest.create({
      ...req.body,
      creePar: req.user._id,
    });

    res.status(201).json({
      success: true,
      test,
      message: 'Test créé avec succès',
    });
  } catch (error) {
    console.error('Error creating test:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du test',
    });
  }
};

// @desc    Update skill test
// @route   PUT /api/skill-tests/:id
// @access  Private/Admin
const updateTest = async (req, res) => {
  try {
    const test = await SkillTest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!test || test.isDeleted) {
      return res.status(404).json({
        success: false,
        message: 'Test non trouvé',
      });
    }

    res.json({
      success: true,
      test,
      message: 'Test mis à jour avec succès',
    });
  } catch (error) {
    console.error('Error updating test:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du test',
    });
  }
};

// @desc    Delete skill test
// @route   DELETE /api/skill-tests/:id
// @access  Private/Admin
const deleteTest = async (req, res) => {
  try {
    const test = await SkillTest.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true, actif: false },
      { new: true }
    );

    if (!test) {
      return res.status(404).json({
        success: false,
        message: 'Test non trouvé',
      });
    }

    res.json({
      success: true,
      message: 'Test supprimé avec succès',
    });
  } catch (error) {
    console.error('Error deleting test:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du test',
    });
  }
};

// @desc    Submit test answers
// @route   POST /api/skill-tests/:id/submit
// @access  Private/Candidate
const submitTest = async (req, res) => {
  try {
    const { reponses, dureeTotale } = req.body;
    const test = await SkillTest.findById(req.params.id);

    if (!test || !test.actif) {
      return res.status(404).json({
        success: false,
        message: 'Test non trouvé ou inactif',
      });
    }

    // Calculate score
    let scoreTotal = 0;
    let scoreMax = 0;
    const reponsesDetaillees = [];

    for (const reponse of reponses) {
      const question = test.questions.id(reponse.questionId);
      if (!question) continue;

      scoreMax += question.points;

      const estCorrecte = verifierReponse(question, reponse.reponse);
      const pointsObtenus = estCorrecte ? question.points : 0;
      scoreTotal += pointsObtenus;

      reponsesDetaillees.push({
        question: reponse.questionId,
        reponse: reponse.reponse,
        estCorrecte,
        pointsObtenus,
        tempsPasse: reponse.tempsPasse || 0,
      });
    }

    const pourcentage = Math.round((scoreTotal / scoreMax) * 100);
    const reussi = pourcentage >= test.scoreMin;

    // Check if candidate has previous attempts
    const lastResult = await TestResult.findOne({
      candidat: req.user._id,
      test: test._id,
    }).sort({ tentative: -1 });

    const tentative = (lastResult?.tentative || 0) + 1;

    // Create test result
    const result = await TestResult.create({
      test: test._id,
      candidat: req.user._id,
      reponses: reponsesDetaillees,
      scoreTotal,
      scoreMax,
      pourcentage,
      reussi,
      dureeTotale,
      dateDebut: new Date(Date.now() - dureeTotale * 1000),
      dateFin: new Date(),
      statut: 'termine',
      tentative,
      certification: reussi,
    });

    res.status(201).json({
      success: true,
      result: {
        id: result._id,
        scoreTotal,
        scoreMax,
        pourcentage,
        reussi,
        certification: reussi,
      },
      message: 'Test soumis avec succès',
    });
  } catch (error) {
    console.error('Error submitting test:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la soumission du test',
    });
  }
};

// Helper function to verify answer
const verifierReponse = (question, reponse) => {
  switch (question.type) {
    case 'qcm':
      return question.reponseCorrecte === reponse;
    case 'vrai_faux':
      return question.reponseCorrecte === (reponse === 'vrai');
    case 'code':
      // Simple implementation - could be enhanced with code execution
      return reponse && reponse.trim().length > 0;
    case 'cas_pratique':
      // Manual review required
      return false;
    default:
      return false;
  }
};

// @desc    Get candidate's test results
// @route   GET /api/skill-tests/results/mes
// @access  Private/Candidate
const getMyResults = async (req, res) => {
  try {
    const results = await TestResult.find({
      candidat: req.user._id,
      isDeleted: false,
    })
      .populate('test', 'titre domaine niveau')
      .sort({ createdAt: -1 });

    res.json({ success: true, results });
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des résultats',
    });
  }
};

// @desc    Get candidate badges
// @route   GET /api/skill-tests/badges
// @access  Private/Candidate
const getMyBadges = async (req, res) => {
  try {
    const results = await TestResult.find({
      candidat: req.user._id,
      reussi: true,
      isDeleted: false,
    }).populate('test');

    const badges = results.flatMap(result => {
      const testBadges = [];
      if (result.pourcentage >= 90) {
        testBadges.push({
          type: 'expert',
          label: `${result.test.domaine} Expert`,
          icon: '🏆',
          test: result.test.titre,
        });
      } else if (result.pourcentage >= 80) {
        testBadges.push({
          type: 'advanced',
          label: `${result.test.domaine} Avancé`,
          icon: '🥇',
          test: result.test.titre,
        });
      } else {
        testBadges.push({
          type: 'certified',
          label: `${result.test.domaine} Certifié`,
          icon: '🎖️',
          test: result.test.titre,
        });
      }
      return testBadges;
    });

    res.json({ success: true, badges });
  } catch (error) {
    console.error('Error fetching badges:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des badges',
    });
  }
};

module.exports = {
  getAllTests,
  getTestById,
  createTest,
  updateTest,
  deleteTest,
  submitTest,
  getMyResults,
  getMyBadges,
};

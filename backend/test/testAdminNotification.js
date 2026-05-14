/**
 * Script de test pour vérifier les notifications administrateurs
 * Exécutez avec: node backend/test/testAdminNotification.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const NotificationHelper = require('../utils/notificationHelper');

// Charger les variables d'environnement
dotenv.config();

// Connexion à la base de données
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smartrecruit', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connecté à MongoDB');
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB:', error.message);
    process.exit(1);
  }
};

/**
 * Test de notification pour un nouvel utilisateur
 */
const testNouvelUtilisateur = async () => {
  console.log('\n📝 Test: Notification nouvel utilisateur');

  const result = await NotificationHelper.nouvelUtilisateur({
    _id: new mongoose.Types.ObjectId(),
    nom: 'Jean Dupont',
    role: 'candidat',
  });

  if (result && result.length > 0) {
    console.log('✅ Notification créée avec succès!');
    console.log(`📊 Nombre d\'administrateurs notifiés: ${result.length}`);
    result.forEach((notif, index) => {
      console.log(`   ${index + 1}. ${notif.titre}: ${notif.message}`);
    });
  } else {
    console.log('❌ Échec de la création de notification');
  }

  return result;
};

/**
 * Test de notification de nouvelle candidature
 */
const testNouvelleCandidature = async () => {
  console.log('\n📝 Test: Notification nouvelle candidature');

  // Créer un ID de recruteur factice pour le test
  const recruteurId = new mongoose.Types.ObjectId();

  const result = await NotificationHelper.nouvelleCandidature(
    recruteurId,
    'Marie Curie',
    'Développeur Full Stack'
  );

  if (result) {
    console.log('✅ Notification de candidature créée!');
    console.log(`📧 Titre: ${result.titre}`);
    console.log(`💬 Message: ${result.message}`);
  } else {
    console.log('❌ Échec de la création de notification');
  }

  return result;
};

/**
 * Test de notification de changement de statut
 */
const testChangementStatut = async () => {
  console.log('\n📝 Test: Notification changement de statut');

  const candidatId = new mongoose.Types.ObjectId();

  const result = await NotificationHelper.candidatureStatutChange(
    candidatId,
    'Développeur Frontend',
    'entretien'
  );

  if (result) {
    console.log('✅ Notification de statut créée!');
    console.log(`📧 Titre: ${result.titre}`);
    console.log(`💬 Message: ${result.message}`);
    console.log(`🏷️ Type: ${result.type}`);
  } else {
    console.log('❌ Échec de la création de notification');
  }

  return result;
};

/**
 * Fonction principale
 */
const runTests = async () => {
  try {
    await connectDB();

    console.log('🚀 Début des tests de notification...\n');
    console.log('=' .repeat(50));

    // Exécuter les tests
    await testNouvelUtilisateur();
    await testNouvelleCandidature();
    await testChangementStatut();

    console.log('\n' + '='.repeat(50));
    console.log('✅ Tests terminés!');

    // Afficher les instructions
    console.log('\n📋 Instructions pour vérifier les notifications:');
    console.log('1. Connectez-vous en tant qu\'admin');
    console.log('2. Allez sur la page d\'administration');
    console.log('3. Cliquez sur la cloche de notification dans l\'en-tête');
    console.log('4. Vous devriez voir les notifications de test créées');

  } catch (error) {
    console.error('❌ Erreur lors des tests:', error);
  } finally {
    // Fermer la connexion
    await mongoose.connection.close();
    console.log('\n👋 Déconnexion de la base de données');
    process.exit(0);
  }
};

// Exécuter les tests
runTests();

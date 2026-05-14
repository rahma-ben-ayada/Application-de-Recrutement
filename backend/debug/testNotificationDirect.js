/**
 * Test direct de création de notification pour admin
 * Usage: node backend/debug/testNotificationDirect.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Notification = require('../models/Notification');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smartrecruit');
    console.log('✅ Connecté à MongoDB');
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB:', error.message);
    process.exit(1);
  }
};

const createTestNotification = async () => {
  try {
    console.log('\n🧪 Test: Création manuelle de notification pour admin\n');

    // Trouver tous les admins actifs
    const admins = await User.find({ role: 'admin', status: 'active' });

    if (admins.length === 0) {
      console.log('⚠️ Aucun admin actif trouvé!');
      console.log('💡 Créez d\'abord un compte admin avec status="active"');
      return;
    }

    console.log(`✅ ${admins.length} admin(s) actif(s) trouvé(s)`);

    // Créer une notification pour chaque admin
    for (const admin of admins) {
      console.log(`\n📧 Création notification pour: ${admin.nom} (${admin.email})`);

      const notification = await Notification.create({
        utilisateur: admin._id,
        titre: '🧪 Test de notification',
        message: 'Ceci est une notification de test créée manuellement',
        type: 'info',
        lien: '/admin/utilisateurs',
        donnees: { test: true, timestamp: new Date() },
      });

      console.log(`✅ Notification créée avec ID: ${notification._id}`);
      console.log(`   Titre: ${notification.titre}`);
      console.log(`   Message: ${notification.message}`);
    }

    console.log('\n✅ Test réussi! Les notifications sont dans la base de données.');
    console.log('💡 Vérifiez dans l\'application en vous connectant en tant qu\'admin.');

  } catch (error) {
    console.error('❌ Erreur:', error);
  }
};

const main = async () => {
  try {
    await connectDB();
    await createTestNotification();
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Déconnexion de la base de données');
    process.exit(0);
  }
};

main();

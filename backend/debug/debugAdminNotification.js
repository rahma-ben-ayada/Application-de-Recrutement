/**
 * Script de debug pour vérifier le système de notifications admin
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

const debugAdmins = async () => {
  console.log('\n🔍 Recherche des administrateurs...');

  const admins = await User.find({ role: 'admin' });

  console.log(`📊 Nombre total d'admins: ${admins.length}`);

  if (admins.length === 0) {
    console.log('⚠️ Aucun administrateur trouvé dans la base de données!');
    console.log('💡 Créez d\'abord un compte admin pour recevoir les notifications.');
    return;
  }

  admins.forEach((admin, index) => {
    console.log(`\n${index + 1}. ${admin.nom}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Status: ${admin.status}`);
    console.log(`   ID: ${admin._id}`);
    console.log(`   Actif: ${admin.status === 'active' ? '✅' : '❌'}`);
  });

  const activeAdmins = admins.filter(a => a.status === 'active');
  console.log(`\n✅ Admins actifs: ${activeAdmins.length}`);

  return activeAdmins;
};

const debugNotifications = async () => {
  console.log('\n🔍 Vérification des notifications existantes...');

  const notifications = await Notification.find({})
    .sort({ createdAt: -1 })
    .limit(10)
    .populate('utilisateur', 'nom email role');

  console.log(`📊 Nombre total de notifications: ${await Notification.countDocuments()}`);
  console.log(`📊 10 dernières notifications:`);

  if (notifications.length === 0) {
    console.log('⚠️ Aucune notification trouvée dans la base de données!');
    return;
  }

  notifications.forEach((notif, index) => {
    console.log(`\n${index + 1}. ${notif.titre}`);
    console.log(`   Message: ${notif.message}`);
    console.log(`   Type: ${notif.type}`);
    console.log(`   Destinataire: ${notif.utilisateur?.nom || 'N/A'} (${notif.utilisateur?.role || 'N/A'})`);
    console.log(`   Créée le: ${notif.createdAt}`);
    console.log(`   Lue: ${notif.lu ? '✅' : '❌'}`);
  });
};

const testCreateNotification = async (adminId) => {
  console.log('\n🧪 Test de création de notification...');

  try {
    const notification = await Notification.create({
      utilisateur: adminId,
      titre: '🧪 Test de notification',
      message: 'Ceci est une notification de test pour vérifier le système',
      type: 'info',
      lien: '/admin/utilisateurs',
      donnees: { test: true },
    });

    console.log('✅ Notification de test créée!');
    console.log(`   ID: ${notification._id}`);
    console.log(`   Titre: ${notification.titre}`);
    console.log(`   Message: ${notification.message}`);

    return notification;
  } catch (error) {
    console.error('❌ Erreur lors de la création de notification:', error);
    return null;
  }
};

const main = async () => {
  try {
    await connectDB();

    console.log('🔧 Debug du système de notifications admin\n');
    console.log('='.repeat(60));

    // 1. Vérifier les admins
    const activeAdmins = await debugAdmins();

    // 2. Vérifier les notifications existantes
    await debugNotifications();

    // 3. Tester la création de notification si des admins actifs existent
    if (activeAdmins.length > 0) {
      const adminId = activeAdmins[0]._id;
      await testCreateNotification(adminId);

      console.log('\n💡 Prochaines étapes:');
      console.log('1. Connectez-vous en tant qu\'admin dans l\'application');
      console.log('2. Vérifiez que vous voyez la notification de test');
      console.log('3. Créez un nouvel utilisateur (recruteur ou candidat)');
      console.log('4. Vérifiez que vous recevez une notification en temps réel');
    } else {
      console.log('\n⚠️ Aucun admin actif trouvé!');
      console.log('💡 Créez un compte admin et activez-le:');
      console.log('   - Status doit être "active"');
      console.log('   - Le compte doit être validé par un super admin');
    }

    console.log('\n' + '='.repeat(60));
    console.log('✅ Debug terminé!');

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Déconnexion de la base de données');
    process.exit(0);
  }
};

main();

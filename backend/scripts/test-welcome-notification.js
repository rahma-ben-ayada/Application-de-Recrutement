/**
 * Script de test pour les notifications de bienvenue
 * Simule des premières connexions pour différents rôles
 */

const mongoose = require('mongoose');
const User = require('../models/User');
const NotificationHelper = require('../utils/notificationHelper');
const Notification = require('../models/Notification');

// Configuration MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/recrutement';

console.log('🧪 Test des notifications de bienvenue\n');

async function testWelcomeNotifications() {
  try {
    // Connexion à MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connecté à MongoDB\n');

    // Trouver des utilisateurs pour tester
    const users = await User.find({ status: 'active' }).limit(3);

    if (users.length === 0) {
      console.log('❌ Aucun utilisateur trouvé pour tester');
      process.exit(0);
    }

    console.log(`👥 ${users.length} utilisateur(s) trouvé(s) pour les tests\n`);

    // Tester pour chaque utilisateur
    for (const user of users) {
      console.log(`📧 Test pour ${user.nom} (${user.role})`);
      console.log('─'.repeat(50));

      // Simuler une première connexion en mettant lastLogin à null
      const originalLastLogin = user.lastLogin;
      user.lastLogin = null;
      await user.save();

      // Créer la notification de bienvenue
      const notification = await NotificationHelper.bienvenue(
        user._id,
        user.nom,
        user.role
      );

      if (notification) {
        console.log(`✅ Notification créée: ${notification.titre}`);
        console.log(`📝 Message: ${notification.message.substring(0, 80)}...`);
        console.log(`🔗 Lien: ${notification.lien}`);
        console.log(`🎨 Type: ${notification.type}`);

        // Vérifier que la notification a été créée dans la base
        const savedNotification = await Notification.findById(notification._id);
        if (savedNotification) {
          console.log(`💾 Notification sauvegardée en base: OUI`);
        } else {
          console.log(`💾 Notification sauvegardée en base: NON`);
        }
      } else {
        console.log(`❌ Échec de la création de notification`);
      }

      // Restaurer lastLogin
      user.lastLogin = originalLastLogin;
      await user.save();

      console.log('');
    }

    // Vérifier les notifications créées
    const allNotifications = await Notification.find({
      titre: { $regex: /Bienvenue/i }
    });

    console.log('📊 Résumé des notifications de bienvenue créées:');
    console.log('─'.repeat(50));
    console.log(`Total: ${allNotifications.length} notification(s) de bienvenue`);

    allNotifications.forEach((notif, index) => {
      console.log(`  ${index + 1}. ${notif.titre} → ${notif.lien}`);
    });

    console.log('\n✅ Tests terminés avec succès!');

    // Nettoyer et se déconnecter
    await mongoose.disconnect();
    process.exit(0);

  } catch (error) {
    console.error('❌ Erreur lors des tests:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

// Exécuter les tests
testWelcomeNotifications();

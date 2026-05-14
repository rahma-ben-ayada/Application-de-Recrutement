/**
 * Test de l'API des notifications
 * Usage: node backend/debug/testNotificationAPI.js <user_id>
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

const testNotificationAPI = async (userId) => {
  try {
    console.log('\n🧪 Test de l\'API des notifications\n');
    console.log('='.repeat(60));

    if (!userId) {
      console.log('⚠️ Veuillez fournir un user_id');
      console.log('💡 Usage: node testNotificationAPI.js <user_id>');
      console.log('💡 Ou: node testNotificationAPI.js email=<user-email>');

      // Trouver un utilisateur pour le test
      const users = await User.find({ status: 'active' }).limit(5);
      if (users.length > 0) {
        console.log('\n📋 Utilisateurs disponibles pour le test:');
        users.forEach((user, index) => {
          console.log(`   ${index + 1}. ${user.nom} (${user.role}) - ID: ${user._id}`);
        });
        userId = users[0]._id;
        console.log(`\n✅ Utilisation du premier utilisateur: ${users[0].nom}`);
      } else {
        console.log('❌ Aucun utilisateur trouvé');
        process.exit(1);
      }
    }

    // Simuler la requête getMesNotifications
    console.log(`\n📡 Récupération des notifications pour l'utilisateur: ${userId}`);

    const notifications = await Notification.find({
      utilisateur: userId,
      isDeleted: false,
      $or: [
        { expireLe: null },
        { expireLe: { $gt: new Date() } },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(50);

    const nonLues = notifications.filter(n => !n.lu).length;

    console.log(`\n📊 Résultat:`);
    console.log(`   - Total des notifications: ${notifications.length}`);
    console.log(`   - Notifications non lues: ${nonLues}`);

    if (notifications.length === 0) {
      console.log(`\n⚠️ Aucune notification trouvée pour cet utilisateur`);
      console.log(`💡 Créons une notification de test...`);

      const testNotification = await Notification.create({
        utilisateur: userId,
        titre: '🧪 Test de notification',
        message: 'Ceci est une notification de test pour vérifier l\'API',
        type: 'info',
        lien: '/admin/utilisateurs',
        donnees: { test: true, timestamp: new Date() },
      });

      console.log(`✅ Notification de test créée avec ID: ${testNotification._id}`);

      // Récupérer à nouveau
      const notificationsAfter = await Notification.find({
        utilisateur: userId,
        isDeleted: false,
        $or: [
          { expireLe: null },
          { expireLe: { $gt: new Date() } },
        ],
      })
        .sort({ createdAt: -1 })
        .limit(50);

      console.log(`\n📊 Après création:`);
      console.log(`   - Total des notifications: ${notificationsAfter.length}`);
      console.log(`   - Notifications non lues: ${notificationsAfter.filter(n => !n.lu).length}`);

      console.log(`\n📋 Détail de la notification créée:`);
      console.log(`   - ID: ${testNotification._id}`);
      console.log(`   - Titre: ${testNotification.titre}`);
      console.log(`   - Message: ${testNotification.message}`);
      console.log(`   - Type: ${testNotification.type}`);
      console.log(`   - Créée le: ${testNotification.createdAt}`);
    } else {
      console.log(`\n📋 Dernières notifications:`);
      notifications.slice(0, 5).forEach((notif, index) => {
        console.log(`\n   ${index + 1}. ${notif.titre}`);
        console.log(`      Message: ${notif.message}`);
        console.log(`      Type: ${notif.type}`);
        console.log(`      Lue: ${notif.lu ? '✅' : '❌'}`);
        console.log(`      Créée le: ${notif.createdAt}`);
      });
    }

    console.log('\n' + '='.repeat(60));
    console.log('✅ Test terminé!');
    console.log('\n💡 Pour tester l\'API complète:');
    console.log('1. Démarrez le serveur backend');
    console.log('2. Connectez-vous avec l\'utilisateur testé');
    console.log('3. Appelez l\'endpoint: GET /api/notifications/mes');
    console.log('4. Vérifiez que vous recevez les notifications');

  } catch (error) {
    console.error('❌ Erreur:', error);
  }
};

const main = async () => {
  const args = process.argv.slice(2);
  const userId = args[0];

  try {
    await connectDB();
    await testNotificationAPI(userId);
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Déconnexion de la base de données');
    process.exit(0);
  }
};

main();

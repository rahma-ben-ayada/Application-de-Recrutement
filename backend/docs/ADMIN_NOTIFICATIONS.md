# Système de Notifications Admin

## 📋 Vue d'ensemble

Le système de notifications admin avertit automatiquement tous les administrateurs lorsqu'un nouvel utilisateur crée un compte sur la plateforme.

## 🔔 Comment ça fonctionne

### 1. Lors de l'inscription d'un nouvel utilisateur

Quand un utilisateur s'inscrit via:
- **Formulaire d'inscription** (`/api/auth/register`)
- **Google OAuth** (`/api/auth/google/callback`)

Le système crée automatiquement une notification pour tous les administrateurs.

### 2. Contenu de la notification

```javascript
{
  titre: "👤 Nouvel utilisateur inscrit",
  message: "Jean Dupont (candidat) a rejoint la plateforme",
  type: "info",
  lien: "/admin/utilisateurs",
  donnees: {
    userId: "...",
    role: "candidat"
  }
}
```

## 🛠️ Implémentation technique

### Backend

**1. Controller d'authentification** ([authController.js](../controllers/authController.js))

```javascript
// Dans la fonction register()
if (role !== 'admin') {
  await NotificationHelper.nouvelUtilisateur({
    _id: user._id,
    nom: user.nom,
    role: user.role,
  });
}
```

**2. Helper de notification** ([notificationHelper.js](../utils/notificationHelper.js))

```javascript
static async nouvelUtilisateur(userData) {
  return this.notifyRole('admin', {
    titre: '👤 Nouvel utilisateur inscrit',
    message: `${userData.nom} (${userData.role}) a rejoint la plateforme`,
    type: 'info',
    lien: '/admin/utilisateurs',
    donnees: { userId: userData._id, role: userData.role },
  });
}
```

**3. Socket.io pour temps réel** ([server.js](../server.js))

```javascript
io.to(`role-admin`).emit('notification-role', {
  titre: data.titre,
  message: data.message,
  type: data.type,
});
```

### Frontend

**1. Contexte Socket** ([SocketContext.jsx](../../frontend/src/context/SocketContext.jsx))

```javascript
newSocket.on('notification-role', (data) => {
  setNotifications(prev => [
    { ...data, isRoleNotification: true },
    ...prev
  ]);
});
```

**2. Centre de notifications** ([NotificationCenter.jsx](../../frontend/src/components/common/NotificationCenter.jsx))

- Affiche le compteur de notifications non lues
- Liste déroulante avec toutes les notifications
- Actions rapides (marquer comme lu, supprimer)

## 🧪 Tester le système

### Méthode 1: Via l'interface utilisateur

1. **Ouvrir deux navigateurs différents**
   - Navigateur 1: Connecté en tant qu'admin
   - Navigateur 2: Page d'inscription

2. **Créer un nouveau compte** sur le navigateur 2
   - Aller à `/register`
   - Remplir le formulaire
   - Soumettre

3. **Vérifier la notification** sur le navigateur 1
   - La cloche de notification doit afficher un badge
   - Cliquer sur la cloche pour voir la notification

### Méthode 2: Via le script de test

```bash
# Dans le répertoire backend
cd backend

# Installer les dépendances si nécessaire
npm install

# Lancer le script de test
node test/testAdminNotification.js
```

Le script va:
- Créer des notifications de test
- Afficher les résultats dans la console
- Vous permettre de vérifier que tout fonctionne

### Méthode 3: Via API (curl)

```bash
# Créer un nouvel utilisateur
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "candidat"
  }'
```

Puis vérifier que les admins reçoivent une notification.

## 📊 Types de notifications admin

Le système envoie différents types de notifications aux administrateurs:

| Type | Déclencheur | Description |
|------|-------------|-------------|
| 👤 Nouvel utilisateur | Inscription | Un nouvel utilisateur s'inscrit |
| 🚨 Signalement | Contenu signalé | Du contenu nécessite une modération |
| 💰 Abonnement | Nouvel abonnement | Un utilisateur s'abonne à premium |
| ⚠️ Alerte système | Problème système | Une alerte système nécessite une attention |

## 🔧 Configuration

### Variables d'environnement

```env
# Frontend URL pour Socket.io CORS
FRONTEND_URL=http://localhost:3000

# Socket.io est automatiquement configuré avec les origines autorisées
```

### Paramètres de notification

- **Expiration par défaut**: 30 jours (configurable dans le modèle Notification)
- **Limite d'affichage**: 50 notifications par utilisateur
- **Types supportés**: info, success, warning, error, candidature, entretien, offre, alerte, message

## 🚀 Déploiement

### Production

1. **Assurez-vous que Socket.io est activé**
   ```javascript
   // Dans server.js
   server.listen(PORT, HOST, () => {
     console.log(`🔔 Socket.io actif pour les notifications en temps réel`);
   });
   ```

2. **Vérifiez les paramètres CORS**
   ```javascript
   io = new Server(server, {
     cors: {
       origin: [process.env.FRONTEND_URL],
       credentials: true,
     },
   });
   ```

3. **Testez avant de mettre en production**
   - Utilisez le script de test
   - Vérifiez les notifications en temps réel
   - Confirmez que tous les admins reçoivent les notifications

## 🐛 Dépannage

### Problème: Les notifications ne s'affichent pas

**Solutions:**
1. Vérifiez que Socket.io est connecté (console du navigateur)
2. Vérifiez que l'utilisateur est connecté
3. Vérifiez les permissions de notification du navigateur
4. Vérifiez que le serveur backend est en cours d'exécution

### Problème: Les notifications ne sont pas créées

**Solutions:**
1. Vérifiez les logs du serveur pour les erreurs
2. Vérifiez que la connexion à la base de données fonctionne
3. Vérifiez que NotificationHelper est correctement importé
4. Testez avec le script de test

### Problème: Seul un admin reçoit les notifications

**Solutions:**
1. Vérifiez que tous les admins sont marqués comme `status: 'active'`
2. Vérifiez que les admins se sont connectés au moins une fois
3. Vérifiez que Socket.io rejoint correctement la room `role-admin`

## 📈 Améliorations futures

- [ ] Ajouter des notifications par email
- [ ] Ajouter des notifications push mobile
- [ ] Permettre aux admins de personnaliser les préférences de notification
- [ ] Ajouter des statistiques sur les notifications
- [ ] Créer une page de gestion des notifications pour les admins

## 📚 Ressources

- [Documentation Socket.io](https://socket.io/docs/)
- [Modèle Notification](../models/Notification.js)
- [Controller notification](../controllers/notificationController.js)
- [Helper notification](../utils/notificationHelper.js)

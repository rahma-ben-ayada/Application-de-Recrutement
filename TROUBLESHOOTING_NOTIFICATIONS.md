# 🔧 Guide de Dépannage - Notifications Admin

## Symptôme: Aucune notification affichée pour l'admin lors de la création d'un nouvel utilisateur

### 📋 Checklist de Diagnostic

#### 1. Vérifier que le serveur backend est démarré
```bash
cd backend
npm start
# Vous devriez voir: "🔔 Socket.io actif pour les notifications en temps réel"
```

#### 2. Vérifier qu'il existe des admins actifs dans la base de données
```bash
cd backend
node debug/debugAdminNotification.js
```

Ce script affichera:
- Nombre d'admins dans la base de données
- Status de chaque admin (doit être "active")
- Notifications existantes

#### 3. Tester la création de notification manuellement
```bash
cd backend
node debug/testNotificationDirect.js
```

Cela créera une notification de test directement dans la base de données.

#### 4. Vérifier la connexion Socket.io dans le navigateur

1. Ouvrez la console du navigateur (F12)
2. Connectez-vous en tant qu'admin
3. Cherchez les messages:
   - `🔌 Socket connecté: [socket-id]`
   - `👤 Utilisateur [id] a rejoint sa room`
   - `👥 Utilisateur avec rôle admin a rejoint la room rôle`

#### 5. Vérifier les logs du serveur lors d'une inscription

Quand un nouvel utilisateur s'inscrit, vous devriez voir dans les logs du serveur:
```
🔔 NotificationHelper.notifyRole: X utilisateurs admin trouvés
📧 Création notification pour utilisateur [id]
✅ Notification créée avec ID: [id]
🔌 Émission Socket.io vers room role-admin
```

---

## 🐛 Problèmes Courants et Solutions

### Problème 1: "Aucun admin actif trouvé"

**Cause:** Les admins dans la base de données ont un status différent de "active"

**Solution:**
```javascript
// Dans la console MongoDB ou un script
const User = require('./models/User');
await User.updateMany(
  { role: 'admin' },
  { status: 'active' }
);
```

### Problème 2: Socket.io ne se connecte pas

**Cause:** Mauvaise configuration URL ou CORS

**Solution:**
Vérifiez `.env`:
```env
# Backend
FRONTEND_URL=http://localhost:3000

# Frontend
REACT_APP_API_URL=http://localhost:5000
```

### Problème 3: Notifications créées mais non affichées

**Cause:** Le frontend n'écoute pas les bons événements Socket.io

**Solution:**
Vérifiez que [SocketContext.jsx](frontend/src/context/SocketContext.jsx) contient:
```javascript
newSocket.on('notification-role', (data) => {
  console.log('📢 Notification de rôle:', data);
  setNotifications(prev => [{ ...data, isRoleNotification: true }, ...prev]);
});
```

### Problème 4: NotificationHelper n'est pas importé

**Cause:** L'import est manquant dans authController.js

**Solution:**
Vérifiez que [authController.js](backend/controllers/authController.js) contient:
```javascript
const NotificationHelper = require('../utils/notificationHelper');
```

---

## 🧪 Tests Complets

### Test 1: Via l'interface utilisateur

1. **Ouvrez deux navigateurs différents**
   - Navigateur A: Connecté en tant qu'admin
   - Navigateur B: Page d'inscription

2. **Dans Navigateur B**, créez un nouvel utilisateur:
   - Email: test@example.com
   - Role: recruteur
   - Cliquez sur "S'inscrire"

3. **Dans Navigateur A**, vérifiez:
   - Badge de notification sur la cloche
   - Console du navigateur pour les messages Socket.io
   - Liste déroulante des notifications

### Test 2: Via les scripts de debug

```bash
# Terminal 1: Démarrer le serveur
cd backend
npm start

# Terminal 2: Lancer le debug
cd backend
node debug/debugAdminNotification.js

# Terminal 3: Tester la création directe
node debug/testNotificationDirect.js
```

### Test 3: Via l'API (curl)

```bash
# Créer un nouvel utilisateur
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Test Recruiter",
    "email": "test@example.com",
    "password": "password123",
    "role": "recruteur"
  }'
```

Puis vérifiez que les admins reçoivent une notification.

---

## 🔍 Logs à Vérifier

### Logs Backend (serveur)
```
🔌 Client connecté: [socket-id]
👤 Utilisateur [id] a rejoint sa room
👥 Utilisateur avec rôle admin a rejoint la room rôle
🔔 NotificationHelper.notifyRole: X utilisateurs admin trouvés
📧 Création notification pour utilisateur [id]
✅ Notification créée avec ID: [id]
🔌 Émission Socket.io vers room role-admin
```

### Logs Frontend (navigateur)
```
🔌 Socket connecté: [socket-id]
📢 Notification de rôle: { titre: "👤 Nouvel utilisateur inscrit", ... }
```

Si vous ne voyez pas ces logs, il y a un problème à ce niveau.

---

## 📝 Checklist de Vérification

- [ ] Le serveur backend est démarré
- [ ] Socket.io est initialisé (message "🔔 Socket.io actif")
- [ ] Il existe au moins un admin avec status="active"
- [ ] L'admin est connecté à l'application
- [ ] La console du navigateur montre "Socket connecté"
- [ ] L'admin a rejoint la room "role-admin"
- [ ] Les logs serveur montrent la création de notification
- [ ] Le frontend écoute l'événement "notification-role"

---

## 🚀 Solution Rapide

Si rien ne fonctionne, essayez cette procédure complète:

1. **Arrêtez tous les serveurs**
2. **Nettoyez et redémarrez le backend:**
   ```bash
   cd backend
   rm -rf node_modules package-lock.json
   npm install
   npm start
   ```

3. **Vérifiez la base de données:**
   ```bash
   node debug/debugAdminNotification.js
   ```

4. **Créez un admin de test si nécessaire:**
   ```bash
   # Dans la console MongoDB
   db.users.insertOne({
     nom: "Admin Test",
     email: "admin@test.com",
     password: "$2a$12$...", # Hash du mot de passe
     role: "admin",
     status: "active"
   })
   ```

5. **Testez avec les scripts de debug**

6. **Vérifiez le frontend**

---

## 💡 Conseils

- Toujours vérifier les logs du serveur ET du navigateur
- Utiliser les scripts de debug avant de tester manuellement
- S'assurer que les variables d'environnement sont correctes
- Vérifier que le pare-feu ne bloque pas les connexions WebSocket

## 📞 Support

Si le problème persiste après avoir suivi ce guide:
1. Collectez les logs du serveur et du navigateur
2. Exécutez les scripts de debug et sauvegardez la sortie
3. Vérifiez que tous les fichiers mentionnés existent et sont corrects

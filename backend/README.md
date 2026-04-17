# SmartRecruit Backend API

Plateforme de Recrutement Premium - API REST complète avec MongoDB

## 📋 Table des matières

- [Architecture](#architecture)
- [Modèles de données](#modèles-de-données)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Sécurité](#sécurité)
- [Fonctionnalités](#fonctionnalités)

---

## 🏗️ Architecture

```
backend/
├── config/
│   ├── db.js                 # Connexion MongoDB
│   └── constants.js          # Constantes globales
├── models/                   # Modèles Mongoose (30+ modèles)
├── controllers/              # Contrôleurs API
├── routes/                   # Routes Express
├── middleware/               # Middleware personnalisés
├── utils/                    # Utilitaires (email, helpers)
├── uploads/                  # Fichiers uploadés
└── server.js                 # Point d'entrée
```

---

## 📊 Modèles de données

### Utilisateurs & Authentification
- **User** - Utilisateurs (candidats, recruteurs, admins)
- **Setting** - Paramètres utilisateur
- **Notification** - Système de notifications
- **ActivityLog** - Journal d'activités

### Recrutement
- **Offre** - Offres d'emploi
- **Candidature** - Candidatures (avec vidéo)
- **Entretien** - Entretiens planifiés
- **JobApplicationFlow** - Workflow de candidature

### Contenu & Médias
- **Document** - CVs, lettres, certificats
- **Portfolio** - Portfolio projets
- **Education** - Formation
- **Tag** - Étiquettes & compétences

### Communauté
- **Forum** - Forum discussions
- **ForumReply** - Réponses forum
- **Review** - Avis entreprises
- **Event** - Événements carrière

### Modération & Sécurité
- **Report** - Signalements
- **Workflow** - Automatisations

### Monétisation
- **Subscription** - Abonnements
- **Promotion** - Codes promotionnels
- **Salary** - Données salariales

### Intelligence Artificielle
- **Recommendation** - Recommandations IA
- **Analytics** - Statistiques utilisateur

### Formation & Certification
- **SkillAssessment** - Évaluation compétences
- **TestSkill** - Tests de compétences
- **TestResult** - Résultats tests
- **Badge** - Badges accomplissements
- **UserBadge** - Badges utilisateurs
- **CareerPath** - Parcours carrière
- **Mentorship** - Programme mentorat

### Autres
- **Alerte** - Alertes offres emploi
- **Favori** - Favoris/bookmarks
- **SavedSearch** - Recherches sauvegardées
- **Company** - Profils entreprises
- **Integration** - Intégrations tierces
- **Message** - Messagerie

---

## 🚀 API Endpoints

### Authentification
```
POST   /api/auth/register              # Inscription
POST   /api/auth/login                 # Connexion
POST   /api/auth/admin/login           # Connexion admin
POST   /api/auth/logout                # Déconnexion
POST   /api/auth/confirm-email         # Confirmation email
POST   /api/auth/forgot-password       # Mot de passe oublié
POST   /api/auth/reset-password        # Réinitialiser mot de passe
GET    /api/auth/me                    # Profil utilisateur
PUT    /api/auth/update-profile        # Mettre à jour profil
PUT    /api/auth/change-password       # Changer mot de passe
```

### Utilisateurs
```
GET    /api/users                      # Liste utilisateurs (admin)
GET    /api/users/:id                  # Détails utilisateur
PUT    /api/users/:id                  # Modifier utilisateur
DELETE /api/users/:id                  # Supprimer utilisateur
PUT    /api/users/:id/status           # Changer statut
GET    /api/users/:id/stats            # Statistiques utilisateur
```

### Offres d'emploi
```
GET    /api/offres                     # Liste offres
POST   /api/offres                     # Créer offre
GET    /api/offres/:id                 # Détails offre
PUT    /api/offres/:id                 # Modifier offre
DELETE /api/offres/:id                 # Supprimer offre
GET    /api/offres/search              # Recherche avancée
GET    /api/offres/recommendations     # Recommandations IA
POST   /api/offres/:id/promote         # Promouvoir offre
```

### Candidatures
```
GET    /api/candidatures               # Liste candidatures
POST   /api/candidatures               # Postuler (avec vidéo)
GET    /api/candidatures/:id           # Détails candidature
PUT    /api/candidatures/:id/status    # Changer statut
DELETE /api/candidatures/:id           # Supprimer candidature
GET    /api/candidature/stats          # Statistiques
```

### Entretiens
```
GET    /api/entretiens                 # Liste entretiens
POST   /api/entretiens                 # Créer entretien
GET    /api/entretiens/:id             # Détails entretien
PUT    /api/entretiens/:id             # Modifier entretien
PUT    /api/entretiens/:id/status      # Changer statut
DELETE /api/entretiens/:id             # Annuler entretien
GET    /api/entretiens/availability    # Disponibilités
```

### Alertes
```
GET    /api/alertes                    # Liste alertes
POST   /api/alertes                    # Créer alerte
GET    /api/alertes/:id                # Détails alerte
PUT    /api/alertes/:id                # Modifier alerte
DELETE /api/alertes/:id                # Supprimer alerte
POST   /api/alertes/check              # Vérifier nouvelles offres
```

### Favoris
```
GET    /api/favoris                    # Liste favoris
POST   /api/favoris                    # Ajouter favori
DELETE /api/favoris/:id                # Supprimer favori
GET    /api/favoris/check/:offreId     # Vérifier si favori
```

### Avis
```
GET    /api/reviews                    # Liste avis
POST   /api/reviews                    # Créer avis
GET    /api/reviews/:id                # Détails avis
PUT    /api/reviews/:id                # Modifier avis
DELETE /api/reviews/:id                # Supprimer avis
GET    /api/reviews/company/:companyId # Avis entreprise
```

### Notifications
```
GET    /api/notifications              # Liste notifications
PUT    /api/notifications/:id/read     # Marquer comme lu
PUT    /api/notifications/read-all     # Tout marquer comme lu
DELETE /api/notifications/:id          # Supprimer notification
DELETE /api/notifications/clear        # Vider notifications
```

### Documents
```
POST   /api/documents/upload           # Uploader document
GET    /api/documents                  # Liste documents
GET    /api/documents/:id              # Détails document
DELETE /api/documents/:id              # Supprimer document
GET    /api/documents/download/:id     # Télécharger document
```

### Activity Logs
```
GET    /api/activity-logs              # Liste activités
GET    /api/activity-logs/stats        # Statistiques
GET    /api/activity-logs/:userId      # Activités utilisateur
```

### Abonnements
```
GET    /api/subscriptions              # Liste abonnements
POST   /api/subscriptions/subscribe    # S'abonner
POST   /api/subscriptions/cancel       # Annuler abonnement
GET    /api/subscriptions/current      # Abonnement actuel
POST   /api/subscriptions/promo        # Appliquer code promo
```

### Paramètres
```
GET    /api/settings                   # Paramètres utilisateur
PUT    /api/settings                   # Mettre à jour paramètres
PUT    /api/settings/privacy           # Paramètres confidentialité
PUT    /api/settings/notifications     # Préférences notifications
```

### Signalements
```
GET    /api/reports                    # Liste signalements
POST   /api/reports                    # Créer signalement
PUT    /api/reports/:id/status         # Changer statut
GET    /api/reports/stats              # Statistiques
```

---

## ⚙️ Configuration

### Variables d'environnement (.env)

```bash
# Serveur
NODE_ENV=development
PORT=5000

# MongoDB
MONGO_URI=mongodb://localhost:27017/smartrecruit

# JWT
JWT_SECRET=smartrecruit_secret_key_2026
JWT_EXPIRE=7d
JWT_EXPIRE_ADMIN=1d

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre_email@gmail.com
EMAIL_PASS=votre_mot_de_passe_app
EMAIL_FROM=noreply@smartrecruit.tn

# Frontend
FRONTEND_URL=http://localhost:3000
```

---

## 🔒 Sécurité

### Authentification
- JWT (JSON Web Tokens)
- BCrypt pour le hachage des mots de passe
- Tokens de réinitialisation email

### Rate Limiting
- 100 requêtes / 15 minutes par IP
- Limite spéciale pour login admin: 3 tentatives

### Admin Security
- Verrouillage après 3 tentatives échouées
- Délai de 5 minutes entre tentatives
- Route séparée: `/api/auth/admin/login`

### Validation
- Schémas Joi pour validation des entrées
- Sanitization des données
- Protection XSS

### Middleware
- `authMiddleware` - Vérification JWT
- `adminMiddleware` - Vérification rôle admin
- `recruteurMiddleware` - Vérification rôle recruteur
- `candidatMiddleware` - Vérification rôle candidat
- `validate` - Validation des données
- `cacheMiddleware` - Mise en cache des réponses

---

## ✨ Fonctionnalités

### Pour les Candidats
- Inscription avec confirmation email
- Profil complet (CV, vidéo, portfolio)
- Recherche et filtrage d'offres
- Candidature avec vidéo de présentation
- Gestion des alertes emploi
- Favoris et bookmarks
- Suivi des candidatures
- Entretiens en ligne
- Notifications en temps réel
- Recommandations d'offres IA

### Pour les Recruteurs
- Publication d'offres
- Gestion des candidatures
- Filtres avancés
- Messagerie candidats
- Planification entretiens
- Statistiques et analytics
- Promotion d'offres
- Alerts candidats qualifiés
- Avis et notes entreprises

### Pour les Admins
- Dashboard complet
- Gestion utilisateurs
- Modération contenu
- Statistiques globales
- Gestion abonnements
- Codes promotionnels
- Rapports et analytics
- Configuration plateforme

### Fonctionnalités Premium
- Abonnements (Free, Basic, Pro, Enterprise)
- Limites par abonnement
- Support prioritaire
- API Access
- Export de données
- Analytics avancés
- Recherches sauvegardées
- Tests de compétences
- Badges et certifications
- Mentorat

### Communication
- Templates email professionnels
- Notifications push
- Système d'alertes
- Messagerie interne
- Forum communauté

---

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Configurer .env
cp .env.example .env

# Démarrer en développement
npm run dev

# Démarrer en production
npm start
```

---

## 🛠️ Technologies

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM MongoDB
- **JWT** - Authentification
- **Multer** - Upload fichiers
- **Nodemailer** - Envoi emails
- **Node-cache** - Mise en cache
- **Joi** - Validation données
- **BCrypt** - Hachage mots de passe

---

## 📝 Notes

- Les fichiers uploadés sont stockés dans `/uploads`
- Les vidéos sont supportées (mp4, mov, webm)
- Les CVs acceptés: PDF, DOC, DOCX
- Maximum 10MB par upload
- Soft delete activé (isDeleted flag)

---

## 👥 Auteurs

**SmartRecruit Team** - Plateforme de Recrutement Premium

---

## 📄 Licence

MIT License

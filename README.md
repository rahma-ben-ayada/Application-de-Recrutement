# 🎯 SmartRecruit

**Plateforme de Recrutement Premium - Tunisie**

<div align="center">

![SmartRecruit Logo](frontend/public/logo192.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4%2B-green)](https://www.mongodb.com)

**Connectez les meilleurs talents aux meilleures opportunités**

[Documentation](#-documentation) • [Démo](#-démo) • [Fonctionnalités](#-fonctionnalités) • [Installation](#-installation)

</div>

---

## 📋 Table des Matrices

- [À Propos](#-propos)
- [Fonctionnalités](#-fonctionnalités)
- [Architecture](#-architecture)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Utilisation](#-utilisation)
- [Documentation](#-documentation)
- [Contribuer](#-contribuer)
- [Licence](#-licence)

---

## 🎖️ À Propos

SmartRecruit est une plateforme de recrutement premium qui connecte les candidats talentueux avec les meilleures entreprises en Tunisie. Notre mission est de simplifier et moderniser le processus de recrutement grâce à des fonctionnalités innovantes et une interface utilisateur de qualité internationale.

### 🌟 Points Forts

- **Design Premium** : Interface luxueuse avec glassmorphism et animations fluides
- **Candidature Vidéo** : Possibilité de postuler avec une vidéo de présentation
- **Intelligence Artificielle** : Recommandations personnalisées pour candidats et recruteurs
- **Tests de Compétences** : Évaluation et certification des compétences
- **Mentorat** : Programme de mentorat pour accompagner les candidats
- **Forum Communauté** : Espace d'échange et de networking
- **Système d'Abonnement** : Plans adaptés à tous les besoins

---

## ✨ Fonctionnalités

### 👤 Pour les Candidats

| Fonctionnalité | Description |
|----------------|-------------|
| **Profil Complet** | CV, vidéo de présentation, portfolio, éducation |
| **Recherche Avancée** | Filtres par compétences, lieu, salaire, type de contrat |
| **Candidature Vidéo** | Postulez avec une vidéo de présentation |
| **Alertes Emploi** | Recevez des alertes pour les nouvelles offres |
| **Favoris** | Sauvegardez vos offres préférées |
| **Suivi Candidatures** | Suivez l'état de vos candidatures en temps réel |
| **Entretiens en Ligne** | Gestion et planification des entretiens |
| **Tests de Compétences** | Passez des tests et obtenez des certifications |
| **Badges** :** | Gagnez des badges d'accomplissement |
| **Parcours Carrière** | Planifiez votre évolution professionnelle |
| **Mentorat** | Bénéficiez de l'expérience de mentors |
| **Forum** | Échangez avec la communauté |

### 🏢 Pour les Recruteurs

| Fonctionnalité | Description |
|----------------|-------------|
| **Publication d'Offres** | Créez et gérez vos offres d'emploi |
| **Gestion Candidatures** | Suivez et gérez toutes les candidatures |
| **Filtres Avancés** | Trouvez les meilleurs candidats rapidement |
| **Candidature Vidéo** :** | Voyez les vidéos de présentation |
| **Planification Entretiens** | Organisez des entretiens en ligne |
| **Statistiques** | Analytics détaillés sur vos offres |
| **Promotion d'Offres** | Mettez en avant vos annonces |
| **Alertes Candidats** | Soyez alerté des nouveaux profils |
| **Avis Entreprise** | Collectez et affichez des avis |
| **Recherche Sauvegardée** | Sauvegardez vos recherches |

### 👑 Pour les Administrateurs

| Fonctionnalité | Description |
|----------------|-------------|
| **Dashboard Complet** | Vue d'ensemble de la plateforme |
| **Gestion Utilisateurs** | Modérez et gérez tous les utilisateurs |
| **Modération Contenu** | Validez ou modérez le contenu |
| **Statistiques Globales** | Analytics sur toute la plateforme |
| **Gestion Abonnements** | Gérez les plans et paiements |
| **Codes Promotionnels** | Créez des offres spéciales |
| **Configuration** | Paramétrez la plateforme |
| **Gestion Forums** | Modérez les discussions |
| **Événements** | Créez des événements carrière |

---

## 🏗️ Architecture

```
smartrecruit/
├── backend/                 # API REST Node.js/Express
│   ├── config/             # Configuration (DB, constants)
│   ├── models/             # Modèles Mongoose (35 collections)
│   ├── controllers/        # Contrôleurs API
│   ├── routes/             # Routes Express
│   ├── middleware/         # Middleware personnalisés
│   ├── utils/              # Utilitaires (email, helpers)
│   ├── uploads/            # Fichiers uploadés
│   └── server.js           # Point d'entrée
│
├── frontend/               # Application React
│   ├── public/             # Assets statiques
│   ├── src/
│   │   ├── components/     # Composants réutilisables
│   │   ├── pages/          # Pages de l'application
│   │   ├── theme/          # Thème et styles
│   │   ├── services/       # Services API
│   │   ├── context/        # Context API
│   │   └── utils/          # Utilitaires
│   └── package.json
│
├── README.md               # Ce fichier
├── start.sh                # Script de démarrage
└── package.json            # Configuration racine
```

---

## 🛠️ Technologies

### Backend

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

### Frontend

- **React** - Framework UI
- **React Router** - Navigation
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **Context API** - Gestion d'état

### Design

- **Glassmorphism** - Effet verre premium
- **Gradients Dorés** - Palette luxueuse
- **Animations Fluides** - Transitions élégantes
- **Responsive Design** - Mobile-first

---

## 🚀 Installation

### Prérequis

- Node.js >= 16.0.0
- MongoDB >= 4.4 (local ou Atlas)
- npm >= 8.0.0

### Étapes

1. **Cloner le repository**

```bash
git clone https://github.com/smartrecruit/app.git
cd smartrecruit
```

2. **Installer les dépendances**

```bash
npm run install:all
```

3. **Configurer les variables d'environnement**

```bash
cp backend/.env.example backend/.env
```

Éditez `backend/.env` avec vos configurations:

```env
# MongoDB
MONGO_URI=mongodb://localhost:27017/smartrecruit

# JWT
JWT_SECRET=votre_secret_key

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=votre_email@gmail.com
EMAIL_PASS=votre_mot_de_passe_app
```

4. **Démarrer l'application**

```bash
npm start
```

Ou séparément:

```bash
# Terminal 1 - Backend
npm run start:backend

# Terminal 2 - Frontend
npm run start:frontend
```

5. **Accéder à l'application**

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000](http://localhost:5000)

---

## ⚙️ Configuration

### MongoDB

#### Local

```bash
# Installer MongoDB
sudo apt-get install mongodb

# Démarrer MongoDB
sudo systemctl start mongodb
```

#### Atlas

1. Créer un compte sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Créer un cluster
3. Obtenir la connection string
4. Mettre à jour `MONGO_URI` dans `backend/.env`

### Email

Pour Gmail:

1. Activer le 2FA
2. Générer un mot de passe app
3. Mettre à jour `backend/.env`:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre_email@gmail.com
EMAIL_PASS=votre_mot_de_passe_app
```

---

## 📚 Documentation

- **[Backend Documentation](backend/README.md)** - Documentation complète de l'API
- **[API Test Guide](backend/API_TEST_GUIDE.md)** - Guide de test des endpoints
- **[Database Schema](backend/DATABASE_SCHEMA.md)** - Schéma de la base de données
- **[Project Summary](backend/PROJECT_SUMMARY.md)** - Résumé du projet

---

## 🎮 Utilisation

### Commandes Disponibles

```bash
# Démarrer l'application complète
npm start

# Démarrer en mode développement
npm run dev

# Démarrer le backend uniquement
npm run start:backend

# Démarrer le frontend uniquement
npm run start:frontend

# Installer toutes les dépendances
npm run install:all
```

### Comptes par Défaut

Après l'installation, vous pouvez créer des comptes via l'interface d'inscription ou utiliser l'API:

**Admin:**
- Email: admin@smartrecruit.tn
- Mot de passe: (à créer)

**Recruteur:**
- S'inscrire avec le rôle "recruteur"

**Candidat:**
- S'inscrire avec le rôle "candidat"

---

## 🤝 Contribuer

Les contributions sont les bienvenues ! Voici comment contribuer:

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour détails.

---

## 👥 Auteurs

**SmartRecruit Team**

- LinkedIn: [SmartRecruit](https://linkedin.com/company/smartrecruit)
- Email: contact@smartrecruit.tn
- Web: [smartrecruit.tn](https://smartrecruit.tn)

---

## 🙏 Remerciements

- À tous les contributeurs qui participent au projet
- À la communauté open source
- À nos utilisateurs pour leurs feedbacks

---

## 📞 Support

Pour toute question ou problème:

- Email: support@smartrecruit.tn
- Téléphone: +216 71 123 456
- Heures: Lun-Ven: 9h-18h

---

<div align="center">

**[⬆ Retour en haut](#-smartrecruit)**

Built with ❤️ in Tunisia

© 2026 SmartRecruit. All rights reserved.

</div>

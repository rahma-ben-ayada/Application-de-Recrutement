# Schéma de Base de Données SmartRecruit

## 📊 Vue d'Ensemble

SmartRecruit utilise **30+ collections MongoDB** pour gérer tous les aspects de la plateforme de recrutement.

---

## 🗂️ Collections Principales

### 1. users
Collection principale des utilisateurs.

```javascript
{
  _id: ObjectId,
  nom: String,
  email: String (unique),
  password: String (haché),
  role: String (enum: ['admin', 'recruteur', 'candidat']),
  telephone: String,
  photo: String,
  statut: String (default: 'pending'),
  isDeleted: Boolean (default: false),
  emailConfirmed: Boolean (default: false),
  confirmEmailToken: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  lastLogin: Date,
  loginAttempts: Number (default: 0),
  lockUntil: Date,
  createdAt: Date,
  updatedAt: Date
}

Indexes:
- email (unique)
- role
- statut
- isDeleted
```

**Relations:**
- Référé par: Candidature, Offre, Entretien, Alerte, Favori, Review, Notification, ActivityLog, etc.

---

### 2. offres
Offres d'emploi publiées par les recruteurs.

```javascript
{
  _id: ObjectId,
  titre: String,
  description: String,
  lieu: String,
  typeContrat: String,
  salaire: String,
  secteur: String,
  competences: [String],
  niveauExperience: String,
  education: String,
  langues: [{ langue: String, niveau: String }],
  avantages: [String],
  recruteur: ObjectId (ref: 'User'),
  statut: String (default: 'active'),
  isPromoted: Boolean (default: false),
  candidatures: [ObjectId (ref: 'Candidature')],
  vues: Number (default: 0),
  isDeleted: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}

Indexes:
- recruteur
- statut
- lieu
- secteur
- isPromoted
- isDeleted
- competences
- createdAt
```

---

### 3. candidatures
Candidatures aux offres d'emploi.

```javascript
{
  _id: ObjectId,
  offre: ObjectId (ref: 'Offre'),
  candidat: ObjectId (ref: 'User'),
  recruteur: ObjectId (ref: 'User'),
  lettreMotivation: String,
  cv: ObjectId (ref: 'Document'),
  video: String,
  statut: String (default: 'en_attente'),
  dateStatut: Date,
  isDeleted: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}

Indexes:
- offre
- candidat
- recruteur
- statut
- isDeleted
- createdAt
```

---

### 4. entretiens
Entretiens planifiés.

```javascript
{
  _id: ObjectId,
  candidature: ObjectId (ref: 'Candidature'),
  candidat: ObjectId (ref: 'User'),
  recruteur: ObjectId (ref: 'User'),
  offre: ObjectId (ref: 'Offre'),
  date: Date,
  heure: String,
  lieu: String,
  lien: String,
  notes: String,
  statut: String (default: 'planifie'),
  isDeleted: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}

Indexes:
- candidature
- candidat
- recruteur
- date
- statut
- isDeleted
```

---

## 🔔 Notifications & Alertes

### 5. notifications
Notifications utilisateur.

```javascript
{
  _id: ObjectId,
  utilisateur: ObjectId (ref: 'User'),
  type: String,
  titre: String,
  message: String,
  donnees: Object,
  isRead: Boolean (default: false),
  readAt: Date,
 expireAt: Date,
  createdAt: Date
}

Indexes:
- utilisateur
- isRead
- expireAt
```

### 6. alertes
Alertes offres emploi pour candidats.

```javascript
{
  _id: ObjectId,
  utilisateur: ObjectId (ref: 'User'),
  titre: String,
  motsCles: [String],
  lieux: [String],
  typesContrat: [String],
  secteurs: [String],
  salaireMin: Number,
  salaireMax: Number,
  frequence: String (default: 'quotidien'),
  derniereVerification: Date,
  isActive: Boolean (default: true),
  isDeleted: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}

Indexes:
- utilisateur
- isActive
- isDeleted
```

---

## ⭐ Favoris & Avis

### 7. favoris
Offres sauvegardées par les candidats.

```javascript
{
  _id: ObjectId,
  utilisateur: ObjectId (ref: 'User'),
  offre: ObjectId (ref: 'Offre'),
  notes: String,
  isDeleted: Boolean (default: false),
  createdAt: Date
}

Indexes:
- utilisateur
- offre
- isDeleted
```

### 8. reviews
Avis sur les entreprises.

```javascript
{
  _id: ObjectId,
  auteur: ObjectId (ref: 'User'),
  entreprise: ObjectId (ref: 'User' (recruteur)),
  note: Number (min: 1, max: 5),
  titre: String,
  commentaire: String,
  pointsPositifs: [String],
  pointsNegatifs: [String],
  recommande: Boolean,
  processus: String,
  isDeleted: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}

Indexes:
- entreprise
- auteur
- note
- isDeleted
```

---

## 📁 Documents & Médias

### 9. documents
Documents uploadés (CV, vidéos, etc.).

```javascript
{
  _id: ObjectId,
  utilisateur: ObjectId (ref: 'User'),
  nom: String,
    type: String,
    chemin: String,
    taille: Number,
    mime: String,
    categorie: String,
    description: String,
    isDefault: Boolean (default: false),
    isDeleted: Boolean (default: false),
    createdAt: Date
}

Indexes:
- utilisateur
- categorie
- isDeleted
```

### 10. portfolios
Portfolio projets.

```javascript
{
  _id: ObjectId,
  utilisateur: ObjectId (ref: 'User'),
  titre: String,
  description: String,
  liens: [{ titre: String, url: String }],
  images: [String],
  technologies: [String],
  dateDebut: Date,
  dateFin: Date,
  enCours: Boolean,
  isDeleted: Boolean (default: false),
  createdAt: Date
}

Indexes:
- utilisateur
- isDeleted
```

### 11. education
Formation et éducation.

```javascript
{
  _id: ObjectId,
  utilisateur: ObjectId (ref: 'User'),
  etablissement: String,
  diplome: String,
  domaine: String,
  dateDebut: Date,
  dateFin: Date,
  description: String,
  isDeleted: Boolean (default: false),
  createdAt: Date
}

Indexes:
- utilisateur
- isDeleted
```

---

## 🔒 Sécurité & Modération

### 12. activitylogs
Journal d'activités.

```javascript
{
  _id: ObjectId,
  utilisateur: ObjectId (ref: 'User'),
  action: String,
  entity: String,
  entityId: ObjectId,
  details: Object,
  ip: String,
  userAgent: String,
  statut: String (default: 'success'),
  errorMessage: String,
  createdAt: Date
}

Indexes:
- utilisateur + createdAt
- action + createdAt
- entity + entityId + createdAt
```

### 13. reports
Signalements et modération.

```javascript
{
  _id: ObjectId,
  type: String,
  auteur: ObjectId (ref: 'User'),
  cible: ObjectId,
  cibleType: String,
  raison: String,
  description: String,
  statut: String (default: 'pending'),
  priorite: String (default: 'moyenne'),
  assigneA: ObjectId (ref: 'User'),
  reponse: {
    texte: String,
    date: Date,
    reponduPar: ObjectId (ref: 'User')
  },
  piecesJointes: [{ nom: String, chemin: String }],
  votes: [{
    utilisateur: ObjectId,
    type: String
  }],
  isDeleted: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}

Indexes:
- auteur + statut
- cibleType + cible
```

---

## 💰 Monétisation

### 14. subscriptions
Abonnements utilisateurs.

```javascript
{
  _id: ObjectId,
  utilisateur: ObjectId (ref: 'User'),
  plan: String,
  statut: String (default: 'active'),
  dateDebut: Date,
  dateFin: Date,
  prix: Number,
  devise: String (default: 'TND'),
  autoRenew: Boolean (default: false),
  limiteUtilisation: Object,
  promotion: ObjectId (ref: 'Promotion'),
  paiement: {
    methode: String,
    transactionId: String,
    datePaiement: Date
  },
  isDeleted: Boolean (default: false),
  createdAt: Date
}

Indexes:
- utilisateur
- statut
- dateFin
```

### 15. promotions
Codes promotionnels.

```javascript
{
  _id: ObjectId,
  code: String (unique),
  description: String,
  type: String,
  valeur: Number,
  planApplicable: [String],
  utilisationsMax: Number,
  utilisations: Number (default: 0),
  dateDebut: Date,
  dateFin: Date,
  isActive: Boolean (default: true),
  creePar: ObjectId (ref: 'User'),
  isDeleted: Boolean (default: false),
  createdAt: Date
}

Indexes:
- code (unique)
- isActive
- dateFin
```

---

## 🎯 Intelligence Artificielle

### 16. recommendations
Recommandations IA.

```javascript
{
  _id: ObjectId,
  utilisateur: ObjectId (ref: 'User'),
  type: String,
  itemId: ObjectId,
  itemType: String,
  score: Number,
  raisons: [String],
  expireAt: Date,
  isDeleted: Boolean (default: false),
  createdAt: Date
}

Indexes:
- utilisateur
- type
- score
- expireAt
```

### 17. analytics
Statistiques utilisateur.

```javascript
{
  _id: ObjectId,
  utilisateur: ObjectId (ref: 'User'),
  type: String,
  donnees: Object,
  periode: {
    debut: Date,
    fin: Date
  },
  createdAt: Date
}

Indexes:
- utilisateur
- type
- periode
```

---

## 🏆 Formation & Certification

### 18. skillassessments
Évaluations de compétences.

```javascript
{
  _id: ObjectId,
  nom: String,
  description: String,
  competences: [String],
  niveaux: [String],
  createur: ObjectId (ref: 'User'),
  questions: [{
    question: String,
    reponses: [String],
    reponseCorrecte: Number,
    points: Number
  }],
  duree: Number,
  seuilReussite: Number,
  difficulte: String,
  langues: [String],
  tags: [String],
  isActive: Boolean (default: true),
  isDeleted: Boolean (default: false),
  createdAt: Date
}

Indexes:
- competences
- difficulte
- isActive
```

### 19. testresults
Résultats des tests.

```javascript
{
  _id: ObjectId,
  utilisateur: ObjectId (ref: 'User'),
  test: ObjectId (ref: 'TestSkill'),
  score: Number,
  scoreTotal: Number,
  pourcentage: Number,
  reussi: Boolean,
  reponses: [{
    question: ObjectId,
    reponse: Number,
    correcte: Boolean
  }],
  duree: Number,
  datePassation: Date,
  certificat: {
    url: String,
    id: String
  },
  isDeleted: Boolean (default: false),
  createdAt: Date
}

Indexes:
- utilisateur
- test
- reussi
```

### 20. badges
Badges d'accomplissement.

```javascript
{
  _id: ObjectId,
  nom: String,
  description: String,
  image: String,
  categorie: String,
  condition: Object,
  points: Number,
  niveau: Number,
  isActive: Boolean (default: true),
  isDeleted: Boolean (default: false),
  createdAt: Date
}

Indexes:
- categorie
- niveau
- isActive
```

### 21. userbadges
Badges assignés aux utilisateurs.

```javascript
{
  _id: ObjectId,
  utilisateur: ObjectId (ref: 'User'),
  badge: ObjectId (ref: 'Badge'),
  dateObtention: Date,
  isDeleted: Boolean (default: false),
  createdAt: Date
}

Indexes:
- utilisateur
- badge
- isDeleted
```

### 22. careerpaths
Parcours carrière.

```javascript
{
  _id: ObjectId,
  titre: String,
  description: String,
  secteur: String,
  niveaux: [{
    titre: String,
    competences: [String],
    salaireMin: Number,
    salaireMax: Number
  }],
  competencesCles: [String],
  dureeEstimee: Number,
  createur: ObjectId (ref: 'User'),
  isActive: Boolean (default: true),
  isDeleted: Boolean (default: false),
  createdAt: Date
}

Indexes:
- secteur
- isActive
```

---

## 👥 Communauté

### 23. forums
Forum discussions.

```javascript
{
  _id: ObjectId,
  titre: String,
  contenu: String,
  auteur: ObjectId (ref: 'User'),
  categorie: String,
  tags: [String],
  vues: Number (default: 0),
  likes: [ObjectId],
  signalements: Number (default: 0),
  estEpinglé: Boolean (default: false),
  estVerrouille: Boolean (default: false),
  isDeleted: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}

Indexes:
- categorie
- auteur
- estEpinglé
- isDeleted
```

### 24. forumreplies
Réponses forum.

```javascript
{
  _id: ObjectId,
  forum: ObjectId (ref: 'Forum'),
  auteur: ObjectId (ref: 'User'),
  contenu: String,
  likes: [ObjectId],
  signalements: Number (default: 0),
  estSolution: Boolean (default: false),
  isDeleted: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}

Indexes:
- forum
- auteur
- estSolution
- isDeleted
```

### 25. events
Événements carrière.

```javascript
{
  _id: ObjectId,
  titre: String,
  description: String,
  type: String,
  date: Date,
  heure: String,
  duree: Number,
  lieu: String,
  lien: String,
  organisateur: ObjectId (ref: 'User'),
  capacite: Number,
  inscrits: [ObjectId],
  image: String,
  tags: [String],
  estGratuit: Boolean (default: true),
  prix: Number,
  isActive: Boolean (default: true),
  isDeleted: Boolean (default: false),
  createdAt: Date
}

Indexes:
- date
- type
- organisateur
- isActive
```

### 26. mentorships
Programme mentorat.

```javascript
{
  _id: ObjectId,
  mentor: ObjectId (ref: 'User'),
  mentore: ObjectId (ref: 'User'),
  specialite: String,
  objectifs: [String],
  statut: String (default: 'en_attente'),
  dateDebut: Date,
  dateFin: Date,
  sessions: [{
    date: Date,
    duree: Number,
    notes: String
  }],
  feedback: {
    mentor: String,
    mentore: String
  },
  isDeleted: Boolean (default: false),
  createdAt: Date
}

Indexes:
- mentor
- mentore
- statut
- isDeleted
```

---

## 🔧 Utilitaires

### 27. settings
Paramètres utilisateur.

```javascript
{
  _id: ObjectId,
  utilisateur: ObjectId (ref: 'User'),
  notifications: {
    email: Boolean (default: true),
    push: Boolean (default: true),
    nouvellesOffres: Boolean (default: true),
    misesAJourCandidature: Boolean (default: true),
    messages: Boolean (default: true),
    entretiens: Boolean (default: true)
  },
  confidentialite: {
    profilVisible: Boolean (default: true),
    montrerEmail: Boolean (default: false),
    montrerTelephone: Boolean (default: false),
    autoriserRecherche: Boolean (default: true)
  },
  preferences: {
    langue: String (default: 'fr'),
    theme: String (default: 'light'),
    fuseauHoraire: String (default: 'Africa/Tunis')
  },
  createdAt: Date,
  updatedAt: Date
}

Indexes:
- utilisateur
```

### 28. savedsearches
Recherches sauvegardées.

```javascript
{
  _id: ObjectId,
  utilisateur: ObjectId (ref: 'User'),
  nom: String,
  criteres: Object,
  autoRefresh: Boolean (default: false),
  frequence: String,
  derniereExecution: Date,
  isDeleted: Boolean (default: false),
  createdAt: Date
}

Indexes:
- utilisateur
- isDeleted
```

### 29. tags
Étiquettes et compétences.

```javascript
{
  _id: ObjectId,
  nom: String (unique),
  categorie: String,
  description: String,
  popularite: Number (default: 0),
  occurences: [String],
  aliases: [String],
  parentId: ObjectId (ref: 'Tag'),
  isDeleted: Boolean (default: false),
  createdAt: Date
}

Indexes:
- nom (unique)
- categorie
- popularite
```

### 30. companies
Profils entreprises.

```javascript
{
  _id: ObjectId,
  nom: String,
  description: String,
  secteur: String,
  taille: String,
  siteWeb: String,
  logo: String,
  couverture: String,
  adresse: {
    rue: String,
    ville: String,
    pays: String,
    codePostal: String
  },
  coordonnees: {
    latitude: Number,
    longitude: Number
  },
  reseauxSociaux: {
    linkedin: String,
    facebook: String,
    twitter: String
  },
  avantages: [String],
  culture: String,
  videos: [String],
  photos: [String],
  isVerified: Boolean (default: false),
  statut: String (default: 'active'),
  isDeleted: Boolean (default: false),
  createdAt: Date
}

Indexes:
- nom
- secteur
- isVerified
- statut
```

### 31. messages
Messagerie interne.

```javascript
{
  _id: ObjectId,
  expediteur: ObjectId (ref: 'User'),
  destinataire: ObjectId (ref: 'User'),
  sujet: String,
  contenu: String,
  pieceJointe: String,
  estLu: Boolean (default: false),
  dateLecture: Date,
  conversationId: String,
  isDeleted: Boolean (default: false),
  createdAt: Date
}

Indexes:
- expediteur
- destinataire
- conversationId
- estLu
- isDeleted
```

### 32. workflows
Automatisations.

```javascript
{
  _id: ObjectId,
  nom: String,
  description: String,
  createur: ObjectId (ref: 'User'),
  declencheur: {
    type: String,
    conditions: Object
  },
  actions: [{
    type: String,
    parametres: Object
  }],
  isActive: Boolean (default: true),
  executions: [{
    date: Date,
    resultat: String
  }],
  isDeleted: Boolean (default: false),
  createdAt: Date
}

Indexes:
- createur
- isActive
- isDeleted
```

### 33. integrations
Intégrations tierces.

```javascript
{
  _id: ObjectId,
  utilisateur: ObjectId (ref: 'User'),
  type: String,
  configuration: Object,
  accessToken: String,
  refreshToken: String,
  tokenExpire: Date,
  isActive: Boolean (default: true),
  derniereSync: Date,
  isDeleted: Boolean (default: false),
  createdAt: Date
}

Indexes:
- utilisateur
- type
- isActive
```

### 34. jobapplicationflows
Workflow de candidature.

```javascript
{
  _id: ObjectId,
  candidature: ObjectId (ref: 'Candidature'),
  etapes: [{
    nom: String,
    statut: String,
    dateDebut: Date,
    dateFin: Date,
    notes: String,
    responsable: ObjectId (ref: 'User')
  }],
  etapeActuelle: Number,
  isDeleted: Boolean (default: false),
  createdAt: Date
}

Indexes:
- candidature
- isDeleted
```

### 35. salaries
Données salariales.

```javascript
{
  _id: ObjectId,
  titre: String,
  secteur: String,
  lieu: String,
  niveauExperience: String,
  salaireMin: Number,
  salaireMax: Number,
  salaireMoyen: Number,
  devise: String (default: 'TND'),
  typeContrat: String,
  source: String,
  dateCollecte: Date,
  estEstime: Boolean (default: false),
  isDeleted: Boolean (default: false),
  createdAt: Date
}

Indexes:
- titre
- secteur
- lieu
- niveauExperience
```

---

## 🔗 Relations Principales

```
User (Recruteur) → Offre → Candidature → Entretien
                        ↓
                    Document

User (Candidat) → Candidature → Entretien
                ↓
            Alerte → Offre
                ↓
            Favori → Offre
                ↓
            Review → User (Recruteur)
                ↓
            Portfolio
                ↓
            Education
                ↓
            Document

User (Admin) → Report → (User/Offre/Candidature/Review)
            ↓
        ActivityLog → Toutes les collections

Subscription → User
Promotion → Subscription

Notification → User
Badge → UserBadge → User

Forum → ForumReply → User
Event → User
Mentorship → User (Mentor/Mentore)

TestSkill → TestResult → User
Recommendation → User
Analytics → User
```

---

## 📈 Statistiques de la Base

- **Collections**: 35
- **Index**: 150+
- **Relations**: 50+
- **Types de données**: String, Number, Boolean, Date, ObjectId, Array, Object

---

## 🔍 Requêtes Fréquentes

### Trouver les offres d'un recruteur
```javascript
db.offres.find({ recruteur: ObjectId("..."), isDeleted: false })
```

### Candidatures d'une offre
```javascript
db.candidatures.find({ offre: ObjectId("..."), isDeleted: false })
```

### Notifications non lues
```javascript
db.notifications.find({ utilisateur: ObjectId("..."), isRead: false })
```

### Alertes actives d'un utilisateur
```javascript
db.alertes.find({ utilisateur: ObjectId("..."), isActive: true, isDeleted: false })
```

### Statistiques d'activités
```javascript
db.activitylogs.aggregate([
  { $match: { utilisateur: ObjectId("...") } },
  { $group: { _id: "$action", count: { $sum: 1 } } }
])
```

---

## 🚀 Performance

- **Indexes** sur tous les champs de recherche fréquents
- **Compound indexes** pour les requêtes complexes
- **TTL indexes** pour les données temporaires (notifications)
- **Text indexes** pour la recherche全文

---

## 📝 Notes

- Tous les modèles utilisent le **soft delete** (isDeleted flag)
- Les timestamps sont automatiques (createdAt, updatedAt)
- Les références utilisent **ref** pour les jointures
- Les enums assurent la cohérence des données

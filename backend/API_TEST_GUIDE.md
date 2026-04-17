# Guide de Test API SmartRecruit

## 🔐 Authentification

La plupart des endpoints nécessitent un token JWT. Voici comment s'authentifier:

### 1. Inscription (Candidat)

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Jean Dupont",
    "email": "jean.dupont@email.com",
    "password": "Password123!",
    "role": "candidat"
  }'
```

### 2. Inscription (Recruteur)

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Entreprise ABC",
    "email": "contact@abc.tn",
    "password": "Password123!",
    "role": "recruteur",
    "entreprise": "ABC SARL",
    "secteur": "Informatique"
  }'
```

### 3. Connexion

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jean.dupont@email.com",
    "password": "Password123!"
  }'
```

**Réponse:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "email": "jean.dupont@email.com",
    "role": "candidat"
  }
}
```

### 4. Utiliser le token

Pour les requêtes authentifiées, ajoutez le header:
```bash
-H "Authorization: Bearer VOTRE_TOKEN_ICI"
```

---

## 👤 Candidat Endpoints

### Mes Alertes
```bash
curl -X GET http://localhost:5000/api/alertes/mes \
  -H "Authorization: Bearer VOTRE_TOKEN"
```

### Créer une Alerte
```bash
curl -X POST http://localhost:5000/api/alertes \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Développeur React",
    "motsCles": ["React", "JavaScript", "Frontend"],
    "lieux": ["Tunis", "Remote"],
    "typesContrat": ["CDI"],
    "secteur": "Informatique"
  }'
```

### Vérifier les Alertes
```bash
curl -X GET http://localhost:5000/api/alertes/check \
  -H "Authorization: Bearer VOTRE_TOKEN"
```

### Mes Favoris
```bash
curl -X GET http://localhost:5000/api/favoris \
  -H "Authorization: Bearer VOTRE_TOKEN"
```

### Ajouter un Favori
```bash
curl -X POST http://localhost:5000/api/favoris \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "offre": "OFFRE_ID"
  }'
```

### Supprimer un Favori
```bash
curl -X DELETE http://localhost:5000/api/favoris/FAVORI_ID \
  -H "Authorization: Bearer VOTRE_TOKEN"
```

### Vérifier si Favori
```bash
curl -X GET http://localhost:5000/api/favoris/check/OFFRE_ID \
  -H "Authorization: Bearer VOTRE_TOKEN"
```

### Mes Notifications
```bash
curl -X GET http://localhost:5000/api/notifications \
  -H "Authorization: Bearer VOTRE_TOKEN"
```

### Marquer Notification comme Lue
```bash
curl -X PUT http://localhost:5000/api/notifications/NOTIF_ID/read \
  -H "Authorization: Bearer VOTRE_TOKEN"
```

### Tout Marquer comme Lu
```bash
curl -X PUT http://localhost:5000/api/notifications/read-all \
  -H "Authorization: Bearer VOTRE_TOKEN"
```

---

## 🏢 Recruteur Endpoints

### Créer une Offre
```bash
curl -X POST http://localhost:5000/api/offres \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Développeur Full Stack",
    "description": "Nous recherchons un développeur expérimenté...",
    "lieu": "Tunis",
    "typeContrat": "CDI",
    "salaire": "1500-2500",
    "secteur": "Informatique",
    "competences": ["React", "Node.js", "MongoDB"],
    "niveauExperience": "3-5"
  }'
```

### Voir les Candidatures
```bash
curl -X GET http://localhost:5000/api/candidatures \
  -H "Authorization: Bearer VOTRE_TOKEN"
```

### Changer Statut Candidature
```bash
curl -X PUT http://localhost:5000/api/candidatures/CANDIDATURE_ID/status \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "statut": "entretien"
  }'
```

### Créer un Entretien
```bash
curl -X POST http://localhost:5000/api/entretiens \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "candidature": "CANDIDATURE_ID",
    "date": "2026-04-20",
    "heure": "14:00",
    "lieu": "En ligne",
    "lien": "https://meet.google.com/xxx"
  }'
```

### Voir les Entretiens
```bash
curl -X GET http://localhost:5000/api/entretiens \
  -H "Authorization: Bearer VOTRE_TOKEN"
```

---

## 👑 Admin Endpoints

### Connexion Admin
```bash
curl -X POST http://localhost:5000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@smartrecruit.tn",
    "password": "Admin123!"
  }'
```

### Voir les Utilisateurs
```bash
curl -X GET http://localhost:5000/api/users \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

### Changer Statut Utilisateur
```bash
curl -X PUT http://localhost:5000/api/users/USER_ID/status \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "statut": "suspended"
  }'
```

### Voir les Signalements
```bash
curl -X GET http://localhost:5000/api/reports \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

### Traiter un Signalement
```bash
curl -X PUT http://localhost:5000/api/reports/REPORT_ID/status \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "statut": "resolu",
    "reponse": "Problème résolu"
  }'
```

### Voir les Statistiques
```bash
curl -X GET http://localhost:5000/api/activity-logs/stats \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

---

## 📁 Upload de Documents

### Uploader un CV
```bash
curl -X POST http://localhost:5000/api/documents/upload \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -F "file=@/chemin/vers/cv.pdf" \
  -F "type=cv"
```

### Uploader une Vidéo de Candidature
```bash
curl -X POST http://localhost:5000/api/documents/upload \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -F "file=@/chemin/vers/video.mp4" \
  -F "type=video"
```

### Voir mes Documents
```bash
curl -X GET http://localhost:5000/api/documents \
  -H "Authorization: Bearer VOTRE_TOKEN"
```

---

## 🎯 Postuler à une Offre

### Candidature Simple
```bash
curl -X POST http://localhost:5000/api/candidatures \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "offre": "OFFRE_ID",
    "lettreMotivation": "Je suis très intéressé par ce poste..."
  }'
```

### Candidature avec Vidéo
```bash
curl -X POST http://localhost:5000/api/candidatures \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -F "offre=OFFRE_ID" \
  -F "lettreMotivation=Je suis très intéressé..." \
  -F "video=@/chemin/vers/video.mp4"
```

---

## 💰 Abonnements

### Voir les Abonnements Disponibles
```bash
curl -X GET http://localhost:5000/api/subscriptions/plans
```

### S'abonner
```bash
curl -X POST http://localhost:5000/api/subscriptions/subscribe \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "plan": "pro"
  }'
```

### Appliquer un Code Promo
```bash
curl -X POST http://localhost:5000/api/subscriptions/promo \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "BIENVENUE50",
    "plan": "pro"
  }'
```

### Voir mon Abonnement
```bash
curl -X GET http://localhost:5000/api/subscriptions/current \
  -H "Authorization: Bearer VOTRE_TOKEN"
```

---

## ⚠️ Codes d'Erreur

- `200` - Succès
- `201` - Créé avec succès
- `400` - Erreur de validation
- `401` - Non authentifié
- `403` - Accès refusé
- `404` - Ressource non trouvée
- `429` - Trop de requêtes (rate limit)
- `500` - Erreur serveur

### Exemple de Réponse d'Erreur
```json
{
  "success": false,
  "message": "Erreur de validation",
  "errors": [
    {
      "field": "email",
      "message": "Email invalide"
    }
  ]
}
```

---

## 🧪 Tester avec Postman

1. Importez les endpoints dans Postman
2. Créez une variable d'environnement `token`
3. Après login, sauvegardez le token dans la variable
4. Utilisez `{{token}}` dans le header Authorization

---

## 📊 Limites par Abonnement

### Free
- 5 offres publiées
- 20 candidatures/mois
- 3 alertes
- 10 favoris

### Basic (50 TND)
- 5 offres publiées
- 20 candidatures/mois
- 3 alertes
- 10 favoris

### Pro (150 TND)
- 20 offres publiées
- 100 candidatures/mois
- 10 alertes
- 50 favoris
- Analytics activés

### Enterprise (500 TND)
- Illimité
- Toutes les fonctionnalités
- API access

---

## 🔍 Recherche Avancée

### Rechercher des Offres
```bash
curl -X GET "http://localhost:5000/api/offres/search?keywords=react&lieu=Tunis&typeContrat=CDI" \
  -H "Authorization: Bearer VOTRE_TOKEN"
```

### Recommandations IA
```bash
curl -X GET http://localhost:5000/api/offres/recommendations \
  -H "Authorization: Bearer VOTRE_TOKEN"
```

---

## 📝 Notes

- Tous les endpoints protégés nécessitent un token JWT valide
- Les tokens expirent après 7 jours (1 jour pour admin)
- Les fichiers uploadés sont limités à 10MB
- Les vidéos sont supportées: mp4, mov, webm
- Les CVs acceptés: PDF, DOC, DOCX

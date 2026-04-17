// Configuration et constantes globales

module.exports = {
  // Environnement
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,

  // JWT
  jwtSecret: process.env.JWT_SECRET || 'smartrecruit_secret_key_2026',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  jwtExpireAdmin: process.env.JWT_EXPIRE_ADMIN || '1d',

  // MongoDB
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/smartrecruit',

  // Email
  email: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
    from: process.env.EMAIL_FROM || 'noreply@smartrecruit.tn',
  },

  // Upload
  upload: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'],
    cv: {
      maxSize: 5 * 1024 * 1024, // 5MB
      allowedTypes: ['.pdf', '.doc', '.docx'],
    },
    video: {
      maxSize: 50 * 1024 * 1024, // 50MB
      allowedTypes: ['.mp4', '.mov', '.webm'],
    },
  },

  // Pagination
  pagination: {
    default: 10,
    max: 100,
  },

  // Abonnements
  subscriptions: {
    free: {
      prix: 0,
      duree: 30,
      limites: {
        offresPubliees: 5,
        candidaturesMois: 20,
        alertes: 3,
        favoris: 10,
        messages: 50,
        recherchesAvancees: false,
        supportPrioritaire: false,
        apiAccess: false,
        exports: false,
        analytics: false,
      },
    },
    basic: {
      prix: 50,
      duree: 30,
      limites: {
        offresPubliees: 5,
        candidaturesMois: 20,
        alertes: 3,
        favoris: 10,
        messages: 50,
        recherchesAvancees: false,
        supportPrioritaire: false,
        apiAccess: false,
        exports: false,
        analytics: false,
      },
    },
    pro: {
      prix: 150,
      duree: 90,
      limites: {
        offresPubliees: 20,
        candidaturesMois: 100,
        alertes: 10,
        favoris: 50,
        messages: 200,
        recherchesAvancees: true,
        supportPrioritaire: true,
        apiAccess: false,
        exports: true,
        analytics: true,
      },
    },
    enterprise: {
      prix: 500,
      duree: 365,
      limites: {
        offresPubliees: -1,
        candidaturesMois: -1,
        alertes: -1,
        favoris: -1,
        messages: -1,
        recherchesAvancees: true,
        supportPrioritaire: true,
        apiAccess: true,
        exports: true,
        analytics: true,
      },
    },
  },

  // Roles
  roles: {
    ADMIN: 'admin',
    RECRUTEUR: 'recruteur',
    CANDIDAT: 'candidat',
  },

  // Statuts candidature
  statutsCandidature: ['en_attente', 'accepte', 'refuse', 'entretien'],

  // Statuts entretien
  statutsEntretien: ['planifie', 'accepte', 'refuse', 'annule'],

  // Types de contrat
  typesContrat: ['CDI', 'CDD', 'Stage', 'Freelance', 'Temporaire'],

  // Lieux
  lieux: ['Tunis', 'Sfax', 'Sousse', 'Bizerte', 'Gabès', 'Ariana', 'Monastir', 'Remote'],

  // Compétences populaires
  competencesPopulaires: [
    'JavaScript',
    'Python',
    'Java',
    'React',
    'Node.js',
    'SQL',
    'HTML/CSS',
    'PHP',
    'C++',
    'C#',
    'TypeScript',
    'Angular',
    'Vue.js',
    'MongoDB',
    'PostgreSQL',
    'Git',
  ],

  // Secteurs
  secteurs: [
    'Informatique',
    'Finance',
    'Télécommunications',
    'Industrie',
    'Santé',
    'Éducation',
    'Commerce',
    'Marketing',
    'RH',
    'Juridique',
  ],

  // Niveaux expérience
  niveauxExperience: [
    { value: '0-1', label: 'Moins de 1 an' },
    { value: '1-3', label: '1-3 ans' },
    { value: '3-5', label: '3-5 ans' },
    { value: '5-10', label: '5-10 ans' },
    { value: '10+', label: 'Plus de 10 ans' },
  ],

  // Niveaux langue
  niveauxLangue: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],

  // Pagination par défaut
  defaultPage: 1,
  defaultLimit: 10,

  // Durée de conservation des données
  retentionDays: 365,

  // Taux de change
  tauxChange: {
    TND: 1,
    EUR: 0.31,
    USD: 0.33,
  },

  // Notifications
  notifications: {
    nouveauxMessages: true,
    nouvellesCandidatures: true,
    misesAJourOffres: true,
    rappelsEntretiens: true,
    alertesEmploi: true,
  },

  // API Rate Limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requêtes par fenêtre
  },

  // Admin Security
  adminSecurity: {
    maxAttempts: 3,
    lockoutTime: 5 * 60 * 1000, // 5 minutes
  },

  // SEO
  seo: {
    title: 'SmartRecruit - Plateforme de Recrutement Premium',
    description: 'Trouvez les meilleures opportunités de carrière en Tunisie avec SmartRecruit. Candidats, recruteurs, entreprises.',
    keywords: 'recrutement, emploi, tunisie, candidat, recruteur, offre d\'emploi',
    url: 'https://smartrecruit.tn',
  },

  // Social Media
  socialMedia: {
    facebook: 'https://facebook.com/smartrecruit',
    linkedin: 'https://linkedin.com/company/smartrecruit',
    twitter: 'https://twitter.com/smartrecruit',
    instagram: 'https://instagram.com/smartrecruit',
  },

  // Support
  support: {
    email: 'support@smartrecruit.tn',
    phone: '+216 71 123 456',
    hours: 'Lun-Ven: 9h-18h',
  },
};

// Fonctions utilitaires

// Générer un token aléatoire
exports.generateToken = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Formater une date
exports.formatDate = (date, format = 'DD/MM/YYYY') => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  if (format === 'DD/MM/YYYY') {
    return `${day}/${month}/${year}`;
  } else if (format === 'MM/DD/YYYY') {
    return `${month}/${day}/${year}`;
  } else if (format === 'YYYY-MM-DD') {
    return `${year}-${month}-${day}`;
  }

  return `${day}/${month}/${year}`;
};

// Calculer l'âge à partir de la date de naissance
exports.calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

// Valider un email
exports.isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Valider un numéro de téléphone tunisien
exports.isValidPhone = (phone) => {
  const phoneRegex = /^(\+216)?[0-9]{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Normaliser une chaîne de caractères
exports.slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

// Extraire les hashtags d'un texte
exports.extractHashtags = (text) => {
  const hashtagRegex = /#(\w+)/g;
  const hashtags = text.match(hashtagRegex);
  return hashtags || [];
};

// Calculer la moyenne d'un tableau
exports.calculateAverage = (numbers) => {
  if (!numbers || numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b, 0);
  return sum / numbers.length;
};

// Pagination helper
exports.getPagination = (page, limit) => {
  const currentPage = parseInt(page) || 1;
  const currentLimit = parseInt(limit) || 10;
  const skip = (currentPage - 1) * currentLimit;

  return {
    skip,
    limit: currentLimit,
    currentPage,
  };
};

// Formater la réponse de pagination
exports.formatPaginationResponse = (data, total, page, limit) => {
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
};

// Générer un code aléatoire
exports.generateCode = (length = 6) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// Masquer un email
exports.maskEmail = (email) => {
  if (!email) return '';
  const [name, domain] = email.split('@');
  if (name.length <= 3) {
    return `${name[0]}***@${domain}`;
  }
  return `${name.substring(0, 2)}***@${domain}`;
};

// Masquer un numéro de téléphone
exports.maskPhone = (phone) => {
  if (!phone) return '';
  const cleaned = phone.replace(/\s/g, '');
  if (cleaned.length <= 4) {
    return cleaned;
  }
  return `${cleaned.substring(0, 4)}****`;
};

// Calculer le pourcentage
exports.calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

// Formater un nombre avec séparateurs de milliers
exports.formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

// Valider la force du mot de passe
exports.validatePasswordStrength = (password) => {
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;

  let strength = 'weak';
  if (score >= 4) strength = 'strong';
  else if (score >= 3) strength = 'medium';

  return { strength, checks };
};

// Générer un ID unique
exports.generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Trier un tableau d'objets par une propriété
exports.sortBy = (array, prop, order = 'asc') => {
  return array.sort((a, b) => {
    if (order === 'asc') {
      return a[prop] > b[prop] ? 1 : -1;
    } else {
      return a[prop] < b[prop] ? 1 : -1;
    }
  });
};

// Filtrer un tableau d'objets par une propriété
exports.filterBy = (array, prop, value) => {
  return array.filter(item => item[prop] === value);
};

// Grouper un tableau d'objets par une propriété
exports.groupBy = (array, prop) => {
  return array.reduce((groups, item) => {
    const key = item[prop];
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});
};

// Vérifier si une date est expirée
exports.isExpired = (date) => {
  return new Date(date) < new Date();
};

// Ajouter des jours à une date
exports.addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Calculer la différence en jours entre deux dates
exports.daysBetween = (date1, date2) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);

  return Math.round((firstDate - secondDate) / oneDay);
};

// Tronquer un texte
exports.truncate = (text, length = 100, suffix = '...') => {
  if (text.length <= length) {
    return text;
  }
  return text.substring(0, length) + suffix;
};

// Nettoyer les objets (supprimer les propriétés null/undefined)
exports.cleanObject = (obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];
    if (value !== null && value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {});
};

// Calculer la distance entre deux coordonnées (en km)
exports.calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

// Générer un couleur aléatoire
exports.generateRandomColor = () => {
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6366F1'];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Valider un code postal tunisien
exports.isValidPostalCode = (code) => {
  const postalCodeRegex = /^\d{4}$/;
  return postalCodeRegex.test(code);
};

// Formater le salaire
exports.formatSalary = (salaire, devise = 'TND') => {
  if (!salaire) return 'Non spécifié';
  if (salaire === -1) return 'Illimité';
  return `${salaire.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ${devise}`;
};

// Calculer l'ancienneté
exports.calculateSeniority = (startDate) => {
  const start = new Date(startDate);
  const now = new Date();
  const years = now.getFullYear() - start.getFullYear();

  if (years < 1) {
    const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    return `${months} mois`;
  }

  return `${years} an${years > 1 ? 's' : ''}`;
};

// Valider un code postal
exports.validatePostalCode = (code) => {
  return /^\d{4}$/.test(code);
};

// Générer un slug unique
exports.generateUniqueSlug = async (Model, text, field = 'slug') => {
  let slug = this.slugify(text);
  let count = 0;

  while (await Model.findOne({ [field]: slug })) {
    count++;
    slug = `${slug}-${count}`;
  }

  return slug;
};

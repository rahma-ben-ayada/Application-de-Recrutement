const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Article = require('./models/Article');

dotenv.config();

const sampleArticles = [
  {
    titre: '10 Astuces pour un CV Parfait',
    contenu: `<p>Un CV bien rédigé est votre ticket d'entrée pour les entretiens d'embauche. Voici 10 astuces pour créer un CV qui se démarque :</p>
    <h3>1. Soyez concis et pertinent</h3>
    <p>Limitez votre CV à une ou deux pages maximum. Les recruteurs passent peu de temps sur chaque CV.</p>
    <h3>2. Utilisez des mots-clés</h3>
    <p>Intégrez les mots-clés pertinents pour votre secteur et le poste visé.</p>
    <h3>3. Mettez en avant vos réalisations</h3>
    <p>Ne vous contentez pas de lister vos tâches, mettez en avant vos résultats concrets.</p>
    <h3>4. Soignez la présentation</h3>
    <p>Utilisez une mise en page claire et aérée avec des polices professionnelles.</p>
    <h3>5. Adaptez votre CV à chaque offre</h3>
    <p>Personnalisez votre CV en fonction de l'entreprise et du poste visé.</p>`,
    extrait: 'Découvrez les techniques pour créer un CV qui se démarque et attire les recruteurs.',
    categorie: 'Conseils Carrière',
    image: '📄',
    tempsLecture: '5 min',
    featured: true,
    tags: ['CV', 'Recrutement', 'Conseils'],
  },
  {
    titre: 'Comment Réussir un Entretien Vidéo',
    contenu: `<p>Les entretiens vidéo sont devenus la norme. Voici comment les réussir :</p>
    <h3>Préparation technique</h3>
    <p>Testez votre équipement avant l'entretien. Vérifiez votre connexion internet, votre caméra et votre micro.</p>
    <h3>Environnement</h3>
    <p>Choisissez un endroit calme et bien éclairé. Assurez-vous que l'arrière-plan est professionnel.</p>
    <h3>Communication non-verbale</h3>
    <p>Maintenez un contact visuel avec la caméra. Adoptez une posture professionnelle.</p>
    <h3>Contenu</h3>
    <p>Préparez des exemples concrets de vos réalisations. Soyez prêt à répondre aux questions classiques.</p>`,
    extrait: 'Préparez-vous efficacement aux entretiens en ligne avec ces conseils pratiques.',
    categorie: 'Entretien',
    image: '📹',
    tempsLecture: '7 min',
    featured: true,
    tags: ['Entretien', 'Vidéo', 'Télétravail'],
  },
  {
    titre: 'Les Compétences les Plus Recherchées en 2024',
    contenu: `<p>Le marché du travail évolue rapidement. Voici les compétences les plus demandées cette année :</p>
    <h3>Compétences techniques</h3>
    <ul>
    <li>Développement Web et Mobile</li>
    <li>Data Science et Machine Learning</li>
    <li>Cybersécurité</li>
    <li>Cloud Computing</li>
    </ul>
    <h3>Compétences douces</h3>
    <ul>
    <li>Adaptabilité et flexibilité</li>
    <li>Communication efficace</li>
    <li>Résolution de problèmes</li>
    <li>Intelligence émotionnelle</li>
    </ul>`,
    extrait: 'Analyse des compétences clés que les entreprises recherchent cette année.',
    categorie: 'Tendances',
    image: '🎯',
    tempsLecture: '6 min',
    featured: false,
    tags: ['Compétences', 'Tendances', '2024'],
  },
  {
    titre: 'Lettre de Motivation : Exemples et Modèles',
    contenu: `<p>Une lettre de motivation bien rédigée peut faire la différence. Voici comment structurer la vôtre :</p>
    <h3>Structure idéale</h3>
    <p>Commencez par une accroche forte, présentez vos motivations, démontrez votre intérêt pour l'entreprise et terminez par un appel à l'action.</p>
    <h3>Conseils de rédaction</h3>
    <p>Personnalisez chaque lettre, soyez spécifique sur vos compétences, et évitez les formules génériques.</p>
    <h3>Exemples</h3>
    <p>Téléchargez nos modèles gratuits pour vous inspirer et adapter selon votre situation.</p>`,
    extrait: 'Templates et exemples de lettres de motivation efficaces.',
    categorie: 'Conseils Carrière',
    image: '✉️',
    tempsLecture: '8 min',
    featured: false,
    tags: ['Lettre de motivation', 'Modèles', 'Conseils'],
  },
  {
    titre: 'Questions Fréquentes en Entretien',
    contenu: `<p>Préparez-vous aux questions les plus posées en entretien :</p>
    <h3>Questions classiques</h3>
    <ul>
    <li>"Présentez-vous"</li>
    <li>"Quelles sont vos forces et faiblesses ?"</li>
    <li>"Pourquoi voulez-vous travailler ici ?"</li>
    <li>"Où vous voyez-vous dans 5 ans ?"</li>
    </ul>
    <h3>Méthode STAR</h3>
    <p>Utilisez la méthode STAR (Situation, Tâche, Action, Résultat) pour structurer vos réponses avec des exemples concrets.</p>`,
    extrait: 'Préparez-vous aux questions les plus posées par les recruteurs.',
    categorie: 'Entretien',
    image: '❓',
    tempsLecture: '10 min',
    featured: false,
    tags: ['Entretien', 'Questions', 'Préparation'],
  },
  {
    titre: 'Networking : Stratégies pour Candidats',
    contenu: `<p>Le networking est essentiel pour trouver des opportunités cachées. Voici comment développer votre réseau :</p>
    <h3>En ligne</h3>
    <p>Optimisez votre profil LinkedIn, rejoignez des groupes professionnels, participez à des discussions.</p>
    <h3>Événements</h3>
    <p>Assistez à des conférences, salons de l'emploi et meetups professionnels dans votre domaine.</p>
    <h3>Relations</h3>
    <p>Entretenez vos contacts, offrez de l'aide avant d'en demander, soyez authentique.</p>`,
    extrait: 'Comment développer votre réseau professionnel pour booster votre recherche.',
    categorie: 'Carrière',
    image: '🤝',
    tempsLecture: '6 min',
    featured: false,
    tags: ['Networking', 'Carrière', 'Relations'],
  },
  {
    titre: 'L\'Intelligence Artificielle dans le Recrutement',
    contenu: `<p>L'IA transforme le recrutement. Voici ce que vous devez savoir :</p>
    <h3>Comment fonctionne l'IA</h3>
    <p>Les algorithmes analysent les CV, prédissent la performance des candidats et automatisent les premières sélections.</p>
    <h3>S'adapter à l'IA</h3>
    <p>Utilisez des mots-clés pertinents, optimisez votre CV pour les ATS, soyez authentique mais stratégique.</p>
    <h3>L'avenir</h3>
    <p>L'IA ne remplace pas le jugement humain mais l'augmente pour des décisions plus éclairées.</p>`,
    extrait: 'Comment l\'IA transforme le processus de recrutement et comment s\'adapter.',
    categorie: 'Technologie',
    image: '🤖',
    tempsLecture: '7 min',
    featured: true,
    tags: ['IA', 'Recrutement', 'Technologie'],
  },
  {
    titre: 'Négociation Salariale : Guide Complet',
    contenu: `<p>Négocier votre salaire est une étape cruciale. Voici comment procéder :</p>
    <h3>Préparation</h3>
    <p>Recherchez les fourchettes de salaires pour votre poste et région. Évaluez votre valeur sur le marché.</p>
    <h3>Stratégie</h3>
    <p>Commencez par le haut de la fourchette, justifiez avec vos compétences et réalisations, restez flexible.</p>
    <h3>Au-delà du salaire</h3>
    <p>Négociez aussi les avantages, la flexibilité, les opportunités de formation et l'évolution.</p>`,
    extrait: 'Techniques et conseils pour négocier votre salaire avec succès.',
    categorie: 'Conseils Carrière',
    image: '💰',
    tempsLecture: '9 min',
    featured: false,
    tags: ['Salaire', 'Négociation', 'Conseils'],
  },
];

async function seedArticles() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smartrecruit', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('📦 Connected to MongoDB');

    // Clear existing articles
    await Article.deleteMany({});
    console.log('🗑️  Cleared existing articles');

    // Insert sample articles
    const inserted = await Article.insertMany(sampleArticles);
    console.log(`✅ Inserted ${inserted.length} articles`);

    console.log('\n📰 Sample Articles:');
    inserted.forEach(article => {
      console.log(`   - ${article.titre} (${article.categorie})`);
    });

  } catch (error) {
    console.error('❌ Error seeding articles:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n👋 Disconnected from MongoDB');
  }
}

seedArticles();

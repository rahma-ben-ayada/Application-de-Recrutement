import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { professionalTheme, professionalKeyframes } from '../theme/professionalTheme';
import api from '../utils/api';

const entreprisesData = [
  {
    id: 1,
    nom: 'Tech Corp',
    secteur: 'Informatique',
    logo: '💻',
    logoUrl: '',
    employes: '50-100',
    localisation: 'Tunis',
    offres: 5,
    description: 'Leader dans le développement de solutions logiciels innovantes pour les entreprises.',
    badges: ['Top Employeur', 'Certifié'],
    website: 'techcorp.tn',
    anneeCreation: 2018,
    ratings: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    nom: 'StartUp RH',
    secteur: 'Ressources Humaines',
    logo: '🚀',
    logoUrl: '',
    employes: '20-50',
    localisation: 'Sfax',
    offres: 3,
    description: 'Startup spécialisée dans les solutions RH modernes et l\'automatisation du recrutement.',
    badges: ['Innovant', 'Startup'],
    website: 'startuprh.tn',
    anneeCreation: 2020,
    ratings: 4.6,
    reviews: 89,
  },
  {
    id: 3,
    nom: 'Big Finance',
    secteur: 'Finance & Banque',
    logo: '🏦',
    logoUrl: '',
    employes: '500+',
    localisation: 'Tunis',
    offres: 8,
    description: 'Institution financière de premier plan, recrute des profils bancaires et experts financiers.',
    badges: ['Top Employeur', 'International', 'Fortune 500'],
    website: 'bigfinance.tn',
    anneeCreation: 2010,
    ratings: 4.9,
    reviews: 256,
  },
  {
    id: 4,
    nom: 'Digital Agency',
    secteur: 'Marketing Digital',
    logo: '📱',
    logoUrl: '',
    employes: '10-20',
    localisation: 'Sousse',
    offres: 2,
    description: 'Agence de marketing digital créative, spécialisée en stratégie de contenu et réseaux sociaux.',
    badges: ['Agence'],
    website: 'digitalagency.tn',
    anneeCreation: 2021,
    ratings: 4.5,
    reviews: 45,
  },
  {
    id: 5,
    nom: 'Dev Studio',
    secteur: 'Développement',
    logo: '⚡',
    logoUrl: '',
    employes: '30-50',
    localisation: 'Tunis',
    offres: 4,
    description: 'Studio de développement mobile et web, applications sur mesure pour entreprises.',
    badges: ['Certifié', 'Premium'],
    website: 'devstudio.tn',
    anneeCreation: 2019,
    ratings: 4.7,
    reviews: 78,
  },
  {
    id: 6,
    nom: 'Cloud Corp',
    secteur: 'Cloud & Infrastructure',
    logo: '☁️',
    logoUrl: '',
    employes: '100-200',
    localisation: 'Remote',
    offres: 6,
    description: 'Solutions cloud computing, infrastructure IT et services managés pour entreprises.',
    badges: ['Top Employeur', 'Innovant', 'International'],
    website: 'cloudcorp.com',
    anneeCreation: 2017,
    ratings: 4.8,
    reviews: 167,
  },
  {
    id: 7,
    nom: 'Health Tech',
    secteur: 'Santé & Biotech',
    logo: '🏥',
    logoUrl: '',
    employes: '150-250',
    localisation: 'Monastir',
    offres: 7,
    description: 'Entreprise de technologie médicale, recrute médecins et chercheurs biomédicaux.',
    badges: ['Innovant', 'R&D'],
    website: 'healthtech.tn',
    anneeCreation: 2019,
    ratings: 4.6,
    reviews: 112,
  },
  {
    id: 8,
    nom: 'Eco Energy',
    secteur: 'Énergies Renouvelables',
    logo: '🌱',
    logoUrl: '',
    employes: '75-150',
    localisation: 'Sfax',
    offres: 4,
    description: 'Leader dans les énergies renouvelables, projets solaires et éoliens.',
    badges: ['Vert', 'Certifié ISO'],
    website: 'ecoenergy.tn',
    anneeCreation: 2020,
    ratings: 4.9,
    reviews: 94,
  },
  {
    id: 9,
    nom: 'Edu Tech',
    secteur: 'EdTech',
    logo: '📚',
    logoUrl: '',
    employes: '40-80',
    localisation: 'Tunis',
    offres: 5,
    description: 'Plateforme éducative en ligne, recrute enseignants et experts pédagogiques.',
    badges: ['Innovant', 'Social'],
    website: 'edutech.tn',
    anneeCreation: 2021,
    ratings: 4.7,
    reviews: 156,
  },
];

const secteurs = [...new Set(entreprisesData.map(e => e.secteur))];

const stats = [
  { value: '500+', label: 'Entreprises Inscrites', icon: '🏢', color: '#5B73F7' },
  { value: '15K+', label: 'Offres Publiées', icon: '💼', color: '#14D2C4' },
  { value: '50K+', label: 'Candidats', icon: '👥', color: '#F59E0B' },
  { value: '98%', label: 'Satisfaction', icon: '⭐', color: '#8B5CF6' },
];

const benefits = [
  { icon: '🎯', title: 'Visibilité Maximale', description: 'Votre entreprise vue par des milliers de candidats qualifiés', color: '#5B73F7' },
  { icon: '⚡', title: 'Recrutement Rapide', description: 'Trouvez le bon candidat en moins de 15 jours en moyenne', color: '#14D2C4' },
  { icon: '💰', title: 'Coût Réduit', description: 'Économisez jusqu\'à 70% sur vos frais de recrutement', color: '#F59E0B' },
  { icon: '📊', title: 'Analytics Avancés', description: 'Tableaux de bord pour suivre vos KPIs en temps réel', color: '#8B5CF6' },
];

const howItWorks = [
  { step: '01', title: 'Créez votre compte', desc: 'Inscription gratuite en 2 minutes', icon: '📝' },
  { step: '02', title: 'Complétez votre profil', desc: 'Présentez votre entreprise et vos valeurs', icon: '🏢' },
  { step: '03', title: 'Publiez vos offres', desc: 'Créez des offres attractives en quelques clics', icon: '💼' },
  { step: '04', title: 'Recrutez les meilleurs', desc: 'Utilisez notre IA pour trouver les talents idéaux', icon: '🎯' },
];

const testimonials = [
  {
    quote: 'SmartRecruit nous a fait gagner 60% de temps sur le présélectionnement. L\'IA scoring est impressionnante ! Nous avons trouvé 3 développeurs seniors en 2 semaines.',
    name: 'Sarah Ben Ali',
    role: 'DRH chez Tech Corp',
    avatar: 'SB',
    color: '#5B73F7',
    results: '60% temps gagné',
  },
  {
    quote: 'Interface exceptionnelle et fonctionnalités puissantes. Nous avons recruté 15 personnes cette année avec un taux de satisfaction de 98%.',
    name: 'Karim Mansouri',
    role: 'CEO chez StartUp RH',
    avatar: 'KM',
    color: '#14D2C4',
    results: '15 recrutements en 1 an',
  },
  {
    quote: 'Le support client est excellent et les fonctionnalités correspondent parfaitement à nos besoins. Recruter n\'a jamais été aussi simple !',
    name: 'Lina Cherif',
    role: 'RH Manager chez Big Finance',
    avatar: 'LC',
    color: '#10B981',
    results: 'Taux de satisfaction 98%',
  },
];

function getBadgeColor(badge) {
  const badgeColors = {
    'Top Employeur': professionalTheme.colors.primary[50],
    'Certifié': professionalTheme.colors.success.light,
    'Innovant': professionalTheme.colors.info.light,
    'International': professionalTheme.colors.warning.light,
    'Startup': professionalTheme.colors.secondary[50],
    'Agence': professionalTheme.colors.neutral[100],
    'Premium': professionalTheme.colors.primary[100],
    'Vert': professionalTheme.colors.success.light,
    'Social': professionalTheme.colors.info.light,
    'R&D': professionalTheme.colors.warning.light,
    'Fortune 500': professionalTheme.colors.error.light,
    'Certifié ISO': professionalTheme.colors.success.light,
  };
  return badgeColors[badge] || professionalTheme.colors.primary[50];
}

export default function Entreprises() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedSector, setSelectedSector] = useState('Tous');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const filteredEntreprises = entreprisesData.filter(ent => {
    const matchSearch = ent.nom.toLowerCase().includes(search.toLowerCase()) ||
                     ent.secteur.toLowerCase().includes(search.toLowerCase());
    const matchSector = selectedSector === 'Tous' || ent.secteur === selectedSector;
    return matchSearch && matchSector;
  });

  const styles = {
    page: {
      fontFamily: professionalTheme.fonts.sans,
      background: '#FAFAFA',
      color: professionalTheme.colors.neutral[900],
      minHeight: '100vh',
    },
    navbar: {
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(228, 228, 231, 0.5)',
      transition: professionalTheme.transitions.default,
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    },
    navContainer: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: isMobile ? '0 1.5rem' : '0 2rem',
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      cursor: 'pointer',
      transition: professionalTheme.transitions.fast,
    },
    logoIcon: {
      width: isMobile ? '42px' : '48px',
      height: isMobile ? '42px' : '48px',
      borderRadius: professionalTheme.radius.xl,
      background: professionalTheme.gradients.primary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFFFFF',
      fontWeight: 700,
      fontSize: isMobile ? '16px' : '18px',
      boxShadow: '0 8px 24px rgba(91, 115, 247, 0.3)',
      transition: professionalTheme.transitions.fast,
    },
    logoText: {
      fontSize: isMobile ? professionalTheme.fontSizes.xl : professionalTheme.fontSizes['2xl'],
      fontWeight: 800,
      background: professionalTheme.gradients.primary,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    navLinks: {
      display: isMobile ? 'none' : 'flex',
      gap: '2.5rem',
      alignItems: 'center',
    },
    navLink: {
      color: professionalTheme.colors.neutral[700],
      textDecoration: 'none',
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      cursor: 'pointer',
      padding: '0.5rem 1rem',
      borderRadius: professionalTheme.radius.lg,
      transition: professionalTheme.transitions.fast,
    },
    button: {
      padding: '0.75rem 1.5rem',
      borderRadius: professionalTheme.radius.full,
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      cursor: 'pointer',
      transition: professionalTheme.transitions.default,
      border: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    buttonPrimary: {
      background: professionalTheme.gradients.primary,
      color: '#FFFFFF',
      boxShadow: '0 4px 15px rgba(91, 115, 247, 0.3)',
    },
    buttonSecondary: {
      background: professionalTheme.colors.neutral[100],
      color: professionalTheme.colors.neutral[900],
    },
    heroButtonPrimary: {
      padding: '1rem 2rem',
      background: '#FFFFFF',
      color: professionalTheme.colors.primary[600],
      borderRadius: professionalTheme.radius.full,
      fontSize: professionalTheme.fontSizes.base,
      fontWeight: 700,
      cursor: 'pointer',
      transition: professionalTheme.transitions.default,
      border: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.625rem',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    },
    mobileMenuButton: {
      display: isMobile ? 'flex' : 'none',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '0.5rem',
    },
    hero: {
      paddingTop: isMobile ? '6rem' : '8rem',
      paddingBottom: isMobile ? '4rem' : '6rem',
      background: `linear-gradient(135deg, ${professionalTheme.colors.primary[50]} 0%, ${professionalTheme.colors.secondary[50]} 100%)`,
      position: 'relative',
      overflow: 'hidden',
    },
    heroBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.15,
      backgroundImage: `
        radial-gradient(circle at 20% 50%, rgba(91, 115, 247, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 80% 50%, rgba(20, 210, 196, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 50% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)
      `,
    },
    heroContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      textAlign: 'center',
      position: 'relative',
      zIndex: 1,
      padding: isMobile ? '0 1.5rem' : '0 2rem',
    },
    heroBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: professionalTheme.colors.primary[50],
      color: professionalTheme.colors.primary[700],
      padding: '0.5rem 1rem',
      borderRadius: professionalTheme.radius.full,
      fontSize: isMobile ? professionalTheme.fontSizes.xs : professionalTheme.fontSizes.sm,
      fontWeight: 600,
      marginBottom: '1.5rem',
    },
    heroTitle: {
      fontSize: isMobile ? professionalTheme.fontSizes['4xl'] : professionalTheme.fontSizes['5xl'],
      fontWeight: 800,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '1.5rem',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    heroSubtitle: {
      fontSize: isMobile ? professionalTheme.fontSizes.base : professionalTheme.fontSizes.xl,
      color: professionalTheme.colors.neutral[700],
      maxWidth: '700px',
      margin: '0 auto 2rem',
      lineHeight: 1.6,
    },
    heroStats: {
      display: 'flex',
      gap: isMobile ? '2rem' : '4rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    heroStat: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1rem',
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      borderRadius: professionalTheme.radius.full,
      border: '1px solid rgba(255, 255, 255, 0.3)',
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
    },
    statsSection: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['3xl'],
      padding: isMobile ? '2rem' : '3rem',
      boxShadow: professionalTheme.shadows.xl,
      marginTop: isMobile ? '-2rem' : '-3rem',
      position: 'relative',
      zIndex: 10,
      maxWidth: '1100px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: isMobile ? '1.5rem' : '2rem',
    },
    statCard: {
      textAlign: 'center',
      padding: isMobile ? '1rem' : '1.5rem',
    },
    statIcon: {
      width: isMobile ? '48px' : '56px',
      height: isMobile ? '48px' : '56px',
      borderRadius: professionalTheme.radius.xl,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: isMobile ? '1.5rem' : '2rem',
      margin: '0 auto 1rem',
    },
    statValue: {
      fontSize: isMobile ? professionalTheme.fontSizes['2xl'] : professionalTheme.fontSizes['3xl'],
      fontWeight: 800,
      marginBottom: '0.25rem',
    },
    statLabel: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      fontWeight: 500,
    },
    section: {
      padding: isMobile ? '4rem 1.5rem' : '6rem 2rem',
    },
    sectionContainer: {
      maxWidth: '1400px',
      margin: '0 auto',
    },
    sectionHeader: {
      textAlign: 'center',
      marginBottom: isMobile ? '3rem' : '4rem',
    },
    sectionBadge: {
      display: 'inline-block',
      padding: '0.375rem 0.875rem',
      borderRadius: professionalTheme.radius.full,
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      background: professionalTheme.colors.primary[50],
      color: professionalTheme.colors.primary[700],
      marginBottom: '1rem',
    },
    sectionTitle: {
      fontSize: isMobile ? professionalTheme.fontSizes['3xl'] : professionalTheme.fontSizes['4xl'],
      fontWeight: 800,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '1rem',
    },
    sectionSubtitle: {
      fontSize: isMobile ? professionalTheme.fontSizes.base : professionalTheme.fontSizes.lg,
      color: professionalTheme.colors.neutral[600],
      maxWidth: '650px',
      margin: '0 auto',
    },
    benefitsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
      gap: isMobile ? '1.5rem' : '2rem',
    },
    benefitCard: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      padding: isMobile ? '1.5rem' : '2rem',
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      textAlign: 'center',
      transition: professionalTheme.transitions.default,
      cursor: 'default',
    },
    benefitIcon: {
      width: '64px',
      height: '64px',
      borderRadius: professionalTheme.radius.xl,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.75rem',
      margin: '0 auto 1rem',
    },
    benefitTitle: {
      fontSize: professionalTheme.fontSizes.lg,
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.5rem',
    },
    benefitDescription: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      lineHeight: 1.6,
    },
    filtersSection: {
      background: '#FFFFFF',
      padding: isMobile ? '1.5rem' : '2rem',
      borderBottom: `1px solid ${professionalTheme.colors.neutral[200]}`,
      position: 'sticky',
      top: '80px',
      zIndex: 100,
      boxShadow: professionalTheme.shadows.sm,
    },
    filtersContainer: {
      maxWidth: '1400px',
      margin: '0 auto',
      display: 'flex',
      gap: isMobile ? '1rem' : '2rem',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    searchBox: {
      flex: 1,
      minWidth: '280px',
    },
    searchInput: {
      width: '100%',
      padding: '0.875rem 1.5rem',
      borderRadius: professionalTheme.radius.full,
      border: `2px solid ${professionalTheme.colors.neutral[200]}`,
      fontSize: professionalTheme.fontSizes.base,
      outline: 'none',
      transition: professionalTheme.transitions.default,
      background: '#FFFFFF',
    },
    filterGroup: {
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    filterLabel: {
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      color: professionalTheme.colors.neutral[700],
      marginRight: '0.5rem',
    },
    filterButton: (isActive) => ({
      padding: '0.625rem 1.25rem',
      borderRadius: professionalTheme.radius.full,
      border: isActive ? `2px solid ${professionalTheme.colors.primary[600]}` : `2px solid ${professionalTheme.colors.neutral[200]}`,
      background: isActive ? professionalTheme.colors.primary[50] : '#FFFFFF',
      color: isActive ? professionalTheme.colors.primary[700] : professionalTheme.colors.neutral[700],
      fontSize: professionalTheme.fontSizes.sm,
      fontWeight: 600,
      cursor: 'pointer',
      transition: professionalTheme.transitions.fast,
    }),
    viewToggle: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      background: professionalTheme.colors.neutral[100],
      borderRadius: professionalTheme.radius.full,
    },
    viewToggleButton: (isActive) => ({
      padding: '0.5rem',
      borderRadius: professionalTheme.radius.md,
      border: 'none',
      background: isActive ? professionalTheme.colors.primary[600] : 'transparent',
      color: isActive ? '#FFFFFF' : professionalTheme.colors.neutral[600],
      cursor: 'pointer',
      transition: professionalTheme.transitions.fast,
    }),
    entreprisesGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: isMobile ? '1.5rem' : '2rem',
    },
    entreprisesList: {
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? '1rem' : '1.5rem',
    },
    entrepriseCard: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      padding: isMobile ? '1.5rem' : '2rem',
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      transition: professionalTheme.transitions.default,
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
    },
    entrepriseCardList: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'flex-start' : 'center',
      gap: isMobile ? '1rem' : '2rem',
      padding: isMobile ? '1.5rem' : '2rem',
    },
    entrepriseLogo: {
      width: isMobile ? '64px' : '80px',
      height: isMobile ? '64px' : '80px',
      borderRadius: professionalTheme.radius['2xl'],
      background: professionalTheme.colors.neutral[100],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: isMobile ? '2rem' : '2.5rem',
      margin: '0 auto 1.5rem',
      flexShrink: 0,
    },
    entrepriseLogoList: {
      margin: '0',
      width: isMobile ? '72px' : '96px',
      height: isMobile ? '72px' : '96px',
    },
    entrepriseHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1rem',
    },
    entrepriseInfo: {
      flex: 1,
    },
    entrepriseNom: {
      fontSize: professionalTheme.fontSizes.lg,
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.25rem',
    },
    entrepriseSecteur: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.primary[600],
      fontWeight: 500,
    },
    entrepriseDescription: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
      lineHeight: 1.6,
      marginBottom: '1rem',
    },
    entrepriseBadges: {
      display: 'flex',
      gap: '0.5rem',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      marginBottom: '1rem',
    },
    badge: (color) => ({
      padding: '0.375rem 0.75rem',
      borderRadius: professionalTheme.radius.full,
      fontSize: professionalTheme.fontSizes.xs,
      fontWeight: 600,
      background: color || professionalTheme.colors.primary[50],
      color: color?.replace('50', '') || professionalTheme.colors.primary[700],
    }),
    entrepriseMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '1rem',
      borderTop: `1px solid ${professionalTheme.colors.neutral[200]}`,
      gap: '1rem',
    },
    entrepriseMetaLeft: {
      display: 'flex',
      gap: '1rem',
    },
    entrepriseMetaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.375rem',
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
    },
    entrepriseRating: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.375rem',
    },
    stars: {
      color: '#FBBF24',
      display: 'flex',
      gap: '0.125rem',
    },
    howItWorksGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: isMobile ? '1.5rem' : '2rem',
    },
    stepCard: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      padding: isMobile ? '1.5rem' : '2rem',
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
      textAlign: 'center',
    },
    stepNumber: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      background: professionalTheme.gradients.primary,
      color: '#FFFFFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: professionalTheme.fontSizes.lg,
      fontWeight: 800,
      margin: '0 auto 1rem',
    },
    stepIcon: {
      fontSize: '2rem',
      marginBottom: '0.75rem',
    },
    stepTitle: {
      fontSize: professionalTheme.fontSizes.base,
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.5rem',
    },
    stepDescription: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
    },
    testimonialsSection: {
      background: professionalTheme.colors.neutral[50],
    },
    testimonialsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: isMobile ? '1.5rem' : '2rem',
    },
    testimonialCard: {
      background: '#FFFFFF',
      borderRadius: professionalTheme.radius['2xl'],
      padding: isMobile ? '1.5rem' : '2rem',
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
    },
    testimonialQuote: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[700],
      lineHeight: 1.7,
      marginBottom: '1.5rem',
      fontStyle: 'italic',
    },
    testimonialAuthor: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    testimonialAvatar: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      background: professionalTheme.gradients.primary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFFFFF',
      fontWeight: 700,
      fontSize: professionalTheme.fontSizes.lg,
    },
    testimonialInfo: {
      flex: 1,
    },
    testimonialName: {
      fontSize: professionalTheme.fontSizes.base,
      fontWeight: 700,
      color: professionalTheme.colors.neutral[900],
      marginBottom: '0.25rem',
    },
    testimonialRole: {
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[600],
    },
    testimonialResults: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.375rem',
      padding: '0.25rem 0.625rem',
      borderRadius: professionalTheme.radius.full,
      background: professionalTheme.colors.success.light,
      color: professionalTheme.colors.success.dark,
      fontSize: professionalTheme.fontSizes.xs,
      fontWeight: 500,
      marginLeft: '0.5rem',
    },
    ctaSection: {
      background: professionalTheme.gradients.primary,
      borderRadius: professionalTheme.radius['3xl'],
      padding: isMobile ? '3rem 2rem' : '5rem 3rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    },
    ctaBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.1,
      backgroundImage: `
        radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
      `,
    },
    ctaContent: {
      position: 'relative',
      zIndex: 1,
    },
    ctaTitle: {
      fontSize: isMobile ? professionalTheme.fontSizes['3xl'] : professionalTheme.fontSizes['4xl'],
      fontWeight: 800,
      color: '#FFFFFF',
      marginBottom: '1rem',
    },
    ctaSubtitle: {
      fontSize: isMobile ? professionalTheme.fontSizes.base : professionalTheme.fontSizes.xl,
      color: 'rgba(255, 255, 255, 0.9)',
      marginBottom: '2rem',
    },
    ctaButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    footer: {
      background: professionalTheme.colors.neutral[900],
      color: '#FFFFFF',
      padding: isMobile ? '3rem 1.5rem 2rem' : '4rem 2rem 3rem',
    },
    footerContainer: {
      maxWidth: '1400px',
      margin: '0 auto',
    },
    footerGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr 1fr',
      gap: isMobile ? '2rem' : '3rem',
      marginBottom: isMobile ? '2rem' : '3rem',
    },
    footerLink: {
      display: 'block',
      color: professionalTheme.colors.neutral[400],
      textDecoration: 'none',
      fontSize: professionalTheme.fontSizes.sm,
      marginBottom: '0.75rem',
      transition: professionalTheme.transitions.fast,
    },
    footerBottom: {
      paddingTop: '2rem',
      borderTop: `1px solid ${professionalTheme.colors.neutral[800]}`,
      textAlign: 'center',
      fontSize: professionalTheme.fontSizes.sm,
      color: professionalTheme.colors.neutral[500],
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '1rem' : '0',
    },
  };

  return (
    <div style={styles.page}>
      <style>{professionalKeyframes}</style>

      {/* ===== NAVBAR ===== */}
      <nav style={{
        ...styles.navbar,
        borderBottom: scrolled ? `1px solid ${professionalTheme.colors.neutral[200]}` : '1px solid rgba(228, 228, 231, 0.5)',
      }}>
        <div style={styles.navContainer}>
          <div style={styles.logo} onClick={() => navigate('/')}>
            <div style={styles.logoIcon}>SR</div>
            <div style={styles.logoText}>SmartRecruit</div>
          </div>

          <div style={styles.navLinks}>
            {['Fonctionnalités', 'Offres', 'Entreprises', 'Ressources'].map((link) => (
              <a
                key={link}
                style={{
                  ...styles.navLink,
                  color: link === 'Entreprises' ? professionalTheme.colors.primary[600] : professionalTheme.colors.neutral[700],
                }}
                onClick={() => {
                  if (link === 'Fonctionnalités') navigate('/fonctionnalites');
                  else if (link === 'Offres') navigate('/offres');
                  else if (link === 'Entreprises') navigate('/entreprises');
                  else if (link === 'Ressources') navigate('/ressources');
                }}
              >
                {link}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button style={{ ...styles.button, ...styles.buttonSecondary }} onClick={() => navigate('/login')}>
              Connexion
            </button>
            <button style={{ ...styles.button, ...styles.buttonPrimary }} onClick={() => navigate('/register')}>
              Recruter
            </button>
          </div>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section style={styles.hero}>
        <div style={styles.heroBackground} />
        <div style={styles.heroContainer}>
          <div style={styles.heroBadge}>
            <span>🏢</span>
            <span>+500 Entreprises Nous Font Confiance</span>
          </div>
          <h1 style={styles.heroTitle}>
            Recrutez les Meilleurs Talents
          </h1>
          <p style={styles.heroSubtitle}>
            Rejoignez les entreprises leaders qui utilisent SmartRecruit pour trouver les candidats idéaux et accélérer leur recrutement
          </p>

          <div style={styles.heroStats}>
            {stats.map((stat, index) => (
              <div key={index} style={styles.heroStat}>
                <span>{stat.icon}</span>
                <span>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <div style={styles.statsSection}>
        <div style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} style={styles.statCard}>
              <div style={{ ...styles.statIcon, background: `${stat.color}15`, color: stat.color }}>
                {stat.icon}
              </div>
              <div style={{ ...styles.statValue, color: stat.color }}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== BENEFITS ===== */}
      <section style={styles.section}>
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionBadge}>Avantages</div>
            <h2 style={styles.sectionTitle}>Pourquoi Choisir SmartRecruit ?</h2>
            <p style={styles.sectionSubtitle}>
              Des avantages concrets pour donner un coup d'accélération à votre recrutement
            </p>
          </div>

          <div style={styles.benefitsGrid}>
            {benefits.map((benefit, index) => (
              <div
                key={index}
                style={styles.benefitCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = professionalTheme.shadows.xl;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ ...styles.benefitIcon, background: `${benefit.color}15` }}>
                  {benefit.icon}
                </div>
                <h3 style={styles.benefitTitle}>{benefit.title}</h3>
                <p style={styles.benefitDescription}>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section style={{ ...styles.section, background: professionalTheme.colors.neutral[50] }}>
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionBadge}>Process</div>
            <h2 style={styles.sectionTitle}>Comment Ça Marche</h2>
            <p style={styles.sectionSubtitle}>
              4 étapes simples pour commencer à recruter
            </p>
          </div>

          <div style={styles.howItWorksGrid}>
            {howItWorks.map((step, index) => (
              <div key={index} style={styles.stepCard}>
                <div style={styles.stepNumber}>{step.step}</div>
                <div style={styles.stepIcon}>{step.icon}</div>
                <h3 style={styles.stepTitle}>{step.title}</h3>
                <p style={styles.stepDescription}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FILTERS ===== */}
      <section style={styles.filtersSection}>
        <div style={styles.filtersContainer}>
          <div style={styles.searchBox}>
            <input
              type="text"
              placeholder="🔍 Rechercher une entreprise..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = professionalTheme.colors.primary[500];
                e.currentTarget.style.boxShadow = '0 0 0 4px rgba(91, 115, 247, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = professionalTheme.colors.neutral[200];
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={styles.filterGroup}>
            <span style={styles.filterLabel}>Secteur:</span>
            {['Tous', ...secteurs].map(sector => (
              <button
                key={sector}
                style={styles.filterButton(selectedSector === sector)}
                onClick={() => setSelectedSector(sector)}
              >
                {sector}
              </button>
            ))}
          </div>

          <div style={styles.viewToggle}>
            <button
              style={styles.viewToggleButton(viewMode === 'grid')}
              onClick={() => setViewMode('grid')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
              </svg>
            </button>
            <button
              style={styles.viewToggleButton(viewMode === 'list')}
              onClick={() => setViewMode('list')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="3" x2="21" y2="3"/>
                <line x1="3" y1="9" x2="21" y2="9"/>
                <line x1="3" y1="15" x2="21" y2="15"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ===== ENTREPRISES ===== */}
      <section style={styles.section}>
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionBadge}>Entreprises</div>
            <h2 style={styles.sectionTitle}>Entreprises Recrutent</h2>
            <p style={styles.sectionSubtitle}>
              Découvrez les entreprises qui recherchent des talents comme vous
            </p>
          </div>

          <div style={viewMode === 'list' ? styles.entreprisesList : styles.entreprisesGrid}>
            {filteredEntreprises.map((entreprise) => (
              <div
                key={entreprise.id}
                style={viewMode === 'list' ? { ...styles.entrepriseCard, ...styles.entrepriseCardList } : styles.entrepriseCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = viewMode === 'list' ? 'translateX(8px)' : 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = professionalTheme.shadows.xl;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => navigate('/offres')}
              >
                <div style={viewMode === 'list' ? { ...styles.entrepriseLogo, ...styles.entrepriseLogoList } : styles.entrepriseLogo}>{entreprise.logo}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={styles.entrepriseHeader}>
                    <div style={styles.entrepriseInfo}>
                      <h3 style={styles.entrepriseNom}>{entreprise.nom}</h3>
                      <p style={styles.entrepriseSecteur}>{entreprise.secteur}</p>
                    </div>
                  </div>
                  {viewMode === 'grid' && <p style={styles.entrepriseDescription}>{entreprise.description}</p>}

                  <div style={styles.entrepriseBadges}>
                    {entreprise.badges.map(badge => (
                      <span key={badge} style={styles.badge(getBadgeColor(badge))}>
                        {badge}
                      </span>
                    ))}
                  </div>

                  {viewMode === 'list' && <p style={{ ...styles.entrepriseDescription, marginTop: '0.75rem' }}>{entreprise.description}</p>}
                </div>

                <div style={viewMode === 'list' ? { ...styles.entrepriseMeta, borderTop: 'none', paddingTop: 0, minWidth: 'fit-content' } : styles.entrepriseMeta}>
                  <div style={styles.entrepriseMetaLeft}>
                    <div style={styles.entrepriseMetaItem}>
                      👥 {entreprise.employes}
                    </div>
                    <div style={styles.entrepriseMetaItem}>
                      💼 {entreprise.offres} offre{entreprise.offres > 1 ? 's' : ''}
                    </div>
                    <div style={styles.entrepriseMetaItem}>
                      📍 {entreprise.localisation}
                    </div>
                  </div>
                  <div style={styles.entrepriseRating}>
                    <div style={styles.stars}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill={star <= entreprise.ratings ? 'currentColor' : 'none'}
                          stroke={star <= entreprise.ratings ? 'currentColor' : 'none'}
                          strokeWidth="2"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87"/>
                        </svg>
                      ))}
                    </div>
                    <span style={{ fontSize: professionalTheme.fontSizes.xs, color: professionalTheme.colors.neutral[500] }}>
                      ({entreprise.reviews})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEntreprises.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
              <p style={{ color: professionalTheme.colors.neutral[600], fontSize: professionalTheme.fontSizes.xl }}>
                Aucune entreprise ne correspond à votre recherche.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section style={{ ...styles.section, ...styles.testimonialsSection }}>
        <div style={styles.sectionContainer}>
          <div style={styles.sectionHeader}>
            <div style={{ ...styles.sectionBadge, background: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF' }}>
              Témoignages
            </div>
            <h2 style={{ ...styles.sectionTitle, color: '#FFFFFF' }}>
              Ce Que Disent Nos Recruteurs
            </h2>
            <p style={{ ...styles.sectionSubtitle, color: 'rgba(255, 255, 255, 0.8)' }}>
              Des entreprises satisfaites partagent leur expérience
            </p>
          </div>

          <div style={styles.testimonialsGrid}>
            {testimonials.map((testimonial, index) => (
              <div key={index} style={styles.testimonialCard}>
                <p style={styles.testimonialQuote}>"{testimonial.quote}"</p>
                <div style={styles.testimonialAuthor}>
                  <div style={{ ...styles.testimonialAvatar, background: testimonial.color }}>
                    {testimonial.avatar}
                  </div>
                  <div style={styles.testimonialInfo}>
                    <div style={styles.testimonialName}>{testimonial.name}</div>
                    <div style={styles.testimonialRole}>{testimonial.role}</div>
                  </div>
                </div>
                {testimonial.results && (
                  <div style={styles.testimonialResults}>
                    🎯 {testimonial.results}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={styles.section}>
        <div style={styles.sectionContainer}>
          <div style={styles.ctaSection}>
            <div style={styles.ctaBackground} />
            <div style={styles.ctaContent}>
              <h2 style={styles.ctaTitle}>
                Prêt à Recruter Votre Prochain Talent ?
              </h2>
              <p style={styles.ctaSubtitle}>
                Rejoignez +500 entreprises qui font confiance à SmartRecruit pour trouver les meilleurs candidats
              </p>
              <div style={styles.ctaButtons}>
                <button
                  style={{ ...styles.button, ...styles.heroButtonPrimary }}
                  onClick={() => navigate('/register')}
                >
                  Créer un Compte
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
                <button
                  style={{ ...styles.button, background: 'transparent', color: '#FFFFFF', border: '2px solid rgba(255, 255, 255, 0.3)', padding: '0.875rem 2rem' }}
                >
                  En Savoir Plus
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <div style={styles.footerGrid}>
            <div>
              <div style={{ ...styles.logo, marginBottom: '1rem' }}>
                <div style={{ ...styles.logoIcon, width: '40px', height: '40px', fontSize: '14px' }}>SR</div>
                <div style={{ fontSize: professionalTheme.fontSizes.lg, fontWeight: 700 }}>SmartRecruit</div>
              </div>
              <p style={{ fontSize: professionalTheme.fontSizes.sm, color: professionalTheme.colors.neutral[400], lineHeight: 1.7, maxWidth: '280px' }}>
                La plateforme de recrutement intelligent qui connecte les meilleurs talents aux opportunités idéales.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: professionalTheme.fontSizes.sm, fontWeight: 700, marginBottom: '1.25rem', color: '#FFFFFF' }}>
                Produit
              </h4>
              {['Fonctionnalités', 'Tarification', 'Pour Recruteurs', 'API'].map((link) => (
                <a key={link} href="#" style={styles.footerLink}>{link}</a>
              ))}
            </div>

            <div>
              <h4 style={{ fontSize: professionalTheme.fontSizes.sm, fontWeight: 700, marginBottom: '1.25rem', color: '#FFFFFF' }}>
                Entreprise
              </h4>
              {['À Propos', 'Blog', 'Carrières', 'Contact'].map((link) => (
                <a key={link} href="#" style={styles.footerLink}>{link}</a>
              ))}
            </div>

            <div>
              <h4 style={{ fontSize: professionalTheme.fontSizes.sm, fontWeight: 700, marginBottom: '1.25rem', color: '#FFFFFF' }}>
                Légal
              </h4>
              {['Confidentialité', 'CGU', 'Cookies', 'Mentions'].map((link) => (
                <a key={link} href="#" style={styles.footerLink}>{link}</a>
              ))}
            </div>
          </div>

          <div style={styles.footerBottom}>
            <div style={{ fontSize: professionalTheme.fontSizes.sm, color: professionalTheme.colors.neutral[500] }}>
              © 2024 SmartRecruit. Tous droits réservés.
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {['LinkedIn', 'Twitter', 'Facebook'].map((social) => (
                <a
                  key={social}
                  href="#"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: professionalTheme.radius.lg,
                    background: professionalTheme.colors.neutral[800],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: professionalTheme.colors.neutral[400],
                    textDecoration: 'none',
                    fontSize: professionalTheme.fontSizes.xs,
                    fontWeight: 600,
                  }}
                >
                  {social.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

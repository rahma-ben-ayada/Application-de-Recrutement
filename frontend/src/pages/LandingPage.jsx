import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const offresRecentes = [
  { id: 1, titre: 'Développeur React Senior', entreprise: 'Tech Corp',   lieu: 'Tunis',  type: 'CDI',   salaire: '2500 - 3500 TND' },
  { id: 2, titre: 'Data Scientist',           entreprise: 'StartUp RH', lieu: 'Remote', type: 'CDD',   salaire: '3000 - 4000 TND' },
  { id: 3, titre: 'UX/UI Designer',           entreprise: 'Big Finance', lieu: 'Sfax',   type: 'Stage', salaire: '800 - 1200 TND'  },
  { id: 4, titre: 'Chef de projet IT',        entreprise: 'Dev Studio',  lieu: 'Tunis',  type: 'CDI',   salaire: '3500 - 4500 TND' },
  { id: 5, titre: 'Développeur Java',         entreprise: 'Big Finance', lieu: 'Sousse', type: 'CDI',   salaire: '2800 - 3800 TND' },
  { id: 6, titre: 'DevOps Engineer',          entreprise: 'Cloud Corp',  lieu: 'Remote', type: 'CDI',   salaire: '4000 - 5000 TND' },
];

const entreprises = [
  { nom: 'Tech Corp',   secteur: 'Technologie',  offres: 12, logo: '💻' },
  { nom: 'StartUp RH',  secteur: 'RH & Conseil', offres: 8,  logo: '🚀' },
  { nom: 'Big Finance',  secteur: 'Finance',      offres: 15, logo: '💰' },
  { nom: 'Dev Studio',   secteur: 'Développement',offres: 6,  logo: '🎨' },
  { nom: 'Cloud Corp',   secteur: 'Cloud & DevOps',offres: 9, logo: '☁️' },
  { nom: 'Data Insights',secteur: 'Data Science', offres: 11, logo: '📊' },
];

const stats = [
  { value: '12k+', label: 'Candidats actifs',  icon: '👤' },
  { value: '340+', label: 'Entreprises',        icon: '🏢' },
  { value: '1.2k+',label: 'Offres publiées',   icon: '📋' },
  { value: '98%',  label: 'Taux satisfaction', icon: '⭐' },
];

const features = [
  { icon: '🤖', title: 'Score IA Intelligent',   desc: 'Notre IA analyse et score chaque candidat automatiquement selon des critères pondérés.' },
  { icon: '📊', title: 'Dashboard Power BI',      desc: 'Visualisez vos données RH en temps réel grâce à des tableaux de bord interactifs.' },
  { icon: '🎯', title: 'Matching Automatique',    desc: 'Trouvez les meilleurs candidats pour chaque offre grâce au matching intelligent.' },
  { icon: '📅', title: 'Gestion des entretiens', desc: 'Planifiez vos entretiens avec intégration Google Meet et Zoom.' },
  { icon: '📄', title: 'CV & Profil complet',     desc: 'Les candidats créent un profil complet avec CV, compétences et expériences.' },
  { icon: '🔒', title: 'Sécurisé & Fiable',      desc: 'Vos données sont protégées avec les dernières technologies de sécurité.' },
];

const temoignages = [
  { nom: 'Sarah Ben Ali',  poste: 'DRH, Tech Corp',   avatar: 'S', texte: 'SmartRecruit a révolutionné notre processus de recrutement. Le score IA nous fait gagner un temps précieux.' },
  { nom: 'Karim Mansouri', poste: 'CEO, StartUp RH',  avatar: 'K', texte: 'Interface intuitive et fonctionnalités puissantes. Nous avons réduit notre temps de recrutement de 60%.' },
  { nom: 'Lina Cherif',    poste: 'Candidat recruté', avatar: 'L', texte: 'J\'ai trouvé mon poste en 2 semaines ! La plateforme est simple et efficace.' },
];

const equipe = [
  { nom: 'Ahmed Trabelsi', poste: 'CEO & Fondateur',      avatar: 'A', desc: 'Expert en RH avec 10 ans d\'expérience' },
  { nom: 'Sonia Belhaj',   poste: 'CTO',                  avatar: 'S', desc: 'Ingénieure IA et Machine Learning' },
  { nom: 'Mohamed Slim',   poste: 'Head of Product',      avatar: 'M', desc: 'Designer UX avec vision produit' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [contactForm, setContactForm] = useState({ nom: '', email: '', sujet: '', message: '' });
  const [contactSent, setContactSent] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredOffres = offresRecentes.filter(o =>
    o.titre.toLowerCase().includes(search.toLowerCase()) ||
    o.entreprise.toLowerCase().includes(search.toLowerCase()) ||
    o.lieu.toLowerCase().includes(search.toLowerCase())
  );

  const setContact = (k) => (e) => setContactForm(f => ({ ...f, [k]: e.target.value }));

  const handleContact = () => {
    if (!contactForm.nom || !contactForm.email || !contactForm.message) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    setContactSent(true);
    setContactForm({ nom: '', email: '', sujet: '', message: '' });
    setTimeout(() => setContactSent(false), 5000);
  };

  return (
    <div style={{ fontFamily: 'DM Sans, sans-serif', background: '#fff', overflowX: 'hidden' }}>

      {/* ===== NAVBAR ===== */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(15,23,42,.97)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,.08)',
        padding: '0 60px', height: '68px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{
          fontFamily: 'Syne, sans-serif', fontSize: '22px',
          fontWeight: '800', color: '#fff', cursor: 'pointer',
        }} onClick={() => scrollTo('hero')}>
          Smart<span style={{ color: '#60A5FA' }}>Recruit</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {[
            { label: 'Offres',      id: 'offres' },
            { label: 'Entreprises', id: 'entreprises' },
            { label: 'À propos',    id: 'apropos' },
            { label: 'Contact',     id: 'contact' },
          ].map(l => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#94A3B8', fontSize: '14px', fontWeight: '500',
                fontFamily: 'DM Sans, sans-serif', transition: '150ms',
                padding: '0',
              }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = '#94A3B8'}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>

          {/* 🛡️ Bouton Admin discret */}
          <button
            onClick={() => navigate('/login-admin')}
            style={{
              height: '36px', padding: '0 14px', borderRadius: '8px',
              border: '1px solid rgba(255,255,255,.15)',
              background: 'rgba(255,255,255,.06)',
              color: '#64748B', cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif', fontSize: '12px',
              display: 'flex', alignItems: 'center', gap: '6px',
              transition: '150ms',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,.12)';
              e.currentTarget.style.color = '#94A3B8';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,.06)';
              e.currentTarget.style.color = '#64748B';
            }}
          >
            🛡️ Admin
          </button>

          <button onClick={() => navigate('/login')} style={{
            height: '40px', padding: '0 20px', borderRadius: '50px',
            border: '1.5px solid rgba(255,255,255,.2)', background: 'transparent',
            color: '#fff', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px', fontWeight: '500',
          }}>
            Se connecter
          </button>

          <button onClick={() => navigate('/register')} style={{
            height: '40px', padding: '0 20px', borderRadius: '50px',
            border: 'none', background: '#2563EB',
            color: '#fff', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px', fontWeight: '500',
            boxShadow: '0 4px 12px rgba(37,99,235,.4)',
          }}>
            S'inscrire gratuitement
          </button>
        </div>

      </nav>

      {/* ===== HERO ===== */}
      <section id="hero" style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #0F172A 100%)',
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '100px 60px 80px',
        position: 'relative', overflow: 'hidden',
        textAlign: 'center',
      }}>
        {[
          { size: 600, top: '-200px', left: '-150px', opacity: .15 },
          { size: 400, bottom: '-100px', right: '-100px', opacity: .1 },
          { size: 200, top: '30%', right: '15%', opacity: .08 },
        ].map((c, i) => (
          <div key={i} style={{
            position: 'absolute', width: c.size, height: c.size, borderRadius: '50%',
            background: 'radial-gradient(circle, #60A5FA, transparent)',
            top: c.top, bottom: c.bottom, left: c.left, right: c.right,
            opacity: c.opacity, pointerEvents: 'none',
          }} />
        ))}

        <div style={{
          background: 'rgba(96,165,250,.15)', border: '1px solid rgba(96,165,250,.3)',
          borderRadius: '50px', padding: '6px 18px', marginBottom: '24px',
          display: 'inline-flex', alignItems: 'center', gap: '8px',
        }}>
          <span style={{ fontSize: '14px' }}>🤖</span>
          <span style={{ fontSize: '13px', color: '#60A5FA', fontWeight: '500' }}>
            Propulsé par l'Intelligence Artificielle
          </span>
        </div>

        <h1 style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: '64px', fontWeight: '800', color: '#fff',
          lineHeight: '1.1', marginBottom: '24px', maxWidth: '800px',
        }}>
          Trouvez les{' '}
          <span style={{
            background: 'linear-gradient(135deg, #60A5FA, #A78BFA)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            meilleurs talents
          </span>
          {' '}en Tunisie
        </h1>

        <p style={{
          fontSize: '18px', color: '#94A3B8', lineHeight: '1.7',
          maxWidth: '560px', marginBottom: '40px',
        }}>
          SmartRecruit connecte les entreprises aux meilleurs candidats grâce à l'IA. Recrutez plus vite, mieux et plus intelligemment.
        </p>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '56px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={() => navigate('/register')} style={{
            height: '52px', padding: '0 32px', borderRadius: '50px', border: 'none',
            background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
            color: '#fff', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
            fontSize: '16px', fontWeight: '600',
            boxShadow: '0 8px 24px rgba(37,99,235,.4)',
          }}>
            Je cherche un emploi →
          </button>
          <button onClick={() => navigate('/register')} style={{
            height: '52px', padding: '0 32px', borderRadius: '50px',
            border: '1.5px solid rgba(255,255,255,.2)', background: 'transparent',
            color: '#fff', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
            fontSize: '16px', fontWeight: '500',
          }}>
            Je recrute des talents
          </button>
        </div>

        <div style={{
          background: '#fff', borderRadius: '16px', padding: '8px',
          display: 'flex', gap: '8px', width: '100%', maxWidth: '640px',
          boxShadow: '0 20px 48px rgba(0,0,0,.3)',
        }}>
          <input
            placeholder="🔍 Rechercher un poste, une entreprise..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, height: '48px', padding: '0 16px',
              border: 'none', outline: 'none', borderRadius: '12px',
              fontFamily: 'DM Sans, sans-serif', fontSize: '15px',
              background: '#F8FAFC', color: '#1E293B',
            }}
          />
          <button
            onClick={() => scrollTo('offres')}
            style={{
              height: '48px', padding: '0 24px', borderRadius: '12px', border: 'none',
              background: '#1E3A8A', color: '#fff', cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: '500',
            }}
          >
            Rechercher
          </button>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ fontSize: '13px', color: '#64748B' }}>Populaire :</span>
          {['React', 'Python', 'Data Science', 'DevOps', 'UI/UX'].map(t => (
            <button key={t} onClick={() => { setSearch(t); scrollTo('offres'); }} style={{
              padding: '4px 12px', borderRadius: '50px',
              border: '1px solid rgba(255,255,255,.15)',
              background: 'rgba(255,255,255,.08)', color: '#94A3B8',
              cursor: 'pointer', fontSize: '13px', fontFamily: 'DM Sans, sans-serif',
            }}>
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section style={{
        background: '#1E3A8A', padding: '60px',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px',
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>{s.icon}</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '36px', fontWeight: '800', color: '#fff', marginBottom: '4px' }}>
              {s.value}
            </div>
            <div style={{ fontSize: '14px', color: '#93C5FD' }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* ===== OFFRES ===== */}
      <section id="offres" style={{ padding: '80px 60px', background: '#F8FAFC' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-block', background: '#DBEAFE', color: '#1E3A8A',
            padding: '6px 16px', borderRadius: '50px', fontSize: '13px',
            fontWeight: '600', marginBottom: '16px',
          }}>
            🔥 Offres récentes
          </div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '40px', fontWeight: '800', color: '#1E293B', marginBottom: '12px' }}>
            Les dernières opportunités
          </h2>
          <p style={{ fontSize: '16px', color: '#94A3B8', maxWidth: '480px', margin: '0 auto' }}>
            Découvrez les offres publiées par les meilleures entreprises de Tunisie
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', maxWidth: '1100px', margin: '0 auto 40px' }}>
          {filteredOffres.map(offre => (
            <div key={offre.id} style={{
              background: '#fff', borderRadius: '16px', padding: '24px',
              border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(15,23,42,.06)',
              cursor: 'pointer', transition: '200ms',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(15,23,42,.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(15,23,42,.06)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: '#DBEAFE', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '22px', flexShrink: 0,
                }}>
                  🏢
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: '#1E293B', fontFamily: 'Syne, sans-serif' }}>
                    {offre.titre}
                  </div>
                  <div style={{ fontSize: '13px', color: '#94A3B8' }}>{offre.entreprise}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                <span style={tagStyle('#DBEAFE', '#1E3A8A')}>{offre.type}</span>
                <span style={tagStyle('#F1F5F9', '#475569')}>📍 {offre.lieu}</span>
                <span style={tagStyle('#F0FDF4', '#059669')}>💰 {offre.salaire}</span>
              </div>
              <button onClick={() => navigate('/login')} style={{
                width: '100%', height: '40px', borderRadius: '50px', border: 'none',
                background: '#1E3A8A', color: '#fff', cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: '500',
              }}>
                Postuler →
              </button>
            </div>
          ))}
        </div>

        {filteredOffres.length === 0 && (
          <div style={{ textAlign: 'center', color: '#94A3B8', padding: '40px' }}>
            Aucune offre trouvée pour "{search}"
          </div>
        )}

        <div style={{ textAlign: 'center' }}>
          <button onClick={() => navigate('/login')} style={{
            height: '48px', padding: '0 32px', borderRadius: '50px',
            border: '2px solid #1E3A8A', background: 'transparent',
            color: '#1E3A8A', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
            fontSize: '15px', fontWeight: '600',
          }}>
            Voir toutes les offres →
          </button>
        </div>
      </section>

      {/* ===== ENTREPRISES ===== */}
      <section id="entreprises" style={{ padding: '80px 60px', background: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-block', background: '#F0FDF4', color: '#059669',
            padding: '6px 16px', borderRadius: '50px', fontSize: '13px',
            fontWeight: '600', marginBottom: '16px',
          }}>
            🏢 Entreprises partenaires
          </div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '40px', fontWeight: '800', color: '#1E293B', marginBottom: '12px' }}>
            Ils recrutent avec SmartRecruit
          </h2>
          <p style={{ fontSize: '16px', color: '#94A3B8', maxWidth: '480px', margin: '0 auto' }}>
            Des entreprises de tous secteurs font confiance à SmartRecruit pour leurs recrutements
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', maxWidth: '1100px', margin: '0 auto 40px' }}>
          {entreprises.map((e, i) => (
            <div key={i} style={{
              background: '#F8FAFC', borderRadius: '16px', padding: '28px',
              border: '1px solid #E2E8F0', textAlign: 'center',
              cursor: 'pointer', transition: '200ms',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,23,42,.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{
                width: '64px', height: '64px', borderRadius: '16px',
                background: '#DBEAFE', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '28px', margin: '0 auto 16px',
              }}>
                {e.logo}
              </div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '17px', fontWeight: '700', color: '#1E293B', marginBottom: '6px' }}>
                {e.nom}
              </div>
              <div style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '12px' }}>{e.secteur}</div>
              <span style={tagStyle('#DBEAFE', '#1E3A8A')}>
                {e.offres} offres actives
              </span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button onClick={() => navigate('/register')} style={{
            height: '48px', padding: '0 32px', borderRadius: '50px', border: 'none',
            background: '#1E3A8A', color: '#fff', cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: '600',
          }}>
            Publier une offre →
          </button>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section style={{ padding: '80px 60px', background: '#F8FAFC' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            display: 'inline-block', background: '#EDE9FE', color: '#7C3AED',
            padding: '6px 16px', borderRadius: '50px', fontSize: '13px',
            fontWeight: '600', marginBottom: '16px',
          }}>
            ✨ Fonctionnalités
          </div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '40px', fontWeight: '800', color: '#1E293B', marginBottom: '12px' }}>
            Pourquoi choisir SmartRecruit ?
          </h2>
          <p style={{ fontSize: '16px', color: '#94A3B8', maxWidth: '480px', margin: '0 auto' }}>
            Des outils puissants pour moderniser votre processus de recrutement
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '1100px', margin: '0 auto' }}>
          {features.map((f, i) => (
            <div key={i} style={{
              padding: '32px', borderRadius: '16px',
              border: '1px solid #E2E8F0', background: '#fff', transition: '200ms',
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,23,42,.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{
                width: '56px', height: '56px', borderRadius: '14px',
                background: '#EFF6FF', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '26px', marginBottom: '16px',
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '17px', fontWeight: '700', color: '#1E293B', marginBottom: '10px' }}>
                {f.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.7' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== COMMENT ÇA MARCHE ===== */}
      <section style={{ padding: '80px 60px', background: 'linear-gradient(135deg, #0F172A, #1E3A8A)' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '40px', fontWeight: '800', color: '#fff', marginBottom: '12px' }}>
            Comment ça marche ?
          </h2>
          <p style={{ fontSize: '16px', color: '#94A3B8' }}>3 étapes simples pour commencer</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', maxWidth: '900px', margin: '0 auto' }}>
          {[
            { step: '01', icon: '📝', title: 'Créez votre profil',   desc: 'Inscrivez-vous en quelques minutes et complétez votre profil candidat ou recruteur.' },
            { step: '02', icon: '🔍', title: 'Trouvez des offres',   desc: 'Parcourez les offres filtrées selon vos critères ou publiez votre propre offre.' },
            { step: '03', icon: '🚀', title: 'Postulez ou recrutez', desc: 'Envoyez votre candidature ou recevez les meilleures candidatures scorées par l\'IA.' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%',
                background: 'rgba(96,165,250,.15)', border: '2px solid rgba(96,165,250,.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '28px', margin: '0 auto 16px',
              }}>
                {s.icon}
              </div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '13px', color: '#60A5FA', fontWeight: '700', marginBottom: '8px', letterSpacing: '.1em' }}>
                ÉTAPE {s.step}
              </div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '10px' }}>
                {s.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: '1.7' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TÉMOIGNAGES ===== */}
      <section style={{ padding: '80px 60px', background: '#F8FAFC' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-block', background: '#FEF3C7', color: '#D97706',
            padding: '6px 16px', borderRadius: '50px', fontSize: '13px',
            fontWeight: '600', marginBottom: '16px',
          }}>
            ⭐ Témoignages
          </div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '40px', fontWeight: '800', color: '#1E293B' }}>
            Ils nous font confiance
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '1100px', margin: '0 auto' }}>
          {temoignages.map((t, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: '16px', padding: '28px',
              border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(15,23,42,.06)',
            }}>
              <div style={{ fontSize: '40px', color: '#DBEAFE', marginBottom: '12px', lineHeight: 1 }}>"</div>
              <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.7', marginBottom: '20px' }}>{t.texte}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  background: '#1E3A8A', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: '#fff',
                  fontWeight: '800', fontSize: '18px', fontFamily: 'Syne, sans-serif',
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#1E293B' }}>{t.nom}</div>
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>{t.poste}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== À PROPOS ===== */}
      <section id="apropos" style={{ padding: '80px 60px', background: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            display: 'inline-block', background: '#DBEAFE', color: '#1E3A8A',
            padding: '6px 16px', borderRadius: '50px', fontSize: '13px',
            fontWeight: '600', marginBottom: '16px',
          }}>
            🏢 À propos
          </div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '40px', fontWeight: '800', color: '#1E293B', marginBottom: '12px' }}>
            Notre mission
          </h2>
          <p style={{ fontSize: '16px', color: '#94A3B8', maxWidth: '600px', margin: '0 auto', lineHeight: '1.7' }}>
            SmartRecruit est né d'une vision simple : rendre le recrutement plus intelligent, plus rapide et plus humain grâce à la technologie et l'intelligence artificielle.
          </p>
        </div>

        {/* Mission + Vision */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', maxWidth: '900px', margin: '0 auto 60px' }}>
          {[
            {
              icon: '🎯', title: 'Notre Mission',
              desc: 'Connecter les meilleurs talents aux meilleures entreprises de Tunisie en utilisant l\'intelligence artificielle pour optimiser chaque étape du recrutement.',
              bg: '#EFF6FF', color: '#1E3A8A',
            },
            {
              icon: '🌟', title: 'Notre Vision',
              desc: 'Devenir la plateforme de référence du recrutement en Afrique du Nord, en proposant des outils innovants qui transforment l\'expérience RH.',
              bg: '#EDE9FE', color: '#7C3AED',
            },
          ].map((v, i) => (
            <div key={i} style={{
              background: v.bg, borderRadius: '16px', padding: '32px',
              border: `1px solid ${v.color}20`,
            }}>
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>{v.icon}</div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '20px', fontWeight: '700', color: v.color, marginBottom: '12px' }}>
                {v.title}
              </h3>
              <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.7' }}>{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Valeurs */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '28px', fontWeight: '700', color: '#1E293B' }}>
            Nos valeurs
          </h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', maxWidth: '1100px', margin: '0 auto 60px' }}>
          {[
            { icon: '🤝', title: 'Confiance',     desc: 'Transparence totale avec nos utilisateurs' },
            { icon: '💡', title: 'Innovation',    desc: 'Toujours à la pointe de la technologie' },
            { icon: '⚡', title: 'Efficacité',    desc: 'Des résultats rapides et de qualité' },
            { icon: '❤️', title: 'Humanité',      desc: 'Le facteur humain au centre de tout' },
          ].map((v, i) => (
            <div key={i} style={{
              background: '#F8FAFC', borderRadius: '14px', padding: '24px',
              border: '1px solid #E2E8F0', textAlign: 'center',
            }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{v.icon}</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '16px', fontWeight: '700', color: '#1E293B', marginBottom: '8px' }}>
                {v.title}
              </div>
              <div style={{ fontSize: '13px', color: '#94A3B8', lineHeight: '1.6' }}>{v.desc}</div>
            </div>
          ))}
        </div>

        {/* Équipe */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '28px', fontWeight: '700', color: '#1E293B' }}>
            Notre équipe
          </h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '700px', margin: '0 auto' }}>
          {equipe.map((m, i) => (
            <div key={i} style={{
              background: '#F8FAFC', borderRadius: '16px', padding: '28px',
              border: '1px solid #E2E8F0', textAlign: 'center',
            }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: '#1E3A8A', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: '#fff',
                fontWeight: '800', fontSize: '24px', fontFamily: 'Syne, sans-serif',
                margin: '0 auto 16px',
              }}>
                {m.avatar}
              </div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '16px', fontWeight: '700', color: '#1E293B', marginBottom: '4px' }}>
                {m.nom}
              </div>
              <div style={{ fontSize: '13px', color: '#2563EB', fontWeight: '500', marginBottom: '8px' }}>{m.poste}</div>
              <div style={{ fontSize: '12px', color: '#94A3B8' }}>{m.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{
        padding: '80px 60px', textAlign: 'center',
        background: 'linear-gradient(135deg, #1E3A8A, #7C3AED)',
      }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '44px', fontWeight: '800', color: '#fff', marginBottom: '16px' }}>
          Prêt à transformer votre recrutement ?
        </h2>
        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,.7)', marginBottom: '40px' }}>
          Rejoignez des centaines d'entreprises qui font confiance à SmartRecruit
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/register')} style={{
            height: '54px', padding: '0 36px', borderRadius: '50px', border: 'none',
            background: '#fff', color: '#1E3A8A', cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif', fontSize: '16px', fontWeight: '700',
            boxShadow: '0 8px 24px rgba(0,0,0,.2)',
          }}>
            Commencer gratuitement →
          </button>
          <button onClick={() => scrollTo('contact')} style={{
            height: '54px', padding: '0 36px', borderRadius: '50px',
            border: '2px solid rgba(255,255,255,.4)', background: 'transparent',
            color: '#fff', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
            fontSize: '16px', fontWeight: '500',
          }}>
            Nous contacter
          </button>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" style={{ padding: '80px 60px', background: '#F8FAFC' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            display: 'inline-block', background: '#F0FDF4', color: '#059669',
            padding: '6px 16px', borderRadius: '50px', fontSize: '13px',
            fontWeight: '600', marginBottom: '16px',
          }}>
            📬 Contact
          </div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '40px', fontWeight: '800', color: '#1E293B', marginBottom: '12px' }}>
            Contactez-nous
          </h2>
          <p style={{ fontSize: '16px', color: '#94A3B8', maxWidth: '480px', margin: '0 auto' }}>
            Une question ? Une suggestion ? Notre équipe est là pour vous répondre
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '40px', maxWidth: '1000px', margin: '0 auto' }}>

          {/* Infos contact */}
          <div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '20px', fontWeight: '700', color: '#1E293B', marginBottom: '24px' }}>
              Nos coordonnées
            </h3>

            {[
              { icon: '📧', label: 'Email',      value: 'contact@smartrecruit.tn',    sub: 'Réponse sous 24h' },
              { icon: '📞', label: 'Téléphone',  value: '+216 71 XXX XXX',            sub: 'Lun-Ven 8h-17h' },
              { icon: '📍', label: 'Adresse',    value: 'Tunis, Tunisie',             sub: 'Centre ville' },
              { icon: '🕐', label: 'Horaires',   value: 'Lundi - Vendredi',           sub: '8h00 - 17h00' },
            ].map((c, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '16px',
                padding: '16px', borderRadius: '12px', marginBottom: '12px',
                background: '#fff', border: '1px solid #E2E8F0',
              }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '10px',
                  background: '#EFF6FF', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '20px', flexShrink: 0,
                }}>
                  {c.icon}
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '2px' }}>{c.label}</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#1E293B' }}>{c.value}</div>
                  <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>{c.sub}</div>
                </div>
              </div>
            ))}

            {/* Réseaux */}
            <div style={{ marginTop: '20px' }}>
              <div style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '12px', fontWeight: '500' }}>
                Suivez-nous
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {[
                  { label: 'LinkedIn', icon: '💼', color: '#0A66C2' },
                  { label: 'Twitter',  icon: '🐦', color: '#1DA1F2' },
                  { label: 'Facebook', icon: '📘', color: '#1877F2' },
                ].map(s => (
                  <div key={s.label} style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '8px 14px', borderRadius: '8px',
                    background: '#fff', border: '1px solid #E2E8F0',
                    cursor: 'pointer', fontSize: '13px', color: '#475569',
                  }}>
                    {s.icon} {s.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div style={{
            background: '#fff', borderRadius: '16px', padding: '32px',
            border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(15,23,42,.06)',
          }}>
            {contactSent ? (
              <div style={{
                textAlign: 'center', padding: '40px 20px',
              }}>
                <div style={{ fontSize: '56px', marginBottom: '16px' }}>✅</div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '22px', fontWeight: '700', color: '#059669', marginBottom: '10px' }}>
                  Message envoyé !
                </h3>
                <p style={{ fontSize: '15px', color: '#94A3B8' }}>
                  Merci pour votre message. Notre équipe vous répondra sous 24h.
                </p>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '20px', fontWeight: '700', color: '#1E293B', marginBottom: '24px' }}>
                  Envoyez-nous un message
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={labelStyle}>Nom complet *</label>
                    <input
                      type="text" placeholder="Votre nom"
                      value={contactForm.nom} onChange={setContact('nom')}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input
                      type="email" placeholder="email@mail.com"
                      value={contactForm.email} onChange={setContact('email')}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Sujet</label>
                  <select value={contactForm.sujet} onChange={setContact('sujet')} style={inputStyle}>
                    <option value="">Sélectionner un sujet</option>
                    <option>Support technique</option>
                    <option>Partenariat entreprise</option>
                    <option>Information générale</option>
                    <option>Signalement d'un problème</option>
                    <option>Autre</option>
                  </select>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={labelStyle}>Message *</label>
                  <textarea
                    placeholder="Décrivez votre demande..."
                    value={contactForm.message} onChange={setContact('message')}
                    rows={5}
                    style={{ ...inputStyle, height: 'auto', padding: '12px 14px', resize: 'vertical' }}
                  />
                </div>

                <button onClick={handleContact} style={{
                  width: '100%', height: '48px', borderRadius: '50px', border: 'none',
                  background: '#1E3A8A', color: '#fff', cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: '500',
                  boxShadow: '0 4px 16px rgba(30,58,138,.25)',
                }}>
                  Envoyer le message →
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ background: '#0F172A', padding: '60px', borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '40px', marginBottom: '48px' }}>
          <div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '22px', fontWeight: '800', color: '#fff', marginBottom: '16px' }}>
              Smart<span style={{ color: '#60A5FA' }}>Recruit</span>
            </div>
            <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.7', maxWidth: '280px' }}>
              La plateforme de recrutement intelligente qui connecte les talents aux meilleures entreprises de Tunisie.
            </p>
          </div>

          {[
            { title: 'Candidats',    links: ['Rechercher un emploi', 'Créer un profil', 'Mes candidatures'] },
            { title: 'Recruteurs',   links: ['Publier une offre', 'Rechercher des talents', 'Dashboard RH'] },
            { title: 'SmartRecruit', links: ['À propos', 'Contact', 'CGU', 'Confidentialité'] },
          ].map((col, i) => (
            <div key={i}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '14px', fontWeight: '700', color: '#fff', marginBottom: '16px' }}>
                {col.title}
              </div>
              {col.links.map(l => (
                <div key={l} style={{
                  fontSize: '13px', color: '#64748B', marginBottom: '10px',
                  cursor: 'pointer',
                }}
                  onClick={() => {
                    if (l === 'À propos') scrollTo('apropos');
                    if (l === 'Contact') scrollTo('contact');
                    if (l === 'Rechercher un emploi') scrollTo('offres');
                  }}
                >
                  {l}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,.06)',
          paddingTop: '24px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: '13px', color: '#475569' }}>
            © 2026 SmartRecruit. Tous droits réservés.
          </span>
          <span style={{ fontSize: '13px', color: '#475569' }}>
            Fait avec ❤️ en Tunisie 🇹🇳
          </span>
        </div>
      </footer>
    </div>
  );
}

const tagStyle = (bg, color) => ({
  background: bg, color,
  padding: '4px 10px', borderRadius: '50px',
  fontSize: '12px', fontWeight: '500',
  display: 'inline-block',
});

const labelStyle = {
  fontSize: '13px', fontWeight: '500', color: '#475569',
  display: 'block', marginBottom: '6px',
};

const inputStyle = {
  width: '100%', height: '42px', padding: '0 14px',
  border: '1.5px solid #E2E8F0', borderRadius: '10px',
  fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
  outline: 'none', boxSizing: 'border-box', background: '#F8FAFC',
};
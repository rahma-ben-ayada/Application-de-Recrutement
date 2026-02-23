import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const offresRecentes = [
  { id: 1, titre: 'Développeur React Senior', entreprise: 'Tech Corp',    lieu: 'Tunis',  type: 'CDI',   salaire: '2500 - 3500 TND' },
  { id: 2, titre: 'Data Scientist',           entreprise: 'StartUp RH',  lieu: 'Remote', type: 'CDD',   salaire: '3000 - 4000 TND' },
  { id: 3, titre: 'UX/UI Designer',           entreprise: 'Big Finance',  lieu: 'Sfax',   type: 'Stage', salaire: '800 - 1200 TND'  },
  { id: 4, titre: 'Chef de projet IT',        entreprise: 'Dev Studio',   lieu: 'Tunis',  type: 'CDI',   salaire: '3500 - 4500 TND' },
  { id: 5, titre: 'Développeur Java',         entreprise: 'Big Finance',  lieu: 'Sousse', type: 'CDI',   salaire: '2800 - 3800 TND' },
  { id: 6, titre: 'DevOps Engineer',          entreprise: 'Cloud Corp',   lieu: 'Remote', type: 'CDI',   salaire: '4000 - 5000 TND' },
];

const stats = [
  { value: '12k+', label: 'Candidats actifs',  icon: '👤' },
  { value: '340+', label: 'Entreprises',        icon: '🏢' },
  { value: '1.2k+',label: 'Offres publiées',   icon: '📋' },
  { value: '98%',  label: 'Taux satisfaction', icon: '⭐' },
];

const features = [
  { icon: '🤖', title: 'Score IA Intelligent',    desc: 'Notre IA analyse et score chaque candidat automatiquement selon des critères pondérés.' },
  { icon: '📊', title: 'Dashboard Power BI',       desc: 'Visualisez vos données RH en temps réel grâce à des tableaux de bord interactifs.' },
  { icon: '🎯', title: 'Matching Automatique',     desc: 'Trouvez les meilleurs candidats pour chaque offre grâce au matching intelligent.' },
  { icon: '📅', title: 'Gestion des entretiens',  desc: 'Planifiez vos entretiens avec intégration Google Meet et Zoom.' },
  { icon: '📄', title: 'CV & Profil complet',      desc: 'Les candidats créent un profil complet avec CV, compétences et expériences.' },
  { icon: '🔒', title: 'Sécurisé & Fiable',       desc: 'Vos données sont protégées avec les dernières technologies de sécurité.' },
];

const temoignages = [
  { nom: 'Sarah Ben Ali',    poste: 'DRH, Tech Corp',        avatar: 'S', texte: 'SmartRecruit a révolutionné notre processus de recrutement. Le score IA nous fait gagner un temps précieux.' },
  { nom: 'Karim Mansouri',   poste: 'CEO, StartUp RH',       avatar: 'K', texte: 'Interface intuitive et fonctionnalités puissantes. Nous avons réduit notre temps de recrutement de 60%.' },
  { nom: 'Lina Cherif',      poste: 'Candidat recruté',      avatar: 'L', texte: 'J\'ai trouvé mon poste en 2 semaines ! La plateforme est simple et efficace.' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredOffres = offresRecentes.filter(o =>
    o.titre.toLowerCase().includes(search.toLowerCase()) ||
    o.entreprise.toLowerCase().includes(search.toLowerCase()) ||
    o.lieu.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: 'DM Sans, sans-serif', background: '#fff', overflowX: 'hidden' }}>

      {/* ===== NAVBAR ===== */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(15,23,42,.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,.08)',
        padding: '0 60px', height: '68px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <div style={{
          fontFamily: 'Syne, sans-serif', fontSize: '22px',
          fontWeight: '800', color: '#fff', cursor: 'pointer',
        }} onClick={() => navigate('/')}>
          Smart<span style={{ color: '#60A5FA' }}>Recruit</span>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {['Offres', 'Entreprises', 'À propos', 'Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              color: '#94A3B8', fontSize: '14px', fontWeight: '500',
              textDecoration: 'none', transition: '150ms',
            }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = '#94A3B8'}
            >
              {l}
            </a>
          ))}
        </div>

        {/* Boutons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => navigate('/login')}
            style={{
              height: '40px', padding: '0 20px', borderRadius: '50px',
              border: '1.5px solid rgba(255,255,255,.2)', background: 'transparent',
              color: '#fff', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
              fontSize: '14px', fontWeight: '500', transition: '150ms',
            }}
          >
            Se connecter
          </button>
          <button
            onClick={() => navigate('/register')}
            style={{
              height: '40px', padding: '0 20px', borderRadius: '50px',
              border: 'none', background: '#2563EB',
              color: '#fff', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
              fontSize: '14px', fontWeight: '500',
              boxShadow: '0 4px 12px rgba(37,99,235,.4)',
            }}
          >
            S'inscrire gratuitement
          </button>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #0F172A 100%)',
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '100px 60px 80px',
        position: 'relative', overflow: 'hidden',
        textAlign: 'center',
      }}>
        {/* Cercles décoratifs */}
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

        {/* Badge */}
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

        {/* Titre */}
        <h1 style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: '64px', fontWeight: '800', color: '#fff',
          lineHeight: '1.1', marginBottom: '24px',
          maxWidth: '800px',
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

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '56px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => navigate('/register')}
            style={{
              height: '52px', padding: '0 32px', borderRadius: '50px', border: 'none',
              background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
              color: '#fff', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
              fontSize: '16px', fontWeight: '600',
              boxShadow: '0 8px 24px rgba(37,99,235,.4)',
            }}
          >
            Je cherche un emploi →
          </button>
          <button
            onClick={() => navigate('/register')}
            style={{
              height: '52px', padding: '0 32px', borderRadius: '50px',
              border: '1.5px solid rgba(255,255,255,.2)', background: 'transparent',
              color: '#fff', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
              fontSize: '16px', fontWeight: '500',
            }}
          >
            Je recrute des talents
          </button>
        </div>

        {/* Barre de recherche */}
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
          <button style={{
            height: '48px', padding: '0 24px', borderRadius: '12px', border: 'none',
            background: '#1E3A8A', color: '#fff', cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: '500',
          }}>
            Rechercher
          </button>
        </div>

        {/* Tags populaires */}
        <div style={{ marginTop: '20px', display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ fontSize: '13px', color: '#64748B' }}>Populaire :</span>
          {['React', 'Python', 'Data Science', 'DevOps', 'UI/UX'].map(t => (
            <button
              key={t}
              onClick={() => setSearch(t)}
              style={{
                padding: '4px 12px', borderRadius: '50px',
                border: '1px solid rgba(255,255,255,.15)',
                background: 'rgba(255,255,255,.08)', color: '#94A3B8',
                cursor: 'pointer', fontSize: '13px', fontFamily: 'DM Sans, sans-serif',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section style={{
        background: '#1E3A8A',
        padding: '60px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '40px',
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>{s.icon}</div>
            <div style={{
              fontFamily: 'Syne, sans-serif', fontSize: '36px',
              fontWeight: '800', color: '#fff', marginBottom: '4px',
            }}>
              {s.value}
            </div>
            <div style={{ fontSize: '14px', color: '#93C5FD' }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* ===== OFFRES RÉCENTES ===== */}
      <section id="offres" style={{ padding: '80px 60px', background: '#F8FAFC' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-block', background: '#DBEAFE', color: '#1E3A8A',
            padding: '6px 16px', borderRadius: '50px', fontSize: '13px',
            fontWeight: '600', marginBottom: '16px',
          }}>
            🔥 Offres récentes
          </div>
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontSize: '40px',
            fontWeight: '800', color: '#1E293B', marginBottom: '12px',
          }}>
            Les dernières opportunités
          </h2>
          <p style={{ fontSize: '16px', color: '#94A3B8', maxWidth: '480px', margin: '0 auto' }}>
            Découvrez les offres d'emploi publiées par les meilleures entreprises de Tunisie
          </p>
        </div>

        {/* Grille offres */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px', maxWidth: '1100px', margin: '0 auto 40px',
        }}>
          {filteredOffres.map(offre => (
            <div
              key={offre.id}
              style={{
                background: '#fff', borderRadius: '16px', padding: '24px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 16px rgba(15,23,42,.06)',
                cursor: 'pointer', transition: '200ms',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(15,23,42,.12)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(15,23,42,.06)';
              }}
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

              <button
                onClick={() => navigate('/login')}
                style={{
                  width: '100%', height: '40px', borderRadius: '50px', border: 'none',
                  background: '#1E3A8A', color: '#fff', cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: '500',
                }}
              >
                Postuler →
              </button>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => navigate('/login')}
            style={{
              height: '48px', padding: '0 32px', borderRadius: '50px',
              border: '2px solid #1E3A8A', background: 'transparent',
              color: '#1E3A8A', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
              fontSize: '15px', fontWeight: '600',
            }}
          >
            Voir toutes les offres →
          </button>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section style={{ padding: '80px 60px', background: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            display: 'inline-block', background: '#EDE9FE', color: '#7C3AED',
            padding: '6px 16px', borderRadius: '50px', fontSize: '13px',
            fontWeight: '600', marginBottom: '16px',
          }}>
            ✨ Fonctionnalités
          </div>
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontSize: '40px',
            fontWeight: '800', color: '#1E293B', marginBottom: '12px',
          }}>
            Pourquoi choisir SmartRecruit ?
          </h2>
          <p style={{ fontSize: '16px', color: '#94A3B8', maxWidth: '480px', margin: '0 auto' }}>
            Des outils puissants pour moderniser votre processus de recrutement
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px', maxWidth: '1100px', margin: '0 auto',
        }}>
          {features.map((f, i) => (
            <div key={i} style={{
              padding: '32px', borderRadius: '16px',
              border: '1px solid #E2E8F0', background: '#F8FAFC',
              transition: '200ms',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,23,42,.08)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#F8FAFC';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: '56px', height: '56px', borderRadius: '14px',
                background: '#EFF6FF', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '26px', marginBottom: '16px',
              }}>
                {f.icon}
              </div>
              <h3 style={{
                fontFamily: 'Syne, sans-serif', fontSize: '17px',
                fontWeight: '700', color: '#1E293B', marginBottom: '10px',
              }}>
                {f.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.7' }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== COMMENT ÇA MARCHE ===== */}
      <section style={{
        padding: '80px 60px',
        background: 'linear-gradient(135deg, #0F172A, #1E3A8A)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontSize: '40px',
            fontWeight: '800', color: '#fff', marginBottom: '12px',
          }}>
            Comment ça marche ?
          </h2>
          <p style={{ fontSize: '16px', color: '#94A3B8' }}>
            3 étapes simples pour commencer
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '32px', maxWidth: '900px', margin: '0 auto',
        }}>
          {[
            { step: '01', icon: '📝', title: 'Créez votre profil',    desc: 'Inscrivez-vous en quelques minutes et complétez votre profil candidat ou recruteur.' },
            { step: '02', icon: '🔍', title: 'Trouvez des offres',    desc: 'Parcourez les offres filtrées selon vos critères ou publiez votre propre offre.' },
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
              <div style={{
                fontFamily: 'Syne, sans-serif', fontSize: '13px',
                color: '#60A5FA', fontWeight: '700', marginBottom: '8px',
                letterSpacing: '.1em',
              }}>
                ÉTAPE {s.step}
              </div>
              <h3 style={{
                fontFamily: 'Syne, sans-serif', fontSize: '18px',
                fontWeight: '700', color: '#fff', marginBottom: '10px',
              }}>
                {s.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: '1.7' }}>
                {s.desc}
              </p>
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
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontSize: '40px',
            fontWeight: '800', color: '#1E293B',
          }}>
            Ils nous font confiance
          </h2>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px', maxWidth: '1100px', margin: '0 auto',
        }}>
          {temoignages.map((t, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: '16px', padding: '28px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 16px rgba(15,23,42,.06)',
            }}>
              <div style={{ fontSize: '32px', color: '#DBEAFE', marginBottom: '16px' }}>"</div>
              <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.7', marginBottom: '20px' }}>
                {t.texte}
              </p>
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

      {/* ===== CTA FINAL ===== */}
      <section style={{
        padding: '80px 60px', textAlign: 'center',
        background: 'linear-gradient(135deg, #1E3A8A, #7C3AED)',
      }}>
        <h2 style={{
          fontFamily: 'Syne, sans-serif', fontSize: '44px',
          fontWeight: '800', color: '#fff', marginBottom: '16px',
        }}>
          Prêt à transformer votre recrutement ?
        </h2>
        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,.7)', marginBottom: '40px' }}>
          Rejoignez des centaines d'entreprises qui font confiance à SmartRecruit
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/register')}
            style={{
              height: '54px', padding: '0 36px', borderRadius: '50px', border: 'none',
              background: '#fff', color: '#1E3A8A', cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif', fontSize: '16px', fontWeight: '700',
              boxShadow: '0 8px 24px rgba(0,0,0,.2)',
            }}
          >
            Commencer gratuitement →
          </button>
          <button
            onClick={() => navigate('/login')}
            style={{
              height: '54px', padding: '0 36px', borderRadius: '50px',
              border: '2px solid rgba(255,255,255,.4)', background: 'transparent',
              color: '#fff', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
              fontSize: '16px', fontWeight: '500',
            }}
          >
            Se connecter
          </button>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{
        background: '#0F172A', padding: '60px',
        borderTop: '1px solid rgba(255,255,255,.06)',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '40px', marginBottom: '48px',
        }}>
          {/* Logo + desc */}
          <div>
            <div style={{
              fontFamily: 'Syne, sans-serif', fontSize: '22px',
              fontWeight: '800', color: '#fff', marginBottom: '16px',
            }}>
              Smart<span style={{ color: '#60A5FA' }}>Recruit</span>
            </div>
            <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.7', maxWidth: '280px' }}>
              La plateforme de recrutement intelligente qui connecte les talents aux meilleures entreprises de Tunisie.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              {['LinkedIn', 'Twitter', 'Facebook'].map(s => (
                <div key={s} style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  background: 'rgba(255,255,255,.08)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', fontSize: '14px',
                }}>
                  {s === 'LinkedIn' ? '💼' : s === 'Twitter' ? '🐦' : '📘'}
                </div>
              ))}
            </div>
          </div>

          {/* Liens */}
          {[
            {
              title: 'Candidats',
              links: ['Rechercher un emploi', 'Créer un profil', 'Mes candidatures', 'Alertes emploi'],
            },
            {
              title: 'Recruteurs',
              links: ['Publier une offre', 'Rechercher des talents', 'Dashboard RH', 'Score IA'],
            },
            {
              title: 'SmartRecruit',
              links: ['À propos', 'Contact', 'CGU', 'Politique de confidentialité'],
            },
          ].map((col, i) => (
            <div key={i}>
              <div style={{
                fontFamily: 'Syne, sans-serif', fontSize: '14px',
                fontWeight: '700', color: '#fff', marginBottom: '16px',
              }}>
                {col.title}
              </div>
              {col.links.map(l => (
                <div key={l} style={{
                  fontSize: '13px', color: '#64748B', marginBottom: '10px',
                  cursor: 'pointer', transition: '150ms',
                }}
                  onMouseEnter={e => e.target.style.color = '#94A3B8'}
                  onMouseLeave={e => e.target.style.color = '#64748B'}
                >
                  {l}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom */}
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
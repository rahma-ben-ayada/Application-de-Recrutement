import React from 'react';
import RecruteurLayout from '../../layouts/RecruteurLayout';

export default function ScoreIntelligent() {
  return (
    <RecruteurLayout title="Score Intelligent">
      <div style={{
        background: '#fff', borderRadius: '12px', padding: '60px 40px',
        border: '1px solid #E2E8F0', textAlign: 'center',
        boxShadow: '0 4px 16px rgba(15,23,42,.06)',
      }}>
        <div style={{ fontSize: '56px', marginBottom: '20px' }}>🤖</div>
        <h2 style={{
          fontFamily: 'Syne, sans-serif', fontSize: '24px',
          fontWeight: '800', color: '#1E293B', marginBottom: '12px',
        }}>
          Score Intelligent — En cours de développement
        </h2>
        <p style={{ color: '#94A3B8', fontSize: '15px', maxWidth: '480px', margin: '0 auto 32px', lineHeight: '1.7' }}>
          Le moteur de scoring IA analysera automatiquement les candidats selon des critères pondérés et calculera un score de pertinence pour chaque offre.
        </p>

        {/* Aperçu des fonctionnalités à venir */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px', maxWidth: '600px', margin: '0 auto',
        }}>
          {[
            { icon: '📊', label: 'Critères pondérés',    desc: 'Définissez l\'importance de chaque critère' },
            { icon: '🎯', label: 'Score automatique',    desc: 'Calcul ML en temps réel' },
            { icon: '🏆', label: 'Classement candidats', desc: 'Top candidats par offre' },
          ].map((f, i) => (
            <div key={i} style={{
              background: '#F8FAFC', borderRadius: '12px', padding: '20px 16px',
              border: '2px dashed #E2E8F0',
            }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{f.icon}</div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>
                {f.label}
              </div>
              <div style={{ fontSize: '12px', color: '#94A3B8' }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '32px', background: '#EDE9FE', borderRadius: '10px',
          padding: '12px 24px', display: 'inline-block',
          fontSize: '13px', color: '#7C3AED', fontWeight: '500',
        }}>
          ⏳ Disponible après intégration du modèle Machine Learning
        </div>
      </div>
    </RecruteurLayout>
  );
}
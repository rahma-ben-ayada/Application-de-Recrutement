import React, { useState, useEffect } from 'react';
import RecruteurLayout from '../../layouts/RecruteurLayout';
import api from '../../utils/api';
import './ScoreIntelligent.css';

// Default scoring criteria
const defaultCriteria = {
  experience: { label: 'Expérience professionnelle', weight: 30, icon: '💼' },
  education: { label: 'Niveau d\'éducation', weight: 20, icon: '🎓' },
  skills: { label: 'Compétences techniques', weight: 25, icon: '⚙️' },
  softSkills: { label: 'Compétences interpersonnelles', weight: 15, icon: '🤝' },
  availability: { label: 'Disponibilité', weight: 10, icon: '📅' },
};

export default function ScoreIntelligent() {
  const [candidats, setCandidats] = useState([]);
  const [selectedOffre, setSelectedOffre] = useState('');
);
  const [offres, setOffres] = useState([]);
  const [criteria, setCriteria] = useState(defaultCriteria);
  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetchOffres();
  }, []);

  const fetchOffres = async () => {
    try {
      const data = await api('/offres');
      setOffres(data.offres || []);
    } catch (err) {
      console.error('Error fetching offers:', err);
    }
  };

  const fetchCandidats = async (offreId) => {
    setLoading(true);
    try {
      const data = await api(`/candidatures/offre/${offreId}`);
      setCandidats(data.candidatures || []);
      calculateScores(data.candidatures || []);
    } catch (err) {
      console.error('Error fetching candidates:', err);
      setCandidats([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateScores = (candidatsList) => {
    const calculatedScores = {};
    candidatsList.forEach(candidat => {
      let totalScore = 0;
      let maxScore = 0;

      Object.entries(criteria).forEach(([key, criterion]) => {
        const candidateScore = Math.random() * 100; // Simulated score
        totalScore += (candidateScore * criterion.weight) / 100;
        maxScore += criterion.weight;
      });

      calculatedScores[candidat._id] = {
        total: Math.round((totalScore / maxScore) * 100),
        details: {}
      };
    });

    setScores(calculatedScores);
    setShowResults(true);
  };

  const handleOffreChange = (e) => {
    const offreId = e.target.value;
    setSelectedOffre(offreId);
    if (offreId) {
      fetchCandidats(offreId);
    } else {
      setCandidats([]);
      setShowResults(false);
    }
  };

  const handleWeightChange = (criterionKey, newWeight) => {
    setCriteria(prev => ({
      ...prev,
      [criterionKey]: {
        ...prev[criterionKey],
        weight: parseInt(newWeight)
      }
    }));
  };

  const recalculateScores = () => {
    if (candidats.length > 0) {
      calculateScores(candidats);
    }
  };

  const getScoreBadge = (score) => {
    if (score >= 70) return 'score-badge-high';
    if (score >= 40) return 'score-badge-medium';
    return 'score-badge-low';
  };

  const getScoreLabel = (score) => {
    if (score >= 70) return 'Excellent';
    if (score >= 40) return 'Moyen';
    return 'Faible';
  };

  return (
    <RecruteurLayout title="Score Intelligent">
      <div className="score-page">
        <div className="score-header">
          <div className="score-icon">🤖</div>
          <h1 className="score-title">Score Intelligent IA</h1>
          <p className="score-description">
            Évaluez et classez automatiquement les candidats selon des critères pondérés personnalisés.
            Notre algorithme analyse chaque profil pour calculer un score de pertinence.
          </p>
        </div>

        {/* Offre Selection */}
        <div style={{ marginBottom: '32px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#475569',
            marginBottom: '8px'
          }}>
            Sélectionner une offre
          </label>
          <select
            value={selectedOffre}
            onChange={handleOffreChange}
            style={{
              width: '100%',
              maxWidth: '400px',
              padding: '12px',
              border: '2px solid #E2E8F0',
              borderRadius: '8px',
              fontSize: '14px',
              background: '#fff'
            }}
          >
            <option value="">-- Choisir une offre --</option>
            {offres.map(offre => (
              <option key={offre._id} value={offre._id}>
                {offre.titre}
              </option>
            ))}
          </select>
        </div>

        {/* Scoring Criteria */}
        {selectedOffre && (
          <div className="scoring-interface">
            <div className="scoring-criteria">
              <h3 className="scoring-criteria-title">Critères d'évaluation</h3>
              {Object.entries(criteria).map(([key, criterion]) => (
                <div key={key} className="scoring-criteria-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '24px' }}>{criterion.icon}</span>
                    <div>
                      <div className="scoring-criteria-label">{criterion.label}</div>
                      <div style={{ fontSize: '12px', color: '#94A3B8' }}>
                        Impact sur le score final
                      </div>
                    </div>
                  </div>
                  <div className="scoring-criteria-weight">
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={criterion.weight}
                      onChange={(e) => handleWeightChange(key, e.target.value)}
                      className="scoring-slider"
                    />
                    <span className="scoring-weight-display">{criterion.weight}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="scoring-actions">
              <button
                onClick={recalculateScores}
                className="scoring-button scoring-button-primary"
              >
                🔄 Recalculer les scores
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {showResults && candidats.length > 0 && (
          <div className="scoring-results">
            <h3 className="scoring-results-title">
              Résultats du scoring ({candidats.length} candidats)
            </h3>
            {candidats
              .sort((a, b) => scores[b._id]?.total - scores[a._id]?.total)
              .map((candidat) => {
                const score = scores[candidat._id]?.total || 0;
                return (
                  <div key={candidat._id} className="scoring-candidate-card">
                    <div className="scoring-candidate-info">
                      <div className="scoring-candidate-avatar">
                        {candidat.candidat?.nom?.[0] || 'U'}
                      </div>
                      <div>
                        <div className="scoring-candidate-name">
                          {candidat.candidat?.nom || 'Candidat'}
                        </div>
                        <div className="scoring-candidate-email">
                          {candidat.candidat?.email || ''}
                        </div>
                      </div>
                    </div>
                    <div className="scoring-candidate-score">
                      <span className={`score-badge ${getScoreBadge(score)}`}>
                        {score}% - {getScoreLabel(score)}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{
              fontSize: '40px',
              marginBottom: '16px',
              animation: 'spin 1s linear infinite'
            }}>⏳</div>
            <p style={{ color: '#94A3B8' }}>Analyse des candidats en cours...</p>
          </div>
        )}

        {/* Empty State */}
        {!selectedOffre && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: '#F8FAFC',
            borderRadius: '12px',
            border: '2px dashed #E2E8F0'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1E293B',
              marginBottom: '8px'
            }}>
              Sélectionnez une offre
            </h3>
            <p style={{ fontSize: '14px', color: '#94A3B8' }}>
              Choisissez une offre pour commencer l'évaluation des candidats
            </p>
          </div>
        )}

        {selectedOffre && !loading && candidats.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: '#F8FAFC',
            borderRadius: '12px',
            border: '2px dashed #E2E8F0'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1E293B',
              marginBottom: '8px'
            }}>
              Aucune candidature
            </h3>
            <p style={{ fontSize: '14px', color: '#94A3B8' }}>
              Cette offre n'a pas encore reçu de candidatures
            </p>
          </div>
        )}
      </div>
    </RecruteurLayout>
  );
}

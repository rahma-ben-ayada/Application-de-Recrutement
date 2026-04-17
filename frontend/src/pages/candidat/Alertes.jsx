import React, { useState, useEffect } from 'react';
import CandidatLayout from '../../layouts/CandidatLayout';
import api from '../../utils/api';
import { luxuryTheme } from '../../theme/luxuryTheme';

export default function Alertes() {
  const [alertes, setAlertes] = useState([]);
  const [resultats, setResultats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [checking, setChecking] = useState(false);
  const [message, setMessage] = useState(null);
  const [nouvelleAlerte, setNouvelleAlerte] = useState({
    titre: '',
    keywords: '',
    lieu: '',
    type: [],
    salaireMin: '',
    frequence: 'quotidien',
  });

  useEffect(() => {
    fetchAlertes();
  }, []);

  const fetchAlertes = async () => {
    try {
      const data = await api('/alertes/mes');
      setAlertes(data.alertes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const creerAlerte = async () => {
    if (!nouvelleAlerte.titre) {
      showMessage('error', 'Veuillez entrer un titre pour l\'alerte');
      return;
    }

    try {
      const keywordsArray = nouvelleAlerte.keywords.split(',').map(k => k.trim()).filter(k => k);

      await api('/alertes', 'POST', {
        ...nouvelleAlerte,
        keywords: keywordsArray,
        salaireMin: parseInt(nouvelleAlerte.salaireMin) || 0,
      });

      showMessage('success', '✅ Alerte créée avec succès !');
      setShowModal(false);
      setNouvelleAlerte({
        titre: '',
        keywords: '',
        lieu: '',
        type: [],
        salaireMin: '',
        frequence: 'quotidien',
      });
      fetchAlertes();
    } catch (err) {
      showMessage('error', err.message);
    }
  };

  const toggleAlerte = async (id) => {
    try {
      await api(`/alertes/${id}/toggle`, 'PATCH');
      fetchAlertes();
      showMessage('success', 'Alerte mise à jour');
    } catch (err) {
      showMessage('error', err.message);
    }
  };

  const deleteAlerte = async (id) => {
    try {
      await api(`/alertes/${id}`, 'DELETE');
      fetchAlertes();
      showMessage('success', 'Alerte supprimée');
    } catch (err) {
      showMessage('error', err.message);
    }
  };

  const checkerAlertes = async () => {
    setChecking(true);
    try {
      const data = await api('/alertes/check');
      setResultats(data.resultats);
      if (data.resultats.length === 0) {
        showMessage('info', 'Aucune nouvelle offre correspondant à vos alertes');
      } else {
        showMessage('success', `${data.resultats.length} alerte(s) avec nouvelles offres !`);
      }
    } catch (err) {
      showMessage('error', err.message);
    } finally {
      setChecking(false);
    }
  };

  const styles = {
    container: {
      fontFamily: '"Inter", sans-serif',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px',
    },
    title: {
      fontFamily: '"Playfair Display", serif',
      fontSize: '32px',
      fontWeight: '700',
      color: '#0A1628',
    },
    alerteCard: {
      background: '#fff',
      borderRadius: '16px',
      padding: '24px',
      border: '1px solid #E2E8F0',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease',
    },
    activeBadge: {
      background: 'linear-gradient(135deg, #00CC7A 0%, #00FF99 100%)',
      color: '#fff',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
    },
    inactiveBadge: {
      background: '#F1F5F9',
      color: '#64748B',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
    },
  };

  return (
    <CandidatLayout title="Alertes Emploi">
      <div style={styles.container}>
        {/* Message */}
        {message && (
          <div style={{
            padding: '12px 16px',
            borderRadius: '12px',
            marginBottom: '20px',
            background: message.type === 'success' ? '#D1FAE5' : message.type === 'error' ? '#FEE2E2' : '#DBEAFE',
            color: message.type === 'success' ? '#059669' : message.type === 'error' ? '#EF4444' : '#1E40AF',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            {message.text}
            <button onClick={() => setMessage(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: 'inherit' }}>✕</button>
          </div>
        )}

        {/* Header */}
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>🔔 Mes Alertes Emploi</h2>
            <p style={{ fontSize: '15px', color: '#64748B', marginTop: '8px' }}>
              Recevez des notifications pour les offres correspondant à vos critères
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setShowModal(true)}
              style={{
                padding: '12px 24px',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
                color: '#0A1628',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(212, 175, 55, 0.3)',
              }}
            >
              + Créer une alerte
            </button>
            <button
              onClick={checkerAlertes}
              disabled={checking}
              style={{
                padding: '12px 24px',
                borderRadius: '12px',
                border: '2px solid #0066FF',
                background: 'transparent',
                color: '#0066FF',
                fontSize: '14px',
                fontWeight: '600',
                cursor: checking ? 'not-allowed' : 'pointer',
              }}
            >
              {checking ? '⏳ Vérification...' : '🔍 Vérifier maintenant'}
            </button>
          </div>
        </div>

        {/* Résultats */}
        {resultats.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '20px',
              fontWeight: '700',
              color: '#0A1628',
              marginBottom: '16px',
            }}>
              Nouvelles offres trouvées
            </h3>
            {resultats.map((resultat, i) => (
              <div key={i} style={{
                background: '#D1FAE5',
                borderRadius: '12px',
                padding: '16px 20px',
                marginBottom: '12px',
                border: '1px solid #00CC7A',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#059669', marginBottom: '4px' }}>
                      {resultat.titreAlerte}
                    </div>
                    <div style={{ fontSize: '14px', color: '#047857' }}>
                      {resultat.nombreOffres} nouvelle(s) offre(s) trouvée(s)
                    </div>
                  </div>
                  <button
                    onClick={() => {/* TODO: Naviguer vers les offres */}}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      background: '#059669',
                      color: '#fff',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    Voir les offres →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Liste des alertes */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#94A3B8' }}>
            Chargement...
          </div>
        ) : alertes.length === 0 ? (
          <div style={{
            background: '#F8FAFC',
            borderRadius: '16px',
            padding: '60px',
            textAlign: 'center',
            border: '2px dashed #E2E8F0',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔔</div>
            <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '20px', fontWeight: '700', color: '#0A1628', marginBottom: '8px' }}>
              Aucune alerte créée
            </h3>
            <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px' }}>
              Créez vos premières alertes pour recevoir des notifications personnalisées
            </p>
            <button
              onClick={() => setShowModal(true)}
              style={{
                padding: '12px 24px',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
                color: '#0A1628',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Créer ma première alerte
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {alertes.map((alerte) => (
              <div
                key={alerte._id}
                style={styles.alerteCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.05)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '18px', fontWeight: '700', color: '#0A1628' }}>
                        {alerte.titre}
                      </h3>
                      {alerte.active ? (
                        <span style={styles.activeBadge}>✓ Active</span>
                      ) : (
                        <span style={styles.inactiveBadge}>⏸ Inactive</span>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                      {alerte.keywords && alerte.keywords.map((keyword, i) => (
                        <span key={i} style={{
                          background: '#DBEAFE',
                          color: '#1E40AF',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                        }}>
                          {keyword}
                        </span>
                      ))}
                      {alerte.lieu && (
                        <span style={{
                          background: '#D1FAE5',
                          color: '#059669',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                        }}>
                          📍 {alerte.lieu}
                        </span>
                      )}
                      {alerte.type && alerte.type.map((t, i) => (
                        <span key={i} style={{
                          background: '#EDE9FE',
                          color: '#7C3AED',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>

                    <div style={{ fontSize: '13px', color: '#64748B' }}>
                      <span>📅 Fréquence: {alerte.frequence}</span>
                      {alerte.salaireMin > 0 && (
                        <span style={{ marginLeft: '16px' }}>💰 Salaire min: {alerte.salaireMin} TND</span>
                      )}
                      <span style={{ marginLeft: '16px' }}>📊 {alerte.nombreOffres} offres trouvées</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => toggleAlerte(alerte._id)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid #E2E8F0',
                        background: '#fff',
                        cursor: 'pointer',
                        fontSize: '13px',
                      }}
                    >
                      {alerte.active ? '⏸' : '▶️'}
                    </button>
                    <button
                      onClick={() => deleteAlerte(alerte._id)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid #FECACA',
                        background: '#FEF2F2',
                        color: '#EF4444',
                        cursor: 'pointer',
                        fontSize: '13px',
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Créer Alerte */}
        {showModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 22, 40, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }} onClick={() => setShowModal(false)}>
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '32px',
              width: '100%',
              maxWidth: '520px',
              boxShadow: '0 20px 48px rgba(10, 22, 40, 0.2)',
            }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '20px', fontWeight: '700', color: '#0A1628' }}>
                  Créer une alerte emploi
                </h3>
                <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#94A3B8' }}>✕</button>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '8px' }}>
                  Titre de l'alerte *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Développeur React à Tunis"
                  value={nouvelleAlerte.titre}
                  onChange={(e) => setNouvelleAlerte({ ...nouvelleAlerte, titre: e.target.value })}
                  style={{
                    width: '100%',
                    height: '48px',
                    padding: '0 16px',
                    borderRadius: '10px',
                    border: '2px solid #E2E8F0',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '8px' }}>
                  Mots-clés (séparés par des virgules)
                </label>
                <input
                  type="text"
                  placeholder="Ex: React, JavaScript, Frontend"
                  value={nouvelleAlerte.keywords}
                  onChange={(e) => setNouvelleAlerte({ ...nouvelleAlerte, keywords: e.target.value })}
                  style={{
                    width: '100%',
                    height: '48px',
                    padding: '0 16px',
                    borderRadius: '10px',
                    border: '2px solid #E2E8F0',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '8px' }}>
                    Lieu
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Tunis, Remote"
                    value={nouvelleAlerte.lieu}
                    onChange={(e) => setNouvelleAlerte({ ...nouvelleAlerte, lieu: e.target.value })}
                    style={{
                      width: '100%',
                      height: '48px',
                      padding: '0 16px',
                      borderRadius: '10px',
                      border: '2px solid #E2E8F0',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '8px' }}>
                    Salaire minimum (TND)
                  </label>
                  <input
                    type="number"
                    placeholder="Ex: 2000"
                    value={nouvelleAlerte.salaireMin}
                    onChange={(e) => setNouvelleAlerte({ ...nouvelleAlerte, salaireMin: e.target.value })}
                    style={{
                      width: '100%',
                      height: '48px',
                      padding: '0 16px',
                      borderRadius: '10px',
                      border: '2px solid #E2E8F0',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '8px' }}>
                  Fréquence des notifications
                </label>
                <select
                  value={nouvelleAlerte.frequence}
                  onChange={(e) => setNouvelleAlerte({ ...nouvelleAlerte, frequence: e.target.value })}
                  style={{
                    width: '100%',
                    height: '48px',
                    padding: '0 16px',
                    borderRadius: '10px',
                    border: '2px solid #E2E8F0',
                    fontSize: '14px',
                    outline: 'none',
                    background: '#fff',
                  }}
                >
                  <option value="immediat">Immédiat</option>
                  <option value="quotidien">Quotidien</option>
                  <option value="hebdomadaire">Hebdomadaire</option>
                  <option value="mensuel">Mensuel</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    flex: 1,
                    height: '44px',
                    borderRadius: '10px',
                    border: '2px solid #E2E8F0',
                    background: '#fff',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: '#475569',
                  }}
                >
                  Annuler
                </button>
                <button
                  onClick={creerAlerte}
                  style={{
                    flex: 1,
                    height: '44px',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
                    color: '#0A1628',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}
                >
                  Créer l'alerte
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </CandidatLayout>
  );
}

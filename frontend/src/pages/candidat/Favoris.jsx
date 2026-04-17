import React, { useState, useEffect } from 'react';
import CandidatLayout from '../../layouts/CandidatLayout';
import api from '../../utils/api';

export default function Favoris() {
  const [favoris, setFavoris] = useState([]);
  const [filteredFavoris, setFilteredFavoris] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatut, setFilterStatut] = useState('all');
  const [filterPriorite, setFilterPriorite] = useState('all');
  const [selectedFavori, setSelectedFavori] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchFavoris();
  }, []);

  useEffect(() => {
    let filtered = [...favoris];

    if (filterStatut !== 'all') {
      filtered = filtered.filter(f => f.statut === filterStatut);
    }

    if (filterPriorite !== 'all') {
      filtered = filtered.filter(f => f.priorite === filterPriorite);
    }

    setFilteredFavoris(filtered);
  }, [favoris, filterStatut, filterPriorite]);

  const fetchFavoris = async () => {
    try {
      const data = await api('/favoris/mes');
      setFavoris(data.favoris);
      setFilteredFavoris(data.favoris);
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

  const updateFavori = async (id, updates) => {
    try {
      await api(`/favoris/${id}`, 'PUT', updates);
      fetchFavoris();
      showMessage('success', 'Favori mis à jour');
    } catch (err) {
      showMessage('error', err.message);
    }
  };

  const deleteFavori = async (id) => {
    try {
      await api(`/favoris/${id}`, 'DELETE');
      fetchFavoris();
      showMessage('success', 'Favori supprimé');
    } catch (err) {
      showMessage('error', err.message);
    }
  };

  const statutOptions = [
    { value: 'all', label: 'Tous les statuts', color: '#64748B' },
    { value: 'a_postuler', label: 'À postuler', color: '#3B82F6' },
    { value: 'en_cours', label: 'En cours', color: '#F59E0B' },
    { value: 'entretien_planifie', label: 'Entretien', color: '#8B5CF6' },
    { value: 'accepte', label: 'Accepté', color: '#10B981' },
    { value: 'refuse', label: 'Refusé', color: '#EF4444' },
    { value: 'archive', label: 'Archivé', color: '#6B7280' },
  ];

  const prioriteOptions = [
    { value: 'all', label: 'Toutes priorités' },
    { value: 'urgente', label: '🔴 Urgente' },
    { value: 'haute', label: '🟠 Haute' },
    { value: 'moyenne', label: '🟡 Moyenne' },
    { value: 'basse', label: '🟢 Basse' },
  ];

  const statutBadge = (statut) => {
    const badges = {
      a_postuler: { bg: '#DBEAFE', color: '#1E40AF', label: 'À postuler' },
      en_cours: { bg: '#FEF3C7', color: '#D97706', label: 'En cours' },
      entretien_planifie: { bg: '#EDE9FE', color: '#7C3AED', label: 'Entretien' },
      accepte: { bg: '#D1FAE5', color: '#059669', label: 'Accepté' },
      refuse: { bg: '#FEE2E2', color: '#EF4444', label: 'Refusé' },
      archive: { bg: '#F1F5F9', color: '#64748B', label: 'Archivé' },
    };
    const s = badges[statut] || badges.a_postuler;
    return { background: s.bg, color: s.color, padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' };
  };

  const prioriteBadge = (priorite) => {
    const badges = {
      urgente: { bg: '#FEE2E2', color: '#EF4444', label: '🔴' },
      haute: { bg: '#FEF3C7', color: '#D97706', label: '🟠' },
      moyenne: { bg: '#FEF9C3', color: '#CA8A04', label: '🟡' },
      basse: { bg: '#D1FAE5', color: '#059669', label: '🟢' },
    };
    const s = badges[priorite] || badges.moyenne;
    return { background: s.bg, color: s.color, padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' };
  };

  return (
    <CandidatLayout title="Mes Favoris">
      {/* Message */}
      {message && (
        <div style={{
          padding: '12px 16px',
          borderRadius: '12px',
          marginBottom: '20px',
          background: message.type === 'success' ? '#D1FAE5' : '#FEE2E2',
          color: message.type === 'success' ? '#059669' : '#EF4444',
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
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '32px', fontWeight: '700', color: '#0A1628', marginBottom: '8px' }}>
          ⭐ Mes Offres Favorites
        </h2>
        <p style={{ fontSize: '15px', color: '#64748B' }}>
          Gérez vos offres sauvegardées et suivez votre progression
        </p>
      </div>

      {/* Filtres */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div>
          <label style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>
            Statut
          </label>
          <select
            value={filterStatut}
            onChange={(e) => setFilterStatut(e.target.value)}
            style={{
              height: '42px',
              padding: '0 14px',
              borderRadius: '10px',
              border: '2px solid #E2E8F0',
              fontSize: '14px',
              outline: 'none',
              background: '#fff',
              cursor: 'pointer',
            }}
          >
            {statutOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>
            Priorité
          </label>
          <select
            value={filterPriorite}
            onChange={(e) => setFilterPriorite(e.target.value)}
            style={{
              height: '42px',
              padding: '0 14px',
              borderRadius: '10px',
              border: '2px solid #E2E8F0',
              fontSize: '14px',
              outline: 'none',
              background: '#fff',
              cursor: 'pointer',
            }}
          >
            {prioriteOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Liste des favoris */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#94A3B8' }}>
          Chargement...
        </div>
      ) : filteredFavoris.length === 0 ? (
        <div style={{
          background: '#F8FAFC',
          borderRadius: '16px',
          padding: '60px',
          textAlign: 'center',
          border: '2px dashed #E2E8F0',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⭐</div>
          <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '20px', fontWeight: '700', color: '#0A1628', marginBottom: '8px' }}>
            Aucun favori
          </h3>
          <p style={{ fontSize: '14px', color: '#64748B' }}>
            {favoris.length === 0
              ? 'Sauvegardez vos premières offres pour les retrouver facilement'
              : 'Aucun favori ne correspond à vos filtres'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
          {filteredFavoris.map((favori) => (
            <div
              key={favori._id}
              style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onClick={() => { setSelectedFavori(favori); setShowModal(true); }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.05)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '16px', fontWeight: '700', color: '#0A1628', marginBottom: '8px' }}>
                    {favori.offre?.titre}
                  </h3>
                  <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '8px' }}>
                    {favori.offre?.recruteur?.entreprise} • 📍 {favori.offre?.lieu}
                  </div>
                </div>
                <span style={prioriteBadge(favori.priorite)}>{prioriteBadge(favori.priorite).label}</span>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <span style={statutBadge(favori.statut)}>{statutBadge(favori.statut).label}</span>
                {favori.offre?.salaire && (
                  <span style={{ background: '#D1FAE5', color: '#059669', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '500' }}>
                    💰 {favori.offre.salaire}
                  </span>
                )}
              </div>

              {favori.tags && favori.tags.length > 0 && (
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {favori.tags.map((tag, i) => (
                    <span key={i} style={{ background: '#F1F5F9', color: '#475569', padding: '2px 8px', borderRadius: '4px', fontSize: '11px' }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {favori.notes && (
                <div style={{ marginTop: '12px', fontSize: '12px', color: '#64748B', fontStyle: 'italic' }}>
                  "{favori.notes}"
                </div>
              )}

              <div style={{ marginTop: '12px', fontSize: '11px', color: '#94A3B8' }}>
                Ajouté le {new Date(favori.createdAt).toLocaleDateString('fr-FR')}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Détail Favori */}
      {showModal && selectedFavori && (
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
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 48px rgba(10, 22, 40, 0.2)',
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '20px', fontWeight: '700', color: '#0A1628' }}>
                {selectedFavori.offre?.titre}
              </h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#94A3B8' }}>✕</button>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '14px', color: '#64748B', marginBottom: '8px' }}>
                {selectedFavori.offre?.recruteur?.entreprise} • 📍 {selectedFavori.offre?.lieu}
              </div>
              {selectedFavori.offre?.salaire && (
                <div style={{ fontSize: '14px', color: '#059669', fontWeight: '600' }}>
                  💰 {selectedFavori.offre.salaire}
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>
                  Statut
                </label>
                <select
                  value={selectedFavori.statut}
                  onChange={(e) => updateFavori(selectedFavori._id, { statut: e.target.value })}
                  style={{
                    width: '100%',
                    height: '40px',
                    padding: '0 12px',
                    borderRadius: '8px',
                    border: '2px solid #E2E8F0',
                    fontSize: '13px',
                  }}
                >
                  {statutOptions.filter(o => o.value !== 'all').map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>
                  Priorité
                </label>
                <select
                  value={selectedFavori.priorite}
                  onChange={(e) => updateFavori(selectedFavori._id, { priorite: e.target.value })}
                  style={{
                    width: '100%',
                    height: '40px',
                    padding: '0 12px',
                    borderRadius: '8px',
                    border: '2px solid #E2E8F0',
                    fontSize: '13px',
                  }}
                >
                  {prioriteOptions.filter(o => o.value !== 'all').map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '6px' }}>
                Notes personnelles
              </label>
              <textarea
                value={selectedFavori.notes || ''}
                onChange={(e) => updateFavori(selectedFavori._id, { notes: e.target.value })}
                placeholder="Ajoutez vos notes..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid #E2E8F0',
                  fontSize: '13px',
                  resize: 'vertical',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => {
                  setShowModal(false);
                  window.open(`/offres/${selectedFavori.offre?._id}`, '_blank');
                }}
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
                Voir l'offre →
              </button>
              <button
                onClick={() => {
                  deleteFavori(selectedFavori._id);
                  setShowModal(false);
                }}
                style={{
                  height: '44px',
                  padding: '0 20px',
                  borderRadius: '10px',
                  border: '2px solid #FECACA',
                  background: '#FEF2F2',
                  color: '#EF4444',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      )}
    </CandidatLayout>
  );
}

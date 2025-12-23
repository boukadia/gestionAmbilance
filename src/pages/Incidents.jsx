// src/pages/Incidents.jsx
// Page complète pour la gestion des incidents

import { useState, useEffect } from 'react';
import { fetchIncidents, createIncident, updateIncident, deleteIncident } from '../services/api';
import StatusBadge from '../components/ui/StatusBadge';
import Modal from '../components/ui/Modal';

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all'); // all, pending, in_progress, completed
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [editingIncident, setEditingIncident] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Form states for create
  const [severity, setSeverity] = useState('moyenne');
  const [address, setAddress] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('M');
  const [condition, setCondition] = useState('');

  // Form states for edit
  const [editSeverity, setEditSeverity] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editPatientName, setEditPatientName] = useState('');
  const [editPatientAge, setEditPatientAge] = useState('');
  const [editPatientGender, setEditPatientGender] = useState('M');
  const [editCondition, setEditCondition] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const incidentsData = await fetchIncidents();
      setIncidents(incidentsData);
    } catch (error) {
      console.error('Erreur:', error);
      setErrorMessage('Erreur lors du chargement des incidents');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateIncident = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!severity || !address || !condition) {
      setErrorMessage('Veuillez remplir tous les champs requis');
      return;
    }
    
    try {
      setLoading(true);
      await createIncident({
        severity: severity,
        address: address,
        patientInfo: {
          name: patientName,
          age: parseInt(patientAge) || 0,
          gender: patientGender,
          condition: condition
        },
        latitude: 48.8566 + (Math.random() - 0.5) * 0.1,
        longitude: 2.3522 + (Math.random() - 0.5) * 0.1
      });
      
      // Reset form on success
      setSeverity('moyenne');
      setAddress('');
      setPatientName('');
      setPatientAge('');
      setPatientGender('M');
      setCondition('');
      setErrorMessage('');
      
      await loadData();
      setIsModalOpen(false);
      alert('Incident créé avec succès!');
    } catch (error) {
      console.error('Erreur création:', error);
      setErrorMessage('Erreur lors de la création de l\'incident');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateIncident = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!editSeverity || !editAddress || !editCondition) {
      setErrorMessage('Veuillez remplir tous les champs requis');
      return;
    }
    
    try {
      setLoading(true);
      await updateIncident(editingIncident.id, {
        severity: editSeverity,
        address: editAddress,
        patientInfo: {
          name: editPatientName,
          age: parseInt(editPatientAge) || 0,
          gender: editPatientGender,
          condition: editCondition
        }
      });
      
      // Reset form on success
      setEditSeverity('');
      setEditAddress('');
      setEditPatientName('');
      setEditPatientAge('');
      setEditPatientGender('M');
      setEditCondition('');
      setErrorMessage('');
      
      await loadData();
      setIsEditModalOpen(false);
      setEditingIncident(null);
      alert('Incident modifié avec succès!');
    } catch (error) {
      console.error('Erreur mise à jour:', error);
      setErrorMessage('Erreur lors de la modification de l\'incident');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteIncident = async (incidentId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet incident ?')) {
      return;
    }
    
    try {
      setLoading(true);
      await deleteIncident(incidentId);
      await loadData();
      alert('Incident supprimé avec succès!');
    } catch (error) {
      console.error('Erreur suppression:', error);
      setErrorMessage('Erreur lors de la suppression de l\'incident');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (incident) => {
    setEditingIncident(incident);
    setEditSeverity(incident.severity);
    setEditAddress(incident.address);
    setEditPatientName(incident.patientInfo?.name || '');
    setEditPatientAge(incident.patientInfo?.age || '');
    setEditPatientGender(incident.patientInfo?.gender || 'M');
    setEditCondition(incident.patientInfo?.condition || '');
    setErrorMessage('');
    setIsEditModalOpen(true);
  };

  const filteredIncidents = incidents.filter(inc => {
    if (filter === 'all') return true;
    return inc.status === filter;
  });

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'critical': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'yellow';
      default: return 'gray';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return 'En attente';
      case 'in_progress': return 'En cours';
      case 'completed': return 'Terminé';
      default: return status;
    }
  };

  if (loading) return <div className="loading">Chargement...</div>;

  return (
    <div className="incidents-page">
      {/* En-tête */}
      <div className="page-header">
        <div>
          <h1>🚨 Gestion des Incidents</h1>
          <p className="text-muted">Total: {incidents.length} incidents</p>
        </div>
        <button className="btn-primary-custom" onClick={() => setIsModalOpen(true)}>
          ➕ Nouvel Incident
        </button>
      </div>

      {/* Filtres */}
      <div className="filters">
        <button 
          className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('all')}
        >
          Tous ({incidents.length})
        </button>
        <button 
          className={filter === 'pending' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('pending')}
        >
          En attente ({incidents.filter(i => i.status === 'pending').length})
        </button>
        <button 
          className={filter === 'in_progress' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('in_progress')}
        >
          En cours ({incidents.filter(i => i.status === 'in_progress').length})
        </button>
        <button 
          className={filter === 'completed' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('completed')}
        >
          Terminés ({incidents.filter(i => i.status === 'completed').length})
        </button>
      </div>

      {/* Liste des incidents */}
      <div className="incidents-grid">
        {filteredIncidents.length === 0 ? (
          <p className="text-center text-muted">Aucun incident trouvé</p>
        ) : (
          filteredIncidents.map(incident => (
            <div 
              key={incident.id} 
              className={`incident-card ${incident.severity}`}
              onClick={() => setSelectedIncident(incident)}
            >
              {/* En-tête carte */}
              <div className="incident-card-header">
                <div>
                  <h3>{incident.id}</h3>
                  <span className="incident-time">
                    {new Date(incident.createdAt).toLocaleString('fr-FR')}
                  </span>
                </div>
                <StatusBadge severity={incident.severity} />
              </div>

              {/* Informations */}
              <div className="incident-card-body">
                <div className="info-row">
                  <i className="bi bi-geo-alt"></i>
                  <span>{incident.address}</span>
                </div>

                {incident.patientInfo && (
                  <>
                    <div className="info-row">
                      <i className="bi bi-person"></i>
                      <span>{incident.patientInfo.name || 'Patient'}</span>
                    </div>
                    <div className="info-row">
                      <i className="bi bi-heart-pulse"></i>
                      <span>{incident.patientInfo.condition}</span>
                    </div>
                  </>
                )}

                <div className="info-row">
                  <i className="bi bi-clock"></i>
                  <span className="status-text">{getStatusText(incident.status)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="incident-card-footer">
                <button 
                  className="btn-edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(incident);
                  }}
                >
                  ✏️ Modifier
                </button>
                <button 
                  className="btn-delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteIncident(incident.id);
                  }}
                  disabled={loading}
                >
                  🗑️ Supprimer
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Détails Incident */}
      {selectedIncident && (
        <Modal
          isOpen={!!selectedIncident}
          onClose={() => setSelectedIncident(null)}
          title={`Détails de l'Incident ${selectedIncident.id}`}
        >
          <div className="incident-details">
            <div className="detail-section">
              <h4>📍 Localisation</h4>
              <p><strong>Adresse:</strong> {selectedIncident.address}</p>
              <p className="text-muted">
                Coordonnées: {selectedIncident.latitude.toFixed(4)}, {selectedIncident.longitude.toFixed(4)}
              </p>
            </div>

            <div className="detail-section">
              <h4>👤 Informations Patient</h4>
              {selectedIncident.patientInfo ? (
                <>
                  <p><strong>Nom:</strong> {selectedIncident.patientInfo.name || 'N/A'}</p>
                  <p><strong>Âge:</strong> {selectedIncident.patientInfo.age || 'N/A'} ans</p>
                  <p><strong>Genre:</strong> {selectedIncident.patientInfo.gender === 'M' ? 'Homme' : 'Femme'}</p>
                  <p><strong>Condition:</strong> {selectedIncident.patientInfo.condition}</p>
                </>
              ) : (
                <p className="text-muted">Aucune information patient</p>
              )}
            </div>

            <div className="detail-section">
              <h4>⚡ Statut & Gravité</h4>
              <p><strong>Gravité:</strong> <StatusBadge severity={selectedIncident.severity} /></p>
              <p><strong>État:</strong> {getStatusText(selectedIncident.status)}</p>
              <p><strong>Créé le:</strong> {new Date(selectedIncident.createdAt).toLocaleString('fr-FR')}</p>
              {selectedIncident.assignedAt && (
                <p><strong>Assigné le:</strong> {new Date(selectedIncident.assignedAt).toLocaleString('fr-FR')}</p>
              )}
              {selectedIncident.completedAt && (
                <p><strong>Terminé le:</strong> {new Date(selectedIncident.completedAt).toLocaleString('fr-FR')}</p>
              )}
            </div>

            {selectedIncident.assignedAmbulanceId && (
              <div className="detail-section">
                <h4>🚑 Ambulance Assignée</h4>
                <p><strong>ID:</strong> {selectedIncident.assignedAmbulanceId}</p>
              </div>
            )}

            <div className="form-actions">
              <button 
                className="btn-primary-custom"
                onClick={() => {
                  handleEditClick(selectedIncident);
                  setSelectedIncident(null);
                }}
              >
                ✏️ Modifier
              </button>
              <button 
                className="btn-outline"
                onClick={() => setSelectedIncident(null)}
              >
                Fermer
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal Création Incident */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setErrorMessage('');
        }}
        title="Créer un Nouvel Incident"
      >
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleCreateIncident} className="incident-form">
          <div className="form-group">
            <label>Gravité *</label>
            <select 
              value={severity} 
              onChange={(e) => setSeverity(e.target.value)} 
              required
            >
              <option value="faible">Faible</option>
              <option value="moyenne">Moyenne</option>
              <option value="critique">Critique</option>
            </select>
          </div>

          <div className="form-group">
            <label>Adresse *</label>
            <input 
              type="text" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Adresse complète" 
              required 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Nom du patient</label>
              <input 
                type="text" 
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Nom complet" 
              />
            </div>
            <div className="form-group">
              <label>Âge</label>
              <input 
                type="number" 
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
                placeholder="Âge" 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Genre</label>
            <select 
              value={patientGender}
              onChange={(e) => setPatientGender(e.target.value)}
            >
              <option value="M">Homme</option>
              <option value="F">Femme</option>
            </select>
          </div>

          <div className="form-group">
            <label>Condition / Description *</label>
            <textarea 
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              placeholder="Décrivez la situation..." 
              rows={3} 
              required
            ></textarea>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn-outline" 
              onClick={() => {
                setIsModalOpen(false);
                setErrorMessage('');
              }}
              disabled={loading}
            >
              Annuler
            </button>
            <button 
              type="submit" 
              className="btn-primary-custom"
              disabled={loading}
            >
              {loading ? 'Création...' : 'Créer l\'incident'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal Modification Incident */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingIncident(null);
          setErrorMessage('');
        }}
        title="Modifier l'Incident"
      >
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        {editingIncident && (
          <form onSubmit={handleUpdateIncident} className="incident-form">
            <div className="form-group">
              <label>Gravité *</label>
              <select 
                value={editSeverity} 
                onChange={(e) => setEditSeverity(e.target.value)} 
                required
              >
                <option value="faible">Faible</option>
                <option value="moyenne">Moyenne</option>
                <option value="critique">Critique</option>
              </select>
            </div>

            <div className="form-group">
              <label>Adresse *</label>
              <input 
                type="text" 
                value={editAddress}
                onChange={(e) => setEditAddress(e.target.value)}
                placeholder="Adresse complète" 
                required 
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Nom du patient</label>
                <input 
                  type="text" 
                  value={editPatientName}
                  onChange={(e) => setEditPatientName(e.target.value)}
                  placeholder="Nom complet" 
                />
              </div>
              <div className="form-group">
                <label>Âge</label>
                <input 
                  type="number" 
                  value={editPatientAge}
                  onChange={(e) => setEditPatientAge(e.target.value)}
                  placeholder="Âge" 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Genre</label>
              <select 
                value={editPatientGender}
                onChange={(e) => setEditPatientGender(e.target.value)}
              >
                <option value="M">Homme</option>
                <option value="F">Femme</option>
              </select>
            </div>

            <div className="form-group">
              <label>Condition / Description *</label>
              <textarea 
                value={editCondition}
                onChange={(e) => setEditCondition(e.target.value)}
                placeholder="Décrivez la situation..." 
                rows={3} 
                required
              ></textarea>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="btn-outline" 
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingIncident(null);
                  setErrorMessage('');
                }}
                disabled={loading}
              >
                Annuler
              </button>
              <button 
                type="submit" 
                className="btn-primary-custom"
                disabled={loading}
              >
                {loading ? 'Mise à jour...' : 'Mettre à jour'}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
export default Incidents;
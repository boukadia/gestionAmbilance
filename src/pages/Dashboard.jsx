// src/pages/Dashboard.jsx
// Page principale du dashboard

import { useState } from 'react';
import Header from '../components/layout/Header';
import AlertBanner from '../components/dashboard/AlertBanner';
import QuickActions from '../components/dashboard/QuickActions';
import KPIGrid from '../components/dashboard/KPIGrid';
import IncidentList from '../components/dashboard/IncidentList';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import AmbulanceTable from '../components/dashboard/AmbulanceTable';
import Modal from '../components/ui/Modal';

const Dashboard = ({ 
  incidents, 
  ambulances, 
  activities, 
  kpis,
  isModalOpen,
  setIsModalOpen,
  onCreateIncident,
  onAssignAmbulance,
  onUpdateAmbulanceStatus,
  onChangeIncidentStatus
}) => {
  // Form states
  const [severity, setSeverity] = useState('medium');
  const [address, setAddress] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateIncident = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!severity || !address || !patientName) {
      setErrorMessage('Veuillez remplir tous les champs requis');
      return;
    }
    
    try {
      setLoading(true);
      await onCreateIncident({
        severity: severity,
        address: address,
        patientInfo: {
          name: patientName,
          phone: patientPhone,
          condition: description,
          age: 0,
          gender: 'M'
        },
        latitude: 48.8566,
        longitude: 2.3522
      });
      
      // Reset form on success
      setSeverity('medium');
      setAddress('');
      setPatientName('');
      setPatientPhone('');
      setDescription('');
      setErrorMessage('');
      setIsModalOpen(false);
      alert('Incident créé avec succès!');
    } catch (error) {
      console.error('Erreur création:', error);
      setErrorMessage('Erreur lors de la création de l\'incident');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <Header onNewIncident={() => {
        setIsModalOpen(true);
        setErrorMessage('');
      }} />

      <AlertBanner incidents={incidents} />

      <QuickActions onNewIncident={() => {
        setIsModalOpen(true);
        setErrorMessage('');
      }} />

      <KPIGrid kpis={kpis} />

      <div className="content-grid">
        <IncidentList 
          incidents={incidents}
          ambulances={ambulances}
          onAssign={onAssignAmbulance}
          onChangeStatus={onChangeIncidentStatus}
        />
        <ActivityFeed activities={activities} />
      </div>

      <AmbulanceTable 
        ambulances={ambulances}
        onUpdateStatus={onUpdateAmbulanceStatus}
      />

      {/* Modal de création d'incident */}
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
        <form className="incident-form" onSubmit={handleCreateIncident}>
          <div className="form-group">
            <label>Niveau de Gravité</label>
            <div className="severity-options">
              <label className="severity-option">
                <input 
                  type="radio" 
                  name="severity" 
                  value="critique" 
                  checked={severity === 'critique'}
                  onChange={(e) => setSeverity(e.target.value)}
                />
                <span className="severity-dot critical"></span>
                Critique
              </label>
              <label className="severity-option">
                <input 
                  type="radio" 
                  name="severity" 
                  value="moyenne" 
                  checked={severity === 'moyenne'}
                  onChange={(e) => setSeverity(e.target.value)}
                />
                <span className="severity-dot moderate"></span>
                Moyenne
              </label>
              <label className="severity-option">
                <input 
                  type="radio" 
                  name="severity" 
                  value="faible" 
                  checked={severity === 'faible'}
                  onChange={(e) => setSeverity(e.target.value)}
                />
                <span className="severity-dot low"></span>
                Faible
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Adresse de l'Incident</label>
            <input 
              type="text" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Saisir l'adresse..." 
              required 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Nom du Patient</label>
              <input 
                type="text" 
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Nom complet" 
                required 
              />
            </div>
            <div className="form-group">
              <label>Téléphone</label>
              <input 
                type="tel" 
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                placeholder="06 XX XX XX XX" 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Détails supplémentaires..." 
              rows={3}
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
              {loading ? 'Création...' : 'Créer l\'Incident'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Dashboard;

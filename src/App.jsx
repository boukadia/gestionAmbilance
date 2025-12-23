// src/App.jsx
// Application principale avec navigation simple

import { useState, useEffect } from 'react';
import { 
  fetchAmbulances, 
  fetchIncidents, 
  fetchActivities,
  createIncident,
  assignAmbulance,
  updateAmbulanceStatus,
  completeIncident,
  updateIncidentStatus
} from './services/api';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Incidents from './pages/Incidents';
import './App.css';
import './pages/Incidents.css';

function App() {
  // ==================== STATE ====================
  const [currentPage, setCurrentPage] = useState('dashboard'); // dashboard, incidents
  const [ambulances, setAmbulances] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [activities, setActivities] = useState([]);
  const [kpis, setKpis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ==================== CHARGEMENT DONNÉES ====================
  useEffect(() => {
    loadData();
    
    // Rafraîchir toutes les 30 secondes
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [ambulancesData, incidentsData, activitiesData] = await Promise.all([
        fetchAmbulances(),
        fetchIncidents(),
        fetchActivities()
      ]);
      
      setAmbulances(ambulancesData);
      setIncidents(incidentsData);
      setActivities(activitiesData);
      
      // Calculer les KPIs dynamiquement
      const availableAmbs = ambulancesData.filter(a => a.status === 'available').length;
      const activeIncs = incidentsData.filter(i => i.status === 'pending' || i.status === 'in_progress').length;
      const completedIncs = incidentsData.filter(i => i.status === 'completed').length;
      
      setKpis({
        availableAmbulances: availableAmbs,
        activeIncidents: activeIncs,
        averageResponseTime: "4.5",
        completedToday: completedIncs
      });
    } catch (error) {
      console.error('Erreur chargement:', error);
    } finally {
      setLoading(false);
    }
  };

  // ==================== ACTIONS ====================
  const handleCreateIncident = async (incidentData) => {
    try {
      await createIncident(incidentData);
      await loadData(); // Recharger les données
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erreur création incident:', error);
    }
  };

  const handleAssignAmbulance = async (incidentId, ambulanceId) => {
    try {
      await assignAmbulance(incidentId, ambulanceId);
      await updateAmbulanceStatus(ambulanceId, 'busy');
      await loadData();
    } catch (error) {
      console.error('Erreur assignation:', error);
    }
  };

  const handleUpdateAmbulanceStatus = async (id, status) => {
    try {
      await updateAmbulanceStatus(id, status);
      await loadData();
    } catch (error) {
      console.error('Erreur mise à jour:', error);
    }
  };

  const handleCompleteIncident = async (incidentId) => {
    try {
      const incident = incidents.find(i => i.id === incidentId);
      
      // Compléter l'incident
      await completeIncident(incidentId);
      
      // Libérer l'ambulance si assignée
      if (incident?.assignedAmbulanceId) {
        await updateAmbulanceStatus(incident.assignedAmbulanceId, 'available');
      }
            onComplete={handleCompleteIncident}
            onUpdateStatus={handleUpdateIncidentStatus}
          
      
      await loadData();
    } catch (error) {
      console.error('Erreur complétion incident:', error);
    }
  };

  const handleUpdateIncidentStatus = async (incidentId, status) => {
    try {
      const incident = incidents.find(i => i.id === incidentId);
      
      await updateIncidentStatus(incidentId, status);
      
      // Si l'incident est terminé, libérer l'ambulance
      if (status === 'completed' && incident?.assignedAmbulanceId) {
        await updateAmbulanceStatus(incident.assignedAmbulanceId, 'available');
      }
      
      await loadData();
    } catch (error) {
      console.error('Erreur changement status:', error);
    }
  };

  // ==================== RENDER ====================
  if (loading && !kpis) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="app">
      <Sidebar onNavigate={setCurrentPage} currentPage={currentPage} />
      
      <main className="main-content">
        {currentPage === 'incidents' ? (
          <Incidents />
        ) : (
          <Dashboard 
            incidents={incidents}
            ambulances={ambulances}
            activities={activities}
            kpis={kpis}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            onCreateIncident={handleCreateIncident}
            onAssignAmbulance={handleAssignAmbulance}
            onUpdateAmbulanceStatus={handleUpdateAmbulanceStatus}
            onChangeIncidentStatus={handleUpdateIncidentStatus}
          />
        )}
      </main>
    </div>
  );
}

export default App;
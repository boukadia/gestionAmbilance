// src/components/dashboard/IncidentList.jsx
// Liste des incidents - Reçoit les données via props

import IncidentItem from './IncidentItem';

const IncidentList = ({ incidents, ambulances, onAssign, onChangeStatus }) => {
  const pendingIncidents = incidents?.filter(
    (incident) => incident.status === 'pending' || incident.status === 'in_progress'
  ) || [];

  return (
    <div className="card">
      <div className="card-header">
        <h5>
          <i className="bi bi-lightning text-warning"></i>
          Incidents en Attente
        </h5>
        <span className="badge-count">{pendingIncidents.length}</span>
      </div>

      <div className="incident-list">
        {pendingIncidents.length === 0 ? (
          <p className="text-muted">Aucun incident en attente</p>
        ) : (
          pendingIncidents.map((incident) => (
            <IncidentItem 
              key={incident.id} 
              incident={incident}
              ambulances={ambulances}
              onAssign={onAssign}
              onChangeStatus={onChangeStatus}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default IncidentList;
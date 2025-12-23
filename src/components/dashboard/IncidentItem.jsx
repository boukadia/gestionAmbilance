// src/components/dashboard/IncidentItem.jsx
// Item d'incident avec possibilité d'assigner une ambulance

import { useState } from 'react';
import StatusBadge from '../ui/StatusBadge';

const IncidentItem = ({ incident, ambulances, onAssign, onChangeStatus }) => {
  const [showAssign, setShowAssign] = useState(false);

  const availableAmbulances = ambulances?.filter(a => a.status === 'available') || [];

  const handleAssign = (ambulanceId) => {
    onAssign(incident.id, ambulanceId);
    setShowAssign(false);
  };

  const handleNextStatus = () => {
    let nextStatus = '';
    if (incident.status === 'pending') nextStatus = 'in_progress';
    else if (incident.status === 'in_progress') nextStatus = 'completed';
    
    if (nextStatus && onChangeStatus) {
      onChangeStatus(incident.id, nextStatus);
    }
  };

  return (
    <div className={`incident-item ${incident.severity}`}>
      <div className="incident-header">
        <span className="incident-id">{incident.id}</span>
        <span className="incident-time">
          {new Date(incident.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      <div className="incident-location">
        <i className="bi bi-geo-alt"></i>
        {incident.address}
      </div>

      {incident.patientInfo?.condition && (
        <div className="incident-condition">
          {incident.patientInfo.condition}
        </div>
      )}

      <div className="incident-footer">
        <StatusBadge severity={incident.severity} />
        
        {incident.status === 'in_progress' && (
          <button 
            className="btn-status" 
            onClick={handleNextStatus}
            style={{ marginLeft: '8px', padding: '4px 12px', fontSize: '12px' }}
          >
            Terminer
          </button>
        )}
        
        {incident.status === 'pending' ? (
          <div>
            <button className="btn-assign" onClick={() => setShowAssign(!showAssign)}>
              Assigner
            </button>
            
            {showAssign && (
              <div className="assign-dropdown">
                {availableAmbulances.length === 0 ? (
                  <p>Aucune ambulance disponible</p>
                ) : (
                  availableAmbulances.map(amb => (
                    <button 
                      key={amb.id}
                      onClick={() => handleAssign(amb.id)}
                      className="ambulance-option"
                    >
                      {amb.callSign}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        ) : incident.status === 'in_progress' ? (
          <span className="text-muted">En cours...</span>
        ) : (
          <span className="text-success">✓ Terminé</span>
        )}
      </div>
    </div>
  );
};

export default IncidentItem;
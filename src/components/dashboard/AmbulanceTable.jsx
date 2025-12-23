// src/components/dashboard/AmbulanceTable.jsx
// Tableau de la flotte - Reçoit les données via props

import { useState } from 'react';
import StatusBadge from '../ui/StatusBadge';

const AmbulanceTable = ({ ambulances, onUpdateStatus }) => {
  const [editingId, setEditingId] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    onUpdateStatus(id, newStatus);
    setEditingId(null);
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h5>
          <i className="bi bi-truck text-danger"></i>
          État de la Flotte ({ambulances?.length || 0})
        </h5>
      </div>

      <table className="ambulance-table">
        <thead>
          <tr>
            <th>Véhicule</th>
            <th>Statut</th>
            <th>Équipage</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ambulances?.map((ambulance) => (
            <tr key={ambulance.id}>
              <td>
                <div className="ambulance-info">
                  <div className="ambulance-icon">
                    <i className="bi bi-truck"></i>
                  </div>
                  <div>
                    <div className="ambulance-name">{ambulance.callSign}</div>
                    <div className="ambulance-plate">{ambulance.id}</div>
                  </div>
                </div>
              </td>

              <td>
                {editingId === ambulance.id ? (
                  <select 
                    defaultValue={ambulance.status}
                    onChange={(e) => handleStatusChange(ambulance.id, e.target.value)}
                    onBlur={() => setEditingId(null)}
                    autoFocus
                  >
                    <option value="available">Disponible</option>
                    <option value="busy">Occupé</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                ) : (
                  <StatusBadge status={ambulance.status} />
                )}
              </td>

              <td>
                <div className="crew-info">
                  {ambulance.crew ? (
                    <>
                      <div>{ambulance.crew.driver}</div>
                      <div className="text-muted">{ambulance.crew.paramedic}</div>
                    </>
                  ) : (
                    <span className="no-crew">Non assigné</span>
                  )}
                </div>
              </td>

              <td>
                <span className="location">
                  <i className="bi bi-geo-alt"></i>
                  {ambulance.latitude.toFixed(4)}, {ambulance.longitude.toFixed(4)}
                </span>
              </td>

              <td>
                <div className="action-buttons">
                  <button 
                    className="btn-icon" 
                    title="Changer statut"
                    onClick={() => setEditingId(ambulance.id)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AmbulanceTable;
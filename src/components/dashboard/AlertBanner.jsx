// src/components/dashboard/AlertBanner.jsx
// Bannière d'alerte pour incidents critiques

const AlertBanner = ({ incidents }) => {
  const criticalIncidents = incidents?.filter(i => i.severity === 'critical' && i.status === 'pending') || [];
  
  if (criticalIncidents.length === 0) return null;

  const incident = criticalIncidents[0];

  return (
    <div className="alert-banner">
      <div className="alert-content">
        <i className="bi bi-exclamation-circle pulse"></i>
        <div>
          <strong>Incident Critique en attente</strong>
          <span>{incident.id} - {incident.patientInfo?.condition || 'Urgence'}</span>
        </div>
      </div>
      <button className="btn-light">
        Voir détails
      </button>
    </div>
  );
};

export default AlertBanner;
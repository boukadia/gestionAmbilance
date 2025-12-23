// src/components/ui/StatusBadge.tsx

// Composant réutilisable pour afficher un badge de statut coloré
// Utilisé pour les statuts d'ambulances et la gravité des incidents

const getStatusText = (status) => {
  const texts = {
    available: 'Disponible',
    busy: 'En intervention',
    enroute: 'En route',
    maintenance: 'Maintenance'
  };
  return texts[status];
};

// Fonction pour obtenir le texte français de la gravité
const getSeverityText = (severity) => {
  const texts = {
    critique: 'Critique',
    moyenne: 'Moyenne',
    faible: 'Faible'
  };
  return texts[severity];
};

const StatusBadge = ({ status, severity }) => {
  // Détermine la classe CSS et le texte à afficher
  let className = 'status-badge ';
  let text = '';

  if (status) {
    className += status;
    text = getStatusText(status);
  } else if (severity) {
    // Mapping des gravités vers les classes CSS
    const severityToClass = {
      critique: 'busy',
      moyenne: 'enroute',
      faible: 'available'
    };
    className += severityToClass[severity];
    text = getSeverityText(severity);
  }

  return <span className={className}>{text}</span>;
};

export default StatusBadge;
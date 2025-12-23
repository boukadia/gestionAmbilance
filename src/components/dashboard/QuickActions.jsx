// src/components/dashboard/QuickActions.tsx

// Boutons d'actions rapides
// Permettent d'accéder rapidement aux fonctionnalités principales

const QuickActions = ({ onNewIncident }) => {
  // Liste des actions rapides disponibles
  const actions = [
    { icon: 'bi-plus-circle', label: 'Créer Incident', onClick: onNewIncident },
    { icon: 'bi-truck', label: 'Ajouter Véhicule', onClick: () => {} },
    { icon: 'bi-person-plus', label: 'Nouvelle Équipe', onClick: () => {} },
    { icon: 'bi-file-earmark-text', label: 'Générer Rapport', onClick: () => {} }
  ];

  return (
    <div className="quick-actions">
      {actions.map((action, index) => (
        <button 
          key={index} 
          className="quick-action-btn"
          onClick={action.onClick}
        >
          <i className={`bi ${action.icon}`}></i>
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
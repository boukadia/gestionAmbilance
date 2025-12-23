// src/components/dashboard/ActivityItem.tsx

// Élément individuel dans le feed d'activité
// Affiche une action récente avec son icône et timestamp

const ActivityItem = ({ activity }) => {
  // Détermine l'icône et la couleur selon le type d'activité
  const getIconConfig = () => {
    switch (activity.type) {
      case 'completed':
        return { icon: 'bi-check-circle', color: 'green' };
      case 'created':
        return { icon: 'bi-exclamation-circle', color: 'red' };
      case 'assigned':
        return { icon: 'bi-truck', color: 'blue' };
      case 'status_change':
        return { icon: 'bi-person', color: 'yellow' };
      default:
        return { icon: 'bi-circle', color: 'gray' };
    }
  };

  const { icon, color } = getIconConfig();

  return (
    <li className="activity-item">
      {/* Icône de l'activité */}
      <div className={`activity-icon ${color}`}>
        <i className={`bi ${icon}`}></i>
      </div>

      {/* Contenu : message et heure */}
      <div className="activity-content">
        <p>{activity.message}</p>
        <small>
          <i className="bi bi-clock"></i>
          {activity.time}
        </small>
      </div>
    </li>
  );
};

export default ActivityItem;
// src/components/dashboard/ActivityFeed.jsx
// Feed d'activité - Reçoit les données via props

import ActivityItem from './ActivityItem';

const ActivityFeed = ({ activities }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5>
          <i className="bi bi-activity text-primary"></i>
          Activité Récente
        </h5>
      </div>

      <ul className="activity-list">
        {activities?.length === 0 ? (
          <p className="text-muted">Aucune activité récente</p>
        ) : (
          activities?.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))
        )}
      </ul>
    </div>
  );
};

export default ActivityFeed;
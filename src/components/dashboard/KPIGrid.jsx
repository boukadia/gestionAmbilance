// src/components/dashboard/KPIGrid.jsx
// Grille des KPIs - Reçoit les données via props

import KPICard from './KPICard';

const KPIGrid = ({ kpis }) => {
  if (!kpis) return null;

  const kpiCards = [
    {
      id: 1,
      title: 'Ambulances Disponibles',
      value: kpis.availableAmbulances,
      icon: '🚑',
      color: 'success',
      trend: null
    },
    {
      id: 2,
      title: 'Incidents Actifs',
      value: kpis.activeIncidents,
      icon: '🚨',
      color: 'warning',
      trend: null
    },
    {
      id: 3,
      title: 'Temps de Réponse Moyen',
      value: `${kpis.averageResponseTime} min`,
      icon: '⏱️',
      color: 'info',
      trend: null
    },
    {
      id: 4,
      title: 'Interventions Terminées',
      value: kpis.completedToday,
      icon: '✅',
      color: 'primary',
      trend: null
    }
  ];

  return (
    <div className="kpi-grid">
      {kpiCards.map((kpi) => (
        <KPICard key={kpi.id} kpi={kpi} />
      ))}
    </div>
  );
};

export default KPIGrid;
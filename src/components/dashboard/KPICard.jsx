// src/components/dashboard/KPICard.tsx

// Carte individuelle affichant un KPI (indicateur clé de performance)
// Affiche une icône, une valeur, un titre et optionnellement une tendance

const KPICard = ({ kpi }) => {
  return (
    <div className="kpi-card">
      {/* En-tête avec icône et tendance */}
      <div className="kpi-header">
        {/* Icône colorée selon le type de KPI */}
        <div className={`kpi-icon ${kpi.color}`}>
          <i className={`bi ${kpi.icon}`}></i>
        </div>
        
        {/* Tendance (si disponible) */}
        {kpi.trend && (
          <span className={`kpi-trend ${kpi.trend.direction}`}>
            <i className={`bi bi-arrow-${kpi.trend.direction}`}></i>
            {kpi.trend.value}
          </span>
        )}
      </div>

      {/* Valeur principale du KPI */}
      <div className="kpi-value">{kpi.value}</div>
      
      {/* Libellé descriptif */}
      <div className="kpi-label">{kpi.title}</div>
    </div>
  );
};

export default KPICard;
// src/components/layout/Header.tsx

// En-tête de la page principale
// Contient le titre, la recherche, les notifications et le bouton d'action

const Header = ({ onNewIncident }) => {
  return (
    <div className="page-header">
      {/* Partie gauche : Titre et sous-titre */}
      <div className="page-title">
        <h1>Dashboard</h1>
        <p>Vue d'ensemble du système de dispatch</p>
      </div>

      {/* Partie droite : Actions */}
      <div className="header-actions">
        {/* Barre de recherche */}
        <div className="search-box">
          <i className="bi bi-search"></i>
          <input type="text" placeholder="Rechercher..." />
        </div>

        {/* Bouton notifications avec badge */}
        <button className="notification-btn">
          <i className="bi bi-bell"></i>
          <span className="notification-badge">3</span>
        </button>

        {/* Bouton principal pour créer un incident */}
        <button className="btn-primary-custom" onClick={onNewIncident}>
          <i className="bi bi-plus-lg"></i>
          Nouvel Incident
        </button>
      </div>
    </div>
  );
};

export default Header;
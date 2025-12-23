// src/components/layout/Sidebar.jsx
// Barre latérale de navigation avec gestion de la navigation

const Sidebar = ({ onNavigate, currentPage = 'dashboard' }) => {
  return (
    <nav className="sidebar">
      {/* Logo et nom de l'application */}
      <div className="sidebar-brand">
        <div className="logo">
          <i className="bi bi-heart-pulse"></i>
        </div>
        <div>
          <h4>ResQ</h4>
          <small>Dispatch Center</small>
        </div>
      </div>

      {/* Section Navigation Principale */}
      <div className="nav-section">
        <div className="nav-section-title">Principal</div>
        <ul className="nav-list">
          {/* Lien Dashboard */}
          <li>
            <button 
              onClick={() => onNavigate('dashboard')} 
              className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
            >
              <i className="bi bi-grid-1x2"></i>
              Dashboard
            </button>
          </li>
          {/* Lien Carte */}
          <li>
            <button 
              onClick={() => onNavigate('map')} 
              className={`nav-link ${currentPage === 'map' ? 'active' : ''}`}
            >
              <i className="bi bi-map"></i>
              Carte Dispatch
            </button>
          </li>
          {/* Lien Incidents */}
          <li>
            <button 
              onClick={() => onNavigate('incidents')} 
              className={`nav-link ${currentPage === 'incidents' ? 'active' : ''}`}
            >
              <i className="bi bi-exclamation-triangle"></i>
              Incidents
            </button>
          </li>
        </ul>
      </div>

      {/* Section Gestion */}
      <div className="nav-section">
        <div className="nav-section-title">Gestion</div>
        <ul className="nav-list">
          <li>
            <button 
              onClick={() => onNavigate('fleet')} 
              className={`nav-link ${currentPage === 'fleet' ? 'active' : ''}`}
            >
              <i className="bi bi-truck"></i>
              Flotte
            </button>
          </li>
          <li>
            <button className="nav-link">
              <i className="bi bi-people"></i>
              Équipes
            </button>
          </li>
          <li>
            <button className="nav-link">
              <i className="bi bi-clock-history"></i>
              Historique
            </button>
          </li>
        </ul>
      </div>

      {/* Profil utilisateur en bas de la sidebar */}
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">MA</div>
          <div className="user-info">
            <h6>Mohamed Admin</h6>
            <small>Régulateur Chef</small>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
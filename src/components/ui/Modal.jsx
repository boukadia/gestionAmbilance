// src/components/ui/Modal.tsx

// Composant Modal réutilisable
// Crée une fenêtre popup pour les formulaires et confirmations

const Modal = ({ isOpen, onClose, title, children }) => {
  // Si le modal n'est pas ouvert, on ne rend rien
  if (!isOpen) return null;

  return (
    // Overlay sombre derrière le modal
    <div className="modal-overlay" onClick={onClose}>
      {/* Contenu du modal - stopPropagation évite de fermer en cliquant dedans */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* En-tête avec titre et bouton fermer */}
        <div className="modal-header">
          <h5 className="modal-title">
            <i className="bi bi-plus-circle text-danger me-2"></i>
            {title}
          </h5>
          <button className="modal-close-btn" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Corps du modal avec le contenu passé en children */}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
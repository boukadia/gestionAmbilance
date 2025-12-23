// src/main.tsx

// Point d'entrée de l'application React
// Monte le composant App dans le DOM

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Crée la racine React et rend l'application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
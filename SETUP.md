# ResQ - Ambulance Dispatching System 🚑

## Structure Simple du Projet

```
resq/
├── db.json                    # Base de données JSON Server
├── src/
│   ├── main.jsx              # Point d'entrée
│   ├── App.jsx               # Application principale
│   ├── store/                # Redux Store
│   │   ├── index.js          # Configuration du store
│   │   └── slices/           # Slices Redux
│   ├── services/             # API et TanStack Query
│   │   ├── api.js            # Configuration Axios
│   │   └── queries.js        # React Query hooks
│   ├── components/
│   │   ├── layout/           # Header, Sidebar
│   │   ├── dashboard/        # KPIs, Activity, etc.
│   │   ├── map/              # Carte Leaflet
│   │   └── ui/               # Composants réutilisables
│   └── pages/                # Pages principales
│       ├── Dashboard.jsx
│       ├── MapView.jsx
│       ├── Fleet.jsx
│       └── History.jsx
```

## Installation Rapide

### 1. Installer les dépendances
```bash
npm install
```

### 2. Lancer le projet (Frontend + Backend)
```bash
npm run dev:all
```

Ou séparément:
```bash
# Terminal 1 - Frontend (Vite)
npm run dev

# Terminal 2 - Backend (JSON Server)
npm run server
```

## URLs

- **Frontend**: http://localhost:5173
- **API Backend**: http://localhost:5000

### Endpoints API disponibles:
- `GET /ambulances` - Liste des ambulances
- `GET /ambulances/:id` - Détails d'une ambulance
- `PATCH /ambulances/:id` - Modifier une ambulance
- `GET /incidents` - Liste des incidents
- `POST /incidents` - Créer un incident
- `PATCH /incidents/:id` - Modifier un incident
- `GET /activities` - Historique des activités
- `GET /kpis` - Statistiques

## Technologies Utilisées

- ⚛️ **React 19** + **Vite**
- 🗺️ **React-Leaflet** (Cartes)
- 🔄 **Redux Toolkit** (State management)
- 🔍 **TanStack Query** (Data fetching)
- 🎨 **Tailwind CSS** (Styling)
- ✅ **Zod** (Validation)
- 📝 **React Hook Form** (Formulaires)
- 🗄️ **JSON Server** (Mock API)

## Prochaines Étapes

1. ✅ Structure de base créée
2. ⏳ Configurer Redux Store
3. ⏳ Créer les composants de la carte
4. ⏳ Créer le Dashboard
5. ⏳ Ajouter les formulaires
6. ⏳ Implémenter le routing

## Notes Importantes

- Les données dans `db.json` sont des exemples (Paris)
- Vous pouvez modifier les coordonnées dans `.env`
- Le fichier `.env` contient la configuration de l'API et de la carte

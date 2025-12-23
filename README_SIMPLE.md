# ResQ - Dashboard Simple

## Structure Simplifiée

**Technologies utilisées:**
- ✅ React 19 + Vite
- ✅ useState + useEffect (pas de Redux)
- ✅ fetch API (pas d'Axios)
- ✅ Dashboard uniquement

## Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le projet
npm run dev:all
```

## Comment ça marche

### App.jsx - Composant Principal
```jsx
// Utilise useState pour gérer l'état
const [ambulances, setAmbulances] = useState([]);
const [incidents, setIncidents] = useState([]);

// useEffect pour charger les données au démarrage
useEffect(() => {
  loadData();
}, []);

// Fonction pour charger les données avec fetch
const loadData = async () => {
  const data = await fetch('http://localhost:5000/ambulances').then(r => r.json());
  setAmbulances(data);
};
```

### Services API (fetch)
Tous les appels API sont dans `src/services/api.js`:
- `fetchAmbulances()` - Récupérer les ambulances
- `fetchIncidents()` - Récupérer les incidents
- `createIncident(data)` - Créer un incident
- `assignAmbulance(incidentId, ambulanceId)` - Assigner une ambulance

### Composants du Dashboard
1. **KPIGrid** - Cartes statistiques (4 KPIs)
2. **IncidentList** - Liste des incidents en attente
3. **ActivityFeed** - Activités récentes
4. **AmbulanceTable** - Tableau de la flotte
5. **AlertBanner** - Alertes critiques

## Utilisation

### Créer un incident
1. Cliquer sur "Nouvel Incident"
2. Remplir le formulaire
3. Soumettre

### Assigner une ambulance
1. Dans la liste des incidents
2. Cliquer sur "Assigner"
3. Choisir une ambulance disponible

### Changer le statut d'une ambulance
1. Dans le tableau de la flotte
2. Cliquer sur l'icône crayon
3. Sélectionner le nouveau statut

## URLs

- Frontend: http://localhost:5173
- API (JSON Server): http://localhost:5000

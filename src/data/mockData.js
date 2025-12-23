// src/data/mockData.ts

// Ce fichier contient les données fictives pour tester l'application
// En production, ces données viendraient d'une API

// Données des KPIs affichés en haut du dashboard
export const kpiData = [
  {
    id: '1',
    title: 'Incidents Actifs',
    value: 7,
    icon: 'bi-exclamation-triangle',
    color: 'red',
    trend: { value: '+12%', direction: 'up' }
  },
  {
    id: '2',
    title: 'Ambulances Disponibles',
    value: 12,
    icon: 'bi-truck',
    color: 'green',
    trend: { value: '+5%', direction: 'up' }
  },
  {
    id: '3',
    title: 'Temps Réponse Moyen',
    value: '8.2 min',
    icon: 'bi-clock',
    color: 'blue',
    trend: { value: '-8%', direction: 'down' }
  },
  {
    id: '4',
    title: 'Interventions Aujourd\'hui',
    value: 156,
    icon: 'bi-check-circle',
    color: 'yellow',
    trend: { value: '+3%', direction: 'up' }
  }
];

// Liste des ambulances de la flotte
export const ambulancesData = [
  {
    id: '1',
    name: 'AMB-01',
    plate: '12345-A-67',
    status: 'available',
    crew: ['KM', 'SA'],
    location: 'Dépôt Central',
    lastActivity: 'Il y a 15 min'
  },
  {
    id: '2',
    name: 'AMB-02',
    plate: '23456-B-89',
    status: 'busy',
    crew: ['YB', 'NL'],
    location: 'Bd Zerktouni',
    lastActivity: 'En cours - INC-2024-086'
  },
  {
    id: '3',
    name: 'AMB-03',
    plate: '34567-C-12',
    status: 'maintenance',
    crew: [],
    location: 'Garage',
    lastActivity: 'Révision programmée'
  },
  {
    id: '4',
    name: 'AMB-04',
    plate: '45678-D-34',
    status: 'enroute',
    crew: ['FA', 'MH'],
    location: 'Vers Ain Diab',
    lastActivity: 'ETA: 5 min - INC-2024-087'
  },
  {
    id: '5',
    name: 'AMB-05',
    plate: '56789-E-56',
    status: 'available',
    crew: ['RK', 'HB'],
    location: 'Maarif',
    lastActivity: 'Il y a 5 min'
  }
];

// Liste des incidents en attente
export const incidentsData = [
  {
    id: 'INC-2024-089',
    location: 'Bd Mohammed V, Casablanca',
    severity: 'critical',
    status: 'pending',
    createdAt: 'Il y a 2 min',
    description: 'Accident de la route'
  },
  {
    id: 'INC-2024-088',
    location: 'Rue Zerktouni, Maârif',
    severity: 'moderate',
    status: 'pending',
    createdAt: 'Il y a 8 min',
    description: 'Malaise cardiaque'
  },
  {
    id: 'INC-2024-087',
    location: 'Hay Hassani, Casablanca',
    severity: 'low',
    status: 'assigned',
    createdAt: 'Il y a 15 min',
    description: 'Chute personne âgée'
  }
];

// Historique des activités récentes
export const activitiesData = [
  {
    id: '1',
    type: 'completed',
    message: 'AMB-05 a terminé l\'intervention INC-2024-085',
    time: 'Il y a 5 minutes'
  },
  {
    id: '2',
    type: 'created',
    message: 'Nouvel incident INC-2024-089 créé - Priorité Critique',
    time: 'Il y a 8 minutes'
  },
  {
    id: '3',
    type: 'assigned',
    message: 'AMB-12 assignée à INC-2024-086',
    time: 'Il y a 12 minutes'
  },
  {
    id: '4',
    type: 'status_change',
    message: 'AMB-03 passée en statut Maintenance',
    time: 'Il y a 25 minutes'
  },
  {
    id: '5',
    type: 'completed',
    message: 'AMB-08 de retour au dépôt - Disponible',
    time: 'Il y a 32 minutes'
  }
];
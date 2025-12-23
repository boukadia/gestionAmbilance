// Données de simulation pour le système ResQ

// Équipes simulées
export const mockCrewMembers = [
  { 
    id: '1', 
    name: 'Khalid Majidi', 
    initials: 'KM', 
    role: 'driver',
    gradientColors: ['#6366f1', '#8b5cf6']
  },
  { 
    id: '2', 
    name: 'Sarah Alami', 
    initials: 'SA', 
    role: 'paramedic',
    gradientColors: ['#6366f1', '#8b5cf6']
  },
  { 
    id: '3', 
    name: 'Youssef Benali', 
    initials: 'YB', 
    role: 'driver',
    gradientColors: ['#10b981', '#059669']
  },
  { 
    id: '4', 
    name: 'Nadia Lahlou', 
    initials: 'NL', 
    role: 'paramedic',
    gradientColors: ['#f59e0b', '#d97706']
  },
  { 
    id: '5', 
    name: 'Fatima Amrani', 
    initials: 'FA', 
    role: 'doctor',
    gradientColors: ['#ec4899', '#db2777']
  },
  { 
    id: '6', 
    name: 'Mohamed Hassan', 
    initials: 'MH', 
    role: 'paramedic',
    gradientColors: ['#8b5cf6', '#7c3aed']
  },
  { 
    id: '7', 
    name: 'Rachid Kabbaj', 
    initials: 'RK', 
    role: 'driver',
    gradientColors: ['#06b6d4', '#0891b2']
  },
  { 
    id: '8', 
    name: 'Hafida Bouazza', 
    initials: 'HB', 
    role: 'paramedic',
    gradientColors: ['#f97316', '#ea580c']
  }
];

// Ambulances simulées
export const mockAmbulances = [
  {
    id: 'AMB-01',
    name: 'AMB-01',
    plateNumber: '12345-A-67',
    status: 'available',
    position: {
      latitude: 33.5850,
      longitude: -7.6100,
      address: 'Dépôt Central'
    },
    crew: [mockCrewMembers[0], mockCrewMembers[1]],
    lastActivity: 'Il y a 15 min',
    equipment: ['Défibrillateur', 'Oxygène', 'Brancard']
  },
  {
    id: 'AMB-02',
    name: 'AMB-02',
    plateNumber: '23456-B-89',
    status: 'busy',
    position: {
      latitude: 33.5650,
      longitude: -7.5750,
      address: 'Bd Zerktouni'
    },
    crew: [mockCrewMembers[2], mockCrewMembers[3]],
    lastActivity: 'En cours - INC-2024-086',
    equipment: ['Défibrillateur', 'Oxygène', 'Brancard']
  },
  {
    id: 'AMB-03',
    name: 'AMB-03',
    plateNumber: '34567-C-12',
    status: 'maintenance',
    position: {
      latitude: 33.5800,
      longitude: -7.6000,
      address: 'Garage'
    },
    crew: [],
    lastActivity: 'Révision programmée',
    equipment: ['Défibrillateur', 'Oxygène']
  },
  {
    id: 'AMB-04',
    name: 'AMB-04',
    plateNumber: '45678-D-34',
    status: 'enroute',
    position: {
      latitude: 33.5900,
      longitude: -7.6200,
      address: 'Vers Ain Diab'
    },
    crew: [mockCrewMembers[4], mockCrewMembers[5]],
    lastActivity: 'ETA: 5 min - INC-2024-087',
    equipment: ['Défibrillateur', 'Oxygène', 'Brancard', 'Moniteur cardiaque']
  },
  {
    id: 'AMB-05',
    name: 'AMB-05',
    plateNumber: '56789-E-56',
    status: 'available',
    position: {
      latitude: 33.5700,
      longitude: -7.5900,
      address: 'Maarif'
    },
    crew: [mockCrewMembers[6], mockCrewMembers[7]],
    lastActivity: 'Il y a 5 min',
    equipment: ['Défibrillateur', 'Oxygène', 'Brancard']
  }
];

// Patients simulés
export const mockPatients = [
  {
    name: 'Ahmed Bennani',
    phone: '06 12 34 56 78',
    victimCount: 1
  },
  {
    name: 'Fatima Zahra',
    phone: '06 87 65 43 21',
    victimCount: 1
  },
  {
    name: 'Mohamed Alaoui',
    phone: '06 11 22 33 44',
    victimCount: 2
  }
];

// Incidents simulés
export const mockIncidents = [
  {
    id: 'INC-2024-089',
    severity: 'critical',
    type: 'Accident de la route',
    address: 'Bd Mohammed V, Casablanca',
    position: {
      latitude: 33.5731,
      longitude: -7.5898
    },
    patient: mockPatients[0],
    description: 'Collision entre deux véhicules, victimes coincées',
    createdAt: 'Il y a 2 min',
    status: 'pending'
  },
  {
    id: 'INC-2024-088',
    severity: 'moderate',
    type: 'Malaise cardiaque',
    address: 'Rue Zerktouni, Maârif',
    position: {
      latitude: 33.5800,
      longitude: -7.6050
    },
    patient: mockPatients[1],
    description: 'Personne âgée avec douleurs thoraciques',
    createdAt: 'Il y a 8 min',
    status: 'pending'
  },
  {
    id: 'INC-2024-087',
    severity: 'low',
    type: 'Chute',
    address: 'Hay Hassani, Casablanca',
    position: {
      latitude: 33.5600,
      longitude: -7.5800
    },
    patient: mockPatients[2],
    description: 'Chute dans les escaliers, suspicion de fracture',
    createdAt: 'Il y a 15 min',
    status: 'assigned',
    assignedAmbulance: 'AMB-04',
    estimatedArrival: '5 min'
  }
];

// Activités récentes simulées
export const mockActivities = [
  {
    id: '1',
    type: 'incident_completed',
    description: 'AMB-05 a terminé l\'intervention INC-2024-085',
    timestamp: 'Il y a 5 minutes',
    icon: 'check-circle',
    iconColor: '#16a34a',
    ambulanceId: 'AMB-05',
    incidentId: 'INC-2024-085'
  },
  {
    id: '2',
    type: 'incident_created',
    description: 'Nouvel incident INC-2024-089 créé - Priorité Critique',
    timestamp: 'Il y a 8 minutes',
    icon: 'exclamation-circle',
    iconColor: '#dc2626',
    incidentId: 'INC-2024-089'
  },
  {
    id: '3',
    type: 'incident_assigned',
    description: 'AMB-12 assignée à INC-2024-086',
    timestamp: 'Il y a 12 minutes',
    icon: 'truck',
    iconColor: '#0ea5e9',
    ambulanceId: 'AMB-12',
    incidentId: 'INC-2024-086'
  },
  {
    id: '4',
    type: 'ambulance_status_changed',
    description: 'AMB-03 passée en statut Maintenance',
    timestamp: 'Il y a 25 minutes',
    icon: 'person',
    iconColor: '#f59e0b',
    ambulanceId: 'AMB-03'
  },
  {
    id: '5',
    type: 'ambulance_returned',
    description: 'AMB-08 de retour au dépôt - Disponible',
    timestamp: 'Il y a 32 minutes',
    icon: 'arrow-repeat',
    iconColor: '#16a34a',
    ambulanceId: 'AMB-08'
  }
];

// KPIs simulés
export const mockKPIData = {
  activeIncidents: 7,
  availableAmbulances: 12,
  averageResponseTime: 8.2,
  todayInterventions: 156,
  trends: {
    activeIncidents: {
      value: 12,
      direction: 'up',
      percentage: 12
    },
    availableAmbulances: {
      value: 5,
      direction: 'up',
      percentage: 5
    },
    averageResponseTime: {
      value: 8,
      direction: 'down',
      percentage: 8
    },
    todayInterventions: {
      value: 3,
      direction: 'up',
      percentage: 3
    }
  }
};

// Fonctions utilitaires
export const getIncidentsByStatus = (status) => {
  return mockIncidents.filter(incident => incident.status === status);
};

export const getAmbulancesByStatus = (status) => {
  return mockAmbulances.filter(ambulance => ambulance.status === status);
};

export const getAvailableAmbulances = () => {
  return mockAmbulances.filter(ambulance => ambulance.status === 'available');
};

export const getPendingIncidents = () => {
  return mockIncidents.filter(incident => incident.status === 'pending');
};
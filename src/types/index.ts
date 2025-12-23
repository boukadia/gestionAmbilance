// Types pour le système ResQ - Dispatching d'ambulances

export interface Ambulance {
  id: string;
  name: string;
  plateNumber: string;
  status: AmbulanceStatus;
  position: Position;
  crew: CrewMember[];
  lastActivity: string;
  equipment: string[];
}

export interface CrewMember {
  id: string;
  name: string;
  initials: string;
  role: 'driver' | 'paramedic' | 'doctor';
  avatar?: string;
  gradientColors?: string[];
}

export interface Incident {
  id: string;
  severity: IncidentSeverity;
  type: string;
  address: string;
  position: Position;
  patient: Patient;
  description: string;
  createdAt: string;
  status: IncidentStatus;
  assignedAmbulance?: string;
  estimatedArrival?: string;
}

export interface Patient {
  name: string;
  phone: string;
  victimCount: number;
}

export interface Position {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface Activity {
  id: string;
  type: ActivityType;
  description: string;
  timestamp: string;
  icon: string;
  iconColor: string;
  ambulanceId?: string;
  incidentId?: string;
}

export interface KPIData {
  activeIncidents: number;
  availableAmbulances: number;
  averageResponseTime: number;
  todayInterventions: number;
  trends: {
    activeIncidents: TrendData;
    availableAmbulances: TrendData;
    averageResponseTime: TrendData;
    todayInterventions: TrendData;
  };
}

export interface TrendData {
  value: number;
  direction: 'up' | 'down';
  percentage: number;
}

export interface KPI {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  trend?: {
    value: string;
    direction: 'up' | 'down';
  };
}

// Types énumérés
export type AmbulanceStatus = 'available' | 'busy' | 'enroute' | 'maintenance' | 'unavailable';

export type IncidentSeverity = 'critical' | 'moderate' | 'low';

export type IncidentStatus = 'pending' | 'assigned' | 'in-progress' | 'completed' | 'cancelled';

export type ActivityType = 
  | 'incident_created'
  | 'incident_assigned'
  | 'incident_completed'
  | 'ambulance_status_changed'
  | 'ambulance_returned'
  | 'crew_assigned';

// Props pour les composants
export interface KPICardProps {
  title: string;
  value: string | number;
  icon: string;
  iconColor: 'red' | 'green' | 'blue' | 'yellow';
  trend: TrendData;
}

export interface StatusBadgeProps {
  status: AmbulanceStatus | IncidentSeverity | IncidentStatus;
  text?: string;
}

export interface IncidentItemProps {
  incident: Incident;
  onAssign: (incidentId: string) => void;
}

export interface ActivityItemProps {
  activity: Activity;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Formulaire nouveau incident
export interface NewIncidentForm {
  severity: IncidentSeverity;
  address: string;
  patientName: string;
  phone: string;
  emergencyType: string;
  victimCount: number;
  description: string;
}
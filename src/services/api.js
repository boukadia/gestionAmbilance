// src/services/api.js
// API simple avec fetch

const API_URL = 'http://localhost:5000';

// ==================== AMBULANCES ====================
export const fetchAmbulances = async () => {
  const response = await fetch(`${API_URL}/ambulances`);
  if (!response.ok) throw new Error('Erreur chargement ambulances');
  return response.json();
};

export const updateAmbulanceStatus = async (id, status) => {
  const response = await fetch(`${API_URL}/ambulances/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  if (!response.ok) throw new Error('Erreur mise à jour ambulance');
  return response.json();
};

// ==================== INCIDENTS ====================
export const fetchIncidents = async () => {
  const response = await fetch(`${API_URL}/incidents`);
  if (!response.ok) throw new Error('Erreur chargement incidents');
  return response.json();
};

export const createIncident = async (data) => {
  const newIncident = {
    ...data,
    id: `INC-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'pending',
    assignedAmbulanceId: null
  };
  
  const response = await fetch(`${API_URL}/incidents`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newIncident)
  });
  if (!response.ok) throw new Error('Erreur création incident');
  return response.json();
};

export const assignAmbulance = async (incidentId, ambulanceId) => {
  const response = await fetch(`${API_URL}/incidents/${incidentId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      assignedAmbulanceId: ambulanceId,
      status: 'in_progress',
      assignedAt: new Date().toISOString()
    })
  });
  if (!response.ok) throw new Error('Erreur assignation');
  return response.json();
};

export const completeIncident = async (incidentId) => {
  const response = await fetch(`${API_URL}/incidents/${incidentId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status: 'completed',
      completedAt: new Date().toISOString()
    })
  });
  if (!response.ok) throw new Error('Erreur complétion incident');
  return response.json();
};

export const updateIncidentStatus = async (incidentId, status) => {
  const response = await fetch(`${API_URL}/incidents/${incidentId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  if (!response.ok) throw new Error('Erreur mise à jour status');
  return response.json();
};

export const updateIncident = async (incidentId, data) => {
  const response = await fetch(`${API_URL}/incidents/${incidentId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Erreur mise à jour incident');
  return response.json();
};

export const deleteIncident = async (incidentId) => {
  const response = await fetch(`${API_URL}/incidents/${incidentId}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Erreur suppression incident');
  return response.json();
};

// ==================== ACTIVITIES ====================
export const fetchActivities = async () => {
  const response = await fetch(`${API_URL}/activities`);
  if (!response.ok) throw new Error('Erreur chargement activités');
  const data = await response.json();
  return data.slice(0, 10); // Dernières 10 activités
};

// ==================== KPIs ====================
export const fetchKPIs = async () => {
  const response = await fetch(`${API_URL}/kpis`);
  if (!response.ok) throw new Error('Erreur chargement KPIs');
  return response.json();
};

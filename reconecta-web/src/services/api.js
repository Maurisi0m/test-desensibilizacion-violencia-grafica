// API client service for ReConecta Web

const BASE_URL = '/api';

export async function submitEvaluation(payload) {
  const res = await fetch(`${BASE_URL}/evaluations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error al guardar la evaluación en el servidor.');
  }
  return await res.json();
}

export async function getEvaluations() {
  const res = await fetch(`${BASE_URL}/evaluations`);
  if (!res.ok) {
    throw new Error('Error al obtener el historial de evaluaciones.');
  }
  return await res.json();
}

export async function getEvaluationById(id) {
  const res = await fetch(`${BASE_URL}/evaluations/${id}`);
  if (!res.ok) {
    throw new Error(`Error al obtener la evaluación #${id}.`);
  }
  return await res.json();
}

export async function deleteEvaluation(id) {
  const res = await fetch(`${BASE_URL}/evaluations/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) {
    throw new Error(`Error al eliminar la evaluación #${id}.`);
  }
  return await res.json();
}

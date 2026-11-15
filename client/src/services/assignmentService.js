const API_URL = 'http://localhost:3000/api/assignments'

// Get all assignments from the backend.
export async function getAssignments() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Unable to load assignments.')
  }

  return await response.json()
}

// Add a new assignment.
export async function createAssignment(title, dueDate) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, dueDate })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Unable to create assignment.')
  }

  return await response.json()
}

// Update an assignment's completion status.
export async function updateAssignment(id, completed) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ completed })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Unable to update assignment.')
  }

  return await response.json()
}

// Delete an assignment.
export async function deleteAssignment(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    throw new Error('Unable to delete assignment.')
  }

  return await response.json()
}
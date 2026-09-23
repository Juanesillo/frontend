const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function handleResponse(res) {
  if (!res.ok) {
    let message = `Error ${res.status}`;
    try {
      const body = await res.json();
      message = body.message || message;
    } catch {
      // el body no era JSON, se deja el mensaje por defecto
    }
    throw new Error(message);
  }
  if (res.status === 204) return null;
  return res.json();
}

export async function getActors() {
  const res = await fetch(`${API_URL}/actors`);
  return handleResponse(res);
}

export async function getActor(id) {
  const res = await fetch(`${API_URL}/actors/${id}`);
  return handleResponse(res);
}

export async function createActor(actor) {
  const res = await fetch(`${API_URL}/actors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(actor),
  });
  return handleResponse(res);
}

export async function updateActor(id, actor) {
  const res = await fetch(`${API_URL}/actors/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(actor),
  });
  return handleResponse(res);
}

export async function deleteActor(id) {
  const res = await fetch(`${API_URL}/actors/${id}`, { method: 'DELETE' });
  return handleResponse(res);
}

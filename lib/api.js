const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function handleResponse(res) {
  if (!res.ok) {
    let message = `Error ${res.status}`;
    try {
      const body = await res.json();
      // Los errores de validación de Nest llegan como un arreglo de mensajes
      message = Array.isArray(body.message) ? body.message.join(', ') : body.message || message;
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

async function post(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  return handleResponse(res);
}

export async function getMovies() {
  const res = await fetch(`${API_URL}/movies`);
  return handleResponse(res);
}

export async function getMovie(id) {
  const res = await fetch(`${API_URL}/movies/${id}`);
  return handleResponse(res);
}

export function createMovie(movie) {
  return post('/movies', movie);
}

export function createPrize(prize) {
  return post('/prizes', prize);
}

export function createYoutubeTrailer(trailer) {
  return post('/youtube-trailers', trailer);
}

export function addMovieToActor(actorId, movieId) {
  return post(`/actors/${actorId}/movies/${movieId}`);
}

export function addPrizeToMovie(movieId, prizeId) {
  return post(`/movies/${movieId}/prizes/${prizeId}`);
}

export async function getGenres() {
  const res = await fetch(`${API_URL}/genres`);
  return handleResponse(res);
}

export async function getDirectors() {
  const res = await fetch(`${API_URL}/directors`);
  return handleResponse(res);
}

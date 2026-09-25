'use client';

import { useState } from 'react';

const emptyMovie = {
  title: '',
  poster: '',
  duration: '',
  country: '',
  releaseDate: '',
  popularity: '',
  genreId: '',
  directorId: '',
};
const emptyTrailer = { name: '', url: '', duration: '', channel: '' };
const emptyActor = { name: '', photo: '', nationality: '', birthDate: '', biography: '' };
const emptyPrize = { name: '', category: '', year: '', status: 'won' };

export default function MovieForm({ genres, directors, onSubmit, progress }) {
  const [movie, setMovie] = useState(emptyMovie);
  const [trailer, setTrailer] = useState(emptyTrailer);
  const [actor, setActor] = useState(emptyActor);
  const [prize, setPrize] = useState(emptyPrize);

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  // Devuelve un onChange que actualiza el campo `field` del objeto de estado.
  const bind = (setter) => (field) => (e) =>
    setter((prev) => ({ ...prev, [field]: e.target.value }));
  const onMovie = bind(setMovie);
  const onTrailer = bind(setTrailer);
  const onActor = bind(setActor);
  const onPrize = bind(setPrize);

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError(null);
    setSubmitting(true);
    try {
      await onSubmit({ movie, trailer, actor, prize });
    } catch (err) {
      setFormError(err.message);
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="movie-form">
      <fieldset className="form-section">
        <legend>Película</legend>
        <label className="field">
          <span>Título</span>
          <input value={movie.title} onChange={onMovie('title')} placeholder="Título de la película" required />
        </label>
        <label className="field">
          <span>Póster (URL)</span>
          <input type="url" value={movie.poster} onChange={onMovie('poster')} placeholder="https://..." required />
        </label>
        <div className="field-row">
          <label className="field">
            <span>Duración (min)</span>
            <input type="number" min="1" value={movie.duration} onChange={onMovie('duration')} required />
          </label>
          <label className="field">
            <span>País</span>
            <input value={movie.country} onChange={onMovie('country')} placeholder="Colombia" required />
          </label>
        </div>
        <div className="field-row">
          <label className="field">
            <span>Fecha de lanzamiento</span>
            <input type="date" value={movie.releaseDate} onChange={onMovie('releaseDate')} required />
          </label>
          <label className="field">
            <span>Popularidad</span>
            <input type="number" min="0" value={movie.popularity} onChange={onMovie('popularity')} required />
          </label>
        </div>
        <div className="field-row">
          <label className="field">
            <span>Género</span>
            <select value={movie.genreId} onChange={onMovie('genreId')} required>
              <option value="">Selecciona un género</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>{genre.type}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Director</span>
            <select value={movie.directorId} onChange={onMovie('directorId')} required>
              <option value="">Selecciona un director</option>
              {directors.map((director) => (
                <option key={director.id} value={director.id}>{director.name}</option>
              ))}
            </select>
          </label>
        </div>
      </fieldset>

      <fieldset className="form-section">
        <legend>Trailer de YouTube</legend>
        <div className="field-row">
          <label className="field">
            <span>Nombre</span>
            <input value={trailer.name} onChange={onTrailer('name')} placeholder="Official Trailer" required />
          </label>
          <label className="field">
            <span>Canal</span>
            <input value={trailer.channel} onChange={onTrailer('channel')} placeholder="Canal de YouTube" required />
          </label>
        </div>
        <div className="field-row">
          <label className="field">
            <span>URL</span>
            <input type="url" value={trailer.url} onChange={onTrailer('url')} placeholder="https://www.youtube.com/watch?v=..." required />
          </label>
          <label className="field">
            <span>Duración (min)</span>
            <input type="number" min="1" value={trailer.duration} onChange={onTrailer('duration')} required />
          </label>
        </div>
      </fieldset>

      <fieldset className="form-section">
        <legend>Actor principal</legend>
        <label className="field">
          <span>Nombre</span>
          <input value={actor.name} onChange={onActor('name')} placeholder="Nombre del actor" required />
        </label>
        <label className="field">
          <span>Foto (URL)</span>
          <input type="url" value={actor.photo} onChange={onActor('photo')} placeholder="https://..." required />
        </label>
        <div className="field-row">
          <label className="field">
            <span>Nacionalidad</span>
            <input value={actor.nationality} onChange={onActor('nationality')} placeholder="Colombia" required />
          </label>
          <label className="field">
            <span>Fecha de nacimiento</span>
            <input type="date" value={actor.birthDate} onChange={onActor('birthDate')} required />
          </label>
        </div>
        <label className="field">
          <span>Biografía</span>
          <textarea value={actor.biography} onChange={onActor('biography')} rows={3} placeholder="Agrega una biografía" required />
        </label>
      </fieldset>

      <fieldset className="form-section">
        <legend>Premio</legend>
        <div className="field-row">
          <label className="field">
            <span>Nombre</span>
            <input value={prize.name} onChange={onPrize('name')} placeholder="Óscar" required />
          </label>
          <label className="field">
            <span>Categoría</span>
            <input value={prize.category} onChange={onPrize('category')} placeholder="Mejor película" required />
          </label>
        </div>
        <div className="field-row">
          <label className="field">
            <span>Año</span>
            <input type="number" min="1900" max="2100" value={prize.year} onChange={onPrize('year')} required />
          </label>
          <label className="field">
            <span>Estado</span>
            <select value={prize.status} onChange={onPrize('status')} required>
              <option value="won">Ganado</option>
              <option value="nominated">Nominado</option>
            </select>
          </label>
        </div>
      </fieldset>

      {progress && submitting && <p className="status">{progress}</p>}
      {formError && <p className="form-error">{formError}</p>}

      <div className="form-actions">
        <button type="submit" className="button" disabled={submitting}>
          {submitting ? 'Creando...' : 'Crear película'}
        </button>
      </div>
    </form>
  );
}

'use client';

import { useState } from 'react';
import ActorCard from '../components/ActorCard';
import { useActors } from '../context/actors-context';

export default function ActoresPage() {
  const { actors, loading, error, removeActor } = useActors();
  const [search, setSearch] = useState('');

  async function handleDelete(id) {
    if (!confirm('¿Eliminar este actor?')) return;
    await removeActor(id);
  }

  const term = search.trim().toLowerCase();
  const filtered = actors.filter(
    (actor) =>
      actor.name.toLowerCase().includes(term) ||
      actor.nationality.toLowerCase().includes(term),
  );

  return (
    <div className="view">
      <div className="view-content">
        <header className="view-header">
          <p className="eyebrow">Colección</p>
          <h1 className="view-title">Actores</h1>
          {!loading && <p className="view-meta">{actors.length} actores</p>}
        </header>

        <div className="toolbar">
          <label className="search">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                fill="currentColor"
                d="M10.5 3a7.5 7.5 0 0 1 5.96 12.05l4.25 4.24-1.42 1.42-4.24-4.25A7.5 7.5 0 1 1 10.5 3zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z"
              />
            </svg>
            <input
              type="search"
              placeholder="Buscar por nombre o nacionalidad"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>

        {loading && <p className="status">Cargando actores...</p>}
        {error && <p className="status form-error">Error: {error}</p>}
        {!loading && !error && filtered.length === 0 && (
          <p className="status">No hay actores que coincidan.</p>
        )}

        <ul className="card-grid">
          {filtered.map((actor) => (
            <ActorCard key={actor.id} actor={actor} onDelete={handleDelete} />
          ))}
        </ul>
      </div>
    </div>
  );
}

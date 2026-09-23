'use client';

import Link from 'next/link';
import { useActors } from '../context/actors-context';

export default function ActoresPage() {
  const { actors, loading, error, removeActor } = useActors();

  if (loading) return <p className="page">Cargando actores...</p>;
  if (error) return <p className="page form-error">Error: {error}</p>;

  async function handleDelete(id) {
    if (!confirm('¿Eliminar este actor?')) return;
    await removeActor(id);
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Actores</h1>
        <Link href="/crear" className="button">+ Nuevo actor</Link>
      </div>

      {actors.length === 0 && <p>No hay actores registrados todavía.</p>}

      <ul className="actor-list">
        {actors.map((actor) => (
          <li key={actor.id} className="actor-card">
            {actor.photo && <img src={actor.photo} alt={actor.name} />}
            <div className="actor-info">
              <h2>{actor.name}</h2>
              <p className="actor-meta">
                {actor.nationality} · {new Date(actor.birthDate).toLocaleDateString()}
              </p>
              <p className="actor-bio">{actor.biography}</p>
              <div className="actor-actions">
                <Link href={`/editar/${actor.id}`}>Editar</Link>
                <button type="button" onClick={() => handleDelete(actor.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

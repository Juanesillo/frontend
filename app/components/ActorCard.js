'use client';

import Link from 'next/link';
import ActorPhoto from './ActorPhoto';

export default function ActorCard({ actor, onDelete }) {
  const year = new Date(actor.birthDate).getUTCFullYear();

  return (
    <li className="card">
      <Link href={`/editar/${actor.id}`} className="card-media">
        <ActorPhoto name={actor.name} photo={actor.photo} />
      </Link>
      <div className="card-body">
        <h3 className="card-title">{actor.name}</h3>
        <p className="card-subtitle">
          {actor.nationality} · {year}
        </p>
        {onDelete && (
          <>
            <p className="card-bio">{actor.biography}</p>
            <div className="card-actions">
              <Link href={`/editar/${actor.id}`} className="link">Editar</Link>
              <button type="button" className="link link--danger" onClick={() => onDelete(actor.id)}>
                Eliminar
              </button>
            </div>
          </>
        )}
      </div>
    </li>
  );
}

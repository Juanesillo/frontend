'use client';

import Link from 'next/link';
import ActorPhoto from './ActorPhoto';
import { formatDate } from '../../lib/format';

export default function MovieCard({ movie }) {
  const actor = movie.actors?.[0];
  const prize = movie.prizes?.[0];

  return (
    <li className="card">
      <Link href={`/movies/${movie.id}`} className="card-media">
        <ActorPhoto name={movie.title} photo={movie.poster} className="movie-poster" />
      </Link>
      <div className="card-body">
        <Link href={`/movies/${movie.id}`} className="card-title">{movie.title}</Link>
        <p className="card-subtitle">{formatDate(movie.releaseDate)}</p>
        <p className="card-subtitle">Actor: {actor ? actor.name : 'Sin actor'}</p>
        <p className="card-subtitle">Premio: {prize ? prize.name : 'Sin premio'}</p>
      </div>
    </li>
  );
}

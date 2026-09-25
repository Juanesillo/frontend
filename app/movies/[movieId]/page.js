'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ActorCard from '../../components/ActorCard';
import ActorPhoto from '../../components/ActorPhoto';
import { getMovie, getMoviePrizes } from '../../../lib/api';
import { formatDate } from '../../../lib/format';

const prizeStatus = { won: 'Ganado', nominated: 'Nominado' };

export default function DetallePeliculaPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // GET /movies/:id no incluye los premios; se piden a /movies/:id/prizes.
    Promise.all([getMovie(movieId), getMoviePrizes(movieId)])
      .then(([movieData, prizes]) => setMovie({ ...movieData, prizes }))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading || error || !movie) {
    return (
      <div className="view">
        <div className="view-content">
          {loading && <p className="status">Cargando película...</p>}
          {error && <p className="status form-error">Error: {error}</p>}
        </div>
      </div>
    );
  }

  const trailer = movie.youtubeTrailer;

  return (
    <div className="view">
      <div className="view-content">
        <section className="movie-detail">
          <div className="movie-detail-poster">
            <ActorPhoto name={movie.title} photo={movie.poster} className="movie-poster" />
          </div>

          <div>
            <p className="eyebrow">Película</p>
            <h1 className="view-title">{movie.title}</h1>

            <dl className="detail-list">
              <dt>Fecha de lanzamiento</dt>
              <dd>{formatDate(movie.releaseDate)}</dd>
              <dt>Duración</dt>
              <dd>{movie.duration} min</dd>
              <dt>País</dt>
              <dd>{movie.country}</dd>
              <dt>Popularidad</dt>
              <dd>{movie.popularity}</dd>
              <dt>Género</dt>
              <dd>{movie.genre?.type ?? '—'}</dd>
              <dt>Director</dt>
              <dd>{movie.director?.name ?? '—'}</dd>
              <dt>Trailer</dt>
              <dd>
                {trailer ? (
                  <a href={trailer.url} target="_blank" rel="noreferrer" className="section-link">
                    {trailer.name} · {trailer.channel} ({trailer.duration} min)
                  </a>
                ) : (
                  '—'
                )}
              </dd>
              <dt>Plataformas</dt>
              <dd>
                {movie.platforms?.length
                  ? movie.platforms.map((platform) => platform.name).join(', ')
                  : '—'}
              </dd>
            </dl>
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2>Actores</h2>
          </div>
          {movie.actors?.length ? (
            <ul className="card-grid">
              {movie.actors.map((actor) => (
                <ActorCard key={actor.id} actor={actor} />
              ))}
            </ul>
          ) : (
            <p className="status">Esta película no tiene actores.</p>
          )}
        </section>

        <section className="section">
          <div className="section-header">
            <h2>Premios</h2>
          </div>
          {movie.prizes?.length ? (
            <ul className="simple-list">
              {movie.prizes.map((prize) => (
                <li key={prize.id}>
                  <strong>{prize.name}</strong> · {prize.category} · {prize.year} ·{' '}
                  {prizeStatus[prize.status] ?? prize.status}
                </li>
              ))}
            </ul>
          ) : (
            <p className="status">Esta película no tiene premios.</p>
          )}
        </section>

        <section className="section">
          <div className="section-header">
            <h2>Reseñas</h2>
          </div>
          {movie.reviews?.length ? (
            <ul className="simple-list">
              {movie.reviews.map((review) => (
                <li key={review.id}>
                  <strong>{review.creator}</strong> · Puntaje: {review.score}
                  <p className="card-bio">{review.text}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="status">Esta película no tiene reseñas.</p>
          )}
        </section>
      </div>
    </div>
  );
}

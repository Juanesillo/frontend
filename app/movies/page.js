'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import MovieCard from '../components/MovieCard';
import { getMovies, getPrizes } from '../../lib/api';

export default function PeliculasPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // GET /movies no incluye los premios, pero GET /prizes trae cada premio con
    // sus películas, así que se cruzan ambas respuestas en el front.
    Promise.all([getMovies(), getPrizes()])
      .then(([movieList, prizeList]) => {
        const prizesByMovie = {};
        for (const prize of prizeList) {
          for (const movie of prize.movies ?? []) {
            (prizesByMovie[movie.id] ??= []).push(prize);
          }
        }
        setMovies(movieList.map((movie) => ({ ...movie, prizes: prizesByMovie[movie.id] ?? [] })));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="view">
      <div className="view-content">
        <header className="view-header">
          <p className="eyebrow">Colección</p>
          <h1 className="view-title">Películas</h1>
          {!loading && !error && <p className="view-meta">{movies.length} películas</p>}
        </header>

        <div className="toolbar">
          <Link href="/movies/crear" className="button button--small">Crear película</Link>
        </div>

        {loading && <p className="status">Cargando películas...</p>}
        {error && <p className="status form-error">Error: {error}</p>}
        {!loading && !error && movies.length === 0 && (
          <p className="status">No hay películas registradas.</p>
        )}

        <ul className="card-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      </div>
    </div>
  );
}

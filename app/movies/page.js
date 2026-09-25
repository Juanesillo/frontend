'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import MovieCard from '../components/MovieCard';
import { getMovies } from '../../lib/api';

export default function PeliculasPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMovies()
      .then(setMovies)
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

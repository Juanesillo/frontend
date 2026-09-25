'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import MovieForm from '../../components/MovieForm';
import { useActors } from '../../context/actors-context';
import {
  getGenres,
  getDirectors,
  createYoutubeTrailer,
  createMovie,
  addMovieToActor,
  createPrize,
  addPrizeToMovie,
} from '../../../lib/api';

export default function CrearPeliculaPage() {
  const { addActor } = useActors();
  const router = useRouter();

  const [genres, setGenres] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(null);

  // Entidades ya creadas: si un paso falla, al reintentar no se vuelven a crear.
  const created = useRef({});

  useEffect(() => {
    Promise.all([getGenres(), getDirectors()])
      .then(([genreList, directorList]) => {
        setGenres(genreList);
        setDirectors(directorList.sort((a, b) => a.name.localeCompare(b.name)));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function step(key, label, action) {
    if (created.current[key]) return created.current[key];
    setProgress(`${label}...`);
    try {
      const result = await action();
      created.current[key] = result ?? true;
      return result;
    } catch (err) {
      throw new Error(`Error ${label.toLowerCase()}: ${err.message}`);
    }
  }

  async function handleCreate({ movie, trailer, actor, prize }) {
    // La película exige un trailer propio (relación 1 a 1), por eso se crea primero.
    const newTrailer = await step('trailer', 'Creando trailer', () =>
      createYoutubeTrailer({ ...trailer, duration: Number(trailer.duration) }),
    );

    const newMovie = await step('movie', 'Creando película', () =>
      createMovie({
        title: movie.title,
        poster: movie.poster,
        duration: Number(movie.duration),
        country: movie.country,
        releaseDate: movie.releaseDate,
        popularity: Number(movie.popularity),
        genre: { id: movie.genreId },
        director: { id: movie.directorId },
        youtubeTrailer: { id: newTrailer.id },
      }),
    );

    const newActor = await step('actor', 'Creando actor', () => addActor(actor));

    await step('actorMovie', 'Asignando película al actor', () =>
      addMovieToActor(newActor.id, newMovie.id),
    );

    const newPrize = await step('prize', 'Creando premio', () =>
      createPrize({ ...prize, year: Number(prize.year) }),
    );

    await step('moviePrize', 'Asignando premio a la película', () =>
      addPrizeToMovie(newMovie.id, newPrize.id),
    );

    router.push(`/movies/${newMovie.id}`);
  }

  return (
    <div className="view">
      <div className="view-content">
        <header className="view-header">
          <p className="eyebrow">Nueva</p>
          <h1 className="view-title">Crear película</h1>
        </header>
        {loading && <p className="status">Cargando...</p>}
        {error && <p className="status form-error">Error: {error}</p>}
        {!loading && !error && (
          <MovieForm
            genres={genres}
            directors={directors}
            onSubmit={handleCreate}
            progress={progress}
          />
        )}
      </div>
    </div>
  );
}

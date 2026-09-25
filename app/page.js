'use client';

import Link from 'next/link';
import ActorCard from './components/ActorCard';
import { useActors } from './context/actors-context';

export default function Home() {
  const { actors, loading } = useActors();

  return (
    <div className="view">
      <div className="view-content">
        <section className="hero">
          <p className="eyebrow">Cine · Películas · Actores</p>
          <h1 className="hero-title">Arte7</h1>
          <p className="hero-text">
            Consulta las películas y crea, edita o elimina los actores de la plataforma.
          </p>
          <div className="hero-actions">
            <Link href="/movies" className="button">Ver películas</Link>
            <Link href="/actors" className="button button--outline">Ver actores</Link>
            <Link href="/crear" className="button button--outline">Crear actor</Link>
          </div>
        </section>

        {!loading && actors.length > 0 && (
          <section className="section">
            <div className="section-header">
              <h2>Recientes</h2>
              <Link href="/actors" className="section-link">Ver todos</Link>
            </div>
            <ul className="card-grid">
              {actors.slice(0, 6).map((actor) => (
                <ActorCard key={actor.id} actor={actor} />
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

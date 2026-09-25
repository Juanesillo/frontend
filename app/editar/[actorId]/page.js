'use client';

import { useParams, useRouter } from 'next/navigation';
import ActorForm from '../../components/ActorForm';
import { useActors } from '../../context/actors-context';

export default function EditarActorPage() {
  const { actorId } = useParams();
  const { getActorById, editActor, loading } = useActors();
  const router = useRouter();

  const actor = loading ? null : getActorById(actorId);

  async function handleUpdate(data) {
    await editActor(actorId, data);
    router.push('/actors');
  }

  return (
    <div className="view">
      <div className="view-content">
        <header className="view-header">
          <p className="eyebrow">Actor</p>
          <h1 className="view-title">{actor ? actor.name : 'Editar actor'}</h1>
        </header>
        {loading && <p className="status">Cargando...</p>}
        {!loading && !actor && <p className="status">No se encontró el actor.</p>}
        {actor && (
          <ActorForm initialData={actor} onSubmit={handleUpdate} submitLabel="Guardar" />
        )}
      </div>
    </div>
  );
}

'use client';

import { useParams, useRouter } from 'next/navigation';
import ActorForm from '../../components/ActorForm';
import { useActors } from '../../context/actors-context';

export default function EditarActorPage() {
  const { actorId } = useParams();
  const { getActorById, editActor, loading } = useActors();
  const router = useRouter();

  if (loading) return <p className="page">Cargando...</p>;

  const actor = getActorById(actorId);
  if (!actor) return <p className="page">No se encontró el actor.</p>;

  async function handleUpdate(data) {
    await editActor(actorId, data);
    router.push('/actors');
  }

  return (
    <div className="page">
      <h1>Editar actor</h1>
      <ActorForm initialData={actor} onSubmit={handleUpdate} submitLabel="Guardar cambios" />
    </div>
  );
}

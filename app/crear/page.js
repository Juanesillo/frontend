'use client';

import { useRouter } from 'next/navigation';
import ActorForm from '../components/ActorForm';
import { useActors } from '../context/actors-context';

export default function CrearActorPage() {
  const { addActor } = useActors();
  const router = useRouter();

  async function handleCreate(data) {
    await addActor(data);
    router.push('/actors');
  }

  return (
    <div className="page">
      <h1>Crear actor</h1>
      <ActorForm onSubmit={handleCreate} submitLabel="Crear actor" />
    </div>
  );
}

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
    <div className="view">
      <div className="view-content">
        <header className="view-header">
          <p className="eyebrow">Nuevo</p>
          <h1 className="view-title">Crear actor</h1>
        </header>
        <ActorForm onSubmit={handleCreate} submitLabel="Crear actor" />
      </div>
    </div>
  );
}

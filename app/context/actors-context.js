'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  getActors,
  createActor as apiCreateActor,
  updateActor as apiUpdateActor,
  deleteActor as apiDeleteActor,
} from '../../lib/api';

const ActorsContext = createContext(null);

export function ActorsProvider({ children }) {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getActors()
      .then(setActors)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const addActor = useCallback(async (actorData) => {
    const newActor = await apiCreateActor(actorData);
    setActors((prev) => [...prev, newActor]);
    return newActor;
  }, []);

  const editActor = useCallback(async (id, actorData) => {
    const updated = await apiUpdateActor(id, actorData);
    setActors((prev) => prev.map((actor) => (actor.id === id ? updated : actor)));
    return updated;
  }, []);

  const removeActor = useCallback(async (id) => {
    await apiDeleteActor(id);
    setActors((prev) => prev.filter((actor) => actor.id !== id));
  }, []);

  const getActorById = useCallback(
    (id) => actors.find((actor) => actor.id === id),
    [actors],
  );

  return (
    <ActorsContext.Provider
      value={{ actors, loading, error, addActor, editActor, removeActor, getActorById }}
    >
      {children}
    </ActorsContext.Provider>
  );
}

export function useActors() {
  const context = useContext(ActorsContext);
  if (!context) {
    throw new Error('useActors debe usarse dentro de un ActorsProvider');
  }
  return context;
}

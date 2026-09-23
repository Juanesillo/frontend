'use client';

import { useState } from 'react';

function toDateInputValue(value) {
  if (!value) return '';
  return String(value).slice(0, 10);
}

export default function ActorForm({ initialData, onSubmit, submitLabel = 'Guardar' }) {
  const [name, setName] = useState(initialData?.name || '');
  const [photo, setPhoto] = useState(initialData?.photo || '');
  const [nationality, setNationality] = useState(initialData?.nationality || '');
  const [birthDate, setBirthDate] = useState(toDateInputValue(initialData?.birthDate));
  const [biography, setBiography] = useState(initialData?.biography || '');

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError(null);
    setSubmitting(true);
    try {
      await onSubmit({ name, photo, nationality, birthDate, biography });
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="actor-form">
      <label>
        Nombre
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label>
        Foto (URL)
        <input
          type="url"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          required
        />
      </label>

      <label>
        Nacionalidad
        <input
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          required
        />
      </label>

      <label>
        Fecha de nacimiento
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
        />
      </label>

      <label>
        Biografía
        <textarea
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
          rows={4}
          required
        />
      </label>

      {formError && <p className="form-error">{formError}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Guardando...' : submitLabel}
      </button>
    </form>
  );
}

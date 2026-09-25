'use client';

import { useState } from 'react';
import ActorPhoto from './ActorPhoto';

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
      <div className="form-preview">
        <ActorPhoto key={photo} name={name} photo={photo} />
      </div>

      <div className="form-fields">
        <label className="field">
          <span>Nombre</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre del actor"
            required
          />
        </label>

        <label className="field">
          <span>Foto (URL)</span>
          <input
            type="url"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            placeholder="https://..."
            required
          />
        </label>

        <div className="field-row">
          <label className="field">
            <span>Nacionalidad</span>
            <input
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              placeholder="Colombia"
              required
            />
          </label>

          <label className="field">
            <span>Fecha de nacimiento</span>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
          </label>
        </div>

        <label className="field">
          <span>Biografía</span>
          <textarea
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            rows={5}
            placeholder="Agrega una biografía"
            required
          />
        </label>

        {formError && <p className="form-error">{formError}</p>}

        <div className="form-actions">
          <button type="submit" className="button" disabled={submitting}>
            {submitting ? 'Guardando...' : submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}

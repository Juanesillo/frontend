'use client';

import { useState } from 'react';

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');
}

// Tono estable por nombre, para que cada actor tenga siempre el mismo fondo.
// La saturación y luminosidad las pone el CSS según el tema (claro/oscuro).
function getHue(name = '') {
  let hash = 0;
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) % 360;
  return hash;
}

// Las URLs del seed vienen con http:// y dummyimage.com las redirige a https,
// así que se piden directamente por https. Sin URL o si falla la carga se
// muestran las iniciales.
function toHttps(url) {
  return url.trim().replace(/^http:\/\//, 'https://');
}

export default function ActorPhoto({ name, photo, className = '' }) {
  const [failed, setFailed] = useState(false);

  if (failed || !photo) {
    return (
      <div
        className={`actor-photo actor-photo--fallback ${className}`}
        style={name ? { '--hue': getHue(name) } : undefined}
        aria-label={name}
      >
        {name ? (
          <span>{getInitials(name)}</span>
        ) : (
          <svg viewBox="0 0 24 24" width="40%" height="40%" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zm0 2c-4.14 0-8 2.07-8 5v2h16v-2c0-2.93-3.86-5-8-5z"
            />
          </svg>
        )}
      </div>
    );
  }

  return (
    <img
      className={`actor-photo ${className}`}
      src={toHttps(photo)}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

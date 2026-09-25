'use client';

// El tema vive en <html data-theme="...">. El script de layout.js lo fija antes
// de pintar la página, así que aquí solo se alterna y se guarda la preferencia.
// El ícono que se ve lo decide el CSS, por eso el botón no necesita estado.
export default function ThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement;
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      // sin localStorage (modo privado) el tema solo dura esta visita
    }
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Cambiar entre modo claro y oscuro"
      title="Cambiar tema"
    >
      {/* Luna: se muestra en modo claro */}
      <svg className="theme-icon theme-icon--moon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path fill="currentColor" d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      {/* Sol: se muestra en modo oscuro */}
      <svg className="theme-icon theme-icon--sun" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" fill="currentColor" />
        <path
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
        />
      </svg>
    </button>
  );
}

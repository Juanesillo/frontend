import { Figtree } from "next/font/google";
import "./globals.css";
import { ActorsProvider } from "./context/actors-context";
import Link from "next/link";
import ThemeToggle from "./components/ThemeToggle";

// Se ejecuta antes de pintar para aplicar el tema guardado (o el del sistema)
// y así evitar un parpadeo del tema equivocado al cargar.
const themeScript = `
(function () {
  var theme;
  try { theme = localStorage.getItem('theme'); } catch (e) {}
  if (theme !== 'light' && theme !== 'dark') {
    theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  document.documentElement.dataset.theme = theme;
})();
`;

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata = {
  title: "Arte7",
  description: "Películas y actores de Arte7",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={figtree.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ActorsProvider>
          <header className="navbar">
            <Link href="/" className="brand">Arte7</Link>
            <nav className="nav-links">
              <Link href="/movies">Películas</Link>
              <Link href="/actors">Actores</Link>
              <Link href="/movies/crear">Crear película</Link>
              <Link href="/crear" className="button button--small">Crear actor</Link>
              <ThemeToggle />
            </nav>
          </header>
          <main>{children}</main>
        </ActorsProvider>
      </body>
    </html>
  );
}

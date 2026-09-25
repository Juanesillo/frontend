import { Figtree } from "next/font/google";
import "./globals.css";
import { ActorsProvider } from "./context/actors-context";
import Link from "next/link";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata = {
  title: "Arte7 - Actores",
  description: "CRUD de actores",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={figtree.variable}>
      <body>
        <ActorsProvider>
          <header className="navbar">
            <Link href="/" className="brand">Arte7</Link>
            <nav className="nav-links">
              <Link href="/actors">Actores</Link>
              <Link href="/crear" className="button button--small">Crear actor</Link>
            </nav>
          </header>
          <main>{children}</main>
        </ActorsProvider>
      </body>
    </html>
  );
}

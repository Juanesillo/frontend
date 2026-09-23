import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ActorsProvider } from "./context/actors-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Arte7 - Actores",
  description: "CRUD de actores",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ActorsProvider>
          <nav className="navbar">
            <Link href="/">Inicio</Link>
            <Link href="/actors">Actores</Link>
            <Link href="/crear">Crear actor</Link>
          </nav>
          <main>{children}</main>
        </ActorsProvider>
      </body>
    </html>
  );
}

import Link from "next/link";

export default function Home() {
  return (
    <div className="page">
      <h1>Arte7</h1>
      <p>CRUD de actores construido con Next.js, consumiendo /api/v1/actors.</p>
      <div className="actor-actions">
        <Link href="/actors" className="button">Ver actores</Link>
        <Link href="/crear" className="button">Crear actor</Link>
      </div>
    </div>
  );
}

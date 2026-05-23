import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Gestio</h1>
      <Link href="/registro">Ir al registro</Link>
      <Link href="/login">Login</Link>
    </div>
  );
}

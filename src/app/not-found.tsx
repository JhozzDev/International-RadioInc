import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-white bg-black gap-6">
      <h1 className="text-6xl font-bold text-purple-400">404</h1>
      <p className="text-gray-400">Página no encontrada</p>
      <Link href="/" className="bg-purple-700 px-6 py-3 rounded-xl hover:bg-purple-600 transition-colors">
        Volver al inicio
      </Link>
    </main>
  );
}

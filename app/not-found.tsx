import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] grid place-items-center px-4 py-16">
      <div className="text-center max-w-md">
        <p className="font-display text-7xl font-bold text-brand-700">404</p>
        <h1 className="mt-3 font-display text-2xl font-bold text-ink-900">Room not found</h1>
        <p className="mt-2 text-sm text-ink-500">
          We couldn't find the page you were looking for. But we have plenty of rooms — take a look.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Link href="/" className="btn-primary">Go Home</Link>
          <Link href="/rooms" className="btn-secondary">See Rooms & Tariff</Link>
        </div>
      </div>
    </div>
  );
}

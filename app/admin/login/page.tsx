import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export default function AdminLogin({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  if (isAdminAuthed()) redirect("/admin");

  return (
    <div className="min-h-screen grid place-items-center px-4">
      <div className="w-full max-w-md card p-6 sm:p-8">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 font-display text-lg font-bold text-white">R</span>
          <span className="font-display text-lg font-bold text-ink-900">RRR Residency</span>
        </Link>

        <h1 className="mt-6 font-display text-2xl font-bold text-ink-900">Admin sign in</h1>
        <p className="mt-1 text-sm text-ink-500">Enter the admin password to view & manage guest enquiries.</p>

        {searchParams?.error && (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            Wrong password. Try again.
          </p>
        )}

        <form action="/api/admin/login" method="post" className="mt-5 space-y-3">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-ink-700">Admin password</span>
            <input
              name="password"
              type="password"
              required
              autoFocus
              autoComplete="current-password"
              className="input"
              placeholder="••••••••"
            />
          </label>
          <button type="submit" className="btn-primary w-full">Sign in</button>
        </form>

        <p className="mt-5 text-xs text-ink-500">
          Forgot the password? Ask Rajkumar — it's set in the <code className="rounded bg-ink-100 px-1">ADMIN_PASSWORD</code> environment variable.
        </p>
      </div>
    </div>
  );
}

import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/adminAuth";
import AdminShell from "@/components/admin/AdminShell";
import { HOTEL } from "@/data/hotel";

export const dynamic = "force-dynamic";

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  if (!isAdminAuthed()) redirect("/admin/login");

  return (
    <>
      <style>{`
        .admin-root {
          --background: oklch(98.5% 0.005 250);
          --foreground: oklch(0.22 0.04 264);
          --card: oklch(1 0 0);
          --card-foreground: oklch(0.22 0.04 264);
          --primary: oklch(0.74 0.16 70);
          --primary-foreground: oklch(0.22 0.04 264);
          --secondary: oklch(0.96 0.01 250);
          --muted: oklch(0.96 0.005 250);
          --muted-foreground: oklch(0.55 0.02 250);
          --border: oklch(0.92 0.005 250);
          --ring: oklch(0.74 0.16 70);
          --radius: 0.65rem;
          color-scheme: light;
          font-family: var(--font-sans), Inter, ui-sans-serif, system-ui, sans-serif;
        }
        .admin-root .font-display {
          font-family: var(--font-display), "Playfair Display", Georgia, serif;
        }
        .admin-root input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.3);
          cursor: pointer;
        }
      `}</style>
      <AdminShell hotelName={HOTEL.name}>{children}</AdminShell>
    </>
  );
}

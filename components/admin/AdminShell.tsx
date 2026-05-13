"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  IndianRupee,
  CalendarX,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
};

const NAV: NavItem[] = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, description: "Summary & recent activity" },
  { href: "/admin/dashboard", label: "CRM · Leads", icon: Users, description: "Enquiries & bookings" },
  { href: "/admin/pricing", label: "Pricing", icon: IndianRupee, description: "Rates & surge rules" },
  { href: "/admin/inventory", label: "Inventory", icon: CalendarX, description: "Blackouts & cap" },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function AdminShell({
  children,
  hotelName,
}: {
  children: React.ReactNode;
  hotelName: string;
}) {
  const pathname = usePathname() ?? "";
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const current = NAV.find((n) => isActive(pathname, n.href));

  return (
    <div data-admin className="admin-root min-h-screen bg-slate-50 text-slate-900 antialiased">
      {/* Mobile top bar */}
      <div className="md:hidden sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-500 text-sm font-bold text-slate-950">R</span>
          <span className="font-semibold text-slate-900">{hotelName}</span>
        </Link>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="rounded-md p-2 text-slate-700 hover:bg-slate-100"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Sidebar (desktop fixed, mobile sheet) */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-[260px] flex-col border-r border-slate-200 bg-white transition-transform duration-200 md:flex md:translate-x-0",
          mobileOpen ? "flex translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="hidden md:flex items-center gap-2.5 px-5 py-5 border-b border-slate-200">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-500 font-bold text-slate-950 shadow-sm">R</span>
          <div className="leading-tight">
            <div className="font-semibold text-slate-900 text-[15px]">{hotelName}</div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Admin Console</div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            Manage
          </div>
          <ul className="space-y-1">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "group flex items-start gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                      active
                        ? "bg-amber-50 text-amber-900 ring-1 ring-amber-200"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <Icon
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0",
                        active ? "text-amber-600" : "text-slate-400 group-hover:text-slate-600"
                      )}
                    />
                    <div className="min-w-0">
                      <div className="font-medium leading-tight">{item.label}</div>
                      <div className={cn("mt-0.5 text-[11px] leading-tight", active ? "text-amber-700/80" : "text-slate-400")}>
                        {item.description}
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-slate-200 px-3 py-3 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
          >
            <ExternalLink className="h-4 w-4 text-slate-400" />
            View public site
          </Link>
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-rose-50 hover:text-rose-700"
            >
              <LogOut className="h-4 w-4 text-slate-400" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {mobileOpen && (
        <button
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-slate-900/30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main */}
      <div className="md:pl-[260px]">
        {/* Desktop topbar (breadcrumb) */}
        <header className="hidden md:flex sticky top-0 z-20 h-14 items-center justify-between border-b border-slate-200 bg-white/80 px-8 backdrop-blur">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-400">Admin</span>
            <span className="text-slate-300">/</span>
            <span className="font-medium text-slate-700">{current?.label ?? "Page"}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Online
            </span>
          </div>
        </header>

        <main className="px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}

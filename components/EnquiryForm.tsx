"use client";

import { useState, useEffect } from "react";
import { ROOM_TYPES } from "@/lib/leadSchema";
import { HOTEL, whatsappLink } from "@/data/hotel";

type Props = {
  defaultRoom?: (typeof ROOM_TYPES)[number];
  compact?: boolean;
  source?: string;
  title?: string;
  description?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

export default function EnquiryForm({
  defaultRoom = "Not Sure",
  compact = false,
  source,
  title = "Enquire / Book Now",
  description = "Fill this in 30 seconds — we'll confirm room availability on WhatsApp or call.",
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const [whatsappFallbackUrl, setWhatsappFallbackUrl] = useState<string>("");
  const [currentSource, setCurrentSource] = useState<string>(source || "");
  const [utm, setUtm] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!currentSource) setCurrentSource(window.location.pathname);
      const params = new URLSearchParams(window.location.search);
      const utmEntries: Record<string, string> = {};
      params.forEach((value, key) => {
        if (key.startsWith("utm_") || key === "gclid" || key === "fbclid") {
          utmEntries[key] = value;
        }
      });
      if (Object.keys(utmEntries).length) {
        setUtm(JSON.stringify(utmEntries));
      }
    }
  }, [currentSource]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Something went wrong. Please call us at +91 7760107529.");
        setStatus("error");

        const fallback = buildWhatsappFallback(payload as Record<string, string>);
        setWhatsappFallbackUrl(fallback);
        return;
      }

      const fallback = buildWhatsappFallback(payload as Record<string, string>);
      setWhatsappFallbackUrl(fallback);
      setStatus("success");
      form.reset();
    } catch {
      setError("Network error. Please call +91 7760107529 or message us on WhatsApp.");
      setStatus("error");
      const fallback = buildWhatsappFallback(payload as Record<string, string>);
      setWhatsappFallbackUrl(fallback);
    }
  }

  if (status === "success") {
    return (
      <div className="card p-6 sm:p-8 text-center animate-fade-in">
        <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-700">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h3 className="font-display text-2xl font-bold text-ink-900">Thank you! Enquiry received.</h3>
        <p className="mt-2 text-sm text-ink-500">
          We've saved your details. For instant confirmation, send us a quick WhatsApp or call now.
        </p>
        <div className="mt-5 flex flex-col sm:flex-row gap-2 justify-center">
          {whatsappFallbackUrl && (
            <a
              href={whatsappFallbackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-emerald-600 hover:bg-emerald-700"
            >
              Send WhatsApp
            </a>
          )}
          <a href={HOTEL.socials.callPrimaryLink} className="btn-secondary">
            Call +91 {HOTEL.contact.phonePrimary}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="card p-5 sm:p-6"
      aria-label="Hotel room enquiry form"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-ink-900">
            {title}
          </h3>
          <p className="mt-1 text-sm text-ink-500">{description}</p>
        </div>
        <span className="chip whitespace-nowrap">⚡ Instant reply</span>
      </div>

      <div className={compact ? "grid gap-3" : "grid gap-3 sm:grid-cols-2"}>
        <Field label="Your name" required>
          <input
            className="input"
            name="name"
            required
            placeholder="e.g. Rajesh Kumar"
            autoComplete="name"
          />
        </Field>
        <Field label="Phone number" required>
          <input
            className="input"
            name="phone"
            required
            inputMode="tel"
            placeholder="10-digit mobile"
            autoComplete="tel"
            pattern="[0-9+\s-]{10,15}"
          />
        </Field>

        <Field label="Email (optional)">
          <input
            className="input"
            type="email"
            name="email"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </Field>
        <Field label="Room type">
          <select className="input" name="roomType" defaultValue={defaultRoom}>
            {ROOM_TYPES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </Field>

        <Field label="Check-in">
          <input className="input" type="date" name="checkin" />
        </Field>
        <Field label="Check-out">
          <input className="input" type="date" name="checkout" />
        </Field>

        <Field label="Guests">
          <input
            className="input"
            type="number"
            name="guests"
            min={1}
            max={10}
            defaultValue={1}
          />
        </Field>
        <Field label="Anything else?">
          <input
            className="input"
            name="message"
            placeholder="Early check-in / hospital visit / late arrival..."
          />
        </Field>
      </div>

      <input type="hidden" name="source" value={currentSource} />
      <input type="hidden" name="utm" value={utm} />
      <input
        type="text"
        name="honeypot"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {error && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-5 flex flex-col sm:flex-row gap-2">
        <button
          type="submit"
          className="btn-primary flex-1"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending..." : "Send Enquiry"}
        </button>
        <a
          href={whatsappLink(
            `Hi RRR Residency, I'd like to enquire about a room.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary flex-1 bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100"
        >
          Or WhatsApp Us
        </a>
      </div>

      <p className="mt-3 text-[11px] text-ink-300 text-center">
        By submitting, you agree to be contacted on the phone/WhatsApp/email you provided. We never share your details.
      </p>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-ink-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      {children}
    </label>
  );
}

function buildWhatsappFallback(p: Record<string, string>) {
  const lines = [
    `Hi RRR Residency, I'd like to enquire about a room.`,
    p.name && `Name: ${p.name}`,
    p.phone && `Phone: ${p.phone}`,
    p.email && `Email: ${p.email}`,
    p.roomType && `Room: ${p.roomType}`,
    p.checkin && `Check-in: ${p.checkin}`,
    p.checkout && `Check-out: ${p.checkout}`,
    p.guests && `Guests: ${p.guests}`,
    p.message && `Notes: ${p.message}`,
  ]
    .filter(Boolean)
    .join("\n");
  return whatsappLink(lines);
}

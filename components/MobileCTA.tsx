import Link from "next/link";
import { HOTEL } from "@/data/hotel";

export default function MobileCTA() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-ink-900/10 bg-ink-950/95 backdrop-blur-md shadow-[0_-6px_24px_rgba(0,0,0,0.18)]">
      <div className="grid grid-cols-3 text-center">
        <a
          href={HOTEL.socials.callPrimaryLink}
          className="flex flex-col items-center justify-center gap-1 py-3 text-[10px] uppercase tracking-[0.16em] font-medium text-ink-50 hover:bg-ink-900"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-gold-300">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/>
          </svg>
          Call
        </a>
        <a
          href={HOTEL.socials.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-3 text-[10px] uppercase tracking-[0.16em] font-medium text-ink-50 hover:bg-ink-900"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-emerald-400">
            <path d="M20.52 3.48A11.95 11.95 0 0 0 12 0C5.37 0 .02 5.35.02 11.97c0 2.11.55 4.15 1.6 5.95L0 24l6.27-1.64a11.94 11.94 0 0 0 5.73 1.46h.01c6.62 0 11.97-5.35 11.97-11.97 0-3.2-1.25-6.2-3.46-8.37zM12 21.83h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.72.97.99-3.63-.23-.37a9.86 9.86 0 0 1-1.51-5.24c0-5.45 4.43-9.88 9.88-9.88 2.64 0 5.12 1.03 6.98 2.9a9.81 9.81 0 0 1 2.9 6.98c0 5.45-4.43 9.86-9.89 9.86zm5.42-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15s-.77.97-.95 1.17c-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.79-1.67-2.09-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.08-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.07 4.49.71.31 1.26.49 1.69.63.71.22 1.35.19 1.86.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.13-.27-.2-.57-.35z"/>
          </svg>
          WhatsApp
        </a>
        <Link
          href="/book"
          className="flex flex-col items-center justify-center gap-1 py-3 text-[10px] uppercase tracking-[0.16em] font-semibold text-ink-900 bg-gold-400 hover:bg-gold-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          Reserve
        </Link>
      </div>
    </div>
  );
}

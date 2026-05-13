const STROKE_PROPS = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export default function AmenityIcon({ name, className = "" }: { name: string; className?: string }) {
  const cls = `h-7 w-7 ${className}`;
  switch (name) {
    case "wifi":
      return (
        <svg className={cls} viewBox="0 0 24 24" {...STROKE_PROPS}>
          <path d="M5 12.55a11 11 0 0 1 14 0" />
          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <line x1="12" y1="20" x2="12.01" y2="20" />
        </svg>
      );
    case "shower":
      return (
        <svg className={cls} viewBox="0 0 24 24" {...STROKE_PROPS}>
          <path d="M3 21h18" />
          <path d="M12 3v6" />
          <path d="M7 9h10a5 5 0 0 1-10 0z" />
          <path d="M9 15v3M12 15v3M15 15v3" />
        </svg>
      );
    case "elevator":
      return (
        <svg className={cls} viewBox="0 0 24 24" {...STROKE_PROPS}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M9 8l3-3 3 3" />
          <path d="M9 16l3 3 3-3" />
        </svg>
      );
    case "parking":
      return (
        <svg className={cls} viewBox="0 0 24 24" {...STROKE_PROPS}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M9 17V7h4a3 3 0 1 1 0 6H9" />
        </svg>
      );
    case "bell":
      return (
        <svg className={cls} viewBox="0 0 24 24" {...STROKE_PROPS}>
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      );
    case "clock":
      return (
        <svg className={cls} viewBox="0 0 24 24" {...STROKE_PROPS}>
          <circle cx="12" cy="12" r="9" />
          <polyline points="12 7 12 12 15 14" />
        </svg>
      );
    case "ac":
      return (
        <svg className={cls} viewBox="0 0 24 24" {...STROKE_PROPS}>
          <rect x="3" y="5" width="18" height="10" rx="2" />
          <path d="M7 19l-1 2M12 19v2M17 19l1 2" />
          <path d="M7 11h10" />
        </svg>
      );
    case "broom":
      return (
        <svg className={cls} viewBox="0 0 24 24" {...STROKE_PROPS}>
          <path d="M19 4l-7 7" />
          <path d="M8 15l-5 5" />
          <path d="M14 9l5 5-3 5H8l-3-5z" />
        </svg>
      );
    case "heart":
      return (
        <svg className={cls} viewBox="0 0 24 24" {...STROKE_PROPS}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );
    case "globe":
      return (
        <svg className={cls} viewBox="0 0 24 24" {...STROKE_PROPS}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
      );
    case "no-smoke":
      return (
        <svg className={cls} viewBox="0 0 24 24" {...STROKE_PROPS}>
          <rect x="3" y="14" width="18" height="4" rx="1" />
          <line x1="3" y1="3" x2="21" y2="21" />
        </svg>
      );
    case "lock":
      return (
        <svg className={cls} viewBox="0 0 24 24" {...STROKE_PROPS}>
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 1 1 8 0v4" />
        </svg>
      );
    default:
      return (
        <svg className={cls} viewBox="0 0 24 24" {...STROKE_PROPS}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
  }
}

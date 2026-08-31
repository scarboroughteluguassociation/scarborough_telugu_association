export function ThoranamDivider() {
  return (
    <svg
      viewBox="0 0 400 32"
      preserveAspectRatio="xMidYMin slice"
      className="h-8 w-full text-saffron"
      aria-hidden="true"
    >
      <defs>
        <pattern id="thoranam" width="40" height="32" patternUnits="userSpaceOnUse">
          <line x1="0" y1="2" x2="40" y2="2" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
          <path d="M0,2 a20,20 0 0 0 40,0" fill="currentColor" opacity="0.85" />
          <circle cx="20" cy="18" r="2.5" className="fill-gold" />
        </pattern>
      </defs>
      <rect width="400" height="32" fill="url(#thoranam)" />
    </svg>
  );
}

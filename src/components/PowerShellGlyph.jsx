export default function PowerShellGlyph({ compact = false }) {
  return (
    <svg
      className={compact ? 'ps-glyph ps-glyph-compact' : 'ps-glyph'}
      viewBox="0 0 320 220"
      role="img"
      aria-label="PowerShell-inspired graphic"
    >
      <defs>
        <linearGradient id="ps-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0078d4" />
          <stop offset="100%" stopColor="#012456" />
        </linearGradient>
      </defs>
      <rect x="8" y="10" width="304" height="200" rx="34" fill="url(#ps-grad)" />
      <path d="M85 64L170 110L86 158" fill="none" stroke="#ffffff" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="182" y1="152" x2="246" y2="152" stroke="#ffffff" strokeWidth="16" strokeLinecap="round" />
    </svg>
  );
}

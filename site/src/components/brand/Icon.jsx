// Brand icon set: line-based, uniform 1.5 stroke, no fill (Brand Book p17).
// Colour comes from currentColor: Articella Blue on light, white on blue.
const paths = {
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" />,
  message: <path d="M4 5h16v11H9l-5 4V5Z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-5.7-7-11a7 7 0 0 1 14 0c0 5.3-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M3.5 10h17" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  heart: <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.5a4.3 4.3 0 0 1 7.5 2.3C19.5 15.4 12 20 12 20Z" />,
  pulse: <path d="M3 12h4l2-5 4 10 2-5h6" />,
  shield: <path d="M12 3 5 6v5.5c0 4.4 3 7.8 7 9.5 4-1.7 7-5.1 7-9.5V6l-7-3Z" />,
  shieldCheck: (
    <>
      <path d="M12 3 5 6v5.5c0 4.4 3 7.8 7 9.5 4-1.7 7-5.1 7-9.5V6l-7-3Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <circle cx="17" cy="9.5" r="2.4" />
      <path d="M16.5 14.2A4.6 4.6 0 0 1 21 19" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  clipboard: (
    <>
      <rect x="6" y="4.5" width="12" height="16" rx="2" />
      <path d="M9.5 4.5h5v2h-5zM9 11h6M9 15h4" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="6.5" width="12.5" height="11" rx="2" />
      <path d="m15.5 11 5.5-3v8l-5.5-3" />
    </>
  ),
  file: (
    <>
      <path d="M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10.5A.5.5 0 0 1 6.5 20V4a.5.5 0 0 1 .5-.5Z" />
      <path d="M14 3.5V8h4M9 13h6M9 16.5h4" />
    </>
  ),
  idCard: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <circle cx="9" cy="11" r="2" />
      <path d="M6.5 15.5a2.8 2.8 0 0 1 5 0M14 10h4M14 13.5h3" />
    </>
  ),
  pill: (
    <>
      <rect x="3.5" y="9" width="17" height="6" rx="3" transform="rotate(-35 12 12)" />
      <path d="m9.2 9.2 5.6 5.6" />
    </>
  ),
  leaf: <path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14M5 19l7-7" />,
  stethoscope: (
    <>
      <path d="M6 3.5v6a4 4 0 0 0 8 0v-6" />
      <path d="M10 13.5v1.5a4.5 4.5 0 0 0 9 0v-2" />
      <circle cx="19" cy="11" r="2" />
    </>
  ),
  external: (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4 10.5 13.5" />
      <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </>
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M16.8 7.2h.01" />
    </>
  ),
  linkedin: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 10.5V16M8 8h.01M11.5 16v-3.2a2.3 2.3 0 0 1 4.5 0V16M11.5 10.5V16" />
    </>
  ),
  facebook: <path d="M14 21v-8h2.6l.4-3H14V8.3C14 7.4 14.3 7 15.4 7H17V4.2A20 20 0 0 0 14.7 4C12.4 4 11 5.4 11 7.8V10H8.5v3H11v8" />,
  send: <path d="M4 12 20 4l-4 16-4.5-6.5L4 12Z" />,
  refresh: (
    <>
      <path d="M20 11a8 8 0 0 0-14.5-4M4 13a8 8 0 0 0 14.5 4" />
      <path d="M5.5 3v4h4M18.5 21v-4h-4" />
    </>
  ),
  bookOpen: (
    <>
      <path d="M12 6.5C10 5 7 4.5 4 5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V5c-3-.5-6 0-8 1.5Z" />
      <path d="M12 6.5v13" />
    </>
  ),
  card: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3 10h18M7 15h3" />
    </>
  ),
}

export default function Icon({ name, size = 24, strokeWidth = 1.5, className = "", title }) {
  const p = paths[name]
  if (!p) return null
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {p}
    </svg>
  )
}

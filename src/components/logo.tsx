export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 25 13.5 7h5L29 25h-5.5l-2.2-4H10.7l-2.2 4H3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M16 12v13M10 17h12" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

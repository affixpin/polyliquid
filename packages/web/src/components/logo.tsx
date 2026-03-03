export function Logo({ className = "", size = 24 }: { className?: string; size?: number }) {
  const width = size;
  const height = size;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g transform="translate(10,10)" stroke="currentColor" strokeWidth="3" fill="none">
        <line x1="0" y1="0" x2="10" y2="10" />
        <line x1="0" y1="15" x2="8" y2="15" />
        <line x1="0" y1="30" x2="10" y2="20" />
        <circle cx="15" cy="15" r="5" fill="currentColor" stroke="none" />
        <line x1="22" y1="15" x2="32" y2="15" />
        <path d="M29 10 L32 15 L29 20" />
      </g>
    </svg>
  );
}

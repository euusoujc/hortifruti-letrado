import type { IconeProps } from './IconeProps';

export function Melancia({ size = 96, className }: IconeProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 46 A38 38 0 0 1 88 46 Z"
        fill="#4C8C4A"
      />
      <path
        d="M18 46 A32 32 0 0 1 82 46 Z"
        fill="#F5F1E3"
      />
      <path
        d="M24 46 A26 26 0 0 1 76 46 Z"
        fill="#D94F3D"
      />
      <circle cx="42" cy="38" r="2.4" fill="#2E2013" />
      <circle cx="58" cy="38" r="2.4" fill="#2E2013" />
      <circle cx="50" cy="30" r="2.4" fill="#2E2013" />
    </svg>
  );
}

import type { IconeProps } from './IconeProps';

export function Tomate({ size = 96, className }: IconeProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <circle cx="50" cy="58" r="30" fill="#D94F3D" />
      <path
        d="M50 30 C50 44 44 48 40 44 M50 30 C50 44 56 48 60 44"
        stroke="#B23A2B"
        strokeWidth="2"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M50 30 L42 20 L50 24 L58 20 L50 30 Z M50 30 L36 22 L44 28 M50 30 L64 22 L56 28"
        fill="#4C8C4A"
      />
    </svg>
  );
}

import type { IconeProps } from './IconeProps';

export function Cebola({ size = 96, className }: IconeProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <path
        d="M50 30 C68 34 76 52 68 68 C62 82 38 82 32 68 C24 52 32 34 50 30 Z"
        fill="#E7CBB0"
      />
      <path
        d="M50 30 C58 40 58 56 50 70 M50 30 C42 40 42 56 50 70"
        stroke="#C9A47C"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M50 30 C48 22 50 14 54 8"
        stroke="#4C8C4A"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

import type { IconeProps } from './IconeProps';

export function Abobora({ size = 96, className }: IconeProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="50" cy="60" rx="36" ry="26" fill="#E8863A" />
      <path
        d="M50 34 L50 86 M32 36 C28 48 28 72 32 84 M68 36 C72 48 72 72 68 84"
        stroke="#C96A21"
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M48 34 C46 24 50 18 56 16"
        stroke="#7A4A2B"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M56 16 C64 12 70 16 68 22 C60 24 56 22 56 16 Z" fill="#4C8C4A" />
    </svg>
  );
}

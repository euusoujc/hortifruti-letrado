import type { IconeProps } from './IconeProps';

export function Maca({ size = 96, className }: IconeProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <path
        d="M50 38 C40 26 20 28 15 46 C10 66 26 88 44 88 C48 88 46 84 50 84 C54 84 52 88 56 88 C74 88 90 66 85 46 C80 28 60 26 50 38 Z"
        fill="#D94F3D"
      />
      <path
        d="M50 38 C40 26 20 28 15 46 C10 66 26 88 44 88 C48 88 46 84 50 84"
        fill="none"
      />
      <path
        d="M50 38 C46 30 48 22 52 16"
        stroke="#7A4A2B"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M52 20 C60 14 68 16 70 24 C62 28 54 26 52 20 Z"
        fill="#4C8C4A"
      />
      <ellipse cx="34" cy="52" rx="7" ry="10" fill="#F0897A" opacity="0.6" />
    </svg>
  );
}

import type { IconeProps } from './IconeProps';

export function Banana({ size = 96, className }: IconeProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <path
        d="M22 30 C18 50 26 74 50 82 C68 88 82 78 84 66 C74 76 58 76 46 66 C32 55 28 40 30 26 Z"
        fill="#F2C14E"
      />
      <path
        d="M22 30 C18 50 26 74 50 82"
        fill="none"
        stroke="#D9A62E"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M82 60 C86 62 88 66 84 66 C80 68 76 66 74 62 Z"
        fill="#7A4A2B"
      />
      <path
        d="M22 30 C22 24 26 20 30 26"
        fill="#7A4A2B"
      />
    </svg>
  );
}

import type { IconeProps } from './IconeProps';

export function Alface({ size = 96, className }: IconeProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <path
        d="M50 30 C62 28 72 36 72 48 C82 50 84 62 76 68 C80 76 74 86 64 84 C60 90 48 90 44 84 C34 86 26 78 30 70 C20 68 18 56 28 50 C26 40 36 30 50 30 Z"
        fill="#6BAE5C"
      />
      <path
        d="M50 34 C48 44 50 54 56 60 M40 40 C42 48 42 56 38 62 M60 40 C64 46 66 54 62 62 M34 58 C40 60 46 64 48 70 M62 62 C58 66 56 72 58 78"
        stroke="#4C8C4A"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M50 30 C40 30 32 36 30 44 C36 38 44 36 50 38 C56 36 64 38 70 44 C68 36 60 30 50 30 Z"
        fill="#8BC97D"
        opacity="0.8"
      />
    </svg>
  );
}

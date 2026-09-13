import type { IconeProps } from './IconeProps';

export function Laranja({ size = 96, className }: IconeProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <clipPath id="laranja-recorte">
          <circle cx="50" cy="54" r="34" />
        </clipPath>
      </defs>
      <circle cx="50" cy="54" r="34" fill="#E8863A" />
      <g clipPath="url(#laranja-recorte)">
        <path
          d="M50 20 L50 88 M18 54 L82 54 M27 31 L73 77 M73 31 L27 77"
          stroke="#C96A21"
          strokeWidth="2"
          opacity="0.4"
        />
      </g>
      <path
        d="M48 20 C48 14 52 10 58 10 C56 16 54 20 48 20 Z"
        fill="#4C8C4A"
      />
    </svg>
  );
}

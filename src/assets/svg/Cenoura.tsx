import type { IconeProps } from './IconeProps';

export function Cenoura({ size = 96, className }: IconeProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <path
        d="M46 34 L54 34 L58 80 C58 88 42 88 42 80 Z"
        fill="#E8863A"
      />
      <path d="M44 44 L56 44" stroke="#C96A21" strokeWidth="2" opacity="0.5" />
      <path d="M45 56 L55 56" stroke="#C96A21" strokeWidth="2" opacity="0.5" />
      <path d="M46 68 L54 68" stroke="#C96A21" strokeWidth="2" opacity="0.5" />
      <path
        d="M50 34 L40 14 L48 24 L50 10 L52 24 L60 14 Z"
        fill="#4C8C4A"
      />
    </svg>
  );
}

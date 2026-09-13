import type { IconeProps } from './IconeProps';

export function Batata({ size = 96, className }: IconeProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <path
        d="M24 52 C16 40 26 24 42 24 C50 24 52 30 60 28 C74 24 86 36 82 50 C90 58 86 74 72 76 C64 84 48 82 42 74 C28 74 18 64 24 52 Z"
        fill="#C99A66"
      />
      <ellipse cx="40" cy="46" rx="3" ry="2" fill="#8A6642" opacity="0.7" />
      <ellipse cx="62" cy="42" rx="3" ry="2" fill="#8A6642" opacity="0.7" />
      <ellipse cx="56" cy="62" rx="3" ry="2" fill="#8A6642" opacity="0.7" />
    </svg>
  );
}

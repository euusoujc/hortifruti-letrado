import type { IconeProps } from './IconeProps';

export function Uva({ size = 96, className }: IconeProps) {
  const bagas = [
    [50, 34],
    [38, 46],
    [62, 46],
    [30, 60],
    [50, 60],
    [70, 60],
    [40, 74],
    [60, 74],
  ] as const;
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <path
        d="M50 30 C46 20 48 14 54 8"
        stroke="#7A4A2B"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M54 10 C62 6 70 10 70 18 C62 20 56 16 54 10 Z" fill="#4C8C4A" />
      {bagas.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="11" fill="#7B5EA7" />
      ))}
    </svg>
  );
}

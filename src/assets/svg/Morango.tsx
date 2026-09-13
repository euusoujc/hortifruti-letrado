import type { IconeProps } from './IconeProps';

export function Morango({ size = 96, className }: IconeProps) {
  const sementes = [
    [40, 44],
    [58, 44],
    [34, 58],
    [50, 58],
    [64, 58],
    [42, 72],
    [56, 72],
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
        d="M50 38 C30 38 18 52 22 66 C26 80 40 90 50 90 C60 90 74 80 78 66 C82 52 70 38 50 38 Z"
        fill="#D94F3D"
      />
      <path
        d="M50 34 L38 20 L50 26 L62 20 L50 34 Z"
        fill="#4C8C4A"
      />
      {sementes.map(([cx, cy]) => (
        <ellipse
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          rx="1.6"
          ry="2.6"
          fill="#F2C14E"
        />
      ))}
    </svg>
  );
}

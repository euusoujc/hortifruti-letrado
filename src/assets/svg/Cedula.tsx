interface CedulaProps {
  valor: string;
  cor?: string;
  size?: number;
  className?: string;
}

export function Cedula({ valor, cor = '#4C8C4A', size = 64, className }: CedulaProps) {
  const altura = size * 0.5;
  return (
    <svg
      viewBox="0 0 140 70"
      width={size}
      height={altura}
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="136" height="66" rx="10" fill={cor} stroke="#00000022" strokeWidth="2" />
      <circle cx="35" cy="35" r="18" fill="#ffffff" opacity="0.25" />
      <text
        x="95"
        y="42"
        fontSize="22"
        fontWeight="800"
        textAnchor="middle"
        fill="#fff"
      >
        {valor}
      </text>
    </svg>
  );
}

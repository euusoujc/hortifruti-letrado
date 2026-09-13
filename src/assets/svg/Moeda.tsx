interface MoedaProps {
  valor: string;
  size?: number;
  className?: string;
}

export function Moeda({ valor, size = 44, className }: MoedaProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="46" fill="#E5C55B" stroke="#C9A227" strokeWidth="4" />
      <circle cx="50" cy="50" r="35" fill="none" stroke="#C9A227" strokeWidth="2" opacity="0.6" />
      <text
        x="50"
        y="58"
        fontSize="22"
        fontWeight="800"
        textAnchor="middle"
        fill="#7A5E10"
      >
        {valor}
      </text>
    </svg>
  );
}

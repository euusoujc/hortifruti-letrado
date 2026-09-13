export type HumorMascote = 'neutro' | 'feliz' | 'triste';

export interface MascoteProps {
  humor?: HumorMascote;
  size?: number;
  className?: string;
}

export function Mascote({ humor = 'feliz', size = 120, className }: MascoteProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={`Mascote da feira, humor ${humor}`}
    >
      <ellipse cx="60" cy="112" rx="34" ry="6" fill="#3B2A1E" opacity="0.12" />

      <path
        d="M28 78 C28 100 40 112 60 112 C80 112 92 100 92 78 L88 66 L32 66 Z"
        fill="#4C8C4A"
      />
      <rect x="46" y="72" width="28" height="22" rx="4" fill="#F2C14E" />

      <circle cx="60" cy="46" r="30" fill="#E8B98A" />

      <path
        d="M30 44 C30 22 90 22 90 44 C82 34 38 34 30 44 Z"
        fill="#C96A21"
      />
      <path d="M28 42 C28 36 92 36 92 42 L92 34 L28 34 Z" fill="#E8863A" />

      {humor === 'feliz' && (
        <>
          <circle cx="48" cy="46" r="3.4" fill="#3B2A1E" />
          <circle cx="72" cy="46" r="3.4" fill="#3B2A1E" />
          <path
            d="M46 58 C52 66 68 66 74 58"
            stroke="#3B2A1E"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </>
      )}

      {humor === 'neutro' && (
        <>
          <circle cx="48" cy="46" r="3.4" fill="#3B2A1E" />
          <circle cx="72" cy="46" r="3.4" fill="#3B2A1E" />
          <path
            d="M48 60 L72 60"
            stroke="#3B2A1E"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      )}

      {humor === 'triste' && (
        <>
          <circle cx="48" cy="47" r="3.4" fill="#3B2A1E" />
          <circle cx="72" cy="47" r="3.4" fill="#3B2A1E" />
          <path
            d="M42 42 L52 45 M78 42 L68 45"
            stroke="#3B2A1E"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M48 64 C54 58 66 58 72 64"
            stroke="#3B2A1E"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </>
      )}

    </svg>
  );
}

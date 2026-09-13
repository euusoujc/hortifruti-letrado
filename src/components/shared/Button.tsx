import type { ButtonHTMLAttributes } from 'react';
import { playClique } from '../../audio/sfx';
import './Button.css';

type Variante = 'primaria' | 'secundaria' | 'fantasma';

interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante;
}

export function Button({
  variante = 'primaria',
  className,
  onClick,
  children,
  ...resto
}: BotaoProps) {
  return (
    <button
      className={`botao botao--${variante} ${className ?? ''}`.trim()}
      onClick={(evento) => {
        playClique();
        onClick?.(evento);
      }}
      {...resto}
    >
      {children}
    </button>
  );
}

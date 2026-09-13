import './Tile.css';

export type EstadoTile = 'vazio' | 'atual' | 'correta' | 'presente' | 'ausente';

interface TileProps {
  letra?: string;
  estado?: EstadoTile;
  atraso?: number;
}

const REVELAM = new Set(['correta', 'presente', 'ausente']);

export function Tile({ letra, estado = 'vazio', atraso = 0 }: TileProps) {
  const revelar = REVELAM.has(estado);
  return (
    <div
      className={`tile tile--${estado} ${revelar ? 'tile--revelar' : ''}`.trim()}
      style={revelar ? { animationDelay: `${atraso}s` } : undefined}
    >
      {letra}
    </div>
  );
}

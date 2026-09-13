import { FruitIcon } from '../../assets/svg/FruitIcon';
import type { EstadoOpcao } from './OpcaoTile';
import './OpcaoImagemTile.css';

interface OpcaoImagemTileProps {
  itemId: string;
  estado: EstadoOpcao;
  desabilitada?: boolean;
  onSelecionar: () => void;
}

export function OpcaoImagemTile({
  itemId,
  estado,
  desabilitada,
  onSelecionar,
}: OpcaoImagemTileProps) {
  const classeAnimacao =
    estado === 'correta' ? 'animar-acerto' : estado === 'errada' ? 'animar-erro' : '';

  return (
    <button
      type="button"
      className={`opcao-imagem-tile ${classeAnimacao}`.trim()}
      onClick={onSelecionar}
      disabled={desabilitada}
    >
      <FruitIcon itemId={itemId} size={72} />
    </button>
  );
}

import './OpcaoTile.css';

export type EstadoOpcao = 'neutro' | 'correta' | 'errada';

interface OpcaoTileProps {
  texto: string;
  estado: EstadoOpcao;
  desabilitada?: boolean;
  onSelecionar: () => void;
}

export function OpcaoTile({
  texto,
  estado,
  desabilitada,
  onSelecionar,
}: OpcaoTileProps) {
  const classeAnimacao =
    estado === 'correta' ? 'animar-acerto' : estado === 'errada' ? 'animar-erro' : '';

  return (
    <button
      type="button"
      className={`opcao-tile ${classeAnimacao}`.trim()}
      onClick={onSelecionar}
      disabled={desabilitada}
    >
      {texto}
    </button>
  );
}

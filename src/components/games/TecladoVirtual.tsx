import './TecladoVirtual.css';

const LINHAS = ['QWERTYUIOP', 'ASDFGHJKLÇ', 'ZXCVBNM'];
const ACENTOS = ['Á', 'Â', 'Ã', 'À', 'É', 'Ê', 'Í', 'Ó', 'Ô', 'Õ', 'Ú'];

export type EstadoTecla = 'correta' | 'presente' | 'ausente' | undefined;

interface TecladoVirtualProps {
  estadoTeclas: Record<string, EstadoTecla>;
  onLetra: (letra: string) => void;
  onEnter: () => void;
  onApagar: () => void;
  desabilitado?: boolean;
}

export function TecladoVirtual({
  estadoTeclas,
  onLetra,
  onEnter,
  onApagar,
  desabilitado,
}: TecladoVirtualProps) {
  return (
    <div className="teclado">
      {LINHAS.map((linha, indiceLinha) => (
        <div className="teclado__linha" key={linha}>
          {indiceLinha === 2 && (
            <button
              type="button"
              className="teclado__tecla teclado__tecla--especial"
              onClick={onEnter}
              disabled={desabilitado}
            >
              Enviar
            </button>
          )}
          {linha.split('').map((letra) => (
            <button
              type="button"
              key={letra}
              className={`teclado__tecla teclado__tecla--${estadoTeclas[letra] ?? 'neutro'}`}
              onClick={() => onLetra(letra)}
              disabled={desabilitado}
            >
              {letra}
            </button>
          ))}
          {indiceLinha === 2 && (
            <button
              type="button"
              className="teclado__tecla teclado__tecla--especial"
              onClick={onApagar}
              disabled={desabilitado}
              aria-label="Apagar letra"
            >
              ⌫
            </button>
          )}
        </div>
      ))}
      <div className="teclado__linha teclado__linha--acentos">
        {ACENTOS.map((letra) => (
          <button
            type="button"
            key={letra}
            className={`teclado__tecla teclado__tecla--acento teclado__tecla--${estadoTeclas[letra] ?? 'neutro'}`}
            onClick={() => onLetra(letra)}
            disabled={desabilitado}
          >
            {letra}
          </button>
        ))}
      </div>
    </div>
  );
}

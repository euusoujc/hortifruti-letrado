import './Hud.css';

interface HudProps {
  titulo: string;
  onVoltar?: () => void;
  somAtivado: boolean;
  onAlternarSom: () => void;
  progressoRodadas?: { total: number; atual: number };
}

export function Hud({
  titulo,
  onVoltar,
  somAtivado,
  onAlternarSom,
  progressoRodadas,
}: HudProps) {
  return (
    <header className="hud">
      <div className="hud__linha">
        {onVoltar ? (
          <button
            type="button"
            className="hud__icone"
            onClick={onVoltar}
            aria-label="Voltar ao mapa"
          >
            ←
          </button>
        ) : (
          <span className="hud__icone hud__icone--espaco" />
        )}
        <h1 className="hud__titulo">{titulo}</h1>
        <button
          type="button"
          className="hud__icone"
          onClick={onAlternarSom}
          aria-label={somAtivado ? 'Desativar som' : 'Ativar som'}
        >
          {somAtivado ? '🔊' : '🔇'}
        </button>
      </div>
      {progressoRodadas && (
        <div className="hud__pontos" aria-hidden="true">
          {Array.from({ length: progressoRodadas.total }).map((_, i) => (
            <span
              key={i}
              className={`hud__ponto ${i <= progressoRodadas.atual ? 'hud__ponto--ativo' : ''}`}
            />
          ))}
        </div>
      )}
    </header>
  );
}

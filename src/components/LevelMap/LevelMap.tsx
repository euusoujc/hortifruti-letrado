import type { Fase } from '../../data/fases';
import type { ProgressoFase } from '../../state/useProgress';
import { FruitIcon } from '../../assets/svg/FruitIcon';
import { Moeda } from '../../assets/svg/Moeda';
import './LevelMap.css';

export interface FaseComEstado {
  fase: Fase;
  desbloqueada: boolean;
  progresso: ProgressoFase;
}

interface LevelMapProps {
  fasesComEstado: FaseComEstado[];
  onSelecionarFase: (faseId: string) => void;
}

export function LevelMap({ fasesComEstado, onSelecionarFase }: LevelMapProps) {
  return (
    <div className="mapa-fases">
      {fasesComEstado.map(({ fase, desbloqueada, progresso }, indice) => (
        <div className="mapa-fases__item" key={fase.id}>
          <button
            type="button"
            className={`mapa-fases__no ${desbloqueada ? '' : 'mapa-fases__no--bloqueado'}`}
            onClick={() => desbloqueada && onSelecionarFase(fase.id)}
            disabled={!desbloqueada}
            aria-label={`${fase.titulo}${desbloqueada ? '' : ' (bloqueada)'}`}
          >
            {desbloqueada ? (
              fase.itemIds[0] ? (
                <FruitIcon itemId={fase.itemIds[0]} size={56} />
              ) : (
                <Moeda valor="R$" size={52} />
              )
            ) : (
              <span className="mapa-fases__cadeado">🔒</span>
            )}
          </button>
          <div className="mapa-fases__info">
            <span className="mapa-fases__numero">Fase {indice + 1}</span>
            <strong className="mapa-fases__titulo">{fase.titulo}</strong>
            <span className="mapa-fases__descricao">{fase.descricao}</span>
            {progresso.completa && (
              <span className="mapa-fases__estrelas" aria-hidden="true">
                {'⭐'.repeat(progresso.estrelas)}
                {'☆'.repeat(3 - progresso.estrelas)}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

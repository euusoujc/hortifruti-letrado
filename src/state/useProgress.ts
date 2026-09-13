import { useCallback, useState } from 'react';
import { FASES, type Fase } from '../data/fases';

const CHAVE_PROGRESSO = 'hortifruti-progresso-v1';

export interface ProgressoFase {
  completa: boolean;
  estrelas: number;
}

export type Progresso = Record<string, ProgressoFase>;

function carregarProgresso(): Progresso {
  if (typeof window === 'undefined') return {};
  try {
    const bruto = window.localStorage.getItem(CHAVE_PROGRESSO);
    return bruto ? (JSON.parse(bruto) as Progresso) : {};
  } catch {
    return {};
  }
}

function salvarProgresso(progresso: Progresso): void {
  window.localStorage.setItem(CHAVE_PROGRESSO, JSON.stringify(progresso));
}

export function faseDesbloqueada(fase: Fase, progresso: Progresso): boolean {
  return fase.requisitos.every((id) => progresso[id]?.completa);
}

export function useProgress() {
  const [progresso, setProgresso] = useState<Progresso>(carregarProgresso);

  const registrarConclusaoFase = useCallback(
    (faseId: string, estrelas: number) => {
      setProgresso((atual) => {
        const anterior = atual[faseId];
        const proximo: Progresso = {
          ...atual,
          [faseId]: {
            completa: true,
            estrelas: Math.max(estrelas, anterior?.estrelas ?? 0),
          },
        };
        salvarProgresso(proximo);
        return proximo;
      });
    },
    [],
  );

  const reiniciarProgresso = useCallback(() => {
    setProgresso({});
    window.localStorage.removeItem(CHAVE_PROGRESSO);
  }, []);

  const fasesComEstado = FASES.map((fase) => ({
    fase,
    desbloqueada: faseDesbloqueada(fase, progresso),
    progresso: progresso[fase.id] ?? { completa: false, estrelas: 0 },
  }));

  return { progresso, fasesComEstado, registrarConclusaoFase, reiniciarProgresso };
}

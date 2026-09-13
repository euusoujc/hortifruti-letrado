import { useMemo, useState } from 'react';
import type { Fase, TipoRodada } from '../data/fases';
import { obterItem } from '../data/items';
import { Hud } from '../components/Hud/Hud';
import { AssociacaoGame } from '../components/games/AssociacaoGame';
import { AssociacaoImagemGame } from '../components/games/AssociacaoImagemGame';
import { OrtografiaGame } from '../components/games/OrtografiaGame';
import { TermoGame } from '../components/games/TermoGame';
import { MemoriaDinheiroGame } from '../components/games/MemoriaDinheiroGame';
import { Mascote } from '../assets/mascote/Mascote';
import { Button } from '../components/shared/Button';
import { calcularEstrelas } from '../utils/estrelas';
import './FaseScreen.css';

const RODADA_INFO: Record<TipoRodada, { titulo: string }> = {
  associacao: { titulo: 'Associação' },
  'associacao-invertida': { titulo: 'Associação' },
  ortografia: { titulo: 'Correção Ortográfica' },
  termo: { titulo: 'Termo da Horta' },
  'memoria-dinheiro': { titulo: 'Jogo da Memória' },
};

interface FaseScreenProps {
  fase: Fase;
  somAtivado: boolean;
  onAlternarSom: () => void;
  onSair: () => void;
  onFinalizar: (estrelas: number) => void;
}

export function FaseScreen({
  fase,
  somAtivado,
  onAlternarSom,
  onSair,
  onFinalizar,
}: FaseScreenProps) {
  const itens = useMemo(() => fase.itemIds.map(obterItem), [fase]);
  const [rodadaIndex, setRodadaIndex] = useState(0);
  const [errosAcumulados, setErrosAcumulados] = useState(0);
  const [transicao, setTransicao] = useState<string | null>(null);

  const tipoRodadaAtual = fase.rodadas[rodadaIndex];
  const infoAtual = RODADA_INFO[tipoRodadaAtual];

  function tratarConclusaoRodada(erros: number) {
    const totalErros = errosAcumulados + erros;
    setErrosAcumulados(totalErros);

    if (rodadaIndex + 1 < fase.rodadas.length) {
      const proximoTitulo = RODADA_INFO[fase.rodadas[rodadaIndex + 1]].titulo;
      setTransicao(`Muito bem! Agora vamos para: ${proximoTitulo}!`);
    } else {
      onFinalizar(calcularEstrelas(totalErros));
    }
  }

  function continuarProximaRodada() {
    setTransicao(null);
    setRodadaIndex((atual) => atual + 1);
  }

  return (
    <div className="tela">
      <div className="tela-conteudo">
        <Hud
          titulo={`${fase.titulo} · ${infoAtual.titulo}`}
          onVoltar={onSair}
          somAtivado={somAtivado}
          onAlternarSom={onAlternarSom}
          progressoRodadas={{ total: fase.rodadas.length, atual: rodadaIndex }}
        />

        {transicao ? (
          <div className="fase-transicao">
            <Mascote humor="feliz" size={100} />
            <p>{transicao}</p>
            <Button variante="primaria" onClick={continuarProximaRodada}>
              Continuar
            </Button>
          </div>
        ) : (
          <>
            {tipoRodadaAtual === 'associacao' && (
              <AssociacaoGame itens={itens} onRoundComplete={tratarConclusaoRodada} />
            )}
            {tipoRodadaAtual === 'associacao-invertida' && (
              <AssociacaoImagemGame itens={itens} onRoundComplete={tratarConclusaoRodada} />
            )}
            {tipoRodadaAtual === 'ortografia' && (
              <OrtografiaGame itens={itens} onRoundComplete={tratarConclusaoRodada} />
            )}
            {tipoRodadaAtual === 'termo' && (
              <TermoGame itens={itens} onRoundComplete={tratarConclusaoRodada} />
            )}
            {tipoRodadaAtual === 'memoria-dinheiro' && (
              <MemoriaDinheiroGame onRoundComplete={tratarConclusaoRodada} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

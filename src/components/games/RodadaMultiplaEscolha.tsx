import { useEffect, useMemo, useState } from 'react';
import type { Item } from '../../data/items';
import { FruitIcon } from '../../assets/svg/FruitIcon';
import { OpcaoTile } from '../shared/OpcaoTile';
import { playAcerto, playErro, playRodadaCompleta } from '../../audio/sfx';
import { falarPalavra, isLeituraDisponivel } from '../../audio/speech';
import './RodadaMultiplaEscolha.css';

function embaralhar<T>(lista: T[]): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

interface RodadaMultiplaEscolhaProps {
  itens: Item[];
  instrucao: string;
  onRoundComplete: (erros: number) => void;
}

export function RodadaMultiplaEscolha({
  itens,
  instrucao,
  onRoundComplete,
}: RodadaMultiplaEscolhaProps) {
  const ordem = useMemo(() => embaralhar(itens), [itens]);
  const [indice, setIndice] = useState(0);
  const [erros, setErros] = useState(0);
  const [desabilitadas, setDesabilitadas] = useState<Set<string>>(new Set());
  const [correta, setCorreta] = useState<string | null>(null);

  const itemAtual = ordem[indice];

  const opcoes = useMemo(() => {
    if (!itemAtual) return [];
    return embaralhar([itemAtual.nome, ...itemAtual.distratores]);
  }, [itemAtual]);

  useEffect(() => {
    setDesabilitadas(new Set());
    setCorreta(null);
  }, [indice]);

  if (!itemAtual) return null;

  function selecionar(opcao: string) {
    if (correta) return;
    if (opcao === itemAtual.nome) {
      playAcerto();
      setCorreta(opcao);
      if (isLeituraDisponivel()) falarPalavra(itemAtual.nome);
      window.setTimeout(() => {
        if (indice + 1 < ordem.length) {
          setIndice(indice + 1);
        } else {
          playRodadaCompleta();
          onRoundComplete(erros);
        }
      }, 700);
    } else {
      playErro();
      setErros((atual) => atual + 1);
      setDesabilitadas((atual) => new Set(atual).add(opcao));
    }
  }

  return (
    <div className="rodada-multipla">
      <p className="rodada-multipla__instrucao">{instrucao}</p>
      <div className="rodada-multipla__imagem">
        <FruitIcon itemId={itemAtual.id} size={140} />
      </div>
      <div className="rodada-multipla__opcoes">
        {opcoes.map((opcao) => {
          const estado =
            opcao === correta
              ? 'correta'
              : desabilitadas.has(opcao)
                ? 'errada'
                : 'neutro';
          return (
            <OpcaoTile
              key={opcao}
              texto={opcao}
              estado={estado}
              desabilitada={desabilitadas.has(opcao) || correta !== null}
              onSelecionar={() => selecionar(opcao)}
            />
          );
        })}
      </div>
      <p className="rodada-multipla__progresso">
        Item {indice + 1} de {ordem.length}
      </p>
    </div>
  );
}

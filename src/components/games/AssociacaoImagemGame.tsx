import { useEffect, useMemo, useState } from 'react';
import type { Item } from '../../data/items';
import { OpcaoImagemTile } from '../shared/OpcaoImagemTile';
import { playAcerto, playClique, playErro, playRodadaCompleta } from '../../audio/sfx';
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

interface AssociacaoImagemGameProps {
  itens: Item[];
  onRoundComplete: (erros: number) => void;
}

export function AssociacaoImagemGame({ itens, onRoundComplete }: AssociacaoImagemGameProps) {
  const ordem = useMemo(() => embaralhar(itens), [itens]);
  const [indice, setIndice] = useState(0);
  const [erros, setErros] = useState(0);
  const [desabilitadas, setDesabilitadas] = useState<Set<string>>(new Set());
  const [correta, setCorreta] = useState<string | null>(null);

  const itemAtual = ordem[indice];

  const opcoes = useMemo(() => {
    if (!itemAtual) return [];
    const outros = itens.filter((i) => i.id !== itemAtual.id);
    const distratores = embaralhar(outros).slice(0, Math.min(2, outros.length));
    return embaralhar([itemAtual, ...distratores]);
  }, [itemAtual, itens]);

  useEffect(() => {
    setDesabilitadas(new Set());
    setCorreta(null);
    if (itemAtual && isLeituraDisponivel()) falarPalavra(itemAtual.nome);
  }, [indice, itemAtual]);

  if (!itemAtual) return null;

  function ouvirPalavra() {
    playClique();
    if (isLeituraDisponivel()) falarPalavra(itemAtual.nome);
  }

  function selecionar(id: string) {
    if (correta) return;
    if (id === itemAtual.id) {
      playAcerto();
      setCorreta(id);
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
      setDesabilitadas((atual) => new Set(atual).add(id));
    }
  }

  return (
    <div className="rodada-multipla">
      <p className="rodada-multipla__instrucao">
        Toque na palavra para ouvir e encontre a imagem certa:
      </p>
      <button type="button" className="palavra-clicavel" onClick={ouvirPalavra}>
        🔊 {itemAtual.nome}
      </button>
      <div className="rodada-multipla__opcoes rodada-multipla__opcoes--imagens">
        {opcoes.map((opcao) => {
          const estado =
            opcao.id === correta
              ? 'correta'
              : desabilitadas.has(opcao.id)
                ? 'errada'
                : 'neutro';
          return (
            <OpcaoImagemTile
              key={opcao.id}
              itemId={opcao.id}
              estado={estado}
              desabilitada={desabilitadas.has(opcao.id) || correta !== null}
              onSelecionar={() => selecionar(opcao.id)}
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

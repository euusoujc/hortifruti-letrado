import { useEffect, useMemo, useState } from 'react';
import type { Item } from '../../data/items';
import { FruitIcon } from '../../assets/svg/FruitIcon';
import { Tile, type EstadoTile } from '../shared/Tile';
import { TecladoVirtual, type EstadoTecla } from './TecladoVirtual';
import { Button } from '../shared/Button';
import { playAcerto, playErro, playRodadaCompleta } from '../../audio/sfx';
import { falarPalavra, isLeituraDisponivel } from '../../audio/speech';
import './TermoGame.css';

function embaralhar<T>(lista: T[]): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function tentativasPermitidas(tamanho: number): number {
  if (tamanho <= 5) return 5;
  if (tamanho <= 7) return 6;
  return 7;
}

type EstadoLetra = 'correta' | 'presente' | 'ausente';

function calcularFeedback(tentativa: string, alvo: string): EstadoLetra[] {
  const resultado: EstadoLetra[] = new Array(alvo.length).fill('ausente');
  const restante = alvo.split('');

  for (let i = 0; i < tentativa.length; i += 1) {
    if (tentativa[i] === alvo[i]) {
      resultado[i] = 'correta';
      restante[i] = '_';
    }
  }
  for (let i = 0; i < tentativa.length; i += 1) {
    if (resultado[i] === 'correta') continue;
    const indice = restante.indexOf(tentativa[i]);
    if (indice !== -1) {
      resultado[i] = 'presente';
      restante[indice] = '_';
    }
  }
  return resultado;
}

interface TermoGameProps {
  itens: Item[];
  onRoundComplete: (erros: number) => void;
}

export function TermoGame({ itens, onRoundComplete }: TermoGameProps) {
  const ordem = useMemo(() => embaralhar(itens), [itens]);
  const [indice, setIndice] = useState(0);
  const [tentativas, setTentativas] = useState<string[]>([]);
  const [tentativaAtual, setTentativaAtual] = useState('');
  const [erros, setErros] = useState(0);
  const [resolvido, setResolvido] = useState<'acertou' | 'esgotou' | null>(null);

  const itemAtual = ordem[indice];
  const alvo = itemAtual ? itemAtual.nome.toUpperCase() : '';
  const maxTentativas = itemAtual ? tentativasPermitidas(alvo.length) : 0;

  useEffect(() => {
    setTentativas([]);
    setTentativaAtual('');
    setResolvido(null);
  }, [indice]);

  const feedbacks = useMemo(
    () => tentativas.map((t) => calcularFeedback(t, alvo)),
    [tentativas, alvo],
  );

  const estadoTeclas = useMemo(() => {
    const mapa: Record<string, EstadoTecla> = {};
    const prioridade: Record<'ausente' | 'presente' | 'correta', number> = {
      ausente: 0,
      presente: 1,
      correta: 2,
    };
    tentativas.forEach((tentativa, i) => {
      tentativa.split('').forEach((letra, j) => {
        const estado = feedbacks[i][j];
        const atual = mapa[letra];
        if (!atual || prioridade[estado] > prioridade[atual]) {
          mapa[letra] = estado;
        }
      });
    });
    return mapa;
  }, [tentativas, feedbacks]);

  if (!itemAtual) return null;

  function adicionarLetra(letra: string) {
    if (resolvido) return;
    if (tentativaAtual.length >= alvo.length) return;
    setTentativaAtual((atual) => atual + letra);
  }

  function apagarLetra() {
    if (resolvido) return;
    setTentativaAtual((atual) => atual.slice(0, -1));
  }

  function enviarTentativa() {
    if (resolvido) return;
    if (tentativaAtual.length !== alvo.length) return;

    const novasTentativas = [...tentativas, tentativaAtual];
    setTentativas(novasTentativas);

    if (tentativaAtual === alvo) {
      playAcerto();
      if (isLeituraDisponivel()) falarPalavra(itemAtual.nome);
      setResolvido('acertou');
    } else {
      playErro();
      setErros((atual) => atual + 1);
      if (novasTentativas.length >= maxTentativas) {
        setResolvido('esgotou');
      } else {
        setTentativaAtual('');
      }
    }
  }

  function proximoItem() {
    if (indice + 1 < ordem.length) {
      setIndice(indice + 1);
    } else {
      playRodadaCompleta();
      onRoundComplete(erros);
    }
  }

  const linhasVazias = Math.max(
    0,
    maxTentativas - tentativas.length - (resolvido ? 0 : 1),
  );

  return (
    <div className="termo-game">
      <p className="termo-game__instrucao">
        Descubra o nome deste item da horta:
      </p>
      <div className="termo-game__imagem">
        <FruitIcon itemId={itemAtual.id} size={110} />
      </div>

      <div className="termo-game__tabuleiro">
        {tentativas.map((tentativa, i) => (
          <div className="termo-game__linha" key={`enviada-${i}`}>
            {tentativa.split('').map((letra, j) => (
              <Tile
                key={j}
                letra={letra}
                estado={feedbacks[i][j] as EstadoTile}
                atraso={j * 0.12}
              />
            ))}
          </div>
        ))}

        {!resolvido && (
          <div className="termo-game__linha">
            {Array.from({ length: alvo.length }).map((_, j) => (
              <Tile
                key={j}
                letra={tentativaAtual[j]}
                estado={tentativaAtual[j] ? 'atual' : 'vazio'}
              />
            ))}
          </div>
        )}

        {Array.from({ length: linhasVazias }).map((_, i) => (
          <div className="termo-game__linha" key={`vazia-${i}`}>
            {Array.from({ length: alvo.length }).map((_, j) => (
              <Tile key={j} />
            ))}
          </div>
        ))}
      </div>

      {resolvido ? (
        <div className="termo-game__resultado">
          <p>
            {resolvido === 'acertou'
              ? 'Muito bem! A palavra é:'
              : 'Não foi dessa vez. A palavra é:'}{' '}
            <strong>{itemAtual.nome}</strong>
          </p>
          <Button variante="primaria" onClick={proximoItem}>
            Continuar
          </Button>
        </div>
      ) : (
        <TecladoVirtual
          estadoTeclas={estadoTeclas}
          onLetra={adicionarLetra}
          onEnter={enviarTentativa}
          onApagar={apagarLetra}
        />
      )}

      <p className="termo-game__progresso">
        Palavra {indice + 1} de {ordem.length}
      </p>
    </div>
  );
}

import { useEffect, useMemo, useState } from 'react';
import { PARES_DINHEIRO, type ParDinheiro } from '../../data/dinheiro';
import { CartaDinheiroConteudo } from './CartaDinheiroConteudo';
import { Moeda } from '../../assets/svg/Moeda';
import { playAcerto, playErro, playRodadaCompleta } from '../../audio/sfx';
import './MemoriaDinheiroGame.css';

interface Carta {
  id: string;
  parId: string;
  tipo: 'valor' | 'quantidade';
  par: ParDinheiro;
}

function embaralhar<T>(lista: T[]): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

interface MemoriaDinheiroGameProps {
  onRoundComplete: (erros: number) => void;
}

export function MemoriaDinheiroGame({ onRoundComplete }: MemoriaDinheiroGameProps) {
  const cartas = useMemo<Carta[]>(() => {
    const todas = PARES_DINHEIRO.flatMap((par) => [
      { id: `${par.id}-valor`, parId: par.id, tipo: 'valor' as const, par },
      { id: `${par.id}-qtd`, parId: par.id, tipo: 'quantidade' as const, par },
    ]);
    return embaralhar(todas);
  }, []);

  const [viradas, setViradas] = useState<string[]>([]);
  const [combinadas, setCombinadas] = useState<Set<string>>(new Set());
  const [erros, setErros] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);
  const [finalizado, setFinalizado] = useState(false);

  useEffect(() => {
    if (viradas.length !== 2) return;
    setBloqueado(true);
    const [idA, idB] = viradas;
    const cartaA = cartas.find((c) => c.id === idA);
    const cartaB = cartas.find((c) => c.id === idB);
    const acertou = cartaA && cartaB && cartaA.parId === cartaB.parId;

    if (acertou) {
      playAcerto();
      const temporizador = window.setTimeout(() => {
        setCombinadas((atual) => {
          const proximo = new Set(atual);
          proximo.add(idA);
          proximo.add(idB);
          return proximo;
        });
        setViradas([]);
        setBloqueado(false);
      }, 500);
      return () => window.clearTimeout(temporizador);
    }

    playErro();
    setErros((atual) => atual + 1);
    const temporizador = window.setTimeout(() => {
      setViradas([]);
      setBloqueado(false);
    }, 900);
    return () => window.clearTimeout(temporizador);
  }, [viradas, cartas]);

  useEffect(() => {
    if (cartas.length > 0 && combinadas.size === cartas.length && !finalizado) {
      setFinalizado(true);
      playRodadaCompleta();
      window.setTimeout(() => onRoundComplete(erros), 900);
    }
  }, [combinadas, cartas.length, finalizado, erros, onRoundComplete]);

  function virar(id: string) {
    if (bloqueado || viradas.includes(id) || combinadas.has(id)) return;
    if (viradas.length >= 2) return;
    setViradas((atual) => [...atual, id]);
  }

  return (
    <div className="memoria-dinheiro">
      <p className="memoria-dinheiro__instrucao">
        Encontre os pares: o valor e a quantidade certa de moedas ou cédulas.
      </p>
      <div className="memoria-grid">
        {cartas.map((carta) => {
          const virada = viradas.includes(carta.id) || combinadas.has(carta.id);
          const combinada = combinadas.has(carta.id);
          return (
            <button
              key={carta.id}
              type="button"
              className={`memoria-carta ${virada ? 'memoria-carta--virada' : ''} ${combinada ? 'memoria-carta--combinada' : ''}`.trim()}
              onClick={() => virar(carta.id)}
              disabled={virada || bloqueado}
            >
              {virada ? (
                <CartaDinheiroConteudo par={carta.par} tipo={carta.tipo} />
              ) : (
                <Moeda valor="$" size={40} className="memoria-carta__verso" />
              )}
            </button>
          );
        })}
      </div>
      <p className="memoria-dinheiro__progresso">
        Pares encontrados: {combinadas.size / 2} de {cartas.length / 2}
      </p>
    </div>
  );
}

import type { Item } from '../../data/items';
import { RodadaMultiplaEscolha } from './RodadaMultiplaEscolha';

interface AssociacaoGameProps {
  itens: Item[];
  onRoundComplete: (erros: number) => void;
}

export function AssociacaoGame({ itens, onRoundComplete }: AssociacaoGameProps) {
  return (
    <RodadaMultiplaEscolha
      itens={itens}
      instrucao="Qual é o nome deste item?"
      onRoundComplete={onRoundComplete}
    />
  );
}

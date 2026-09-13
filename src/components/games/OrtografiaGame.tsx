import type { Item } from '../../data/items';
import { RodadaMultiplaEscolha } from './RodadaMultiplaEscolha';

interface OrtografiaGameProps {
  itens: Item[];
  onRoundComplete: (erros: number) => void;
}

export function OrtografiaGame({ itens, onRoundComplete }: OrtografiaGameProps) {
  return (
    <RodadaMultiplaEscolha
      itens={itens}
      instrucao="Qual é a grafia correta?"
      onRoundComplete={onRoundComplete}
    />
  );
}

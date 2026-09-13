export type TipoRodada =
  | 'associacao'
  | 'associacao-invertida'
  | 'ortografia'
  | 'termo'
  | 'memoria-dinheiro';

export interface Fase {
  id: string;
  titulo: string;
  descricao: string;
  itemIds: string[];
  /** Sequência de atividades desta fase. */
  rodadas: TipoRodada[];
  /** IDs de fases que precisam estar completas para esta desbloquear. */
  requisitos: string[];
}

export const FASES: Fase[] = [
  {
    id: 'frutas',
    titulo: 'Frutas do dia a dia',
    descricao: 'Associe, corrija e escreva o nome das frutas da barraca.',
    itemIds: ['maca', 'banana', 'laranja', 'uva', 'melancia', 'morango'],
    rodadas: ['associacao', 'ortografia', 'termo'],
    requisitos: [],
  },
  {
    id: 'verduras',
    titulo: 'Verduras e Legumes',
    descricao: 'Ouça a palavra e encontre a imagem certa da verdura ou legume.',
    itemIds: ['cenoura', 'batata', 'alface', 'tomate', 'cebola', 'abobora'],
    rodadas: ['associacao-invertida', 'ortografia', 'termo'],
    requisitos: [],
  },
  {
    id: 'dinheiro',
    titulo: 'Dinheiro da Feira',
    descricao: 'Descubra quantas moedas e cédulas formam cada valor.',
    itemIds: [],
    rodadas: ['memoria-dinheiro'],
    requisitos: [],
  },
];

export function obterFase(id: string): Fase {
  const fase = FASES.find((f) => f.id === id);
  if (!fase) throw new Error(`Fase desconhecida: ${id}`);
  return fase;
}

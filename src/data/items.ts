export type Categoria = 'fruta' | 'verdura' | 'legume';

export interface Item {
  id: string;
  nome: string;
  categoria: Categoria;
  /** Grafias parecidas e erradas, usadas como distratores nos jogos. */
  distratores: string[];
}

export const ITENS: Record<string, Item> = {
  maca: {
    id: 'maca',
    nome: 'MAÇÃ',
    categoria: 'fruta',
    distratores: ['MASSÃ', 'MAÇÃN'],
  },
  banana: {
    id: 'banana',
    nome: 'BANANA',
    categoria: 'fruta',
    distratores: ['VANANA', 'BALANA'],
  },
  laranja: {
    id: 'laranja',
    nome: 'LARANJA',
    categoria: 'fruta',
    distratores: ['RARANJA', 'LARANJIA'],
  },
  uva: {
    id: 'uva',
    nome: 'UVA',
    categoria: 'fruta',
    distratores: ['ÚVA', 'UBA'],
  },
  melancia: {
    id: 'melancia',
    nome: 'MELANCIA',
    categoria: 'fruta',
    distratores: ['MELANSIA', 'MERANCIA'],
  },
  morango: {
    id: 'morango',
    nome: 'MORANGO',
    categoria: 'fruta',
    distratores: ['MOLANGO', 'MORANGU'],
  },
  cenoura: {
    id: 'cenoura',
    nome: 'CENOURA',
    categoria: 'legume',
    distratores: ['SENOURA', 'CENOIRA'],
  },
  batata: {
    id: 'batata',
    nome: 'BATATA',
    categoria: 'legume',
    distratores: ['VATATA', 'BATABA'],
  },
  alface: {
    id: 'alface',
    nome: 'ALFACE',
    categoria: 'verdura',
    distratores: ['AUFACE', 'ALFASSE'],
  },
  tomate: {
    id: 'tomate',
    nome: 'TOMATE',
    categoria: 'legume',
    distratores: ['DOMATE', 'TOMATI'],
  },
  cebola: {
    id: 'cebola',
    nome: 'CEBOLA',
    categoria: 'legume',
    distratores: ['SEBOLA', 'CEVOLA'],
  },
  abobora: {
    id: 'abobora',
    nome: 'ABÓBORA',
    categoria: 'legume',
    distratores: ['ABÓBERA', 'AVÓBORA'],
  },
};

export function obterItem(id: string): Item {
  const item = ITENS[id];
  if (!item) throw new Error(`Item desconhecido: ${id}`);
  return item;
}

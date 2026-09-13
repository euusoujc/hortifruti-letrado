import type { ReactElement } from 'react';
import type { IconeProps } from './IconeProps';
import { Maca } from './Maca';
import { Banana } from './Banana';
import { Laranja } from './Laranja';
import { Uva } from './Uva';
import { Melancia } from './Melancia';
import { Morango } from './Morango';
import { Cenoura } from './Cenoura';
import { Batata } from './Batata';
import { Alface } from './Alface';
import { Tomate } from './Tomate';
import { Cebola } from './Cebola';
import { Abobora } from './Abobora';

const REGISTRO: Record<string, (props: IconeProps) => ReactElement> = {
  maca: Maca,
  banana: Banana,
  laranja: Laranja,
  uva: Uva,
  melancia: Melancia,
  morango: Morango,
  cenoura: Cenoura,
  batata: Batata,
  alface: Alface,
  tomate: Tomate,
  cebola: Cebola,
  abobora: Abobora,
};

export interface FruitIconProps extends IconeProps {
  itemId: string;
}

export function FruitIcon({ itemId, ...resto }: FruitIconProps) {
  const Componente = REGISTRO[itemId];
  if (!Componente) return null;
  return <Componente {...resto} />;
}

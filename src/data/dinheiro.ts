export interface ParDinheiro {
  id: string;
  valorLabel: string;
  quantidadeLabel: string;
  quantidadeNumero: number;
  denominacaoLabel: string;
  tipoDenominacao: 'moeda' | 'cedula';
  corCedula?: string;
}

export const PARES_DINHEIRO: ParDinheiro[] = [
  {
    id: 'par-2',
    valorLabel: 'R$ 2,00',
    quantidadeLabel: '2 moedas de R$ 1,00',
    quantidadeNumero: 2,
    denominacaoLabel: 'R$1',
    tipoDenominacao: 'moeda',
  },
  {
    id: 'par-5',
    valorLabel: 'R$ 5,00',
    quantidadeLabel: '5 moedas de R$ 1,00',
    quantidadeNumero: 5,
    denominacaoLabel: 'R$1',
    tipoDenominacao: 'moeda',
  },
  {
    id: 'par-10',
    valorLabel: 'R$ 10,00',
    quantidadeLabel: '2 cédulas de R$ 5,00',
    quantidadeNumero: 2,
    denominacaoLabel: 'R$5',
    tipoDenominacao: 'cedula',
    corCedula: '#8E6FA8',
  },
  {
    id: 'par-20',
    valorLabel: 'R$ 20,00',
    quantidadeLabel: '4 cédulas de R$ 5,00',
    quantidadeNumero: 4,
    denominacaoLabel: 'R$5',
    tipoDenominacao: 'cedula',
    corCedula: '#8E6FA8',
  },
  {
    id: 'par-50',
    valorLabel: 'R$ 50,00',
    quantidadeLabel: '5 cédulas de R$ 10,00',
    quantidadeNumero: 5,
    denominacaoLabel: 'R$10',
    tipoDenominacao: 'cedula',
    corCedula: '#D9534F',
  },
  {
    id: 'par-100',
    valorLabel: 'R$ 100,00',
    quantidadeLabel: '2 cédulas de R$ 50,00',
    quantidadeNumero: 2,
    denominacaoLabel: 'R$50',
    tipoDenominacao: 'cedula',
    corCedula: '#4AA3C7',
  },
];

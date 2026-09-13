export function calcularEstrelas(erros: number): number {
  if (erros === 0) return 3;
  if (erros <= 3) return 2;
  return 1;
}

import { useCallback, useState } from 'react';
import { isSomAtivado, setSomAtivado } from '../audio/sfx';

export function useSound() {
  const [somAtivado, setSomAtivadoState] = useState(isSomAtivado);

  const alternarSom = useCallback(() => {
    setSomAtivadoState((atual) => {
      const proximo = !atual;
      setSomAtivado(proximo);
      return proximo;
    });
  }, []);

  return { somAtivado, alternarSom };
}

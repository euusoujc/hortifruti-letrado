import { useState } from 'react';
import { useProgress } from './state/useProgress';
import { useSound } from './state/useSound';
import { obterFase } from './data/fases';
import { HomeScreen } from './screens/HomeScreen';
import { FaseScreen } from './screens/FaseScreen';
import { ResultScreen } from './screens/ResultScreen';

type Tela =
  | { tipo: 'mapa' }
  | { tipo: 'fase'; faseId: string }
  | { tipo: 'resultado'; faseId: string; estrelas: number };

export default function App() {
  const [tela, setTela] = useState<Tela>({ tipo: 'mapa' });
  const { fasesComEstado, registrarConclusaoFase } = useProgress();
  const { somAtivado, alternarSom } = useSound();

  if (tela.tipo === 'fase') {
    const fase = obterFase(tela.faseId);
    return (
      <FaseScreen
        fase={fase}
        somAtivado={somAtivado}
        onAlternarSom={alternarSom}
        onSair={() => setTela({ tipo: 'mapa' })}
        onFinalizar={(estrelas) => {
          registrarConclusaoFase(fase.id, estrelas);
          setTela({ tipo: 'resultado', faseId: fase.id, estrelas });
        }}
      />
    );
  }

  if (tela.tipo === 'resultado') {
    const fase = obterFase(tela.faseId);
    return (
      <ResultScreen
        faseTitulo={fase.titulo}
        estrelas={tela.estrelas}
        onVoltarMapa={() => setTela({ tipo: 'mapa' })}
        onJogarNovamente={() => setTela({ tipo: 'fase', faseId: fase.id })}
      />
    );
  }

  return (
    <HomeScreen
      fasesComEstado={fasesComEstado}
      somAtivado={somAtivado}
      onAlternarSom={alternarSom}
      onSelecionarFase={(faseId) => setTela({ tipo: 'fase', faseId })}
    />
  );
}

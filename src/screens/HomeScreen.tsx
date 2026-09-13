import type { FaseComEstado } from '../components/LevelMap/LevelMap';
import { LevelMap } from '../components/LevelMap/LevelMap';
import { Hud } from '../components/Hud/Hud';
import { Mascote } from '../assets/mascote/Mascote';
import './HomeScreen.css';

interface HomeScreenProps {
  fasesComEstado: FaseComEstado[];
  somAtivado: boolean;
  onAlternarSom: () => void;
  onSelecionarFase: (faseId: string) => void;
}

export function HomeScreen({
  fasesComEstado,
  somAtivado,
  onAlternarSom,
  onSelecionarFase,
}: HomeScreenProps) {
  return (
    <div className="tela">
      <div className="tela-conteudo">
        <Hud
          titulo="Hortifruti Letrado"
          somAtivado={somAtivado}
          onAlternarSom={onAlternarSom}
        />
        <div className="home-boas-vindas">
          <Mascote humor="feliz" size={90} />
          <p>
            Bem-vindo à nossa feira! Escolha uma fase para praticar leitura e
            escrita com frutas, verduras e legumes.
          </p>
        </div>
        <LevelMap
          fasesComEstado={fasesComEstado}
          onSelecionarFase={onSelecionarFase}
        />
      </div>
    </div>
  );
}

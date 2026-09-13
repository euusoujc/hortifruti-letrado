import { Mascote } from '../assets/mascote/Mascote';
import { Button } from '../components/shared/Button';
import './ResultScreen.css';

interface ResultScreenProps {
  faseTitulo: string;
  estrelas: number;
  onVoltarMapa: () => void;
  onJogarNovamente: () => void;
}

const MENSAGENS = [
  'Continue praticando, você está aprendendo!',
  'Muito bom! Mais um pouco de prática e você chega lá.',
  'Excelente! Você dominou esta fase!',
];

export function ResultScreen({
  faseTitulo,
  estrelas,
  onVoltarMapa,
  onJogarNovamente,
}: ResultScreenProps) {
  return (
    <div className="tela">
      <div className="tela-conteudo resultado">
        <Mascote humor={estrelas >= 2 ? 'feliz' : 'neutro'} size={120} />
        <h1>Fase concluída!</h1>
        <p className="resultado__fase">{faseTitulo}</p>
        <div className="resultado__estrelas" aria-hidden="true">
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className={`resultado__estrela ${i < estrelas ? 'resultado__estrela--ativa' : ''}`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {i < estrelas ? '⭐' : '☆'}
            </span>
          ))}
        </div>
        <p className="resultado__mensagem">{MENSAGENS[estrelas - 1] ?? MENSAGENS[0]}</p>
        <div className="resultado__acoes">
          <Button variante="fantasma" onClick={onJogarNovamente}>
            Jogar novamente
          </Button>
          <Button variante="primaria" onClick={onVoltarMapa}>
            Voltar ao mapa
          </Button>
        </div>
      </div>
    </div>
  );
}

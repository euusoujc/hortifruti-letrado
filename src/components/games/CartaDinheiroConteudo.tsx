import type { ParDinheiro } from '../../data/dinheiro';
import { Moeda } from '../../assets/svg/Moeda';
import { Cedula } from '../../assets/svg/Cedula';

interface CartaDinheiroConteudoProps {
  par: ParDinheiro;
  tipo: 'valor' | 'quantidade';
}

export function CartaDinheiroConteudo({ par, tipo }: CartaDinheiroConteudoProps) {
  if (tipo === 'valor') {
    return (
      <div className="carta-dinheiro__valor">
        <span className="carta-dinheiro__cifrao">R$</span>
        <strong>{par.valorLabel.replace('R$', '').trim()}</strong>
      </div>
    );
  }

  const icones = Array.from({ length: Math.min(par.quantidadeNumero, 6) });

  return (
    <div className="carta-dinheiro__quantidade">
      <div className="carta-dinheiro__icones">
        {icones.map((_, i) =>
          par.tipoDenominacao === 'moeda' ? (
            <Moeda key={i} valor={par.denominacaoLabel} size={28} />
          ) : (
            <Cedula key={i} valor={par.denominacaoLabel} cor={par.corCedula} size={40} />
          ),
        )}
      </div>
      <span className="carta-dinheiro__legenda">{par.quantidadeLabel}</span>
    </div>
  );
}

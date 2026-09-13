const CHAVE_SOM = 'hortifruti-som-ativado';

let contexto: AudioContext | null = null;

function obterContexto(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioContextCtor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioContextCtor) return null;
  if (!contexto) contexto = new AudioContextCtor();
  if (contexto.state === 'suspended') void contexto.resume();
  return contexto;
}

export function isSomAtivado(): boolean {
  if (typeof window === 'undefined') return true;
  const valor = window.localStorage.getItem(CHAVE_SOM);
  return valor === null ? true : valor === 'true';
}

export function setSomAtivado(ativado: boolean): void {
  window.localStorage.setItem(CHAVE_SOM, String(ativado));
}

interface NotaOpcoes {
  frequencia: number;
  inicioSegundos: number;
  duracaoSegundos: number;
  tipo?: OscillatorType;
  volume?: number;
}

function tocarNota(ctx: AudioContext, agora: number, opcoes: NotaOpcoes) {
  const oscilador = ctx.createOscillator();
  const ganho = ctx.createGain();
  oscilador.type = opcoes.tipo ?? 'sine';
  oscilador.frequency.value = opcoes.frequencia;

  const inicio = agora + opcoes.inicioSegundos;
  const fim = inicio + opcoes.duracaoSegundos;
  const volume = opcoes.volume ?? 0.18;

  ganho.gain.setValueAtTime(0, inicio);
  ganho.gain.linearRampToValueAtTime(volume, inicio + 0.015);
  ganho.gain.exponentialRampToValueAtTime(0.0001, fim);

  oscilador.connect(ganho);
  ganho.connect(ctx.destination);
  oscilador.start(inicio);
  oscilador.stop(fim + 0.02);
}

function tocarSequencia(notas: NotaOpcoes[]) {
  if (!isSomAtivado()) return;
  const ctx = obterContexto();
  if (!ctx) return;
  const agora = ctx.currentTime;
  notas.forEach((nota) => tocarNota(ctx, agora, nota));
}

export function playAcerto(): void {
  tocarSequencia([
    { frequencia: 523.25, inicioSegundos: 0, duracaoSegundos: 0.12 },
    { frequencia: 659.25, inicioSegundos: 0.1, duracaoSegundos: 0.16 },
  ]);
}

export function playErro(): void {
  tocarSequencia([
    {
      frequencia: 220,
      inicioSegundos: 0,
      duracaoSegundos: 0.18,
      tipo: 'sawtooth',
      volume: 0.12,
    },
    {
      frequencia: 164.81,
      inicioSegundos: 0.08,
      duracaoSegundos: 0.2,
      tipo: 'sawtooth',
      volume: 0.12,
    },
  ]);
}

export function playClique(): void {
  tocarSequencia([
    { frequencia: 440, inicioSegundos: 0, duracaoSegundos: 0.05, volume: 0.1 },
  ]);
}

export function playFaseCompleta(): void {
  tocarSequencia([
    { frequencia: 392, inicioSegundos: 0, duracaoSegundos: 0.14 },
    { frequencia: 523.25, inicioSegundos: 0.12, duracaoSegundos: 0.14 },
    { frequencia: 659.25, inicioSegundos: 0.24, duracaoSegundos: 0.14 },
    { frequencia: 783.99, inicioSegundos: 0.36, duracaoSegundos: 0.3 },
  ]);
}

export function playRodadaCompleta(): void {
  tocarSequencia([
    { frequencia: 587.33, inicioSegundos: 0, duracaoSegundos: 0.14 },
    { frequencia: 783.99, inicioSegundos: 0.1, duracaoSegundos: 0.22 },
  ]);
}

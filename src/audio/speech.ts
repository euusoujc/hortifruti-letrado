import { isSomAtivado } from './sfx';

function obterVozPtBr(): SpeechSynthesisVoice | undefined {
  const vozes = window.speechSynthesis.getVoices();
  return (
    vozes.find((v) => v.lang?.toLowerCase() === 'pt-br') ??
    vozes.find((v) => v.lang?.toLowerCase().startsWith('pt'))
  );
}

export function falarPalavra(texto: string): void {
  if (!isSomAtivado()) return;
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  window.speechSynthesis.cancel();
  const fala = new SpeechSynthesisUtterance(texto.toLowerCase());
  fala.lang = 'pt-BR';
  fala.rate = 0.9;
  const voz = obterVozPtBr();
  if (voz) fala.voice = voz;
  window.speechSynthesis.speak(fala);
}

export function isLeituraDisponivel(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

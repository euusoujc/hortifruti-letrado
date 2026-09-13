# Hortifruti Letrado

Jogo web (PWA) de alfabetização e letramento para a EJA, com tema de hortifruti/feira. Os alunos associam imagens de frutas e verduras aos nomes corretos, praticam correção ortográfica entre grafias parecidas (ex.: MAÇÃ vs MASSÃ/MAÇÃN) e resolvem um desafio de adivinhação de palavras inspirado no Termo.

## Como rodar

```bash
npm install
npm run dev
```

Abra o endereço mostrado no terminal (geralmente `http://localhost:5173`).

## Build de produção

```bash
npm run build
npm run preview
```

O app é um PWA: pode ser instalado no navegador e funciona offline depois da primeira visita, sem precisar de internet.

## Versão portátil (um único arquivo, sem servidor)

Para gerar um único arquivo `.html` autocontido (JS e CSS embutidos), que pode ser enviado por e-mail/pendrive e aberto com duplo clique em qualquer computador — sem instalar Node.js, sem internet e sem servidor:

```bash
npm run build:portatil
```

O arquivo fica em `dist-portatil/index.html`. Basta copiar esse único arquivo (pode renomeá-lo, ex. `HortifrutiLetrado.html`) e distribuir.

`MVP.html`, na raiz do projeto, é um snapshot já pronto dessa versão portátil (gerado e commitado para ficar acessível direto do repositório). Para atualizá-lo depois de mudanças no jogo, rode `npm run build:portatil` e copie `dist-portatil/index.html` por cima de `MVP.html`.

## Estrutura

- `src/data` — banco de palavras (frutas/verduras), pares de dinheiro e definição das fases.
- `src/assets/svg` — ilustrações das frutas/verduras/dinheiro (SVG desenhado no código).
- `src/assets/mascote` — mascote da feira.
- `src/audio` — efeitos sonoros (Web Audio API) e leitura de palavras em voz alta.
- `src/components/games` — os modos de jogo: Associação (imagem→nome e nome→imagem), Correção Ortográfica, Termo da Horta e Jogo da Memória do Dinheiro.
- `src/screens` — telas principais (mapa de fases, fase em andamento, resultado).

## Fases atuais

1. **Frutas do dia a dia** — Associação, Correção Ortográfica e Termo.
2. **Verduras e Legumes** — Associação invertida (toca a palavra pra ouvir, encontra a imagem), Correção Ortográfica e Termo.
3. **Dinheiro da Feira** — Jogo da memória relacionando valores (R$) a quantidades de moedas/cédulas.

Todas as fases estão desbloqueadas por padrão (`requisitos: []` em `src/data/fases.ts`) para facilitar testes. Para restaurar a progressão sequencial, defina `requisitos` com o id da fase anterior.

## Adicionando novas fases

Para expandir com novos temas, adicione itens em `src/data/items.ts` e uma nova fase em `src/data/fases.ts`, escolhendo a sequência de `rodadas` (`associacao`, `associacao-invertida`, `ortografia`, `termo` ou `memoria-dinheiro`).

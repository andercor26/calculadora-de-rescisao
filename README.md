# Calculadora do Trabalhador

Landing page com uma calculadora de rescisão trabalhista (CLT) para
trabalhadores brasileiros. O usuário preenche salário, datas de
admissão/demissão, tipo de desligamento (sem justa causa, pedido de
demissão, justa causa ou acordo mútuo) e se tinha carteira assinada, e
recebe uma estimativa detalhada em formato de recibo: saldo de
salário, aviso prévio, 13º proporcional, férias + 1/3 e FGTS + multa.

Todo o cálculo roda no navegador (client-side) — nenhum dado é
enviado a um servidor.

⚠️ Os valores são **estimativas educativas** baseadas nas regras
gerais da CLT e não substituem orientação de um advogado trabalhista.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- Fontes via `next/font`: Fraunces (display), Inter (texto), IBM Plex
  Mono (números do recibo)

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Estrutura

- `src/lib/calculoRescisao.ts` — lógica pura do cálculo das verbas
  rescisórias
- `src/components/Calculadora.tsx` — formulário e recibo ao vivo
- `src/components/` — demais seções da landing page

## Deploy

Projeto pronto para deploy na [Vercel](https://vercel.com/new): basta
importar o repositório, sem variáveis de ambiente necessárias.

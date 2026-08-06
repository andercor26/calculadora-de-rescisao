// Comparação entre saque-aniversário e saque-rescisão do FGTS (Lei 13.932/2019).

export interface DadosSaqueAniversario {
  saldoFgts: number;
}

export interface ResultadoSaqueAniversario {
  saldoFgts: number;
  percentualFaixa: number;
  parcelaFixa: number;
  parcelaAniversario: number;
  multa40: number;
  totalSeDemitidoRescisao: number;
  totalSeDemitidoAniversario: number;
  diferencaSeDemitido: number;
  avisos: string[];
}

const FAIXAS = [
  { limite: 500, aliquota: 0.5, parcela: 0 },
  { limite: 1000, aliquota: 0.4, parcela: 50 },
  { limite: 5000, aliquota: 0.3, parcela: 150 },
  { limite: 10000, aliquota: 0.2, parcela: 650 },
  { limite: 15000, aliquota: 0.15, parcela: 1150 },
  { limite: 20000, aliquota: 0.1, parcela: 1900 },
  { limite: Infinity, aliquota: 0.05, parcela: 2900 },
];

export function calcularSaqueAniversario(
  dados: DadosSaqueAniversario
): ResultadoSaqueAniversario {
  const saldo = Math.max(0, dados.saldoFgts || 0);

  const avisos = [
    "Ao optar pelo saque-aniversário, é preciso avisar com 2 meses de antecedência para voltar ao saque-rescisão — a mudança não é imediata.",
  ];

  if (saldo <= 0) {
    return {
      saldoFgts: 0,
      percentualFaixa: 0,
      parcelaFixa: 0,
      parcelaAniversario: 0,
      multa40: 0,
      totalSeDemitidoRescisao: 0,
      totalSeDemitidoAniversario: 0,
      diferencaSeDemitido: 0,
      avisos: ["Preencha o saldo atual do FGTS para comparar as duas modalidades."],
    };
  }

  const faixa = FAIXAS.find((f) => saldo <= f.limite) ?? FAIXAS[FAIXAS.length - 1];
  const parcelaAniversario = Math.min(saldo, saldo * faixa.aliquota + faixa.parcela);
  const multa40 = saldo * 0.4;

  return {
    saldoFgts: saldo,
    percentualFaixa: faixa.aliquota * 100,
    parcelaFixa: faixa.parcela,
    parcelaAniversario,
    multa40,
    totalSeDemitidoRescisao: saldo + multa40,
    totalSeDemitidoAniversario: multa40,
    diferencaSeDemitido: saldo,
    avisos,
  };
}

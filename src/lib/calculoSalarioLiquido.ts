// Cálculo estimado de salário líquido (INSS + IRRF), tabelas de referência 2024.
// As tabelas são reajustadas por lei — confirme o valor exato com o RH ou a Receita Federal.

export interface DadosSalarioLiquido {
  salarioBruto: number;
  dependentes: number;
  outrosDescontos: number;
}

export interface ResultadoSalarioLiquido {
  salarioBruto: number;
  descontoINSS: number;
  baseIRRF: number;
  descontoIRRF: number;
  metodoIRRF: "dependentes" | "simplificado";
  outrosDescontos: number;
  salarioLiquido: number;
  avisos: string[];
}

const FAIXAS_INSS = [
  { limite: 1412.0, aliquota: 0.075 },
  { limite: 2666.68, aliquota: 0.09 },
  { limite: 4000.03, aliquota: 0.12 },
  { limite: 7786.02, aliquota: 0.14 },
];

const DEDUCAO_DEPENDENTE = 189.59;
const DESCONTO_SIMPLIFICADO = 564.8;

const FAIXAS_IRRF = [
  { limite: 2259.2, aliquota: 0, deduzir: 0 },
  { limite: 2826.65, aliquota: 0.075, deduzir: 169.44 },
  { limite: 3751.05, aliquota: 0.15, deduzir: 381.44 },
  { limite: 4664.68, aliquota: 0.225, deduzir: 662.77 },
  { limite: Infinity, aliquota: 0.275, deduzir: 896.0 },
];

function calcularINSS(bruto: number): number {
  if (bruto <= 0) return 0;
  const tetoSalario = FAIXAS_INSS[FAIXAS_INSS.length - 1].limite;
  const base = Math.min(bruto, tetoSalario);
  let desconto = 0;
  let limiteAnterior = 0;
  for (const faixa of FAIXAS_INSS) {
    if (base > limiteAnterior) {
      const baseFaixa = Math.min(base, faixa.limite) - limiteAnterior;
      desconto += baseFaixa * faixa.aliquota;
      limiteAnterior = faixa.limite;
    }
  }
  return desconto;
}

function calcularIRRF(base: number): number {
  if (base <= 0) return 0;
  const faixa = FAIXAS_IRRF.find((f) => base <= f.limite) ?? FAIXAS_IRRF[FAIXAS_IRRF.length - 1];
  const imposto = base * faixa.aliquota - faixa.deduzir;
  return Math.max(0, imposto);
}

export function calcularSalarioLiquido(dados: DadosSalarioLiquido): ResultadoSalarioLiquido {
  const bruto = Math.max(0, dados.salarioBruto || 0);
  const avisos = [
    "Tabelas de referência 2024 (INSS e IRRF). Ambas são reajustadas por lei, geralmente todo ano — confirme os valores vigentes com o RH ou a Receita Federal.",
  ];

  if (bruto <= 0) {
    return {
      salarioBruto: 0,
      descontoINSS: 0,
      baseIRRF: 0,
      descontoIRRF: 0,
      metodoIRRF: "dependentes",
      outrosDescontos: 0,
      salarioLiquido: 0,
      avisos: ["Preencha o salário bruto para ver o cálculo."],
    };
  }

  const descontoINSS = calcularINSS(bruto);

  const baseComDependentes = Math.max(
    0,
    bruto - descontoINSS - dados.dependentes * DEDUCAO_DEPENDENTE
  );
  const irrfComDependentes = calcularIRRF(baseComDependentes);

  const baseSimplificada = Math.max(0, bruto - DESCONTO_SIMPLIFICADO);
  const irrfSimplificado = calcularIRRF(baseSimplificada);

  const usarSimplificado = irrfSimplificado < irrfComDependentes;
  const descontoIRRF = usarSimplificado ? irrfSimplificado : irrfComDependentes;
  const baseIRRF = usarSimplificado ? baseSimplificada : baseComDependentes;

  if (bruto >= 2259.2 && bruto <= 2826.65) {
    avisos.push(
      "Para faixas entre aproximadamente R$ 2.259 e R$ 2.826, uma isenção adicional criada em 2024 pode reduzir ainda mais o IRRF devido — o valor real pode ser um pouco menor que o estimado aqui."
    );
  }

  const outrosDescontos = Math.max(0, dados.outrosDescontos || 0);
  const salarioLiquido = Math.max(0, bruto - descontoINSS - descontoIRRF - outrosDescontos);

  return {
    salarioBruto: bruto,
    descontoINSS,
    baseIRRF,
    descontoIRRF,
    metodoIRRF: usarSimplificado ? "simplificado" : "dependentes",
    outrosDescontos,
    salarioLiquido,
    avisos,
  };
}

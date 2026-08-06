// Cálculo estimado de salário líquido (INSS + IRRF), tabelas de referência 2026.
// IRRF conforme a Lei 15.191/2025 (tabela) e a Lei 15.270/2025 (redutor/isenção até R$ 5.000).
// As tabelas são reajustadas por lei. Confirme o valor exato com o RH ou a Receita Federal.

export interface DadosSalarioLiquido {
  salarioBruto: number;
  dependentes: number;
  outrosDescontos: number;
}

export interface ResultadoSalarioLiquido {
  salarioBruto: number;
  descontoINSS: number;
  baseIRRF: number;
  impostoAntesRedutor: number;
  redutorIRRF: number;
  descontoIRRF: number;
  metodoIRRF: "dependentes" | "simplificado";
  outrosDescontos: number;
  salarioLiquido: number;
  avisos: string[];
}

const FAIXAS_INSS = [
  { limite: 1621.0, aliquota: 0.075 },
  { limite: 2902.84, aliquota: 0.09 },
  { limite: 4354.27, aliquota: 0.12 },
  { limite: 8475.55, aliquota: 0.14 },
];

const DEDUCAO_DEPENDENTE = 189.59;
const DESCONTO_SIMPLIFICADO = 607.2;

const FAIXAS_IRRF = [
  { limite: 2428.8, aliquota: 0, deduzir: 0 },
  { limite: 2826.65, aliquota: 0.075, deduzir: 182.16 },
  { limite: 3751.05, aliquota: 0.15, deduzir: 394.16 },
  { limite: 4664.68, aliquota: 0.225, deduzir: 675.49 },
  { limite: Infinity, aliquota: 0.275, deduzir: 908.73 },
];

// Redutor da Lei 15.270/2025: zera ou reduz o IRRF para quem ganha até R$ 7.350 (rendimento bruto).
const REDUTOR_LIMITE_RENDA = 7350;
const REDUTOR_BASE = 978.62;
const REDUTOR_COEFICIENTE = 0.133145;

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

function calcularIRRFTabela(base: number): number {
  if (base <= 0) return 0;
  const faixa = FAIXAS_IRRF.find((f) => base <= f.limite) ?? FAIXAS_IRRF[FAIXAS_IRRF.length - 1];
  const imposto = base * faixa.aliquota - faixa.deduzir;
  return Math.max(0, imposto);
}

function calcularRedutor(rendimentoBruto: number): number {
  if (rendimentoBruto > REDUTOR_LIMITE_RENDA) return 0;
  return Math.max(0, REDUTOR_BASE - REDUTOR_COEFICIENTE * rendimentoBruto);
}

export function calcularSalarioLiquido(dados: DadosSalarioLiquido): ResultadoSalarioLiquido {
  const bruto = Math.max(0, dados.salarioBruto || 0);
  const avisos = [
    "Tabelas de referência 2026 (INSS e IRRF, incluindo a isenção/redutor da Lei 15.270/2025). Ambas são reajustadas por lei. Confirme os valores vigentes com o RH ou a Receita Federal.",
  ];

  if (bruto <= 0) {
    return {
      salarioBruto: 0,
      descontoINSS: 0,
      baseIRRF: 0,
      impostoAntesRedutor: 0,
      redutorIRRF: 0,
      descontoIRRF: 0,
      metodoIRRF: "dependentes",
      outrosDescontos: 0,
      salarioLiquido: 0,
      avisos: ["Preencha o salário bruto para ver o cálculo."],
    };
  }

  const descontoINSS = calcularINSS(bruto);
  const redutor = calcularRedutor(bruto);

  const baseComDependentes = Math.max(
    0,
    bruto - descontoINSS - dados.dependentes * DEDUCAO_DEPENDENTE
  );
  const impostoTabelaDependentes = calcularIRRFTabela(baseComDependentes);
  const irrfComDependentes = Math.max(0, impostoTabelaDependentes - redutor);

  const baseSimplificada = Math.max(0, bruto - DESCONTO_SIMPLIFICADO);
  const impostoTabelaSimplificado = calcularIRRFTabela(baseSimplificada);
  const irrfSimplificado = Math.max(0, impostoTabelaSimplificado - redutor);

  const usarSimplificado = irrfSimplificado < irrfComDependentes;
  const descontoIRRF = usarSimplificado ? irrfSimplificado : irrfComDependentes;
  const baseIRRF = usarSimplificado ? baseSimplificada : baseComDependentes;
  const impostoAntesRedutor = usarSimplificado ? impostoTabelaSimplificado : impostoTabelaDependentes;

  if (bruto <= 5000) {
    avisos.push("Renda até R$ 5.000: pela Lei 15.270/2025, o IRRF fica zerado.");
  } else if (bruto <= REDUTOR_LIMITE_RENDA) {
    avisos.push(
      "Entre R$ 5.000 e R$ 7.350, a Lei 15.270/2025 reduz o IRRF gradualmente até zerar em R$ 7.350."
    );
  }

  const outrosDescontos = Math.max(0, dados.outrosDescontos || 0);
  const salarioLiquido = Math.max(0, bruto - descontoINSS - descontoIRRF - outrosDescontos);

  return {
    salarioBruto: bruto,
    descontoINSS,
    baseIRRF,
    impostoAntesRedutor,
    redutorIRRF: Math.min(redutor, impostoAntesRedutor),
    descontoIRRF,
    metodoIRRF: usarSimplificado ? "simplificado" : "dependentes",
    outrosDescontos,
    salarioLiquido,
    avisos,
  };
}

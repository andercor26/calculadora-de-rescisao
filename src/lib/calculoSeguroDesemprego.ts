// Cálculo estimado do seguro-desemprego (Lei 7.998/1990, Lei 13.134/2015 e Resolução CODEFAT).
// Tabela de valores de referência: 2024 — reajustada anualmente pelo governo.

export type NumeroSolicitacao = "1" | "2" | "3+";

export interface DadosSeguroDesemprego {
  elegivel: boolean; // dispensado sem justa causa (ou equivalente)
  mesesTrabalhados: number; // nos últimos 36 meses
  numeroSolicitacao: NumeroSolicitacao;
  mediaSalarial: number;
}

export interface ResultadoSeguroDesemprego {
  parcelas: number;
  valorParcela: number;
  valorTotal: number;
  motivoInelegivel: string | null;
  avisos: string[];
}

const SALARIO_MINIMO_REF = 1412.0;
const FAIXA1_LIMITE = 2041.2;
const FAIXA2_LIMITE = 3402.6;
const TETO_PARCELA = 2313.74;

function calcularParcelas(solicitacao: NumeroSolicitacao, meses: number): number {
  if (solicitacao === "1") {
    if (meses >= 24) return 5;
    if (meses >= 12) return 4;
    return 0;
  }
  if (solicitacao === "2") {
    if (meses >= 24) return 5;
    if (meses >= 12) return 4;
    if (meses >= 9) return 3;
    return 0;
  }
  if (meses >= 24) return 5;
  if (meses >= 12) return 4;
  if (meses >= 6) return 3;
  return 0;
}

function calcularValorParcela(media: number): number {
  if (media <= 0) return 0;
  let valor: number;
  if (media <= FAIXA1_LIMITE) {
    valor = media * 0.8;
  } else if (media <= FAIXA2_LIMITE) {
    valor = 1632.96 + (media - FAIXA1_LIMITE) * 0.5;
  } else {
    valor = TETO_PARCELA;
  }
  return Math.max(valor, SALARIO_MINIMO_REF);
}

export function calcularSeguroDesemprego(
  dados: DadosSeguroDesemprego
): ResultadoSeguroDesemprego {
  const avisos = [
    "Tabela de referência 2024 (Resolução CODEFAT). Os valores são reajustados todo ano, geralmente em fevereiro — confirme o valor atualizado em gov.br/trabalho-e-emprego.",
  ];

  if (!dados.elegivel) {
    return {
      parcelas: 0,
      valorParcela: 0,
      valorTotal: 0,
      motivoInelegivel:
        "O seguro-desemprego é devido apenas em dispensa sem justa causa (ou situações equivalentes, como rescisão indireta). Pedido de demissão e justa causa não dão direito ao benefício.",
      avisos,
    };
  }

  if (dados.mesesTrabalhados <= 0 || dados.mediaSalarial <= 0) {
    return {
      parcelas: 0,
      valorParcela: 0,
      valorTotal: 0,
      motivoInelegivel: null,
      avisos: ["Preencha os meses trabalhados e a média salarial para ver o cálculo."],
    };
  }

  const parcelas = calcularParcelas(dados.numeroSolicitacao, dados.mesesTrabalhados);

  if (parcelas === 0) {
    return {
      parcelas: 0,
      valorParcela: 0,
      valorTotal: 0,
      motivoInelegivel:
        "Com esse tempo trabalhado nos últimos 36 meses, você ainda não atingiu o mínimo exigido para esta solicitação de seguro-desemprego.",
      avisos,
    };
  }

  const valorParcela = calcularValorParcela(dados.mediaSalarial);

  return {
    parcelas,
    valorParcela,
    valorTotal: valorParcela * parcelas,
    motivoInelegivel: null,
    avisos,
  };
}

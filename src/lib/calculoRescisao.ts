// Cálculo estimado de rescisão trabalhista (CLT) conforme regras gerais da legislação brasileira.
// Trata-se de uma ESTIMATIVA para fins informativos. Não substitui análise de um advogado trabalhista.

import {
  addDias,
  anosCompletos,
  contarAvos,
  diffDias,
  parseISODate,
  primeiroDiaAnoOuAdmissao,
  ultimoAniversarioAdmissao,
} from "./dataUtil";

export type TipoDemissao =
  | "sem_justa_causa"
  | "pedido_demissao"
  | "justa_causa"
  | "acordo_mutuo";

export type SituacaoAviso =
  | "indenizado"
  | "trabalhado"
  | "dispensado"
  | "nao_cumprido";

export interface DadosRescisao {
  salarioBruto: number;
  dataAdmissao: string; // YYYY-MM-DD
  dataDemissao: string; // YYYY-MM-DD
  tipoDemissao: TipoDemissao;
  situacaoAviso: SituacaoAviso;
  registrado: boolean;
  periodosFeriasVencidas: number;
}

export interface ItemRescisao {
  id: string;
  label: string;
  detalhe: string;
  valor: number;
}

export interface ResultadoRescisao {
  itens: ItemRescisao[];
  descontos: ItemRescisao[];
  fgts: ItemRescisao[];
  totalVerbas: number;
  totalDescontos: number;
  totalFgts: number;
  totalGeral: number;
  diasAvisoPrevio: number;
  avisos: string[];
}

export function calcularRescisao(dados: DadosRescisao): ResultadoRescisao {
  const salario = Math.max(0, dados.salarioBruto || 0);
  const admissao = parseISODate(dados.dataAdmissao);
  const demissao = parseISODate(dados.dataDemissao);

  const itens: ItemRescisao[] = [];
  const descontos: ItemRescisao[] = [];
  const fgts: ItemRescisao[] = [];
  const avisos: string[] = [];

  if (!dados.dataAdmissao || !dados.dataDemissao || demissao <= admissao || salario <= 0) {
    return {
      itens,
      descontos,
      fgts,
      totalVerbas: 0,
      totalDescontos: 0,
      totalFgts: 0,
      totalGeral: 0,
      diasAvisoPrevio: 0,
      avisos: ["Preencha o salário e as datas de admissão e demissão para ver o cálculo."],
    };
  }

  if (!dados.registrado) {
    avisos.push(
      "Você marcou que não tinha carteira assinada. Sem registro formal, esses valores só são devidos após o reconhecimento do vínculo empregatício na Justiça do Trabalho. O cálculo abaixo mostra uma estimativa do que seria devido nesse cenário."
    );
  }

  // Aviso prévio: 30 dias + 3 dias por ano completo, limitado a 90 (Lei 12.506/2011)
  const diasAvisoBase = Math.min(90, 30 + 3 * anosCompletos(admissao, demissao));
  const isDemissaoEmpregador = dados.tipoDemissao === "sem_justa_causa" || dados.tipoDemissao === "acordo_mutuo";
  const diasAvisoPrevio = dados.tipoDemissao === "justa_causa" ? 0 : isDemissaoEmpregador ? diasAvisoBase : 30;

  // Data projetada: usada para 13º, férias proporcionais e tempo de contrato quando o aviso é indenizado
  const avisoEhIndenizado = dados.situacaoAviso === "indenizado" && dados.tipoDemissao !== "pedido_demissao";
  const dataProjecao = avisoEhIndenizado ? addDias(demissao, diasAvisoPrevio) : demissao;

  // 1. Saldo de salário (dias efetivamente trabalhados no mês da saída)
  const diasSaldoSalario = demissao.getUTCDate();
  const valorSaldoSalario = (salario / 30) * diasSaldoSalario;
  itens.push({
    id: "saldo_salario",
    label: "Saldo de salário",
    detalhe: `${diasSaldoSalario} dia(s) trabalhado(s) no mês da saída`,
    valor: valorSaldoSalario,
  });

  // 2. Aviso prévio
  if (dados.tipoDemissao === "sem_justa_causa" && dados.situacaoAviso === "indenizado") {
    const valor = (salario / 30) * diasAvisoPrevio;
    itens.push({
      id: "aviso_previo",
      label: "Aviso prévio indenizado",
      detalhe: `${diasAvisoPrevio} dias (30 + 3 por ano completo trabalhado)`,
      valor,
    });
  } else if (dados.tipoDemissao === "acordo_mutuo" && dados.situacaoAviso === "indenizado") {
    const valorCheio = (salario / 30) * diasAvisoPrevio;
    itens.push({
      id: "aviso_previo",
      label: "Aviso prévio indenizado (50%)",
      detalhe: `Acordo mútuo: metade de ${diasAvisoPrevio} dias`,
      valor: valorCheio * 0.5,
    });
  } else if (dados.tipoDemissao === "pedido_demissao" && dados.situacaoAviso === "nao_cumprido") {
    const valor = (salario / 30) * 30;
    descontos.push({
      id: "aviso_previo_desconto",
      label: "Desconto de aviso prévio não cumprido",
      detalhe: "30 dias descontados por não cumprir nem ser dispensado do aviso",
      valor,
    });
  }

  // 3. 13º salário proporcional (não devido em justa causa)
  if (dados.tipoDemissao !== "justa_causa") {
    const inicio13 = primeiroDiaAnoOuAdmissao(admissao, dataProjecao);
    const avos13 = contarAvos(inicio13, dataProjecao);
    if (avos13 > 0) {
      const valor13 = (salario / 12) * avos13;
      itens.push({
        id: "decimo_terceiro",
        label: "13º salário proporcional",
        detalhe: `${avos13}/12 avos`,
        valor: valor13,
      });
    }
  }

  // 4. Férias proporcionais + 1/3 (não devidas em justa causa)
  if (dados.tipoDemissao !== "justa_causa") {
    const inicioFerias = ultimoAniversarioAdmissao(admissao, dataProjecao);
    const avosFerias = contarAvos(inicioFerias, dataProjecao);
    if (avosFerias > 0) {
      const base = (salario / 12) * avosFerias;
      const valor = base + base / 3;
      itens.push({
        id: "ferias_proporcionais",
        label: "Férias proporcionais + 1/3",
        detalhe: `${avosFerias}/12 avos, com terço constitucional`,
        valor,
      });
    }
  }

  // 5. Férias vencidas + 1/3 (sempre devidas, se houver)
  if (dados.periodosFeriasVencidas > 0) {
    const valor = dados.periodosFeriasVencidas * (salario + salario / 3);
    itens.push({
      id: "ferias_vencidas",
      label: "Férias vencidas + 1/3",
      detalhe: `${dados.periodosFeriasVencidas} período(s) não gozado(s)`,
      valor,
    });
  }

  // 6. FGTS
  const mesesContrato = Math.max(1, Math.round(diffDias(admissao, dataProjecao) / 30.4375));
  const fgtsEstimado = 0.08 * salario * mesesContrato;

  fgts.push({
    id: "fgts_saldo",
    label: "Saldo do FGTS disponível",
    detalhe: `Estimativa: 8% × salário × ${mesesContrato} meses de contrato`,
    valor: dados.tipoDemissao === "justa_causa" || dados.tipoDemissao === "pedido_demissao" ? 0 : fgtsEstimado,
  });

  if (dados.tipoDemissao === "sem_justa_causa") {
    fgts.push({
      id: "fgts_multa",
      label: "Multa de 40% do FGTS",
      detalhe: "Indenização compensatória paga pelo empregador",
      valor: fgtsEstimado * 0.4,
    });
  } else if (dados.tipoDemissao === "acordo_mutuo") {
    fgts.push({
      id: "fgts_multa",
      label: "Multa de 20% do FGTS",
      detalhe: "Reduzida por se tratar de acordo (art. 484-A da CLT)",
      valor: fgtsEstimado * 0.2,
    });
    avisos.push("No acordo mútuo, o saque do FGTS é limitado a 80% do saldo disponível.");
  }

  if (dados.tipoDemissao === "justa_causa") {
    avisos.push("Na demissão por justa causa não há direito a aviso prévio, 13º e férias proporcionais, multa do FGTS ou seguro-desemprego. O FGTS depositado permanece na conta, mas não pode ser sacado por este motivo.");
  }

  if (dados.tipoDemissao === "pedido_demissao") {
    avisos.push("No pedido de demissão não há multa do FGTS nem saque do saldo, e não há direito ao seguro-desemprego.");
  }

  avisos.push("O saldo do FGTS foi estimado de forma simplificada (8% do salário por mês de contrato). Consulte o app FGTS para o valor exato.");

  const totalVerbas = itens.reduce((s, i) => s + i.valor, 0);
  const totalDescontos = descontos.reduce((s, i) => s + i.valor, 0);
  const totalFgts = fgts.reduce((s, i) => s + i.valor, 0);
  const totalGeral = totalVerbas - totalDescontos + totalFgts;

  return {
    itens,
    descontos,
    fgts,
    totalVerbas,
    totalDescontos,
    totalFgts,
    totalGeral,
    diasAvisoPrevio,
    avisos,
  };
}

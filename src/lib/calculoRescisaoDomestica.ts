// Cálculo estimado de rescisão do(a) empregado(a) doméstico(a), conforme a LC 150/2015.
// Trata-se de uma ESTIMATIVA para fins informativos — não substitui análise de um advogado trabalhista.

import {
  addDias,
  anosCompletos,
  contarAvos,
  diffDias,
  parseISODate,
  primeiroDiaAnoOuAdmissao,
  ultimoAniversarioAdmissao,
} from "./dataUtil";
import type { SituacaoAviso, TipoDemissao } from "./calculoRescisao";

export interface DadosRescisaoDomestica {
  salarioBruto: number;
  dataAdmissao: string;
  dataDemissao: string;
  tipoDemissao: TipoDemissao;
  situacaoAviso: SituacaoAviso;
  periodosFeriasVencidas: number;
}

export interface ItemRescisaoDomestica {
  id: string;
  label: string;
  detalhe: string;
  valor: number;
}

export interface ResultadoRescisaoDomestica {
  itens: ItemRescisaoDomestica[];
  descontos: ItemRescisaoDomestica[];
  fgts: ItemRescisaoDomestica[];
  totalGeral: number;
  avisos: string[];
}

export function calcularRescisaoDomestica(
  dados: DadosRescisaoDomestica
): ResultadoRescisaoDomestica {
  const salario = Math.max(0, dados.salarioBruto || 0);
  const admissao = parseISODate(dados.dataAdmissao);
  const demissao = parseISODate(dados.dataDemissao);

  const itens: ItemRescisaoDomestica[] = [];
  const descontos: ItemRescisaoDomestica[] = [];
  const fgts: ItemRescisaoDomestica[] = [];
  const avisos: string[] = [];

  if (!dados.dataAdmissao || !dados.dataDemissao || demissao <= admissao || salario <= 0) {
    return {
      itens,
      descontos,
      fgts,
      totalGeral: 0,
      avisos: ["Preencha o salário e as datas de admissão e demissão para ver o cálculo."],
    };
  }

  const diasAvisoBase = Math.min(90, 30 + 3 * anosCompletos(admissao, demissao));
  const isDemissaoEmpregador = dados.tipoDemissao === "sem_justa_causa" || dados.tipoDemissao === "acordo_mutuo";
  const diasAvisoPrevio = dados.tipoDemissao === "justa_causa" ? 0 : isDemissaoEmpregador ? diasAvisoBase : 30;

  const avisoEhIndenizado = dados.situacaoAviso === "indenizado" && dados.tipoDemissao !== "pedido_demissao";
  const dataProjecao = avisoEhIndenizado ? addDias(demissao, diasAvisoPrevio) : demissao;

  const diasSaldoSalario = demissao.getUTCDate();
  itens.push({
    id: "saldo_salario",
    label: "Saldo de salário",
    detalhe: `${diasSaldoSalario} dia(s) trabalhado(s) no mês da saída`,
    valor: (salario / 30) * diasSaldoSalario,
  });

  if (dados.tipoDemissao === "sem_justa_causa" && dados.situacaoAviso === "indenizado") {
    itens.push({
      id: "aviso_previo",
      label: "Aviso prévio indenizado",
      detalhe: `${diasAvisoPrevio} dias (30 + 3 por ano completo trabalhado)`,
      valor: (salario / 30) * diasAvisoPrevio,
    });
  } else if (dados.tipoDemissao === "acordo_mutuo" && dados.situacaoAviso === "indenizado") {
    itens.push({
      id: "aviso_previo",
      label: "Aviso prévio indenizado (50%)",
      detalhe: `Acordo mútuo: metade de ${diasAvisoPrevio} dias`,
      valor: (salario / 30) * diasAvisoPrevio * 0.5,
    });
  } else if (dados.tipoDemissao === "pedido_demissao" && dados.situacaoAviso === "nao_cumprido") {
    descontos.push({
      id: "aviso_previo_desconto",
      label: "Desconto de aviso prévio não cumprido",
      detalhe: "30 dias descontados por não cumprir nem ser dispensada do aviso",
      valor: salario,
    });
  }

  if (dados.tipoDemissao !== "justa_causa") {
    const inicio13 = primeiroDiaAnoOuAdmissao(admissao, dataProjecao);
    const avos13 = contarAvos(inicio13, dataProjecao);
    if (avos13 > 0) {
      itens.push({
        id: "decimo_terceiro",
        label: "13º salário proporcional",
        detalhe: `${avos13}/12 avos`,
        valor: (salario / 12) * avos13,
      });
    }

    const inicioFerias = ultimoAniversarioAdmissao(admissao, dataProjecao);
    const avosFerias = contarAvos(inicioFerias, dataProjecao);
    if (avosFerias > 0) {
      const base = (salario / 12) * avosFerias;
      itens.push({
        id: "ferias_proporcionais",
        label: "Férias proporcionais + 1/3",
        detalhe: `${avosFerias}/12 avos, com terço constitucional`,
        valor: base + base / 3,
      });
    }
  }

  if (dados.periodosFeriasVencidas > 0) {
    itens.push({
      id: "ferias_vencidas",
      label: "Férias vencidas + 1/3",
      detalhe: `${dados.periodosFeriasVencidas} período(s) não gozado(s)`,
      valor: dados.periodosFeriasVencidas * (salario + salario / 3),
    });
  }

  // FGTS (8% mensal, obrigatório desde 2015) + indenização compensatória (3,2% mensal, substitui a multa de 40%)
  const mesesContrato = Math.max(1, Math.round(diffDias(admissao, dataProjecao) / 30.4375));
  const fgtsEstimado = 0.08 * salario * mesesContrato;
  const indenizacaoCompensatoria = 0.032 * salario * mesesContrato;

  fgts.push({
    id: "fgts_saldo",
    label: "Saldo do FGTS disponível",
    detalhe: `Estimativa: 8% × salário × ${mesesContrato} meses de contrato`,
    valor: dados.tipoDemissao === "justa_causa" || dados.tipoDemissao === "pedido_demissao" ? 0 : fgtsEstimado,
  });

  if (dados.tipoDemissao === "sem_justa_causa") {
    fgts.push({
      id: "indenizacao",
      label: "Indenização compensatória (3,2%)",
      detalhe: "Fundo mensal que substitui a multa de 40% do FGTS geral",
      valor: indenizacaoCompensatoria,
    });
  } else if (dados.tipoDemissao === "acordo_mutuo") {
    fgts.push({
      id: "indenizacao",
      label: "Indenização compensatória (3,2%, pela metade)",
      detalhe: "Estimativa por analogia ao acordo mútuo da CLT — confirme com um advogado",
      valor: indenizacaoCompensatoria * 0.5,
    });
    avisos.push(
      "A LC 150/2015 não trata explicitamente do acordo mútuo (art. 484-A da CLT) para domésticos — este valor é uma estimativa por analogia e merece confirmação profissional."
    );
  } else {
    avisos.push(
      "Fora da dispensa sem justa causa, o fundo de indenização compensatória (3,2% ao mês) retorna para o empregador, e não é pago à trabalhadora."
    );
  }

  if (dados.tipoDemissao === "sem_justa_causa") {
    avisos.push(
      "Se você trabalhou pelo menos 15 dos últimos 24 meses, também tem direito a até 3 parcelas de seguro-desemprego no valor de 1 salário mínimo cada — regra específica para domésticos, diferente da calculadora geral de seguro-desemprego."
    );
  }

  if (dados.tipoDemissao === "justa_causa") {
    avisos.push("Na justa causa não há direito a aviso prévio, 13º e férias proporcionais, indenização compensatória ou seguro-desemprego.");
  }

  avisos.push("O saldo do FGTS foi estimado de forma simplificada (8% do salário por mês de contrato). Consulte o app FGTS para o valor exato.");

  const totalVerbas = itens.reduce((s, i) => s + i.valor, 0);
  const totalDescontos = descontos.reduce((s, i) => s + i.valor, 0);
  const totalFgts = fgts.reduce((s, i) => s + i.valor, 0);

  return {
    itens,
    descontos,
    fgts,
    totalGeral: totalVerbas - totalDescontos + totalFgts,
    avisos,
  };
}

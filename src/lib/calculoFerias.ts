// Cálculo estimado de férias, com abono pecuniário (venda de dias) e adiantamento do 13º.

export interface DadosFerias {
  salarioBruto: number;
  diasGozar: number; // dias de férias a tirar (até 30)
  diasVender: number; // abono pecuniário (até 10 dias)
  adiantarDecimoTerceiro: boolean;
}

export interface ResultadoFerias {
  diasGozar: number;
  diasVender: number;
  valorFerias: number;
  tercoFerias: number;
  valorAbono: number;
  tercoAbono: number;
  adiantamentoDecimoTerceiro: number;
  total: number;
  avisos: string[];
}

export function calcularFerias(dados: DadosFerias): ResultadoFerias {
  const salario = Math.max(0, dados.salarioBruto || 0);
  const avisos: string[] = [];

  if (salario <= 0) {
    return {
      diasGozar: 0,
      diasVender: 0,
      valorFerias: 0,
      tercoFerias: 0,
      valorAbono: 0,
      tercoAbono: 0,
      adiantamentoDecimoTerceiro: 0,
      total: 0,
      avisos: ["Preencha o salário para ver o cálculo."],
    };
  }

  const diasVender = Math.min(10, Math.max(0, dados.diasVender || 0));
  const diasGozar = Math.min(30 - diasVender, Math.max(0, dados.diasGozar || 0));

  if (dados.diasVender > 10) {
    avisos.push("O abono pecuniário (venda de férias) é limitado a 10 dias, um terço do período.");
  }
  if (dados.diasGozar + dados.diasVender > 30) {
    avisos.push("A soma de dias tirados e vendidos não pode ultrapassar 30 dias.");
  }

  const valorFerias = (salario / 30) * diasGozar;
  const tercoFerias = valorFerias / 3;
  const valorAbono = (salario / 30) * diasVender;
  const tercoAbono = valorAbono / 3;
  const adiantamentoDecimoTerceiro = dados.adiantarDecimoTerceiro ? salario / 2 : 0;

  return {
    diasGozar,
    diasVender,
    valorFerias,
    tercoFerias,
    valorAbono,
    tercoAbono,
    adiantamentoDecimoTerceiro,
    total: valorFerias + tercoFerias + valorAbono + tercoAbono + adiantamentoDecimoTerceiro,
    avisos,
  };
}

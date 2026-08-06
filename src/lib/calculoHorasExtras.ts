// Cálculo estimado de horas extras e reflexo no DSR (descanso semanal remunerado).

export interface DadosHorasExtras {
  salarioBruto: number;
  cargaHorariaMensal: number; // ex.: 220h para jornada de 44h semanais
  horas50: number; // horas extras com adicional de 50%
  horas100: number; // horas extras com adicional de 100% (domingos/feriados)
  diasUteisMes: number;
  diasRepousoMes: number; // domingos e feriados no mês
}

export interface ResultadoHorasExtras {
  valorHoraNormal: number;
  valorHoras50: number;
  valorHoras100: number;
  reflexoDSR: number;
  total: number;
  avisos: string[];
}

export function calcularHorasExtras(dados: DadosHorasExtras): ResultadoHorasExtras {
  const salario = Math.max(0, dados.salarioBruto || 0);
  const carga = dados.cargaHorariaMensal || 220;

  const avisos = [
    "Convenções ou acordos coletivos da sua categoria podem prever adicional maior que 50%/100% ou uma jornada mensal diferente de 220h — verifique seu contrato ou sindicato.",
  ];

  if (salario <= 0) {
    return {
      valorHoraNormal: 0,
      valorHoras50: 0,
      valorHoras100: 0,
      reflexoDSR: 0,
      total: 0,
      avisos: ["Preencha o salário para ver o cálculo."],
    };
  }

  const valorHoraNormal = salario / carga;
  const valorHoras50 = valorHoraNormal * 1.5 * Math.max(0, dados.horas50 || 0);
  const valorHoras100 = valorHoraNormal * 2 * Math.max(0, dados.horas100 || 0);
  const totalHorasExtras = valorHoras50 + valorHoras100;

  const diasUteis = dados.diasUteisMes || 25;
  const diasRepouso = dados.diasRepousoMes ?? 5;
  const reflexoDSR = diasUteis > 0 ? (totalHorasExtras / diasUteis) * diasRepouso : 0;

  return {
    valorHoraNormal,
    valorHoras50,
    valorHoras100,
    reflexoDSR,
    total: totalHorasExtras + reflexoDSR,
    avisos,
  };
}

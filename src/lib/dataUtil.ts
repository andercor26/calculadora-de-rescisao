// Utilitários de data compartilhados pelas calculadoras (datas em UTC para evitar bugs de fuso horário).

const MS_DIA = 86_400_000;

export function parseISODate(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function diffDias(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / MS_DIA);
}

export function addDias(d: Date, n: number): Date {
  const r = new Date(d);
  r.setUTCDate(r.getUTCDate() + n);
  return r;
}

export function addMeses(d: Date, n: number): Date {
  const r = new Date(d);
  r.setUTCMonth(r.getUTCMonth() + n);
  return r;
}

export function anosCompletos(admissao: Date, fim: Date): number {
  let anos = fim.getUTCFullYear() - admissao.getUTCFullYear();
  const aniversario = new Date(
    Date.UTC(fim.getUTCFullYear(), admissao.getUTCMonth(), admissao.getUTCDate())
  );
  if (fim < aniversario) anos--;
  return Math.max(0, anos);
}

// Conta "avos" (meses) entre duas datas: mês cheio conta 1; fração final >= 15 dias conta 1 a mais. Máx 12.
export function contarAvos(inicio: Date, fim: Date): number {
  if (fim <= inicio) return 0;
  let meses = 0;
  let cursor = inicio;
  while (meses < 12) {
    const proximo = addMeses(cursor, 1);
    if (proximo <= fim) {
      meses++;
      cursor = proximo;
    } else {
      const diasRestantes = diffDias(cursor, fim);
      if (diasRestantes >= 15) meses++;
      break;
    }
  }
  return Math.min(meses, 12);
}

export function ultimoAniversarioAdmissao(admissao: Date, fim: Date): Date {
  let aniversario = new Date(
    Date.UTC(fim.getUTCFullYear(), admissao.getUTCMonth(), admissao.getUTCDate())
  );
  if (aniversario > fim) {
    aniversario = new Date(
      Date.UTC(fim.getUTCFullYear() - 1, admissao.getUTCMonth(), admissao.getUTCDate())
    );
  }
  if (aniversario < admissao) aniversario = admissao;
  return aniversario;
}

export function primeiroDiaAnoOuAdmissao(admissao: Date, fim: Date): Date {
  const primeiroDiaAno = new Date(Date.UTC(fim.getUTCFullYear(), 0, 1));
  return admissao > primeiroDiaAno ? admissao : primeiroDiaAno;
}

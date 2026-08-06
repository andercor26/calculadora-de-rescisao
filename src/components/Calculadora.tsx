"use client";

import { useMemo, useState } from "react";
import {
  calcularRescisao,
  type DadosRescisao,
  type SituacaoAviso,
  type TipoDemissao,
} from "@/lib/calculoRescisao";
import { formatBRL } from "@/lib/format";

const TIPOS: { value: TipoDemissao; label: string }[] = [
  { value: "sem_justa_causa", label: "Sem justa causa" },
  { value: "pedido_demissao", label: "Pedido de demissão" },
  { value: "justa_causa", label: "Justa causa" },
  { value: "acordo_mutuo", label: "Acordo mútuo" },
];

const AVISO_OPCOES: Record<TipoDemissao, { value: SituacaoAviso; label: string }[]> = {
  sem_justa_causa: [
    { value: "indenizado", label: "Indenizado (empresa dispensou o cumprimento)" },
    { value: "trabalhado", label: "Trabalhado (cumpri o período)" },
  ],
  acordo_mutuo: [
    { value: "indenizado", label: "Indenizado (pago pela metade)" },
    { value: "trabalhado", label: "Trabalhado (cumpri o período)" },
  ],
  pedido_demissao: [
    { value: "trabalhado", label: "Cumpri os 30 dias" },
    { value: "dispensado", label: "Empresa me dispensou do aviso" },
    { value: "nao_cumprido", label: "Não cumpri nem fui dispensado" },
  ],
  justa_causa: [],
};

const ESTAMPA: Record<TipoDemissao, string> = {
  sem_justa_causa: "Sem justa causa",
  pedido_demissao: "Pedido de demissão",
  justa_causa: "Justa causa",
  acordo_mutuo: "Acordo mútuo",
};

const inputClass =
  "w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-600/15";
const labelClass = "mb-1.5 block text-sm font-medium text-navy-950";

export function Calculadora() {
  const [dados, setDados] = useState<DadosRescisao>({
    salarioBruto: 0,
    dataAdmissao: "",
    dataDemissao: "",
    tipoDemissao: "sem_justa_causa",
    situacaoAviso: "indenizado",
    registrado: true,
    periodosFeriasVencidas: 0,
    saldoFgtsInformado: null,
  });

  const resultado = useMemo(() => calcularRescisao(dados), [dados]);

  function atualizar<K extends keyof DadosRescisao>(chave: K, valor: DadosRescisao[K]) {
    setDados((atual) => ({ ...atual, [chave]: valor }));
  }

  function mudarTipo(tipo: TipoDemissao) {
    const opcoes = AVISO_OPCOES[tipo];
    setDados((atual) => ({
      ...atual,
      tipoDemissao: tipo,
      situacaoAviso: opcoes.length > 0 ? opcoes[0].value : "trabalhado",
    }));
  }

  return (
    <section id="calculadora" className="bg-paper-muted py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-red-600">
            Calculadora
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
            Simule sua rescisão agora
          </h2>
          <p className="mt-3 text-ink-muted">
            Os valores são recalculados a cada campo preenchido. Nenhuma
            informação é enviada ou armazenada — o cálculo acontece no seu
            navegador.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <form className="space-y-7" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className={labelClass} htmlFor="salario">
                Salário bruto mensal
              </label>
              <input
                id="salario"
                type="number"
                min={0}
                step="0.01"
                inputMode="decimal"
                placeholder="R$ 0,00"
                className={inputClass}
                value={dados.salarioBruto || ""}
                onChange={(e) => atualizar("salarioBruto", Number(e.target.value))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass} htmlFor="admissao">
                  Data de admissão
                </label>
                <input
                  id="admissao"
                  type="date"
                  className={inputClass}
                  value={dados.dataAdmissao}
                  onChange={(e) => atualizar("dataAdmissao", e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="demissao">
                  Data de demissão
                </label>
                <input
                  id="demissao"
                  type="date"
                  className={inputClass}
                  value={dados.dataDemissao}
                  onChange={(e) => atualizar("dataDemissao", e.target.value)}
                />
              </div>
            </div>

            <div>
              <span className={labelClass}>Carteira assinada?</span>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { valor: true, label: "Sim, registrado" },
                  { valor: false, label: "Não, sem registro" },
                ].map((op) => (
                  <button
                    key={String(op.valor)}
                    type="button"
                    onClick={() => atualizar("registrado", op.valor)}
                    className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${
                      dados.registrado === op.valor
                        ? "border-navy-950 bg-navy-950 text-white"
                        : "border-line bg-white text-ink-muted hover:border-navy-950/40"
                    }`}
                  >
                    {op.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className={labelClass}>Motivo do desligamento</span>
              <div className="grid grid-cols-2 gap-3">
                {TIPOS.map((op) => (
                  <button
                    key={op.value}
                    type="button"
                    onClick={() => mudarTipo(op.value)}
                    className={`rounded-lg border px-4 py-3 text-left text-sm font-medium transition ${
                      dados.tipoDemissao === op.value
                        ? "border-red-600 bg-red-600 text-white"
                        : "border-line bg-white text-ink-muted hover:border-red-600/40"
                    }`}
                  >
                    {op.label}
                  </button>
                ))}
              </div>
            </div>

            {AVISO_OPCOES[dados.tipoDemissao].length > 0 ? (
              <div>
                <label className={labelClass} htmlFor="aviso">
                  Situação do aviso prévio
                </label>
                <select
                  id="aviso"
                  className={inputClass}
                  value={dados.situacaoAviso}
                  onChange={(e) => atualizar("situacaoAviso", e.target.value as SituacaoAviso)}
                >
                  {AVISO_OPCOES[dados.tipoDemissao].map((op) => (
                    <option key={op.value} value={op.value}>
                      {op.label}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <p className="rounded-lg bg-navy-950/5 px-4 py-3 text-sm text-ink-muted">
                Na demissão por justa causa não há direito a aviso prévio.
              </p>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass} htmlFor="ferias">
                  Períodos de férias vencidas
                </label>
                <select
                  id="ferias"
                  className={inputClass}
                  value={dados.periodosFeriasVencidas}
                  onChange={(e) => atualizar("periodosFeriasVencidas", Number(e.target.value))}
                >
                  {[0, 1, 2, 3].map((n) => (
                    <option key={n} value={n}>
                      {n === 0 ? "Nenhum" : n}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="fgts">
                  Saldo do FGTS (opcional)
                </label>
                <input
                  id="fgts"
                  type="number"
                  min={0}
                  step="0.01"
                  inputMode="decimal"
                  placeholder="Estimamos por você"
                  className={inputClass}
                  value={dados.saldoFgtsInformado ?? ""}
                  onChange={(e) =>
                    atualizar(
                      "saldoFgtsInformado",
                      e.target.value === "" ? null : Number(e.target.value)
                    )
                  }
                />
              </div>
            </div>
          </form>

          <ReciboResult resultado={resultado} estampa={ESTAMPA[dados.tipoDemissao]} />
        </div>
      </div>
    </section>
  );
}

function ReciboResult({
  resultado,
  estampa,
}: {
  resultado: ReturnType<typeof calcularRescisao>;
  estampa: string;
}) {
  const temDados = resultado.itens.length > 0 || resultado.avisos.length > 0;

  return (
    <div className="md:sticky md:top-24">
      <div className="relative rounded-2xl border border-line bg-white p-7 shadow-xl shadow-navy-950/5">
        <div className="flex items-start justify-between gap-4 border-b border-dashed border-line pb-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
              Recibo estimativo de rescisão
            </p>
            <p className="mt-1 font-display text-lg font-semibold text-navy-950">
              Resumo dos valores
            </p>
          </div>
          <span className="mt-1 shrink-0 rotate-[-6deg] rounded-full border-2 border-red-600 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-red-600">
            {estampa}
          </span>
        </div>

        {!temDados || resultado.itens.length === 0 ? (
          <p className="py-10 text-center text-sm text-ink-muted">
            {resultado.avisos[0] ?? "Preencha os dados ao lado para ver a estimativa."}
          </p>
        ) : (
          <>
            <dl className="mt-5 space-y-3 font-mono text-[13px]">
              {resultado.itens.map((item) => (
                <div key={item.id} className="flex items-baseline justify-between gap-3">
                  <div>
                    <dt className="text-ink">{item.label}</dt>
                    <dd className="text-[11px] text-ink-muted">{item.detalhe}</dd>
                  </div>
                  <dd className="shrink-0 tabular-nums text-navy-950">{formatBRL(item.valor)}</dd>
                </div>
              ))}

              {resultado.descontos.map((item) => (
                <div key={item.id} className="flex items-baseline justify-between gap-3">
                  <div>
                    <dt className="text-red-700">{item.label}</dt>
                    <dd className="text-[11px] text-ink-muted">{item.detalhe}</dd>
                  </div>
                  <dd className="shrink-0 tabular-nums text-red-700">
                    − {formatBRL(item.valor)}
                  </dd>
                </div>
              ))}
            </dl>

            {resultado.fgts.some((f) => f.valor > 0) && (
              <>
                <p className="mt-5 border-t border-dashed border-line pt-4 font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                  FGTS
                </p>
                <dl className="mt-3 space-y-3 font-mono text-[13px]">
                  {resultado.fgts
                    .filter((f) => f.valor > 0)
                    .map((item) => (
                      <div key={item.id} className="flex items-baseline justify-between gap-3">
                        <div>
                          <dt className="text-ink">{item.label}</dt>
                          <dd className="text-[11px] text-ink-muted">{item.detalhe}</dd>
                        </div>
                        <dd className="shrink-0 tabular-nums text-navy-950">
                          {formatBRL(item.valor)}
                        </dd>
                      </div>
                    ))}
                </dl>
              </>
            )}

            <div className="mt-6 flex items-baseline justify-between border-t border-dashed border-line pt-4">
              <span className="font-display text-base font-semibold text-navy-950">
                Total estimado
              </span>
              <span className="font-display text-2xl font-semibold tabular-nums text-red-600">
                {formatBRL(resultado.totalGeral)}
              </span>
            </div>

            {resultado.avisos.length > 0 && (
              <ul className="mt-5 space-y-2 border-t border-line pt-4">
                {resultado.avisos.map((aviso) => (
                  <li key={aviso} className="text-xs leading-relaxed text-ink-muted">
                    {aviso}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>

      <p className="mt-4 text-center text-xs text-ink-muted">
        Estimativa educativa — não substitui a orientação de um advogado
        trabalhista.
      </p>
    </div>
  );
}

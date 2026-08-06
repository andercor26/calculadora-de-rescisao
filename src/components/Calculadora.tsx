"use client";

import { useMemo, useState } from "react";
import { calcularRescisao, type DadosRescisao, type SituacaoAviso, type TipoDemissao } from "@/lib/calculoRescisao";
import { AVISO_OPCOES, ESTAMPA_TIPO_DEMISSAO, TIPOS_DEMISSAO } from "@/lib/opcoesRescisao";
import { ReciboCard } from "@/components/calc/ReciboCard";
import { ToggleGroup } from "@/components/calc/ToggleGroup";
import { inputClass, labelClass } from "@/components/calc/estilos";

export function Calculadora() {
  const [dados, setDados] = useState<DadosRescisao>({
    salarioBruto: 0,
    dataAdmissao: "",
    dataDemissao: "",
    tipoDemissao: "sem_justa_causa",
    situacaoAviso: "indenizado",
    registrado: true,
    periodosFeriasVencidas: 0,
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
            informação é enviada ou armazenada: o cálculo acontece no seu
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
              <ToggleGroup
                opcoes={[
                  { valor: "sim", label: "Sim, registrado" },
                  { valor: "nao", label: "Não, sem registro" },
                ]}
                valor={dados.registrado ? "sim" : "nao"}
                onChange={(v) => atualizar("registrado", v === "sim")}
              />
            </div>

            <div>
              <span className={labelClass}>Motivo do desligamento</span>
              <ToggleGroup
                opcoes={TIPOS_DEMISSAO.map((t) => ({ valor: t.value, label: t.label }))}
                valor={dados.tipoDemissao}
                onChange={mudarTipo}
                ativoClass="border-red-600 bg-red-600 text-white"
              />
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

            <div>
              <span className={labelClass}>Tinha férias vencidas?</span>
              <ToggleGroup
                opcoes={[
                  { valor: "sim", label: "Sim" },
                  { valor: "nao", label: "Não" },
                ]}
                valor={dados.periodosFeriasVencidas > 0 ? "sim" : "nao"}
                onChange={(v) => atualizar("periodosFeriasVencidas", v === "sim" ? 1 : 0)}
              />
            </div>
          </form>

          <ReciboCard
            rotulo="Recibo estimativo de rescisão"
            estampa={ESTAMPA_TIPO_DEMISSAO[dados.tipoDemissao]}
            grupos={[
              { itens: resultado.itens },
              { itens: resultado.descontos.map((i) => ({ ...i, negativo: true })) },
              { titulo: "FGTS", itens: resultado.fgts.filter((f) => f.valor > 0) },
            ]}
            total={{ label: "Total estimado", valor: resultado.totalGeral }}
            avisos={resultado.avisos}
            vazio={resultado.itens.length === 0 ? resultado.avisos[0] : undefined}
          />
        </div>
      </div>
    </section>
  );
}

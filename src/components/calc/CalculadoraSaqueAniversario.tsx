"use client";

import { useMemo, useState } from "react";
import {
  calcularSaqueAniversario,
  type DadosSaqueAniversario,
} from "@/lib/calculoSaqueAniversario";
import { formatBRL } from "@/lib/format";
import { ReciboCard } from "@/components/calc/ReciboCard";
import { inputClass, labelClass } from "@/components/calc/estilos";

export function CalculadoraSaqueAniversario() {
  const [dados, setDados] = useState<DadosSaqueAniversario>({ saldoFgts: 0 });

  const resultado = useMemo(() => calcularSaqueAniversario(dados), [dados]);
  const temResultado = resultado.saldoFgts > 0;

  return (
    <section id="calculadora" className="bg-paper-muted py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-red-600">
            Calculadora
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
            Compare as duas modalidades
          </h2>
          <p className="mt-3 text-ink-muted">
            Informe o saldo atual do seu FGTS para ver o que cada modalidade
            oferece hoje e no caso de uma demissão sem justa causa.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-start">
          <form className="space-y-7" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className={labelClass} htmlFor="saldo">
                Saldo atual do FGTS
              </label>
              <input
                id="saldo"
                type="number"
                min={0}
                step="0.01"
                inputMode="decimal"
                placeholder="R$ 0,00"
                className={inputClass}
                value={dados.saldoFgts || ""}
                onChange={(e) => setDados({ saldoFgts: Number(e.target.value) })}
              />
              <p className="mt-2 text-xs text-ink-muted">
                Você encontra esse valor no aplicativo FGTS ou no extrato da
                Caixa.
              </p>
            </div>

            {temResultado && (
              <div className="rounded-xl border border-red-600/30 bg-white p-5">
                <p className="font-display text-sm font-semibold text-navy-950">
                  Ao optar pelo saque-aniversário
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  Você abre mão de sacar{" "}
                  <strong className="text-red-600">
                    {formatBRL(resultado.diferencaSeDemitido)}
                  </strong>{" "}
                  de imediato caso seja demitido(a) sem justa causa. Esse
                  valor fica retido, sacável apenas nos aniversários
                  seguintes, mesmo se você não estiver mais empregado(a).
                </p>
              </div>
            )}
          </form>

          <div className="grid gap-6 sm:grid-cols-2">
            <ReciboCard
              rotulo="Modalidade padrão"
              estampa="Saque-rescisão"
              grupos={[
                {
                  itens: temResultado
                    ? [
                        { id: "saldo", label: "Saldo do FGTS", valor: resultado.saldoFgts },
                        { id: "multa", label: "Multa de 40%", valor: resultado.multa40 },
                      ]
                    : [],
                },
              ]}
              total={{
                label: "Se demitido(a) sem justa causa",
                valor: resultado.totalSeDemitidoRescisao,
              }}
              avisos={[]}
              vazio={!temResultado ? resultado.avisos[0] : "Nada disponível para saque enquanto empregado(a)."}
              disclaimer="Você recebe o saldo total imediatamente na rescisão."
            />

            <ReciboCard
              rotulo="Modalidade opcional"
              estampa="Saque-aniversário"
              grupos={[
                {
                  itens: temResultado
                    ? [
                        {
                          id: "parcela",
                          label: "Parcela anual disponível",
                          detalhe: `${resultado.percentualFaixa.toFixed(0)}% do saldo + ${formatBRL(resultado.parcelaFixa)}`,
                          valor: resultado.parcelaAniversario,
                        },
                        {
                          id: "multa",
                          label: "Multa de 40% (se demitido)",
                          valor: resultado.multa40,
                        },
                      ]
                    : [],
                },
              ]}
              total={{
                label: "Se demitido(a) sem justa causa",
                valor: resultado.totalSeDemitidoAniversario,
              }}
              avisos={temResultado ? resultado.avisos : []}
              vazio={!temResultado ? resultado.avisos[0] : undefined}
              disclaimer="O saldo fica retido; só a multa é liberada na demissão."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import { calcularHorasExtras, type DadosHorasExtras } from "@/lib/calculoHorasExtras";
import { ReciboCard } from "@/components/calc/ReciboCard";
import { inputClass, labelClass } from "@/components/calc/estilos";

export function CalculadoraHorasExtras() {
  const [dados, setDados] = useState<DadosHorasExtras>({
    salarioBruto: 0,
    cargaHorariaMensal: 220,
    horas50: 0,
    horas100: 0,
    diasUteisMes: 25,
    diasRepousoMes: 5,
  });

  const resultado = useMemo(() => calcularHorasExtras(dados), [dados]);

  function atualizar<K extends keyof DadosHorasExtras>(chave: K, valor: DadosHorasExtras[K]) {
    setDados((atual) => ({ ...atual, [chave]: valor }));
  }

  const temResultado = dados.salarioBruto > 0;

  return (
    <section id="calculadora" className="bg-paper-muted py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-red-600">
            Calculadora
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
            Quanto valem suas horas extras
          </h2>
          <p className="mt-3 text-ink-muted">
            Inclui o reflexo das horas extras no descanso semanal remunerado
            (DSR).
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <form className="space-y-7" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
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
              <div>
                <label className={labelClass} htmlFor="carga">
                  Jornada mensal (horas)
                </label>
                <select
                  id="carga"
                  className={inputClass}
                  value={dados.cargaHorariaMensal}
                  onChange={(e) => atualizar("cargaHorariaMensal", Number(e.target.value))}
                >
                  <option value={220}>220h (44h/semana)</option>
                  <option value={200}>200h (40h/semana)</option>
                  <option value={180}>180h (36h/semana)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass} htmlFor="h50">
                  Horas extras com 50%
                </label>
                <input
                  id="h50"
                  type="number"
                  min={0}
                  step="0.5"
                  className={inputClass}
                  placeholder="0"
                  value={dados.horas50 || ""}
                  onChange={(e) => atualizar("horas50", Number(e.target.value))}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="h100">
                  Horas extras com 100%
                </label>
                <input
                  id="h100"
                  type="number"
                  min={0}
                  step="0.5"
                  className={inputClass}
                  placeholder="0"
                  value={dados.horas100 || ""}
                  onChange={(e) => atualizar("horas100", Number(e.target.value))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass} htmlFor="uteis">
                  Dias úteis no mês
                </label>
                <input
                  id="uteis"
                  type="number"
                  min={1}
                  className={inputClass}
                  value={dados.diasUteisMes || ""}
                  onChange={(e) => atualizar("diasUteisMes", Number(e.target.value))}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="repouso">
                  Domingos e feriados no mês
                </label>
                <input
                  id="repouso"
                  type="number"
                  min={0}
                  className={inputClass}
                  value={dados.diasRepousoMes}
                  onChange={(e) => atualizar("diasRepousoMes", Number(e.target.value))}
                />
              </div>
            </div>
          </form>

          <ReciboCard
            rotulo="Recibo estimativo de horas extras"
            grupos={[
              {
                itens: temResultado
                  ? [
                      {
                        id: "hora_normal",
                        label: "Valor da hora normal",
                        detalhe: `Salário ÷ ${dados.cargaHorariaMensal}h`,
                        valor: resultado.valorHoraNormal,
                      },
                      ...(dados.horas50 > 0
                        ? [
                            {
                              id: "extra50",
                              label: "Horas extras 50%",
                              detalhe: `${dados.horas50}h com adicional de 50%`,
                              valor: resultado.valorHoras50,
                            },
                          ]
                        : []),
                      ...(dados.horas100 > 0
                        ? [
                            {
                              id: "extra100",
                              label: "Horas extras 100%",
                              detalhe: `${dados.horas100}h com adicional de 100%`,
                              valor: resultado.valorHoras100,
                            },
                          ]
                        : []),
                    ]
                  : [],
              },
              {
                titulo: "Reflexos",
                itens:
                  temResultado && resultado.reflexoDSR > 0
                    ? [
                        {
                          id: "dsr",
                          label: "Reflexo no DSR",
                          detalhe: "Descanso semanal remunerado sobre as horas extras",
                          valor: resultado.reflexoDSR,
                        },
                      ]
                    : [],
              },
            ]}
            total={{ label: "Total a receber", valor: resultado.total }}
            avisos={resultado.avisos}
            vazio={!temResultado ? resultado.avisos[0] : undefined}
          />
        </div>
      </div>
    </section>
  );
}

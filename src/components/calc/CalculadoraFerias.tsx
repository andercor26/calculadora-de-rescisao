"use client";

import { useMemo, useState } from "react";
import { calcularFerias, type DadosFerias } from "@/lib/calculoFerias";
import { ReciboCard } from "@/components/calc/ReciboCard";
import { ToggleGroup } from "@/components/calc/ToggleGroup";
import { inputClass, labelClass } from "@/components/calc/estilos";

export function CalculadoraFerias() {
  const [dados, setDados] = useState<DadosFerias>({
    salarioBruto: 0,
    diasGozar: 30,
    diasVender: 0,
    adiantarDecimoTerceiro: false,
  });

  const resultado = useMemo(() => calcularFerias(dados), [dados]);

  function atualizar<K extends keyof DadosFerias>(chave: K, valor: DadosFerias[K]) {
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
            Simule suas férias
          </h2>
          <p className="mt-3 text-ink-muted">
            Inclua o abono pecuniário e o adiantamento do 13º se for o seu
            caso.
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
                <label className={labelClass} htmlFor="gozar">
                  Dias de férias a tirar
                </label>
                <input
                  id="gozar"
                  type="number"
                  min={0}
                  max={30 - Math.min(10, dados.diasVender || 0)}
                  className={inputClass}
                  value={dados.diasGozar}
                  onChange={(e) => atualizar("diasGozar", Number(e.target.value))}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="vender">
                  Dias a vender (abono)
                </label>
                <input
                  id="vender"
                  type="number"
                  min={0}
                  max={10}
                  className={inputClass}
                  value={dados.diasVender || ""}
                  placeholder="0"
                  onChange={(e) => atualizar("diasVender", Number(e.target.value))}
                />
              </div>
            </div>

            <div>
              <span className={labelClass}>Quer adiantar a 1ª parcela do 13º nas férias?</span>
              <ToggleGroup
                opcoes={[
                  { valor: "sim", label: "Sim" },
                  { valor: "nao", label: "Não" },
                ]}
                valor={dados.adiantarDecimoTerceiro ? "sim" : "nao"}
                onChange={(v) => atualizar("adiantarDecimoTerceiro", v === "sim")}
              />
            </div>
          </form>

          <ReciboCard
            rotulo="Recibo estimativo de férias"
            grupos={[
              {
                itens: temResultado
                  ? [
                      {
                        id: "ferias",
                        label: "Férias",
                        detalhe: `${resultado.diasGozar} dia(s)`,
                        valor: resultado.valorFerias,
                      },
                      {
                        id: "terco",
                        label: "Terço constitucional",
                        valor: resultado.tercoFerias,
                      },
                      ...(resultado.diasVender > 0
                        ? [
                            {
                              id: "abono",
                              label: "Venda de férias",
                              detalhe: `${resultado.diasVender} dia(s) vendido(s)`,
                              valor: resultado.valorAbono,
                            },
                            {
                              id: "terco_abono",
                              label: "Terço sobre a venda de férias",
                              valor: resultado.tercoAbono,
                            },
                          ]
                        : []),
                      ...(dados.adiantarDecimoTerceiro
                        ? [
                            {
                              id: "adiantamento",
                              label: "Adiantamento do 13º (1ª parcela)",
                              valor: resultado.adiantamentoDecimoTerceiro,
                            },
                          ]
                        : []),
                    ]
                  : [],
              },
            ]}
            total={{ label: "Total estimado", valor: resultado.total }}
            avisos={resultado.avisos}
            vazio={!temResultado ? "Preencha o salário para ver o cálculo." : undefined}
          />
        </div>
      </div>
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import {
  calcularSeguroDesemprego,
  type DadosSeguroDesemprego,
  type NumeroSolicitacao,
} from "@/lib/calculoSeguroDesemprego";
import { ReciboCard } from "@/components/calc/ReciboCard";
import { ToggleGroup } from "@/components/calc/ToggleGroup";
import { inputClass, labelClass } from "@/components/calc/estilos";

const SOLICITACOES: { valor: NumeroSolicitacao; label: string }[] = [
  { valor: "1", label: "1ª vez" },
  { valor: "2", label: "2ª vez" },
  { valor: "3+", label: "3ª vez ou mais" },
];

export function CalculadoraSeguroDesemprego() {
  const [dados, setDados] = useState<DadosSeguroDesemprego>({
    elegivel: true,
    mesesTrabalhados: 0,
    numeroSolicitacao: "1",
    mediaSalarial: 0,
  });

  const resultado = useMemo(() => calcularSeguroDesemprego(dados), [dados]);

  function atualizar<K extends keyof DadosSeguroDesemprego>(
    chave: K,
    valor: DadosSeguroDesemprego[K]
  ) {
    setDados((atual) => ({ ...atual, [chave]: valor }));
  }

  return (
    <section id="calculadora" className="bg-paper-muted py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-red-600">
            Calculadora
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
            Simule seu seguro-desemprego
          </h2>
          <p className="mt-3 text-ink-muted">
            O cálculo acontece no seu navegador. Nenhuma informação é
            enviada ou armazenada.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <form className="space-y-7" onSubmit={(e) => e.preventDefault()}>
            <div>
              <span className={labelClass}>Você foi demitido sem justa causa?</span>
              <ToggleGroup
                opcoes={[
                  { valor: "sim", label: "Sim" },
                  { valor: "nao", label: "Não" },
                ]}
                valor={dados.elegivel ? "sim" : "nao"}
                onChange={(v) => atualizar("elegivel", v === "sim")}
              />
            </div>

            <div>
              <span className={labelClass}>Quantas vezes já solicitou o benefício?</span>
              <ToggleGroup
                colClass="grid-cols-3"
                opcoes={SOLICITACOES}
                valor={dados.numeroSolicitacao}
                onChange={(v) => atualizar("numeroSolicitacao", v)}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="meses">
                Meses trabalhados nos últimos 36 meses
              </label>
              <input
                id="meses"
                type="number"
                min={0}
                max={36}
                className={inputClass}
                placeholder="Ex: 18"
                value={dados.mesesTrabalhados || ""}
                onChange={(e) => atualizar("mesesTrabalhados", Number(e.target.value))}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="media">
                Média salarial dos últimos 3 meses
              </label>
              <input
                id="media"
                type="number"
                min={0}
                step="0.01"
                inputMode="decimal"
                placeholder="R$ 0,00"
                className={inputClass}
                value={dados.mediaSalarial || ""}
                onChange={(e) => atualizar("mediaSalarial", Number(e.target.value))}
              />
            </div>
          </form>

          <ReciboCard
            rotulo="Recibo estimativo do benefício"
            estampa={
              resultado.parcelas > 0 ? `${resultado.parcelas} parcela(s)` : undefined
            }
            grupos={[
              {
                itens:
                  resultado.parcelas > 0
                    ? [
                        {
                          id: "parcela",
                          label: "Valor de cada parcela",
                          detalhe: `${resultado.parcelas} parcela(s) mensais`,
                          valor: resultado.valorParcela,
                        },
                      ]
                    : [],
              },
            ]}
            total={{ label: "Total estimado do benefício", valor: resultado.valorTotal }}
            avisos={resultado.motivoInelegivel ? [] : resultado.avisos}
            vazio={resultado.motivoInelegivel ?? undefined}
          />
        </div>
      </div>
    </section>
  );
}

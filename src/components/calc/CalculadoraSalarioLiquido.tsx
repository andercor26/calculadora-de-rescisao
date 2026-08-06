"use client";

import { useMemo, useState } from "react";
import { calcularSalarioLiquido, type DadosSalarioLiquido } from "@/lib/calculoSalarioLiquido";
import { ReciboCard } from "@/components/calc/ReciboCard";
import { inputClass, labelClass } from "@/components/calc/estilos";

export function CalculadoraSalarioLiquido() {
  const [dados, setDados] = useState<DadosSalarioLiquido>({
    salarioBruto: 0,
    dependentes: 0,
    outrosDescontos: 0,
  });

  const resultado = useMemo(() => calcularSalarioLiquido(dados), [dados]);

  function atualizar<K extends keyof DadosSalarioLiquido>(
    chave: K,
    valor: DadosSalarioLiquido[K]
  ) {
    setDados((atual) => ({ ...atual, [chave]: valor }));
  }

  const temResultado = resultado.salarioBruto > 0;

  return (
    <section id="calculadora" className="bg-paper-muted py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-red-600">
            Calculadora
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
            Do bruto ao líquido
          </h2>
          <p className="mt-3 text-ink-muted">
            Descontamos INSS e IRRF automaticamente, usando sempre o método
            que resulta no menor imposto.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <form className="space-y-7" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className={labelClass} htmlFor="bruto">
                Salário bruto mensal
              </label>
              <input
                id="bruto"
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
              <label className={labelClass} htmlFor="dependentes">
                Número de dependentes (IRRF)
              </label>
              <select
                id="dependentes"
                className={inputClass}
                value={dados.dependentes}
                onChange={(e) => atualizar("dependentes", Number(e.target.value))}
              >
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n === 0 ? "Nenhum" : n}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="outros">
                Outros descontos mensais (opcional)
              </label>
              <input
                id="outros"
                type="number"
                min={0}
                step="0.01"
                inputMode="decimal"
                placeholder="Vale-transporte, plano de saúde…"
                className={inputClass}
                value={dados.outrosDescontos || ""}
                onChange={(e) => atualizar("outrosDescontos", Number(e.target.value))}
              />
            </div>
          </form>

          <ReciboCard
            rotulo="Recibo estimativo de pagamento"
            grupos={[
              {
                itens: temResultado
                  ? [
                      {
                        id: "bruto",
                        label: "Salário bruto",
                        valor: resultado.salarioBruto,
                      },
                    ]
                  : [],
              },
              {
                titulo: "Descontos",
                itens: temResultado
                  ? [
                      {
                        id: "inss",
                        label: "INSS",
                        detalhe: "Alíquota progressiva sobre o salário",
                        valor: resultado.descontoINSS,
                        negativo: true,
                      },
                      {
                        id: "irrf",
                        label: "IRRF",
                        detalhe:
                          resultado.metodoIRRF === "simplificado"
                            ? "Desconto simplificado (mais vantajoso)"
                            : "Com dedução por dependentes",
                        valor: resultado.descontoIRRF,
                        negativo: true,
                      },
                      ...(resultado.outrosDescontos > 0
                        ? [
                            {
                              id: "outros",
                              label: "Outros descontos",
                              valor: resultado.outrosDescontos,
                              negativo: true,
                            },
                          ]
                        : []),
                    ]
                  : [],
              },
            ]}
            total={{ label: "Salário líquido estimado", valor: resultado.salarioLiquido }}
            avisos={resultado.avisos}
            vazio={!temResultado ? resultado.avisos[0] : undefined}
          />
        </div>
      </div>
    </section>
  );
}

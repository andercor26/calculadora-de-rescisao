import { formatBRL } from "@/lib/format";

export interface ReciboItem {
  id: string;
  label: string;
  detalhe?: string;
  valor: number;
  negativo?: boolean;
}

export interface ReciboGrupo {
  titulo?: string;
  itens: ReciboItem[];
}

export function ReciboCard({
  rotulo = "Recibo estimativo",
  estampa,
  grupos,
  total,
  avisos = [],
  vazio,
  disclaimer = "Estimativa educativa — não substitui a orientação de um profissional especializado.",
}: {
  rotulo?: string;
  estampa?: string;
  grupos: ReciboGrupo[];
  total: { label: string; valor: number };
  avisos?: string[];
  vazio?: string;
  disclaimer?: string;
}) {
  const temItens = grupos.some((g) => g.itens.length > 0);

  return (
    <div className="md:sticky md:top-24">
      <div className="relative rounded-2xl border border-line bg-white p-7 shadow-xl shadow-navy-950/5">
        <div className="flex items-start justify-between gap-4 border-b border-dashed border-line pb-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
              {rotulo}
            </p>
            <p className="mt-1 font-display text-lg font-semibold text-navy-950">
              Resumo dos valores
            </p>
          </div>
          {estampa && (
            <span className="mt-1 shrink-0 rotate-[-6deg] rounded-full border-2 border-red-600 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-red-600">
              {estampa}
            </span>
          )}
        </div>

        {!temItens ? (
          <p className="py-10 text-center text-sm text-ink-muted">
            {vazio ?? "Preencha os dados ao lado para ver a estimativa."}
          </p>
        ) : (
          <>
            {grupos.map(
              (grupo, i) =>
                grupo.itens.length > 0 && (
                  <div key={grupo.titulo ?? i}>
                    {grupo.titulo && (
                      <p className="mt-5 border-t border-dashed border-line pt-4 font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                        {grupo.titulo}
                      </p>
                    )}
                    <dl className={`space-y-3 font-mono text-[13px] ${grupo.titulo ? "mt-3" : "mt-5"}`}>
                      {grupo.itens.map((item) => (
                        <div key={item.id} className="flex items-baseline justify-between gap-3">
                          <div>
                            <dt className={item.negativo ? "text-red-700" : "text-ink"}>
                              {item.label}
                            </dt>
                            {item.detalhe && (
                              <dd className="text-[11px] text-ink-muted">{item.detalhe}</dd>
                            )}
                          </div>
                          <dd
                            className={`shrink-0 tabular-nums ${
                              item.negativo ? "text-red-700" : "text-navy-950"
                            }`}
                          >
                            {item.negativo && "− "}
                            {formatBRL(item.valor)}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )
            )}

            <div className="mt-6 flex items-baseline justify-between border-t border-dashed border-line pt-4">
              <span className="font-display text-base font-semibold text-navy-950">
                {total.label}
              </span>
              <span className="font-display text-2xl font-semibold tabular-nums text-red-600">
                {formatBRL(total.valor)}
              </span>
            </div>

            {avisos.length > 0 && (
              <ul className="mt-5 space-y-2 border-t border-line pt-4">
                {avisos.map((aviso) => (
                  <li key={aviso} className="text-xs leading-relaxed text-ink-muted">
                    {aviso}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>

      <p className="mt-4 text-center text-xs text-ink-muted">{disclaimer}</p>
    </div>
  );
}
